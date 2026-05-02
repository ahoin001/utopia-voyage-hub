import { useState } from "react";
import balconyImg from "@/assets/balcony-room.jpg";
import suiteImg from "@/assets/owners-suite.jpg";

function Money({ value }: { value: number }) {
  return <>${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</>;
}

export function Rooms() {
  const [room1Drinks, setR1] = useState(false);
  const [room2Drinks, setR2] = useState(false);

  const drink = 255;

  // Room 1
  const r1Base = 1675;
  const r1People = 2;
  const r1Total = r1Base + (room1Drinks ? drink * r1People : 0);

  // Room 2
  const r2Original = 1998;
  const r2Discounted = 1598;
  const r2People = 4;
  const r2PerPerson = r2Discounted / r2People; // 399
  const r2Total = r2Discounted + (room2Drinks ? drink * r2People : 0);
  const r2PP = room2Drinks ? r2PerPerson + drink : r2PerPerson;

  return (
    <section id="rooms" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-aqua">Room Arrangements</p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Who's <span className="gradient-text-sunset italic">where</span>.
          </h2>
          <p className="mt-3 text-sm text-foreground/65">
            Tap toggles to see the price with or without drinks.
          </p>
        </header>

        {/* Room 1 */}
        <article className="glass-strong mb-6 overflow-hidden">
          <div className="relative">
            <img src={balconyImg} alt="Ocean view balcony stateroom" loading="lazy" className="aspect-[2/1] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.06_240)] to-transparent" />
            <div className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-aqua">
              🌊 Ocean View Balcony
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold">Room 1</h3>
                <p className="text-sm text-foreground/70">Milena & Rigo</p>
              </div>
              <span className="rounded-full bg-sunset/20 px-3 py-1 text-xs text-sunset">
                Rigo may cover both 💸
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {["Milena", "Rigo"].map((n) => (
                <div key={n} className="glass p-3 text-center">
                  <div className="text-2xl">🧍</div>
                  <div className="mt-1 text-sm font-medium">{n}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 glass p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm">Add drink package</span>
                <button
                  onClick={() => setR1((v) => !v)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${room1Drinks ? "bg-aqua" : "bg-white/15"}`}
                  aria-label="Toggle drinks"
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${room1Drinks ? "left-6" : "left-1"}`} />
                </button>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-foreground/55">Total</div>
                  <div className="font-display text-3xl font-bold gradient-text-aqua">
                    <Money value={r1Total} />
                  </div>
                </div>
                <div className="text-xs text-foreground/60">
                  {room1Drinks ? `+ $${drink * r1People} drinks` : `+ $${drink}/person if added`}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Room 2 */}
        <article className="glass-strong mb-6 overflow-hidden">
          <div className="relative">
            <img src={balconyImg} alt="Ocean view balcony stateroom" loading="lazy" className="aspect-[2/1] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.06_240)] to-transparent" />
            <div className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-aqua">
              🌊 Ocean View Balcony
            </div>
            <div className="absolute right-3 top-3 rounded-full bg-[var(--gradient-sunset)] px-3 py-1 text-xs font-semibold text-foreground shadow-[var(--shadow-glow-gold)]">
              20% OFF
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold">Room 2</h3>
                <p className="text-sm text-foreground/70">Daniella · Nana · Saurel · Shirlon</p>
              </div>
              <span className="rounded-full bg-aqua/20 px-3 py-1 text-xs text-aqua">
                Nana came through 💸
              </span>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2">
              {["Daniella", "Nana", "Saurel", "Shirlon"].map((n) => (
                <div key={n} className="glass p-2 text-center">
                  <div className="text-lg">🧍</div>
                  <div className="mt-1 truncate text-[11px]">{n}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 glass p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm">Add drink package</span>
                <button
                  onClick={() => setR2((v) => !v)}
                  className={`relative h-7 w-12 rounded-full transition-colors ${room2Drinks ? "bg-aqua" : "bg-white/15"}`}
                  aria-label="Toggle drinks"
                >
                  <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${room2Drinks ? "left-6" : "left-1"}`} />
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-foreground/50 line-through">
                      <Money value={r2Original} />
                    </span>
                    <span className="rounded bg-sunset/20 px-1.5 py-0.5 text-[10px] text-sunset">
                      −$400
                    </span>
                  </div>
                  <div className="font-display text-3xl font-bold gradient-text-aqua">
                    <Money value={r2Total} />
                  </div>
                  <div className="mt-1 text-xs text-foreground/60">
                    ≈ <Money value={r2PP} />/person
                  </div>
                </div>
                <div className="text-right text-xs text-foreground/60">
                  {room2Drinks ? `incl. $${drink}/person drinks` : "drinks add ~$255/person"}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Owner's Suite — showstopper */}
        <article
          className="relative overflow-hidden rounded-3xl border border-gold/30 shadow-[var(--shadow-glow-gold)]"
          style={{ background: "var(--gradient-luxury)" }}
        >
          <div className="relative">
            <img src={suiteImg} alt="Owner's Suite" loading="lazy" className="aspect-[2/1] w-full object-cover animate-slow-zoom" />
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.15_0.04_250)] via-[oklch(0.15_0.04_250/0.4)] to-transparent" />
            <div className="absolute right-3 top-3 rounded-full border border-gold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
              👑 Owner's Suite
            </div>
            <div className="absolute bottom-4 left-5 right-5">
              <p className="font-display text-2xl italic gradient-text-gold">
                "This isn't a room. This is a statement."
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold gradient-text-gold">Room 3</h3>
                <p className="text-sm text-foreground/70">Alex · Gu · Jon · Tyler</p>
              </div>
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs text-gold">
                20% OFF
              </span>
            </div>

            <div className="mt-5 glass p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs text-foreground/50 line-through">$4,823.96</div>
                  <div className="font-display text-3xl font-bold gradient-text-gold">$3,859.17</div>
                </div>
                <div className="text-right text-xs text-foreground/60">
                  Save $964.79
                </div>
              </div>
            </div>

            {/* Splits */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { name: "Gu", v: 1300 },
                { name: "Alex", v: 1300 },
                { name: "Jon", v: 629 },
                { name: "Tyler", v: 629 },
              ].map((p) => (
                <div key={p.name} className="glass p-3">
                  <div className="text-xs uppercase tracking-widest text-foreground/55">{p.name}</div>
                  <div className="font-display text-xl font-semibold gradient-text-gold">
                    ${p.v.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Perks */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="glass p-3">
                <div className="text-2xl">🍸</div>
                <div className="mt-1 text-sm font-medium">2 Bars</div>
                <div className="text-[11px] text-foreground/60">All-you-can-drink access</div>
              </div>
              <div className="glass p-3">
                <div className="text-2xl">📶</div>
                <div className="mt-1 text-sm font-medium">4× Wi-Fi</div>
                <div className="text-[11px] text-foreground/60">Internet packages included</div>
              </div>
            </div>

            <p className="mt-4 rounded-xl border border-gold/20 bg-gold/5 p-3 text-xs text-gold/90">
              💡 Drink package likely <strong>not needed</strong> — bar access is included.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
