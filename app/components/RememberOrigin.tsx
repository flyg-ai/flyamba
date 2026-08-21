"use client";

import { useEffect } from "react";
import { writeOriginCookie } from "@/app/lib/origins";

/**
 * Records the departure city so the next page can pre-fill from it.
 *
 * Someone on /cheap-flights-from-atlanta has told us where they are. Clicking
 * through to a destination used to throw that away and fall back to the IP guess
 * — the widget was seen offering Sundsvall on a page reached from Atlanta.
 *
 * A COOKIE RATHER THAN ?from=ATL, for one reason. Destination pages are static.
 * A query parameter would have to be read either on the server, which makes the
 * page dynamic, or after hydration, which makes the widget change its mind after
 * first paint. The cookie is read by the widget itself when it mounts, so the
 * page stays exactly as static as it was and the fix works from any entry point,
 * not only from a link that happened to carry the parameter.
 *
 * Renders nothing. It only writes.
 */
export function RememberOrigin({ iata }: { iata: string }) {
  useEffect(() => {
    writeOriginCookie(iata);
  }, [iata]);

  return null;
}
