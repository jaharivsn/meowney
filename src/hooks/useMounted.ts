import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** Avoid SSR/client markup drift for client-only UI (e.g. motion initial states). */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
