"use client";

import { useEffect, useRef, useState } from "react";
import { CatMascot } from "@/components/CatMascot";
import { useMeowneyStore, useHydratedStore, DEFAULT_STATE } from "@/lib/store";
import { buildFinanceSummary, localChatReply } from "@/lib/insights";
import { getPersonality } from "@/lib/personalities";

const DAILY_CAP = 20;

function todayKey() {
  return `meowney-chat-${new Date().toISOString().slice(0, 10)}`;
}

function countToday(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(todayKey()) || "0", 10) || 0;
}

function bumpToday() {
  const n = countToday() + 1;
  localStorage.setItem(todayKey(), String(n));
  return n;
}

interface CatChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMsg {
  role: "user" | "assistant";
  content: string;
}

export function CatChatSheet({ isOpen, onClose }: CatChatSheetProps) {
  const personality = useHydratedStore((s) => s.personality, DEFAULT_STATE.personality);
  const aiOptIn = useHydratedStore((s) => s.aiOptIn, false);
  const setAiOptIn = useMeowneyStore((s) => s.setAiOptIn);
  const expenses = useHydratedStore((s) => s.expenses, DEFAULT_STATE.expenses);
  const goals = useHydratedStore((s) => s.goals, DEFAULT_STATE.goals);
  const balance = useHydratedStore((s) => s.balance, DEFAULT_STATE.balance);
  const addExpense = useMeowneyStore((s) => s.addExpense);
  const updateGoalProgress = useMeowneyStore((s) => s.updateGoalProgress);
  const persona = getPersonality(personality);

  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [twitch, setTwitch] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) listRef.current?.scrollTo({ top: 9999 });
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const sendLocal = (q: string) => {
    const reply = localChatReply(q, expenses, goals, balance, personality);
    setMessages((m) => [...m, { role: "user", content: q }, { role: "assistant", content: reply }]);
  };

  const applyActions = (
    actions: Array<{
      type: string;
      title?: string;
      amount?: number;
      category?: string;
      txType?: "expense" | "income";
      goalId?: string;
    }>
  ) => {
    for (const a of actions) {
      if (a.type === "add_expense" && a.amount && a.title) {
        addExpense({
          title: a.title,
          amount: a.amount,
          category: a.category || "Geral",
          type: a.txType || "expense",
          date: new Date().toISOString(),
        });
      }
      if (a.type === "contribute_goal" && a.goalId && a.amount) {
        updateGoalProgress(a.goalId, a.amount);
      }
    }
  };

  const handleSend = async () => {
    const q = input.trim();
    if (!q || busy) return;
    setInput("");

    if (!aiOptIn) {
      sendLocal(q);
      return;
    }
    if (countToday() >= DAILY_CAP) {
      setMessages((m) => [
        ...m,
        { role: "user", content: q },
        {
          role: "assistant",
          content: "O gato já falou demais hoje (limite de 20). Aqui vai o resumo local: " + localChatReply(q, expenses, goals, balance, personality),
        },
      ]);
      return;
    }

    setBusy(true);
    setTwitch(true);
    const history = [...messages, { role: "user" as const, content: q }];
    setMessages(history);

    try {
      bumpToday();
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personality: persona.id,
          messages: history.slice(-8),
          summary: buildFinanceSummary(expenses, goals, balance),
        }),
      });
      const data = (await res.json()) as {
        reply?: string;
        actions?: Array<{ type: string; title?: string; amount?: number; category?: string; txType?: "expense" | "income"; goalId?: string }>;
        fallback?: boolean;
      };
      if (!res.ok || data.fallback) {
        const local = localChatReply(q, expenses, goals, balance, personality);
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `O gato cochilou (${res.status === 429 ? "Groq 429" : "sem nuvem"}). ${local}`,
          },
        ]);
      } else {
        if (data.actions?.length) applyActions(data.actions);
        setMessages((m) => [...m, { role: "assistant", content: data.reply || localChatReply(q, expenses, goals, balance, personality) }]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `O gato cochilou. ${localChatReply(q, expenses, goals, balance, personality)}`,
        },
      ]);
    } finally {
      setBusy(false);
      setTimeout(() => setTwitch(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-soft-charcoal/50" onClick={onClose}>
      <div
        role="dialog"
        aria-label={`Chat com ${persona.namePt}`}
        className="w-full max-w-md bg-surface rounded-t-3xl border-t border-sakura-pink/30 p-4 pb-8 max-h-[80dvh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3">
          <CatMascot personality={personality} size={48} twitch={twitch} />
          <div className="flex-1">
            <p className="font-headline-md font-bold text-on-surface">{persona.namePt}</p>
            <p className="font-label-sm text-outline">{persona.tagline}</p>
          </div>
          <button type="button" onClick={onClose} className="w-11 h-11 rounded-full hover:bg-surface-container" aria-label="Fechar chat">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {!aiOptIn && (
          <div className="mb-3 p-3 rounded-2xl bg-cream-milk border border-sakura-pink/30 text-sm">
            <p className="text-on-surface mb-2">
              O chat na nuvem manda só um <strong>resumo</strong> (totais e 10 últimos títulos) para a Groq. O extrato completo fica neste aparelho.
            </p>
            <button
              type="button"
              onClick={() => setAiOptIn(true)}
              className="px-4 py-2 rounded-2xl bg-sakura-pink text-primary font-bold"
            >
              Ativar chat com resumo
            </button>
            <p className="text-outline mt-2">Sem ativar, o gato responde só com regras locais.</p>
          </div>
        )}

        <div ref={listRef} className="flex-1 overflow-y-auto flex flex-col gap-2 min-h-[180px] mb-3">
          {messages.length === 0 && (
            <p className="text-sm text-on-surface-variant">
              Pergunte “como foi a semana?”, “posso gastar em lazer?” ou “gastei 32 no petshop”.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-2xl text-sm max-w-[90%] ${
                m.role === "user" ? "self-end bg-sakura-pink/40 text-on-surface" : "self-start bg-cream-milk text-on-surface"
              }`}
            >
              {m.content}
            </div>
          ))}
          {busy && <p className="text-sm text-outline">O gato está digitando…</p>}
        </div>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fala com o gato…"
            className="flex-1 bg-white p-3 rounded-2xl border border-outline/20 outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="px-4 rounded-2xl bg-sakura-pink text-primary font-bold min-w-[44px]">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
