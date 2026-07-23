// Types shared between the /api/ai-search route (server) and HomeHero (client).

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
  /** Short, catchy headline the AI generates from the query, shown above results. */
  headline?: string | null;
  /** One-sentence insider follow-up (or, in conversational mode, a friendly reply). */
  followUp?: string | null;
  /** Month detected in the query (e.g. "September"), used to label the flight-search button. */
  month?: string | null;
  /** True when the query was too vague for destinations — only `followUp` is shown. */
  conversational?: boolean;
};
