"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { tomorrowIso } from "@/lib/recurrence";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ",", "0", "back"] as const;
const PRESET_AMOUNTS = [10, 20, 50, 100];

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
  const [selectedDate, setSelectedDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [recurring, setRecurring] = useState(false);
  const [every, setEvery] = useState<"week" | "month">("month");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredCategories = categories.filter((c) => c.type === transactionType);

  const effectiveCategory = filteredCategories.some((c) => c.id === selectedCategory)
    ? selectedCategory
    : filteredCategories[0]?.id || "";

  const selectedCategoryObj =
    filteredCategories.find((cat) => cat.id === effectiveCategory) || filteredCategories[0];

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

  const addPreset = (val: number) => {
    const current = parseAmount(amount);
    const updated = current + val;
    setAmount(updated.toFixed(2).replace(".", ","));
    setErrorMessage("");
  };

  const clearAmount = () => {
    setAmount("");
    setErrorMessage("");
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

    // Build ISO date from chosen selectedDate
    const finalDate = selectedDate ? new Date(`${selectedDate}T12:00:00`).toISOString() : new Date().toISOString();

    addExpense({
      title: titleToUse,
      amount: parsedAmount,
      category: selectedCategoryObj?.label || "Geral",
      type: transactionType,
      date: finalDate,
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
        <div className="max-w-md mx-auto flex flex-col w-full px-margin-mobile gap-4">
          {/* Type Switcher */}
          <div className="flex justify-center pt-4">
            <div className="bg-surface-container flex rounded-2xl p-1.5 w-full border border-sakura-pink/20 shadow-xs">
              <button
                data-testid="expense-tab"
                type="button"
                onClick={() => {
                  setTransactionType("expense");
                  setSelectedCategory("");
                }}
                className={`flex-1 py-2.5 rounded-2xl font-label-md transition-all font-bold min-h-[44px] flex items-center justify-center gap-1 ${
                  transactionType === "expense"
                    ? "bg-sakura-pink text-primary shadow-xs"
                    : "text-on-surface-variant hover:bg-sakura-pink/20"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                Gasto (-)
              </button>
              <button
                data-testid="income-tab"
                type="button"
                onClick={() => {
                  setTransactionType("income");
                  setSelectedCategory("");
                }}
                className={`flex-1 py-2.5 rounded-2xl font-label-md transition-all font-bold min-h-[44px] flex items-center justify-center gap-1 ${
                  transactionType === "income"
                    ? "bg-mint-fresh text-tertiary shadow-xs"
                    : "text-on-surface-variant hover:bg-sakura-pink/20"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                Renda (+)
              </button>
            </div>
          </div>

          <form onSubmit={handlePurchase} className="flex flex-col w-full gap-4">
            {/* Amount Display */}
            <div className="relative z-10 flex flex-col items-center justify-center py-2 bg-cream-milk/50 rounded-3xl border border-sakura-pink/15">
              <span className="font-label-md text-label-md text-primary/70 uppercase tracking-widest mb-1 font-bold">
                Valor {transactionType === "expense" ? "do gasto" : "da renda"}
              </span>
              <div className="flex items-baseline justify-center gap-1.5 whitespace-nowrap flex-nowrap w-full">
                <span className="font-display-lg text-display-lg text-primary/40 shrink-0 whitespace-nowrap">R$</span>
                <input
                  data-testid="amount-input"
                  inputMode="decimal"
                  autoComplete="off"
                  className="bg-transparent border-none text-center font-data-mono text-display-lg text-on-background focus:ring-0 max-w-[240px] placeholder:text-surface-variant outline-none whitespace-nowrap"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d,]/g, "");
                    setAmount(v);
                    if (errorMessage) setErrorMessage("");
                  }}
                />
              </div>

              {/* Quick Add Presets */}
              <div className="flex items-center gap-1.5 mt-2">
                {PRESET_AMOUNTS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => addPreset(p)}
                    className="px-2.5 py-1 rounded-xl bg-white text-primary text-xs font-bold border border-sakura-pink/30 hover:bg-sakura-pink/20 active:scale-95 transition-all shadow-2xs"
                  >
                    +{p}
                  </button>
                ))}
                {amount && (
                  <button
                    type="button"
                    onClick={clearAmount}
                    className="px-2.5 py-1 rounded-xl bg-white text-outline hover:text-error text-xs font-bold border border-outline/20 active:scale-95 transition-all"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {errorMessage && (
                <p className="text-error font-label-md text-xs bg-error/10 px-3 py-1.5 rounded-2xl mt-3 animate-shake">
                  {errorMessage}
                </p>
              )}
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-2 w-full">
              {KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => pressKey(k)}
                  className="h-12 sm:h-14 rounded-2xl bg-cream-milk border border-sakura-pink/20 font-data-mono text-xl font-bold text-on-surface hover:bg-white active:scale-95 transition-all shadow-2xs flex items-center justify-center"
                  aria-label={k === "back" ? "Apagar" : k}
                >
                  {k === "back" ? (
                    <span className="material-symbols-outlined text-[22px]">backspace</span>
                  ) : (
                    k
                  )}
                </button>
              ))}
            </div>

            {/* Category Selector Grid */}
            <div className="flex flex-col gap-2">
              <label className="font-label-md text-xs font-bold text-outline">
                Escolha a Categoria
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {filteredCategories.map((cat) => {
                  const isSelected = effectiveCategory === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-cream-milk hover:scale-[1.02] active:scale-95 transition-all shadow-2xs border-2 min-h-[76px] ${
                        isSelected
                          ? "ring-2 ring-primary border-primary bg-white shadow-xs"
                          : "border-sakura-pink/20"
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 text-primary"
                        style={{ backgroundColor: `${cat.color || "#FFB7C5"}55` }}
                      >
                        <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                      </div>
                      <span className="font-label-sm text-[11px] text-on-surface-variant font-bold truncate max-w-full">
                        {cat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Note Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date selection */}
              <div className="bg-cream-milk p-3.5 rounded-3xl border border-sakura-pink/20 flex flex-col gap-1 shadow-xs">
                <label className="font-label-md text-xs text-primary flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                  Data
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white p-2 rounded-xl border border-outline/20 font-body-md text-xs outline-none"
                />
              </div>

              {/* Note input */}
              <div className="bg-cream-milk p-3.5 rounded-3xl border border-sakura-pink/20 flex flex-col gap-1 shadow-xs">
                <label className="font-label-md text-xs text-primary flex items-center gap-1.5 font-bold">
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  Descrição (opcional)
                </label>
                <input
                  data-testid="note-input"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="bg-white p-2 rounded-xl border border-outline/20 font-body-md text-xs text-on-surface outline-none"
                  placeholder="Ex: Ração especial..."
                />
              </div>
            </div>

            {/* Recurrence Toggle */}
            <label className="flex items-center gap-3 bg-cream-milk p-3.5 rounded-3xl border border-sakura-pink/20 shadow-xs cursor-pointer">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="w-5 h-5 accent-[#864e5a] rounded"
              />
              <span className="font-label-md text-xs text-on-surface font-bold flex-1">
                Repetir automaticamente
              </span>
              {recurring && (
                <select
                  value={every}
                  onChange={(e) => setEvery(e.target.value as "week" | "month")}
                  className="bg-white rounded-xl px-2.5 py-1.5 font-body-md text-xs outline-none border border-outline/20 font-bold text-primary"
                >
                  <option value="week">Toda semana</option>
                  <option value="month">Todo mês</option>
                </select>
              )}
            </label>

            {/* Submit Button */}
            <button
              data-testid="submit-btn"
              type="submit"
              disabled={saving}
              className="w-full bg-sakura-pink text-primary py-3.5 rounded-2xl font-headline-md text-base hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm font-bold min-h-[50px] mt-1"
            >
              <span className="material-symbols-outlined text-[22px]">pets</span>
              {saving ? "Salvando..." : "Purr-chase (Registrar)"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
