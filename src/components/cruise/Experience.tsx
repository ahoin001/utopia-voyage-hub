import poolImg from "@/assets/pool.jpg";
import bahamasImg from "@/assets/bahamas.jpg";

const tiles = [
  { icon: "🌊", title: "Pools & Chill", desc: "Infinity decks, cabanas, sun loungers." },
  { icon: "🍹", title: "Bars & Nightlife", desc: "20+ bars, rooftop lounges, late-night DJs." },
  { icon: "🎉", title: "Shows", desc: "Broadway, ice skating, aqua theater." },
  { icon: "🍽️", title: "Dining", desc: "Specialty restaurants & 24/7 eats." },
  { icon: "🏝️", title: "Bahamas Stops", desc: "Nassau & Perfect Day at CocoCay." },
  { icon: "🛥️", title: "Top Deck", desc: "Slides, zip-lines, ocean views." },
];

const day = [
  { time: "Morning", icon: "☕", text: "Coffee + ocean views from the balcony." },
  { time: "Afternoon", icon: "🏊", text: "Pool, drinks, top-deck slides." },
  { time: "Evening", icon: "🍽️", text: "Dinner reservations + a Broadway show." },
  { time: "Night", icon: "🪩", text: "Bars, clubs, rooftop until sunrise." },
];

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-aqua">The Experience</p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Welcome aboard the <span className="gradient-text-aqua">biggest ship on Earth.</span>
          </h2>
        </header>

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {tiles.map((t, i) => (
            <div
              key={t.title}
              className="glass group p-4 transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--glass-strong)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl transition-transform group-hover:scale-110">{t.icon}</div>
              <h3 className="mt-3 text-base font-semibold">{t.title}</h3>
              <p className="mt-1 text-xs text-foreground/65">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Image collage */}
        <div className="mt-10 grid grid-cols-5 gap-3">
          <div className="glass col-span-3 overflow-hidden p-0">
            <img src={poolImg} alt="Cruise pool deck" loading="lazy" className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
          <div className="col-span-2 flex flex-col gap-3">
            <div className="glass overflow-hidden p-0">
              <img src={bahamasImg} alt="Bahamas beach" loading="lazy" className="aspect-square h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="glass flex flex-1 flex-col items-center justify-center p-3 text-center">
              <div className="font-display text-3xl gradient-text-sunset">5</div>
              <div className="text-[10px] uppercase tracking-widest text-foreground/60">Days at sea</div>
            </div>
          </div>
        </div>

        {/* Day in the life */}
        <div className="mt-16">
          <h3 className="mb-6 text-center text-2xl font-semibold">A Day in the Life</h3>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-aqua/60 via-sunset/40 to-transparent sm:left-1/2" />
            <div className="space-y-6">
              {day.map((d, i) => (
                <div
                  key={d.time}
                  className={`relative flex items-start gap-4 sm:w-1/2 ${i % 2 === 1 ? "sm:ml-auto sm:pl-10" : "sm:pr-10 sm:text-right"}`}
                >
                  <div className={`absolute left-6 -ml-2 h-4 w-4 rounded-full bg-aqua shadow-[var(--shadow-glow-aqua)] sm:left-auto ${i % 2 === 1 ? "sm:-left-2" : "sm:-right-2"}`} />
                  <div className="glass ml-12 flex-1 p-4 sm:ml-0">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-aqua">
                      <span className="text-base">{d.icon}</span>
                      {d.time}
                    </div>
                    <p className="mt-1 text-sm text-foreground/85">{d.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
