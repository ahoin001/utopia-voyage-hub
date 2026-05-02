import { Banknote, ShieldCheck, Wallet } from "lucide-react";

import { RevealOnView } from "@/components/RevealOnView";
import {
  ROOM_CABIN_TOTAL_USD,
  TRIP_PAYMENT_FRONT_PERSON,
  TRIP_ROOMS,
  type TripRoomId,
} from "@/data/trip";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().slice(0, Math.min(2, name.trim().length)).toUpperCase() || "?";
}

const INITIAL_RING = [
  "bg-gradient-to-br from-[oklch(0.72_0.16_195)] to-[oklch(0.26_0.08_260)] ring-1 ring-white/15 shadow-[0_0_24px_-6px_oklch(0.65_0.18_195/0.5)]",
  "bg-gradient-to-br from-[oklch(0.82_0.14_165)] to-[oklch(0.32_0.1_275)] ring-1 ring-white/15 shadow-[0_0_24px_-6px_oklch(0.7_0.16_200/0.4)]",
  "bg-gradient-to-br from-[oklch(0.88_0.15_72)] to-[oklch(0.45_0.14_25)] ring-1 ring-white/15 shadow-[0_0_24px_-6px_oklch(0.75_0.16_65/0.45)]",
  "bg-gradient-to-br from-[oklch(0.74_0.18_295)] to-[oklch(0.35_0.1_265)] ring-1 ring-white/15 shadow-[0_0_24px_-6px_oklch(0.55_0.2_295/0.45)]",
] as const;

function OweChip({ name, idx, amountUsd }: { name: string; idx: number; amountUsd: number }) {
  const ring = INITIAL_RING[idx % INITIAL_RING.length];
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-[oklch(1_0_0_/12%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/7%)_0%,_oklch(0.1_0.05_258/0.42)_100%)] px-4 py-4 text-center">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold uppercase tracking-wide text-[oklch(0.98_0.01_220)] ${ring}`}
      >
        {initials(name)}
      </div>
      <div className="text-sm font-semibold text-foreground">{name}</div>
      <div className="font-[family-name:var(--font-section)] text-lg font-bold tabular-nums tracking-tight text-aqua">
        {USD.format(amountUsd)}
      </div>
    </div>
  );
}

function metaById(id: TripRoomId) {
  return TRIP_ROOMS.find((r) => r.id === id)!;
}

export function Payment() {
  const r2Meta = metaById("room-2");
  const r3Meta = metaById("room-3");
  const r2Total = ROOM_CABIN_TOTAL_USD["room-2"];
  const r3Total = ROOM_CABIN_TOTAL_USD["room-3"];
  const heads = r2Meta.guestNames.length;

  const quarter2 = r2Total / heads;
  const quarter3 = r3Total / heads;

  const oweRoom2 = r2Meta.guestNames.filter((n) => n !== TRIP_PAYMENT_FRONT_PERSON);
  const oweRoom3 = [...r3Meta.guestNames];

  const totalIncoming = oweRoom2.reduce((s) => s + quarter2, 0) + oweRoom3.reduce((s) => s + quarter3, 0);

  return (
    <section id="payment" className="relative px-6 pb-28 pt-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 bottom-40 h-72 w-72 rounded-full bg-aqua/12 blur-[100px]" />
        <div className="absolute -right-20 top-1/4 h-56 w-56 rounded-full bg-sunset/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <RevealOnView>
          <header className="mb-10 text-center">
            <p className="mb-3 font-[family-name:var(--font-section)] text-[11px] font-semibold uppercase tracking-[0.32em] text-aqua">
              Quick reference
            </p>
            <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-foreground">
              What to send{" "}
              <span className="bg-[linear-gradient(90deg,_oklch(0.85_0.14_200),_oklch(0.88_0.14_75))] bg-clip-text text-transparent">
                Alex
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-foreground/68">
              Alex is charging <strong className="text-foreground/88">Rooms 2 &amp; 3</strong> to his card.
              Gu&apos;s solo cabin stays on{" "}
              <strong className="text-foreground/88">Gu&apos;s card</strong> — no Venmo derby there. Below:
              fair splits based on{" "}
              <strong className="text-foreground/85">¼ of each booked cabin.</strong>
            </p>
          </header>

          <div className="relative overflow-hidden rounded-[1.25rem] border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(155deg,_oklch(1_0_0_/9%)_0%,_oklch(0.12_0.06_255/0.5)_52%,_oklch(0.08_0.05_260/0.65)_100%)] p-1 shadow-[0_24px_60px_-40px_oklch(0_0_0/0.7)] backdrop-blur-sm">
            <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-aqua/10 blur-[80px]" />
            <div className="relative rounded-xl bg-[linear-gradient(180deg,_oklch(0.06_0.045_258/0.35)_0%,_oklch(0.14_0.06_255/0.2)_100%)] px-6 py-8 sm:px-8 sm:py-10">
              <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-aqua/35 bg-aqua/14 text-aqua">
                    <Wallet className="h-6 w-6" strokeWidth={2.1} aria-hidden />
                  </span>
                  <div>
                    <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.24em] text-aqua">
                      Roommates owe Alex · combined
                    </p>
                    <p className="mt-2 text-4xl font-bold tracking-tighter tabular-nums text-foreground sm:text-5xl">
                      {USD.format(totalIncoming)}
                    </p>
                    <p className="mt-2 max-w-md text-[13px] leading-relaxed text-foreground/55">
                      Covers everyone reimbursing Alex for their ¼ of Rooms 2 &amp; 3 (Alex doesn&apos;t
                      pay himself for his spot).
                    </p>
                  </div>
                </div>
              </div>

              <div id="payment-room-splits" className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[oklch(1_0_0_/16%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/6%)_0%,_oklch(0.05_0.04_258/0.45)_100%)] p-5 shadow-[inset_0_1px_0_oklch(1_0_0_/8%)] sm:p-6">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                        {r2Meta.label} · {r2Meta.cabinPhotoLabel}
                      </p>
                      <p className="mt-1 text-sm text-foreground/70">{r2Meta.guestNames.join(" · ")}</p>
                    </div>
                    <span className="rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-foreground/85 ring-1 ring-white/15">
                      Cabin {USD.format(r2Total)}
                    </span>
                  </div>
                  <p className="mb-4 text-[12px] leading-relaxed text-foreground/55">
                   ¼ each ={" "}
                    <span className="font-semibold text-foreground/82">{USD.format(quarter2)}</span> — we
                    only list roommates sending Alex (<strong>Alex omitted</strong>).
                  </p>
                  <div className={`grid gap-3 sm:gap-4 ${oweRoom2.length === 3 ? "sm:grid-cols-3" : ""}`}>
                    {oweRoom2.map((name, idx) => (
                      <OweChip key={name} name={name} idx={idx} amountUsd={quarter2} />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[oklch(1_0_0_/16%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/6%)_0%,_oklch(0.05_0.04_258/0.45)_100%)] p-5 shadow-[inset_0_1px_0_oklch(1_0_0_/8%)] sm:p-6">
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/45">
                        {r3Meta.label} · {r3Meta.cabinPhotoLabel}
                      </p>
                      <p className="mt-1 text-sm text-foreground/70">{r3Meta.guestNames.join(" · ")}</p>
                    </div>
                    <span className="rounded-full bg-white/8 px-3 py-1.5 text-[11px] font-semibold text-foreground/85 ring-1 ring-white/15">
                      Cabin {USD.format(r3Total)}
                    </span>
                  </div>
                  <p className="mb-4 text-[12px] leading-relaxed text-foreground/55">
                   ¼ each ={" "}
                    <span className="font-semibold text-foreground/82">{USD.format(quarter3)}</span>.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    {oweRoom3.map((name, idx) => (
                      <OweChip key={name} name={name} idx={idx + 4} amountUsd={quarter3} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-sunset/25 bg-sunset/8 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-start gap-3">
                  <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-sunset" aria-hidden />
                  <div>
                    <p className="font-[family-name:var(--font-section)] text-sm font-semibold text-sunset">
                      Gu — own card
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                      Gu&apos;s stateroom is <strong className="text-foreground/85">not</strong> on Alex&apos;s card.
                      Anything between Gu and the bank stays with Gu — nothing to reimburse Alex here.
                    </p>
                  </div>
                </div>
                <ShieldCheck className="mt-4 hidden h-8 w-8 shrink-0 text-sunset/85 sm:mt-0 sm:block" aria-hidden />
              </div>

              <p className="mt-8 text-center text-[12px] leading-relaxed text-foreground/52 sm:text-left">
                <span className="font-semibold text-gold">*</span> Drink package is{" "}
                <strong className="text-foreground/70">not</strong> included in these amounts — if your cabin adds
                it later, settle that separately (everyone in the room has to opt in together per Royal&apos;s rule).
              </p>
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}
