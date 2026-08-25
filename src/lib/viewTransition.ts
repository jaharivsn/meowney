export function withViewTransition(fn: () => void) {
  if (typeof document === "undefined") {
    fn();
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => void;
  };
  if (reduce || !doc.startViewTransition) {
    fn();
    return;
  }
  doc.startViewTransition(fn);
}
