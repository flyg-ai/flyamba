import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { FaqSection } from "@/app/components/FaqSection";
import { CopyText } from "@/app/components/CopyText";
import { MonthSelector } from "@/app/components/MonthSelector";
import { WarmBrowser } from "@/app/components/WarmBrowser";
import { buildDestinations } from "@/app/lib/climate";
import { MONTHS, monthIndexOf, warmHref, WARM_BASE } from "../months";
import { MONTH_COPY } from "../copy";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { Sun } from "lucide-react";

export function generateStaticParams() {
  return MONTHS.map((m) => ({ month: m.slug }));
}
export const dynamicParams = false;
// climate.ts reads Supabase with cache: "no-store" so a database fix cannot be
// served from a stale .next/cache. That would otherwise mark this route dynamic;
// force-static keeps all twelve pages prerendered at build time.
export const dynamic = "force-static";
// Daily, for the same reason the hub has it: the cards now carry a real fare and
// a "seen Aug 19" stamp, and a force-static page with no revalidate would still
// be claiming Aug 19 in November. Twelve regenerations a day is nothing.
//
// force-static and revalidate are not in conflict — the first decides that the
// page is prerendered rather than request-time, the second how often that
// prerender is refreshed. force-static is here because climate.ts reads Supabase
// with cache: "no-store", which would otherwise mark the route dynamic; do not
// remove either one without reading the note in app/lib/climate.ts.
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  const i = monthIndexOf(month);
  if (i === null) return { title: "Not found — Flyamba", robots: { index: false } };
  const copy = MONTH_COPY[MONTHS[i].slug];
  const title = clampTitle(copy.title);
  const description = clampDescription(copy.description);
  const canonical = `${SITE}${warmHref(month)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default async function WhereIsItWarmMonth({ params }: { params: Promise<{ month: string }> }) {
  const { month } = await params;
  const monthIndex = monthIndexOf(month);
  if (monthIndex === null) notFound();
  const label = MONTHS[monthIndex].label;

  // Read at build time. destination-facts.ts and the Supabase client stay on the
  // server; WarmBrowser only ever receives the narrow WarmDestination shape.
  const destinations = await buildDestinations(monthIndex);
  const copy = MONTH_COPY[MONTHS[monthIndex].slug];

  // FAQPage schema is only legitimate because the questions render below. A
  // schema-only FAQ is a structured-data violation, not a shortcut.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: copy.faq.map((f) => ({
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\u003c") }}
        />
      ))}
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Flyamba", href: "/" },
            { name: "Where Is It Warm", href: WARM_BASE },
            { name: label },
          ]}
        />

        <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <Sun className="h-3.5 w-3.5" /> Where is it warm
        </p>

        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          {copy.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy.intro}</p>

        <div className="mt-8">
          <MonthSelector current={month} />
        </div>

        <div className="mt-8">
          <WarmBrowser destinations={destinations} monthLabel={label} />
        </div>

        {/* Long-form copy sits below the grid on purpose: the grid is what the
            visitor came for, and the prose is what the page gets found on. */}
        {copy.sections.map((section) => (
          <section key={section.h2} className="mt-16 max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">{section.h2}</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              {section.body.map((para, i) => (
                <p key={i}>
                  <CopyText text={para} />
                </p>
              ))}
            </div>
          </section>
        ))}
        <section className="mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Next steps</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link
              href="/low-fare-calendar"
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <p className="font-serif text-lg font-semibold text-foreground">Cheapest dates to fly</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Day-by-day fares for our busiest routes — {label} is often peak season.
              </p>
            </Link>
            <Link
              href="/guides"
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <p className="font-serif text-lg font-semibold text-foreground">Destination guides</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Attractions, food, hotels and what a trip really costs, city by city.
              </p>
            </Link>
            <Link
              href={WARM_BASE}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <p className="font-serif text-lg font-semibold text-foreground">Another month</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Compare all twelve — where is warm, and what it costs to get there.
              </p>
            </Link>
          </div>
        </section>
      </main>

      <FaqSection items={copy.faq} city={label} heading={`Where is it warm in ${label} — your questions answered`} />

      <div className="pb-20" />

      <Footer />
    </div>
  );
}
