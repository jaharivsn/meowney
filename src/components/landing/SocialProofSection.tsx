import Image from "next/image";

export default function SocialProofSection() {
  const testimonials = [
    {
      id: "camila",
      name: "Camila R.",
      role: "Tutora do Frajola",
      text: "Finalmente consegui separar os gastos com sachês e vacinas do meu cartão principal. A interface é incrivelmente fofa e fácil de usar!",
      avatarBg: "bg-sakura-pink/30 text-primary",
      avatarLetter: "C"
    },
    {
      id: "marcos",
      name: "Marcos T.",
      role: "Tutor do Simba",
      text: "As Cat-Stashes salvaram minha vida. Guardei certinho pro arranhador torre que o Simba tanto queria. 10/10.",
      avatarBg: "bg-mint-fresh/30 text-tertiary",
      avatarLetter: "M"
    },
    {
      id: "lucas",
      name: "Lucas M.",
      role: "Tutor da Oliver",
      text: "Incrível como um app offline-first me deu total controle das despesas veterinárias. Sem cadastro burocrático e muito intuitivo!",
      avatarBg: "bg-sakura-pink/30 text-primary",
      avatarLetter: "L"
    }
  ];

  return (
    <section id="depoimentos" className="bg-surface-container-lowest py-20 md:py-24 px-6 border-t border-surface-variant/10 relative overflow-hidden z-10 scroll-mt-16">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <Image 
          src="/kawaii_paw_icon.jpg" 
          alt="" 
          width={400} 
          height={400} 
          className="mix-blend-multiply" 
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <p className="font-label-md text-sakura-pink uppercase tracking-widest font-bold mb-4">Como as pessoas descrevem</p>
        <h2 className="font-title-lg text-3xl md:text-4xl font-bold mb-12 text-on-surface">O que aparece depois de usar</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-stretch">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-surface p-6 md:p-8 rounded-3xl border border-surface-variant/30 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex text-[#FFD700] mb-4 text-base" aria-label="5 de 5 estrelas">
                  ★★★★★
                </div>
                <p className="text-on-surface-variant font-body-md mb-6 leading-relaxed text-sm md:text-base">
                  &quot;{t.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-surface-variant/10">
                <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-sm shrink-0`}>
                  {t.avatarLetter}
                </div>
                <div>
                  <p className="font-bold text-sm text-on-surface">{t.name}</p>
                  <p className="text-xs text-outline">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
