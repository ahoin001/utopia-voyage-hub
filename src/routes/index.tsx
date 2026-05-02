import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/cruise/Hero";
import { Countdown } from "@/components/cruise/Countdown";
import { Experience } from "@/components/cruise/Experience";
import { Rooms } from "@/components/cruise/Rooms";
import { Drinks } from "@/components/cruise/Drinks";
import { Checklist } from "@/components/cruise/Checklist";
import { Itinerary } from "@/components/cruise/Itinerary";
import { FinalCTA } from "@/components/cruise/FinalCTA";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Utopia Escape — Bahamas Cruise · Aug 28, 2026" },
      {
        name: "description",
        content:
          "The crew's official Utopia of the Seas trip page — pricing, rooms, packing checklist, and the countdown to set sail.",
      },
      { property: "og:title", content: "Utopia Escape 🌴 — Aug 28, 2026" },
      { property: "og:description", content: "Sun. Drinks. Memories. Let's run it." },
    ],
  }),
});

function Index() {
  return (
    <main className="relative">
      <Hero />
      <Countdown />
      <Experience />
      <Rooms />
      <Drinks />
      <Checklist />
      <Itinerary />
      <FinalCTA />
    </main>
  );
}
