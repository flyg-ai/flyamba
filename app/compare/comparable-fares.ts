import { COMPARABLE, type Comparable } from "./comparable";
import { sortPrices } from "@/app/lib/fare-display";

/**
 * Fills `priceUsd` on the comparable set from observed New York fares.
 *
 * SERVER ONLY — it reaches fares.ts, which carries the service-role Supabase
 * client. comparable.ts itself stays free of it because CompareClient is a "use
 * client" component and imports COMPARABLE: pulling a Supabase reader in there
 * would drag the server bundle across the boundary.
 *
 * NEW YORK ONLY, not the display chain. Every column in a comparison has to be
 * measured the same way; a table where Barcelona shows a New York price and Rome
 * a Miami one ranks two different questions against each other. 23 of the 25
 * comparable cities have a New York fare. The other two — New York itself, which
 * has no NYC-to-NYC route, and Gran Canaria — keep `priceUsd` undefined, show an
 * em dash and cannot win the price row.
 */
export async function comparableWithFares(): Promise<Comparable[]> {
  const nyc = await sortPrices();
  return COMPARABLE.map((c) => (nyc[c.slug] != null ? { ...c, priceUsd: nyc[c.slug] } : c));
}

export async function getComparableWithFare(slug: string): Promise<Comparable | undefined> {
  return (await comparableWithFares()).find((c) => c.slug === slug);
}

/** Just the prices, for handing to a client component as a plain object. */
export async function comparableFareMap(): Promise<Record<string, number>> {
  const nyc = await sortPrices();
  const out: Record<string, number> = {};
  for (const c of COMPARABLE) if (nyc[c.slug] != null) out[c.slug] = nyc[c.slug];
  return out;
}
