import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Reykjavik 2026 — Guide | Flyamba",
  description:
    "The best day trips from Reykjavik — the Golden Circle, the Blue Lagoon, the South Coast waterfalls and black beaches, Snæfellsnes, the Reykjanes…",
  alternates: { canonical: `${SITE}/reykjavik/day-trips` },
  openGraph: { title: "Day Trips from Reykjavik | Flyamba", description: "Golden Circle, Blue Lagoon, waterfalls, glaciers and volcanoes — the best day trips from Reykjavik.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Classic", keys: ["classic"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Spa", keys: ["spa"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/reykjavik/day-trips` },
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

export default function ReykjavikDayTrips() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Reykjavik"
      heroImage="/images/reykjavik/day-trips/golden-circle.webp"
      intro="Reykjavik is the perfect launchpad for Iceland's raw natural wonders, most of which are within a day's reach. Loop the classic Golden Circle of Þingvellir, Geysir and Gullfoss, soak in the milky-blue Blue Lagoon near the airport, chase the South Coast's waterfalls and black-sand beaches, explore the 'Iceland in miniature' Snæfellsnes Peninsula, walk on a glacier at Sólheimajökull, or wander the volcanic Reykjanes on your way to the airport. Here are the best day trips, with travel times, costs and tips on driving versus organised tours."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
