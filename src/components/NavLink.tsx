"use client";

import { useRouter } from "next/navigation";
import { withViewTransition } from "@/lib/viewTransition";

interface NavLinkProps {
  href: string;
  isActive: boolean;
  icon: string;
  label: string;
}

export function NavLink({ href, isActive, icon, label }: NavLinkProps) {
  const router = useRouter();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        withViewTransition(() => router.push(href));
      }}
      className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-full transition-all duration-200 relative min-w-[44px] min-h-[44px] ${
        isActive
          ? "bg-sakura-pink text-primary shadow-inner scale-105 font-bold"
          : "text-on-surface-variant hover:text-primary hover:bg-sakura-pink/10 font-medium"
      }`}
    >
      <span className="material-symbols-outlined text-[22px]">{icon}</span>
      <span className="font-label-sm text-[11px] tracking-tight">{label}</span>
    </a>
  );
}
