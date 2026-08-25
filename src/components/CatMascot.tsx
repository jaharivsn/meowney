"use client";

import { getPersonality } from "@/lib/personalities";
import type { PersonalityId } from "@/lib/schemas";

interface CatMascotProps {
  personality: PersonalityId | null;
  size?: number;
  twitch?: boolean;
  onClick?: () => void;
  label?: string;
}

export function CatMascot({ personality, size = 64, twitch, onClick, label }: CatMascotProps) {
  const p = getPersonality(personality);
  const inner = (
    <>
      <span
        className={`material-symbols-outlined ${twitch ? "animate-tail-wiggle" : ""}`}
        style={{ fontSize: size * 0.5, fontVariationSettings: "'FILL' 1" }}
      >
        {p.icon}
      </span>
      <span
        className="absolute -bottom-0.5 -right-0.5 material-symbols-outlined text-primary animate-paw-pulse"
        style={{ fontSize: size * 0.28, fontVariationSettings: "'FILL' 1" }}
        aria-hidden="true"
      >
        pets
      </span>
    </>
  );
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label ?? p.namePt}
        className={`relative shrink-0 rounded-full flex items-center justify-center ${p.accent} text-primary active:scale-95 transition-transform cursor-pointer`}
        style={{ width: size, height: size }}
      >
        {inner}
      </button>
    );
  }

  return (
    <div
      aria-label={label ?? p.namePt}
      className={`relative shrink-0 rounded-full flex items-center justify-center ${p.accent} text-primary`}
      style={{ width: size, height: size }}
    >
      {inner}
    </div>
  );
}
