import Script from "next/script";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AuthorityBar from "@/components/landing/AuthorityBar";
import ZigZagFeatures from "@/components/landing/ZigZagFeatures";
import PricingSection from "@/components/landing/PricingSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import BenefitsGrid from "@/components/landing/BenefitsGrid";
import FaqSection from "@/components/landing/FaqSection";
import Footer from "@/components/landing/Footer";

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
    <div className="min-h-screen bg-background text-on-background flex flex-col font-body-md antialiased overflow-x-hidden relative">
      {/* Soft Stitch atmosphere — sakura → cream → mint wash over #fcf9f8 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(255,183,197,0.28)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(163,228,215,0.22)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(255,253,208,0.45)_0%,_transparent_45%)]"
      />
      <Script 
        id="faq-schema" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      <Script 
        id="product-schema" 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} 
      />
      
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <AuthorityBar />
        <ZigZagFeatures />
        <PricingSection />
        <SocialProofSection />
        <BenefitsGrid />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
