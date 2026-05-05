import { useMemo } from "react";

import { ALL_GUEST_NAMES } from "@/data/trip";
import { useTripCrew } from "@/contexts/TripCrewContext";
import { cn } from "@/lib/utils";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.slice(0, Math.min(2, name.length)).toUpperCase();
}

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
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="eyebrow text-fg-muted">
          Tap your name to personalize trip details
        </p>
        <span className="rounded-full border border-edge bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
          {namesSorted.length} crew
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {namesSorted.map((name, idx) => {
          const active = selectedName === name;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedName(active ? null : name)}
              style={{ animationDelay: `${(idx % 6) * 0.14}s` }}
              className={cn(
                "friend-chip-card motion-press rounded-2xl border p-2.5 text-left font-[family-name:var(--font-section)]",
                active
                  ? "friend-chip-card-active border-aqua/65 ring-2 ring-aqua/45 ring-offset-2 ring-offset-background"
                  : "glass border-edge text-fg-muted hover:border-edge-strong",
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="friend-chip-avatar">{initials(name)}</span>
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-semibold tracking-[0.01em] text-fg">
                    {name}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                    Crew mate
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
