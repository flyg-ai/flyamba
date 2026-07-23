import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Lisbon 2026 — Guide | Flyamba",
  description:
    "The best day trips from Lisbon — fairytale Sintra, coastal Cascais, medieval Óbidos, the beaches of Setúbal & Arrábida, UNESCO Évora and the Fátima sanctuary, with how to get there by train and bus.",
  alternates: { canonical: `${SITE}/lisbon/day-trips` },
  openGraph: { title: "Best Day Trips from Lisbon | Flyamba", description: "Sintra, Cascais, Óbidos, Évora and more from Lisbon.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "History", keys: ["history"] },
  { label: "Nature & beaches", keys: ["nature"] },
  { label: "Beaches", keys: ["beaches"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/lisbon/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        address: { "@type": "PostalAddress", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonDayTrips() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Lisbon"
      heroImage="/images/lisbon/dagsutflykter/sintra.webp"
      intro="Some of the finest experiences on a Lisbon trip lie just outside the city. The fairytale palaces of Sintra and the genteel coast of Cascais are barely 40 minutes away by train, while a little further afield wait the medieval walls of Óbidos, the turquoise coves of the Arrábida park, the UNESCO-listed Alentejo city of Évora and the great pilgrimage sanctuary of Fátima. Here are the best day trips from Lisbon, with distances, how to get there and how to plan each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Lisbon in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
