import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";

type DocPath = "passport" | "birth" | null;

const ESSENTIALS = [
  { id: "swim", label: "Swimwear", icon: "🩱" },
  { id: "night", label: "Night outfits", icon: "👗" },
  { id: "shoes", label: "Flip flops + sneakers", icon: "👟" },
  { id: "sun", label: "Sunscreen", icon: "🧴" },
  { id: "charger", label: "Phone charger", icon: "🔌" },
  { id: "battery", label: "Portable charger", icon: "🔋" },
];

const OPTIONALS = [
  { id: "wine", label: "Wine (2 bottles max)", icon: "🍷" },
  { id: "meds", label: "Motion sickness meds", icon: "💊" },
  { id: "shades", label: "Sunglasses", icon: "🕶️" },
  { id: "case", label: "Waterproof phone case", icon: "📱" },
  { id: "bag", label: "Beach bag", icon: "👜" },
];

const PASSPORT = [
  { id: "p_book", label: "Passport Book OR Card" },
  { id: "p_valid", label: "Valid 6+ months after trip" },
];

const BIRTH = [
  { id: "b_cert", label: "Original birth certificate" },
  { id: "b_id", label: "Government ID (15+)" },
];

const STORAGE_KEY = "utopia-checklist-v1";

type State = {
  path: DocPath;
  checked: Record<string, boolean>;
};

function load(): State {
  if (typeof window === "undefined") return { path: null, checked: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as State;
  } catch {}
  return { path: null, checked: {} };
}

function CheckRow({
  id, label, icon, checked, onToggle, weight,
}: {
  id: string; label: string; icon?: string; checked: boolean; onToggle: () => void; weight?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={`group flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 text-left transition-all active:scale-[0.98] ${
        checked ? "bg-aqua/10 border-aqua/40" : "bg-white/[0.03] hover:bg-white/[0.06]"
      }`}
    >
      <span
        className={`relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
          checked ? "border-aqua bg-aqua" : "border-white/30"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 20 20" className="h-4 w-4 text-background animate-scale-in">
            <path
              d="M5 10.5l3 3 7-7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        )}
      </span>
      {icon && <span className="text-xl">{icon}</span>}
      <span
        className={`flex-1 text-sm transition-all ${
          checked ? "text-foreground/55 line-through" : "text-foreground"
        }`}
      >
        {label}
        {weight && <span className="ml-2 text-[10px] uppercase tracking-widest text-sunset">{weight}</span>}
      </span>
      <span className="sr-only" aria-hidden="false">{id}</span>
    </button>
  );
}

export function Checklist() {
  const [state, setState] = useState<State>({ path: null, checked: {} });
  const [hydrated, setHydrated] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, hydrated]);

  const toggle = (id: string) =>
    setState((s) => ({ ...s, checked: { ...s.checked, [id]: !s.checked[id] } }));

  const setPath = (p: DocPath) =>
    setState((s) => ({ ...s, path: s.path === p ? null : p }));

  const docItems = state.path === "passport" ? PASSPORT : state.path === "birth" ? BIRTH : [];
  const docDone = state.path !== null && docItems.every((i) => state.checked[i.id]);
  const essDone = ESSENTIALS.every((i) => state.checked[i.id]);
  const allDone = docDone && essDone;

  // Progress (docs weighted 2x)
  const progress = useMemo(() => {
    const docTotal = docItems.length * 2;
    const docCount = docItems.reduce((a, i) => a + (state.checked[i.id] ? 2 : 0), 0);
    const essTotal = ESSENTIALS.length;
    const essCount = ESSENTIALS.reduce((a, i) => a + (state.checked[i.id] ? 1 : 0), 0);
    const total = docTotal + essTotal || 1;
    return Math.round(((docCount + essCount) / total) * 100);
  }, [state, docItems]);

  useEffect(() => {
    if (allDone && !firedRef.current && hydrated) {
      firedRef.current = true;
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.5 },
        colors: ["#5dd6e6", "#ffb869", "#ffd479", "#ff7e7e"],
      });
      if (navigator.vibrate) navigator.vibrate([50, 30, 80]);
    }
    if (!allDone) firedRef.current = false;
  }, [allDone, hydrated]);

  const reset = () => setState({ path: null, checked: {} });

  return (
    <section id="checklist" className="relative px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-aqua">Pre-Boarding</p>
          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to <span className="gradient-text-sunset italic">Sail?</span> ✅
          </h2>
          <p className="mt-3 text-sm text-foreground/65">
            Saved on this device. No login. No worries.
          </p>
        </header>

        {/* Progress */}
        <div className="sticky top-3 z-30 mb-6">
          <div className="glass-strong p-3">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="uppercase tracking-widest text-foreground/70">Trip Readiness</span>
              <span className="font-display text-base font-bold gradient-text-aqua">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progress}%`, background: "var(--gradient-aqua)" }}
              />
            </div>
          </div>
        </div>

        {/* Sticky banner */}
        <div className="mb-6 rounded-2xl border border-sunset/30 bg-sunset/10 p-3 text-center text-xs text-sunset">
          ⚠️ Documents must be <strong>original</strong>. Names must <strong>match</strong> your booking.
        </div>

        {/* Documents */}
        <h3 className="mb-3 text-lg font-semibold">🔐 Required Documents</h3>
        <p className="mb-4 text-xs text-foreground/60">Choose ONE path:</p>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => setPath("passport")}
            className={`glass relative overflow-hidden p-4 text-left transition-all ${
              state.path === "passport" ? "ring-2 ring-aqua shadow-[var(--shadow-glow-aqua)]" : state.path === "birth" ? "opacity-40" : ""
            }`}
          >
            <div className="text-2xl">🛂</div>
            <div className="mt-2 font-semibold">Passport</div>
            <div className="text-[11px] text-aqua">Recommended</div>
          </button>
          <button
            onClick={() => setPath("birth")}
            className={`glass relative overflow-hidden p-4 text-left transition-all ${
              state.path === "birth" ? "ring-2 ring-aqua shadow-[var(--shadow-glow-aqua)]" : state.path === "passport" ? "opacity-40" : ""
            }`}
          >
            <div className="text-2xl">📄</div>
            <div className="mt-2 font-semibold">Birth Certificate</div>
            <div className="text-[11px] text-foreground/60">+ Gov ID (15+)</div>
          </button>
        </div>

        {state.path && (
          <div className="mb-8 space-y-2 animate-fade-up">
            {docItems.map((i) => (
              <CheckRow
                key={i.id}
                id={i.id}
                label={i.label}
                checked={!!state.checked[i.id]}
                onToggle={() => toggle(i.id)}
                weight="critical"
              />
            ))}
          </div>
        )}

        {/* Essentials */}
        <h3 className="mb-3 mt-8 text-lg font-semibold">🎒 Essentials</h3>
        <div className="mb-8 space-y-2">
          {ESSENTIALS.map((i) => (
            <CheckRow key={i.id} {...i} checked={!!state.checked[i.id]} onToggle={() => toggle(i.id)} />
          ))}
        </div>

        {/* Optionals */}
        <h3 className="mb-3 mt-8 text-lg font-semibold">🍾 Optionals</h3>
        <div className="space-y-2">
          {OPTIONALS.map((i) => (
            <CheckRow key={i.id} {...i} checked={!!state.checked[i.id]} onToggle={() => toggle(i.id)} />
          ))}
        </div>

        {/* Completion */}
        {allDone && (
          <div className="mt-8 animate-scale-in rounded-2xl border border-aqua/40 p-6 text-center" style={{ background: "var(--gradient-aqua)" }}>
            <div className="text-5xl">🌴🍹</div>
            <div className="mt-2 font-display text-2xl font-bold text-background">
              You're officially ready for Utopia
            </div>
            <div className="mt-2 inline-block rounded-full bg-background/20 px-3 py-1 text-xs uppercase tracking-widest text-background">
              ⭐ Cruise Ready Certified
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={reset}
            className="text-xs uppercase tracking-widest text-foreground/50 transition hover:text-foreground/80"
          >
            Reset Checklist
          </button>
        </div>
      </div>
    </section>
  );
}
