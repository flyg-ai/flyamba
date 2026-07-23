import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Palma 2026 — Guide | Flyamba",
  description:
    "The best things to do in Palma de Mallorca — La Seu Cathedral, Bellver Castle, the old town, Es Baluard, the Sóller train and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/palma/attractions` },
  openGraph: { title: "Best Things to Do in Palma | Flyamba", description: "Top Palma attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "History", keys: ["history"] },
  { label: "Art", keys: ["art"] },
  { label: "Views", keys: ["views"] },
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
          { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/palma/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Palma", addressRegion: "Mallorca", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function PalmaAttractions() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Palma"
      heroImage="/images/palma/sevardheter/palmas-katedral-la-seu.webp"
      intro="Palma packs a remarkable amount into a walkable, sun-washed capital — a colossal Gothic cathedral rising from the sea wall, a labyrinth of medieval lanes and palaces, a circular hilltop castle, world-class art museums and a vintage mountain railway that carries you into the UNESCO Serra de Tramuntana. Here are the attractions worth building your Palma trip around, with prices, opening hours and tips to beat the crowds."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
