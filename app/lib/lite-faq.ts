import { climateYear, type MonthClimate } from "@/app/lib/climate";
import { fareCopyFor, priceAnswer } from "@/app/lib/fare-copy";
import type { FaqItem } from "@/app/components/FaqSection";

/**
 * The FAQ for lite destination pages: up to three questions, every figure read
 * from the same tables the page's other sections read, so the four can never
 * disagree.
 *
 * GATED ON THE MEASURED CLIMATE YEAR. climateYear() is null for gpt_seed
 * destinations, and null here means NO section — the two weather questions are
 * what guarantees the FAQ is never a single thin question, so without them
 * nothing renders. The price question joins only where we hold a fare; a page
 * must not ask a question it cannot answer with data.
 *
 * The price answer is priceAnswer() verbatim — the same sentence the hub pages
 * put in their FAQPage schema, so hubs and lite pages answer "how much" under
 * identical rules: observed fares only, origin and seen-date named, cheapest
 * month claimed only at six observed months or more.
 *
 * SERVER ONLY — both readers hold the service-role client.
 */

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const f = (c: number) => Math.round(c * 1.8 + 32);
const inches = (mm: number) => (mm / 25.4).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function warmAnswer(name: string, months: MonthClimate[]): string {
  let warm = 0, cool = 0;
  months.forEach((m, i) => {
    if (m.tempC > months[warm].tempC) warm = i;
    if (m.tempC < months[cool].tempC) cool = i;
  });
  const warmCount = months.filter((m) => f(m.tempC) >= 75).length;
  const closing = "These are ten-year averages (2015–2024) of measured observations, not estimates.";

  if (warmCount === 12) {
    const lo = Math.min(...months.map((m) => f(m.tempC)));
    const hi = Math.max(...months.map((m) => f(m.tempC)));
    return `It is warm in ${name} all year: every month averages a daily high between ${lo}°F and ${hi}°F. ${closing}`;
  }
  if (warmCount === 0) {
    return `No month in ${name} averages a daily high of 75°F or warmer — the warmest is ${FULL_MONTHS[warm]} at ${f(months[warm].tempC)}°F, and the coolest is ${FULL_MONTHS[cool]} at ${f(months[cool].tempC)}°F. ${closing}`;
  }
  return `${FULL_MONTHS[warm]} is the warmest month in ${name}, averaging a daily high of ${f(months[warm].tempC)}°F, and ${warmCount} of the 12 months average 75°F or warmer. The coolest is ${FULL_MONTHS[cool]} at ${f(months[cool].tempC)}°F. ${closing}`;
}

function currentMonthAnswer(name: string, months: MonthClimate[], monthIndex: number): string {
  const m = months[monthIndex];
  const parts = [
    `In ${FULL_MONTHS[monthIndex]}, ${name} averages a daily high of ${f(m.tempC)}°F` +
      (m.tempMinC != null ? ` and an overnight low of ${f(m.tempMinC)}°F` : ""),
  ];
  if (m.precipitationMm != null) parts.push(`about ${inches(m.precipitationMm)} inches of rain fall across the month`);
  if (m.seaTempC != null) parts.push(`the sea averages ${f(m.seaTempC)}°F`);
  return `${parts.join("; ")}. Ten-year measured averages — an individual week can differ.`;
}

/** Null when the page holds no measured climate year — then no FAQ renders at all. */
export async function buildLiteFaq(slug: string, name: string): Promise<FaqItem[] | null> {
  const months = await climateYear(slug);
  if (!months) return null;

  const items: FaqItem[] = [];

  const copy = await fareCopyFor(slug);
  if (copy.amount) {
    items.push({ q: `How much is a round trip flight to ${name}?`, a: priceAnswer(name, copy) });
  }

  const monthIndex = new Date().getMonth();
  items.push({ q: `When is it warm in ${name}?`, a: warmAnswer(name, months) });
  items.push({
    q: `What is the weather like in ${name} in ${FULL_MONTHS[monthIndex]}?`,
    a: currentMonthAnswer(name, months, monthIndex),
  });

  return items;
}

/** The FAQPage schema for the items — mirrors the visible section exactly. */
export function liteFaqJsonLd(items: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };
}
