"use client";

import { useEffect, useRef, useState } from "react";
import { originTpNameFromCookie } from "@/app/lib/origins";

/**
 * Travelpayouts search widget, mounted only once the visitor is near it.
 *
 * The script is the page's single biggest cost: Lighthouse on /barcelona
 * attributes 1,061 ms of CPU and 382 KiB to widgets.kiwi.com, which tpwdg.com
 * pulls in, plus the Google Analytics and GTM tags it loads on its own — none
 * of which appear in our own bundles. Deferring the script until it is needed
 * moves all of it off the critical path.
 *
 * MIN_HEIGHT reserves the space so the injected iframe doesn't push the page
 * down when it arrives; that shift is worth most of a page's CLS if the box
 * starts collapsed. If Travelpayouts changes its layout, re-measure — too small
 * reintroduces the shift, too large leaves a visible gap.
 */
const MIN_HEIGHT = 400;

/** Start loading this far before the widget scrolls into view. */
const ROOT_MARGIN = "400px";

interface Props {
  toName: string;
  /**
   * Overrides the visitor's saved origin. Leave it out and the widget reads the
   * cookie itself — see below.
   */
  fromName?: string;
}

/**
 * PRE-FILLING THIS WIDGET IS SUPPORTED AND DOCUMENTED IN ITS OWN SCRIPT.
 *
 * flyg.ai tried three speculative approaches at this — data attributes on the
 * mount node, parameters in the script URL, and a window-scoped config object —
 * and none is recorded as having worked. Those attempts were against a DIFFERENT
 * PRODUCT: the white-label widget at tpwdg.com/wl_web/main.js. This is
 * tpwdg.com/content, which parses its own script.src in a getParams() helper and
 * maps eleven named parameters onto data attributes:
 *
 *   if (url_params["from_name"]) js.setAttribute("data-from", ...)
 *   if (url_params["to_name"])   js.setAttribute("data-to",   ...)
 *
 * So from_name is simply the symmetric partner of the to_name already in use.
 * Do not repeat flyg.ai's three experiments; they answer a question about
 * another widget. CLAUDE.md lists all eleven parameters.
 */
export function AviasalesWidget({ toName, fromName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // No IntersectionObserver (very old browsers, some crawlers) — load
    // immediately rather than never rendering the widget at all.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!visible || !container || loadedRef.current || !toName) return;

    // The origin is read HERE, on mount, rather than passed down from the page.
    // Every destination page is static; reading the cookie in a server component
    // would make it dynamic, costing TTFB and fragmenting the CDN cache to solve
    // a problem the client can solve for free. The widget already mounts behind
    // an IntersectionObserver, so by the time this runs the cookie is available
    // and the page has long since been served from the edge.
    const origin = fromName ?? originTpNameFromCookie();
    const fromParam = origin ? `from_name=${origin}&` : "";
    loadedRef.current = true;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = `https://tpwdg.com/content?currency=usd&trs=508580&shmarker=711264.flyamba&powered_by=false&locale=en&${fromParam}to_name=${toName}&show_header=true&searchUrl=search.jetradar.com&campaign_id=111&promo_id=4478&limit=5`;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);
  }, [visible, toName, fromName]);

  return <div ref={containerRef} style={{ minHeight: MIN_HEIGHT }} />;
}
