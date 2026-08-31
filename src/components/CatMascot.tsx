"use client";

import { getPersonality } from "@/lib/personalities";
import type { PersonalityId } from "@/lib/schemas";

interface CatMascotProps {
  personality: PersonalityId | null;
  size?: number;
  twitch?: boolean;
  onClick?: () => void;
  label?: string;
  showAccessories?: boolean;
}

export function CatMascot({
  personality,
  size = 64,
  twitch,
  onClick,
  label,
  showAccessories = true,
}: CatMascotProps) {
  const p = getPersonality(personality);

  const innerSvg = (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={`shrink-0 overflow-visible select-none ${twitch ? "animate-tail-wiggle" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Soft Drop Shadow Filter */}
        <filter id={`mascot-shadow-${size}`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#864E5A" floodOpacity="0.18" />
        </filter>
        {/* Background Aura Radial Gradient */}
        <radialGradient id={`bg-aura-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF0F5" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FFE4EC" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFD1DC" stopOpacity="0" />
        </radialGradient>
        {/* Fur Gradients */}
        <linearGradient id={`fur-base-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFF4ED" />
        </linearGradient>
        <linearGradient id={`calico-peach-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id={`calico-gray-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        {/* Ear Pink */}
        <linearGradient id={`ear-pink-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        {/* Sakura Petal Gradient */}
        <linearGradient id={`sakura-petal-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF1F5" />
          <stop offset="40%" stopColor="#FFB7C5" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        {/* Eye Gradient */}
        <linearGradient id={`eye-grad-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="50%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#581C87" />
        </linearGradient>
      </defs>

      {/* Ambient Dreamy Background Aura with Pastel Sparkles */}
      <circle cx="60" cy="62" r="54" fill={`url(#bg-aura-${size})`} />
      <g opacity="0.75">
        {/* Small floating stars */}
        <path d="M 18 24 L 20 28 L 24 30 L 20 32 L 18 36 L 16 32 L 12 30 L 16 28 Z" fill="#FDE047" opacity="0.85" />
        <path d="M 104 28 L 105.5 31 L 109 32.5 L 105.5 34 L 104 37 L 102.5 34 L 99 32.5 L 102.5 31 Z" fill="#99F6E4" opacity="0.9" />
        <circle cx="28" cy="85" r="2.5" fill="#FBCFE8" opacity="0.8" />
        <circle cx="98" cy="78" r="3" fill="#FED7AA" opacity="0.8" />
      </g>

      {/* Main Cat Figure Group with Drop Shadow */}
      <g filter={`url(#mascot-shadow-${size})`}>
        {/* Left Ear (Viewer's Left - Peach Calico) */}
        <path
          d="M 28 50 C 24 32 34 16 46 22 C 54 26 55 42 52 52 Z"
          fill={`url(#calico-peach-${size})`}
        />
        <path
          d="M 33 46 C 30 35 37 24 45 28 C 50 31 50 42 47 48 Z"
          fill={`url(#ear-pink-${size})`}
        />

        {/* Right Ear (Viewer's Right - Gray/Beige Calico with Sakura Hairpin) */}
        <path
          d="M 92 50 C 96 32 86 16 74 22 C 66 26 65 42 68 52 Z"
          fill={`url(#calico-gray-${size})`}
        />
        <path
          d="M 87 46 C 90 35 83 24 75 28 C 70 31 70 42 73 48 Z"
          fill={`url(#ear-pink-${size})`}
        />

        {/* Head Base Silhouette */}
        <ellipse cx="60" cy="65" rx="38" ry="34" fill={`url(#fur-base-${size})`} />

        {/* Calico Patch on Top/Side of Head */}
        <path
          d="M 34 38 C 42 34 52 36 56 46 C 58 54 50 62 40 60 C 32 58 30 46 34 38 Z"
          fill={`url(#calico-peach-${size})`}
          opacity="0.95"
        />
        <path
          d="M 84 40 C 78 36 70 38 67 48 C 66 54 72 60 80 58 C 88 56 89 46 84 40 Z"
          fill={`url(#calico-gray-${size})`}
          opacity="0.75"
        />

        {/* Blushing Cheeks */}
        <ellipse cx="36" cy="74" rx="7" ry="4" fill="#FDA4AF" opacity="0.65" />
        <ellipse cx="84" cy="74" rx="7" ry="4" fill="#FDA4AF" opacity="0.65" />

        {/* Whiskers */}
        <g stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6">
          <line x1="22" y1="70" x2="10" y2="67" />
          <line x1="21" y1="75" x2="8" y2="76" />
          <line x1="98" y1="70" x2="110" y2="67" />
          <line x1="99" y1="75" x2="112" y2="76" />
        </g>

        {/* Anime Eyes */}
        {personality === "zen" ? (
          // Zen sleepy joyful curved eyes
          <g stroke="#374151" strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M 40 64 Q 46 58 52 64" />
            <path d="M 68 64 Q 74 58 80 64" />
          </g>
        ) : personality === "sassy" ? (
          // Sassy playful wink
          <g>
            {/* Left Eye Open */}
            <ellipse cx="46" cy="63" rx="6" ry="8" fill={`url(#eye-grad-${size})`} />
            <circle cx="44" cy="60" r="2.4" fill="#FFFFFF" />
            <circle cx="48" cy="66" r="1.2" fill="#FFFFFF" />
            {/* Right Eye Wink */}
            <path d="M 68 65 Q 74 57 80 65" stroke="#374151" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          // Default Large Sparkling Kawaii Eyes
          <g>
            {/* Left Eye */}
            <ellipse cx="46" cy="63" rx="6.5" ry="8.5" fill={`url(#eye-grad-${size})`} />
            <circle cx="44" cy="59.5" r="2.8" fill="#FFFFFF" />
            <circle cx="48.5" cy="66" r="1.4" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="74" cy="63" rx="6.5" ry="8.5" fill={`url(#eye-grad-${size})`} />
            <circle cx="72" cy="59.5" r="2.8" fill="#FFFFFF" />
            <circle cx="76.5" cy="66" r="1.4" fill="#FFFFFF" />
          </g>
        )}

        {/* Cute Pink Triangle Nose */}
        <polygon points="60,70 57,67 63,67" fill="#F43F5E" />

        {/* Happy Smiling Mouth with Pink Tongue */}
        <path
          d="M 55 72 C 55 77 60 79 60 74 C 60 79 65 77 65 72"
          stroke="#4B5563"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 57 74 C 57 80 63 80 63 74 Z"
          fill="#FB7185"
        />

        {/* Waving Paw (Bottom Right) */}
        <g className="animate-paw-pulse origin-bottom-right">
          <ellipse cx="88" cy="90" rx="9" ry="11" fill={`url(#fur-base-${size})`} />
          {/* Paw Pads */}
          <ellipse cx="88" cy="89" rx="4.5" ry="4" fill="#FDA4AF" />
          <circle cx="83.5" cy="84" r="1.8" fill="#FDA4AF" />
          <circle cx="88" cy="82.5" r="1.8" fill="#FDA4AF" />
          <circle cx="92.5" cy="84" r="1.8" fill="#FDA4AF" />
        </g>

        {/* SAKURA BLOSSOM HAIRPIN ON RIGHT EAR (Viewer's Right, circled in user screenshot!) */}
        {showAccessories && (
          <g transform="translate(86, 26) scale(0.92)">
            {/* 5 Delicate Sakura Blossom Petals */}
            <g>
              {/* Top Petal */}
              <ellipse cx="0" cy="-7" rx="4" ry="5.5" fill={`url(#sakura-petal-${size})`} />
              {/* Top-Right Petal */}
              <ellipse cx="6.5" cy="-2.5" rx="5.5" ry="4" transform="rotate(25, 6.5, -2.5)" fill={`url(#sakura-petal-${size})`} />
              {/* Bottom-Right Petal */}
              <ellipse cx="4.5" cy="5.5" rx="5.5" ry="4" transform="rotate(75, 4.5, 5.5)" fill={`url(#sakura-petal-${size})`} />
              {/* Bottom-Left Petal */}
              <ellipse cx="-4.5" cy="5.5" rx="5.5" ry="4" transform="rotate(-75, -4.5, 5.5)" fill={`url(#sakura-petal-${size})`} />
              {/* Top-Left Petal */}
              <ellipse cx="-6.5" cy="-2.5" rx="5.5" ry="4" transform="rotate(-25, -6.5, -2.5)" fill={`url(#sakura-petal-${size})`} />
            </g>

            {/* Inner Flower Ring & Golden Pistil */}
            <circle cx="0" cy="0" r="3.2" fill="#F43F5E" opacity="0.4" />
            <circle cx="0" cy="0" r="2.2" fill="#FDE047" />
            <circle cx="0" cy="0" r="1" fill="#FEF08A" />
          </g>
        )}
      </g>
    </svg>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label ?? p.namePt}
        className="relative shrink-0 rounded-full flex items-center justify-center active:scale-95 transition-transform cursor-pointer p-0.5"
        style={{ width: size, height: size }}
      >
        {innerSvg}
      </button>
    );
  }

  return (
    <div
      aria-label={label ?? p.namePt}
      className="relative shrink-0 rounded-full flex items-center justify-center p-0.5"
      style={{ width: size, height: size }}
    >
      {innerSvg}
    </div>
  );
}

