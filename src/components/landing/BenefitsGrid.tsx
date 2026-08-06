"use client";

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

export default function BenefitsGrid() {
  const mounted = useMounted();
  const benefits = [
    {
      icon: "savings",
      title: "Saldo Fácil",
      description: "Acompanhe o que entra e o que sai com uma interface simples, sem complicação ou jargões financeiros difíceis."
    },
    {
      icon: "lock",
      title: "100% Privado",
      description: "Sem nuvem, sem vazamento de dados. Tudo fica guardado no seu próprio navegador, garantindo privacidade total."
    },
    {
      icon: "stars",
      title: "Gestão de Metas",
      description: "Crie cofrinhos (stashes) para ração premium, vacinas ou novos brinquedos, e alcance seus objetivos passo a passo."
    }
  ];

  return (
    <section className="bg-surface py-16 md:py-24 px-6 border-t border-surface-variant/20 z-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, index) => (
            <motion.div 
              key={index}
              initial={mounted ? "hidden" : false}
              whileInView={mounted ? "visible" : false}
              viewport={{ once: true }}
              variants={fadeUp} 
              className="bg-surface-container-lowest p-8 rounded-3xl border border-surface-variant/40 hover:border-sakura-pink/50 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block" aria-hidden="true">
                {b.icon}
              </span>
              <h3 className="font-title-md text-xl font-bold mb-3 text-on-surface">{b.title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed font-body-md">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
