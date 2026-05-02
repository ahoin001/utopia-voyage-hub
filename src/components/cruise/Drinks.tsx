import { useState } from "react";

import { RevealOnView } from "@/components/RevealOnView";
import { DRINK_PACKAGE_PER_PERSON } from "@/data/trip";

export function Drinks() {
  const [n, setN] = useState(3);

  const verdict =
    n >= 4
      ? { label: "Worth it", emoji: "🍹", color: "text-aqua", bg: "bg-aqua/15" }
      : n >= 2
        ? { label: "Borderline", emoji: "🤔", color: "text-sunset", bg: "bg-sunset/15" }
        : { label: "Skip it", emoji: "💧", color: "text-coral", bg: "bg-coral/15" };

  return (
    <section id="drinks" className="relative px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnView>
          <header className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-aqua">Drink Package Guide</p>
            <h2 className="text-4xl font-bold sm:text-5xl">
              ${DRINK_PACKAGE_PER_PERSON}
              <span className="text-foreground/50">/person</span>
              <span className="block text-base font-normal text-foreground/60">
                Worth it? Let's see.
              </span>
            </h2>
          </header>

          <div className="glass-strong p-6">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-sm text-foreground/70">How much do you drink per day?</span>
              <span className="font-display text-3xl font-bold gradient-text-aqua">{n}</span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full accent-[oklch(0.78_0.14_200)]"
            />
            <div className="mt-1 flex justify-between text-[10px] uppercase tracking-widest text-foreground/50">
              <span>None</span>
              <span>4+</span>
              <span>Sloshed</span>
            </div>

            <div className={`mt-6 rounded-2xl border border-white/10 p-4 ${verdict.bg}`}>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{verdict.emoji}</span>
                <div>
                  <div className={`text-xs uppercase tracking-widest ${verdict.color}`}>
                    Verdict
                  </div>
                  <div className="font-display text-2xl font-semibold">{verdict.label}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="glass p-4">
              <div className="text-xs uppercase tracking-widest text-sunset">Heads up</div>
              <p className="mt-1 text-sm text-foreground/85">
                If <strong>one</strong> person in a room gets the package, <strong>everyone</strong>{" "}
                in that room must.
              </p>
            </div>
            <div className="glass p-4">
              <div className="text-xs uppercase tracking-widest text-aqua">Allowed onboard</div>
              <p className="mt-1 text-sm text-foreground/85">
                <strong>2 bottles of wine max</strong>, counted <strong>per room</strong>.
              </p>
            </div>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}
