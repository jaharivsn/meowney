"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BalanceEditModal } from "@/components/BalanceEditModal";
import { CatMascot } from "@/components/CatMascot";
import { CountUp } from "@/components/CountUp";
import { CatChatSheet } from "@/components/CatChatSheet";
import { MonthlyBudgetSummary } from "@/components/MonthlyBudgetSummary";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { useMounted } from "@/hooks/useMounted";
import { buildWeeklyInsight } from "@/lib/insights";
import { getPersonality } from "@/lib/personalities";
import { Category } from "@/lib/schemas";

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
    if (isYesterday) return "Ontem";
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function Dashboard() {
  const mounted = useMounted();
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeChartDay, setActiveChartDay] = useState<number | null>(6); // Default to today

  const balance = useHydratedStore((s) => s.balance, DEFAULT_STATE.balance);
  const setBalance = useMeowneyStore((s) => s.setBalance);
  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const goals = useHydratedStore((s) => s.goals, DEFAULT_STATE.goals);
  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const personality = useHydratedStore((s) => s.personality, DEFAULT_STATE.personality);
  const updateGoalProgress = useMeowneyStore((s) => s.updateGoalProgress);

  const insight = buildWeeklyInsight(expenses, goals, categories, personality);
  const persona = getPersonality(personality);

  const now = new Date();
  const monthlyExpenses = expenses
    .filter((e) => {
      if (!e.date || e.type !== "expense") return false;
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const monthlyIncome = expenses
    .filter((e) => {
      if (!e.date || e.type !== "income") return false;
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const formattedMonthlyExpenses = monthlyExpenses.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedMonthlyIncome = monthlyIncome.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const activeGoalsCount = goals.filter((g) => g.currentAmount < g.targetAmount).length;
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const dailySpend = last7Days.map((day) =>
    expenses
      .filter((e) => {
        if (!e.date || e.type !== "expense") return false;
        return new Date(e.date).toDateString() === day.toDateString();
      })
      .reduce((sum, e) => sum + e.amount, 0)
  );

  const total7Days = dailySpend.reduce((a, b) => a + b, 0);
  const avg7Days = total7Days / 7;
  const maxSpend = Math.max(...dailySpend, 1);

  const handleInsightAction = () => {
    if (insight.actionGoalId && insight.actionAmount) {
      updateGoalProgress(insight.actionGoalId, insight.actionAmount);
    }
  };

  return (
    <>
      <Header title="Dashboard" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6 max-w-2xl mx-auto">
          {/* Balance Card */}
          <section className="relative overflow-hidden rounded-3xl bg-cream-milk p-6 shadow-sm border border-sakura-pink/20 mt-6">
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    pets
                  </span>
                  <p className="font-label-md text-label-md text-primary uppercase tracking-wider font-bold">
                    Saldo Purr-feito
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBalanceModalOpen(true)}
                  className="flex items-center gap-1 text-xs text-primary font-bold bg-white/80 hover:bg-white px-3 py-1.5 rounded-2xl shadow-xs border border-sakura-pink/20 transition-all active:scale-95"
                  aria-label="Editar saldo"
                >
                  <span className="material-symbols-outlined text-[15px]">edit</span>
                  Editar
                </button>
              </div>

              <h1
                data-testid="dashboard-balance"
                tabIndex={0}
                role="button"
                aria-label={`Saldo atual: R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Clique para editar.`}
                className="font-display-lg text-display-lg text-soft-charcoal flex items-baseline gap-1.5 whitespace-nowrap flex-nowrap cursor-pointer hover:opacity-85 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl p-1 -ml-1 select-none"
                onClick={() => setIsBalanceModalOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsBalanceModalOpen(true);
                  }
                }}
              >
                <span className="text-headline-md font-headline-md opacity-60 shrink-0 whitespace-nowrap">R$</span>
                <CountUp value={balance} className="whitespace-nowrap" />
              </h1>

              {/* Monthly Income / Expense Mini Pills */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-sakura-pink/15">
                <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-2xl border border-sakura-pink/15">
                  <div className="w-6 h-6 rounded-full bg-mint-fresh/40 flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-outline uppercase font-bold block leading-none">Entradas</span>
                    <span className="font-data-mono text-xs font-bold text-tertiary truncate block mt-0.5">
                      +R$ {formattedMonthlyIncome}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-white/70 px-3 py-2 rounded-2xl border border-sakura-pink/15">
                  <div className="w-6 h-6 rounded-full bg-sakura-pink/40 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] text-outline uppercase font-bold block leading-none">Saídas</span>
                    <span className="font-data-mono text-xs font-bold text-primary truncate block mt-0.5">
                      -R$ {formattedMonthlyExpenses}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cat Insight Card */}
          <section
            className={`rounded-3xl p-4 border shadow-sm flex gap-3 items-start transition-all ${
              insight.tone === "warn"
                ? "bg-sakura-pink/25 border-sakura-pink/50"
                : insight.tone === "celebrate"
                  ? "bg-mint-fresh/30 border-mint-fresh/50"
                  : "bg-lavender/25 border-lavender/40"
            }`}
          >
            <CatMascot
              personality={personality}
              size={56}
              twitch
              onClick={() => setChatOpen(true)}
              label={`Conversar com ${persona.namePt}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <p className="font-label-sm text-primary font-bold">{persona.namePt}</p>
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5 bg-white/60 px-2 py-0.5 rounded-full"
                >
                  <span className="material-symbols-outlined text-[13px]">chat</span>
                  Conversar
                </button>
              </div>
              <p className="font-body-md text-sm text-on-surface leading-relaxed">{insight.sentence}</p>
              {insight.actionLabel &&
                (insight.actionGoalId ? (
                  <button
                    type="button"
                    onClick={handleInsightAction}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-sakura-pink text-primary font-label-md font-bold text-xs shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">savings</span>
                    {insight.actionLabel}
                  </button>
                ) : (
                  <Link
                    href={insight.actionHref || "/app/add"}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-sakura-pink text-primary font-label-md font-bold text-xs shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">add</span>
                    {insight.actionLabel}
                  </Link>
                ))}
            </div>
          </section>

          {/* Monthly Budget Summary */}
          <MonthlyBudgetSummary expenses={expenses} categories={categories} />

          {/* Quick Stat Tiles */}
          <section className="grid grid-cols-2 gap-3.5">
            <Link
              href="/app/expenses"
              className="bg-cream-milk p-4 sm:p-5 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-1.5 hover:shadow-md active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-on-surface-variant font-bold">Gastos (Mês)</span>
                <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="font-data-mono text-lg sm:text-data-mono text-soft-charcoal font-bold">
                R$ {formattedMonthlyExpenses}
              </p>
            </Link>

            <Link
              href="/app/goals"
              className="bg-cream-milk p-4 sm:p-5 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-1.5 hover:shadow-md active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-on-surface-variant font-bold">Cat-Stashes</span>
                <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </div>
              <p className="font-data-mono text-lg sm:text-data-mono text-soft-charcoal font-bold">
                {activeGoalsCount} {activeGoalsCount === 1 ? "ativa" : "ativas"}
              </p>
            </Link>
          </section>

          {/* Interactive Purr-formance 7-Day Chart */}
          <section className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline-md text-headline-md text-soft-charcoal">Purr-formance</h3>
                <p className="font-label-sm text-xs text-outline mt-0.5">
                  Média diária: R$ {avg7Days.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              {/* Active Day Detail Badge */}
              {activeChartDay !== null && (
                <div className="bg-cream-milk px-3 py-1 rounded-2xl border border-sakura-pink/30 text-right animate-fadeIn">
                  <span className="text-[10px] text-outline uppercase font-bold block">
                    {last7Days[activeChartDay].toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}
                  </span>
                  <span className="font-data-mono text-xs font-bold text-primary">
                    R$ {dailySpend[activeChartDay].toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              )}
            </div>

            {/* Interactive Bars */}
            <div className="h-32 w-full flex items-end justify-between gap-2 px-1 pt-4">
              {dailySpend.map((spend, i) => {
                const heightPercent =
                  maxSpend > 0 && spend > 0 ? Math.max(16, Math.round((spend / maxSpend) * 100)) : 10;
                const isSelected = activeChartDay === i;
                const isToday = i === 6;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveChartDay(i)}
                    className="flex-1 flex flex-col items-center h-full justify-end group outline-none"
                    aria-label={`${last7Days[i].toLocaleDateString("pt-BR", { weekday: "long" })}: R$ ${spend.toFixed(2)}`}
                  >
                    <div
                      className={`w-full rounded-t-2xl transition-all duration-300 ${
                        isSelected
                          ? "bg-primary shadow-sm"
                          : isToday
                            ? "bg-sakura-pink hover:bg-primary/70"
                            : "bg-sakura-pink/35 hover:bg-sakura-pink/60"
                      }`}
                      style={{ height: mounted ? `${heightPercent}%` : "0%" }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between px-1">
              {last7Days.map((d, i) => {
                const isSelected = activeChartDay === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveChartDay(i)}
                    className={`font-label-sm text-xs capitalize flex-1 text-center transition-colors ${
                      isSelected ? "text-primary font-bold" : "text-outline hover:text-soft-charcoal"
                    }`}
                  >
                    {d.toLocaleDateString("pt-BR", { weekday: "narrow" })}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Recent Transactions Section */}
          <section className="flex flex-col gap-3.5">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-soft-charcoal">Rações Recentes</h3>
              <Link href="/app/expenses" className="text-primary font-label-md font-bold text-xs hover:underline flex items-center gap-0.5">
                Ver Tudo
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => {
                  const meta = getCategoryMeta(expense.category, categories);
                  const isIncome = expense.type === "income";

                  return (
                    <div
                      key={expense.id}
                      className="flex items-center gap-3.5 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-surface-variant/20 hover:border-sakura-pink/30 transition-all"
                    >
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-primary"
                        style={{ backgroundColor: `${meta.color}55` }}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {meta.icon}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-body-lg text-sm sm:text-base text-soft-charcoal font-semibold truncate">
                          {expense.title}
                          {expense.isRecurringInstance && (
                            <span className="ml-1 text-[11px] text-outline font-normal" title="Recorrência">↻</span>
                          )}
                        </p>
                        <p className="font-label-sm text-[11px] sm:text-xs text-outline flex items-center gap-1">
                          <span>{formatExpenseDate(expense.date)}</span>
                          <span>•</span>
                          <span className="truncate">{expense.category}</span>
                        </p>
                      </div>

                      <p
                        className={`font-data-mono text-sm sm:text-base font-bold shrink-0 ${
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
                  );
                })
              ) : (
                <div className="bg-cream-milk p-6 rounded-3xl border-2 border-dashed border-sakura-pink/30 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[26px]">pets</span>
                  </div>
                  <p className="font-body-md text-sm text-soft-charcoal font-medium">
                    Nenhum gasto ainda. Toque no botão flutuante e registre o primeiro!
                  </p>
                  <Link
                    href="/app/add"
                    className="px-5 py-2.5 rounded-2xl bg-sakura-pink text-primary font-bold text-xs shadow-xs hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Adicionar gasto
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Floating Action Button */}
          <Link
            href="/app/add"
            className="fixed bottom-24 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-sakura-pink text-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-40 border-2 border-white"
            id="addExpenseBtn"
            aria-label="Adicionar transação"
          >
            <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              pets
            </span>
          </Link>
        </div>
      </main>

      <BalanceEditModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        currentBalance={balance}
        onSave={setBalance}
      />
      <CatChatSheet isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
