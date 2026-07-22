"use client";

import { useEffect, useRef } from "react";

interface Props {
  toName: string;
}

export function AviasalesWidget({ toName }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loadedRef.current || !toName) return;
    loadedRef.current = true;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = `https://tpwdg.com/content?currency=usd&trs=508580&shmarker=711264.711264&powered_by=false&locale=en&to_name=${toName}&show_header=true&searchUrl=search.jetradar.com&campaign_id=111&promo_id=4478&limit=5`;
    script.async = true;
    script.charset = "utf-8";
    container.appendChild(script);
  }, [toName]);

  return <div ref={containerRef} style={{ minHeight: 400 }} />;
}
