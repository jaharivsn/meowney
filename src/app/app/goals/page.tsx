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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTargetAmount, setNewTargetAmount] = useState("");
  const [newCurrentAmount, setNewCurrentAmount] = useState("");
  const [newCategory, setNewCategory] = useState("Acessórios");
  const [formError, setFormError] = useState("");

  // Total saved calculation
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
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
      setTimeout(() => setCelebratingId(null), 1800);
    }

    setContribGoalId(null);
    setContribAmount("");
  };

  return (
    <>
      <Header title="Metas" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6">
          {/* Header Section with Motivational Spark */}
          <div className="relative overflow-hidden bg-sakura-pink/20 rounded-3xl p-6 flex flex-col gap-2 mt-6 border border-sakura-pink/30 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  Total Economizado
                </span>
                <span className="font-display-lg text-headline-lg-mobile text-soft-charcoal tracking-tight">
                  R$ {formattedTotalSaved}
                </span>
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-white/80 hover:bg-white backdrop-blur-md p-3 rounded-2xl shadow-sm text-primary transition-all active:scale-95 flex items-center justify-center border border-sakura-pink/20"
                title="Criar Nova Meta"
                aria-label="Criar Nova Meta"
              >
                <span
                  className="material-symbols-outlined text-primary text-[24px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  add_circle
                </span>
              </button>
            </div>
            <p className="font-body-md text-on-surface-variant max-w-[80%] font-medium">
              {goals.length > 0
                ? "Você está incrível! Seu stash está crescendo mais rápido que um gatinho filhote. 🐾"
                : "Sua gavetinha de economias aguarda sua primeira meta!"}
            </p>
            {/* Floating Paw Prints Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">
                pets
              </span>
            </div>
          </div>

          {/* Goals List or Empty State */}
          {goals.length > 0 ? (
            <div className="flex flex-col gap-gutter">
              {goals.map((goal) => {
                const progressPct = Math.min(
                  100,
                  Math.round((goal.currentAmount / (goal.targetAmount || 1)) * 100)
                );
                const isCompleted = goal.currentAmount >= goal.targetAmount;

                return (
                  <div
                    key={goal.id}
                    className={`bg-cream-milk rounded-3xl p-6 shadow-sm border border-sakura-pink/20 relative flex flex-col gap-4 ${
                      celebratingId === goal.id ? "animate-cream-burst" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <h3 className="font-headline-md text-headline-md text-soft-charcoal font-bold">
                          {goal.title}
                        </h3>
                        <p className="font-label-md text-label-md text-on-secondary-container opacity-70">
                          Meta: R${" "}
                          {goal.targetAmount.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-3 py-1 rounded-2xl bg-lavender/40 text-primary font-bold uppercase tracking-wider">
                          {goal.category}
                        </span>
                        <button
                          onClick={() => deleteGoal(goal.id)}
                          className="text-outline hover:text-error transition-colors p-1.5 rounded-full hover:bg-error/10"
                          title="Excluir Meta"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar & Jar display */}
                    <div className="relative w-full bg-surface-variant h-4 rounded-full overflow-hidden shadow-inner my-2">
                      <div
                        className={`h-full transition-all duration-1000 ease-out rounded-full ${
                          isCompleted
                            ? "bg-mint-fresh"
                            : "bg-gradient-to-r from-sakura-pink to-primary"
                        }`}
                        style={{ width: `${progressPct}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="font-data-mono text-data-mono text-soft-charcoal font-bold">
                          R${" "}
                          {goal.currentAmount.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {progressPct}% Concluído
                        </span>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                          {isCompleted ? (
                            <span className="font-label-md text-tertiary italic font-bold animate-tail-wiggle inline-block">
                              Meta atingida!
                            </span>
                          ) : (
                            <span className="font-label-md text-primary italic font-bold">Quase lá, bichano!</span>
                          )}
                        <button
                          onClick={() => {
                            setContribGoalId(goal.id);
                            setContribAmount("");
                            setContribError("");
                          }}
                          className="bg-sakura-pink text-primary px-4 py-2.5 rounded-2xl font-label-md active:scale-95 transition-transform flex items-center gap-1 font-bold"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                          Guardar Valor
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Add New Goal Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full h-28 border-2 border-dashed border-sakura-pink/40 rounded-3xl flex flex-col items-center justify-center gap-2 group hover:bg-cream-milk/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-sakura-pink/20 flex items-center justify-center group-hover:scale-110 transition-transform text-primary">
                  <span className="material-symbols-outlined">
                    add
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant font-bold">
                  Adicionar Nova Meta
                </span>
              </button>
            </div>
          ) : (
            /* Cat-themed Empty State */
            <div className="flex flex-col items-center justify-center p-8 bg-cream-milk rounded-3xl border-2 border-dashed border-sakura-pink/30 text-center gap-4 my-6">
              <div className="w-20 h-20 rounded-full bg-sakura-pink/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[48px]">savings</span>
              </div>
              <p className="font-headline-md text-headline-md text-soft-charcoal font-bold">
                Sua gavetinha de Cat-Stashes está vazia! Crie uma meta para começar a economizar 🐱💰
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-2 bg-sakura-pink text-primary px-6 py-3.5 rounded-2xl font-headline-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 font-bold"
              >
                <span className="material-symbols-outlined">add</span>
                Criar Minha Primeira Meta
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Modal: Create Goal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-goal-modal-title"
            className="bg-cream-milk rounded-3xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-4 border border-sakura-pink/30"
          >
            <div className="flex justify-between items-center">
              <h3 id="create-goal-modal-title" className="font-headline-md text-headline-md text-soft-charcoal flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-primary">pets</span>
                Nova Meta Cat-Stash
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-outline hover:text-soft-charcoal p-1.5 rounded-full hover:bg-sakura-pink/20"
                aria-label="Fechar modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {formError && (
              <p className="text-error text-label-sm font-label-sm bg-error/10 p-3 rounded-2xl">
                {formError}
              </p>
            )}

            <form onSubmit={handleCreateGoal} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface font-bold">
                  Título da Meta
                </label>
                <input
                  type="text"
                  placeholder="ex: Novo Arranhador, Sachês Especiais"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="bg-white p-3.5 rounded-2xl border border-outline/20 font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-bold">
                    Meta (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="150.00"
                    value={newTargetAmount}
                    onChange={(e) => setNewTargetAmount(e.target.value)}
                    className="bg-white p-3.5 rounded-2xl border border-outline/20 font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-inner"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-label-md text-on-surface font-bold">
                    Já Salvo (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newCurrentAmount}
                    onChange={(e) => setNewCurrentAmount(e.target.value)}
                    className="bg-white p-3.5 rounded-2xl border border-outline/20 font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-inner"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface font-bold">
                  Categoria
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="bg-white p-3.5 rounded-2xl border border-outline/20 font-body-md text-on-surface outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Acessórios">Acessórios</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Comida">Comida</option>
                  <option value="Brinquedos">Brinquedos</option>
                  <option value="Geral">Geral</option>
                </select>
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-surface-container py-3.5 rounded-2xl font-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sakura-pink text-primary py-3.5 rounded-2xl font-headline-md hover:scale-105 active:scale-95 transition-all font-bold"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in"
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
              <h3 id="contrib-modal-title" className="font-headline-md text-headline-md text-soft-charcoal flex items-center gap-2 font-bold">
                <span className="material-symbols-outlined text-primary">savings</span>
                Guardar no Stash
              </h3>
              <button
                onClick={() => setContribGoalId(null)}
                className="text-outline hover:text-soft-charcoal p-1.5 rounded-full hover:bg-sakura-pink/20"
                aria-label="Fechar modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {contribError && (
              <p className="text-error text-sm bg-error/10 p-3 rounded-2xl">{contribError}</p>
            )}
            <form onSubmit={handleContribute} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-md text-label-md text-on-surface font-bold">
                  Valor a adicionar (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  autoFocus
                  placeholder="10.00"
                  value={contribAmount}
                  onChange={(e) => setContribAmount(e.target.value)}
                  className="bg-white p-3.5 rounded-2xl border border-outline/20 font-data-mono text-headline-md text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>

              <div className="flex gap-2">
                {[10, 20, 50].map((quickVal) => (
                  <button
                    key={quickVal}
                    type="button"
                    onClick={() => setContribAmount(quickVal.toString())}
                    className="flex-1 py-2 bg-sakura-pink/20 hover:bg-sakura-pink/40 text-primary rounded-2xl font-label-md text-label-md transition-colors border border-sakura-pink/30 font-bold"
                  >
                    + R$ {quickVal}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setContribGoalId(null)}
                  className="flex-1 bg-surface-container py-3.5 rounded-2xl font-label-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sakura-pink text-primary py-3.5 rounded-2xl font-headline-md active:scale-95 transition-all font-bold"
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
