// Travelpayouts Data API — per-day cheapest fares for one origin → destination
// route, backing the <PrisKalender> price calendar.
//
// Ported from the flyg.ai / lagpriskalender implementation, with two changes for
// Flyamba: fares are requested in USD rather than SEK, and the origin is dynamic
// (that project is Stockholm-only) — either passed explicitly by the client or
// inferred from the visitor's country.
//
// NB on depart_date: v1/prices/calendar accepts a depart_date=YYYY-MM parameter
// but ignores it — the same full ~10-month window comes back regardless. So we
// make ONE upstream call and let the client slice out the months it renders.
//
// Coverage is inherently sparse: this is Travelpayouts' cache of real user
// searches from the last 48h, so busy routes come back well populated while thin
// ones do not. Days with no cached fare are absent keys and render as empty cells.
//
// Requires TRAVELPAYOUTS_API_TOKEN. Without it every response is an empty
// calendar and the UI shows its "no prices" state — the pages still build.
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 86400;

const FALLBACK_ORIGIN = process.env.TRAVELPAYOUTS_ORIGIN?.trim().toUpperCase() || "LON";

// Country → nearest major origin airport. Anything not listed falls through to
// FALLBACK_ORIGIN, which is why the list only needs the markets we actually see.
const ORIGIN_BY_COUNTRY: Record<string, string> = {
  US: "JFK",
  GB: "LON",
  DE: "FRA",
  FR: "CDG",
  NL: "AMS",
  SE: "ARN",
  NO: "OSL",
  DK: "CPH",
  FI: "HEL",
  AU: "SYD",
  CA: "YYZ",
  AE: "DXB",
  SG: "SIN",
  JP: "NRT",
};

/**
 * Visitor country from the edge.
 *
 * X-Forwarded-For and CF-Connecting-IP carry an IP address, not a country —
 * turning one into the other needs a geo-IP database we don't have. Both Vercel
 * (x-vercel-ip-country) and Cloudflare (cf-ipcountry) resolve it upstream and
 * hand us the ISO code directly, so we read those instead.
 */
function countryOf(request: NextRequest): string | null {
  const header =
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  const code = header?.trim().toUpperCase();
  // Cloudflare uses "XX" for anonymised or unknown clients.
  if (!code || code === "XX" || !/^[A-Z]{2}$/.test(code)) return null;
  return code;
}

type CalendarEntry = { price?: number; airline?: string };

export type TpCalendarResponse = {
  /** "YYYY-MM-DD" → cheapest round-trip price in USD. */
  dates: Record<string, number>;
  /** Same keys as `dates` → operating airline IATA ("FR" = Ryanair), so the
   *  client can filter the calendar to a single carrier. */
  airlines: Record<string, string>;
  /** The origin these fares are for — echoed so the client can show it and
   *  populate the selector when the origin was inferred rather than requested. */
  origin: string;
  /** True when `origin` came from the visitor's country rather than the query. */
  detected: boolean;
};

// A response built from an explicit ?origin= is identical for every visitor, so
// it can sit on the CDN. An auto-detected one varies by country and must not be
// shared — the upstream Travelpayouts call is still cached per origin either way,
// so skipping the edge cache here costs a little latency, not an extra API call.
const publicCache = {
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
};
const privateCache = { "Cache-Control": "private, no-store" };

export async function GET(request: NextRequest) {
  const iata = request.nextUrl.searchParams.get("iata")?.trim().toUpperCase();
  if (!iata || !/^[A-Z]{3}$/.test(iata)) {
    return NextResponse.json({ error: "Missing or invalid iata" }, { status: 400 });
  }

  const requested = request.nextUrl.searchParams.get("origin")?.trim().toUpperCase();
  const explicit = !!requested && /^[A-Z]{3}$/.test(requested);

  const origin = explicit
    ? requested!
    : (ORIGIN_BY_COUNTRY[countryOf(request) ?? ""] ?? FALLBACK_ORIGIN);

  const headers = explicit ? publicCache : privateCache;
  const empty = (): TpCalendarResponse => ({ dates: {}, airlines: {}, origin, detected: !explicit });

  // A calendar from an airport to itself has no meaning and the upstream returns
  // an error page for it.
  if (origin === iata) return NextResponse.json(empty(), { headers });

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) return NextResponse.json(empty(), { headers });

  const url =
    `https://api.travelpayouts.com/v1/prices/calendar` +
    `?origin=${origin}&destination=${iata}&currency=usd` +
    `&calendar_type=departure_date&token=${token}`;

  try {
    // The upstream call is keyed on this URL, so visitors sharing an origin
    // share one cached fetch even when the outer response isn't cacheable.
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return NextResponse.json(empty(), { headers });

    const json: unknown = await res.json();
    const data = (json as { data?: Record<string, CalendarEntry> })?.data;
    if (!data || typeof data !== "object") {
      return NextResponse.json(empty(), { headers });
    }

    const dates: Record<string, number> = {};
    const airlines: Record<string, string> = {};
    for (const [date, entry] of Object.entries(data)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      if (typeof entry?.price !== "number" || !Number.isFinite(entry.price)) continue;
      dates[date] = Math.round(entry.price);
      if (typeof entry.airline === "string" && entry.airline) airlines[date] = entry.airline;
    }

    return NextResponse.json({ dates, airlines, origin, detected: !explicit }, { headers });
  } catch {
    // Upstream hiccup — degrade to an empty calendar rather than a 500.
    return NextResponse.json(empty(), { headers });
  }
}
