import { Smartphone } from "lucide-react";

import heroImg from "@/assets/hero-cruise.jpg";

import { CrewStrip } from "@/components/cruise/CrewStrip";

const ROYAL_IOS_APP =
  "https://apps.apple.com/us/app/royal-caribbean-international/id370144476";

export function Hero() {
  return (
    <section className="theme-zone theme-zone-explore relative min-h-[100svh] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Utopia of the Seas cruise ship at sunset"
          className="h-full w-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.9_0.06_92/0.22)] via-[oklch(0.82_0.12_65/0.18)] to-[oklch(0.72_0.12_210/0.55)]" />
      </div>

      {/* Floating orbs */}
      <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-aqua/30 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute -right-20 bottom-40 h-80 w-80 rounded-full bg-sunset/25 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-2xl flex-col items-center justify-center px-6 pb-20 pt-24 text-center sm:pb-16 sm:pt-20">
        <span className="glass mb-6 inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.25em] text-aqua animate-fade-up">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aqua" />
          Aug 28 — Sep 1, 2026
        </span>

        <h1
          className="animate-fade-up text-balance text-5xl font-bold leading-[0.92] tracking-tight sm:text-7xl md:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block">Utopia</span>
          <span className="block bg-[linear-gradient(100deg,_oklch(0.95_0.12_55)_0%,_oklch(0.78_0.16_320)_55%,_oklch(0.82_0.14_195)_100%)] bg-clip-text italic text-transparent">
            of the Seas
          </span>
          <span className="mt-2 block text-5xl sm:text-6xl" aria-hidden>
            🌴
          </span>
        </h1>

        <p
          className="animate-fade-up mt-5 max-w-md text-balance text-base leading-relaxed text-foreground/78 sm:mt-6 sm:text-xl"
          style={{ animationDelay: "0.3s" }}
        >
          Your crew&apos;s living guide: countdown, rooms, reimbursements, packing list — all in one scroll.
          <span className="mt-2 block font-[family-name:var(--font-section)] text-base font-semibold text-aqua">
            Relevant Trip info below.
          </span>
        </p>

        <div className="stagger-enter mt-8 flex w-full max-w-xl flex-col items-center gap-5 px-2 sm:mt-10 sm:gap-6">
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="trip-chip shrink-0 rounded-full border border-sunset/35 bg-sunset/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-sunset">
              Nassau Day
            </span>
            <span className="trip-chip shrink-0 rounded-full border border-aqua/35 bg-aqua/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-aqua">
              CocoCay Stop
            </span>
            <span className="trip-chip shrink-0 rounded-full border border-gold/35 bg-gold/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
              Ship Nightlife
            </span>
          </div>

          <a
            href="#countdown"
            className="motion-press motion-lift group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--gradient-sunset)] px-8 py-4 text-base font-semibold text-foreground shadow-[var(--shadow-glow-aqua)] font-[family-name:var(--font-section)]"
            style={{ background: "var(--gradient-sunset)" }}
          >
            <span className="relative z-10">Dive Into the Trip</span>
            <span className="shimmer absolute inset-0" />
          </a>

          <a
            href={ROYAL_IOS_APP}
            target="_blank"
            rel="noopener noreferrer"
            className="motion-press inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-foreground/95 backdrop-blur-sm transition hover:border-aqua/45 hover:bg-white/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/60"
          >
            <Smartphone className="h-4 w-4 shrink-0 text-aqua" aria-hidden />
            <span className="text-pretty text-center leading-snug">
              Get the <span className="text-aqua">Royal Caribbean</span> app on the App Store — check in,
              shows, and day plans
            </span>
          </a>

          <div className="w-full text-left">
            <CrewStrip />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:bottom-10 sm:block">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-foreground/40 p-1.5">
            <div className="h-2 w-1 animate-bounce rounded-full bg-foreground/60" />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] overflow-hidden">
        <svg
          className="w-[200%] translate-y-3 animate-wave"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,64 C240,96 480,112 720,96 C960,80 1200,48 1440,64 L1440,120 L0,120 Z"
            fill="oklch(0.72 0.12 210 / 0.8)"
          />
        </svg>
        <div className="h-10 bg-[linear-gradient(180deg,_oklch(0.72_0.12_210/0.75)_0%,_oklch(0.82_0.12_84/0.45)_100%)]" />
      </div>
    </section>
  );
}
