export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/15 blur-3xl animate-float" />
        <div className="absolute right-10 top-10 h-40 w-40 rounded-full bg-sunset/20 blur-2xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display text-5xl font-bold leading-tight sm:text-6xl">
          We're making{" "}
          <span className="gradient-text-sunset italic">memories</span>,
          <br />
          not just plans.
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative w-full overflow-hidden rounded-full px-8 py-4 text-base font-semibold text-foreground shadow-[var(--shadow-glow-aqua)] transition-transform hover:scale-105 active:scale-95 sm:w-auto" style={{ background: "var(--gradient-sunset)" }}>
            <span className="relative z-10">I'm In 🔥</span>
            <span className="shimmer absolute inset-0" />
          </button>
          <a
            href="sms:&body=Yo%20Alex%20—%20cruise%20question:"
            className="glass-strong w-full rounded-full px-8 py-4 text-base font-semibold transition hover:bg-white/15 sm:w-auto"
          >
            Questions? Ask Alex
          </a>
        </div>

        <p className="mt-12 text-xs uppercase tracking-[0.3em] text-foreground/40">
          Utopia of the Seas · Aug 28 — Sep 1, 2026
        </p>
      </div>
    </section>
  );
}
