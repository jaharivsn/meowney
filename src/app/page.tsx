"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Script from "next/script";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function LandingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Meus dados vão vazar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não! O Meowney é um aplicativo offline-first. Todos os seus dados financeiros ficam armazenados apenas no armazenamento local do seu próprio navegador."
        }
      },
      {
        "@type": "Question",
        "name": "Serve pra gastos pessoais?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Apesar do tema felino e fofo, você pode criar categorias e usar o Meowney para controlar totalmente as suas próprias finanças."
        }
      },
      {
        "@type": "Question",
        "name": "Posso baixar no meu celular?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! O Meowney funciona como um aplicativo nativo (PWA). No iPhone (Safari), toque no botão de Compartilhar e depois em 'Adicionar à Tela de Início'. No Android (Chrome), toque nos três pontinhos e selecione 'Adicionar à tela inicial'."
        }
      },
      {
        "@type": "Question",
        "name": "É gratuito?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Totalmente gratuito e sem anúncios. Feito de coração para a comunidade e para os pets."
        }
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Meowney",
    "image": "https://meowney.vercel.app/og-image.png",
    "description": "Aplicativo 100% privado e local para controle financeiro e gestão de gastos com pets.",
    "brand": {
      "@type": "Brand",
      "name": "Meowney"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BRL",
      "price": "0.00"
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-body-md antialiased overflow-x-hidden">
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="product-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-32 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.h1 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-title-lg text-4xl md:text-6xl font-bold tracking-tight mb-6 text-on-surface"
        >
          Finanças felinas,<br /> fofura garantida.
        </motion.h1>
        
        <motion.p 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Controle os gastos do seu pet (e os seus também) sem perder a fofura. O Meowney organiza suas finanças de forma 100% local e segura no seu navegador.
        </motion.p>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Link 
            href="/app"
            className="inline-flex items-center justify-center px-8 py-4 text-primary bg-sakura-pink hover:bg-sakura-pink/90 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Acessar o App
          </Link>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-surface/50 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUp} className="bg-surface p-8 rounded-3xl shadow-sm border border-surface-variant/20">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block">savings</span>
              <h3 className="font-title-md text-xl font-bold mb-3">Saldo Fácil</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Acompanhe o que entra e o que sai com uma interface simples, sem complicação ou jargões financeiros difíceis.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-surface p-8 rounded-3xl shadow-sm border border-surface-variant/20">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block">lock</span>
              <h3 className="font-title-md text-xl font-bold mb-3">100% Privado</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Sem nuvem, sem vazamento de dados. Tudo fica guardado no seu próprio navegador, garantindo privacidade total.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-surface p-8 rounded-3xl shadow-sm border border-surface-variant/20">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block">stars</span>
              <h3 className="font-title-md text-xl font-bold mb-3">Gestão de Metas</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Crie cofrinhos (stashes) para ração premium, vacinas ou novos brinquedos, e alcance seus objetivos passo a passo.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-3xl mx-auto w-full">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-title-lg text-3xl font-bold text-center mb-12"
        >
          Dúvidas Frequentes
        </motion.h2>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-4"
        >
          <FaqItem 
            question="Meus dados vão vazar?"
            answer="Não! O Meowney é um aplicativo offline-first. Todos os seus dados financeiros ficam armazenados apenas no armazenamento local do seu próprio navegador."
          />
          <FaqItem 
            question="Serve pra gastos pessoais?"
            answer="Sim! Apesar do tema felino e fofo, você pode criar categorias e usar o Meowney para controlar totalmente as suas próprias finanças."
          />
          <FaqItem 
            question="Posso baixar no meu celular?"
            answer="Sim! O Meowney funciona como um aplicativo nativo (PWA). No iPhone (Safari), toque no botão de Compartilhar e depois em 'Adicionar à Tela de Início'. No Android (Chrome), toque nos três pontinhos e selecione 'Adicionar à tela inicial'."
          />
          <FaqItem 
            question="É gratuito?"
            answer="Totalmente gratuito e sem anúncios. Feito de coração para a comunidade e para os pets."
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-surface-variant/20 text-on-surface-variant text-sm mt-auto">
        <p>© {new Date().getFullYear()} Meowney. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="border border-surface-variant/30 rounded-2xl overflow-hidden bg-surface">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary transition-colors hover:bg-surface-variant/10"
      >
        <span className="font-title-sm font-bold">{question}</span>
        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-on-surface-variant text-sm leading-relaxed border-t border-surface-variant/10 pt-4">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
}
