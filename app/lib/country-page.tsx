import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { buildDestinations, type WarmDestination } from "@/app/lib/climate";
import { COUNTRY_PAGES, regionOfContinent } from "@/app/lib/regions";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { MapPin, Sun, ArrowRight } from "lucide-react";

/**
 * The six country pages, chosen on measured US search volume.
 *
 * WHY A COUNTRY LEVEL AT ALL. "places to visit in spain" is 3,800/mo at KD 0 and
 * "spain cities" 5,800 at KD 4 — intent that no single city page answers. The
 * catalog already holds 35 Spanish destinations; what was missing was a page that
 * groups them.
 *
 * ONE FOLDER PER COUNTRY, not a dynamic segment, for the same reason the fourteen
 * departure pages are folders: `/spain` is the URL people search for, and a
 * bracketed folder is only dynamic when the brackets are the whole name.
 *
 * NOT A LINK LIST. Every destination card carries the observed fare and the
 * measured temperature for the current month, the same numbers the warm guide and
 * the destination pages show, so the three cannot disagree.
 */

const f = (c: number) => Math.round(c * 1.8 + 32);

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type CountryFacts = {
  /** Region the country sits in, after the Middle East / Eurasia merge. */
  region: string;
  /** Every catalog destination in the country, warmest first. */
  destinations: WarmDestination[];
  monthLabel: string;
};

export function countryMetadata(country: string): Metadata {
  const slug = COUNTRY_PAGES[country];
  if (!slug) return { title: "Not found — Flyamba", robots: { index: false } };

  const title = clampTitle(`Places to Visit in ${country} — Cities and Cheap Flights | Flyamba`);
  const description = clampDescription(
    `Where to go in ${country}: every city and island we track, with the fares we found and the temperature at each one this month.`,
  );
  const canonical = `${SITE}/${slug}`;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "website" } };
}

async function getFacts(country: string, monthIndex: number): Promise<CountryFacts | null> {
  const all = await buildDestinations(monthIndex);
  const destinations = all.filter((d) => d.country === country);
  if (!destinations.length) return null;
  return {
    region: regionOfContinent(destinations[0].continent),
    destinations,
    monthLabel: MONTHS[monthIndex],
  };
}

function DestinationCard({ d }: { d: WarmDestination }) {
  return (
    <Link
      href={`/${d.slug}`}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-elegant"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={d.image}
          alt={`${d.name}, ${d.country}`}
          fill
          sizes="(max-width:639px) calc((100vw - 48px) / 2), (max-width:1023px) calc((100vw - 80px) / 3), 292px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-2 top-2 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-neutral-900 shadow-sm backdrop-blur">
          {f(d.tempC)}°F
        </span>
      </div>
      <div className="p-3">
        <h3 className="truncate font-serif text-lg font-semibold text-foreground">{d.name}</h3>
        {/* No price invented where we hold none — the line simply does not render. */}
        {d.fareLabel ? (
          <p className="mt-1 truncate text-xs font-medium text-accent">{d.fareLabel}</p>
        ) : (
          <p className="mt-1 truncate text-xs text-muted-foreground">No current fare</p>
        )}
      </div>
    </Link>
  );
}

export async function CountryPage({ country }: { country: string }) {
  const slug = COUNTRY_PAGES[country];
  if (!slug) notFound();

  const monthIndex = new Date().getMonth();
  const facts = await getFacts(country, monthIndex);
  if (!facts) notFound();

  const { region, destinations, monthLabel } = facts;
  const priced = destinations.filter((d) => d.fare).sort((a, b) => a.fare!.fare.priceUsd - b.fare!.fare.priceUsd);
  const cheapest = priced.slice(0, 3);
  const warmest = destinations[0];
  const coolest = destinations[destinations.length - 1];
  const warm = destinations.filter((d) => d.tempC >= 24 && d.tempC <= 31);

  const faq: FaqItem[] = [
    {
      q: `How many places are there to visit in ${country}?`,
      a: `We track ${destinations.length} destinations in ${country}, from ${warmest.name} to ${coolest.name}. That is not every town in the country — it is the set we hold fares and measured climate data for, which is what makes a comparison between them worth anything.`,
    },
    {
      q: `Where is the cheapest place to fly in ${country} right now?`,
      a: cheapest.length
        ? `Of the fares we currently hold, the cheapest into ${country} are ${cheapest.map((d) => `${d.name} at $${d.fare!.fare.priceUsd}`).join(", ")} round trip from a US departure city. These are prices a live search returned in the last couple of days, not a standing offer.`
        : `We hold no current US fares into ${country}. Check back after the next refresh.`,
    },
    {
      q: `Where is it warm in ${country} in ${monthLabel}?`,
      a: warm.length
        ? `${warm.length} of the ${destinations.length} destinations we track in ${country} average between 75°F and 88°F in ${monthLabel}, with ${warmest.name} the warmest at ${f(warmest.tempC)}°F. ${coolest.name} is the coolest at ${f(coolest.tempC)}°F.`
        : `None of the ${destinations.length} destinations we track in ${country} averages above 75°F in ${monthLabel}. The warmest is ${warmest.name} at ${f(warmest.tempC)}°F.`,
    },
    {
      q: `What is the best way to plan a trip to ${country}?`,
      a: `Start from your own airport rather than from the destination. The same city costs very different amounts depending on where you leave from, so pick your departure city first, then let the fare decide which part of ${country} you go to.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((x) => ({
              "@type": "Question",
              name: x.q,
              acceptedAnswer: { "@type": "Answer", text: x.a },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        {/* The region has no page, so it renders as text and Breadcrumbs leaves it
            out of the schema — see the note there. */}
        <Breadcrumbs items={[{ name: "Flyamba", href: "/" }, { name: region }, { name: country }]} />

        <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <MapPin className="h-3.5 w-3.5" /> {region}
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Places to Visit in {country}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {cheapest.length >= 2 ? (
            <>
              We track {destinations.length} destinations in {country}. Right now the cheapest fares we hold are{" "}
              {cheapest[0].name} at ${cheapest[0].fare!.fare.priceUsd} and {cheapest[1].name} at $
              {cheapest[1].fare!.fare.priceUsd} round trip, and {warmest.name} is the warmest at {f(warmest.tempC)}°F
              this month.
            </>
          ) : (
            <>
              We track {destinations.length} destinations in {country}, with {warmest.name} the warmest at{" "}
              {f(warmest.tempC)}°F in {monthLabel}.
            </>
          )}
        </p>

        <section className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {country} cities and islands, warmest first
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Average daily high for {monthLabel}, measured rather than estimated, with the round-trip fare we found from
            a US departure city.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {destinations.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
        </section>

        {warm.length > 0 && (
          <section className="mt-16 max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              <Sun className="h-3.5 w-3.5" /> {monthLabel}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              What the weather is doing in {country} right now
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                {warm.length} of the {destinations.length} destinations we track in {country} sit between 75°F and 88°F
                in {monthLabel} — {warm.slice(0, 4).map((d) => d.name).join(", ")}
                {warm.length > 4 ? ` and ${warm.length - 4} more` : ""}. The spread across the country is{" "}
                {f(coolest.tempC)}°F to {f(warmest.tempC)}°F, which is wide enough that the month you can travel should
                decide the region, not the other way round.
              </p>
              <p>
                See{" "}
                <Link href={`/where-is-it-warm/${monthLabel.toLowerCase()}`} className="text-accent underline-offset-4 hover:underline">
                  everywhere that is warm in {monthLabel}
                </Link>
                , or start from your own airport on the{" "}
                <Link href="/cheap-flights" className="text-accent underline-offset-4 hover:underline">
                  departure city pages
                </Link>
                .
              </p>
            </div>
          </section>
        )}

        <section className="mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Next steps</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/cheap-flights"
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <p className="font-serif text-lg font-semibold text-foreground">Flights from your city</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Fourteen US departure cities, with the cheapest routes we hold from each.
              </p>
            </Link>
            <Link
              href="/where-is-it-warm"
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <p className="font-serif text-lg font-semibold text-foreground">Where it&rsquo;s warm</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick the month you can travel and see everywhere that is warm then.
              </p>
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            <ArrowRight className="h-3.5 w-3.5" />
            <Link href="/guides" className="underline-offset-4 hover:underline">
              Destination guides
            </Link>
          </p>
        </section>
      </main>

      <FaqSection items={faq} city={country} heading={`Visiting ${country} — your questions answered`} />

      <div className="pb-20" />

      <Footer />
    </div>
  );
}
