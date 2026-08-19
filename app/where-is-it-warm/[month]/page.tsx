import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { MonthSelector } from "@/app/components/MonthSelector";
import { WarmBrowser } from "@/app/components/WarmBrowser";
import { FlightCTA } from "@/app/components/FlightCTA";
import { buildDestinations } from "@/app/lib/climate";
import { MONTHS, monthIndexOf, warmHref, WARM_BASE } from "../months";
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

export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> {
  const { month } = await params;
  const i = monthIndexOf(month);
  if (i === null) return { title: "Not found — Flyamba", robots: { index: false } };
  const label = MONTHS[i].label;

  // PLACEHOLDER COPY — real per-month titles and descriptions come in a later pass.
  const title = clampTitle(`Where Is It Warm in ${label}? — Warmest Destinations | Flyamba`);
  const description = clampDescription(
    `Find the warmest places to travel in ${label}. Filter by temperature, region and trip type to see where the sun is.`,
  );
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

  return (
    <div className="min-h-screen bg-background">
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

        {/* PLACEHOLDER COPY — real H1 and intro come in a later pass. */}
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Where Is It Warm in {label}?
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Placeholder intro for {label}. Drag the temperature range to set how warm you want it, then narrow
          by region or trip type. Every destination shows its average daily high for {label}.
        </p>

        <div className="mt-8">
          <MonthSelector current={month} />
        </div>

        <div className="mt-8">
          <WarmBrowser destinations={destinations} monthLabel={label} />
        </div>

        <section className="mt-16">
          <FlightCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
}
