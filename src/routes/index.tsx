import { createFileRoute } from "@tanstack/react-router";
import { Checklist } from "@/components/cruise/Checklist";
import { Countdown } from "@/components/cruise/Countdown";
import { Drinks } from "@/components/cruise/Drinks";
import { Hero } from "@/components/cruise/Hero";
import { Payment } from "@/components/cruise/Payment";
import { Rooms } from "@/components/cruise/Rooms";
import { TripCrewProvider } from "@/contexts/TripCrewContext";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Utopia Escape — Bahamas Cruise · Aug 28, 2026" },
      {
        name: "description",
        content:
          "The crew's Utopia of the Seas hub — countdown, room costs, drink package guide, packing checklist, and group cheat sheet.",
      },
      { property: "og:title", content: "Utopia Escape 🌴 — Aug 28, 2026" },
      { property: "og:description", content: "Sun. Drinks. Memories. Let's run it." },
    ],
  }),
});

function Index() {
  return (
    <TripCrewProvider>
      <div className="aurora-fixed" aria-hidden>
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob aurora-blob--mesh" />
        <div className="aurora-blob aurora-blob--ribbon" />
      </div>
      <div className="bg-diagonal-accent" aria-hidden />
      <div className="grain-overlay" aria-hidden />
      <main className="relative z-10">
        <Hero />
        <Countdown />
        <Rooms />
        <Drinks />
        <Checklist />
        <Payment />
      </main>
    </TripCrewProvider>
  );
}
