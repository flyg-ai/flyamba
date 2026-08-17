import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Attractions in Dubai 2026 — Guide | Flyamba",
  description:
    "The best things to do in Dubai — the Burj Khalifa, Dubai Mall & Fountain, Palm Jumeirah, Museum of the Future, the old souks and Creek, a desert safari…",
  alternates: { canonical: `${SITE}/dubai/attractions` },
  openGraph: { title: "Best Things to Do in Dubai | Flyamba", description: "Dubai's top attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Views", keys: ["views"] },
  { label: "History", keys: ["history"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Desert & Nature", keys: ["nature"] },
  { label: "Family", keys: ["family"] },
  { label: "Free", keys: ["free"] },
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
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/dubai/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function DubaiAttractions() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Dubai"
      heroImage="/images/dubai/attractions/burj-khalifa.webp"
      intro="Dubai turns superlatives into sightseeing — the world's tallest building, its largest mall, a palm-shaped island and the highest observation wheel, all built from desert in a single generation. Yet alongside the futuristic spectacle sit the atmospheric old souks, the wind-tower lanes of Al Fahidi and the trading Creek where the city began, plus the timeless drama of a desert safari. Here are the attractions worth building your trip around, with prices, opening hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
