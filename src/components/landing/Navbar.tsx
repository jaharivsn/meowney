"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#recursos", label: "Recursos" },
    { href: "#precos", label: "Preços" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-variant/20 transition-all">
      <nav aria-label="Navegação Principal" className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-display-lg text-2xl font-bold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-lg"
        >
          <span className="material-symbols-outlined text-[28px] text-sakura-pink" aria-hidden="true">pets</span>
          <span>Meowney</span>
        </Link>

        {/* Desktop Anchor Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant hover:text-primary font-medium text-sm font-label-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Link 
            href="/app" 
            className="px-5 py-2.5 bg-sakura-pink text-primary rounded-2xl font-label-md font-bold hover:bg-sakura-pink/90 transition-all shadow-sm active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Acessar o App
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-xl"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-background border-b border-surface-variant/20 px-6 py-4 flex flex-col gap-4 shadow-lg animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface font-medium text-base py-2 hover:text-primary transition-colors border-b border-surface-variant/10 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
