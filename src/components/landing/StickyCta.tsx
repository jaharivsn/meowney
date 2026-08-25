"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(max > 0 && window.scrollY / max > 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-50 pb-safe">
      <Link
        href="/app"
        className="flex items-center justify-center w-full py-4 rounded-2xl bg-sakura-pink text-primary font-bold shadow-md"
      >
        Começar sem cadastro
      </Link>
    </div>
  );
}
