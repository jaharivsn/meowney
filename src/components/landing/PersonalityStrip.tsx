"use client";

import Link from "next/link";
import { PERSONALITIES } from "@/lib/personalities";

export default function PersonalityStrip() {
  return (
    <section id="gato" className="py-16 md:py-24 px-6 max-w-5xl mx-auto scroll-mt-16">
      <h2 className="font-title-lg text-3xl md:text-4xl font-bold text-center mb-3 text-on-surface">
        Escolhe quem te cobra
      </h2>
      <p className="text-center text-on-surface-variant mb-10 max-w-xl mx-auto">
        Quatro gatos, quatro jeitos de falar de dinheiro. O app abre já com o que você escolheu.
      </p>
      <div className="grid sm:grid-cols-2 gap-3">
        {PERSONALITIES.map((p) => (
          <Link
            key={p.id}
            href={`/app?personality=${p.id}`}
            className={`flex items-center gap-3 p-4 rounded-2xl border border-sakura-pink/25 ${p.accent} hover:scale-[1.01] active:scale-[0.99] transition-transform`}
          >
            <span className="material-symbols-outlined text-[28px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              {p.icon}
            </span>
            <div className="text-left">
              <p className="font-bold text-on-surface">{p.namePt}</p>
              <p className="text-sm text-on-surface-variant">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
