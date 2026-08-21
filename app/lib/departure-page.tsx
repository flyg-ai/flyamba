import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { RememberOrigin } from "@/app/components/RememberOrigin";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { DEPARTURES, DEPARTURE_BY_SLUG, departureHref, headingName } from "@/app/lib/departures";
import { getDepartureData, type DepartureRoute } from "@/app/lib/departure-data";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { Plane, Sun, ArrowRight } from "lucide-react";

/**
 * ONE FOLDER PER CITY, NOT A DYNAMIC SEGMENT.
 *
 * `app/cheap-flights-from-[city]` looks like a dynamic route and is not one:
 * Next treats a bracketed name as a parameter only when it is the WHOLE folder
 * name. That folder was served as a literal path, the params function never ran,
 * one page built instead of fourteen — and the build reported success either way.
 *
 * The alternative shape is /cheap-flights/[city], which changes the URL. The
 * search term is "cheap flights from atlanta", so the phrase stays in the path
 * and each city gets a thin route file that calls this.
 */

const f = (c: number) => Math.round(c * 1.8 + 32);

/**
 * "we found" is load-bearing, not hedging.
 *
 * The page lists the routes Travelpayouts returned for this origin, which is not
 * every route that exists — it is what a live search surfaced in the last two
 * days. "All cheap flights from Atlanta" would be a claim we cannot support, and
 * the same rule governs the title, the H1 and every line of body copy.
 */
export function departureMetadata(city: string): Metadata {
  const d = DEPARTURE_BY_SLUG.get(city);
  if (!d) return { title: "Not found — Flyamba", robots: { index: false } };

  // headingName, the same function the H1 uses. The title is what Google renders
  // in the SERP, so the airport code has to be here for "cheap flights from msp"
  // to match on the strongest signal — and one function means the two can never
  // say different things about the same city.
  const title = clampTitle(`Cheap Flights from ${headingName(d)} — Fares We Found | Flyamba`);
  const description = clampDescription(
    `Real round-trip fares we found leaving ${d.city}, cheapest first, with the temperature at each destination this month.`,
  );
  const canonical = `${SITE}${departureHref(city)}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "website" } };
}

function RouteCard({ r }: { r: DepartureRoute }) {
  return (
    <Link
      href={`/${r.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={r.image}
          alt={`${r.name}, ${r.country}`}
          fill
          sizes="(max-width:639px) calc((100vw - 48px) / 2), (max-width:1023px) calc((100vw - 80px) / 3), 292px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {r.tempC != null && (
          <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur">
            {f(r.tempC)}°F
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="truncate font-serif text-lg font-semibold text-foreground">{r.name}</h3>
        <p className="truncate text-xs text-muted-foreground">{r.country}</p>
        <p className="mt-1.5 truncate text-xs font-medium text-accent">{r.fareLabel}</p>
      </div>
    </Link>
  );
}

export async function DeparturePage({ city }: { city: string }) {
  const d = DEPARTURE_BY_SLUG.get(city);
  if (!d) notFound();

  const monthIndex = new Date().getMonth();
  const { routes, warm, monthLabel, total } = await getDepartureData(d, monthIndex);

  const cheapest = routes.slice(0, 12);
  const others = DEPARTURES.filter((x) => x.slug !== d.slug).slice(0, 6);

  // Built from this city's own numbers, so no two pages open the same way. The
  // cheapest routes differ sharply — Phoenix to LA is $57, Minneapolis to LA is
  // $177 — and that difference is what keeps fourteen pages from being one page
  // with the name swapped.
  const lead = cheapest.slice(0, 3);
  const warmest = warm[0];

  const faq: FaqItem[] = [
    {
      q: `What is the cheapest place to fly from ${d.city} right now?`,
      a: lead.length
        ? `Of the fares we found leaving ${d.city}, the cheapest are ${lead.map((r) => `${r.name} at $${r.priceUsd}`).join(", ")} round trip. These are prices a live search returned in the last couple of days, not a standing offer — availability and price move daily.`
        : `We hold no current fares from ${d.city}. Check back after the next refresh.`,
    },
    {
      q: `Where is it warm right now if I fly from ${d.city}?`,
      a: warmest
        ? `${warmest.name} is the warmest destination we have a ${d.city} fare for this month at ${f(warmest.tempC!)}°F${warmest.seaTempC ? `, with the sea at ${f(warmest.seaTempC)}°F` : ""}. ${warm.length} of the destinations we found are above 75°F in ${monthLabel}.`
        : `None of the destinations we currently hold fares for from ${d.city} averages above 75°F in ${monthLabel}.`,
    },
    {
      q: `Is this every route from ${d.city}?`,
      a: `No. This page shows the ${total} destinations a live fare search returned for ${d.city} in the last two days, ranked by price. Airlines fly routes we have no current fare for, and thin routes often return nothing at all. Treat it as a snapshot of what was cheap, not a timetable.`,
    },
    {
      q: `When should I book a flight from ${d.city}?`,
      a: `Six to eight weeks ahead for domestic and short-haul, two to three months for long-haul or peak season. Midweek departures are consistently cheaper than Friday or Sunday, and shifting your dates by a day or two usually saves more than switching airline.`,
    },
  ];

  // No BreadcrumbList here. <Breadcrumbs> emits its own from the same items it
  // renders, and a hand-built copy alongside it meant two BreadcrumbLists on every
  // departure page — which drift apart the moment one is edited, as they would
  // have the moment /cheap-flights was added as the middle level.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      {/* Remembers this city so the destination pages pre-fill their search with
          it instead of guessing from the visitor's IP. */}
      <RememberOrigin iata={d.iata} />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        {/* Three levels, with /cheap-flights as the middle one. The hub links down
            to all fourteen; without this it links nowhere back, and the
            BreadcrumbList is what tells Google the hierarchy exists at all. The
            root keeps the site-wide "Flyamba" label rather than "Home", so the
            fourteen do not become the only pages with a second convention. */}
        <Breadcrumbs
          items={[
            { name: "Flyamba", href: "/" },
            { name: "Cheap flights", href: "/cheap-flights" },
            { name: d.city },
          ]}
        />

        <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <Plane className="h-3.5 w-3.5 -rotate-45" /> Departing {d.city}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Cheap Flights from {headingName(d)}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {/* headingName rather than d.city, so the three cities whose airport code
              is searched separately — MSP, SLC, LAX — carry it in the opening line
              as well as the H1. No separate /cheap-flights-from-msp page: that
              would be the same content at a second URL competing with this one. */}
          {lead.length >= 3 ? (
            <>
              The cheapest fares we found leaving {headingName(d)} right now are {lead[0].name} at $
              {lead[0].priceUsd}, {lead[1].name} at ${lead[1].priceUsd} and {lead[2].name} at ${lead[2].priceUsd}{" "}
              round trip. Below are {total} destinations we hold current fares for, cheapest first, with the average
              high at each one this month.
            </>
          ) : (
            <>We hold current fares for {total} destinations from {headingName(d)}, cheapest first.</>
          )}
        </p>

        {/* Cheapest */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Cheapest fares we found from {d.city}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Round-trip prices a live search returned in the last two days. They move daily and are not an offer —
            open a destination to search your own dates.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cheapest.map((r) => (
              <RouteCard key={r.slug} r={r} />
            ))}
          </div>
        </section>

        {/* Warm this month */}
        {warm.length > 0 && (
          <section className="mt-16">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <Sun className="h-3.5 w-3.5" /> Warm in {monthLabel}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Where it&rsquo;s warm from {d.city} this month
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              {warm.length} of the destinations we found average above 75°F in {monthLabel}.{" "}
              {warmest && warmest.seaTempC
                ? `${warmest.name} leads at ${f(warmest.tempC!)}°F with the sea at ${f(warmest.seaTempC)}°F.`
                : warmest
                  ? `${warmest.name} leads at ${f(warmest.tempC!)}°F.`
                  : ""}{" "}
              Temperatures are measured monthly averages, not forecasts.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {warm.slice(0, 8).map((r) => (
                <RouteCard key={r.slug} r={r} />
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/where-is-it-warm"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
              >
                See every warm destination, month by month <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* Everything else */}
        {routes.length > 12 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Everything else we found from {d.city}
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
              {routes.slice(12).map((r) => (
                <Link key={r.slug} href={`/${r.slug}`} className="truncate text-muted-foreground transition hover:text-accent">
                  {r.name} <span className="text-xs opacity-70">${r.priceUsd}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other departure cities */}
        <section className="mt-16">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Flying from somewhere else?</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={departureHref(o.slug)}
                className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                Cheap flights from {o.city}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <FaqSection items={faq} city={d.city} heading={`Flying from ${d.city} — your questions answered`} />

      <div className="pb-20" />
      <Footer />
    </div>
  );
}
