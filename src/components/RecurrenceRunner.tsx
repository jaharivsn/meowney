"use client";

import { useEffect, useRef, useState } from "react";
import { useMeowneyStore } from "@/lib/store";
import { requestLocalNotification } from "@/lib/recurrence";

export function RecurrenceRunner() {
  const isHydrated = useMeowneyStore((s) => s.isHydrated);
  const processDueRecurrences = useMeowneyStore((s) => s.processDueRecurrences);
  const notificationsEnabled = useMeowneyStore((s) => s.notificationsEnabled);
  const [toast, setToast] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (!isHydrated || ran.current) return;
    ran.current = true;
    const created = processDueRecurrences();
    if (created.length === 0) return;
    const names = created.map((e) => e.title).join(", ");
    const msg =
      created.length === 1
        ? `Lancei ${created[0].title} automaticamente.`
        : `Lancei ${created.length} recorrências: ${names}.`;
    setToast(msg);
    if (notificationsEnabled) {
      requestLocalNotification("Meowney", msg);
    }
    const t = setTimeout(() => setToast(null), 5200);
    return () => clearTimeout(t);
  }, [isHydrated, processDueRecurrences, notificationsEnabled]);

  if (!toast) return null;

  return (
    <div
      role="status"
      className="fixed top-20 inset-x-4 z-[90] mx-auto max-w-md rounded-2xl bg-cream-milk border border-sakura-pink/40 px-4 py-3 shadow-md flex items-start gap-2"
    >
      <span className="material-symbols-outlined text-primary" aria-hidden="true">
        autorenew
      </span>
      <p className="font-body-md text-sm text-on-surface flex-1">{toast}</p>
      <button
        type="button"
        onClick={() => setToast(null)}
        className="p-1 rounded-full hover:bg-sakura-pink/20"
        aria-label="Fechar aviso"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
}
