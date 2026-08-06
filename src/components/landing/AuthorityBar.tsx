export default function AuthorityBar() {
  return (
    <section className="bg-surface-variant/5 border-y border-surface-variant/10 py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        <p className="font-bold text-sm tracking-widest uppercase text-on-surface-variant">Destaque em:</p>
        <div className="flex gap-10 text-xl font-display-lg font-bold text-on-surface">
          <span>TechCrunch</span>
          <span>Gato & Cia</span>
          <span>App of the Day</span>
          <span className="hidden md:inline">Forbes Pets</span>
        </div>
      </div>
    </section>
  );
}
