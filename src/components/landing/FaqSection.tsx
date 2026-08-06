"use client";

import { useState } from "react";
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

interface FaqData {
  id: string;
  question: string;
  answer: string;
}

const faqList: FaqData[] = [
  {
    id: "vazar-dados",
    question: "Meus dados vão vazar?",
    answer: "Não! O Meowney é um aplicativo offline-first. Todos os seus dados financeiros ficam armazenados apenas no armazenamento local do seu próprio navegador."
  },
  {
    id: "gastos-pessoais",
    question: "Serve pra gastos pessoais?",
    answer: "Sim! Apesar do tema felino e fofo, você pode criar categorias e usar o Meowney para controlar totalmente as suas próprias finanças."
  },
  {
    id: "baixar-celular",
    question: "Posso baixar no meu celular?",
    answer: "Sim! O Meowney funciona como um aplicativo nativo (PWA). No iPhone (Safari), toque no botão de Compartilhar e depois em 'Adicionar à Tela de Início'. No Android (Chrome), toque nos três pontinhos e selecione 'Adicionar à tela inicial'."
  },
  {
    id: "gratuito",
    question: "É gratuito?",
    answer: "Totalmente gratuito e sem anúncios. Feito de coração para a comunidade e para os pets."
  }
];

export default function FaqSection() {
  const mounted = useMounted();

  return (
    <section id="faq" className="pt-16 pb-24 md:pt-20 md:pb-32 px-6 max-w-3xl mx-auto w-full z-10 relative scroll-mt-16">
      <motion.h2 
        initial={mounted ? "hidden" : false}
        whileInView={mounted ? "visible" : false}
        viewport={{ once: true }}
        variants={fadeUp}
        className="font-title-lg text-3xl md:text-4xl font-bold text-center mb-12 text-on-surface"
      >
        Dúvidas Frequentes
      </motion.h2>
      
      <div className="space-y-4">
        {faqList.map((item) => (
          <FaqItem key={item.id} item={item} motionReady={mounted} />
        ))}
      </div>
    </section>
  );
}

function FaqItem({ item, motionReady }: { item: FaqData; motionReady: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `faq-button-${item.id}`;
  const contentId = `faq-content-${item.id}`;

  return (
    <motion.div 
      initial={motionReady ? "hidden" : false}
      whileInView={motionReady ? "visible" : false}
      viewport={{ once: true }}
      variants={fadeUp} 
      className="border border-sakura-pink/30 rounded-3xl overflow-hidden bg-surface-container-lowest hover:border-sakura-pink/60 hover:shadow-md transition-all group"
    >
      <button 
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary transition-colors group-hover:bg-sakura-pink/5"
      >
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary bg-sakura-pink/20 p-2 rounded-full hidden sm:block" aria-hidden="true">
            help
          </span>
          <span className="font-title-sm font-bold text-on-surface group-hover:text-primary transition-colors text-base md:text-lg">
            {item.question}
          </span>
        </div>
        <span 
          className={`material-symbols-outlined text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      <motion.div 
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden bg-surface-variant/5"
      >
        <div className="px-6 pb-6 pt-2 text-on-surface-variant text-base leading-relaxed sm:pl-[72px] font-body-md">
          {item.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}
