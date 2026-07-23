import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Tenerife 2026 — Best Restaurants Guide | Flyamba",
  description:
    "The best restaurants in Tenerife, from two-Michelin-star tables to rustic guachinches serving papas arrugadas, mojo and fresh fish — with prices, areas and insider tips.",
  alternates: { canonical: `${SITE}/tenerife/restaurants` },
  openGraph: { title: "Best Restaurants in Tenerife | Flyamba", description: "Canarian food, seafood and Michelin stars with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Canarian", keys: ["canarian"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Tapas", keys: ["tapas"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/tenerife/restaurants` },
    ],
  };
}

export default function TenerifeRestaurants() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Tenerife"
      heroImage="/images/tenerife/sevardheter/la-laguna-gamla-stan.webp"
      intro="Tenerife's food ranges from some of Spain's finest Michelin-starred kitchens to rustic guachinches where farmers serve homemade country cooking with their own wine. Wrinkly papas arrugadas with red and green mojo, fresh Atlantic fish and hearty stews are the local staples. Here are the restaurants worth seeking out, with prices, areas and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
