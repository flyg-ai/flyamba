import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Rome 2026 — Guide | Flyamba",
  description:
    "The best day trips from Rome — Tivoli's UNESCO villas, ancient Ostia Antica, Pompeii and Naples, Florence by fast train, hilltop Orvieto and the wine towns of the Castelli Romani, with train times and tips.",
  alternates: { canonical: `${SITE}/rome/day-trips` },
  openGraph: { title: "Best Day Trips from Rome | Flyamba", description: "Six great day trips from Rome, from Tivoli and Ostia to Pompeii and Florence, with directions.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half-day", keys: ["half-day"] },
  { label: "Full-day", keys: ["full-day"] },
  { label: "Ancient Sites", keys: ["ancient"] },
  { label: "Hill Towns", keys: ["hill-towns"] },
  { label: "UNESCO", keys: ["unesco"] },
  { label: "By Train", keys: ["train"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/rome/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function RomeDayTrips() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Rome"
      heroImage="/images/rome/dagsutflykter/tivoli-villa-deste-hadrians-villa.webp"
      intro="Rome makes a superb base for exploring central Italy. Within an hour you can wander the fountain-gardens of Tivoli, the ancient port of Ostia Antica or the wine towns of the Castelli Romani; a fast train reaches Naples, Pompeii or even Florence for the day. Here are the six best excursions, each with realistic travel times, ticket prices and tips on how to make the most of a day away from the city."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Rome in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
