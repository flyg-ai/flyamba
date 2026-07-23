// Destination prices in the catalog are stored as SEK integers (the data was
// seeded from the Swedish sibling project, flyg-ai). Flyamba targets an
// international/USD audience, so we convert for display at a fixed rate.
// Barcelona: 1290 SEK ≈ $123, matching its authored lowestPrice "$128".
const SEK_PER_USD = 10.5;

export function usd(sek: number): number {
  return Math.round(sek / SEK_PER_USD);
}

/** SEK integer → "$123" display string. */
export function usdStr(sek: number): string {
  return `$${usd(sek).toLocaleString()}`;
}

/** SEK → USD rounded to the nearest $5 (for price charts). */
export function usd5(sek: number): number {
  return Math.round(usd(sek) / 5) * 5;
}

