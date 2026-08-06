"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { Category } from "@/lib/schemas";

function getCategoryIcon(categoryName: string, categories: Category[]): string {
  const norm = categoryName.toLowerCase().trim();
  const matched = categories.find(
    (c) => c.id.toLowerCase() === norm || c.label.toLowerCase() === norm
  );
  if (matched) return matched.icon;
  if (norm.includes("comida") || norm.includes("food") || norm.includes("ração")) return "restaurant";
  if (norm.includes("lazer") || norm.includes("play") || norm.includes("brinquedo")) return "sports_esports";
  if (norm.includes("casa") || norm.includes("home")) return "home";
  if (norm.includes("saúde") || norm.includes("health") || norm.includes("vet")) return "medical_services";
  if (norm.includes("salário") || norm.includes("salary") || norm.includes("pagamento")) return "payments";
  if (norm.includes("petisco") || norm.includes("treat")) return "redeem";
  if (norm.includes("presente") || norm.includes("gift")) return "card_giftcard";
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
  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const deleteExpense = useMeowneyStore((s) => s.deleteExpense);

  // Dynamic category options for filtering
  const filterCategories = [
    { id: "all", label: "Todos", icon: "apps" },
    ...categories,
  ];

  const filteredExpenses = expenses.filter((expense) => {
    if (selectedCategory === "all") return true;
    const selectedCatObj = categories.find((c) => c.id === selectedCategory);
    if (!selectedCatObj) return true;
    const expCat = expense.category.toLowerCase().trim();
    return (
      expCat === selectedCatObj.id.toLowerCase() ||
      expCat === selectedCatObj.label.toLowerCase()
    );
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
              <div className="flex items-center gap-2 bg-cream-milk p-1.5 rounded-2xl shadow-sm border border-sakura-pink/20">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${
                    view === "list"
                      ? "bg-sakura-pink shadow-inner text-primary"
                      : "text-on-surface-variant hover:bg-sakura-pink/20"
                  }`}
                  title="Modo Lista"
                  aria-label="Modo Lista"
                >
                  <span className="material-symbols-outlined">view_list</span>
                </button>
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all ${
                    view === "grid"
                      ? "bg-sakura-pink shadow-inner text-primary"
                      : "text-on-surface-variant hover:bg-sakura-pink/20"
                  }`}
                  title="Modo Grade"
                  aria-label="Modo Grade"
                >
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-high px-4 py-2.5 rounded-2xl text-on-surface-variant border border-surface-variant/30">
                <span className="material-symbols-outlined text-[20px]">
                  receipt_long
                </span>
                <span className="font-label-md text-label-md font-bold">
                  {sortedExpenses.length} {sortedExpenses.length === 1 ? "Item" : "Itens"}
                </span>
              </div>
            </div>

            {/* Dynamic Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {filterCategories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex-shrink-0 px-4 py-2.5 rounded-2xl font-label-md text-label-md transition-all flex items-center gap-1.5 border ${
                      isActive
                        ? "bg-primary text-on-primary border-primary shadow-sm"
                        : "bg-cream-milk text-on-secondary-container border-sakura-pink/20 hover:bg-sakura-pink/20"
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
              {sortedExpenses.map((expense) => {
                const isIncome = expense.type === "income";
                return (
                  <div
                    key={expense.id}
                    className="group bg-cream-milk rounded-3xl p-5 border border-sakura-pink/20 transition-all duration-300 hover:shadow-md relative overflow-hidden transform backface-hidden active:scale-[0.98]"
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
                        className={`rounded-2xl bg-sakura-pink/30 flex items-center justify-center text-primary shrink-0 ${
                          view === "list" ? "w-12 h-12" : "w-16 h-16"
                        }`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: view === "list" ? "24px" : "32px" }}
                        >
                          {getCategoryIcon(expense.category, categories)}
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
                          <h3 className="font-headline-md text-label-md text-on-background truncate font-bold">
                            {expense.title}
                          </h3>
                          <span
                            className={`font-data-mono text-data-mono font-bold ${
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
                        {view === "list" ? (
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                              {formatExpenseDate(expense.date)}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] px-2.5 py-1 rounded-2xl font-bold uppercase tracking-wider ${
                                isIncome ? "bg-mint-fresh/40 text-tertiary" : "bg-sakura-pink/30 text-primary"
                              }`}>
                                {expense.category}
                              </span>
                              <button
                                onClick={() => deleteExpense(expense.id)}
                                className="text-outline hover:text-error transition-colors p-1 rounded-full hover:bg-error/10"
                                title="Excluir gasto"
                              >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <span className={`text-[10px] px-2.5 py-1 rounded-2xl font-bold uppercase tracking-wider ${
                              isIncome ? "bg-mint-fresh/40 text-tertiary" : "bg-sakura-pink/30 text-primary"
                            }`}>
                              {expense.category}
                            </span>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="text-outline hover:text-error transition-colors p-1 rounded-full hover:bg-error/10"
                              title="Excluir gasto"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Cat-themed Empty State */
            <div className="flex flex-col items-center justify-center p-8 bg-cream-milk rounded-3xl border-2 border-dashed border-sakura-pink/30 text-center gap-4 my-6">
              <div className="w-20 h-20 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[48px]">pets</span>
              </div>
              <p className="font-headline-md text-headline-md text-soft-charcoal font-bold">
                Nenhuma transação encontrada, miau!
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant/80 max-w-xs">
                {selectedCategory === "all"
                  ? "Sua gavetinha de extratos está limpa! Adicione seu primeiro gasto usando o botão de patinha."
                  : `Nenhum gasto encontrado para a categoria "${filterCategories.find((c) => c.id === selectedCategory)?.label}".`}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
