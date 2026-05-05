import { useEffect, useState } from "react";

import { RevealOnView } from "@/components/RevealOnView";

const TARGET = new Date("2026-08-28T16:00:00-04:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

type UnitKey = "d" | "h" | "m" | "s";

export function Countdown() {
  const [t, setT] = useState(diff);
  const [tickKeys, setTickKeys] = useState<ReadonlySet<UnitKey>>(new Set());

  useEffect(() => {
    const id = setInterval(() => {
      const next = diff();
      setT((prev) => {
        const changed: UnitKey[] = [];
        if (prev.d !== next.d) changed.push("d");
        if (prev.h !== next.h) changed.push("h");
        if (prev.m !== next.m) changed.push("m");
        if (prev.s !== next.s) changed.push("s");
        if (changed.length) {
          setTickKeys(new Set(changed));
          window.setTimeout(() => setTickKeys(new Set()), 480);
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const items: { l: string; v: number; k: UnitKey }[] = [
    { l: "Days", v: t.d, k: "d" },
    { l: "Hours", v: t.h, k: "h" },
    { l: "Min", v: t.m, k: "m" },
    { l: "Sec", v: t.s, k: "s" },
  ];

  return (
    <section id="countdown" className="theme-zone theme-zone-plan relative px-6 py-16">
      <RevealOnView className="mx-auto max-w-2xl">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-aqua">
          The Voyage Begins
        </p>
        <div className="glass-strong grid grid-cols-4 gap-2 p-5 sm:gap-4 sm:p-6">
          {items.map((it) => (
            <div key={it.l} className="text-center">
              <div
                className={`font-display text-3xl font-bold tabular-nums sm:text-5xl gradient-text-aqua ${tickKeys.has(it.k) ? "countdown-cell-tick" : ""}`}
              >
                {String(it.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-fg-subtle sm:text-xs">
                {it.l}
              </div>
            </div>
          ))}
        </div>
      </RevealOnView>
    </section>
  );
}
