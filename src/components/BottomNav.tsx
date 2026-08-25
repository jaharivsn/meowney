"use client";

import { usePathname } from "next/navigation";
import { NavLink } from "@/components/NavLink";

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
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            isActive={pathname === link.href}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </div>
    </nav>
  );
}
