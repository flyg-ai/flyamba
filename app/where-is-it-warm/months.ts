// Month constants for /where-is-it-warm/<month>. No imports — this file is pulled
// in by both the server route and the client browser component, so it must stay
// free of anything server-only.

export const MONTHS = [
  { slug: "january", label: "January", short: "Jan" },
  { slug: "february", label: "February", short: "Feb" },
  { slug: "march", label: "March", short: "Mar" },
  { slug: "april", label: "April", short: "Apr" },
  { slug: "may", label: "May", short: "May" },
  { slug: "june", label: "June", short: "Jun" },
  { slug: "july", label: "July", short: "Jul" },
  { slug: "august", label: "August", short: "Aug" },
  { slug: "september", label: "September", short: "Sep" },
  { slug: "october", label: "October", short: "Oct" },
  { slug: "november", label: "November", short: "Nov" },
  { slug: "december", label: "December", short: "Dec" },
] as const;

export type MonthSlug = (typeof MONTHS)[number]["slug"];

export const WARM_BASE = "/where-is-it-warm";

export function warmHref(slug: string) {
  return `${WARM_BASE}/${slug}`;
}

/** Month index (0–11) for a slug, or null when the slug is not one of the twelve. */
export function monthIndexOf(slug: string): number | null {
  const i = MONTHS.findIndex((m) => m.slug === slug);
  return i === -1 ? null : i;
}
