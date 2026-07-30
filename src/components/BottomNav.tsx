"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", icon: "pets", label: "Início" },
    { href: "/expenses", icon: "receipt_long", label: "Gastos" },
    { href: "/goals", icon: "stars", label: "Metas" },
    { href: "/profile", icon: "account_circle", label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-4 inset-x-margin-mobile z-50 pb-safe">
      <div className="bg-surface/90 backdrop-blur-xl rounded-xl flex justify-around items-center h-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)] px-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center w-14 h-12 rounded-lg transition-all hover:scale-105 active:scale-95 ${
                isActive
                  ? "bg-sakura-pink text-primary shadow-inner"
                  : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined">{link.icon}</span>
              <span className="font-label-sm text-label-sm">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
