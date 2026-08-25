"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import { CatPawAnimation } from "@/components/brand/CatPawAnimation";
import { LiveHeroPhone } from "@/components/landing/LiveHeroPhone";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } 
  },
};

export default function HeroSection() {
  const mounted = useMounted();

  return (
    <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-36 max-w-[1400px] mx-auto flex flex-col items-center text-center gap-12 overflow-hidden">
      <div className="flex flex-col items-center z-10">
        {/* Trust Micro-Badge & Paw Animation */}
        <motion.div
          initial={mounted ? "hidden" : undefined}
          animate={mounted ? "visible" : undefined}
          variants={fadeUp}
          className="flex items-center gap-3 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sakura-pink/20 text-primary text-sm font-bold border border-sakura-pink/30 shadow-xs">
            <span className="material-symbols-outlined text-base text-sakura-pink animate-paw-pulse" aria-hidden="true">pets</span>
            <span>100% local · sem cadastro</span>
          </div>
          <CatPawAnimation count={3} size={16} className="hidden sm:inline-flex" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={mounted ? "hidden" : undefined}
          animate={mounted ? "visible" : undefined}
          variants={fadeUp}
          className="font-title-lg text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-6 text-on-surface leading-tight"
          style={{ textWrap: "balance" }}
        >
          O gato que te<br /> cobra a ração.
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          initial={mounted ? "hidden" : undefined}
          animate={mounted ? "visible" : undefined}
          variants={fadeUp}
          className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-6 leading-relaxed font-body-md"
          style={{ textWrap: "pretty" }}
        >
          Controle gastos do pet (e os seus) com cofrinhos que descontam do saldo, resumo da semana e um gato que fala a verdade — tudo no seu navegador.
        </motion.p>
        
        {/* Quick Answer Block (GEO/AEO) */}
        <motion.div
          initial={mounted ? "hidden" : undefined}
          animate={mounted ? "visible" : undefined}
          variants={fadeUp}
          className="bg-surface-variant/30 border border-sakura-pink/30 rounded-2xl p-4 max-w-xl mb-8 text-left text-sm text-on-surface-variant shadow-xs"
        >
          <div className="font-bold text-on-surface flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider text-primary">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">bolt</span>
            <span>Resposta Rápida</span>
          </div>
          <p>
            O <strong>Meowney</strong> é um aplicativo gratuito e 100% offline-first de controle financeiro pessoal e pet. Seus dados ficam salvos exclusivamente no seu navegador com total privacidade.
          </p>
        </motion.div>
        
        {/* Dual CTAs (Lapa.ninja Benchmark) */}
        <motion.div
          initial={mounted ? "hidden" : undefined}
          animate={mounted ? "visible" : undefined}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link 
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-primary bg-sakura-pink hover:bg-sakura-pink/90 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Começar sem cadastro</span>
            <span className="material-symbols-outlined ml-2 text-xl" aria-hidden="true">arrow_forward</span>
          </Link>

          <a 
            href="#recursos"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-on-surface bg-surface-variant/30 hover:bg-surface-variant/50 font-bold rounded-2xl border border-surface-variant/40 transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Ver Recursos</span>
            <span className="material-symbols-outlined ml-2 text-xl text-sakura-pink" aria-hidden="true">expand_more</span>
          </a>
        </motion.div>
      </div>

      <motion.div 
        className="relative w-full max-w-4xl mt-8 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8"
        initial={mounted ? { opacity: 0, y: 60 } : undefined}
        animate={mounted ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        <LiveHeroPhone />
      </motion.div>
    </section>
  );
}
