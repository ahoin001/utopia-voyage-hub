/** Single source of truth for crew, rooms, and trip facts. */

export type TripRoomId = "room-1" | "room-2" | "room-3";

export type TripRoomInfo = {
  id: TripRoomId;
  /** DOM id for scroll targets, e.g. room-1 */
  anchorId: string;
  label: string;
  guestNames: readonly string[];
};

export const DRINK_PACKAGE_PER_PERSON = 255;

export const TRIP_ROOMS: readonly TripRoomInfo[] = [
  {
    id: "room-1",
    anchorId: "room-1",
    label: "Room 1",
    guestNames: ["Milena", "Rigo"],
  },
  {
    id: "room-2",
    anchorId: "room-2",
    label: "Room 2",
    guestNames: ["Daniella", "Nana", "Saurel", "Shirlon"],
  },
  {
    id: "room-3",
    anchorId: "room-3",
    label: "Room 3",
    guestNames: ["Alex", "Gu", "Jon", "Tyler"],
  },
] as const;

/** All guest names in display order (room cards); use sorted copy where UX needs A–Z (e.g. hero picker). */
export const ALL_GUEST_NAMES: readonly string[] = TRIP_ROOMS.flatMap((r) => [...r.guestNames]);

export function getRoomForPerson(name: string): TripRoomInfo | undefined {
  const n = name.trim();
  return TRIP_ROOMS.find((r) => r.guestNames.includes(n));
}
