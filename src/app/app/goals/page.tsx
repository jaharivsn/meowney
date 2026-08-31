"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";

export default function Goals() {
  const goals = useHydratedStore((s) => s.goals, DEFAULT_STATE.goals);
  const addGoal = useMeowneyStore((s) => s.addGoal);
  const updateGoalProgress = useMeowneyStore((s) => s.updateGoalProgress);
  const deleteGoal = useMeowneyStore((s) => s.deleteGoal);

  const [contribGoalId, setContribGoalId] = useState<string | null>(null);
  const [contribAmount, setContribAmount] = useState("");
  const [contribError, setContribError] = useState("");
  const [celebratingId, setCelebratingId] = useState<string | null>(null);

  // Modal Create
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTargetAmount, setNewTargetAmount] = useState("");
  const [newCurrentAmount, setNewCurrentAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Acessórios");
  const [formError, setFormError] = useState("");

  // Total saved calculation
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const completedGoals = goals.filter((g) => g.currentAmount >= g.targetAmount).length;
  const totalProgressPct = totalTarget > 0 ? Math.min(100, Math.round((totalSaved / totalTarget) * 100)) : 0;

  const formattedTotalSaved = totalSaved.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const target = parseFloat(newTargetAmount.replace(",", "."));
    const current = newCurrentAmount ? parseFloat(newCurrentAmount.replace(",", ".")) : 0;

    if (!newTitle.trim()) {
      setFormError("Informe um título para a meta.");
      return;
    }
    if (isNaN(target) || target <= 0) {
      setFormError("Informe um valor de meta maior que 0.");
      return;
    }

    addGoal({
      title: newTitle.trim(),
      targetAmount: target,
      currentAmount: isNaN(current) || current < 0 ? 0 : current,
      category: newCategory,
    });

    setNewTitle("");
    setNewTargetAmount("");
    setNewCurrentAmount("");
    setNewCategory("Acessórios");
    setIsAddModalOpen(false);
  };

  const handleContribute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contribGoalId) return;
    setContribError("");

    const amount = parseFloat(contribAmount.replace(",", "."));
    if (isNaN(amount) || amount <= 0) {
      setContribError("Informe um valor maior que zero.");
      return;
    }

    const goalBefore = goals.find((g) => g.id === contribGoalId);
    const result = updateGoalProgress(contribGoalId, amount);
    if (!result.ok) {
      setContribError(result.reason || "Não foi possível guardar.");
      return;
    }

    if (goalBefore && goalBefore.currentAmount + amount >= goalBefore.targetAmount) {
      setCelebratingId(contribGoalId);
      setTimeout(() => setCelebratingId(null), 2000);
    }

    setContribGoalId(null);
    setContribAmount("");
  };

  return (
    <>
      <Header title="Cat-Stashes (Metas)" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6 max-w-2xl mx-auto">
          {/* Header Summary Card */}
          <div className="relative overflow-hidden bg-cream-milk rounded-3xl p-5 sm:p-6 flex flex-col gap-4 mt-6 border border-sakura-pink/30 shadow-sm">
            {/* Top Bar: Eyebrow + CTA */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sakura-pink/40 flex items-center justify-center text-primary shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">savings</span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] sm:text-xs text-primary uppercase tracking-widest font-extrabold block">
                    Cat-Stashes
                  </span>
                  <span className="text-[11px] text-soft-charcoal/70 font-semibold block -mt-0.5">
                    Economias Totais
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-sakura-pink hover:bg-sakura-pink/80 px-3.5 py-2 rounded-2xl shadow-xs text-primary transition-all active:scale-95 flex items-center gap-1.5 border border-white font-bold text-xs shrink-0 whitespace-nowrap"
                title="Criar Nova Meta"
                aria-label="Criar Nova Meta"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Nova Meta
              </button>
            </div>

            {/* Hero Value: Emphasized and strictly non-wrapping */}
            <div className="flex flex-col gap-2 py-1">
              <div className="flex items-baseline gap-2 whitespace-nowrap flex-nowrap select-none overflow-x-auto no-scrollbar">
                <span className="text-xl sm:text-2xl font-bold opacity-60 text-soft-charcoal shrink-0">
                  R$
                </span>
                <span className="font-display-lg text-3xl sm:text-4xl font-extrabold text-soft-charcoal tracking-tight whitespace-nowrap">
                  {formattedTotalSaved}
                </span>
              </div>

              {/* Global Progress Bar towards all targets */}
              {totalTarget > 0 && (
                <div className="flex flex-col gap-1.5 mt-0.5">
                  <div className="flex justify-between items-center text-[11px] text-outline font-semibold">
                    <span className="text-primary font-bold">{totalProgressPct}% do objetivo geral</span>
                    <span className="font-data-mono">
                      Meta global: R$ {totalTarget.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="w-full bg-white/70 h-2 rounded-full overflow-hidden border border-sakura-pink/15">
                    <div
                      className="h-full bg-gradient-to-r from-sakura-pink to-primary rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${totalProgressPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-sakura-pink/15">
              <div className="flex items-center gap-2.5 bg-white/80 px-3.5 py-2.5 rounded-2xl border border-sakura-pink/15 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-mint-fresh/40 flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-outline uppercase font-bold block leading-none">Concluídas</span>
                  <span className="font-data-mono text-xs font-bold text-soft-charcoal mt-1 block truncate">
                    {completedGoals} de {goals.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-white/80 px-3.5 py-2.5 rounded-2xl border border-sakura-pink/15 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-sakura-pink/40 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[16px]">flag</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-outline uppercase font-bold block leading-none">Em Andamento</span>
                  <span className="font-data-mono text-xs font-bold text-primary mt-1 block truncate">
                    {goals.length - completedGoals} {goals.length - completedGoals === 1 ? "meta" : "metas"}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Paw Prints Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">pets</span>
            </div>
          </div>

          {/* Goals List or Empty State */}
          {goals.length > 0 ? (
            <div className="flex flex-col gap-4">
              {goals.map((goal) => {
                const progressPct = Math.min(
                  100,
                  Math.round((goal.currentAmount / (goal.targetAmount || 1)) * 100)
                );
                const isCompleted = goal.currentAmount >= goal.targetAmount;
                const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

                return (
                  <div
                    key={goal.id}
                    className={`bg-cream-milk rounded-3xl p-5 sm:p-6 shadow-sm border border-sakura-pink/20 relative flex flex-col gap-3.5 transition-all ${
                      celebratingId === goal.id ? "animate-bounce ring-4 ring-mint-fresh" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-headline-md text-base sm:text-lg text-soft-charcoal font-bold">
                            {goal.title}
                          </h3>
                          {isCompleted && (
                            <span className="bg-mint-fresh text-tertiary text-[10px] px-2 py-0.5 rounded-full font-bold">
                              Alcançada! 🎉
                            </span>
                          )}
                        </div>
                        <p className="font-label-md text-xs text-outline mt-0.5">
                          Meta: R$ {goal.targetAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] px-2.5 py-1 rounded-xl bg-lavender/30 text-primary font-bold uppercase tracking-wider">
                          {goal.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteGoal(goal.id)}
                          className="text-outline hover:text-error transition-colors p-1.5 rounded-full hover:bg-error/10"
                          title="Excluir Meta"
                          aria-label="Excluir meta"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full bg-surface-variant h-3.5 rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full transition-all duration-700 ease-out rounded-full ${
                          isCompleted
                            ? "bg-tertiary"
                            : "bg-gradient-to-r from-sakura-pink to-primary"
                        }`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-end pt-1">
                      <div className="flex flex-col">
                        <span className="font-data-mono text-base font-bold text-soft-charcoal">
                          R$ {goal.currentAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                        <span className="font-label-sm text-xs text-outline">
                          {progressPct}% concluído • Falta R$ {remaining.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setContribGoalId(goal.id);
                          setContribAmount("");
                          setContribError("");
                        }}
                        className="bg-sakura-pink text-primary px-4 py-2 rounded-2xl font-label-md text-xs active:scale-95 transition-transform flex items-center gap-1 font-bold shadow-xs hover:scale-[1.02]"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        Guardar
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Add New Goal Card Button */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="w-full py-6 border-2 border-dashed border-sakura-pink/40 rounded-3xl flex flex-col items-center justify-center gap-2 group hover:bg-cream-milk/60 transition-colors"
              >
                <div className="w-10 h-10 rounded-2xl bg-sakura-pink/20 flex items-center justify-center group-hover:scale-110 transition-transform text-primary">
                  <span className="material-symbols-outlined text-[22px]">add</span>
                </div>
                <span className="font-label-md text-xs text-on-surface-variant font-bold">
                  Adicionar Nova Meta
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-cream-milk rounded-3xl border-2 border-dashed border-sakura-pink/30 text-center gap-4 my-4">
              <div className="w-16 h-16 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[36px]">savings</span>
              </div>
              <p className="font-headline-md text-base text-soft-charcoal font-bold max-w-sm">
                Sua gavetinha de Cat-Stashes está vazia! Crie sua primeira meta para guardar para rações e mimos 🐾
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="bg-sakura-pink text-primary px-6 py-3 rounded-2xl font-headline-md text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Criar Minha Primeira Meta
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Create Goal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-goal-modal-title"
            className="bg-cream-milk rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-4 border border-sakura-pink/30"
          >
            <div className="flex justify-between items-center">
              <h3 id="create-goal-modal-title" className="font-headline-md text-base text-soft-charcoal flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-primary text-[20px]">pets</span>
                Nova Meta Cat-Stash
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-outline hover:text-soft-charcoal p-1 rounded-full"
                aria-label="Fechar modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {formError && (
              <p className="text-error text-xs font-bold bg-error/10 p-2.5 rounded-2xl">
                {formError}
              </p>
            )}

            <form onSubmit={handleCreateGoal} className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-xs font-bold text-outline">
                  Título da Meta
                </label>
                <input
                  type="text"
                  placeholder="Ex: Arranhador Novo, Sachês..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-white p-3 rounded-2xl border border-outline/20 font-body-md text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-xs font-bold text-outline">
                    Meta (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="150,00"
                    value={newTargetAmount}
                    onChange={(e) => setNewTargetAmount(e.target.value)}
                    className="bg-white p-3 rounded-2xl border border-outline/20 font-data-mono text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-xs font-bold text-outline">
                    Já Salvo (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={newCurrentAmount}
                    onChange={(e) => setNewCurrentAmount(e.target.value)}
                    className="bg-white p-3 rounded-2xl border border-outline/20 font-data-mono text-sm font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-md text-xs font-bold text-outline">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-white p-3 rounded-2xl border border-outline/20 font-body-md text-sm text-on-surface outline-none"
                >
                  <option value="Acessórios">Acessórios</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Comida">Comida</option>
                  <option value="Brinquedos">Brinquedos</option>
                  <option value="Geral">Geral</option>
                </select>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-surface-container py-3 rounded-2xl font-label-md text-xs font-bold text-on-surface hover:bg-surface-variant transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sakura-pink text-primary py-3 rounded-2xl font-label-md text-xs hover:scale-[1.02] active:scale-95 transition-all font-bold shadow-xs"
                >
                  Criar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Contribute to Goal */}
      {contribGoalId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setContribGoalId(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contrib-modal-title"
            className="bg-cream-milk rounded-3xl p-6 w-full max-w-sm shadow-2xl flex flex-col gap-4 border border-sakura-pink/30"
          >
            <div className="flex justify-between items-center">
              <h3 id="contrib-modal-title" className="font-headline-md text-base text-soft-charcoal flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-primary text-[20px]">savings</span>
                Guardar no Stash
              </h3>
              <button
                type="button"
                onClick={() => setContribGoalId(null)}
                className="text-outline hover:text-soft-charcoal p-1 rounded-full"
                aria-label="Fechar modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {contribError && (
              <p className="text-error text-xs font-bold bg-error/10 p-2.5 rounded-2xl">{contribError}</p>
            )}

            <form onSubmit={handleContribute} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-xs font-bold text-outline">
                  Valor a adicionar (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  autoFocus
                  placeholder="10,00"
                  value={contribAmount}
                  onChange={(e) => setContribAmount(e.target.value)}
                  className="bg-white p-3 rounded-2xl border border-outline/20 font-data-mono text-base font-bold text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-xs"
                />
              </div>

              <div className="flex gap-2">
                {[10, 20, 50, 100].map((quickVal) => (
                  <button
                    key={quickVal}
                    type="button"
                    onClick={() => setContribAmount(quickVal.toString())}
                    className="flex-1 py-1.5 bg-white hover:bg-sakura-pink/20 text-primary rounded-xl font-data-mono text-xs transition-colors border border-sakura-pink/30 font-bold shadow-2xs"
                  >
                    +{quickVal}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setContribGoalId(null)}
                  className="flex-1 bg-surface-container py-3 rounded-2xl font-label-md text-xs font-bold text-on-surface hover:bg-surface-variant transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sakura-pink text-primary py-3 rounded-2xl font-label-md text-xs active:scale-95 transition-all font-bold shadow-xs"
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
