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

  return (
    <>
      <Header title="Perfil" />
      <main className="relative pt-16 bg-background min-h-screen pb-32">
        <div className="flex flex-col w-full px-margin-mobile gap-6">
          <div className="bg-cream-milk rounded-3xl p-6 flex flex-col items-center text-center shadow-sm mt-6 border border-sakura-pink/20">
            <CatMascot personality={personality} size={88} />
            <h1 className="font-headline-lg-mobile font-bold mt-4">{persona.namePt}</h1>
            <p className="text-on-surface-variant">{persona.tagline}</p>
          </div>

          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-sakura-pink/20">
            <h2 className="font-label-md font-bold uppercase tracking-wider mb-3">Seu gato</h2>
            <PersonalityPicker value={personality} onChange={setPersonality} compact />
          </section>

          <div className="grid gap-3">
            <button
              onClick={handleReplay}
              className="flex items-center justify-between w-full p-4 bg-cream-milk rounded-2xl border border-sakura-pink/20 text-left"
            >
              <span className="font-label-md font-bold">Rever tutorial</span>
              <span className="material-symbols-outlined">replay</span>
            </button>
            <a
              href="mailto:jahari.wav@gmail.com"
              className="flex items-center justify-between w-full p-4 bg-cream-milk rounded-2xl border border-sakura-pink/20"
            >
              <span className="font-label-md font-bold">Suporte</span>
              <span className="material-symbols-outlined">mail</span>
            </a>
          </div>

          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-sakura-pink/20 flex flex-col gap-3">
            <h2 className="font-label-md font-bold uppercase tracking-wider">Arredondar para o cofrinho</h2>
            <select
              value={roundUpGoalId || ""}
              onChange={(e) => setRoundUpGoalId(e.target.value || null)}
              className="bg-white p-3.5 rounded-2xl border border-outline/20"
            >
              <option value="">Desligado</option>
              {goals.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={async (e) => {
                  const on = e.target.checked;
                  if (on) await requestLocalNotification("Meowney", "Avisos locais ligados para recorrências.");
                  setNotificationsEnabled(on);
                }}
                className="w-5 h-5 accent-[#864e5a]"
              />
              <span className="font-label-md font-bold">Avisar recorrências neste aparelho</span>
            </label>
          </section>

          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-sakura-pink/20 flex flex-col gap-3">
            <h2 className="font-label-md font-bold uppercase tracking-wider">Levar embora</h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => downloadText("meowney.csv", expensesToCsv(expenses), "text/csv")}
                className="px-4 py-3 rounded-2xl bg-cream-milk font-bold border border-sakura-pink/20"
              >
                Exportar CSV
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="px-4 py-3 rounded-2xl bg-cream-milk font-bold border border-sakura-pink/20"
              >
                Importar CSV
              </button>
              <button
                type="button"
                onClick={shareRecap}
                className="px-4 py-3 rounded-2xl bg-cream-milk font-bold border border-sakura-pink/20"
              >
                Compartilhar semana
              </button>
              <button
                type="button"
                onClick={exportIcs}
                className="px-4 py-3 rounded-2xl bg-cream-milk font-bold border border-sakura-pink/20"
              >
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

          <section className="bg-surface-container-lowest rounded-3xl p-5 border border-sakura-pink/20 flex flex-col gap-4">
            <h2 className="font-label-md font-bold uppercase tracking-wider">Categorias e envelopes</h2>
            {categories.map((cat) => (
              <div key={cat.id} className="bg-cream-milk p-3.5 rounded-2xl border border-sakura-pink/20 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined p-2 rounded-2xl text-primary"
                      style={{ backgroundColor: `${cat.color || "#FFB7C5"}55` }}
                    >
                      {cat.icon}
                    </span>
                    <div>
                      <p className="font-bold">{cat.label}</p>
                      <p className="text-xs text-outline">{cat.type === "expense" ? "Gasto" : "Renda"}</p>
                    </div>
                  </div>
                  {cat.isCustom && (
                    <button onClick={() => deleteCategory(cat.id)} className="text-error p-2" title="Excluir">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  )}
                </div>
                {cat.type === "expense" && (
                  <label className="text-xs font-bold text-on-surface-variant">
                    Limite mensal (R$)
                    <input
                      type="number"
                      min={0}
                      value={cat.monthlyLimit ?? ""}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        updateCategory(cat.id, { monthlyLimit: isNaN(v) || v <= 0 ? undefined : v });
                      }}
                      placeholder="sem teto"
                      className="mt-1 w-full bg-white p-2 rounded-xl border border-outline/20"
                    />
                  </label>
                )}
              </div>
            ))}

            <h3 className="font-label-sm font-bold">Nova categoria</h3>
            <input
              type="text"
              placeholder="Nome (ex: Petshop)"
              className="bg-white p-3.5 rounded-2xl border border-outline/20"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
            />
            <div className="flex flex-wrap gap-1">
              {CATEGORY_ICONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setNewCatIcon(ic)}
                  className={`w-10 h-10 rounded-xl ${newCatIcon === ic ? "bg-sakura-pink" : "bg-white"}`}
                  aria-label={ic}
                >
                  <span className="material-symbols-outlined text-[20px]">{ic}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewCatColor(c)}
                  className={`w-8 h-8 rounded-full border-2 ${newCatColor === c ? "border-primary" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <select
                className="bg-white p-3.5 rounded-2xl border border-outline/20 flex-1"
                value={newCatType}
                onChange={(e) => setNewCatType(e.target.value as "expense" | "income")}
              >
                <option value="expense">Gasto</option>
                <option value="income">Renda</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  if (!newCatName.trim()) return;
                  addCategory({
                    label: newCatName.trim(),
                    type: newCatType,
                    icon: newCatIcon,
                    color: newCatColor,
                    isCustom: true,
                  });
                  setNewCatName("");
                }}
                className="bg-sakura-pink text-primary px-5 py-3.5 rounded-2xl font-bold"
              >
                Adicionar
              </button>
            </div>
          </section>

          <Link href="/" className="px-6 py-4 text-center font-bold bg-cream-milk rounded-2xl border border-sakura-pink/20">
            Voltar para o site
          </Link>
          <p className="py-4 text-center text-sm text-outline">Meowney · dados neste aparelho</p>
        </div>
      </main>
      <TutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </>
  );
}
