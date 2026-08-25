"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { BalanceEditModal } from "@/components/BalanceEditModal";
import { CatPawAnimation } from "@/components/brand/CatPawAnimation";
import { CatMascot } from "@/components/CatMascot";
import { CountUp } from "@/components/CountUp";
import { CatChatSheet } from "@/components/CatChatSheet";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { buildWeeklyInsight } from "@/lib/insights";
import { getPersonality } from "@/lib/personalities";

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
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const formattedMonthlyExpenses = monthlyExpenses.toLocaleString("pt-BR", {
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
  const maxSpend = Math.max(...dailySpend, 1);

  const envelopes = categories.filter((c) => c.type === "expense" && c.monthlyLimit && c.monthlyLimit > 0);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const handleInsightAction = () => {
    if (insight.actionGoalId && insight.actionAmount) {
      updateGoalProgress(insight.actionGoalId, insight.actionAmount);
    }
  };

  return (
    <>
      <Header title="Dashboard" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6">
          <section className="relative overflow-hidden rounded-3xl bg-cream-milk p-6 shadow-sm border border-sakura-pink/20 mt-6">
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
                aria-label={`Saldo atual: R$ ${balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}. Clique para editar.`}
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
                <CountUp value={balance} />
              </h1>
              <div className="flex items-center justify-between mt-4">
                <p className="font-label-sm text-label-sm text-tertiary font-medium">
                  Com base em suas transações reais
                </p>
                <CatPawAnimation count={3} size={18} className="hidden sm:inline-flex opacity-80" />
              </div>
            </div>
          </section>

          <section
            className={`rounded-3xl p-4 border shadow-sm flex gap-3 items-start ${
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
              <p className="font-label-sm text-primary font-bold mb-1">{persona.namePt}</p>
              <p className="font-body-md text-sm text-on-surface leading-relaxed">{insight.sentence}</p>
              {insight.actionLabel &&
                (insight.actionGoalId ? (
                  <button
                    type="button"
                    onClick={handleInsightAction}
                    className="mt-2 inline-flex items-center gap-1 px-3 py-2 rounded-2xl bg-sakura-pink text-primary font-label-md font-bold text-sm active:scale-95"
                  >
                    {insight.actionLabel}
                  </button>
                ) : (
                  <Link
                    href={insight.actionHref || "/app/add"}
                    className="mt-2 inline-flex items-center gap-1 px-3 py-2 rounded-2xl bg-sakura-pink text-primary font-label-md font-bold text-sm"
                  >
                    {insight.actionLabel}
                  </Link>
                ))}
            </div>
          </section>

          {envelopes.length > 0 && (
            <section className="flex flex-col gap-2">
              {envelopes.map((cat) => {
                const spent = expenses
                  .filter((e) => {
                    if (e.type !== "expense") return false;
                    const d = new Date(e.date);
                    if (d < monthStart) return false;
                    const n = e.category.toLowerCase();
                    return n === cat.label.toLowerCase() || n === cat.id.toLowerCase();
                  })
                  .reduce((s, e) => s + e.amount, 0);
                const limit = cat.monthlyLimit || 1;
                const pct = Math.min(100, Math.round((spent / limit) * 100));
                const over = spent > limit;
                return (
                  <div
                    key={cat.id}
                    className={`rounded-2xl p-3 border ${over ? "bg-sakura-pink/30 border-sakura-pink" : "bg-mint-fresh/20 border-mint-fresh/40"}`}
                  >
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span>{cat.label}</span>
                      <span>
                        R$ {spent.toFixed(0)} / {limit.toFixed(0)}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white overflow-hidden">
                      <div
                        className={`h-full rounded-full ${over ? "bg-primary" : "bg-mint-fresh"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          <section className="grid grid-cols-2 gap-4">
            <Link
              href="/app/expenses"
              className="bg-cream-milk p-5 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-2 hover:shadow-md active:scale-[0.98] transition-all"
            >
              <span className="font-label-sm text-on-surface-variant font-bold">Gastos (Mês)</span>
              <p className="font-data-mono text-data-mono text-soft-charcoal">
                R$ {formattedMonthlyExpenses}
              </p>
            </Link>
            <Link
              href="/app/goals"
              className="bg-cream-milk p-5 rounded-3xl shadow-sm border border-sakura-pink/20 flex flex-col gap-2 hover:shadow-md active:scale-[0.98] transition-all"
            >
              <span className="font-label-sm text-on-surface-variant font-bold">Cat-Stashes</span>
              <p className="font-data-mono text-data-mono text-soft-charcoal">
                {activeGoalsCount} {activeGoalsCount === 1 ? "ativa" : "ativas"}
              </p>
            </Link>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-sakura-pink/20">
            <h3 className="font-headline-md text-headline-md text-soft-charcoal mb-6">Purr-formance</h3>
            <div className="h-32 w-full flex items-end justify-between gap-2 px-1">
              {dailySpend.map((spend, i) => {
                const heightPercent =
                  maxSpend > 0 && spend > 0 ? Math.max(15, Math.round((spend / maxSpend) * 100)) : 10;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-t-full ${i === 6 ? "bg-sakura-pink" : "bg-sakura-pink/30"}`}
                    style={{ height: mounted ? `${heightPercent}%` : "0%" }}
                    title={`R$ ${spend.toFixed(2)}`}
                  />
                );
              })}
            </div>
            <div className="flex justify-between mt-3 px-1">
              {last7Days.map((d, i) => (
                <span key={i} className="font-label-sm text-outline">
                  {d.toLocaleDateString("pt-BR", { weekday: "narrow" })}
                </span>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-soft-charcoal">Rações Recentes</h3>
              <Link href="/app/expenses" className="text-primary font-label-md font-bold">
                Ver Tudo
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {recentExpenses.length > 0 ? (
                recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-surface-variant/20 animate-in fade-in"
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
                      <p className="font-label-sm text-outline">
                        {formatExpenseDate(expense.date)} • {expense.category}
                      </p>
                    </div>
                    <p
                      className={`font-data-mono ${expense.type === "income" ? "text-tertiary font-bold" : "text-primary"}`}
                    >
                      {expense.type === "income" ? "+" : "-"}R${" "}
                      {expense.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-cream-milk p-6 rounded-3xl border-2 border-dashed border-sakura-pink/30 flex flex-col items-center text-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[32px]">pets</span>
                  <p className="font-body-md text-soft-charcoal font-medium">
                    Nenhum gasto ainda. Toque na patinha e registre o primeiro.
                  </p>
                  <Link
                    href="/app/add"
                    className="px-5 py-3 rounded-2xl bg-sakura-pink text-primary font-bold"
                  >
                    Adicionar gasto
                  </Link>
                </div>
              )}
            </div>
          </section>

          <Link
            href="/app/add"
            className="fixed bottom-24 right-6 w-16 h-16 bg-sakura-pink text-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
            id="addExpenseBtn"
            aria-label="Adicionar transação"
          >
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
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
