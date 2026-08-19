// Departure airports the site can quote fares from.
//
// A price with no origin attached is meaningless on an international site, so
// every "from $X" is rendered next to the airport it belongs to. This list is
// the single source of truth: the nightly fare job pulls one page per entry, and
// the origin picker offers exactly these.
//
// Adding an origin costs one upstream call a night, so the list can grow — but
// only add airports there is real traffic from, since each one also multiplies
// the rows in origin_fares.
//
// Shared by server and client. Keep it free of heavy imports for that reason.

export type Origin = {
  /** IATA city code, as Travelpayouts expects it (LON, not LHR). */
  iata: string;
  /** Shown next to the price: "from $276 · London". */
  label: string;
  country: string;
};

export const SUPPORTED_ORIGINS: Origin[] = [
  { iata: "LON", label: "London", country: "GB" },
  { iata: "NYC", label: "New York", country: "US" },
  { iata: "LAX", label: "Los Angeles", country: "US" },
  { iata: "CHI", label: "Chicago", country: "US" },
  { iata: "MIA", label: "Miami", country: "US" },
  { iata: "YTO", label: "Toronto", country: "CA" },
  { iata: "DUB", label: "Dublin", country: "IE" },
  { iata: "AMS", label: "Amsterdam", country: "NL" },
  { iata: "FRA", label: "Frankfurt", country: "DE" },
  { iata: "PAR", label: "Paris", country: "FR" },
  { iata: "STO", label: "Stockholm", country: "SE" },
  { iata: "SYD", label: "Sydney", country: "AU" },
];

export const DEFAULT_ORIGIN = "LON";

export const ORIGIN_BY_IATA = new Map(SUPPORTED_ORIGINS.map((o) => [o.iata, o]));

/**
 * First supported origin in the visitor's country.
 *
 * Deliberately coarse: the US has four entries and a visitor from Denver gets
 * New York. Guessing a nearer airport from an IP would need a geo database we
 * do not have, and the picker exists precisely so the guess can be corrected.
 */
const ORIGIN_BY_COUNTRY: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const o of SUPPORTED_ORIGINS) if (!map[o.country]) map[o.country] = o.iata;
  // Countries with no origin of their own, pointed at the nearest hub we do have.
  return {
    ...map,
    NO: "STO", DK: "STO", FI: "STO",
    BE: "AMS", LU: "AMS",
    AT: "FRA", CH: "FRA", PL: "FRA", CZ: "FRA",
    ES: "PAR", IT: "PAR", PT: "PAR",
    NZ: "SYD",
    MX: "MIA",
  };
})();

export function originForCountry(country: string | null | undefined): string {
  if (!country) return DEFAULT_ORIGIN;
  return ORIGIN_BY_COUNTRY[country.toUpperCase()] ?? DEFAULT_ORIGIN;
}

/** Validate a user-supplied origin before it reaches a query. */
export function normalizeOrigin(value: string | null | undefined): string | null {
  if (!value) return null;
  const iata = value.trim().toUpperCase();
  return ORIGIN_BY_IATA.has(iata) ? iata : null;
}

/** Cookie the origin picker writes so the choice survives navigation. */
export const ORIGIN_COOKIE = "flyamba_origin";

/**
 * The origin to quote fares from, in priority order:
 *   1. an explicit choice the visitor made (cookie)
 *   2. their country, from the edge
 *   3. DEFAULT_ORIGIN
 *
 * Takes plain strings rather than a request object so route handlers and server
 * components can both use it.
 */
export function resolveOrigin(
  countryHeader: string | null | undefined,
  cookieValue: string | null | undefined,
): { origin: string; chosen: boolean } {
  const chosen = normalizeOrigin(cookieValue);
  if (chosen) return { origin: chosen, chosen: true };

  const code = countryHeader?.trim().toUpperCase();
  // Cloudflare uses "XX" for anonymised clients.
  const country = code && code !== "XX" && /^[A-Z]{2}$/.test(code) ? code : null;
  return { origin: originForCountry(country), chosen: false };
}
