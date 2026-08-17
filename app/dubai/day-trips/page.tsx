import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Dubai 2026 — Guide | Flyamba",
  description:
    "The best day trips from Dubai — Abu Dhabi and the Sheikh Zayed Grand Mosque, the mountains of Hatta, the oasis city of Al Ain, cultural Sharjah, the…",
  alternates: { canonical: `${SITE}/dubai/day-trips` },
  openGraph: { title: "Best Day Trips from Dubai | Flyamba", description: "Six great day trips from Dubai, from Abu Dhabi to Musandam, with directions.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half-day", keys: ["half-day"] },
  { label: "Full-day", keys: ["full-day"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Adventure", keys: ["adventure"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/dubai/day-trips` },
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

export default function DubaiDayTrips() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Dubai"
      heroImage="/images/dubai/day-trips/abu-dhabi.webp"
      intro="Dubai makes a superb base for exploring the wider Emirates and beyond. Within a couple of hours you can stand inside the breathtaking Sheikh Zayed Grand Mosque in Abu Dhabi, kayak a turquoise dam in the Hatta mountains, wander the palm oases of Al Ain, dive into the cultural heritage of Sharjah, cruise the fjords of Musandam across the Oman border, or snorkel the clearer east-coast waters at Fujairah. Here are the six best excursions, with travel times, costs and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Dubai in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
