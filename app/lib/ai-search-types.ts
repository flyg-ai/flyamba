// Types shared between the /api/ai-search route (server) and HomeHero (client).

/** Editorial 1–10 ratings. Mirrors DestinationScores in app/data/destination-facts.ts. */
export type MatchScores = {
  beaches: number;
  nightlife: number;
  food: number;
  activities: number;
  family: number;
  value: number;
};

/**
 * A single result, carrying everything the card needs to render.
 *
 * The display fields are here rather than looked up client-side on purpose.
 * HomeHero used to resolve each slug against the 8 rich `destinations`, so when
 * the search catalog grew to all 550 every match outside those 8 silently
 * rendered as nothing — "best european beach destination" returned six
 * destinations and drew one card. Sending the payload also keeps the 181 kB
 * catalog and the 90 kB facts file out of the browser bundle entirely.
 *
 * Fields beyond the first six are optional because only the 8 hand-authored
 * destinations have them; the card hides whatever is missing.
 */
export type AiSearchMatch = {
  slug: string;
  city: string;
  country: string;
  iata: string;
  image: string;
  /** Cheapest fare in SEK — the catalog's own number, from flyg.ai. Stockholm
   *  origin, round trip, fixed exchange rate. Kept only as a last resort and
   *  NEVER rendered as a price: see `fares`. */
  priceSek: number;
  /**
   * Real fares from the visitor's origin, cheapest first, up to two date pairs.
   * Empty when Travelpayouts has nothing for that route — the card then shows no
   * price at all, which is the honest thing to do.
   */
  fares?: MatchFare[];
  /** One warm sentence on why this destination fits the query. */
  reason: string;
  /** Aviasales `to_name` place code (e.g. "barcelona_es"), for the fare widget. */
  tpName: string;

  countryFlag?: string;
  /** Controlled-vocabulary tags from destination-facts.ts. */
  tags?: string[];
  scores?: MatchScores;
  summerTemp?: number;
  /** e.g. "3h 30min direct" — rich destinations only. */
  flightTime?: string;
  /** Pre-rendered weather badge; rich destinations only (needs 12-month data). */
  weatherBadge?: string;
  /** USD, e.g. "$33–48". */
  foodPerDay?: string;
  /** USD, e.g. "$95–133". */
  hotelPerNight?: string;
  insiderTip?: string;
  /** Comma-joined, already truncated server-side. */
  localDishes?: string;
  /** Comma-joined, already truncated server-side. */
  topSights?: string;
};

/** One priced date pair. */
export type MatchFare = {
  priceUsd: number;
  /** ISO date, or null when upstream gave none. */
  departDate: string | null;
  returnDate: string | null;
  airline: string | null;
  /** False = round trip. Presenting a round-trip fare as "one way" is a
   *  deceptive practice under 14 CFR 399.84, so the flag travels with the price. */
  oneWay: boolean;
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
  /** Airport the fares are quoted from, e.g. "LON". */
  origin?: string;
  /** Human label for it, e.g. "London". */
  originLabel?: string;
  /** True when the visitor picked the origin rather than it being guessed. */
  originChosen?: boolean;
};
