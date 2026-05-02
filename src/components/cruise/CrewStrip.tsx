import { useMemo } from "react";

import { ALL_GUEST_NAMES } from "@/data/trip";
import { useTripCrew } from "@/contexts/TripCrewContext";
import { cn } from "@/lib/utils";

export function CrewStrip() {
  const { selectedName, setSelectedName } = useTripCrew();

  const namesSorted = useMemo(
    () =>
      [...ALL_GUEST_NAMES].sort((a, b) =>
        a.localeCompare(b, undefined, { sensitivity: "base" }),
      ),
    [],
  );

  return (
    <div className="w-full max-w-xl">
      <p className="mb-2 text-center font-[family-name:var(--font-section)] text-[11px] uppercase tracking-[0.22em] text-foreground/70 sm:text-left">
        Tap your name to see your room and payment info
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
        {namesSorted.map((name) => {
          const active = selectedName === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedName(active ? null : name)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide transition-all active:scale-95 font-[family-name:var(--font-section)]",
                active
                  ? "border-aqua bg-aqua text-background shadow-[var(--shadow-glow-aqua)] ring-2 ring-aqua/50 ring-offset-2 ring-offset-[oklch(0.14_0.06_250)]"
                  : "glass border-white/12 text-foreground/90 hover:bg-white/10 hover:border-white/20",
              )}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
