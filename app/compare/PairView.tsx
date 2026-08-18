"use client";

import { useState } from "react";
import { ComparisonTable } from "./ComparisonTable";
import { AiRecommendation } from "./AiRecommendation";
import type { Comparable } from "./comparable";

// Client half of the static /compare/<a>-vs-<b> page. Exists only to hold the
// winner slug: the AI recommendation produces it and the table consumes it, and
// the page itself is a server component that can't own that state.
//
// autoGenerate is deliberately false here — a static comparison page must be
// complete and useful without ever calling Anthropic, and pre-generating on
// every crawl of 20 pair pages would burn API calls on bots.

export function PairView({ pair }: { pair: Comparable[] }) {
  const [winnerSlug, setWinnerSlug] = useState<string | null>(null);

  const names = Object.fromEntries(pair.map((d) => [d.slug, d.name]));

  return (
    <>
      <ComparisonTable selected={pair} winnerSlug={winnerSlug} />
      <AiRecommendation
        slugs={pair.map((d) => d.slug)}
        names={names}
        onWinner={setWinnerSlug}
        autoGenerate={false}
      />
    </>
  );
}
