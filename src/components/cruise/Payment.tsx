import { CalendarClock, CreditCard, UsersRound } from "lucide-react";

import { RevealOnView } from "@/components/RevealOnView";

const TILES = [
  {
    icon: CreditCard,
    title: "Two cards per cabin",
    body:
      "When it is time to pay, each cabin can put at most two cards on file. Coordinate with your roommates so nobody is surprised at checkout.",
    iconWrap: "bg-aqua/15 text-aqua ring-aqua/25",
  },
  {
    icon: UsersRound,
    title: "Know whose card you're on",
    body:
      "If you are not the one swiping, be clear whose booking you are under so paybacks stay simple later—whatever you use to settle up is between you.",
    iconWrap: "bg-sunset/15 text-sunset ring-sunset/25",
  },
  {
    icon: CalendarClock,
    title: "Affirm · six-month spread",
    body:
      "Payments are set up through Affirm, spread across about six months—you do not need the full cruise fare up front on day one.",
    iconWrap: "bg-gold/12 text-gold ring-gold/30",
  },
] as const;

export function Payment() {
  return (
    <section id="payment" className="relative px-6 pb-28 pt-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 bottom-40 h-72 w-72 rounded-full bg-aqua/10 blur-[100px]" />
        <div className="absolute -right-20 top-1/4 h-56 w-56 rounded-full bg-gold/8 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <RevealOnView>
          <header className="mb-12 text-center">
            <p className="mb-4 font-[family-name:var(--font-section)] text-[11px] font-semibold uppercase tracking-[0.35em] text-aqua">
              Paying together
            </p>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
              Room payment{" "}
              <span className="bg-[linear-gradient(90deg,_oklch(0.82_0.14_200),_oklch(0.82_0.14_88))] bg-clip-text text-transparent">
                at a glance
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-foreground/65">
              Cruise rules plus how we&apos;re structuring the booking—same page, no spreadsheet
              anxiety.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-3">
            {TILES.map(({ icon: Icon, title, body, iconWrap }) => (
              <article
                key={title}
                className="glass-strong flex flex-col rounded-2xl border border-white/[0.08] p-5 text-left shadow-[0_20px_50px_-30px_oklch(0.1_0.08_250/0.7)]"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${iconWrap}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground/72">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[linear-gradient(145deg,_oklch(1_0_0_/6%)_0%,_oklch(0.12_0.05_255_/0.55)_100%)] px-5 py-4 text-center backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-foreground/70">
              <span className="font-semibold text-foreground/90">TL;DR</span> Two cards maximum per
              room • know who is paying for you • Affirm installments over roughly six months, so
              you&apos;re not front-loading the entire balance.
            </p>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}
