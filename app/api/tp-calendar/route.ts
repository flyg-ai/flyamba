// Travelpayouts Data API — per-day cheapest fares for one origin → destination
// route, backing the <PrisKalender> price calendar.
//
// Ported from the flyg.ai / lagpriskalender implementation, with two changes for
// Flyamba: fares are requested in USD rather than SEK, and the origin is
// configurable (that project is Stockholm-only; Flyamba is international).
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

// Travelpayouts needs a concrete origin; there is no "anywhere" option. London
// is the default because it's the largest origin market for an English-language
// audience and leads the non-stop tables on every hub page.
const ORIGIN = process.env.TRAVELPAYOUTS_ORIGIN?.trim().toUpperCase() || "LON";

type CalendarEntry = { price?: number; airline?: string };

export type TpCalendarResponse = {
  /** "YYYY-MM-DD" → cheapest round-trip price in USD. */
  dates: Record<string, number>;
  /** Same keys as `dates` → operating airline IATA ("FR" = Ryanair), so the
   *  client can filter the calendar to a single carrier. */
  airlines: Record<string, string>;
  /** Echoed back so the UI can name the origin it is quoting. */
  origin: string;
};

const empty = (): TpCalendarResponse => ({ dates: {}, airlines: {}, origin: ORIGIN });

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
};

export async function GET(request: NextRequest) {
  const iata = request.nextUrl.searchParams.get("iata")?.trim().toUpperCase();
  if (!iata || !/^[A-Z]{3}$/.test(iata)) {
    return NextResponse.json({ error: "Missing or invalid iata" }, { status: 400 });
  }

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) return NextResponse.json(empty(), { headers: CACHE_HEADERS });

  const url =
    `https://api.travelpayouts.com/v1/prices/calendar` +
    `?origin=${ORIGIN}&destination=${iata}&currency=usd` +
    `&calendar_type=departure_date&token=${token}`;

  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return NextResponse.json(empty(), { headers: CACHE_HEADERS });

    const json: unknown = await res.json();
    const data = (json as { data?: Record<string, CalendarEntry> })?.data;
    if (!data || typeof data !== "object") {
      return NextResponse.json(empty(), { headers: CACHE_HEADERS });
    }

    const dates: Record<string, number> = {};
    const airlines: Record<string, string> = {};
    for (const [date, entry] of Object.entries(data)) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
      if (typeof entry?.price !== "number" || !Number.isFinite(entry.price)) continue;
      dates[date] = Math.round(entry.price);
      if (typeof entry.airline === "string" && entry.airline) airlines[date] = entry.airline;
    }

    return NextResponse.json({ dates, airlines, origin: ORIGIN }, { headers: CACHE_HEADERS });
  } catch {
    // Upstream hiccup — degrade to an empty calendar rather than a 500.
    return NextResponse.json(empty(), { headers: CACHE_HEADERS });
  }
}
