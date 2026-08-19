import Link from "next/link";
import { Plane, ArrowRight } from "lucide-react";

/**
 * "Ready to go?" call to action.
 *
 * It used to be hardcoded to Barcelona — city, price and all — and linked out to
 * `skyscanner.com/flights/bcn/`. Three things were wrong with that. It rendered on
 * eleven hub pages about other cities, so Dubai and Phuket both advertised Barcelona
 * at $128. The Skyscanner path is an *origin* airport, so the link searched for
 * flights leaving Barcelona rather than going there. And Skyscanner links are
 * deliberately non-affiliate with rel="nofollow noopener" (see CLAUDE.md), so the
 * most prominent button on the page sent the visitor away for no revenue.
 *
 * It now links inward, to the destination's own page, which carries the search
 * widget and the Travelpayouts affiliate deep links.
 *
 * `priceFrom` is a formatted string the caller passes in — never derived here. The
 * catalog holds two price scales that disagree by roughly 2× (`destinations.ts`
 * prices Barcelona at $123, `all-destinations.ts` at $257), so deriving a number
 * would contradict the hero on the very page this box sits in. Passing the string
 * the page already renders keeps the two consistent by construction.
 */
export function FlightCTA({
  destination,
  priceFrom,
  className = "",
}: {
  /** The destination this page is about. Omit on pages that have no single one. */
  destination?: { slug: string; name: string };
  /** Already formatted, e.g. "$128" — usually `usdStr(LOWEST_SEK)`. */
  priceFrom?: string;
  className?: string;
}) {
  const href = destination ? `/${destination.slug}` : "/explore";
  const label = destination ? `Find flights to ${destination.name}` : "Browse destinations";
  const body = destination
    ? `Compare live fares to ${destination.name} across airlines and book direct${
        priceFrom ? ` — from around ${priceFrom}` : ""
      }.`
    : "Compare live fares across hundreds of destinations and book direct.";

  return (
    <div
      className={`rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-8 text-center sm:p-10 ${className}`}
    >
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-accent-foreground shadow-glow">
        <Plane className="h-6 w-6 -rotate-45" />
      </div>
      <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Ready to go?</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
