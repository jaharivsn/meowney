import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="precos" className="relative py-24 md:py-32 px-6 max-w-6xl mx-auto z-10 scroll-mt-16">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-sakura-pink/15 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      
      <div className="text-center mb-16">
        <p className="font-label-md text-sakura-pink uppercase tracking-widest font-bold mb-4">Investimento Transparente</p>
        <h2 className="font-title-lg text-4xl md:text-5xl font-bold mb-4 text-on-surface">Planos Transparentes</h2>
        <p className="text-on-surface-variant text-lg max-w-xl mx-auto font-body-md">
          Porque cuidar do seu pet já custa caro o suficiente. Escolha a melhor opção para sua rotina.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        {/* Plan 1: Local Free (Current) */}
        <div className="bg-surface-container-lowest border-2 border-sakura-pink/40 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between transition-all hover:border-sakura-pink/80">
          <div className="absolute top-0 right-0 bg-sakura-pink text-primary px-6 py-2 rounded-bl-2xl font-bold text-xs tracking-wider uppercase shadow-xs">
            O MAIS POPULAR
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[40px] text-primary" aria-hidden="true">stars</span>
              <h3 className="text-2xl font-bold text-on-surface">Cat Parent Local</h3>
            </div>
            
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-xl text-outline line-through font-medium">R$ 19,90</span>
              <span className="text-5xl font-extrabold text-primary tracking-tight">R$ 0,00</span>
              <span className="text-on-surface-variant font-medium text-sm">/para sempre</span>
            </div>
            
            <ul className="space-y-4 mb-10 text-on-surface-variant font-medium text-base">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-mint-fresh text-xl" aria-hidden="true">check_circle</span>
                <span>Cat-Stashes (Metas) Ilimitadas</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-mint-fresh text-xl" aria-hidden="true">check_circle</span>
                <span>Categorias Personalizáveis</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-mint-fresh text-xl" aria-hidden="true">check_circle</span>
                <span>Privacidade Offline-First Total</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-mint-fresh text-xl" aria-hidden="true">check_circle</span>
                <span>Zero Anúncios, Para Sempre</span>
              </li>
            </ul>
          </div>
          
          <Link 
            href="/app" 
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Começar Grátis Agora
          </Link>
        </div>

        {/* Plan 2: V2 Cloud Sync (Comparative Anchored Plan) */}
        <div className="bg-surface-container-lowest/80 border border-surface-variant/30 rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between opacity-90 hover:opacity-100 transition-all">
          <div className="absolute top-0 right-0 bg-surface-variant/40 text-on-surface-variant px-6 py-2 rounded-bl-2xl font-bold text-xs tracking-wider uppercase border-b border-l border-surface-variant/20">
            EM BREVE (V2)
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[40px] text-sakura-pink" aria-hidden="true">cloud_sync</span>
              <h3 className="text-2xl font-bold text-on-surface">Cat Parent Cloud</h3>
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-extrabold text-on-surface tracking-tight">R$ 19,90</span>
              <span className="text-on-surface-variant font-medium text-sm">/mês</span>
            </div>
            
            <ul className="space-y-4 mb-10 text-on-surface-variant font-medium text-base">
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sakura-pink text-xl" aria-hidden="true">check_circle</span>
                <span>Tudo do Plano Local</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sakura-pink text-xl" aria-hidden="true">check_circle</span>
                <span>Sincronização em Nuvem Criptografada</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sakura-pink text-xl" aria-hidden="true">check_circle</span>
                <span>Backup Multi-Dispositivo (iOS + Web)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-sakura-pink text-xl" aria-hidden="true">check_circle</span>
                <span>Compartilhamento de Gastos em Família</span>
              </li>
            </ul>
          </div>

          <button 
            type="button" 
            disabled 
            className="w-full py-4 bg-surface-variant/30 text-on-surface-variant/60 rounded-2xl font-bold text-lg cursor-not-allowed border border-surface-variant/40 text-center"
          >
            Em Breve na V2
          </button>
        </div>
      </div>
    </section>
  );
}
