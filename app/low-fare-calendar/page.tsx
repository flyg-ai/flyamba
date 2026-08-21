import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { CALENDAR_DESTINATIONS, CALENDAR_AIRLINES, lowFareHref } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";
import { CalendarRange, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";

// Index for /low-fare-calendar. Without it the parent of the [slug] routes would
// 404, which would also break the breadcrumb trail those pages emit.
export const metadata: Metadata = {
  title: "Low Fare Calendar — Cheapest Days to Fly | Flyamba",
  description:
    "Compare flight prices day by day for 22 destinations and 6 airlines. Find the cheapest dates to fly and book when prices are lowest.",
  alternates: { canonical: `${SITE}/low-fare-calendar` },
  openGraph: { title: "Low Fare Calendar — Cheapest Days to Fly | Flyamba", description: "Compare flight prices day by day and find the cheapest dates to fly." },
};


export default function LowFareCalendarIndex() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-32 sm:px-6">
        <Breadcrumbs items={[{ name: "Flyamba", href: "/" }, { name: "Low Fare Calendar" }]} />
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <CalendarRange className="h-3.5 w-3.5" /> Low fare calendar
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Low Fare Calendar — Find the Cheapest Days to Fly
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Flight prices change every single day. Pick a destination or an airline to see a month of fares at a glance,
          then choose your dates and book when prices are lowest.
        </p>

        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">By destination</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CALENDAR_DESTINATIONS.map((d) => (
              <Link
                key={d.slug}
                href={lowFareHref(d.slug)}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{d.city}</span>
                  <span className="block text-xs text-muted-foreground">
                    {d.country} · {d.iata}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">By airline</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CALENDAR_AIRLINES.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}/low-fare-calendar`}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent"
              >
                <span>
                  <span className="block text-sm font-semibold text-foreground">{a.name}</span>
                  <span className="block text-xs text-muted-foreground">{a.tagline}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
