import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Dubrovnik 2026 — Guide | Flyamba",
  description:
    "The 20 best things to do in Dubrovnik — walk the medieval city walls, ride the Srđ cable car, explore Fort Lovrijenac, Lokrum island, the Rector's Palace and Game of Thrones locations, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/dubrovnik/attractions` },
  openGraph: { title: "Best Things to Do in Dubrovnik | Flyamba", description: "20 top Dubrovnik attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Architecture", keys: ["architecture"] },
  { label: "Museums", keys: ["museum"] },
  { label: "Views", keys: ["views"] },
  { label: "Nature & Islands", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/dubrovnik/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function DubrovnikAttractions() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Dubrovnik"
      heroImage="/images/dubrovnik/attractions/gamla-stadens-murar.webp"
      intro="Few cities pack so much into so small a space. Dubrovnik's entire Old Town is a car-free UNESCO masterpiece ringed by the most complete medieval walls in Europe, with red-roofed palaces, Baroque churches and cliff-top forts inside, a cable car and a green island just beyond, and Game of Thrones scenes around every corner. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips to dodge the cruise-ship crowds."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
