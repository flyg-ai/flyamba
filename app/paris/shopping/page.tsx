import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Paris 2026 — Guide | Flyamba",
  description:
    "Where to shop in Paris — the grand department stores of Galeries Lafayette and Le Bon Marché, the concept stores and vintage boutiques of the Marais, luxury flagships on Rue Saint-Honoré and the city's best markets. Hours, areas and tips.",
  alternates: { canonical: `${SITE}/paris/shopping` },
  openGraph: { title: "Best Shopping in Paris | Flyamba", description: "Department stores, boutiques and markets in Paris.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Department stores", keys: ["department-stores"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Boutiques", keys: ["boutiques"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Concept stores", keys: ["concept"] },
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
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/paris/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ParisShopping() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Paris"
      heroImage="/images/paris/shopping/galeries-lafayette.webp"
      intro="Shopping in Paris runs from the sublime to the delightfully everyday — the stained-glass dome of Galeries Lafayette and the elegant halls of the world's oldest department store, the concept stores and Sunday-open boutiques of the Marais, the luxury flagships of Rue Saint-Honoré and the vast weekend antiques market of Saint-Ouen. Here are the best places to browse, buy and people-watch, with opening hours, neighbourhoods and tips on where to find real Parisian style."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Paris shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
