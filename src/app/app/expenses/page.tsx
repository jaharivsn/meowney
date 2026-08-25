"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { Category, Expense } from "@/lib/schemas";

function getCategoryIcon(categoryName: string, categories: Category[]): string {
  const norm = categoryName.toLowerCase().trim();
  const matched = categories.find(
    (c) => c.id.toLowerCase() === norm || c.label.toLowerCase() === norm
  );
  if (matched) return matched.icon;
  return "pets";
}

function formatExpenseDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (isToday) return `Hoje, ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    if (yesterday.toDateString() === date.toDateString()) return "Ontem";
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function Expenses() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Expense | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const deleteExpense = useMeowneyStore((s) => s.deleteExpense);
  const updateExpense = useMeowneyStore((s) => s.updateExpense);

  const filterCategories = [{ id: "all", label: "Todos", icon: "apps" }, ...categories];

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory !== "all") {
      const selectedCatObj = categories.find((c) => c.id === selectedCategory);
      if (selectedCatObj) {
        const expCat = expense.category.toLowerCase().trim();
        if (
          expCat !== selectedCatObj.id.toLowerCase() &&
          expCat !== selectedCatObj.label.toLowerCase()
        )
          return false;
      }
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        expense.title.toLowerCase().includes(q) ||
        expense.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const openEdit = (e: Expense) => {
    setEditing(e);
    setEditTitle(e.title);
    setEditAmount(e.amount.toString());
  };

  const saveEdit = () => {
    if (!editing) return;
    const amount = parseFloat(editAmount.replace(",", "."));
    if (isNaN(amount) || amount <= 0) return;
    updateExpense(editing.id, { title: editTitle.trim() || editing.title, amount });
    setEditing(null);
  };

  return (
    <>
      <Header title="Gastos" />
      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile">
          <div className="flex flex-col gap-4 mb-6 mt-6">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou categoria"
              className="w-full bg-white p-3.5 rounded-2xl border border-outline/20 font-body-md outline-none focus:ring-2 focus:ring-primary"
              aria-label="Buscar transações"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-cream-milk p-1.5 rounded-2xl shadow-sm border border-sakura-pink/20">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center justify-center w-10 h-10 rounded-2xl ${view === "list" ? "bg-sakura-pink text-primary" : "text-on-surface-variant"}`}
                  aria-label="Modo Lista"
                >
                  <span className="material-symbols-outlined">view_list</span>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center justify-center w-10 h-10 rounded-2xl ${view === "grid" ? "bg-sakura-pink text-primary" : "text-on-surface-variant"}`}
                  aria-label="Modo Grade"
                >
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
              </div>
              <span className="font-label-md font-bold text-on-surface-variant">
                {sortedExpenses.length} {sortedExpenses.length === 1 ? "item" : "itens"}
              </span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-2xl font-label-md flex items-center gap-1.5 border ${
                    selectedCategory === cat.id
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-cream-milk text-on-secondary-container border-sakura-pink/20"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {sortedExpenses.length > 0 ? (
            <div className={view === "list" ? "flex flex-col gap-3" : "grid grid-cols-2 gap-4"}>
              {sortedExpenses.map((expense) => {
                const isIncome = expense.type === "income";
                return (
                  <div
                    key={expense.id}
                    className="group bg-cream-milk rounded-3xl p-5 border border-sakura-pink/20 relative"
                  >
                    <div className={`flex ${view === "list" ? "items-center gap-4" : "flex-col items-center gap-2 text-center"}`}>
                      <div className={`rounded-2xl bg-sakura-pink/30 flex items-center justify-center text-primary ${view === "list" ? "w-12 h-12" : "w-16 h-16"}`}>
                        <span className="material-symbols-outlined">
                          {getCategoryIcon(expense.category, categories)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 w-full">
                        <div className={`flex ${view === "list" ? "justify-between items-start" : "flex-col items-center mt-2"}`}>
                          <h3 className="font-headline-md text-label-md text-on-background truncate font-bold">
                            {expense.title}
                            {expense.isRecurringInstance && (
                              <span className="ml-1 text-outline font-normal">↻</span>
                            )}
                          </h3>
                          <span className={`font-data-mono font-bold ${isIncome ? "text-tertiary" : "text-primary"}`}>
                            {isIncome ? "+" : "-"}R${" "}
                            {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className={`flex ${view === "list" ? "justify-between items-center mt-2" : "justify-center gap-2 mt-2"}`}>
                          <span className="font-label-sm text-on-surface-variant">{formatExpenseDate(expense.date)}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEdit(expense)}
                              className="p-2 rounded-full hover:bg-sakura-pink/20 text-primary min-w-[44px] min-h-[44px]"
                              title="Editar"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="p-2 rounded-full hover:bg-error/10 text-outline hover:text-error min-w-[44px] min-h-[44px]"
                              title="Excluir gasto"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-cream-milk rounded-3xl border-2 border-dashed border-sakura-pink/30 text-center gap-4 my-6">
              <span className="material-symbols-outlined text-primary text-[48px]">pets</span>
              <p className="font-headline-md text-soft-charcoal font-bold">Nenhuma transação encontrada, miau!</p>
              <p className="font-body-md text-on-surface-variant max-w-xs">
                {query
                  ? "Nada combina com essa busca."
                  : selectedCategory === "all"
                    ? "Adicione o primeiro gasto pela patinha."
                    : "Nada nessa categoria."}
              </p>
            </div>
          )}
        </div>
      </main>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setEditing(null)}>
          <div
            role="dialog"
            aria-labelledby="edit-tx-title"
            className="bg-cream-milk rounded-3xl p-6 w-full max-w-sm border border-sakura-pink/30 flex flex-col gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="edit-tx-title" className="font-headline-md font-bold">Editar transação</h3>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="bg-white p-3.5 rounded-2xl border border-outline/20 outline-none"
            />
            <input
              type="number"
              step="0.01"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className="bg-white p-3.5 rounded-2xl border border-outline/20 outline-none"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing(null)} className="flex-1 py-3 rounded-2xl bg-surface-container">
                Cancelar
              </button>
              <button type="button" onClick={saveEdit} className="flex-1 py-3 rounded-2xl bg-sakura-pink text-primary font-bold">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
