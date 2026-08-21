import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from New York 2026 — Guide | Flyamba",
  description:
    "The best day trips from New York — historic Philadelphia, the glamorous Hamptons, the scenic Hudson Valley, Storm King sculpture park, Sleepy Hollow and…",
  alternates: { canonical: `${SITE}/new-york/day-trips` },
  openGraph: { title: "Day Trips from New York | Flyamba", description: "History, beaches, art and river valleys — the best day trips from New York.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Nature", keys: ["nature"] },
  { label: "History", keys: ["history"] },
  { label: "Weekend", keys: ["weekend"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...DAY_TRIPS.map((t) => ({
        "@type": "TouristAttraction",
        name: t.name,
        description: t.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, reviewCount: t.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function NewYorkDayTrips() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from New York"
      heroImage="/images/new-york/day-trips/costa-brava-landscape-new-york.webp"
      intro="New York is the perfect launch pad for the north-east. In little more than an hour by Amtrak you can be walking the Revolutionary streets of Philadelphia; a Metro-North train carries you up the scenic Hudson Valley to riverside villages and glorious autumn colour; the Hampton Jitney reaches the beaches and old-money charm of Long Island's East End; and Storm King's monumental sculptures, spooky Sleepy Hollow and mighty Niagara Falls round out the options. Here are the best day trips and short escapes, with travel times, costs and tips on which are worth an overnight."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
