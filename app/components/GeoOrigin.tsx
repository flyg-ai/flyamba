"use client";

import { useEffect } from "react";
import { originTpNameFromCookie, writeOriginCookie } from "@/app/lib/origins";

/**
 * Writes a sane default origin cookie on first visit, site-wide.
 *
 * WHY THIS EXISTS. AviasalesWidget on destination pages only ever reads the
 * origin cookie — it never resolves one itself, because doing that
 * server-side would make every static destination page dynamic (see
 * app/api/geo-origin/route.ts). A first-time visitor who lands directly on a
 * destination page therefore had no cookie and no fromName prop, so the
 * widget sent no from_name at all and Kiwi's own embed guessed instead —
 * observed giving Sundsvall (a tiny Swedish regional airport) even to a
 * visitor on a page reached from Atlanta. See RememberOrigin.tsx for the
 * other half of this: an explicit departure-city choice.
 *
 * Mounted once in the root layout. Fires one small request on first paint of
 * a visitor's session and never again once the cookie exists, so it costs
 * nothing on repeat navigations. Renders nothing.
 */
export function GeoOrigin() {
  useEffect(() => {
    if (originTpNameFromCookie()) return;
    let cancelled = false;
    fetch("/api/geo-origin")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { origin?: string } | null) => {
        if (!cancelled && data?.origin) writeOriginCookie(data.origin);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
