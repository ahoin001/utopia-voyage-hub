import { Banknote, Percent, Ship, Sparkles, Users } from "lucide-react";
import { useState, type ReactNode } from "react";

import { RevealOnView } from "@/components/RevealOnView";
import balconyImg from "@/assets/balcony-room.jpg";

import { useTripCrew } from "@/contexts/TripCrewContext";
import {
  DRINK_PACKAGE_PER_PERSON,
  ROOM_CABIN_TOTAL_USD,
  TRIP_ROOMS,
  estimatedListFareUsd,
  type TripRoomId,
  type TripRoomInfo,
} from "@/data/trip";

function Money({ value, maxFrac = 0 }: { value: number; maxFrac?: number }) {
  const d = Math.abs(value % 1) < 1e-9 ? 0 : Math.min(maxFrac, 2);
  return <>${value.toLocaleString(undefined, { maximumFractionDigits: d, minimumFractionDigits: d })}</>;
}

/** Two-up layout for cabins with splits */
function CabinPriceSplit({
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
  const pp = Math.round(perPerson * 100) / 100;

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
                Approx. per person
              </p>
              <div className="price-pop-pp mt-1">
                <Money value={pp} maxFrac={2} />
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
          Cabin total (booked fare)
        </p>
        <div className="price-pop mt-1">
          <Money value={total} />
        </div>
        {footnoteSlot}
      </div>
    </div>
  );
}

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
  "bg-gradient-to-br from-[oklch(0.88_0.15_72)] via-[oklch(0.55_0.16_25)] to-[oklch(0.35_0.1_280)] shadow-[0_0_36px_-5px_oklch(0.78_0.18_55/0.5)] ring-2 ring-[oklch(1_0_0_/16%)]",
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

function DrinksToggleRow({
  checked,
  onToggle,
  roomLabel,
  drinkUsd,
}: {
  checked: boolean;
  onToggle: () => void;
  roomLabel: string;
  drinkUsd: number;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <span className="font-[family-name:var(--font-section)] text-sm font-medium text-foreground/85">
        Add drink package (${drinkUsd}/person — everyone in the cabin must match)
      </span>
      <button
        type="button"
        onClick={onToggle}
        className={`relative h-8 w-[3.25rem] shrink-0 rounded-full transition-colors ${checked ? "bg-aqua" : "bg-white/12"}`}
        aria-label={`Toggle drink package ${roomLabel}`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all ${checked ? "left-[1.375rem]" : "left-1"}`}
        />
      </button>
    </div>
  );
}

function discountBlock(list: number, savings: number) {
  return (
    <div className="mb-3 flex flex-wrap items-baseline gap-2 border-b border-white/10 pb-3">
      <span className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
        Est. list before promo
      </span>
      <span className="text-sm text-foreground/40 line-through">
        <Money value={list} />
      </span>
      <span className="rounded-md border border-sunset/35 bg-sunset/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sunset">
        Save <Money value={savings} />
      </span>
    </div>
  );
}

const roomMetaById = Object.fromEntries(TRIP_ROOMS.map((r) => [r.id, r])) as Record<
  TripRoomId,
  TripRoomInfo
>;

export function Rooms() {
  const { highlightedRoomId } = useTripCrew();
  const drink = DRINK_PACKAGE_PER_PERSON;

  const [room1Drinks, setRoom1Drinks] = useState(false);
  const [room2Drinks, setRoom2Drinks] = useState(false);
  const [room3Drinks, setRoom3Drinks] = useState(false);

  const r1Meta = roomMetaById["room-1"];
  const r2Meta = roomMetaById["room-2"];
  const r3Meta = roomMetaById["room-3"];

  const r1People = r1Meta.guestNames.length;
  const r1Base = ROOM_CABIN_TOTAL_USD["room-1"];
  const r1Total = r1Base + (room1Drinks ? drink * r1People : 0);

  const r2People = r2Meta.guestNames.length;
  const r2Base = ROOM_CABIN_TOTAL_USD["room-2"];
  const r2List = estimatedListFareUsd(r2Base, r2Meta.promoPercentOff ?? 0);
  const r2Savings = r2List - r2Base;
  const r2Total = r2Base + (room2Drinks ? drink * r2People : 0);
  const r2PP = room2Drinks ? r2Base / r2People + drink : r2Base / r2People;

  const r3People = r3Meta.guestNames.length;
  const r3Base = ROOM_CABIN_TOTAL_USD["room-3"];
  const r3List = estimatedListFareUsd(r3Base, r3Meta.promoPercentOff ?? 0);
  const r3Savings = r3List - r3Base;
  const r3Total = r3Base + (room3Drinks ? drink * r3People : 0);
  const r3PP = room3Drinks ? r3Base / r3People + drink : r3Base / r3People;

  const drinksFootnote = (people: number, on: boolean) =>
    on
      ? `Drinks bundled: +$${(drink * people).toLocaleString()} for everyone in this cabin.`
      : `If the whole cabin adds drinks, tack on ~$${drink}/person.`;

  return (
    <section id="rooms" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnView>
          <header className="mb-14 text-center">
            <p className="mb-4 font-[family-name:var(--font-section)] text-[11px] font-semibold uppercase tracking-[0.35em] text-aqua">
              Rooms & fares
            </p>
            <h2 className="text-[clamp(2.25rem,6vw,3.75rem)] font-bold tracking-tighter text-foreground">
              Who&apos;s where &{" "}
              <span className="bg-[linear-gradient(90deg,_oklch(0.9_0.12_200),_oklch(0.85_0.16_55))] bg-clip-text italic text-transparent">
                what it costs
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-foreground/70">
              Promo cabins show an estimated rack total for context. Toggle drinks only if{' '}
              <strong className="text-foreground/85">everyone</strong> in that room buys the package.
            </p>
          </header>
        </RevealOnView>

        {/* Room 1 · Gu solo */}
        <article
          id={r1Meta.anchorId}
          className={`room-card glass-strong mb-8 overflow-hidden ${highlightedRoomId === r1Meta.id ? "room-highlight" : ""}`}
        >
          <div className="relative">
            <img
              src={balconyImg}
              alt="Cruise stateroom"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover sm:aspect-[21/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.06_255)] via-[oklch(0.12_0.05_250/0.2)] to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="room-photo-label">{r1Meta.cabinPhotoLabel}</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{r1Meta.label}</h3>
                <p className="mt-1.5 text-sm text-foreground/65">{r1Meta.guestNames.join(" · ")}</p>
              </div>
              <RoomStoryChip variant="cool">
                <Banknote className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
                <span>Rack fare — no promo on this reservation</span>
              </RoomStoryChip>
            </div>

            <div className="mx-auto mt-6 max-w-xs">
              <div className="flex flex-col items-center rounded-2xl border border-[oklch(1_0_0_/12%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/6%)_0%,_oklch(0.12_0.05_255_/0.4)_100%)] px-3 py-4">
                <GuestBubble name={r1Meta.guestNames[0]!} index={0} />
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-md rounded-2xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/8%)_0%,_oklch(0.05_0.04_255_/0.35)_100%)] px-5 py-4">
              <DrinksToggleRow
                checked={room1Drinks}
                onToggle={() => setRoom1Drinks((v) => !v)}
                roomLabel="for room one"
                drinkUsd={drink}
              />
              <p className="font-[family-name:var(--font-section)] text-[10px] font-bold uppercase tracking-[0.26em] text-foreground/40">
                Your booking total
              </p>
              <div className="price-pop mt-1">
                <Money value={r1Total} />
              </div>
              <p className="mt-3 text-pretty text-xs leading-relaxed text-foreground/55">
                Gu covers the cabin solo at <Money value={r1Base} />{' '}
                {room1Drinks ? `+ drink package (${drink} × ${r1People}).` : 'before drinks.'}{" "}
                {drinksFootnote(r1People, room1Drinks)}
              </p>
            </div>
          </div>
        </article>

        {/* Room 2 · Ocean balcony · promo */}
        <article
          id={r2Meta.anchorId}
          className={`room-card glass-strong mb-8 overflow-hidden ${highlightedRoomId === r2Meta.id ? "room-highlight" : ""}`}
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
              <span className="room-photo-label">{r2Meta.cabinPhotoLabel}</span>
            </div>
            <div className="absolute right-0 top-0">
              <span className="room-discount-corner">
                <Percent className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
                20% off est. rack
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{r2Meta.label}</h3>
                <p className="mt-1.5 text-sm text-foreground/65">{r2Meta.guestNames.join(" · ")}</p>
              </div>
              <RoomStoryChip variant="cool">
                <Ship className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
                <span>Four-person split · discounted ocean balcony</span>
              </RoomStoryChip>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[...r2Meta.guestNames].map((n, i) => (
                <div
                  key={n}
                  className="flex flex-col items-center rounded-2xl border border-[oklch(1_0_0_/12%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/5%)_0%,_oklch(0.1_0.05_255_/0.45)_100%)] px-2 py-3"
                >
                  <GuestBubble name={n} index={i} compact />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/8%)_0%,_oklch(0.05_0.04_255_/0.35)_100%)] px-5 py-4">
              <DrinksToggleRow
                checked={room2Drinks}
                onToggle={() => setRoom2Drinks((v) => !v)}
                roomLabel="for room two"
                drinkUsd={drink}
              />
              <CabinPriceSplit
                perPerson={r2PP}
                total={r2Total}
                finePrintPerPerson={`Even split snapshot · ${r2People} travelers (with drinks ${room2Drinks ? "on" : "off"}).`}
                discountSlot={discountBlock(r2List, r2Savings)}
                footnoteSlot={
                  <p className="mt-4 text-pretty text-xs leading-relaxed text-foreground/55">
                    Cabin booked at <Money value={r2Base} /> after promotion.{' '}
                    {room2Drinks ? (
                      <>
                        Per-person share includes beverage package at ${drink} each ({r2People}{" "}
                        guests).
                      </>
                    ) : (
                      <>
                        Roughly <Money value={r2PP} /> each if split evenly — add{' '}
                        <Money value={drink} />/person drinks only if the whole cabin opts in together.
                      </>
                    )}{" "}
                    {drinksFootnote(r2People, room2Drinks)}
                  </p>
                }
              />
            </div>
          </div>
        </article>

        {/* Room 3 · Neighborhood balcony · promo */}
        <article
          id={r3Meta.anchorId}
          className={`room-card glass-strong mb-8 overflow-hidden ${highlightedRoomId === r3Meta.id ? "room-highlight" : ""}`}
        >
          <div className="relative">
            <img
              src={balconyImg}
              alt="Neighborhood view balcony"
              loading="lazy"
              className="aspect-[16/10] w-full object-cover sm:aspect-[21/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.06_255)] via-[oklch(0.12_0.05_250/0.2)] to-transparent" />
            <div className="absolute bottom-3 left-4">
              <span className="room-photo-label">{r3Meta.cabinPhotoLabel}</span>
            </div>
            <div className="absolute right-0 top-0">
              <span className="room-discount-corner">
                <Percent className="h-3.5 w-3.5" strokeWidth={2.75} aria-hidden />
                20% off est. rack
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{r3Meta.label}</h3>
                <p className="mt-1.5 text-sm text-foreground/65">{r3Meta.guestNames.join(" · ")}</p>
              </div>
              <RoomStoryChip variant="cool">
                <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
                <span>Neighborhood balcony · promo rate locked</span>
              </RoomStoryChip>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[...r3Meta.guestNames].map((n, i) => (
                <div
                  key={n}
                  className="flex flex-col items-center rounded-2xl border border-[oklch(1_0_0_/12%)] bg-[linear-gradient(180deg,_oklch(1_0_0_/5%)_0%,_oklch(0.1_0.05_255_/0.45)_100%)] px-2 py-3"
                >
                  <GuestBubble name={n} index={i} compact />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[oklch(1_0_0_/14%)] bg-[linear-gradient(165deg,_oklch(1_0_0_/8%)_0%,_oklch(0.05_0.04_255_/0.35)_100%)] px-5 py-4">
              <DrinksToggleRow
                checked={room3Drinks}
                onToggle={() => setRoom3Drinks((v) => !v)}
                roomLabel="for room three"
                drinkUsd={drink}
              />
              <CabinPriceSplit
                perPerson={r3PP}
                total={r3Total}
                finePrintPerPerson={`Even split snapshot · ${r3People} travelers (with drinks ${room3Drinks ? "on" : "off"}).`}
                discountSlot={discountBlock(r3List, r3Savings)}
                footnoteSlot={
                  <p className="mt-4 text-pretty text-xs leading-relaxed text-foreground/55">
                    Cabin booked at <Money value={r3Base} /> after promotion.{" "}
                    {room3Drinks ? (
                      <>
                        Includes drink package for all {r3People} at ${drink} each.
                      </>
                    ) : (
                      <>
                        About <Money value={r3PP} /> each if everyone splits evenly before drinks — add beverage
                        bundle only room-wide if you all agree.
                      </>
                    )}{" "}
                    {drinksFootnote(r3People, room3Drinks)}
                  </p>
                }
              />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
