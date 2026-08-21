import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { AirlineCalendarPicker } from "@/app/components/AirlineCalendarPicker";
import { CALENDAR_BY_SLUG, lowFareHref, type CalendarAirline } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";
import { ArrowRight, CalendarRange } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";

export function airlineFaq(a: CalendarAirline, cities: string): FaqItem[] {
  return [
    {
      q: `When are ${a.name} flights cheapest?`,
      a: `Tuesday and Wednesday departures are consistently the cheapest, with Friday evenings and Sunday returns the most expensive. Across the year, late January to early March and the first half of November are the cheapest windows on most ${a.name} routes.`,
    },
    {
      q: `How far in advance should I book ${a.name} flights?`,
      a: `Six to eight weeks ahead is the reliable window for short-haul, and two to three months for long-haul or peak-season travel. ${a.name} fares generally rise as the aircraft fills, so waiting rarely pays off on busy routes.`,
    },
    {
      q: `What is included in a ${a.name} fare?`,
      a: a.baggage,
    },
    {
      q: `Where does ${a.name} fly from?`,
      a: `${a.name} operates from ${a.hub}. This calendar covers ${cities}, showing the cheapest cached round-trip fare for each day.`,
    },
    {
      q: `Does the calendar show only ${a.name} flights?`,
      a: `Yes — the calendar is filtered to departures operated by ${a.name} (carrier code ${a.code}). Days without a price simply have no cached ${a.name} fare, which on thinner routes is common; the destination calendars show every carrier if you want the full picture.`,
    },
  ];
}

export function AirlineCalendarView({ airline }: { airline: CalendarAirline }) {
  const destinations = airline.destinations
    .map((slug) => CALENDAR_BY_SLUG.get(slug))
    .filter((d): d is NonNullable<typeof d> => !!d)
    .map((d) => ({ slug: d.slug, city: d.city, iata: d.iata }));

  const cityNames = destinations.map((d) => d.city);
  const citiesSentence = `${cityNames.slice(0, -1).join(", ")} and ${cityNames.at(-1)}`;
  const faq = airlineFaq(airline, citiesSentence);
  const url = `${SITE}/${airline.slug}/low-fare-calendar`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
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
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pb-20 pt-32 sm:px-6">
        <Breadcrumbs items={[{ name: "Flyamba", href: "/" }, { name: "Low Fare Calendar", href: "/low-fare-calendar" }, { name: airline.name }]} />
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <CalendarRange className="h-3.5 w-3.5" /> Low fare calendar
        </p>

        <div className="mt-4 flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-border bg-white p-2">
            <Image src={airline.logo} alt={`${airline.name} logo`} width={56} height={56} className="h-full w-full object-contain" />
          </span>
          <div>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              {airline.name} Low Fare Calendar — Find Cheapest Flight Dates
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{airline.tagline}</p>
          </div>
        </div>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Pick a destination and see the cheapest {airline.name} fare for every day, then choose your dates and go
          straight through to booking.
        </p>

        {/* Calendar with destination switcher */}
        <div className="mt-10">
          <AirlineCalendarPicker destinations={destinations} airlineCode={airline.code} airlineName={airline.name} />
        </div>

        {/* Long-form intro */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            How to fly cheap with {airline.name}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            {airline.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Top destinations */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Top {airline.name} destinations
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={lowFareHref(d.slug)}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{d.city}</span>
                  <span className="block text-xs text-muted-foreground">{d.iata} · all airlines</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>

        <FaqSection items={faq} city={airline.name} heading={`Flying ${airline.name} — your questions answered`} />

        <section className="mt-14 text-center">
          <Link
            href="/low-fare-calendar"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
          >
            All low fare calendars <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
