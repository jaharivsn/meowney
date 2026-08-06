"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/app", icon: "pets", label: "Início" },
    { href: "/app/expenses", icon: "receipt_long", label: "Gastos" },
    { href: "/app/goals", icon: "stars", label: "Metas" },
    { href: "/app/profile", icon: "account_circle", label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-6 inset-x-margin-mobile z-50 pb-safe flex justify-center">
      <div className="bg-surface/90 backdrop-blur-xl rounded-xl flex justify-around items-center h-16 max-w-md w-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-300 relative ${
                isActive
                  ? "bg-sakura-pink text-primary shadow-inner scale-105 font-bold"
                  : "text-on-surface-variant hover:text-primary hover:bg-sakura-pink/10 font-medium"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
              <span className="font-label-sm text-[11px] tracking-tight">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
