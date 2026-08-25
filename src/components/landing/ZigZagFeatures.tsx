"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  },
};

export default function ZigZagFeatures() {
  const mounted = useMounted();

  return (
    <section id="recursos" className="landing-reveal py-24 md:py-32 px-6 max-w-6xl mx-auto flex flex-col gap-24 md:gap-32 overflow-hidden scroll-mt-16">
      <div className="text-center mb-4">
        <p className="font-label-md text-sakura-pink uppercase tracking-widest font-bold mb-4">O Passo a Passo</p>
        <h2 className="font-title-lg text-4xl md:text-5xl font-bold text-on-surface">Organização na palma da pata</h2>
      </div>

      {/* Step 1 */}
      <motion.div 
        initial={mounted ? "hidden" : undefined} 
        whileInView={mounted ? "visible" : undefined} 
        viewport={{ once: true, margin: "-100px" }} 
        variants={fadeUp}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        <div className="flex-1 order-2 md:order-1 relative flex justify-center w-full">
          <div className="relative w-[80%] sm:w-[280px] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-[8px] border-surface-variant/30">
            <Image 
              src="/add-mockup.png" 
              alt="Adicionar Gasto no Meowney" 
              fill 
              unoptimized
              sizes="(max-width: 768px) 100vw, 280px" 
              className="object-cover" 
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-mint-fresh text-on-tertiary-container px-6 py-3 rounded-2xl shadow-xl font-bold flex items-center gap-2 rotate-[-5deg]">
            <span className="material-symbols-outlined" aria-hidden="true">bolt</span>
            <span>Ultra Rápido</span>
          </div>
        </div>
        <div className="flex-1 order-1 md:order-2 text-center md:text-left">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold mb-6 mx-auto md:mx-0">1</div>
          <h3 className="text-3xl font-bold mb-4 text-on-surface">Teclado, não planilha</h3>
          <p className="text-lg text-on-surface-variant leading-relaxed font-body-md">
            Lança o sachê em três toques. Recorrência mensal entra sozinha quando você abre o app.
          </p>
        </div>
      </motion.div>

      {/* Step 2 */}
      <motion.div 
        initial={mounted ? "hidden" : undefined} 
        whileInView={mounted ? "visible" : undefined} 
        viewport={{ once: true, margin: "-100px" }} 
        variants={fadeUp}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="w-16 h-16 bg-sakura-pink/20 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold mb-6 mx-auto md:mx-0">2</div>
          <h3 className="text-3xl font-bold mb-4 text-on-surface">Cofrinho que desconta do saldo</h3>
          <p className="text-lg text-on-surface-variant leading-relaxed font-body-md">
            Guardar R$ 50 no Cat-Stash tira R$ 50 do livre. Excluir a meta devolve. Sem contador fantasma.
          </p>
        </div>
        <div className="flex-1 relative flex justify-center w-full">
          <div className="relative w-[80%] sm:w-[280px] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-[8px] border-surface-variant/30">
            <Image 
              src="/goals-mockup.png" 
              alt="Cat Stashes no Meowney" 
              fill 
              unoptimized
              sizes="(max-width: 768px) 100vw, 280px" 
              className="object-cover" 
            />
          </div>
        </div>
      </motion.div>

      {/* Step 3 */}
      <motion.div 
        initial={mounted ? "hidden" : undefined} 
        whileInView={mounted ? "visible" : undefined} 
        viewport={{ once: true, margin: "-100px" }} 
        variants={fadeUp}
        className="flex flex-col md:flex-row items-center gap-12"
      >
        <div className="flex-1 order-2 md:order-1 relative flex justify-center w-full">
          <div className="relative w-[80%] sm:w-[280px] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl border-[8px] border-surface-variant/30">
            <Image 
              src="/profile-mockup.png" 
              alt="Perfil Privado no Meowney" 
              fill 
              unoptimized
              sizes="(max-width: 768px) 100vw, 280px" 
              className="object-cover" 
            />
          </div>
        </div>
        <div className="flex-1 order-1 md:order-2 text-center md:text-left">
          <div className="w-16 h-16 bg-surface-variant/30 rounded-2xl flex items-center justify-center text-on-surface text-2xl font-bold mb-6 mx-auto md:mx-0">3</div>
          <h3 className="text-3xl font-bold mb-4 text-on-surface">O gato que fala a verdade</h3>
          <p className="text-lg text-on-surface-variant leading-relaxed font-body-md">
            Um card por semana: categoria, reais, comparação. Se você abrir o chat, só um resumo sai do aparelho — nunca o extrato inteiro.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
