export default function AuthorityBar() {
  const chips = [
    { icon: "smartphone", label: "Dados só neste aparelho" },
    { icon: "money_off", label: "Grátis, sem cadastro" },
    { icon: "install_mobile", label: "Instala como PWA" },
  ];

  return (
    <section className="border-y border-sakura-pink/20 py-10 md:py-12 bg-cream-milk/40">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-stretch justify-center gap-3 sm:gap-4">
        {chips.map((c) => (
          <div
            key={c.label}
            className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-surface-container-lowest border border-sakura-pink/25 shadow-sm"
          >
            <span className="material-symbols-outlined text-primary text-[22px]" aria-hidden="true">
              {c.icon}
            </span>
            <span className="font-label-md text-label-md text-on-surface font-bold leading-snug">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
