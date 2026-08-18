import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Madrid 2026 — Toledo, Segovia & More",
  description:
    "The best day trips from Madrid — UNESCO Toledo (33 min by train), Segovia's Roman aqueduct, El Escorial, walled Ávila, cliff-top Cuenca, Aranjuez's…",
  alternates: { canonical: `${SITE}/madrid/day-trips` },
  openGraph: { title: "Best Day Trips from Madrid | Flyamba", description: "8 unmissable day trips from Madrid by train and road.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half day", keys: ["halvdag"] },
  { label: "Full day", keys: ["heldag"] },
  { label: "By train", keys: ["tag"] },
  { label: "Culture", keys: ["kultur", "culture"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Madrid", item: `${SITE}/madrid` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/madrid/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((t) => ({
        "@type": "TouristAttraction",
        name: t.name,
        description: t.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, reviewCount: t.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MadridDayTrips() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Madrid"
      heroImage="/images/madrid/day-trips/costa-brava-landscape-madrid.webp"
      intro="Few capitals make a better base for day trips than Madrid. Spain's high-speed AVE trains put a string of extraordinary UNESCO cities within 90 minutes: medieval Toledo in just 33 minutes, Segovia with its colossal Roman aqueduct and fairy-tale castle in 30, cliff-hanging Cuenca in an hour. Add Philip II's monumental El Escorial, the perfectly walled city of Ávila, the royal gardens of Aranjuez, Cervantes' Alcalá de Henares and pretty Chinchón, and you have a week of unforgettable excursions. Here are eight of the best, with distances, transport and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
