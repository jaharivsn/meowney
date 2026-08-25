"use client";

import { PERSONALITIES } from "@/lib/personalities";
import type { PersonalityId } from "@/lib/schemas";

interface PersonalityPickerProps {
  value: PersonalityId | null;
  onChange: (id: PersonalityId) => void;
  compact?: boolean;
}

export function PersonalityPicker({ value, onChange, compact }: PersonalityPickerProps) {
  return (
    <div className={`flex flex-col ${compact ? "gap-2" : "gap-3"} w-full`} role="listbox" aria-label="Escolha seu assistente felino">
      {PERSONALITIES.map((p) => {
        const selected = value === p.id;
        return (
          <button
            key={p.id}
            type="button"
            role="option"
            aria-selected={selected}
            data-testid={`personality-${p.id}`}
            onClick={() => onChange(p.id)}
            className={`text-left flex items-center p-3.5 rounded-2xl border-2 transition-all active:scale-[0.98] ${
              selected
                ? "border-primary bg-sakura-pink/30 ring-2 ring-primary/30"
                : "border-sakura-pink/20 bg-cream-milk hover:bg-white"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${p.accent} text-primary`}
            >
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {p.icon}
              </span>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-label-md text-label-md text-on-surface font-bold truncate">
                  {p.namePt}
                </h3>
                {selected && (
                  <span className="material-symbols-outlined text-sakura-pink text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                )}
              </div>
              {!compact && (
                <p className="font-body-md text-sm text-on-surface-variant leading-snug mt-0.5">
                  {p.description}
                </p>
              )}
              {compact && (
                <p className="font-label-sm text-label-sm text-outline mt-0.5">{p.tagline}</p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
