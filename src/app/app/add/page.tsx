"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";

export default function AddExpense() {
  const router = useRouter();
  const addExpense = useMeowneyStore((s) => s.addExpense);
  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);

  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(() => {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
  });
  const [errorMessage, setErrorMessage] = useState("");

  const filteredCategories = categories.filter((c) => c.type === transactionType);

  useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find(c => c.id === selectedCategory)) {
      setSelectedCategory(filteredCategories[0].id);
    }
  }, [transactionType, categories, filteredCategories, selectedCategory]);

  const selectedCategoryObj = filteredCategories.find((cat) => cat.id === selectedCategory) || filteredCategories[0];

  const handlePurchase = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    const parsedAmount = parseFloat(amount.replace(",", "."));

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Por favor, informe um valor maior que R$ 0,00.");
      return;
    }

    const titleToUse = note.trim() || selectedCategoryObj?.label || "Transação";
    const dateToUse = date ? new Date(date).toISOString() : new Date().toISOString();

    addExpense({
      title: titleToUse,
      amount: parsedAmount,
      category: selectedCategoryObj?.label || "Geral",
      type: transactionType,
      date: dateToUse,
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
              onClick={() => setTransactionType('expense')}
              className={`flex-1 py-2.5 rounded-2xl font-label-md transition-all font-bold ${
                transactionType === 'expense'
                  ? 'bg-sakura-pink text-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-sakura-pink/20'
              }`}
            >
              Gasto (-)
            </button>
            <button
              data-testid="income-tab"
              type="button"
              onClick={() => setTransactionType('income')}
              className={`flex-1 py-2.5 rounded-2xl font-label-md transition-all font-bold ${
                transactionType === 'income'
                  ? 'bg-mint-fresh text-tertiary shadow-sm'
                  : 'text-on-surface-variant hover:bg-sakura-pink/20'
              }`}
            >
              Renda (+)
            </button>
          </div>
        </div>

        <form onSubmit={handlePurchase} className="flex flex-col w-full px-margin-mobile gap-gutter pb-8">
          {/* Hero Amount Input */}
          <div className="relative z-10 flex flex-col items-center justify-center py-6 animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="font-label-md text-label-md text-primary/60 uppercase tracking-widest mb-2 font-bold">
              Valor {transactionType === 'expense' ? 'Gasto' : 'Recebido'}
            </span>
            <div className="flex items-baseline gap-2 group">
              <span className="font-display-lg text-display-lg text-primary/40">
                R$
              </span>
              <input
                data-testid="amount-input"
                autoFocus
                className="bg-transparent border-none text-center font-data-mono text-display-lg text-on-background focus:ring-0 w-48 placeholder:text-surface-variant outline-none"
                placeholder="0,00"
                step="0.01"
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                style={{
                  fontSize: Math.max(32, 48 - (amount.length || 1) * 2) + "px",
                }}
              />
            </div>
            <div className="h-1.5 w-12 bg-sakura-pink/40 rounded-full mt-2 group-focus-within:w-24 transition-all duration-500"></div>

            {errorMessage && (
              <p className="text-error font-label-md text-label-md bg-error/10 px-4 py-2 rounded-2xl mt-4 animate-bounce">
                {errorMessage}
              </p>
            )}
          </div>

          {/* Category Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-150">
            {filteredCategories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-card flex flex-col items-center justify-center p-4 rounded-3xl bg-cream-milk hover:scale-105 active:scale-95 transition-all shadow-sm border-2 ${
                  selectedCategory === cat.id ? "ring-2 ring-primary border-primary" : "border-sakura-pink/20"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-2 bg-sakura-pink/20 text-primary"
                >
                  <span className="material-symbols-outlined">{cat.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          {/* Details Form Card Container */}
          <div className="relative z-10 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-300">
            {/* Date/Time Picker */}
            <div className="bg-cream-milk p-4 rounded-3xl border border-sakura-pink/20 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3 w-full">
                <span className="material-symbols-outlined text-primary">
                  calendar_today
                </span>
                <div className="flex-1">
                  <label className="font-label-md text-label-md text-on-surface block mb-1 font-bold">
                    Data e Hora
                  </label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent font-label-sm text-label-sm text-on-surface-variant w-full outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Note Input */}
            <div className="bg-cream-milk p-4 rounded-3xl border border-sakura-pink/20 flex flex-col gap-2 shadow-sm">
              <label className="font-headline-md text-label-md text-primary flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-[18px]">
                  edit_note
                </span>
                Nota
              </label>
              <textarea
                data-testid="note-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-transparent border-none focus:ring-0 font-body-md text-on-surface-variant placeholder:text-outline-variant resize-none h-20 w-full outline-none"
                placeholder="O que o gatinho comprou?"
              ></textarea>
            </div>
          </div>

          {/* Primary Action */}
          <div className="relative z-10 mt-4 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-500">
            <button
              data-testid="submit-btn"
              type="submit"
              className="w-full bg-sakura-pink text-primary py-4 rounded-2xl font-headline-md text-headline-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                pets
              </span>
              Purr-chase
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
