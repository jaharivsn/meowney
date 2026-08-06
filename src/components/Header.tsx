import Image from "next/image";
import Link from "next/link";
import { MeowneyLogo } from "./brand/MeowneyLogo";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.02)] border-b border-surface-variant/20">
      <div className="h-16 px-margin-mobile flex items-center justify-between max-w-7xl mx-auto">
        <Link
          href="/app"
          className="flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl p-1"
          aria-label="Ir para a página inicial do App"
        >
          <MeowneyLogo size="sm" showWordmark={false} />
          <span className="font-headline-md text-headline-md text-primary tracking-tight">
            {title}
          </span>
        </Link>

        <Link
          href="/app/profile"
          className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm ring-2 ring-sakura-pink/40 hover:ring-sakura-pink hover:scale-105 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Ir para a página de Perfil"
          title="Meu Perfil"
        >
          <Image
            alt="Foto do Perfil"
            className="object-cover"
            fill
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMG7yRoAXdNaeC57pEKjPZCGnbRrS--CVnH4KyB6eXdYOFLlRxQbDw7M12Fv6Fq2bveh-vB25qDqI7-kQEjBKF0y60WmoDtjJ0RG-gVde6mh7296kWBmXltu5fI3PYwCRTOUhl-rjlbUXfi69r-NkVcp50P38e_PSc3v8ARv8gTdoqaUjRwgnEsHGQpmMsAADD5C4tu0gEGXSXqzO-k084pFMbqSOSc4pHPkrHegFaIXwoJG_sUXso"
            unoptimized
          />
        </Link>
      </div>
    </header>
  );
}

