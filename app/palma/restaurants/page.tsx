import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Palma 2026 — Guide | Flyamba",
  description:
    "Where to eat in Palma de Mallorca — from Michelin tables and Santa Catalina bistros to classic tapas bars, seafood by the port and the island's famous ensaïmada, with prices and tips.",
  alternates: { canonical: `${SITE}/palma/restaurants` },
  openGraph: { title: "Where to Eat in Palma | Flyamba", description: "The best Palma restaurants, tapas bars and seafood, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Tapas", keys: ["tapas"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Mallorcan", keys: ["mallorcan"] },
  { label: "Budget", keys: ["budget"] },
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
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/palma/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        address: { "@type": "PostalAddress", addressLocality: "Palma", addressRegion: "Mallorca", addressCountry: "ES" },
        servesCuisine: r.type,
        priceRange: r.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PalmaRestaurants() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Palma"
      heroImage="/images/content/photo-1414235077428-338989a2e8c0.avif"
      intro="Palma's food scene punches well above its size, from a clutch of Michelin-starred tables to the buzzing tapas bars and natural-wine spots of Santa Catalina, fresh seafood by the old fishing port, and market halls where you buy the catch and have it cooked on the spot. Don't leave without trying the island staples — sobrassada, tumbet, fresh fish and the feather-light ensaïmada pastry. Here are the best places to eat, with prices, areas and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
