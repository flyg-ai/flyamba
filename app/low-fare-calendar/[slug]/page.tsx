import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import PrisKalender from "@/app/components/PrisKalender";
import { CALENDAR_DESTINATIONS, CALENDAR_BY_SLUG, lowFareHref, type CalendarDestination } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { ArrowRight, CalendarRange } from "lucide-react";

export function generateStaticParams() {
  return CALENDAR_DESTINATIONS.map((d) => ({ slug: d.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = CALENDAR_BY_SLUG.get(slug);
  if (!d) return { title: "Not found — Flyamba", robots: { index: false } };

  const title = clampTitle(`Low Fare Calendar ${d.city} — Cheapest Flight Dates | Flyamba`);
  const description = clampDescription(
    `Find the cheapest days to fly to ${d.city}. Compare flight prices day by day and book when prices are lowest.`,
  );
  const canonical = `${SITE}${lowFareHref(d.slug)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

function faqFor(d: CalendarDestination): FaqItem[] {
  return [
    {
      q: `When is the cheapest time to fly to ${d.city}?`,
      a: `${d.cheapest} is typically the cheapest month to fly to ${d.city}, and ${d.priciest} the most expensive. ${d.pattern} The calendar above shows the actual cached fare for each day, so you can see where the cheap dates fall rather than relying on the seasonal average.`,
    },
    {
      q: `Which day of the week is cheapest to fly to ${d.city}?`,
      a: `Tuesday and Wednesday departures are usually the cheapest, with Friday evenings and Sunday returns the most expensive. On short-haul routes, shifting a trip by a single day either side of the weekend often saves more than switching airline.`,
    },
    {
      q: `How far in advance should I book flights to ${d.city}?`,
      a: `Six to eight weeks ahead is the reliable window for most routes, and two to three months for long-haul or peak-season travel. Booking very late occasionally works on quiet routes, but for ${d.priciest} departures the fare almost always rises as the aircraft fills.`,
    },
    {
      q: `Which airlines fly to ${d.city}?`,
      a: `${d.airlines} all serve ${d.city}. Flight time is ${d.flightTime}. Fares in the calendar are the cheapest cached round trip for each date, whichever carrier is operating it.`,
    },
    {
      q: `Which airport does ${d.city} use?`,
      a: `${d.airport}. Prices in the calendar are round trip and shown in US dollars; selecting a departure and a return takes you straight through to the booking site with both dates filled in.`,
    },
  ];
}

export default async function LowFareCalendarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = CALENDAR_BY_SLUG.get(slug);
  if (!d) notFound();

  const faq = faqFor(d);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
        { "@type": "ListItem", position: 2, name: "Low Fare Calendar", item: `${SITE}/low-fare-calendar` },
        { "@type": "ListItem", position: 3, name: d.city, item: `${SITE}${lowFareHref(d.slug)}` },
      ],
    },
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

  const others = CALENDAR_DESTINATIONS.filter((x) => x.slug !== d.slug).slice(0, 12);

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
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <CalendarRange className="h-3.5 w-3.5" /> Low fare calendar
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Low Fare Calendar {d.city} — Cheapest Days to Fly
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          See the cheapest round-trip fare for every day to {d.city} ({d.iata}) at a glance, then pick your dates and
          go straight through to booking.
        </p>

        {/* Calendar */}
        <div className="mt-10">
          <PrisKalender destinationIata={d.iata} destinationCity={d.city} />
        </div>

        {/* Long-form intro */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            When is the cheapest time to fly to {d.city}?
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Flight prices to {d.city} move far more than most travelers expect. The same route, booked for a
              Tuesday instead of a Friday, routinely costs a third less — and across a full year the gap between the
              cheapest and most expensive month is often more than double. A low fare calendar makes that visible:
              instead of checking dates one at a time, you see the whole month at once and can spot where the cheap
              days actually fall.
            </p>
            <p>
              On this route, <strong className="text-foreground">{d.cheapest}</strong> is typically the cheapest month
              and <strong className="text-foreground">{d.priciest}</strong> the most expensive. {d.pattern} That
              seasonal shape is the single biggest factor in what you pay, and it is worth planning around before you
              start comparing individual airlines.
            </p>
            <p>
              The day of the week matters almost as much. Midweek departures — Tuesday and Wednesday in particular —
              are consistently cheaper than weekend ones, because leisure demand clusters around Friday evenings and
              Sunday returns. Flying out and back midweek regularly halves the fare for exactly the same trip. If your
              dates are flexible by even a day or two, that flexibility is usually worth more than any loyalty
              programme or discount code.
            </p>
            <p>
              Booking lead time is the third lever. For {d.city}, six to eight weeks ahead is the reliable window, and
              two to three months for peak-season travel. Fares generally rise as the aircraft fills, so the
              last-minute bargain is far rarer than its reputation suggests — especially in {d.priciest}, when planes
              sell out regardless of price. Off-season, prices often stay flat until close to departure, which gives
              you more room to wait.
            </p>
            <p>
              {d.city} is served by {d.airlines}, flying into {d.airport}, with a flight time of {d.flightTime}. The
              calendar above draws on cached round-trip fares from real searches, so the days shown as cheap are ones
              travelers were genuinely quoted. Prices are in US dollars and update daily. Empty squares simply mean no
              fare has been cached for that day yet — not that no flight exists.
            </p>
          </div>
        </section>

        <FaqSection items={faq} city={d.city} />

        {/* Cross-links */}
        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Low fare calendars for other destinations
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={lowFareHref(o.slug)} className="text-muted-foreground transition hover:text-accent">
                {o.city} low fare calendar →
              </Link>
            ))}
          </div>
          <Link
            href={`/${d.slug}#explore`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
          >
            Full {d.city} travel guide <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
