/** Single source of truth for crew, rooms, and trip facts. */

export type TripRoomId = "room-1" | "room-2" | "room-3";

export type TripRoomInfo = {
  id: TripRoomId;
  /** DOM id for scroll targets */
  anchorId: string;
  label: string;
  guestNames: readonly string[];
  /** Shown on the photo ribbon */
  cabinPhotoLabel: string;
  /** When set (e.g. 20), UI shows crossed-out estimated list fare */
  promoPercentOff: number | null;
};

export const DRINK_PACKAGE_PER_PERSON = 255;

/** Cabin fares after promotions (USD). Room 1 is rack with no promo. */
export const ROOM_CABIN_TOTAL_USD: Record<TripRoomId, number> = {
  "room-1": 1111,
  "room-2": 1998,
  "room-3": 1938,
};

/** Estimated brochure / pre-promo totals derived from discounted fare (rounded). */
export function estimatedListFareUsd(discountedTotal: number, promoPercentOff: number): number {
  const p = promoPercentOff / 100;
  if (p <= 0 || p >= 1) return discountedTotal;
  return Math.round(discountedTotal / (1 - p));
}

export const TRIP_ROOMS: readonly TripRoomInfo[] = [
  {
    id: "room-1",
    anchorId: "room-1",
    label: "Room 1",
    guestNames: ["Gu"],
    cabinPhotoLabel: "Solo stateroom",
    promoPercentOff: null,
  },
  {
    id: "room-2",
    anchorId: "room-2",
    label: "Room 2",
    guestNames: ["Alex", "Jon", "Rigo", "Tyler"],
    cabinPhotoLabel: "Ocean view balcony",
    promoPercentOff: 20,
  },
  {
    id: "room-3",
    anchorId: "room-3",
    label: "Room 3",
    guestNames: ["Daniella", "Nana", "Saurel", "Shirlon"],
    cabinPhotoLabel: "Neighborhood view balcony",
    promoPercentOff: 20,
  },
] as const;

/** All guest names for room order (crew picker sorts separately). */
export const ALL_GUEST_NAMES: readonly string[] = TRIP_ROOMS.flatMap((r) => [...r.guestNames]);

export function getRoomForPerson(name: string): TripRoomInfo | undefined {
  const n = name.trim();
  return TRIP_ROOMS.find((r) => r.guestNames.includes(n));
}
