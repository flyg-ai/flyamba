import { NextRequest, NextResponse } from "next/server";
import { CALENDAR_DESTINATIONS } from "@/app/lib/low-fare";
import { supabaseServer, isSupabaseServerConfigured } from "@/app/lib/supabase-server";

// Nightly pre-fetch of Travelpayouts fares into the `daily_prices` table.
//
// Why it exists: every "from $X" on the site currently comes from
// ALL_DESTINATIONS.monthlyPrices, which are Stockholm-origin fares in SEK
// inherited from flyg.ai. They are the wrong number for this audience and they
// never change. This job stores real per-day fares per origin so the site can
// quote something true.
//
// Runs on Vercel Cron (see vercel.json). Vercel sends
// `Authorization: Bearer $CRON_SECRET`; without a matching CRON_SECRET the route
// 401s, so it cannot be triggered by anyone who finds the URL.
//
// Deliberately sequential with a small delay. Travelpayouts rate-limits, and a
// nightly job has no reason to be fast — 22 destinations × 2 origins is under a
// minute either way.

export const runtime = "nodejs";
// Never cached, never statically evaluated: it writes.
export const dynamic = "force-dynamic";
export const maxDuration = 300;

/** Origins to pre-fetch. Override with CRON_ORIGINS="LON,JFK,LAX". */
const ORIGINS = (process.env.CRON_ORIGINS ?? "LON,JFK")
  .split(",")
  .map((o) => o.trim().toUpperCase())
  .filter((o) => /^[A-Z]{3}$/.test(o));

/** How far ahead to store. The upstream returns ~10 months; most of that tail is
 *  stale guesswork by the time anyone books it. */
const HORIZON_DAYS = 180;

const DELAY_MS = 250;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type CalendarEntry = { price?: number; airline?: string; return_at?: string; departure_at?: string };

type PriceRow = {
  slug: string;
  origin: string;
  price_from: number;
  departure_date: string;
  airline: string | null;
  direct_flight: boolean | null;
  valid_date: string;
};

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchRoute(
  slug: string,
  iata: string,
  origin: string,
  token: string,
  today: string,
  horizon: string,
): Promise<PriceRow[]> {
  const url =
    `https://api.travelpayouts.com/v1/prices/calendar` +
    `?origin=${origin}&destination=${iata}&currency=usd` +
    `&calendar_type=departure_date&token=${token}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`upstream ${res.status}`);

  const json = (await res.json()) as { data?: Record<string, CalendarEntry> };
  const data = json?.data;
  if (!data || typeof data !== "object") return [];

  const rows: PriceRow[] = [];
  for (const [date, entry] of Object.entries(data)) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    if (date < today || date > horizon) continue;
    if (typeof entry?.price !== "number" || !Number.isFinite(entry.price)) continue;
    rows.push({
      slug,
      origin,
      price_from: Math.round(entry.price),
      departure_date: date,
      airline: typeof entry.airline === "string" && entry.airline ? entry.airline : null,
      // v1/prices/calendar does not say whether the fare is nonstop. Leaving it
      // null is honest; writing `false` would assert something we did not check.
      direct_flight: null,
      valid_date: today,
    });
  }
  return rows;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET is not configured" }, { status: 500 });
  }
  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.TRAVELPAYOUTS_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "TRAVELPAYOUTS_API_TOKEN is not configured" }, { status: 500 });
  }
  if (!isSupabaseServerConfigured || !supabaseServer) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }
  if (ORIGINS.length === 0) {
    return NextResponse.json({ error: "CRON_ORIGINS produced no valid origins" }, { status: 500 });
  }

  const now = new Date();
  const today = ymd(now);
  const horizon = ymd(new Date(now.getTime() + HORIZON_DAYS * 86_400_000));

  let written = 0;
  let routes = 0;
  const failures: string[] = [];

  for (const origin of ORIGINS) {
    for (const dest of CALENDAR_DESTINATIONS) {
      // A calendar from an airport to itself has no meaning upstream.
      if (dest.iata === origin) continue;
      routes++;

      try {
        const rows = await fetchRoute(dest.slug, dest.iata, origin, token, today, horizon);
        if (rows.length) {
          // Keyed on (slug, origin, departure_date) — see the unique index in
          // supabase/schema.sql. Re-running the job refreshes rather than
          // duplicating.
          const { error } = await supabaseServer
            .from("daily_prices")
            .upsert(rows, { onConflict: "slug,origin,departure_date" });
          if (error) throw new Error(`supabase: ${error.message}`);
          written += rows.length;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        failures.push(`${origin}→${dest.slug}: ${message}`);
        console.error(`[cron/prices] ${origin}→${dest.slug} failed:`, message);
      }

      await sleep(DELAY_MS);
    }
  }

  const summary = {
    ok: failures.length === 0,
    routes,
    origins: ORIGINS,
    rowsWritten: written,
    failed: failures.length,
    failures: failures.slice(0, 10),
    ranAt: new Date().toISOString(),
  };
  console.log("[cron/prices]", JSON.stringify(summary));

  // 200 even with partial failures: a handful of thin routes returning nothing
  // is normal, and a non-200 makes Vercel retry the whole sweep.
  return NextResponse.json(summary);
}
