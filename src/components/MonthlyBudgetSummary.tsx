"use client";

import { useState } from "react";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { Category, Expense } from "@/lib/schemas";

interface MonthlyBudgetSummaryProps {
  expenses?: Expense[];
  categories?: Category[];
}

export function MonthlyBudgetSummary({
  expenses: propExpenses,
  categories: propCategories,
}: MonthlyBudgetSummaryProps) {
  const storeExpenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const storeCategories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const updateCategory = useMeowneyStore((s) => s.updateCategory);

  const expenses = propExpenses ?? storeExpenses;
  const categories = propCategories ?? storeCategories;

  const [showDetails, setShowDetails] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempLimits, setTempLimits] = useState<Record<string, string>>({});

  const now = new Date();
  const currentMonthName = now.toLocaleDateString("pt-BR", { month: "long" });
  const capitalizedMonth =
    currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);
  const currentYear = now.getFullYear();

  // Filter expense categories
  const expenseCategories = categories.filter((c) => c.type === "expense");

  // Calculate spending per category for current month
  const categoryStats = expenseCategories.map((cat) => {
    const spent = expenses
      .filter((e) => {
        if (e.type !== "expense" || !e.date) return false;
        const d = new Date(e.date);
        if (isNaN(d.getTime())) return false;
        if (d.getMonth() !== now.getMonth() || d.getFullYear() !== currentYear)
          return false;
        const catName = e.category.toLowerCase().trim();
        return (
          catName === cat.label.toLowerCase().trim() ||
          catName === cat.id.toLowerCase().trim()
        );
      })
      .reduce((sum, e) => sum + e.amount, 0);

    const limit = cat.monthlyLimit || 0;
    const remaining = Math.max(0, limit - spent);
    const overAmount = spent > limit && limit > 0 ? spent - limit : 0;
    const isOver = limit > 0 && spent > limit;
    const percentage =
      limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
    const remainingPercentage =
      limit > 0
        ? Math.max(0, Math.round(((limit - spent) / limit) * 100))
        : 0;

    return {
      category: cat,
      spent,
      limit,
      remaining,
      overAmount,
      isOver,
      percentage,
      remainingPercentage,
    };
  });

  // Calculate totals across all expense categories
  const totalBudgeted = expenseCategories.reduce(
    (sum, c) => sum + (c.monthlyLimit || 0),
    0
  );

  const totalSpent = expenses
    .filter((e) => {
      if (e.type !== "expense" || !e.date) return false;
      const d = new Date(e.date);
      return (
        !isNaN(d.getTime()) &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === currentYear
      );
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const totalRemaining = totalBudgeted - totalSpent;
  const isTotalOver = totalBudgeted > 0 && totalSpent > totalBudgeted;
  const totalOverAmount = isTotalOver ? totalSpent - totalBudgeted : 0;

  const totalPercentageUsed =
    totalBudgeted > 0
      ? Math.min(100, (totalSpent / totalBudgeted) * 100)
      : 0;

  const totalPercentageRemaining =
    totalBudgeted > 0
      ? Math.max(0, Math.round(((totalBudgeted - totalSpent) / totalBudgeted) * 100))
      : 0;

  const handleOpenEdit = () => {
    const limitsMap: Record<string, string> = {};
    expenseCategories.forEach((c) => {
      limitsMap[c.id] = c.monthlyLimit !== undefined ? c.monthlyLimit.toString() : "";
    });
    setTempLimits(limitsMap);
    setIsEditModalOpen(true);
  };

  const handleSaveLimits = () => {
    expenseCategories.forEach((c) => {
      const valStr = tempLimits[c.id]?.trim();
      const numVal = parseFloat(valStr?.replace(",", ".") || "");
      const newLimit = isNaN(numVal) || numVal <= 0 ? undefined : numVal;
      updateCategory(c.id, { monthlyLimit: newLimit });
    });
    setIsEditModalOpen(false);
  };

  // Status message & tone
  let statusMessage = "";
  let statusBadgeBg = "bg-mint-fresh/30 text-tertiary border-mint-fresh/50";
  let progressBarColor = "bg-tertiary";

  if (totalBudgeted === 0) {
    statusMessage = "Defina limites para suas categorias para acompanhar o orçamento.";
    statusBadgeBg = "bg-cream-milk text-on-surface-variant border-sakura-pink/30";
    progressBarColor = "bg-outline/40";
  } else if (isTotalOver) {
    statusMessage = `Atenção: ultrapassou o teto em R$ ${totalOverAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}!`;
    statusBadgeBg = "bg-error/15 text-error border-error/30";
    progressBarColor = "bg-error";
  } else if (totalPercentageRemaining <= 15) {
    statusMessage = `Alerta: restam apenas ${totalPercentageRemaining}% do orçamento mensal.`;
    statusBadgeBg = "bg-sakura-pink/40 text-primary border-sakura-pink/60";
    progressBarColor = "bg-primary";
  } else if (totalPercentageRemaining <= 35) {
    statusMessage = `Bom ritmo: ${totalPercentageRemaining}% do teto mensal disponível.`;
    statusBadgeBg = "bg-lavender/35 text-primary border-lavender/50";
    progressBarColor = "bg-[#7b4551]";
  } else {
    statusMessage = `Purr-feito! Você tem ${totalPercentageRemaining}% do orçamento livre.`;
    statusBadgeBg = "bg-mint-fresh/30 text-tertiary border-mint-fresh/50";
    progressBarColor = "bg-tertiary";
  }

  return (
    <section
      id="monthly-budget-summary"
      className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-sakura-pink/20 flex flex-col gap-5 transition-all"
      aria-label="Resumo do Orçamento Mensal"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-sakura-pink/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">
              account_balance_wallet
            </span>
          </div>
          <div>
            <h2 className="font-headline-md text-headline-md text-soft-charcoal leading-none">
              Orçamento Mensal
            </h2>
            <p className="font-label-sm text-outline capitalize mt-0.5">
              {capitalizedMonth} {currentYear}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenEdit}
          id="btn-edit-monthly-budget"
          className="flex items-center gap-1.5 text-xs text-primary font-bold bg-cream-milk/80 hover:bg-cream-milk px-3 py-1.5 rounded-2xl border border-sakura-pink/30 shadow-sm transition-all active:scale-95"
          aria-label="Ajustar limites de categorias"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          Ajustar Tetos
        </button>
      </div>

      {/* Main Budget Card */}
      <div className="bg-cream-milk/50 rounded-2xl p-4 sm:p-5 border border-sakura-pink/25 flex flex-col gap-4">
        {/* Metrics Overview Grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
          <div className="bg-white/80 p-3 rounded-2xl border border-sakura-pink/15 flex flex-col items-center justify-center">
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">
              Gasto no Mês
            </span>
            <p className="font-data-mono text-sm sm:text-base font-bold text-soft-charcoal mt-0.5">
              R$ {totalSpent.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white/80 p-3 rounded-2xl border border-sakura-pink/15 flex flex-col items-center justify-center">
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">
              Teto Orçado
            </span>
            <p className="font-data-mono text-sm sm:text-base font-bold text-soft-charcoal mt-0.5">
              {totalBudgeted > 0
                ? `R$ ${totalBudgeted.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : "Sem teto"}
            </p>
          </div>

          <div
            className={`p-3 rounded-2xl border flex flex-col items-center justify-center ${
              isTotalOver
                ? "bg-error/10 border-error/30 text-error"
                : "bg-mint-fresh/25 border-mint-fresh/40 text-tertiary"
            }`}
          >
            <span className="font-label-sm text-xs font-semibold">
              {isTotalOver ? "Ultrapassado" : "Restante"}
            </span>
            <p className="font-data-mono text-sm sm:text-base font-bold mt-0.5">
              {isTotalOver
                ? `+R$ ${totalOverAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : `R$ ${Math.max(0, totalRemaining).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </p>
          </div>
        </div>

        {/* Progress Bar Container */}
        {totalBudgeted > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-soft-charcoal flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">
                  donut_large
                </span>
                Uso do Limite
              </span>
              <span
                className={`px-2 py-0.5 rounded-full border text-[11px] font-bold ${
                  isTotalOver
                    ? "bg-error text-white border-error"
                    : totalPercentageRemaining <= 20
                      ? "bg-sakura-pink text-primary border-sakura-pink"
                      : "bg-mint-fresh/60 text-tertiary border-mint-fresh"
                }`}
              >
                {isTotalOver
                  ? "Limite Excedido"
                  : `${totalPercentageRemaining}% restante`}
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div
              className="relative h-4 w-full rounded-full bg-white/90 border border-sakura-pink/30 overflow-hidden p-0.5 shadow-inner"
              role="progressbar"
              aria-valuenow={Math.round(totalPercentageUsed)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso do orçamento: ${Math.round(totalPercentageUsed)}% utilizado`}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${progressBarColor}`}
                style={{ width: `${Math.max(4, Math.min(100, totalPercentageUsed))}%` }}
              />
            </div>

            {/* Markers underneath */}
            <div className="flex justify-between text-[11px] text-outline font-medium px-0.5">
              <span>R$ 0</span>
              <span>50% (R$ {(totalBudgeted / 2).toLocaleString("pt-BR", { maximumFractionDigits: 0 })})</span>
              <span>R$ {totalBudgeted.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 p-3.5 rounded-2xl border border-dashed border-sakura-pink/40 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-soft-charcoal">
              <span className="material-symbols-outlined text-primary text-[20px]">
                info
              </span>
              <span>Nenhum teto orçado para as categorias ainda.</span>
            </div>
            <button
              type="button"
              onClick={handleOpenEdit}
              className="text-xs bg-sakura-pink text-primary font-bold px-3 py-1.5 rounded-xl shrink-0 active:scale-95"
            >
              Definir agora
            </button>
          </div>
        )}

        {/* Status Message / Cat Advice Pill */}
        <div
          className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium ${statusBadgeBg}`}
        >
          <span className="material-symbols-outlined text-[18px] shrink-0">
            pets
          </span>
          <span className="truncate">{statusMessage}</span>
        </div>
      </div>

      {/* Category Breakdown Toggle & List */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="flex items-center gap-1 text-xs font-bold text-soft-charcoal hover:text-primary transition-colors"
            aria-expanded={showDetails}
            aria-controls="category-budget-breakdown"
          >
            <span>Detalhamento por Categoria</span>
            <span
              className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                showDetails ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          </button>
          <span className="text-[11px] text-outline font-medium">
            {categoryStats.filter((c) => c.limit > 0).length} de {categoryStats.length} com teto
          </span>
        </div>

        {showDetails && (
          <div
            id="category-budget-breakdown"
            className="flex flex-col gap-2.5 animate-fadeIn"
          >
            {categoryStats.map((item) => {
              const {
                category,
                spent,
                limit,
                remaining,
                isOver,
                percentage,
                remainingPercentage,
                overAmount,
              } = item;

              return (
                <div
                  key={category.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isOver
                      ? "bg-error/5 border-error/30"
                      : limit > 0
                        ? "bg-cream-milk/30 border-sakura-pink/20"
                        : "bg-surface-container-low/40 border-outline-variant/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="material-symbols-outlined p-1.5 rounded-xl text-primary text-[18px] shrink-0"
                        style={{
                          backgroundColor: `${category.color || "#FFB7C5"}55`,
                        }}
                      >
                        {category.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-soft-charcoal truncate">
                          {category.label}
                        </p>
                        <p className="text-[11px] text-outline">
                          {limit > 0
                            ? `Gasto: R$ ${spent.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de R$ ${limit.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : `Gasto: R$ ${spent.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (sem teto)`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {limit > 0 ? (
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-lg inline-block ${
                            isOver
                              ? "bg-error/15 text-error"
                              : remainingPercentage <= 20
                                ? "bg-sakura-pink/40 text-primary"
                                : "bg-mint-fresh/35 text-tertiary"
                          }`}
                        >
                          {isOver
                            ? `+R$ ${overAmount.toFixed(0)} excedido`
                            : `R$ ${remaining.toFixed(0)} restante`}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={handleOpenEdit}
                          className="text-[11px] text-primary font-bold hover:underline"
                        >
                          + Definir teto
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Progress bar */}
                  {limit > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-white border border-sakura-pink/20 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isOver
                              ? "bg-error"
                              : percentage >= 80
                                ? "bg-primary"
                                : "bg-mint-fresh"
                          }`}
                          style={{ width: `${Math.max(3, percentage)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-outline w-9 text-right shrink-0">
                        {percentage}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Category Budgets Modal */}
      {isEditModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-budget-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn"
        >
          <div className="bg-surface-container-lowest rounded-3xl p-6 w-full max-w-md border border-sakura-pink/30 shadow-xl flex flex-col gap-4 max-h-[85vh] overflow-hidden">
            <div className="flex items-center justify-between border-b border-sakura-pink/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">
                  tune
                </span>
                <h3
                  id="modal-budget-title"
                  className="font-headline-md text-headline-md text-soft-charcoal"
                >
                  Ajustar Tetos Mensais
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-outline hover:text-soft-charcoal hover:bg-cream-milk transition-all"
                aria-label="Fechar modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed">
              Defina o valor máximo que você planeja gastar por mês em cada categoria. Deixe em branco para sem limite.
            </p>

            <div className="flex flex-col gap-3 overflow-y-auto pr-1 py-1 max-h-[50vh]">
              {expenseCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-cream-milk/50 border border-sakura-pink/20 gap-3"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="material-symbols-outlined p-2 rounded-xl text-primary text-[18px]"
                      style={{
                        backgroundColor: `${cat.color || "#FFB7C5"}55`,
                      }}
                    >
                      {cat.icon}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-soft-charcoal truncate">
                      {cat.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs font-bold text-outline">R$</span>
                    <input
                      type="number"
                      min={0}
                      step={10}
                      value={tempLimits[cat.id] ?? ""}
                      onChange={(e) =>
                        setTempLimits((prev) => ({
                          ...prev,
                          [cat.id]: e.target.value,
                        }))
                      }
                      placeholder="Sem teto"
                      className="w-24 bg-white p-2 text-xs sm:text-sm font-bold text-soft-charcoal rounded-xl border border-outline/20 outline-none focus:ring-2 focus:ring-primary text-right"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-sakura-pink/20">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2.5 rounded-2xl font-bold text-xs text-outline hover:bg-cream-milk transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveLimits}
                className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-sakura-pink text-primary hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
              >
                Salvar Orçamento
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
