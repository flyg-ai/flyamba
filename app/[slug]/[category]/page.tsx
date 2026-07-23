import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestination } from "@/app/data/destinations";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { ArrowRight } from "lucide-react";

// Barcelona's categories are served by static app/barcelona/* pages; this
// dynamic route handles every other city's category as an on-demand page.
export const dynamicParams = true;

const CATEGORY_LABELS: Record<string, string> = {
  attractions: "Attractions",
  restaurants: "Restaurants",
  hotels: "Hotels",
  transport: "Transport",
  weather: "Weather",
  prices: "Prices",
  nightlife: "Nightlife",
  beaches: "Beaches",
  shopping: "Shopping",
  "with-kids": "With kids",
  "day-trips": "Day trips",
};

const labelFor = (c: string) => CATEGORY_LABELS[c] ?? c.charAt(0).toUpperCase() + c.slice(1);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}): Promise<Metadata> {
  const { slug, category } = await params;
  const d = getDestination(slug);
  if (!d) return { title: "Not found — Flyamba", robots: { index: false } };
  return {
    title: `${labelFor(category)} in ${d.city} — Guide Coming Soon | Flyamba`,
    description: `Our full ${labelFor(category).toLowerCase()} guide for ${d.city} is on the way. In the meantime, search cheap flights to ${d.city} with Flyamba.`,
    // Placeholder pages shouldn't be indexed until they have real content.
    robots: { index: false },
  };
}

export default async function CategoryComingSoon({
  params,
}: {
  params: Promise<{ slug: string; category: string }>;
}) {
  const { slug, category } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const label = labelFor(category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: "Flyamba", href: "/" },
            { name: d.city, href: `/${d.slug}` },
            { name: label },
          ]}
        />

        <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/40 p-10 text-center">
          <p className="text-4xl">{d.countryFlag ?? "✈️"}</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            {label} in {d.city} — coming soon
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            We&apos;re building our complete {d.city} guide. In the meantime, search cheap flights to {d.city} below, or
            head back to the {d.city} overview.
          </p>
          <Link
            href={`/${d.slug}`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            ← Back to {d.city} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Flight search widget */}
        <div className="mt-10">
          <h2 className="mb-4 font-serif text-2xl font-semibold text-foreground">Cheap flights to {d.city}</h2>
          <AviasalesWidget toName={d.tpName || ""} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
