"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { TutorialModal } from "@/components/TutorialModal";
import { PersonalityPicker } from "@/components/PersonalityPicker";
import { CatMascot } from "@/components/CatMascot";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/categoryIcons";
import { expensesToCsv, parseExpensesCsv, downloadText, nextRecurrenceIcs } from "@/lib/export";
import { buildWeeklyInsight } from "@/lib/insights";
import { requestLocalNotification } from "@/lib/recurrence";
import { getPersonality } from "@/lib/personalities";

export default function Profile() {
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatType, setNewCatType] = useState<"expense" | "income">("expense");
  const [newCatIcon, setNewCatIcon] = useState("pets");
  const [newCatColor, setNewCatColor] = useState("#FFB7C5");
  const [categoryAddedMsg, setCategoryAddedMsg] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const categories = useHydratedStore((s) => s.categories, DEFAULT_STATE.categories);
  const goals = useHydratedStore((s) => s.goals, DEFAULT_STATE.goals);
  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const personality = useHydratedStore((s) => s.personality, DEFAULT_STATE.personality);
  const roundUpGoalId = useHydratedStore((s) => s.roundUpGoalId, null);
  const notificationsEnabled = useHydratedStore((s) => s.notificationsEnabled, false);
  const addCategory = useMeowneyStore((s) => s.addCategory);
  const deleteCategory = useMeowneyStore((s) => s.deleteCategory);
  const updateCategory = useMeowneyStore((s) => s.updateCategory);
  const resetTutorial = useMeowneyStore((s) => s.resetTutorial);
  const setPersonality = useMeowneyStore((s) => s.setPersonality);
  const setRoundUpGoalId = useMeowneyStore((s) => s.setRoundUpGoalId);
  const setNotificationsEnabled = useMeowneyStore((s) => s.setNotificationsEnabled);
  const importExpenses = useMeowneyStore((s) => s.importExpenses);
  const persona = getPersonality(personality);

  const handleReplay = () => {
    resetTutorial();
    if (typeof window !== "undefined") window.localStorage.removeItem("hasSeenTutorial");
    setIsTutorialOpen(true);
  };

  const shareRecap = async () => {
    const insight = buildWeeklyInsight(expenses, goals, categories, personality);
    const text = `${persona.namePt}: ${insight.sentence}`;
    if (navigator.share) {
      await navigator.share({ title: "Meowney — resumo da semana", text }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const exportIcs = () => {
    const next = expenses.find((e) => e.recurrence && !e.isRecurringInstance);
    if (!next?.recurrence) return;
    downloadText(
      "meowney-proxima.ics",
      nextRecurrenceIcs(next.title, next.recurrence.nextDate, next.amount),
      "text/calendar"
    );
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    addCategory({
      label: newCatName.trim(),
      type: newCatType,
      icon: newCatIcon,
      color: newCatColor,
      isCustom: true,
    });
    setNewCatName("");
    setCategoryAddedMsg(true);
    setTimeout(() => setCategoryAddedMsg(false), 2000);
  };

  return (
    <>
      <Header title="Configurações & Perfil" />

      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6 max-w-2xl mx-auto mt-6">
          {/* Mascot Identity Card */}
          <div className="bg-cream-milk rounded-3xl p-6 flex flex-col items-center text-center shadow-sm border border-sakura-pink/30 relative overflow-hidden">
            <CatMascot personality={personality} size={88} />
            <h1 className="font-headline-md text-xl font-bold mt-4 text-soft-charcoal">{persona.namePt}</h1>
            <p className="text-on-surface-variant text-sm font-medium mt-1">{persona.tagline}</p>
          </div>

          {/* Cat Personality Selector */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-sakura-pink/20 shadow-xs">
            <h2 className="font-label-md text-xs font-bold uppercase tracking-wider text-primary mb-3.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              Personalidade do Gatinho
            </h2>
            <PersonalityPicker value={personality} onChange={setPersonality} compact />
          </section>

          {/* Automated Stash & Notifications */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-sakura-pink/20 shadow-xs flex flex-col gap-4">
            <h2 className="font-label-md text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              Automações & Avisos
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-soft-charcoal">
                Arredondar troco para o cofrinho
              </label>
              <select
                value={roundUpGoalId || ""}
                onChange={(e) => setRoundUpGoalId(e.target.value || null)}
                className="bg-white p-3 rounded-2xl border border-outline/20 font-body-md text-xs outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Desligado</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} (Meta: R$ {g.targetAmount.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-3 p-3 bg-cream-milk/60 rounded-2xl border border-sakura-pink/15 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={async (e) => {
                  const on = e.target.checked;
                  if (on) await requestLocalNotification("Meowney", "Avisos locais ligados para recorrências.");
                  setNotificationsEnabled(on);
                }}
                className="w-5 h-5 accent-[#864e5a] rounded"
              />
              <div className="flex flex-col">
                <span className="font-label-md text-xs font-bold text-soft-charcoal">
                  Avisar recorrências neste aparelho
                </span>
                <span className="text-[11px] text-outline">
                  Notificações de gastos agendados e datas de corte
                </span>
              </div>
            </label>
          </section>

          {/* Export & Import Data */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-sakura-pink/20 shadow-xs flex flex-col gap-3.5">
            <h2 className="font-label-md text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              Backup & Integração
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => downloadText("meowney.csv", expensesToCsv(expenses), "text/csv")}
                className="p-3 rounded-2xl bg-cream-milk font-bold text-xs text-soft-charcoal border border-sakura-pink/20 hover:bg-sakura-pink/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Exportar CSV
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="p-3 rounded-2xl bg-cream-milk font-bold text-xs text-soft-charcoal border border-sakura-pink/20 hover:bg-sakura-pink/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">upload</span>
                Importar CSV
              </button>
              <button
                type="button"
                onClick={shareRecap}
                className="p-3 rounded-2xl bg-cream-milk font-bold text-xs text-soft-charcoal border border-sakura-pink/20 hover:bg-sakura-pink/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                Compartilhar
              </button>
              <button
                type="button"
                onClick={exportIcs}
                className="p-3 rounded-2xl bg-cream-milk font-bold text-xs text-soft-charcoal border border-sakura-pink/20 hover:bg-sakura-pink/20 transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                Calendário (.ics)
              </button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                importExpenses(parseExpensesCsv(text));
                e.target.value = "";
              }}
            />
          </section>

          {/* Category Management */}
          <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-sakura-pink/20 shadow-xs flex flex-col gap-4">
            <h2 className="font-label-md text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">category</span>
              Categorias & Limites Mensais
            </h2>

            <div className="flex flex-col gap-2.5 max-h-72 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-cream-milk p-3 rounded-2xl border border-sakura-pink/20 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="material-symbols-outlined p-2 rounded-xl text-primary text-[18px]"
                        style={{ backgroundColor: `${cat.color || "#FFB7C5"}55` }}
                      >
                        {cat.icon}
                      </span>
                      <div>
                        <p className="font-bold text-xs text-soft-charcoal">{cat.label}</p>
                        <p className="text-[10px] text-outline">{cat.type === "expense" ? "Gasto" : "Renda"}</p>
                      </div>
                    </div>
                    {cat.isCustom && (
                      <button
                        type="button"
                        onClick={() => deleteCategory(cat.id)}
                        className="text-outline hover:text-error p-1 rounded-full hover:bg-error/10 transition-colors"
                        title="Excluir Categoria"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    )}
                  </div>
                  {cat.type === "expense" && (
                    <div className="flex items-center gap-2 pt-1 border-t border-sakura-pink/15">
                      <span className="text-[11px] text-outline font-medium">Limite mensal:</span>
                      <div className="flex items-center gap-1 flex-1">
                        <span className="text-xs text-outline font-bold">R$</span>
                        <input
                          type="number"
                          min={0}
                          value={cat.monthlyLimit ?? ""}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            updateCategory(cat.id, { monthlyLimit: isNaN(v) || v <= 0 ? undefined : v });
                          }}
                          placeholder="Sem teto"
                          className="w-full bg-white px-2 py-1 rounded-lg border border-outline/20 text-xs font-data-mono font-bold outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Category Subform */}
            <div className="bg-cream-milk/60 p-4 rounded-2xl border border-sakura-pink/20 flex flex-col gap-3 mt-2">
              <h3 className="font-label-sm text-xs font-bold text-soft-charcoal">Criar nova categoria</h3>
              <input
                type="text"
                placeholder="Nome (Ex: Petshop, Sachês...)"
                className="bg-white p-2.5 rounded-xl border border-outline/20 text-xs outline-none focus:ring-2 focus:ring-primary"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
              />

              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline">Ícone</span>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORY_ICONS.slice(0, 10).map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setNewCatIcon(ic)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        newCatIcon === ic ? "bg-sakura-pink text-primary shadow-xs scale-105" : "bg-white text-outline"
                      }`}
                      aria-label={ic}
                    >
                      <span className="material-symbols-outlined text-[17px]">{ic}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline">Cor Pastel</span>
                <div className="flex gap-2">
                  {CATEGORY_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewCatColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        newCatColor === c ? "border-primary scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <select
                  className="bg-white p-2.5 rounded-xl border border-outline/20 text-xs font-bold flex-1 outline-none"
                  value={newCatType}
                  onChange={(e) => setNewCatType(e.target.value as "expense" | "income")}
                >
                  <option value="expense">Gasto (-)</option>
                  <option value="income">Renda (+)</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="bg-sakura-pink text-primary px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs active:scale-95 transition-all"
                >
                  Criar Categoria
                </button>
              </div>

              {categoryAddedMsg && (
                <p className="text-tertiary text-xs font-bold text-center mt-1">
                  ✓ Categoria adicionada com sucesso!
                </p>
              )}
            </div>
          </section>

          {/* Helpful actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleReplay}
              className="flex items-center justify-center gap-2 p-3.5 bg-cream-milk rounded-2xl border border-sakura-pink/20 text-xs font-bold text-soft-charcoal hover:bg-sakura-pink/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
              Rever tutorial
            </button>
            <a
              href="mailto:jahari.wav@gmail.com"
              className="flex items-center justify-center gap-2 p-3.5 bg-cream-milk rounded-2xl border border-sakura-pink/20 text-xs font-bold text-soft-charcoal hover:bg-sakura-pink/20 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Suporte
            </a>
          </div>

          <Link
            href="/"
            className="p-3.5 text-center font-bold text-xs text-primary bg-cream-milk rounded-2xl border border-sakura-pink/20 hover:bg-sakura-pink/20 transition-colors"
          >
            Voltar para o início
          </Link>
          <p className="pb-4 text-center text-xs text-outline font-medium">Meowney · Finanças felinas locais e seguras 🐾</p>
        </div>
      </main>
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </>
  );
}
