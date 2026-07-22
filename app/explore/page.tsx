import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { HomeCard } from "@/app/components/HomeCard";
import { destinations } from "@/app/data/destinations";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Destinations by Trip Type | Flyamba",
  description: "Browse flight destinations by the kind of trip you want — beach & sun, city breaks, romantic getaways, family holidays, adventure, culture and long haul.",
};

// Map homepage trip-type labels to catalog categories / heuristics.
const TYPE_TO_CATEGORY: Record<string, (c: string) => boolean> = {
  "Beach & Sun": (c) => c === "Beach & Sun",
  "City Break": (c) => c === "City Breaks",
  "Long Haul": (c) => c === "Long Haul",
};

function ExploreInner({ type }: { type?: string }) {
  const list = type
    ? destinations.filter((d) => (TYPE_TO_CATEGORY[type] ? TYPE_TO_CATEGORY[type](d.category) : true))
    : destinations;
  const shown = list.length ? list : destinations;

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
        <Compass className="h-3.5 w-3.5" /> Explore
      </p>
      <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
        {type ? `${type} destinations` : "Explore destinations"}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
        {type
          ? `Handpicked ${type.toLowerCase()} destinations — describe your trip on the home page and Flyamba's AI finds the cheapest flights.`
          : "Browse our destinations, or describe your dream trip on the home page and let AI do the searching."}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((d) => (
          <HomeCard key={d.slug} d={d} />
        ))}
      </div>

      <div className="mt-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          ← Back to AI flight search
        </Link>
      </div>
    </main>
  );
}

export default async function ExplorePage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense>
        <ExploreInner type={type} />
      </Suspense>
      <Footer />
    </div>
  );
}
