import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { DEPARTURES, departureHref, headingName } from "@/app/lib/departures";
import { getFaresByOrigin, formatFareLabelShort, type UsFare } from "@/app/lib/fares";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { Plane, ArrowRight } from "lucide-react";

/**
 * The hub the "Flights from" nav item points at.
 *
 * NOT AN ATTEMPT TO RANK FOR "CHEAP FLIGHTS". That term is KD 94 and belongs to
 * Kayak and Google Flights; writing two thousand words at it would be effort spent
 * on a position we are not going to reach. This page exists to give the nav item a
 * destination and to link the fourteen departure pages together, which are the
 * pages that can actually rank — median KD 2.
 *
 * WHICH IS WHY IT CARRIES REAL FARES RATHER THAN A LIST OF LINKS. A thin index
 * aimed at a head term is the shape of a doorway page, and Google treats it as one.
 * Every city here shows the cheapest route we currently hold and two runners-up,
 * read from origin_fares — the same numbers the departure pages show, so the hub
 * cannot quietly disagree with the page it links to.
 */

// fares.ts reads Supabase with cache: "no-store" so a refresh cannot be served
// from a stale .next/cache. That marks the route dynamic unless we say otherwise.
export const dynamic = "force-static";
// The cards carry a "seen Aug 19" stamp, so a page frozen at build time would be
// claiming August in November.
export const revalidate = 86400;

const TITLE = "Cheap Flights by Departure City | Flyamba";
const DESCRIPTION =
  "Pick your departure city and see the cheapest fares we found from it — fourteen US cities, real round-trip prices, updated daily.";

export const metadata: Metadata = {
  title: clampTitle(TITLE),
  description: clampDescription(DESCRIPTION),
  alternates: { canonical: `${SITE}/cheap-flights` },
  openGraph: {
    title: clampTitle(TITLE),
    description: clampDescription(DESCRIPTION),
    url: `${SITE}/cheap-flights`,
    type: "website",
  },
};

type Row = { slug: string; name: string; country: string; priceUsd: number; label: string };

type CityBlock = {
  slug: string;
  heading: string;
  city: string;
  state: string;
  href: string;
  routes: Row[];
  total: number;
};

async function buildCity(d: (typeof DEPARTURES)[number]): Promise<CityBlock> {
  const faresBySlug = await getFaresByOrigin(d.iata);
  const catalog = new Map(ALL_DESTINATIONS.map((x) => [x.slug, x]));

  const routes: Row[] = [];
  for (const [slug, options] of Object.entries(faresBySlug)) {
    const fare = options[0];
    const cat = catalog.get(slug);
    if (!fare || !cat) continue;
    // A route from a city to itself is not a route.
    if (cat.iata?.toUpperCase() === d.iata) continue;
    const usFare: UsFare = { fare, origin: d.iata as UsFare["origin"] };
    routes.push({
      slug,
      name: cat.name,
      country: cat.country,
      priceUsd: fare.priceUsd,
      // The origin is dropped: every row on this page already sits under its
      // departure city, so repeating the code adds a token to skip, not a fact.
      label: formatFareLabelShort(usFare, { showOrigin: false }),
    });
  }
  routes.sort((a, b) => a.priceUsd - b.priceUsd);

  return {
    slug: d.slug,
    heading: headingName(d),
    city: d.city,
    state: d.state,
    href: departureHref(d.slug),
    routes: routes.slice(0, 3),
    total: routes.length,
  };
}

export default async function CheapFlightsHub() {
  const blocks = await Promise.all(DEPARTURES.map(buildCity));

  // Alphabetical, matching the nav dropdown. Someone arriving here is looking for
  // their own city, and a list ordered by our search-volume research would make
  // them hunt for it.
  const ordered = [...blocks].sort((a, b) => a.city.localeCompare(b.city, "en"));
  const priced = ordered.filter((b) => b.routes.length > 0);
  const cheapest = [...priced].sort((a, b) => a.routes[0].priceUsd - b.routes[0].priceUsd).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        {/* <Breadcrumbs> emits the BreadcrumbList itself, so there is no hand-built
            copy here. The label matches the middle crumb on the fourteen departure
            pages exactly — two names for one level would describe two hierarchies
            to Google rather than one. */}
        <Breadcrumbs items={[{ name: "Flyamba", href: "/" }, { name: "Cheap flights" }]} />

        <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <Plane className="h-3.5 w-3.5 -rotate-45" /> Departure cities
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Cheap Flights by Departure City
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {cheapest.length === 3 ? (
            <>
              Where a flight is cheap depends almost entirely on where it leaves from. Right now the lowest fare we
              hold from any of these fourteen cities is {cheapest[0].routes[0].name} at ${cheapest[0].routes[0].priceUsd}{" "}
              round trip from {cheapest[0].city}, followed by {cheapest[1].routes[0].name} at $
              {cheapest[1].routes[0].priceUsd} from {cheapest[1].city} and {cheapest[2].routes[0].name} at $
              {cheapest[2].routes[0].priceUsd} from {cheapest[2].city}. Pick your airport below.
            </>
          ) : (
            <>
              Where a flight is cheap depends almost entirely on where it leaves from. Pick your airport below to see
              the fares we currently hold from it.
            </>
          )}
        </p>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Every price here is a round-trip fare a live search returned in the last couple of days, not a standing
          offer — availability and price move daily. These are the routes our search surfaced from each city, which is
          not every route an airline flies.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((b) => (
            <Link
              key={b.slug}
              href={b.href}
              prefetch={false}
              className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="font-serif text-xl font-semibold text-foreground">{b.heading}</h2>
                <span className="shrink-0 text-xs text-muted-foreground">{b.state}</span>
              </div>

              {b.routes.length > 0 ? (
                <ul className="mt-4 flex-1 space-y-2">
                  {b.routes.map((r) => (
                    <li key={r.slug} className="flex items-baseline justify-between gap-3">
                      <span className="min-w-0 truncate text-sm text-foreground/80">{r.name}</span>
                      <span className="shrink-0 text-xs font-medium text-accent">{r.label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                // No invented price. A city with nothing in origin_fares says so.
                <p className="mt-4 flex-1 text-sm text-muted-foreground">
                  No current fares — the next refresh may bring some back.
                </p>
              )}

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {b.total > 0 ? `All ${b.total} from ${b.city}` : `Open ${b.city}`}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Why the departure city decides the price
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              The same destination costs very different amounts depending on which airport you start from, and the gap
              is usually about competition rather than distance. A city where two or three carriers fight over the same
              route tends to price below one where a single airline owns the gate, even when the second airport is
              closer to where you are going.
            </p>
            <p>
              That is why these pages are organised by origin instead of by destination. Picking a destination first
              and then hunting for a fare gets the order backwards for anyone whose airport is fixed — which is almost
              everyone. Start from where you actually leave, and the cheapest place to go becomes an answer rather than
              a question.
            </p>
            <p>
              Once you have a destination in mind, the{" "}
              <Link href="/low-fare-calendar" className="text-accent underline-offset-4 hover:underline">
                low fare calendar
              </Link>{" "}
              shows which dates are cheapest on our busiest routes, and{" "}
              <Link href="/where-is-it-warm" className="text-accent underline-offset-4 hover:underline">
                where it&rsquo;s warm
              </Link>{" "}
              filters by the weather you will land in rather than by price alone.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
