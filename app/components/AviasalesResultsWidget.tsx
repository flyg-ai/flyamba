"use client";

import { useEffect, useRef } from "react";

interface Props {
  /** Aviasales destination place code, e.g. "barcelona_es". */
  toName: string;
  /** Origin place code, e.g. "oslo_no". Omit for IP-based origin detection. */
  fromName?: string;
}

/**
 * Prefilled flight-results widget shown when the AI detects a booking intent.
 * The parent passes a `key` derived from toName+fromName so this remounts on
 * each new search — the loadedRef guard then only suppresses StrictMode's
 * double-invocation within a single mount.
 */
export function AviasalesResultsWidget({ toName, fromName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loadedRef.current || !toName) return;
    loadedRef.current = true;
    container.innerHTML = "";
    const fromParam = fromName ? `from_name=${fromName}&` : "";
    const script = document.createElement("script");
    script.src = `https://tpwdg.com/content?currency=usd&trs=508580&shmarker=711264.711264&powered_by=false&locale=en&${fromParam}to_name=${toName}&searchUrl=search.jetradar.com&show_header=false&limit=3&primary_color=FF6B35&results_background_color=FFFFFF&form_background_color=FFFFFF&campaign_id=111&promo_id=4478`;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);
  }, [toName, fromName]);

  return <div ref={containerRef} style={{ minHeight: 360 }} />;
}
