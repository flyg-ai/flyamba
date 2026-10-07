import { NextRequest, NextResponse } from "next/server";
import { originForCountry } from "@/app/lib/origins";

// Resolves the visitor's likely departure airport from the edge-provided
// country header, for GeoOrigin.tsx to write as a cookie on first visit.
//
// WHY A ROUTE AND NOT A SERVER COMPONENT READ. Destination pages are static
// (force-static) so the CDN can cache them — reading headers() there would
// make every one of them dynamic. This tiny route carries that one dynamic
// read instead, fetched client-side behind the widget's own defer, so it
// never blocks the page.
export const runtime = "edge";

export async function GET(request: NextRequest) {
  const header = request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry");
  const code = header?.trim().toUpperCase();
  const country = code && code !== "XX" && /^[A-Z]{2}$/.test(code) ? code : null;
  const origin = originForCountry(country);
  return NextResponse.json({ origin }, { headers: { "Cache-Control": "private, max-age=0" } });
}
