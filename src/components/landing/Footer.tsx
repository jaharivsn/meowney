import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-12 border-t border-surface-variant/20 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2 font-display-lg text-xl font-bold text-primary">
            <span className="material-symbols-outlined text-[24px] text-sakura-pink" aria-hidden="true">pets</span>
            <span>Meowney</span>
          </div>
          <p className="text-on-surface-variant text-sm text-center md:text-left font-body-md">
            Feito com 🐾 para tutores organizados.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 text-sm font-bold text-on-surface">
          <a 
            href="mailto:jahari.wav@gmail.com" 
            className="hover:text-primary transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md px-2 py-1"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">mail</span>
            <span>Suporte</span>
          </a>
          <Link 
            href="/app" 
            className="hover:text-primary transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded-md px-2 py-1"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">open_in_new</span>
            <span>Acessar App</span>
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-surface-variant/10 text-center text-xs text-on-surface-variant opacity-70">
        <p>© {new Date().getFullYear()} Meowney. Todos os direitos reservados. Local-first privacy.</p>
      </div>
    </footer>
  );
}
