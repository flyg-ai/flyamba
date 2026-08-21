import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips in Singapore 2026 — Guide | Flyamba",
  description:
    "The best day trips from Singapore — the resort island of Sentosa, rustic Pulau Ubin, Johor Bahru and Legoland Malaysia, the Indonesian islands of Bintan…",
  alternates: { canonical: `${SITE}/singapore/day-trips` },
  openGraph: { title: "Best Day Trips from Singapore | Flyamba", description: "6 top day trips from Singapore, from islands to neighbouring countries.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Malaysia", keys: ["malaysia"] },
  { label: "Indonesia", keys: ["indonesia"] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Nature", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeDayTrips() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Singapore"
      heroImage="/images/singapore/dagsutflykter/johor-bahru-malaysia.webp"
      intro="Compact Singapore makes a superb springboard for adventures beyond the city-state. Hop the monorail to Sentosa's beaches and theme parks, ride a bumboat to the rustic kampong island of Pulau Ubin, cross the Causeway to Malaysia for cheap shopping and Legoland, or catch a fast ferry to the Indonesian resort islands of Bintan and Batam. For a bigger add-on, Kuala Lumpur is an hour away by air. Here are 6 rewarding day trips and short escapes, with travel times, costs and tips — remember your passport for the international ones."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
