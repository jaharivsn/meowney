"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { Category, Expense } from "@/lib/schemas";

function getCategoryMeta(categoryName: string, categories: Category[]) {
  const norm = categoryName.toLowerCase().trim();
  const matched = categories.find(
    (c) => c.id.toLowerCase() === norm || c.label.toLowerCase() === norm
  );
  if (matched) {
    return { icon: matched.icon, color: matched.color || "#FFB7C5" };
  }
  return { icon: "receipt_long", color: "#FFB7C5" };
}

function formatExpenseDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
    if (isToday) return `Hoje, ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    if (isYesterday) return `Ontem, ${date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`;
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function Expenses() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedType, setSelectedType] = useState<"all" | "expense" | "income">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  // Edit State
  const [editing, setEditing] = useState<Expense | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState<"expense" | "income">("expense");

  // Delete Confirmation State
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const deleteExpense = useMeowneyStore((s) => s.deleteExpense);
  const updateExpense = useMeowneyStore((s) => s.updateExpense);

  const filterCategories = [{ id: "all", label: "Todos", icon: "apps", color: "#FFB7C5" }, ...categories];

  const filteredExpenses = expenses.filter((expense) => {
    // Filter by type
    if (selectedType !== "all" && expense.type !== selectedType) {
      return false;
    }

    // Filter by category
    if (selectedCategory !== "all") {
      const selectedCatObj = categories.find((c) => c.id === selectedCategory);
      if (selectedCatObj) {
        const expCat = expense.category.toLowerCase().trim();
        if (
          expCat !== selectedCatObj.id.toLowerCase() &&
          expCat !== selectedCatObj.label.toLowerCase()
        ) {
          return false;
        }
      }
    }

    // Filter by query
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

  // Financial summary for filtered set
  const totalFilteredIncome = sortedExpenses
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalFilteredExpenses = sortedExpenses
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const netFiltered = totalFilteredIncome - totalFilteredExpenses;

  const openEdit = (e: Expense) => {
    setEditing(e);
    setEditTitle(e.title);
    setEditAmount(e.amount.toString());
    setEditCategory(e.category);
    setEditType(e.type);
  };

  const saveEdit = () => {
    if (!editing) return;
    const amount = parseFloat(editAmount.replace(",", "."));
    if (isNaN(amount) || amount <= 0) return;

    updateExpense(editing.id, {
      title: editTitle.trim() || editing.title,
      amount,
      category: editCategory || editing.category,
      type: editType,
    });
    setEditing(null);
  };

  const confirmDelete = () => {
    if (deletingId) {
      deleteExpense(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <>
      <Header title="Gastos & Extrato" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile max-w-2xl mx-auto gap-5 mt-6">
          {/* Summary Strip */}
          <section className="bg-cream-milk p-4.5 rounded-3xl border border-sakura-pink/20 shadow-xs grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/60">
              <span className="text-[10px] uppercase font-bold text-outline">Entradas</span>
              <span className="font-data-mono text-xs sm:text-sm font-bold text-tertiary mt-0.5">
                +R$ {totalFilteredIncome.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/60">
              <span className="text-[10px] uppercase font-bold text-outline">Saídas</span>
              <span className="font-data-mono text-xs sm:text-sm font-bold text-primary mt-0.5">
                -R$ {totalFilteredExpenses.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-white/60">
              <span className="text-[10px] uppercase font-bold text-outline">Balanço</span>
              <span className={`font-data-mono text-xs sm:text-sm font-bold mt-0.5 ${netFiltered >= 0 ? "text-tertiary" : "text-primary"}`}>
                {netFiltered >= 0 ? "+" : "-"}R$ {Math.abs(netFiltered).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </section>

          {/* Search & Layout Controls */}
          <div className="flex flex-col gap-3">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                search
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por descrição ou categoria…"
                className="w-full bg-white pl-10 pr-10 py-3 rounded-2xl border border-outline/20 font-body-md text-sm outline-none focus:ring-2 focus:ring-primary shadow-xs placeholder:text-outline/60"
                aria-label="Buscar transações"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 text-outline hover:text-soft-charcoal p-1 rounded-full"
                  aria-label="Limpar busca"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            {/* Filter by Type Tabs */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex bg-surface-container p-1 rounded-2xl border border-sakura-pink/20">
                <button
                  type="button"
                  onClick={() => setSelectedType("all")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    selectedType === "all"
                      ? "bg-white text-soft-charcoal shadow-xs"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Todas ({expenses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("expense")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    selectedType === "expense"
                      ? "bg-sakura-pink text-primary shadow-xs"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Gastos (-)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedType("income")}
                  className={`px-3 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                    selectedType === "income"
                      ? "bg-mint-fresh text-tertiary shadow-xs"
                      : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  Rendas (+)
                </button>
              </div>

              {/* View Switcher (List / Grid) */}
              <div className="flex items-center gap-1 bg-cream-milk p-1 rounded-2xl border border-sakura-pink/20">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
                    view === "list" ? "bg-sakura-pink text-primary" : "text-on-surface-variant hover:text-primary"
                  }`}
                  aria-label="Modo Lista"
                  title="Modo Lista"
                >
                  <span className="material-symbols-outlined text-[18px]">view_list</span>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center justify-center w-8 h-8 rounded-xl transition-colors ${
                    view === "grid" ? "bg-sakura-pink text-primary" : "text-on-surface-variant hover:text-primary"
                  }`}
                  aria-label="Modo Grade"
                  title="Modo Grade"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
              </div>
            </div>

            {/* Horizontal Category Carousel */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {filterCategories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-2xl font-label-md text-xs flex items-center gap-1.5 border transition-all active:scale-95 ${
                      isSelected
                        ? "bg-primary text-on-primary border-primary shadow-xs font-bold"
                        : "bg-cream-milk text-on-secondary-container border-sakura-pink/20 hover:border-sakura-pink/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transactions Output */}
          {sortedExpenses.length > 0 ? (
            <div className={view === "list" ? "flex flex-col gap-2.5" : "grid grid-cols-2 gap-3"}>
              {sortedExpenses.map((expense) => {
                const isIncome = expense.type === "income";
                const meta = getCategoryMeta(expense.category, categories);

                if (view === "list") {
                  return (
                    <div
                      key={expense.id}
                      className="group bg-white p-3.5 sm:p-4 rounded-2xl border border-surface-variant/20 shadow-xs hover:border-sakura-pink/30 transition-all flex items-center gap-3"
                    >
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-primary"
                        style={{ backgroundColor: `${meta.color}55` }}
                      >
                        <span className="material-symbols-outlined text-[20px]">{meta.icon}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline gap-2">
                          <h3 className="font-body-lg text-sm sm:text-base font-semibold text-soft-charcoal truncate">
                            {expense.title}
                            {expense.isRecurringInstance && (
                              <span className="ml-1 text-[11px] text-outline font-normal" title="Recorrência">↻</span>
                            )}
                          </h3>
                          <span
                            className={`font-data-mono text-sm sm:text-base font-bold shrink-0 ${
                              isIncome ? "text-tertiary" : "text-primary"
                            }`}
                          >
                            {isIncome ? "+" : "-"}R${" "}
                            {expense.amount.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <p className="font-label-sm text-[11px] sm:text-xs text-outline flex items-center gap-1">
                            <span>{formatExpenseDate(expense.date)}</span>
                            <span>•</span>
                            <span className="truncate">{expense.category}</span>
                          </p>

                          <div className="flex items-center gap-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => openEdit(expense)}
                              className="p-1.5 rounded-full hover:bg-sakura-pink/20 text-primary transition-colors"
                              title="Editar transação"
                              aria-label="Editar"
                            >
                              <span className="material-symbols-outlined text-[17px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingId(expense.id)}
                              className="p-1.5 rounded-full hover:bg-error/10 text-outline hover:text-error transition-colors"
                              title="Excluir transação"
                              aria-label="Excluir"
                            >
                              <span className="material-symbols-outlined text-[17px]">delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Grid View Item
                return (
                  <div
                    key={expense.id}
                    className="bg-cream-milk p-4 rounded-3xl border border-sakura-pink/20 shadow-xs flex flex-col justify-between gap-3 relative group"
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center text-primary"
                        style={{ backgroundColor: `${meta.color}55` }}
                      >
                        <span className="material-symbols-outlined text-[20px]">{meta.icon}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => openEdit(expense)}
                          className="p-1 text-primary hover:bg-white rounded-full transition-colors"
                          title="Editar"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingId(expense.id)}
                          className="p-1 text-outline hover:text-error hover:bg-white rounded-full transition-colors"
                          title="Excluir"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-label-md text-xs font-bold text-soft-charcoal truncate">
                        {expense.title}
                      </h4>
                      <p className="text-[10px] text-outline truncate">{expense.category}</p>
                      <p
                        className={`font-data-mono text-sm font-bold mt-1.5 ${
                          isIncome ? "text-tertiary" : "text-primary"
                        }`}
                      >
                        {isIncome ? "+" : "-"}R${" "}
                        {expense.amount.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <span className="text-[10px] text-outline font-medium">
                      {formatExpenseDate(expense.date)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-cream-milk rounded-3xl border-2 border-dashed border-sakura-pink/30 text-center gap-3 my-4">
              <div className="w-14 h-14 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px]">pets</span>
              </div>
              <p className="font-headline-md text-base text-soft-charcoal font-bold">
                Nenhuma transação encontrada!
              </p>
              <p className="font-body-md text-xs text-on-surface-variant max-w-xs">
                {query
                  ? "Nada combina com essa busca. Tente outras palavras-chave."
                  : selectedCategory !== "all" || selectedType !== "all"
                    ? "Nenhuma transação com estes filtros ativos."
                    : "Você ainda não registrou transações."}
              </p>
              <Link
                href="/app/add"
                className="mt-1 px-5 py-2.5 rounded-2xl bg-sakura-pink text-primary font-bold text-xs shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
              >
                Registrar agora
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Edit Transaction Modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setEditing(null)}
        >
          <div
            role="dialog"
            aria-labelledby="edit-tx-title"
            className="bg-cream-milk rounded-3xl p-6 w-full max-w-sm border border-sakura-pink/30 shadow-2xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 id="edit-tx-title" className="font-headline-md text-headline-md text-soft-charcoal font-bold">
                Editar Transação
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-outline hover:text-soft-charcoal p-1 rounded-full"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Type selector */}
            <div className="flex bg-surface-container p-1 rounded-2xl border border-sakura-pink/20">
              <button
                type="button"
                onClick={() => setEditType("expense")}
                className={`flex-1 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                  editType === "expense" ? "bg-sakura-pink text-primary shadow-xs" : "text-on-surface-variant"
                }`}
              >
                Gasto (-)
              </button>
              <button
                type="button"
                onClick={() => setEditType("income")}
                className={`flex-1 py-1.5 rounded-xl font-label-md text-xs font-bold transition-all ${
                  editType === "income" ? "bg-mint-fresh text-tertiary shadow-xs" : "text-on-surface-variant"
                }`}
              >
                Renda (+)
              </button>
            </div>

            {/* Title input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-outline">Descrição</label>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Ex: Almoço, Ração..."
                className="bg-white p-3 rounded-2xl border border-outline/20 text-sm font-medium outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Amount input */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-outline">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="bg-white p-3 rounded-2xl border border-outline/20 text-sm font-data-mono font-bold outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Category selector */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-outline">Categoria</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="bg-white p-3 rounded-2xl border border-outline/20 text-sm font-medium outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="flex-1 py-3 rounded-2xl bg-surface-container font-label-md text-xs font-bold text-on-surface hover:bg-surface-variant transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveEdit}
                className="flex-1 py-3 rounded-2xl bg-sakura-pink text-primary font-label-md text-xs font-bold shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setDeletingId(null)}
        >
          <div
            role="alertdialog"
            aria-labelledby="delete-dialog-title"
            className="bg-cream-milk rounded-3xl p-6 w-full max-w-sm border border-sakura-pink/30 shadow-2xl flex flex-col items-center text-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-error/15 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[24px]">delete</span>
            </div>
            <h3 id="delete-dialog-title" className="font-headline-md text-base text-soft-charcoal font-bold">
              Excluir transação?
            </h3>
            <p className="font-body-md text-xs text-on-surface-variant">
              Essa ação removerá o registro e atualizará seu saldo automaticamente.
            </p>
            <div className="flex gap-2 w-full mt-2">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 rounded-2xl bg-surface-container font-label-md text-xs font-bold text-on-surface"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-2xl bg-error text-white font-label-md text-xs font-bold shadow-xs hover:opacity-90 active:scale-95 transition-all"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
