import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Palma 2026 — Guide | Flyamba",
  description:
    "The best day trips from Palma de Mallorca — the Sóller valley and its vintage train, the mountain villages of Valldemossa and Deià, medieval Alcúdia, the Caves of Drach, Cap de Formentor and Sa Calobra.",
  alternates: { canonical: `${SITE}/palma/day-trips` },
  openGraph: { title: "Day Trips from Palma | Flyamba", description: "The best day trips across Mallorca from Palma, with distances and travel tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Mountains", keys: ["mountains"] },
  { label: "Villages", keys: ["villages"] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Caves", keys: ["caves"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
          { "@type": "ListItem", position: 3, name: "Day trips", item: `${SITE}/palma/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        address: { "@type": "PostalAddress", addressRegion: "Mallorca", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PalmaDayTrips() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Palma"
      heroImage="/images/palma/dagsutflykter/sa-calobra.webp"
      intro="Palma sits at the hub of an island made for exploring, and some of Mallorca's most spectacular sights are an easy day trip away. Ride the vintage train into the Sóller valley, wander the honey-stone mountain villages of Valldemossa and Deià, explore medieval walled Alcúdia and its vast bay beach, descend into the illuminated Caves of Drach, or brave the hairpin drives to Cap de Formentor and Sa Calobra. Here are the best day trips, with distances and how to get there."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Palma in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
