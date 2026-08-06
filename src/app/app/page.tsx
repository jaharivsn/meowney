"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BalanceEditModal } from "@/components/BalanceEditModal";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";

function getCategoryIcon(category: string): string {
  const cat = category.toLowerCase();
  if (cat.includes("comida") || cat.includes("food") || cat.includes("ração")) return "restaurant";
  if (cat.includes("lazer") || cat.includes("play") || cat.includes("brinquedo")) return "sports_esports";
  if (cat.includes("casa") || cat.includes("home")) return "home";
  if (cat.includes("saúde") || cat.includes("medical") || cat.includes("vet")) return "medical_services";
  if (cat.includes("petisco") || cat.includes("treat")) return "redeem";
  if (cat.includes("presente") || cat.includes("gift")) return "card_giftcard";
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

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const balance = useHydratedStore((s) => s.balance, DEFAULT_STATE.balance);
  const setBalance = useMeowneyStore((s) => s.setBalance);
  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const goals = useHydratedStore((s) => s.goals, DEFAULT_STATE.goals);

  // Currency formatting
  const formattedBalance = balance.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [balanceInt, balanceDec] = formattedBalance.split(",");

  // Calculate monthly expenses (filter e.type === 'expense')
  const now = new Date();
  const monthlyExpenses = expenses
    .filter((e) => {
      if (!e.date || e.type !== 'expense') return false;
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const formattedMonthlyExpenses = monthlyExpenses.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Goals count
  const activeGoalsCount = goals.filter((g) => g.currentAmount < g.targetAmount).length;

  // Sorted recent expenses (latest first)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Sparkline calculation for last 7 days (filter e.type === 'expense')
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const dailySpend = last7Days.map((day) => {
    return expenses
      .filter((e) => {
        if (e.type !== 'expense') return false;
        const ed = new Date(e.date);
        return ed.toDateString() === day.toDateString();
      })
      .reduce((sum, e) => sum + e.amount, 0);
  });

  const maxSpend = Math.max(...dailySpend, 1);

  // Active goal for tip card
  const highlightGoal = goals.find((g) => g.currentAmount < g.targetAmount) || goals[0];
  const goalRemaining = highlightGoal
    ? Math.max(0, highlightGoal.targetAmount - highlightGoal.currentAmount)
    : 0;

  return (
    <>
      <Header title="Dashboard" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6">
          {/* Hero Section: Welcome & Balance */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sakura-pink/20 via-cream-milk to-lavender/20 p-6 shadow-sm border border-sakura-pink/20 mt-6">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-1">
                <p className="font-label-md text-label-md text-primary uppercase tracking-wider">
                  Saldo Purr-feito
                </p>
                <button
                  type="button"
                  onClick={() => setIsBalanceModalOpen(true)}
                  className="flex items-center gap-1 text-xs text-primary font-bold bg-white/60 hover:bg-white px-3 py-1.5 rounded-2xl shadow-sm transition-all active:scale-95"
                  aria-label="Editar saldo"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span>
                  Editar
                </button>
              </div>
              <h1 
                data-testid="dashboard-balance"
                tabIndex={0}
                role="button"
                aria-label={`Saldo atual: R$ ${formattedBalance}. Clique para editar.`}
                className="font-display-lg text-display-lg text-soft-charcoal flex items-baseline gap-1 cursor-pointer hover:opacity-80 transition-opacity outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl p-1 -ml-1"
                onClick={() => setIsBalanceModalOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsBalanceModalOpen(true);
                  }
                }}
              >
                <span className="text-headline-md font-headline-md opacity-60">R$</span>
                {balanceInt}
                <span className="text-headline-md font-headline-md opacity-60">,{balanceDec}</span>
              </h1>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-mint-fresh flex items-center justify-center ring-2 ring-white">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">
                      trending_up
                    </span>
                  </div>
                </div>
                <p className="font-label-sm text-label-sm text-tertiary font-medium">
                  Com base em suas transações reais 🐾
                </p>
              </div>
            </div>
            {/* Decorative Paw Background */}
            <div className="absolute -right-4 -bottom-4 opacity-10 rotate-12 pointer-events-none">
              <span
                className="material-symbols-outlined text-[120px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pets
              </span>
            </div>
          </section>

          {/* Quick Stats Grid */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-cream-milk p-5 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  shopping_basket
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  Gastos (Mês)
                </span>
              </div>
              <p className="font-data-mono text-data-mono text-soft-charcoal">
                R$ {formattedMonthlyExpenses}
              </p>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sakura-pink h-full rounded-full transition-all duration-1000"
                  style={{ width: mounted ? `${Math.min(100, (monthlyExpenses / (balance || 1)) * 100)}%` : "0%" }}
                ></div>
              </div>
            </div>
            <div className="bg-cream-milk p-5 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  savings
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  Cat-Stashes
                </span>
              </div>
              <p className="font-data-mono text-data-mono text-soft-charcoal">
                {activeGoalsCount} {activeGoalsCount === 1 ? "Ativa" : "Ativas"}
              </p>
              <div className="flex gap-1.5 items-center mt-1">
                {goals.length > 0 ? (
                  goals.slice(0, 4).map((g, idx) => (
                    <div
                      key={g.id || idx}
                      className={`w-2.5 h-2.5 rounded-full ${
                        g.currentAmount >= g.targetAmount ? "bg-mint-fresh" : "bg-sakura-pink"
                      }`}
                    ></div>
                  ))
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-variant"></div>
                )}
              </div>
            </div>
          </section>

          {/* Spending Trend Chart */}
          <section className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-sakura-pink/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-soft-charcoal">
                Purr-formance
              </h3>
              <span className="font-label-sm text-label-sm text-outline px-3 py-1 bg-surface-variant rounded-2xl">
                Últimos 7 Dias
              </span>
            </div>
            <div className="h-32 w-full flex items-end justify-between gap-2 px-1">
              {dailySpend.map((spend, i) => {
                const heightPercent = maxSpend > 0 && spend > 0 ? Math.max(15, Math.round((spend / maxSpend) * 100)) : 10;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-full transition-all duration-500 hover:bg-sakura-pink ${
                      i === 6 ? "bg-sakura-pink shadow-sm" : "bg-sakura-pink/30"
                    }`}
                    style={{ height: mounted ? `${heightPercent}%` : "0%" }}
                    title={`R$ ${spend.toFixed(2)}`}
                  ></div>
                );
              })}
            </div>
            <div className="flex justify-between mt-3 px-1">
              {last7Days.map((d, i) => (
                <span key={i} className="font-label-sm text-label-sm text-outline font-medium">
                  {d.toLocaleDateString("pt-BR", { weekday: "narrow" })}
                </span>
              ))}
            </div>
          </section>

          {/* Recent Transactions */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-soft-charcoal">
                Rações Recentes
              </h3>
              <Link href="/app/expenses" className="text-primary font-label-md text-label-md hover:underline font-bold">
                Ver Tudo
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer border border-surface-variant/20"
                  >
                    <div className="w-12 h-12 rounded-full bg-sakura-pink/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">
                        {getCategoryIcon(expense.category)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body-lg text-body-lg text-soft-charcoal font-semibold truncate">
                        {expense.title}
                      </p>
                      <p className="font-label-sm text-label-sm text-outline">
                        {formatExpenseDate(expense.date)} • {expense.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-data-mono text-data-mono ${expense.type === 'income' ? 'text-mint-fresh font-bold' : 'text-primary'}`}>
                        {expense.type === 'income' ? '+' : '-'}R$ {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                /* Empty State */
                <div className="bg-cream-milk p-6 rounded-3xl border-2 border-dashed border-sakura-pink/30 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">pets</span>
                  </div>
                  <p className="font-body-md text-body-md text-soft-charcoal font-medium">
                    Nenhum gasto registrado ainda! Clique no + de patinha para adicionar 🐾
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Empty State / Tip Card */}
          <section className="bg-primary-fixed p-6 rounded-3xl border-2 border-dashed border-primary/20 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-inner shrink-0">
              <span className="material-symbols-outlined text-primary text-[32px]">
                lightbulb
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-on-primary-fixed-variant font-bold">
              Economia Nyan-tástica!
            </p>
            <p className="font-body-md text-body-md text-on-primary-fixed-variant/80">
              {highlightGoal ? (
                <>
                  Faltam apenas R${" "}
                  {goalRemaining.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  para atingir sua meta '{highlightGoal.title}'. Continue assim!
                </>
              ) : (
                "Crie sua primeira meta na aba 'Metas' para acompanhar seus objetivos com facilidade! 🐱💰"
              )}
            </p>
          </section>

          {/* FAB Spacer */}
          <div className="h-10"></div>

          {/* Floating Action Button */}
          <Link
            href="/app/add"
            className="fixed bottom-24 right-6 w-16 h-16 bg-sakura-pink text-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group overflow-hidden"
            id="addExpenseBtn"
            aria-label="Adicionar transação"
            onClick={(e) => {
              const ripple = document.createElement("div");
              ripple.className = "absolute inset-0 bg-white/40 rounded-full animate-ping";
              e.currentTarget.appendChild(ripple);
              setTimeout(() => ripple.remove(), 600);
            }}
          >
            <div className="relative">
              <span
                className="material-symbols-outlined text-[32px] group-hover:rotate-12 transition-transform"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                pets
              </span>
            </div>
          </Link>
        </div>
      </main>

      {/* Balance Editing Modal */}
      <BalanceEditModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        currentBalance={balance}
        onSave={setBalance}
      />
    </>
  );
}

