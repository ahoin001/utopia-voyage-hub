import { Banknote, Percent, Ship, Sparkles, Users, Wallet } from "lucide-react";
import { useState, type ReactNode } from "react";

import { RevealOnView } from "@/components/RevealOnView";
import { ReservationNumberField } from "@/components/cruise/ReservationNumberField";
import { SectionHeader } from "@/components/cruise/ui/SectionHeader";
import { Surface } from "@/components/cruise/ui/Surface";
import { TonePill } from "@/components/cruise/ui/TonePill";
import balconyImg from "@/assets/balcony-room.jpg";

import { useTripCrew } from "@/contexts/TripCrewContext";
import { cn } from "@/lib/utils";
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
      <Surface
        variant="inner"
        className="relative overflow-hidden border-aqua/45 px-4 py-4 shadow-[0_0_38px_-14px_oklch(0.72_0.2_195/0.5)] sm:px-5 sm:py-5"
      >
        <div className="pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-aqua/20 blur-[50px]" />
        <div className="relative flex items-start gap-3">
          <span className="tone-aqua flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
            <Users className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="eyebrow">Approx. per person</p>
            <div className="price-pop-pp mt-1">
              <Money value={pp} maxFrac={2} />
            </div>
            {finePrintPerPerson && (
              <p className="mt-2 text-pretty text-[11px] leading-relaxed text-fg-subtle">
                {finePrintPerPerson}
              </p>
            )}
          </div>
        </div>
      </Surface>

      <Surface variant="inner" className="flex flex-col justify-center px-4 py-4 sm:px-5 sm:py-5">
        {discountSlot}
        <p className="eyebrow eyebrow-faint">Cabin total (booked fare)</p>
        <div className="price-pop mt-1">
          <Money value={total} />
        </div>
        {footnoteSlot}
      </Surface>
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

const AVATAR_GRADIENTS = [
  "bg-[linear-gradient(135deg,var(--aqua)_0%,var(--deep)_100%)] shadow-[0_0_30px_-8px_oklch(0.78_0.14_200/0.6)]",
  "bg-[linear-gradient(135deg,var(--gold)_0%,var(--coral)_100%)] shadow-[0_0_30px_-8px_oklch(0.85_0.13_88/0.55)]",
  "bg-[linear-gradient(135deg,var(--sunset)_0%,var(--coral)_100%)] shadow-[0_0_30px_-8px_oklch(0.78_0.18_55/0.55)]",
  "bg-[linear-gradient(135deg,var(--aqua)_0%,var(--gold)_100%)] shadow-[0_0_30px_-8px_oklch(0.78_0.14_200/0.5)]",
] as const;

function GuestBubble({ name, index, compact }: { name: string; index: number; compact?: boolean }) {
  const avatar = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];
  const size = compact ? "h-11 w-11 text-sm" : "h-[3.25rem] w-[3.25rem] text-base";
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full font-bold uppercase tracking-wide text-fg ring-2 ring-edge",
          size,
          avatar,
        )}
      >
        {initials(name)}
      </div>
      <span
        className={cn(
          "w-full font-medium leading-tight text-fg",
          compact ? "max-w-[4.25rem] truncate text-[11px]" : "text-sm",
        )}
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
      <span className="font-[family-name:var(--font-section)] text-sm font-medium text-fg-muted">
        Add drink package (${drinkUsd}/person — everyone in the cabin must match)
      </span>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "relative h-8 w-[3.25rem] shrink-0 rounded-full transition-colors",
          checked ? "bg-aqua" : "bg-white/12",
        )}
        aria-label={`Toggle drink package ${roomLabel}`}
      >
        <span
          className={cn(
            "absolute top-1 h-6 w-6 rounded-full bg-white shadow-md transition-all",
            checked ? "left-[1.375rem]" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

function discountBlock(list: number, savings: number) {
  return (
    <div className="surface-divider mb-3 flex flex-wrap items-baseline gap-2 pb-3">
      <span className="eyebrow eyebrow-faint">Est. list before promo</span>
      <span className="text-sm text-fg-faint line-through">
        <Money value={list} />
      </span>
      <TonePill tone="sunset" size="sm">
        Save <Money value={savings} />
      </TonePill>
    </div>
  );
}

const roomMetaById = Object.fromEntries(TRIP_ROOMS.map((r) => [r.id, r])) as Record<
  TripRoomId,
  TripRoomInfo
>;

function SendAlexShareCta({ className }: { className?: string }) {
  return (
    <a
      href="#payment-room-splits"
      className={cn(
        "tone-aqua motion-press inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] shadow-[0_0_28px_-14px_oklch(0.72_0.2_195/0.7)] transition hover:bg-aqua/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua/50",
        className,
      )}
    >
      <Wallet className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
      What to send Alex
    </a>
  );
}

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
    <section id="rooms" className="theme-zone theme-zone-plan relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealOnView>
          <SectionHeader
            className="mb-14"
            size="lg"
            eyebrow="Rooms & fares"
            title={
              <>
                Who&apos;s where &{" "}
                <span className="bg-[var(--gradient-aqua)] bg-clip-text italic text-transparent">
                  what it costs
                </span>
              </>
            }
            description={
              <>
                Promo cabins show an estimated rack total for context. Toggle drinks only if{" "}
                <strong className="text-fg">everyone</strong> in that room buys the package.
              </>
            }
          />
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
            <div className="room-photo-overlay" />
            <div className="absolute bottom-3 left-4">
              <span className="room-photo-label">{r1Meta.cabinPhotoLabel}</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{r1Meta.label}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{r1Meta.guestNames.join(" · ")}</p>
              </div>
              <RoomStoryChip variant="cool">
                <Banknote className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
                <span>Rack fare — no promo on this reservation</span>
              </RoomStoryChip>
            </div>

            <div className="mx-auto mt-6 max-w-xs">
              <div className="guest-tile px-3 py-4">
                <GuestBubble name={r1Meta.guestNames[0]!} index={0} />
              </div>
            </div>

            <Surface variant="inner" className="mx-auto mt-6 max-w-md px-5 py-4">
              <DrinksToggleRow
                checked={room1Drinks}
                onToggle={() => setRoom1Drinks((v) => !v)}
                roomLabel="for room one"
                drinkUsd={drink}
              />
              <p className="eyebrow eyebrow-faint">Your booking total</p>
              <div className="price-pop mt-1">
                <Money value={r1Total} />
              </div>
              <p className="mt-3 text-pretty text-xs leading-relaxed text-fg-subtle">
                Gu covers the cabin solo at <Money value={r1Base} />{" "}
                {room1Drinks ? `+ drink package (${drink} × ${r1People}).` : "before drinks."}{" "}
                {drinksFootnote(r1People, room1Drinks)}
              </p>
            </Surface>
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
            <div className="room-photo-overlay" />
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
                <p className="mt-1.5 text-sm text-fg-muted">{r2Meta.guestNames.join(" · ")}</p>
                {r2Meta.reservationNumber ? (
                  <ReservationNumberField value={r2Meta.reservationNumber} className="mt-4" />
                ) : null}
                <SendAlexShareCta className="mt-3" />
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
                  className="guest-tile px-2 py-3"
                >
                  <GuestBubble name={n} index={i} compact />
                </div>
              ))}
            </div>

            <Surface variant="inner" className="mt-6 px-5 py-4">
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
                  <p className="mt-4 text-pretty text-xs leading-relaxed text-fg-subtle">
                    Cabin booked at <Money value={r2Base} /> after promotion.{" "}
                    {room2Drinks ? (
                      <>
                        Per-person share includes beverage package at ${drink} each ({r2People}{" "}
                        guests).
                      </>
                    ) : (
                      <>
                        Roughly <Money value={r2PP} /> each if split evenly — add{" "}
                        <Money value={drink} />/person drinks only if the whole cabin opts in together.
                      </>
                    )}{" "}
                    {drinksFootnote(r2People, room2Drinks)}
                  </p>
                }
              />
            </Surface>
          </div>
        </article>

        {/* Room 3 · Ocean balcony · promo */}
        <article
          id={r3Meta.anchorId}
          className={`room-card glass-strong mb-8 overflow-hidden ${highlightedRoomId === r3Meta.id ? "room-highlight" : ""}`}
        >
          <div className="relative">
            <img
              src={balconyImg}
              alt={`${r3Meta.cabinPhotoLabel} stateroom`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover sm:aspect-[21/10]"
            />
            <div className="room-photo-overlay" />
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
                <p className="mt-1.5 text-sm text-fg-muted">{r3Meta.guestNames.join(" · ")}</p>
                {r3Meta.reservationNumber ? (
                  <ReservationNumberField value={r3Meta.reservationNumber} className="mt-4" />
                ) : null}
                <SendAlexShareCta className="mt-3" />
              </div>
              <RoomStoryChip variant="cool">
                <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-95" aria-hidden />
                <span>Ocean view balcony · promo rate locked</span>
              </RoomStoryChip>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[...r3Meta.guestNames].map((n, i) => (
                <div
                  key={n}
                  className="guest-tile px-2 py-3"
                >
                  <GuestBubble name={n} index={i} compact />
                </div>
              ))}
            </div>

            <Surface variant="inner" className="mt-6 px-5 py-4">
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
                  <p className="mt-4 text-pretty text-xs leading-relaxed text-fg-subtle">
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
            </Surface>
          </div>
        </article>
      </div>
    </section>
  );
}
