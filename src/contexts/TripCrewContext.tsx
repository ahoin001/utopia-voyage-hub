import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { TripRoomId } from "@/data/trip";
import { getRoomForPerson } from "@/data/trip";

const STORAGE_KEY = "utopia-you-v1";
const HIGHLIGHT_MS = 3200;

type TripCrewContextValue = {
  selectedName: string | null;
  setSelectedName: (name: string | null) => void;
  highlightedRoomId: TripRoomId | null;
};

const TripCrewContext = createContext<TripCrewContextValue | null>(null);

export function TripCrewProvider({ children }: { children: ReactNode }) {
  const [selectedName, setSelectedNameState] = useState<string | null>(null);
  const [highlightedRoomId, setHighlightedRoomId] = useState<TripRoomId | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const clearHighlightTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const t = raw?.trim();
      if (t) setSelectedNameState(t);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (selectedName) localStorage.setItem(STORAGE_KEY, selectedName);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [selectedName, hydrated]);

  const setSelectedName = useCallback((name: string | null) => {
    const next = name?.trim() || null;
    setSelectedNameState(next);

    if (clearHighlightTimer.current) clearTimeout(clearHighlightTimer.current);
    if (!next) {
      setHighlightedRoomId(null);
      return;
    }
    const room = getRoomForPerson(next);
    if (!room) return;

    const el = document.getElementById(room.anchorId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

    setHighlightedRoomId(room.id);
    clearHighlightTimer.current = setTimeout(() => setHighlightedRoomId(null), HIGHLIGHT_MS);
  }, []);

  const value = useMemo(
    () => ({ selectedName, setSelectedName, highlightedRoomId }),
    [selectedName, setSelectedName, highlightedRoomId],
  );

  return <TripCrewContext.Provider value={value}>{children}</TripCrewContext.Provider>;
}

export function useTripCrew() {
  const ctx = useContext(TripCrewContext);
  if (!ctx) throw new Error("useTripCrew must be used within TripCrewProvider");
  return ctx;
}
