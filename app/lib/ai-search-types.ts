// Types shared between the /api/ai-search route (server) and AISearchBar (client).

export type AiSearchMatch = {
  slug: string;
  city: string;
  iata: string;
  /** One warm sentence on why this destination fits the query. */
  reason: string;
};

/**
 * Set when the traveler clearly wants to fly to / book ONE specific
 * destination. The frontend uses this to render a prefilled flight-results
 * widget.
 */
export type BookingIntent = {
  iata: string;
  city: string;
  /** Aviasales `to_name` place code (e.g. "barcelona_es"). */
  toName: string;
  /** `from_name` place code if the traveler stated an origin (e.g. "oslo_no"); else undefined → IP-based origin. */
  fromName?: string;
};

export type AiSearchResult = {
  /** Ranked matches, best fit first. Slugs are guaranteed to exist in the catalog. */
  matches: AiSearchMatch[];
  /** Present when the query is a single-destination booking intent. */
  bookingIntent: BookingIntent | null;
};
