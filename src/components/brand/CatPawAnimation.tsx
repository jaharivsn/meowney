"use client";

import React from "react";

interface CatPawAnimationProps {
  className?: string;
  count?: number;
  size?: number;
}

export function CatPawAnimation({
  className = "",
  count = 4,
  size = 20,
}: CatPawAnimationProps) {
  return (
    <div
      className={`inline-flex items-center gap-3 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <span
          key={idx}
          className="material-symbols-outlined text-primary/80 animate-paw-step"
          style={{
            fontSize: `${size}px`,
            animationDelay: `${idx * 0.4}s`,
            transform: `rotate(${idx % 2 === 0 ? "15deg" : "-15deg"})`,
            fontVariationSettings: "'FILL' 1",
          }}
        >
          pets
        </span>
      ))}
    </div>
  );
}

export default CatPawAnimation;
