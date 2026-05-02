import { useEffect, useState } from "react";

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

export function Countdown() {
  const [t, setT] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { l: "Days", v: t.d },
    { l: "Hours", v: t.h },
    { l: "Min", v: t.m },
    { l: "Sec", v: t.s },
  ];

  return (
    <section className="relative px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-aqua">
          The Voyage Begins
        </p>
        <div className="glass-strong grid grid-cols-4 gap-2 p-5 sm:gap-4 sm:p-6">
          {items.map((it) => (
            <div key={it.l} className="text-center">
              <div className="font-display text-3xl font-bold tabular-nums sm:text-5xl gradient-text-aqua">
                {String(it.v).padStart(2, "0")}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60 sm:text-xs">
                {it.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
