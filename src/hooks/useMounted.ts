import { useEffect, useState } from "react";

/** Avoid SSR/client markup drift for client-only UI (e.g. motion initial states). */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
