import { Banknote, ShieldCheck, Wallet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { RevealOnView } from "@/components/RevealOnView";
import { SectionHeader } from "@/components/cruise/ui/SectionHeader";
import { Stat } from "@/components/cruise/ui/Stat";
import { Surface } from "@/components/cruise/ui/Surface";
import { TonePill } from "@/components/cruise/ui/TonePill";
import {
  DRINK_PACKAGE_PER_PERSON,
  ROOM_CABIN_TOTAL_USD,
  TRIP_PAYMENT_FRONT_PERSON,
  TRIP_ROOMS,
  type TripRoomId,
} from "@/data/trip";
import { useTripCrew } from "@/contexts/TripCrewContext";
import { cn } from "@/lib/utils";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function CountUpMoney({ value, durationMs = 700 }: { value: number; durationMs?: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const endValue = value;
    if (Math.abs(endValue - startValue) < 0.005) {
      setDisplayValue(endValue);
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setDisplayValue(endValue);
      prevValueRef.current = endValue;
      return;
    }

    let frame = 0;
    let startTs: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeOut(progress);
      setDisplayValue(startValue + (endValue - startValue) * eased);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    prevValueRef.current = endValue;
    return () => window.cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return <>{USD.format(displayValue)}</>;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().slice(0, Math.min(2, name.trim().length)).toUpperCase() || "?";
}

const AVATAR_GRADIENTS = [
  "bg-[linear-gradient(135deg,var(--aqua)_0%,var(--deep)_100%)]",
  "bg-[linear-gradient(135deg,var(--gold)_0%,var(--coral)_100%)]",
  "bg-[linear-gradient(135deg,var(--sunset)_0%,var(--coral)_100%)]",
  "bg-[linear-gradient(135deg,var(--aqua)_0%,var(--gold)_100%)]",
] as const;

function OweChip({
  name,
  idx,
  amountUsd,
  isSelected,
}: {
  name: string;
  idx: number;
  amountUsd: number;
  isSelected?: boolean;
}) {
  const avatar = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  const withDrinks = amountUsd + DRINK_PACKAGE_PER_PERSON;

  return (
    <Surface
      variant="inner"
      className={cn(
        "group flex flex-col items-center gap-2 px-4 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-edge",
        isSelected && "payment-chip-active",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full text-xs font-bold uppercase tracking-wide text-fg ring-1 ring-edge shadow-[0_0_22px_-6px_oklch(0_0_0/0.55)]",
          avatar,
        )}
      >
        {initials(name)}
      </div>
      <div className="text-sm font-semibold text-fg">{name}</div>
      <div className="font-[family-name:var(--font-section)] text-lg font-bold tabular-nums tracking-tight text-aqua transition-transform duration-300 group-hover:scale-[1.03]">
        <CountUpMoney value={amountUsd} />
      </div>
      <TonePill tone="sunset" size="sm" className="tabular-nums normal-case tracking-normal">
        + {USD.format(DRINK_PACKAGE_PER_PERSON)} drink package
      </TonePill>
      <div className="text-xs font-medium tabular-nums text-fg-subtle">
        With drinks: <span className="text-fg-muted"><CountUpMoney value={withDrinks} /></span>
      </div>
    </Surface>
  );
}

function metaById(id: TripRoomId) {
  return TRIP_ROOMS.find((r) => r.id === id)!;
}

type RoomSplitProps = {
  meta: ReturnType<typeof metaById>;
  cabinTotal: number;
  perPersonShare: number;
  excludeFront?: boolean;
  selectedName: string | null;
  startIdx?: number;
  splitColumns: string;
  noteSuffix?: string;
};

function RoomSplitCard({
  meta,
  cabinTotal,
  perPersonShare,
  excludeFront = false,
  selectedName,
  startIdx = 0,
  splitColumns,
  noteSuffix,
}: RoomSplitProps) {
  const guests = excludeFront
    ? meta.guestNames.filter((n) => n !== TRIP_PAYMENT_FRONT_PERSON)
    : [...meta.guestNames];

  return (
    <Surface variant="inner" className="p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 surface-divider pb-4">
        <div>
          <p className="eyebrow eyebrow-faint">
            {meta.label} · {meta.cabinPhotoLabel}
          </p>
          <p className="mt-1 text-sm text-fg-muted">{meta.guestNames.join(" · ")}</p>
        </div>
        <TonePill tone="neutral" size="md" className="tabular-nums">
          Cabin {USD.format(cabinTotal)}
        </TonePill>
      </div>
      <p className="mb-4 text-[12px] leading-relaxed text-fg-subtle">
        ¼ each ={" "}
        <span className="font-semibold text-fg-muted">{USD.format(perPersonShare)}</span>
        {noteSuffix ? <> {noteSuffix}</> : null}
      </p>
      <div className={cn("grid gap-3 sm:gap-4", splitColumns)}>
        {guests.map((name, idx) => (
          <OweChip
            key={name}
            name={name}
            idx={startIdx + idx}
            amountUsd={perPersonShare}
            isSelected={selectedName === name}
          />
        ))}
      </div>
    </Surface>
  );
}

export function Payment() {
  const { selectedName } = useTripCrew();
  const r2Meta = metaById("room-2");
  const r3Meta = metaById("room-3");
  const r2Total = ROOM_CABIN_TOTAL_USD["room-2"];
  const r3Total = ROOM_CABIN_TOTAL_USD["room-3"];
  const r2Heads = r2Meta.guestNames.length;
  const r3Heads = r3Meta.guestNames.length;

  const quarter2 = r2Total / r2Heads;
  const quarter3 = r3Total / r3Heads;

  const oweRoom2 = r2Meta.guestNames.filter((n) => n !== TRIP_PAYMENT_FRONT_PERSON);
  const oweRoom3 = r3Meta.guestNames;

  const totalIncoming =
    oweRoom2.reduce((s) => s + quarter2, 0) + oweRoom3.reduce((s) => s + quarter3, 0);

  const selectedRoomId = useMemo(
    () =>
      TRIP_ROOMS.find((room) => !!selectedName && room.guestNames.includes(selectedName))?.id ?? null,
    [selectedName],
  );

  return (
    <section id="payment" className="theme-zone theme-zone-plan relative px-6 pb-28 pt-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 bottom-40 h-72 w-72 rounded-full bg-aqua/12 blur-[100px]" />
        <div className="absolute -right-20 top-1/4 h-56 w-56 rounded-full bg-sunset/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <RevealOnView>
          <SectionHeader
            className="mb-10"
            eyebrow="Quick reference"
            title={
              <>
                What to send{" "}
                <span className="bg-[var(--gradient-aqua)] bg-clip-text text-transparent">Alex</span>
              </>
            }
            description={
              <>
                Alex is charging <strong className="text-fg">Rooms 2 &amp; 3</strong> to his card.
                Gu&apos;s solo cabin stays on <strong className="text-fg">Gu&apos;s card</strong> — no
                Venmo derby there. Below: fair splits based on{" "}
                <strong className="text-fg">¼ of each booked cabin.</strong>
              </>
            }
          />

          <Surface variant="card-elevated" className="relative overflow-hidden p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 top-0 h-48 w-48 rounded-full bg-aqua/10 blur-[80px]" />

            <div className="relative mb-10 flex items-start gap-3">
              <span className="tone-aqua flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <Wallet className="h-6 w-6" strokeWidth={2.1} aria-hidden />
              </span>
              <Stat
                label="Roommates owe Alex · combined"
                value={<CountUpMoney value={totalIncoming} />}
                description={
                  <>
                    Covers everyone reimbursing Alex for their ¼ of Rooms 2 &amp; 3 (Alex
                    doesn&apos;t pay himself for his spot).
                  </>
                }
              />
            </div>

            <div id="payment-room-splits" className="grid gap-6 lg:grid-cols-2">
              {!selectedName ? (
                <div className="tone-aqua rounded-2xl px-4 py-3 text-center text-sm font-medium lg:col-span-2">
                  Select your name to unlock your trip card 🌴
                </div>
              ) : null}

              <RoomSplitCard
                meta={r2Meta}
                cabinTotal={r2Total}
                perPersonShare={quarter2}
                excludeFront
                selectedName={selectedRoomId === "room-2" ? selectedName : null}
                splitColumns={oweRoom2.length === 3 ? "sm:grid-cols-3" : ""}
                noteSuffix="— we only list roommates sending Alex (Alex omitted)."
              />

              <RoomSplitCard
                meta={r3Meta}
                cabinTotal={r3Total}
                perPersonShare={quarter3}
                selectedName={selectedRoomId === "room-3" ? selectedName : null}
                startIdx={4}
                splitColumns="grid-cols-2 sm:grid-cols-4"
              />
            </div>

            <div className="tone-sunset mt-10 flex items-center justify-between gap-6 rounded-2xl px-4 py-4">
              <div className="flex items-start gap-3">
                <Banknote className="mt-0.5 h-5 w-5 shrink-0 text-sunset" aria-hidden />
                <div>
                  <p className="font-[family-name:var(--font-section)] text-sm font-semibold text-sunset">
                    Gu — own card
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    Gu&apos;s stateroom is <strong className="text-fg">not</strong> on Alex&apos;s
                    card. Anything between Gu and the bank stays with Gu — nothing to reimburse Alex
                    here.
                  </p>
                </div>
              </div>
              <ShieldCheck
                className="hidden h-8 w-8 shrink-0 text-sunset sm:block"
                aria-hidden
              />
            </div>
          </Surface>
        </RevealOnView>
      </div>
    </section>
  );
}
