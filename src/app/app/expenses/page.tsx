"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";

interface CategoryFilter {
  id: string;
  label: string;
  icon: string;
  altIds?: string[];
}

const CATEGORIES: CategoryFilter[] = [
  { id: "all", label: "Todos", icon: "apps" },
  { id: "comida", label: "Comida", icon: "restaurant", altIds: ["food", "ração"] },
  { id: "lazer", label: "Lazer", icon: "sports_esports", altIds: ["play", "brinquedos"] },
  { id: "casa", label: "Casa", icon: "home", altIds: ["home"] },
  { id: "saúde", label: "Saúde", icon: "medical_services", altIds: ["medical", "vet"] },
  { id: "petiscos", label: "Petiscos", icon: "redeem", altIds: ["treats"] },
  { id: "presentes", label: "Presentes", icon: "card_giftcard", altIds: ["gifts"] },
];

function getCategoryIcon(category: string): string {
  const cat = category.toLowerCase();
  for (const c of CATEGORIES) {
    if (c.id === "all") continue;
    if (cat === c.id || cat === c.label.toLowerCase()) return c.icon;
    if (c.altIds && c.altIds.some((alt) => cat.includes(alt))) return c.icon;
  }
  return "receipt_long";
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
    if (isYesterday) return "Ontem";

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function Expenses() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const deleteExpense = useMeowneyStore((s) => s.deleteExpense);

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory === "all") return true;
    const cat = CATEGORIES.find((c) => c.id === selectedCategory);
    if (!cat) return true;
    const expCat = expense.category.toLowerCase();
    if (expCat === cat.id || expCat === cat.label.toLowerCase()) return true;
    if (cat.altIds && cat.altIds.some((alt) => expCat.includes(alt))) return true;
    return false;
  });

  // Sorted by newest first
  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Header title="Gastos" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile">
          {/* Utility Header: Filter & Toggle */}
          <div className="flex flex-col gap-4 mb-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-cream-milk p-1 rounded-full shadow-sm">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    view === "list"
                      ? "bg-sakura-pink shadow-inner text-primary"
                      : "text-on-surface-variant hover:bg-sakura-pink/20"
                  }`}
                  title="Modo Lista"
                >
                  <span className="material-symbols-outlined">view_list</span>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    view === "grid"
                      ? "bg-sakura-pink shadow-inner text-primary"
                      : "text-on-surface-variant hover:bg-sakura-pink/20"
                  }`}
                  title="Modo Grade"
                >
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-full text-on-surface-variant">
                <span className="material-symbols-outlined text-[20px]">
                  receipt_long
                </span>
                <span className="font-label-md text-label-md">
                  {sortedExpenses.length} {sortedExpenses.length === 1 ? "Item" : "Itens"}
                </span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-primary text-on-primary shadow-md"
                        : "bg-cream-milk text-on-secondary-container hover:bg-sakura-pink/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {cat.icon}
                    </span>
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Transaction Container or Empty State */}
          {sortedExpenses.length > 0 ? (
            <div
              className={
                view === "list"
                  ? "flex flex-col gap-3"
                  : "grid grid-cols-2 gap-4"
              }
            >
              {sortedExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="group bg-cream-milk rounded-lg p-4 transition-all duration-300 hover:shadow-md relative overflow-hidden transform backface-hidden active:scale-[0.98]"
                >
                  <div className="absolute -right-2 -top-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-6xl">pets</span>
                  </div>
                  <div
                    className={`flex ${
                      view === "list"
                        ? "items-center gap-4"
                        : "flex-col items-center gap-2 text-center"
                    } relative z-10`}
                  >
                    <div
                      className={`rounded-full bg-sakura-pink/30 flex items-center justify-center text-primary shrink-0 ${
                        view === "list" ? "w-12 h-12" : "w-16 h-16"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: view === "list" ? "24px" : "32px" }}
                      >
                        {getCategoryIcon(expense.category)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div
                        className={`flex ${
                          view === "list"
                            ? "justify-between items-start"
                            : "flex-col items-center mt-2"
                        }`}
                      >
                        <h3 className="font-headline-md text-label-md text-on-background truncate">
                          {expense.title}
                        </h3>
                        <span className="font-data-mono text-data-mono text-primary">
                          -R$ {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      {view === "list" ? (
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {formatExpenseDate(expense.date)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sakura-pink/20 text-primary font-bold uppercase tracking-wider">
                              {expense.category}
                            </span>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="text-outline hover:text-error transition-colors p-1"
                              title="Excluir gasto"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sakura-pink/20 text-primary font-bold uppercase tracking-wider">
                            {expense.category}
                          </span>
                          <button
                            onClick={() => deleteExpense(expense.id)}
                            className="text-outline hover:text-error transition-colors"
                            title="Excluir gasto"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Cat-themed Empty State */
            <div className="flex flex-col items-center justify-center p-8 bg-cream-milk rounded-xl border-2 border-dashed border-sakura-pink/30 text-center gap-4 my-6">
              <div className="w-20 h-20 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[48px]">pets</span>
              </div>
              <p className="font-headline-md text-headline-md text-soft-charcoal">
                Nenhuma transação encontrada, miau!
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant/80 max-w-xs">
                {selectedCategory === "all"
                  ? "Sua gavetinha de extratos está limpa! Adicione seu primeiro gasto usando o botão de patinha."
                  : `Nenhum gasto encontrado para a categoria "${CATEGORIES.find((c) => c.id === selectedCategory)?.label}".`}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
