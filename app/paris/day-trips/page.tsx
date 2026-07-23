import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Paris 2026 — Guide | Flyamba",
  description:
    "The best day trips from Paris — the palace of Versailles, Monet's garden at Giverny, Disneyland Paris, the champagne cellars of Reims, the château of Fontainebleau and the Gothic cathedral of Chartres. Distances, train routes and tips.",
  alternates: { canonical: `${SITE}/paris/day-trips` },
  openGraph: { title: "Best Day Trips from Paris | Flyamba", description: "Versailles, Giverny, Champagne and more from Paris.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Palaces & châteaux", keys: ["palace"] },
  { label: "Nature & gardens", keys: ["nature"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Wine", keys: ["wine"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/paris/day-trips` },
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

export default function ParisDayTrips() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Paris"
      heroImage="/images/paris/dagsutflykter/versailles.webp"
      intro="Some of the finest experiences near Paris lie just beyond the city, and fast trains make them easy: Louis XIV's palace at Versailles is 40 minutes away, Monet's water-lily garden at Giverny under an hour, and the champagne cellars of Reims a 45-minute TGV ride. Add Disneyland Paris on the RER, the crowd-free grandeur of Fontainebleau and the sublime stained glass of Chartres, and you have a week's worth of excursions. Here are the six best, with distances, train routes and planning tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Paris in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
