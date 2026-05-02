const days = [
  { day: "Day 1", title: "Boarding", icon: "🛳️", desc: "Embark from port. Sail-away party at sunset." },
  { day: "Day 2", title: "Nassau", icon: "🏝️", desc: "Bahamas capital. Beaches, rum, vibes." },
  { day: "Day 3", title: "CocoCay", icon: "🌊", desc: "Royal's private paradise. Slides + cabanas." },
  { day: "Day 4", title: "Return", icon: "⚓", desc: "Last brunch. Disembark home full of memories." },
];

export function Itinerary() {
  return (
    <section id="itinerary" className="relative px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-aqua">Sample Itinerary</p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Four <span className="gradient-text-aqua">unforgettable</span> days.
          </h2>
        </header>

        <div className="space-y-3">
          {days.map((d, i) => (
            <div
              key={d.day}
              className="glass flex items-center gap-4 p-4 transition-all hover:translate-x-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-[var(--gradient-aqua)] text-2xl shadow-[var(--shadow-glow-aqua)]">
                {d.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-aqua">{d.day}</div>
                <div className="font-display text-xl font-semibold">{d.title}</div>
                <div className="text-xs text-foreground/65">{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
