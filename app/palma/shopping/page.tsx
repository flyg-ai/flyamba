import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Palma 2026 — Guide | Flyamba",
  description:
    "Where to shop in Palma de Mallorca — the luxury boulevards of the Born and Jaume III, the Olivar food market, Rialto Living, Santa Catalina boutiques, El Corte Inglés and Mallorcan pearls.",
  alternates: { canonical: `${SITE}/palma/shopping` },
  openGraph: { title: "Shopping in Palma | Flyamba", description: "The best Palma shopping, from luxury avenues to markets and souvenirs.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Boutiques", keys: ["boutiques"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
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
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/palma/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Palma", addressRegion: "Mallorca", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PalmaShopping() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Palma"
      heroImage="/images/content/photo-1483985988355-763728e1935b.avif"
      intro="Palma is one of the best shopping cities in the Balearics, mixing international luxury on the elegant Passeig del Born and Avinguda Jaume III with characterful independent boutiques in Santa Catalina, bustling food markets full of edible souvenirs, and island specialities like Mallorcan pearls and flor de sal sea salt. Whether you want designer flagships, artisan design or gifts to take home, here's where to shop, with areas, hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
