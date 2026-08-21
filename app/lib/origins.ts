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
  // Added Aug 2026 for the /cheap-flights-from-* pages. Every one was verified
  // against v1/prices/cheap before being added — Travelpayouts answers for all of
  // them, so the previous short list was a gap rather than a limit. Each costs one
  // upstream call a night.
  { iata: "ATL", label: "Atlanta", country: "US" },
  { iata: "DFW", label: "Dallas", country: "US" },
  { iata: "HOU", label: "Houston", country: "US" },
  { iata: "MSP", label: "Minneapolis", country: "US" },
  { iata: "DEN", label: "Denver", country: "US" },
  { iata: "DTT", label: "Detroit", country: "US" },
  { iata: "PHX", label: "Phoenix", country: "US" },
  { iata: "TPA", label: "Tampa", country: "US" },
  { iata: "SEA", label: "Seattle", country: "US" },
  { iata: "SLC", label: "Salt Lake City", country: "US" },
  { iata: "AUS", label: "Austin", country: "US" },
  { iata: "SAN", label: "San Diego", country: "US" },
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
 * IATA metro code → the place id the search widget expects as `from_name`.
 *
 * THESE ARE KIWI IDS, NOT TRAVELPAYOUTS NAMES, AND THE DIFFERENCE MATTERS.
 * The widget script maps `from_name` onto `data-from`, which Kiwi's iframe loader
 * turns into `source=` against api.skypicker.com. So the value has to be a place
 * id Kiwi recognises — and for the United States and Canada that carries a
 * subdivision segment our own slugs never had: `atlanta_ga_us`, not `atlanta_us`.
 *
 * An earlier version of this table copied the catalog's `tpName` values, on the
 * reasoning that strings already shipping as `to_name` must be correct. They were
 * not. Eighteen of the twenty-four resolved to nothing, including every US city —
 * the whole target market. European names such as `london_gb` and `paris_fr`
 * happen to match Kiwi's format, which is why the bug stayed invisible.
 *
 * AN UNKNOWN ID PRODUCES AN EMPTY FIELD, NOT AN ERROR. Nothing logs, nothing
 * throws, the box just renders blank — which is how this shipped broken. Every
 * value below was resolved from Kiwi's places API and then read back by id.
 * Run `node scripts/verify-tpnames.mjs` after touching this table.
 */
export const ORIGIN_TP_NAME: Record<string, string> = {
  LON: "london_gb",
  NYC: "new-york-city_ny_us",
  LAX: "los-angeles_ca_us",
  CHI: "chicago_il_us",
  MIA: "miami_fl_us",
  ATL: "atlanta_ga_us",
  DFW: "dallas_tx_us",
  HOU: "houston_tx_us",
  MSP: "minneapolis_mn_us",
  DEN: "denver_co_us",
  DTT: "detroit_mi_us",
  PHX: "phoenix_az_us",
  TPA: "tampa_fl_us",
  SEA: "seattle_wa_us",
  SLC: "salt-lake-city_ut_us",
  AUS: "austin_tx_us",
  SAN: "san-diego_ca_us",
  YTO: "toronto_on_ca",
  DUB: "dublin_ie",
  AMS: "amsterdam_nl",
  FRA: "frankfurt_de",
  PAR: "paris_fr",
  STO: "stockholm_se",
  SYD: "sydney_ns_au",
};
/**
 * The visitor's chosen origin as the widget's `from_name`, read in the browser.
 *
 * CLIENT-SIDE ON PURPOSE. Reading the cookie in a server component would make the
 * page dynamic, which costs TTFB and fragments the CDN cache on every destination
 * page. The widget already mounts on the client behind an IntersectionObserver,
 * so it can read the cookie itself and the page stays static — see the note in
 * AviasalesWidget.
 *
 * Returns null when there is no cookie or the value is not one we support, and
 * the caller then omits `from_name` rather than sending something invalid.
 */
export function originTpNameFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${ORIGIN_COOKIE}=([^;]*)`));
  if (!match) return null;
  const iata = normalizeOrigin(decodeURIComponent(match[1]));
  return iata ? (ORIGIN_TP_NAME[iata] ?? null) : null;
}

/** Write the visitor's origin so later pages can pre-fill from it. */
export function writeOriginCookie(iata: string): void {
  if (typeof document === "undefined") return;
  const valid = normalizeOrigin(iata);
  if (!valid) return;
  document.cookie = `${ORIGIN_COOKIE}=${encodeURIComponent(valid)}; path=/; max-age=31536000; samesite=lax`;
}

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
