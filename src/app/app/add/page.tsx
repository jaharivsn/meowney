"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { tomorrowIso } from "@/lib/recurrence";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "back"] as const;

function parseAmount(raw: string): number {
  return parseFloat(raw.replace(/\./g, "").replace(",", ".")) || 0;
}

export default function AddExpense() {
  const router = useRouter();
  const addExpense = useMeowneyStore((s) => s.addExpense);
  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);

  const [transactionType, setTransactionType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [note, setNote] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [every, setEvery] = useState<"week" | "month">("month");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredCategories = categories.filter((c) => c.type === transactionType);

  useEffect(() => {
    if (
      filteredCategories.length > 0 &&
      !filteredCategories.find((c) => c.id === selectedCategory)
    ) {
      setSelectedCategory(filteredCategories[0].id);
    }
  }, [transactionType, categories, filteredCategories, selectedCategory]);

  const selectedCategoryObj =
    filteredCategories.find((cat) => cat.id === selectedCategory) || filteredCategories[0];

  const pressKey = (key: (typeof KEYS)[number]) => {
    setErrorMessage("");
    if (key === "back") {
      setAmount((prev) => prev.slice(0, -1));
      return;
    }
    if (key === ",") {
      setAmount((prev) => (prev.includes(",") ? prev : prev ? prev + "," : "0,"));
      return;
    }
    setAmount((prev) => {
      const [int, dec] = prev.split(",");
      if (dec !== undefined && dec.length >= 2) return prev;
      if (!prev || prev === "0") return key;
      if (int && int.length >= 8 && dec === undefined) return prev;
      return prev + key;
    });
  };

  const handlePurchase = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");
    const parsedAmount = parseAmount(amount);
    if (parsedAmount <= 0) {
      setErrorMessage("Informe um valor maior que R$ 0,00.");
      return;
    }
    const titleToUse = note.trim() || selectedCategoryObj?.label || "Transação";
    setSaving(true);
    addExpense({
      title: titleToUse,
      amount: parsedAmount,
      category: selectedCategoryObj?.label || "Geral",
      type: transactionType,
      date: new Date().toISOString(),
      recurrence: recurring
        ? { every, nextDate: tomorrowIso() }
        : undefined,
    });
    router.push("/app/expenses");
  };

  return (
    <>
      <Header title="Nova Transação" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex justify-center pt-6 px-margin-mobile">
          <div className="bg-surface-container flex rounded-2xl p-1.5 w-full max-w-sm border border-sakura-pink/20 shadow-sm">
            <button
              data-testid="expense-tab"
              type="button"
              onClick={() => setTransactionType("expense")}
              className={`flex-1 py-2.5 rounded-2xl font-label-md transition-all font-bold min-h-[44px] ${
                transactionType === "expense"
                  ? "bg-sakura-pink text-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-sakura-pink/20"
              }`}
            >
              Gasto (-)
            </button>
            <button
              data-testid="income-tab"
              type="button"
              onClick={() => setTransactionType("income")}
              className={`flex-1 py-2.5 rounded-2xl font-label-md transition-all font-bold min-h-[44px] ${
                transactionType === "income"
                  ? "bg-mint-fresh text-tertiary shadow-sm"
                  : "text-on-surface-variant hover:bg-sakura-pink/20"
              }`}
            >
              Renda (+)
            </button>
          </div>
        </div>

        <form onSubmit={handlePurchase} className="flex flex-col w-full px-margin-mobile gap-4 pb-8">
          <div className="relative z-10 flex flex-col items-center justify-center py-4">
            <span className="font-label-md text-label-md text-primary/60 uppercase tracking-widest mb-2 font-bold">
              Valor {transactionType === "expense" ? "gasto" : "recebido"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-display-lg text-primary/40">R$</span>
              <input
                data-testid="amount-input"
                inputMode="decimal"
                autoComplete="off"
                className="bg-transparent border-none text-center font-data-mono text-display-lg text-on-background focus:ring-0 w-52 placeholder:text-surface-variant outline-none"
                placeholder="0,00"
                value={amount}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^\d,]/g, "");
                  setAmount(v);
                  if (errorMessage) setErrorMessage("");
                }}
              />
            </div>
            {errorMessage && (
              <p className="text-error font-label-md text-label-md bg-error/10 px-4 py-2 rounded-2xl mt-4 animate-shake">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto w-full">
            {KEYS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => pressKey(k)}
                className="h-14 rounded-2xl bg-cream-milk border border-sakura-pink/20 font-data-mono text-xl font-bold text-on-surface active:scale-95 transition-transform"
                aria-label={k === "back" ? "Apagar" : k}
              >
                {k === "back" ? (
                  <span className="material-symbols-outlined">backspace</span>
                ) : (
                  k
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {filteredCategories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-3xl bg-cream-milk hover:scale-105 active:scale-95 transition-all shadow-sm border-2 min-h-[88px] ${
                  selectedCategory === cat.id
                    ? "ring-2 ring-primary border-primary"
                    : "border-sakura-pink/20"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 text-primary"
                  style={{ backgroundColor: `${cat.color || "#FFB7C5"}55` }}
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          <div className="bg-cream-milk p-4 rounded-3xl border border-sakura-pink/20 flex flex-col gap-2 shadow-sm">
            <label className="font-headline-md text-label-md text-primary flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
              Nota (opcional)
            </label>
            <textarea
              data-testid="note-input"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-transparent border-none focus:ring-0 font-body-md text-on-surface-variant placeholder:text-outline-variant resize-none h-16 w-full outline-none"
              placeholder="O que o gatinho comprou?"
            />
          </div>

          <label className="flex items-center gap-3 bg-cream-milk p-4 rounded-3xl border border-sakura-pink/20">
            <input
              type="checkbox"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="w-5 h-5 accent-[#864e5a]"
            />
            <span className="font-label-md text-on-surface font-bold flex-1">
              Repetir automaticamente
            </span>
            {recurring && (
              <select
                value={every}
                onChange={(e) => setEvery(e.target.value as "week" | "month")}
                className="bg-white rounded-xl px-3 py-2 font-body-md text-sm outline-none border border-outline/20"
              >
                <option value="week">Toda semana</option>
                <option value="month">Todo mês</option>
              </select>
            )}
          </label>

          <button
            data-testid="submit-btn"
            type="submit"
            disabled={saving}
            className="w-full bg-sakura-pink text-primary py-4 rounded-2xl font-headline-md text-headline-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[52px]"
          >
            <span className="material-symbols-outlined">pets</span>
            Purr-chase
          </button>
        </form>
      </main>
    </>
  );
}
