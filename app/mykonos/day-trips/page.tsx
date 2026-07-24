import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Mykonos 2026 — Island Guide | Flyamba",
  description:
    "The best day trips from Mykonos — ancient Delos and empty-beach Rhenia next door, devout Tinos, green Naxos, laid-back Paros and a long full-day catamaran to spectacular Santorini, with ferry times and prices.",
  alternates: { canonical: `${SITE}/mykonos/day-trips` },
  openGraph: { title: "Best Day Trips from Mykonos | Flyamba", description: "6 great day trips from Mykonos, from Delos to Santorini.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "UNESCO", keys: ["unesco"] },
  { label: "Nearby", keys: ["nearby"] },
  { label: "Classic", keys: ["classic"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/mykonos/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        address: { "@type": "PostalAddress", addressRegion: "Cyclades", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MykonosDayTrips() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Mykonos"
      heroImage="/images/mykonos/day-trips/delos-unesco-ruiner.webp"
      intro="Mykonos sits in the heart of the Cyclades, so some of Greece's most rewarding islands are within easy ferry reach. The essential trip is ancient Delos, Apollo's birthplace, a short boat ride away — often combined with a swim off the uninhabited beaches of neighbouring Rhenia. Beyond that lie the quiet, devout traditions of Tinos, the green mountains and long beaches of Naxos, the laid-back charm of Paros, and — for the committed — a long full-day catamaran to spectacular Santorini. Here are 6 of the best day trips, with ferry times, prices and what to see. Book ahead in high season, as popular tours and fast ferries sell out."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Mykonos — in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
