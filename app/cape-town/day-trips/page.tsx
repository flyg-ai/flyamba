import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Cape Town 2026 — Best Excursions Guide | Flyamba",
  description:
    "The best day trips from Cape Town — the Stellenbosch and Franschhoek winelands, Hermanus whale watching, Gansbaai shark cage diving, a Big Five day safari and Cape Agulhas, with distances and tips.",
  alternates: { canonical: `${SITE}/cape-town/day-trips` },
  openGraph: { title: "Best Day Trips from Cape Town | Flyamba", description: "Winelands, whales, sharks and safari — the best excursions from Cape Town.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Wine", keys: ["wine"] },
  { label: "Water", keys: ["water"] },
  { label: "Nature", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Cape Town", item: `${SITE}/cape-town` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/cape-town/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        address: { "@type": "PostalAddress", addressRegion: "Western Cape", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CapeTownDayTrips() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Cape Town"
      heroImage="/images/cape-town/day-trips/stellenbosch-vingardar.webp"
      intro="Cape Town is the gateway to some of South Africa's finest experiences, most within easy reach for a day. Taste your way through the Stellenbosch and Franschhoek winelands, watch southern right whales from the cliffs at Hermanus, cage-dive with great white sharks at Gansbaai, spot the Big Five on a day safari or stand at the continent's true southern tip at Cape Agulhas. Here are the best excursions, with distances, durations and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Cape Town in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
