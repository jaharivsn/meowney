"use client";

import { useEffect, useState } from "react";

const FRAMES = [
  { label: "Saldo", value: "R$ 842,10", note: "Essa semana petshop comeu R$ 186" },
  { label: "Cofrinho Ração", value: "R$ 120 / 200", note: "Guardar R$ 50 agora" },
  { label: "Gato", value: "A Animadora", note: "Posso pedir ifood? Cabe R$ 40." },
];

export function LiveHeroPhone() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % FRAMES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const frame = FRAMES[i];

  return (
    <div className="relative w-[85%] sm:w-[320px] aspect-[9/19] rounded-[3rem] overflow-hidden bg-[#fcf9f8] z-30 shadow-[0_40px_80px_rgba(0,0,0,0.18)] border-[12px] border-[#2B2B2B] origin-bottom">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[30%] h-6 rounded-full bg-black z-40" />
      <div className="h-full pt-12 px-4 pb-6 flex flex-col gap-3">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#864e5a]">Meowney</p>
        <div className="rounded-3xl bg-[#FFFDD0] border border-[#FFB7C5]/40 p-4 text-left">
          <p className="text-xs text-[#864e5a] font-bold">{frame.label}</p>
          <p className="text-2xl font-extrabold text-[#2B2B2B] mt-1">{frame.value}</p>
          <p className="text-sm text-[#514345] mt-2 leading-snug">{frame.note}</p>
        </div>
        <div className="rounded-3xl bg-[#FFB7C5]/30 p-3 text-left text-sm flex gap-2">
          <span className="material-symbols-outlined text-[#864e5a]">pets</span>
          <span>Lancei a ração de agosto sozinho.</span>
        </div>
        <div className="mt-auto grid grid-cols-4 gap-1 text-[10px] text-center text-[#514345]">
          {["Início", "Gastos", "Metas", "Perfil"].map((l) => (
            <span key={l} className="py-2 rounded-full bg-white border border-[#FFB7C5]/30">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
