import {
  Banknote,
  Bolt,
  Percent,
  Sparkles,
  UtensilsCrossed,
  UserRound,
  Users,
  Wine,
  Wifi,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { RevealOnView } from "@/components/RevealOnView";
import balconyImg from "@/assets/balcony-room.jpg";
import suiteImg from "@/assets/owners-suite.jpg";

import { useTripCrew } from "@/contexts/TripCrewContext";
import { DRINK_PACKAGE_PER_PERSON, TRIP_ROOMS } from "@/data/trip";

function Money({ value }: { value: number }) {
  return <>${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</>;
}

function roundedShare(total: number, people: number) {
  return Math.round(total / people);
}

/** Balcony cabins: emphasize per-person and cabin totals side-by-side */
function BalconyPricePair({
  perPerson,
  total,
  finePrintPerPerson,
  discountSlot,
  footnoteSlot,
}: {
  perPerson: number;
  total: number;
  finePrintPerPerson?: string;
  discountSlot?: ReactNode;
  footnoteSlot?: ReactNode;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
      <div className="relative overflow-hidden rounded-2xl border border-aqua/50 bg-[linear-gradient(148deg,_oklch(0.78_0.14_200/0.16)_0%,_oklch(0.16_0.06_255/0.45)_52%,_oklch(0.09_0.05_255/0.55)_100%)] p-px shadow-[0_0_40px_-12px_oklch(0.72_0.2_195/0.8)]">
        <div className="relative h-full rounded-[calc(1rem-1px)] bg-[linear-gradient(165deg,_oklch(1_0_0_/12%)_0%,_oklch(0.12_0.05_255/0.5)_55%,_oklch(0.06_0.045_258/0.65)_100%)] px-4 py-4 sm:px-5 sm:py-5">
          <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-aqua/20 blur-[50px]" />
          <div className="relative flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-aqua/35 bg-aqua/15 text-aqua shadow-[inset_0_1px_0_oklch(1_0_0_/14%)]">
              <Users className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.26em] text-aqua">
                Per person · your lane
              </p>
              <div className="price-pop-pp mt-1">
                <Money value={perPerson} />
              </div>
              {finePrintPerPerson && (
                <p className="mt-2 text-pretty text-[11px] leading-relaxed text-foreground/55">
                  {finePrintPerPerson}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center rounded-2xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/7%)_0%,_oklch(0.06_0.045_258/0.4)_100%)] px-4 py-4 sm:px-5 sm:py-5">
        {discountSlot}
        <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.26em] text-foreground/40">
          Full cabin · total booked
        </p>
        <div className="price-pop mt-1">
          <Money value={total} />
        </div>
        {footnoteSlot}
      </div>
    </div>
  );
}

/** One or two initials, no emoji. */
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().slice(0, Math.min(2, name.trim().length)).toUpperCase() || "?";
}

const AVATAR_RINGS = [
  "bg-gradient-to-br from-[oklch(0.72_0.16_195)] via-[oklch(0.48_0.12_220)] to-[oklch(0.22_0.08_255)] shadow-[0_0_36px_-6px_oklch(0.72_0.2_195/0.85)] ring-2 ring-[oklch(1_0_0_/18%)]",
  "bg-gradient-to-br from-[oklch(0.82_0.14_165)] via-[oklch(0.45_0.12_255)] to-[oklch(0.2_0.07_270)] shadow-[0_0_36px_-6px_oklch(0.65_0.16_200/0.6)] ring-2 ring-[oklch(1_0_0_/18%)]",
  "bg-gradient-to-br from-[oklch(0.88_0.15_72)] via-[oklch(0.55_0.16_25)] to-[oklch(0.35_0.1_280)] shadow-[0_0_34px_-5px_oklch(0.78_0.18_55/0.5)] ring-2 ring-[oklch(1_0_0_/16%)]",
  "bg-gradient-to-br from-[oklch(0.74_0.18_295)] via-[oklch(0.42_0.14_250)] to-[oklch(0.2_0.06_255)] shadow-[0_0_36px_-6px_oklch(0.55_0.2_300/0.55)] ring-2 ring-[oklch(1_0_0_/14%)]",
] as const;

function GuestBubble({ name, index, compact }: { name: string; index: number; compact?: boolean }) {
  const ring = AVATAR_RINGS[index % AVATAR_RINGS.length];
  const size = compact ? "h-11 w-11 text-sm" : "h-[3.25rem] w-[3.25rem] text-base";
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={`flex shrink-0 items-center justify-center rounded-full font-bold uppercase tracking-wide text-[oklch(0.99_0.01_220)] ${size} ${ring}`}
      >
        {initials(name)}
      </div>
      <span
        className={`w-full font-medium leading-tight text-foreground ${compact ? "max-w-[4.25rem] truncate text-[11px]" : "text-sm"}`}
      >
        {name}
      </span>
    </div>
  );
}

function RoomStoryChip({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "cool";
}) {
  return (
    <span
      className={`room-meta-chip whitespace-normal text-pretty leading-snug ${variant === "cool" ? "room-meta-chip--cool" : ""}`}
    >
      {children}
    </span>
  );
}

const [roomMeta1, roomMeta2, roomMeta3] = TRIP_ROOMS;

export function Rooms() {
  const { highlightedRoomId } = useTripCrew();
  const [room1Drinks, setR1] = useState(false);
  const [room2Drinks, setR2] = useState(false);

  const drink = DRINK_PACKAGE_PER_PERSON;

  const r1Base = 1675;
  const r1People = roomMeta1.guestNames.length;
  const r1Total = r1Base + (room1Drinks ? drink * r1People : 0);
  const r1PerPerson = roundedShare(r1Total, r1People);

  const r2Original = 1998;
  const r2Discounted = 1598;
  const r2People = roomMeta2.guestNames.length;
  const r2PerPerson = r2Discounted / r2People;
  const r2Total = r2Discounted + (room2Drinks ? drink * r2People : 0);
  const r2PP = room2Drinks ? r2PerPerson + drink : r2PerPerson;

  const hl1 = highlightedRoomId === roomMeta1.id;
  const hl2 = highlightedRoomId === roomMeta2.id;
  const hl3 = highlightedRoomId === roomMeta3.id;

  const room1Guests = [...roomMeta1.guestNames];
  const room2Guests = [...roomMeta2.guestNames];

  return (
    <section id="rooms" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnView>
          <header className="mb-14 text-center">
            <p className="mb-4 font-[family-name:var(--font-section)] text-[11px] font-semibold uppercase tracking-[0.35em] text-aqua">
              Who's bunking together
            </p>
            <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] font-bold tracking-tighter text-foreground">
              Room rundown &{" "}
              <span className="bg-[linear-gradient(90deg,_oklch(0.9_0.12_200),_oklch(0.85_0.16_55))] bg-clip-text italic text-transparent">
                real numbers
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-foreground/70">
              Toggle drinks to sanity-check totals. Numbers below are tuned to pop — no squinting.
            </p>
          </header>
        </RevealOnView>

        <article
          id={roomMeta1.anchorId}
          className={`room-card glass-strong mb-8 overflow-hidden ${hl1 ? "room-highlight" : ""}`}
        >
          <div className="relative">
            <img
              src={balconyImg}
              alt="Ocean view balcony stateroom"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover sm:aspect-[21/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.06_255)] via-[oklch(0.12_0.05_250/0.2)] to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="room-photo-label">Ocean view balcony</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{roomMeta1.label}</h3>
                <p className="mt-1.5 text-sm text-foreground/65">
                  {roomMeta1.guestNames.join(" · ")}
                </p>
              </div>
              <RoomStoryChip variant="cool">
                <Banknote className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
                <span>Rigo covering both fares</span>
              </RoomStoryChip>
            </div>

            <div
              className={`mt-6 grid gap-4 ${room1Guests.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}
            >
              {room1Guests.map((n, i) => (
                <div
                  key={n}
                  className="flex flex-col items-center rounded-2xl border border-[oklch(1_0_0_/12%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/6%)_0%,_oklch(0.12_0.05_255_/0.4)_100%)] px-3 py-4"
                >
                  <GuestBubble name={n} index={i} />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/8%)_0%,_oklch(0.05_0.04_255_/0.35)_100%)] px-5 py-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="font-[family-name:var(--font-section)] text-sm font-medium text-foreground/85">
                  Add drink package (${drink}/person)
                </span>
                <button
                  type="button"
                  onClick={() => setR1((v) => !v)}
                  className={`relative h-8 w-[3.25rem] shrink-0 rounded-full transition-colors ${room1Drinks ? "bg-aqua" : "bg-white/12"}`}
                  aria-label="Toggle drinks package for room one"
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all ${room1Drinks ? "left-[1.375rem]" : "left-1"}`}
                  />
                </button>
              </div>
              <BalconyPricePair
                perPerson={r1PerPerson}
                total={r1Total}
                finePrintPerPerson="Approx. split if everyone chipped in evenly (Rigo is covering both fares on this booking)."
                footnoteSlot={
                  <p className="mt-4 text-pretty text-xs leading-relaxed text-foreground/55">
                    {room1Drinks
                      ? `Drinks bundled: +$${(drink * r1People).toLocaleString()} for the cabin · $${drink}/person in the bundle.`
                      : `Everyone could add drinks at $${drink}/person · whole cabin pays together.`}
                  </p>
                }
              />
            </div>
          </div>
        </article>

        <article
          id={roomMeta2.anchorId}
          className={`room-card glass-strong mb-8 overflow-hidden ${hl2 ? "room-highlight" : ""}`}
        >
          <div className="relative">
            <img
              src={balconyImg}
              alt="Ocean view balcony stateroom"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover sm:aspect-[21/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.06_255)] via-[oklch(0.12_0.05_250/0.2)] to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="room-photo-label">Ocean view balcony</span>
            </div>
            <div className="absolute right-0 top-0">
              <span className="room-discount-corner">
                <Percent className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
                20% saved
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{roomMeta2.label}</h3>
                <p className="mt-1.5 text-sm text-foreground/65">
                  {roomMeta2.guestNames.join(" · ")}
                </p>
              </div>
              <RoomStoryChip variant="cool">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-aqua" aria-hidden />
                <span>Nana pulled the group rate</span>
              </RoomStoryChip>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {room2Guests.map((n, i) => (
                <div
                  key={n}
                  className="flex flex-col items-center rounded-2xl border border-[oklch(1_0_0_/12%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/5%)_0%,_oklch(0.1_0.05_255_/0.45)_100%)] px-2 py-3"
                >
                  <GuestBubble name={n} index={i} compact />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/8%)_0%,_oklch(0.05_0.04_255_/0.35)_100%)] px-5 py-4">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="font-[family-name:var(--font-section)] text-sm font-medium text-foreground/85">
                  Add drink package (${drink}/person)
                </span>
                <button
                  type="button"
                  onClick={() => setR2((v) => !v)}
                  className={`relative h-8 w-[3.25rem] shrink-0 rounded-full transition-colors ${room2Drinks ? "bg-aqua" : "bg-white/12"}`}
                  aria-label="Toggle drinks package for room two"
                >
                  <span
                    className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all ${room2Drinks ? "left-[1.375rem]" : "left-1"}`}
                  />
                </button>
              </div>
              <BalconyPricePair
                perPerson={Math.round(r2PP)}
                total={r2Total}
                finePrintPerPerson={`Rounded • ${r2People} travelers · reflects group rate divided evenly (with drinks ${room2Drinks ? "on" : "off"}).`}
                discountSlot={
                  <div className="mb-3 flex flex-wrap items-baseline gap-2 border-b border-white/10 pb-3">
                    <span className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                      vs list price
                    </span>
                    <span className="text-sm text-foreground/40 line-through">
                      <Money value={r2Original} />
                    </span>
                    <span className="rounded-md border border-sunset/35 bg-sunset/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sunset">
                      −$400
                    </span>
                  </div>
                }
                footnoteSlot={
                  <p className="mt-4 text-pretty text-xs leading-relaxed text-foreground/55">
                    {room2Drinks ? (
                      <>
                        Per-person figures include drink packages locked in for all {r2People}{" "}
                        guests (${drink} each). The cabin total includes that full bundle.
                      </>
                    ) : (
                      <>
                        Without drinks, divide the discounted cabin evenly — add ~${drink}/person only
                        if{" "}
                        <strong className="text-foreground/70">everyone</strong> in this room opts
                        into the package.
                      </>
                    )}
                  </p>
                }
              />
            </div>
          </div>
        </article>

        <article
          id={roomMeta3.anchorId}
          className={`room-card relative overflow-hidden rounded-[1.35rem] border border-gold/35 shadow-[var(--shadow-glow-gold)] ${hl3 ? "room-highlight" : ""}`}
          style={{ background: "var(--gradient-luxury)" }}
        >
          <div className="relative">
            <img
              src={suiteImg}
              alt="Owner's Suite"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover animate-slow-zoom sm:aspect-[21/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.05_270)] via-[oklch(0.12_0.05_265/0.45)] to-transparent" />
            <div className="absolute right-0 top-0">
              <span className="inline-flex items-center gap-1.5 rounded-bl-lg border-b border-l border-gold/45 bg-[oklch(0.1_0.04_270/0.75)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
                Owner's suite
              </span>
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <p className="font-display text-xl italic leading-snug text-gold/95 sm:text-2xl">
                Not a cabin — a flex.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="font-display text-2xl font-bold tracking-tight text-gold sm:text-[1.75rem]">
                  {roomMeta3.label}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/70">
                  {roomMeta3.guestNames.join(" · ")}
                </p>
              </div>
              <RoomStoryChip>
                <Percent className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
                <span className="text-gold/95">20% off rack — suite perks included</span>
              </RoomStoryChip>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-gold/30 bg-[linear-gradient(148deg,_oklch(0.78_0.12_88/0.12)_0%,_oklch(0.14_0.05_275/0.52)_100%)] p-px shadow-[0_0_36px_-14px_oklch(0.78_0.12_88/0.75)]">
                <div className="h-full rounded-[calc(1rem-1px)] bg-[linear-gradient(160deg,_oklch(1_0_0_/8%)_0%,_oklch(0.12_0.04_275/0.55)_100%)] px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-gold/12 text-gold">
                      <Users className="h-5 w-5" strokeWidth={2.25} aria-hidden />
                    </span>
                    <div>
                      <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.26em] text-gold/90">
                        Per person · weighted
                      </p>
                      <p className="mt-1 text-pretty text-[11px] leading-relaxed text-foreground/58">
                        Shares are custom per guest — your number is the one in your tile below, not
                        a straight split of the suite total.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center rounded-2xl border border-gold/22 bg-[linear-gradient(160deg,_oklch(1_0_0_/7%)_0%,_oklch(0.14_0.05_270_/0.5)_100%)] px-5 py-4">
                <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.26em] text-foreground/42">
                  Full cabin · suite total
                </p>
                <div className="text-xs text-foreground/45 line-through">$4,823.96</div>
                <div className="price-pop-gold mt-0.5">$3,859.17</div>
                <p className="mt-2 text-[11px] font-medium leading-relaxed text-gold/82">
                  Save $964.79 vs brochure list · perks baked in above.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { name: "Gu", v: 1300 },
                { name: "Alex", v: 1300 },
                { name: "Jon", v: 629 },
                { name: "Tyler", v: 629 },
              ].map((p) => (
                <div
                  key={p.name}
                  className="relative overflow-hidden rounded-xl border border-gold/28 border-l-[3px] border-l-gold bg-[linear-gradient(105deg,_oklch(0.82_0.12_88/0.06)_0%,_oklch(0.12_0.04_270/0.5)_45%)] px-4 py-3 shadow-[inset_0_1px_0_oklch(1_0_0_/8%)]"
                >
                  <div className="pointer-events-none absolute -bottom-8 -right-4 h-20 w-20 rounded-full bg-gold/10 blur-[32px]" />
                  <div className="relative flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/14 text-gold">
                      <UserRound className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                    </span>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/55">
                      {p.name}
                    </div>
                  </div>
                  <div className="price-pop-share mt-2">
                    <Money value={p.v} />
                  </div>
                  <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-gold/70">
                    Your share
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex gap-3 rounded-xl border border-gold/20 bg-[oklch(0.1_0.04_275/0.4)] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Wine className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-section)] text-sm font-semibold">
                    Private bar access
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-foreground/58">
                    Pour-your-own vibes — unlimited.
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-gold/20 bg-[oklch(0.1_0.04_275/0.4)] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Wifi className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-section)] text-sm font-semibold">
                    Wi-Fi ×4
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-foreground/58">
                    Everyone stays connected.
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-gold/20 bg-[oklch(0.1_0.04_275/0.4)] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <UtensilsCrossed className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-section)] text-sm font-semibold">
                    24/7 room service
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-foreground/58">
                    Complimentary menu anytime — <span className="text-foreground/75">$7 delivery fee</span> per
                    order.
                  </div>
                </div>
              </div>
              <div className="flex gap-3 rounded-xl border border-gold/20 bg-[oklch(0.1_0.04_275/0.4)] p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Bolt className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <div className="font-[family-name:var(--font-section)] text-sm font-semibold">
                    Priority boarding
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-foreground/58">
                    Skip the slow roll — get on, get settled, start the trip.
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 rounded-xl border border-gold/25 bg-[oklch(0.82_0.12_88/0.08)] px-4 py-3 text-[13px] leading-relaxed text-gold">
              Drink package usually <strong className="text-gold">not worth it here</strong> — the
              suite bars have you covered.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
