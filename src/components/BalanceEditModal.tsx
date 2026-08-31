"use client";

import { useState, useEffect, useRef } from "react";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface BalanceEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
  onSave: (newBalance: number) => void;
}

const PRESETS = [500, 1000, 2000, 5000];

export function BalanceEditModal({
  isOpen,
  onClose,
  currentBalance,
  onSave,
}: BalanceEditModalProps) {
  const [balanceInput, setBalanceInput] = useState(() => currentBalance.toString());
  const [error, setError] = useState("");
  const [prevBalance, setPrevBalance] = useState(currentBalance);
  const [prevOpen, setPrevOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useFocusTrap(modalRef, isOpen, onClose);

  if (isOpen !== prevOpen || currentBalance !== prevBalance) {
    setPrevOpen(isOpen);
    setPrevBalance(currentBalance);
    if (isOpen) {
      setBalanceInput(currentBalance.toString());
      setError("");
    }
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const parsed = parseFloat(balanceInput.replace(",", "."));
    if (isNaN(parsed) || parsed < 0) {
      setError("Por favor, informe um valor de saldo válido (não negativo).");
      return;
    }

    onSave(parsed);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="balance-modal-title"
        className="bg-cream-milk rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5 border border-sakura-pink/30 relative"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
            </div>
            <h3
              id="balance-modal-title"
              className="font-headline-md text-headline-md text-soft-charcoal"
            >
              Editar Saldo
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-outline hover:text-soft-charcoal p-1.5 rounded-full hover:bg-sakura-pink/20 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {error && (
          <p className="text-error font-label-sm text-label-sm bg-error/10 p-3 rounded-2xl animate-shake">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="balance-input" className="font-label-md text-label-md text-on-surface-variant font-bold">
              Novo Saldo (R$)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 font-headline-md text-primary/50 pointer-events-none">
                R$
              </span>
              <input
                id="balance-input"
                ref={inputRef}
                type="number"
                step="0.01"
                min="0"
                data-testid="balance-modal-input"
                placeholder="0.00"
                value={balanceInput}
                onChange={(e) => {
                  setBalanceInput(e.target.value);
                  if (error) setError("");
                }}
                className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl border border-outline/20 font-data-mono text-headline-md text-soft-charcoal outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-col gap-1.5">
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              Atalhos Rápidos
            </span>
            <div className="grid grid-cols-4 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setBalanceInput(preset.toString());
                    if (error) setError("");
                  }}
                  className={`py-2 px-1 rounded-2xl font-label-sm text-label-sm transition-all border ${
                    balanceInput === preset.toString()
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-white text-soft-charcoal border-outline/20 hover:bg-sakura-pink/20"
                  }`}
                >
                  R$ {preset.toLocaleString("pt-BR")}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface-container py-3.5 rounded-2xl font-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              data-testid="balance-modal-save"
              className="flex-1 bg-sakura-pink text-primary py-3.5 rounded-2xl font-headline-md hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[20px]">check</span>
              Salvar Saldo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
