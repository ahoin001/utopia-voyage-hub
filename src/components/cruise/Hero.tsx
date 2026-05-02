import heroImg from "@/assets/hero-cruise.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Utopia of the Seas cruise ship at sunset"
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.06_240/0.55)] via-[oklch(0.18_0.06_240/0.35)] to-[oklch(0.18_0.06_240/0.95)]" />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-aqua/30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-sunset/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <span className="glass mb-6 inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.25em] text-aqua animate-fade-up">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aqua" />
          Aug 28 — Sep 1, 2026
        </span>

        <h1 className="text-6xl font-bold leading-[0.95] sm:text-7xl md:text-8xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <span className="block">Utopia</span>
          <span className="block gradient-text-sunset italic">of the Seas</span>
          <span className="block text-5xl sm:text-6xl">🌴</span>
        </h1>

        <p className="mt-6 max-w-md text-lg text-foreground/80 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Sun. Drinks. Memories.
          <br />
          <span className="text-aqua font-medium">Let's run it.</span>
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          <a
            href="#experience"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--gradient-sunset)] px-8 py-4 text-base font-semibold text-foreground shadow-[var(--shadow-glow-aqua)] transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <span className="relative z-10">View Trip Details</span>
            <span className="shimmer absolute inset-0" />
          </a>

          <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
            Milena · Rigo · Daniella · Nana · Saurel · Shirlon · Alex · Gu · Jon · Tyler
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/40 p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-foreground/60" />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <svg
        className="absolute bottom-0 left-0 z-10 w-[200%] animate-wave"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,64 C240,96 480,112 720,96 C960,80 1200,48 1440,64 L1440,120 L0,120 Z"
          fill="oklch(0.18 0.06 240)"
          opacity="0.9"
        />
      </svg>
    </section>
  );
}
