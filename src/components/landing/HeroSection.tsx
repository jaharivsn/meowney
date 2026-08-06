"use client";

import Link from "next/link";
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

export default function HeroSection() {
  const mounted = useMounted();

  return (
    <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-36 max-w-[1400px] mx-auto flex flex-col items-center text-center gap-12 overflow-hidden">
      <div className="flex flex-col items-center z-10">
        {/* Trust Micro-Badge (Lapa.ninja Benchmark) */}
        <motion.div
          initial={mounted ? "hidden" : false}
          animate={mounted ? "visible" : false}
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sakura-pink/20 text-primary text-sm font-bold mb-6 border border-sakura-pink/30 shadow-xs"
        >
          <span className="material-symbols-outlined text-base text-sakura-pink" aria-hidden="true">pets</span>
          <span>+2.400 tutores felizes</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={mounted ? "hidden" : false}
          animate={mounted ? "visible" : false}
          variants={fadeUp}
          className="font-title-lg text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-6 text-on-surface leading-tight"
          style={{ textWrap: "balance" }}
        >
          Finanças felinas,<br /> fofura garantida.
        </motion.h1>
        
        {/* Subheadline */}
        <motion.p 
          initial={mounted ? "hidden" : false}
          animate={mounted ? "visible" : false}
          variants={fadeUp}
          className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-body-md"
          style={{ textWrap: "pretty" }}
        >
          Controle os gastos do seu pet (e os seus também) sem perder a fofura. O Meowney organiza suas finanças de forma 100% local, no seu navegador.
        </motion.p>
        
        {/* Dual CTAs (Lapa.ninja Benchmark) */}
        <motion.div
          initial={mounted ? "hidden" : false}
          animate={mounted ? "visible" : false}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link 
            href="/app"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-primary bg-sakura-pink hover:bg-sakura-pink/90 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span>Começar Agora</span>
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

      {/* Multi-Device Mockup Frames */}
      <motion.div 
        className="relative w-full max-w-4xl mt-8 flex flex-col md:flex-row justify-center items-center gap-12 md:gap-8 perspective-1000"
        initial={mounted ? { opacity: 0, y: 100 } : false}
        animate={mounted ? { opacity: 1, y: 0 } : false}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        {/* Primary iPhone Frame (Mobile View) */}
        <div className="relative w-[85%] sm:w-[320px] aspect-[9/19] rounded-[3rem] overflow-hidden bg-black z-30 shadow-[0_40px_80px_rgba(0,0,0,0.25)] border-[12px] border-surface-variant/30 md:rotate-3 origin-bottom transition-all hover:rotate-0 hover:scale-105 duration-500 ring-1 ring-white/10">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[30%] h-7 rounded-full bg-black z-40 shadow-inner"></div>
          <Image 
            src="/hero-mockup-dashboard.png" 
            alt="Meowney no iPhone" 
            fill 
            sizes="(max-width: 768px) 100vw, 320px" 
            className="object-cover object-top" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-50"></div>
        </div>

        {/* Secondary Mockup Frame (Desktop/Tablet View - Corrected Asset Link) */}
        <div className="hidden md:block relative w-[85%] sm:w-[320px] aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-black z-20 shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-[8px] border-surface-variant/20 md:-rotate-3 origin-bottom transition-all hover:rotate-0 hover:scale-105 duration-500 md:-ml-20 lg:-ml-12 mt-[-40px] md:mt-16">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black z-40 shadow-inner"></div>
          <Image 
            src="/hero-mockup-desktop.png" 
            alt="Meowney no Desktop" 
            fill 
            sizes="(max-width: 768px) 100vw, 320px" 
            className="object-cover object-top" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-50"></div>
        </div>
      </motion.div>
    </section>
  );
}
