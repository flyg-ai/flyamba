"use client";

import { useEffect, useRef, useState } from "react";

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
}

export function AviasalesWidget({ toName }: Props) {
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
    loadedRef.current = true;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = `https://tpwdg.com/content?currency=usd&trs=508580&shmarker=711264.flyamba&powered_by=false&locale=en&to_name=${toName}&show_header=true&searchUrl=search.jetradar.com&campaign_id=111&promo_id=4478&limit=5`;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);
  }, [visible, toName]);

  return <div ref={containerRef} style={{ minHeight: MIN_HEIGHT }} />;
}
