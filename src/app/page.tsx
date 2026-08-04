"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import Script from "next/script";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.15 } },
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
      
      {/* Navbar Sticky */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-variant/20 transition-all">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-display-lg text-2xl font-bold text-primary">
            <span className="material-symbols-outlined text-[28px] text-sakura-pink">pets</span>
            Meowney
          </div>
          <Link 
            href="/app" 
            className="px-5 py-2.5 bg-sakura-pink text-primary rounded-xl font-label-md font-bold hover:bg-sakura-pink/90 transition-all shadow-sm active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Acessar o App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-40 max-w-[1400px] mx-auto flex flex-col items-center text-center gap-12 overflow-hidden">
        <div className="flex flex-col items-center z-10">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-title-lg text-5xl md:text-6xl lg:text-[72px] font-bold tracking-tight mb-6 text-on-surface leading-tight"
            style={{ textWrap: "balance" }}
          >
            Finanças felinas,<br /> fofura garantida.
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-on-surface-variant text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            style={{ textWrap: "pretty" }}
          >
            Controle os gastos do seu pet (e os seus também) sem perder a fofura. O Meowney organiza suas finanças de forma 100% local, no seu navegador.
          </motion.p>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/app"
              className="inline-flex items-center justify-center px-8 py-4 text-primary bg-sakura-pink hover:bg-sakura-pink/90 font-bold rounded-2xl shadow-sm transition-all hover:scale-105 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Começar Agora
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Link>
          </motion.div>
        </div>

        {/* Multi-Device Mockup (iPhone & Android) */}
        <motion.div 
          className="relative w-full max-w-4xl h-[450px] md:h-[650px] mt-8 flex justify-center items-end"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {/* Android Frame (Left) */}
          <div className="absolute bottom-0 left-[10%] md:left-[20%] w-[45%] md:w-[32%] aspect-[9/19] rounded-[2rem] md:rounded-[2.5rem] rounded-b-none md:rounded-b-none overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.2)] border-x-[6px] border-t-[6px] border-surface-variant/20 bg-surface z-20 -rotate-6 origin-bottom transition-transform hover:rotate-0 hover:z-40 duration-500">
            {/* Camera Hole */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black z-30"></div>
            <Image src="/hero-mockup-mobile.png" alt="Meowney no Android" fill className="object-cover object-top" priority />
          </div>

          {/* iPhone Frame (Right) */}
          <div className="absolute bottom-0 right-[10%] md:right-[20%] w-[45%] md:w-[32%] aspect-[9/19] rounded-[2.5rem] md:rounded-[3rem] rounded-b-none md:rounded-b-none overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.25)] border-x-[8px] border-t-[8px] border-surface-variant/30 bg-surface z-30 rotate-6 origin-bottom transition-transform hover:rotate-0 hover:z-40 duration-500">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[25%] h-6 rounded-full bg-black z-30"></div>
            <Image src="/hero-mockup-mobile.png" alt="Meowney no iPhone" fill className="object-cover object-top" priority />
          </div>
        </motion.div>
      </section>

      {/* Social Proof Section (New) */}
      <section className="bg-surface-container-lowest py-20 px-6 border-t border-surface-variant/10 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Image src="/kawaii_paw_icon.jpg" alt="Paw" width={400} height={400} className="mix-blend-multiply" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-label-md text-sakura-pink uppercase tracking-widest font-bold mb-8">Amado por Pais de Pet</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="bg-surface p-6 rounded-2xl border border-surface-variant/30 flex-1 shadow-sm text-left">
              <div className="flex text-[#FFD700] mb-3">★★★★★</div>
              <p className="text-on-surface-variant font-body-md mb-4 leading-relaxed">
                "Finalmente consegui separar os gastos com sachês e vacinas do meu cartão principal. A interface é incrivelmente fofa e fácil de usar!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sakura-pink/30 flex items-center justify-center font-bold text-primary">C</div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Camila R.</p>
                  <p className="text-xs text-outline">Tutora do Frajola</p>
                </div>
              </div>
            </div>
            
            <div className="bg-surface p-6 rounded-2xl border border-surface-variant/30 flex-1 shadow-sm text-left">
              <div className="flex text-[#FFD700] mb-3">★★★★★</div>
              <p className="text-on-surface-variant font-body-md mb-4 leading-relaxed">
                "As Cat-Stashes salvaram minha vida. Guardei certinho pro arranhador torre que o Simba tanto queria. 10/10."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mint-fresh/30 flex items-center justify-center font-bold text-tertiary">M</div>
                <div>
                  <p className="font-bold text-sm text-on-surface">Marcos T.</p>
                  <p className="text-xs text-outline">Tutor do Simba</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-surface py-24 px-6 border-t border-surface-variant/20">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeUp} className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant/40 hover:border-sakura-pink/50 transition-colors">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block">savings</span>
              <h3 className="font-title-md text-xl font-bold mb-3">Saldo Fácil</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Acompanhe o que entra e o que sai com uma interface simples, sem complicação ou jargões financeiros difíceis.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant/40 hover:border-sakura-pink/50 transition-colors">
              <span className="material-symbols-outlined text-4xl text-primary mb-4 block">lock</span>
              <h3 className="font-title-md text-xl font-bold mb-3">100% Privado</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Sem nuvem, sem vazamento de dados. Tudo fica guardado no seu próprio navegador, garantindo privacidade total.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant/40 hover:border-sakura-pink/50 transition-colors">
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
      <footer className="bg-surface-container-lowest py-12 border-t border-surface-variant/20 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-display-lg text-xl font-bold text-primary">
              <span className="material-symbols-outlined text-[24px] text-sakura-pink">pets</span>
              Meowney
            </div>
            <p className="text-on-surface-variant text-sm text-center md:text-left">
              Feito com 🐾 para tutores organizados.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold text-on-surface">
            <a href="mailto:jahari.wav@gmail.com" className="hover:text-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">mail</span>
              Suporte
            </a>
            <Link href="/app" className="hover:text-primary transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">open_in_new</span>
              Acessar App
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-surface-variant/10 text-center text-xs text-on-surface-variant opacity-70">
          <p>© {new Date().getFullYear()} Meowney. Todos os direitos reservados. Local-first privacy.</p>
        </div>
      </footer>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="border border-surface-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest hover:border-surface-variant/60 transition-colors">
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
