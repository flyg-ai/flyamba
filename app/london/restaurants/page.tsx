import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, RESTAURANTS } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Restaurants in London 2026 — Guide | Flyamba",
  description:
    "Where to eat in London — from Dishoom and Padella to three-Michelin-star tables. The 10 best restaurants across cuisines and budgets, with prices, areas and booking tips.",
  alternates: { canonical: `${SITE}/london/restaurants` },
  openGraph: { title: "Best Restaurants in London | Flyamba", description: "10 top London restaurants with prices, areas and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "British", keys: ["british"] },
  { label: "Indian", keys: ["indian"] },
  { label: "Small plates", keys: ["small-plates"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/london/restaurants` },
    ],
  };
}

export default function LondonRestaurants() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Best Restaurants in London"
      heroImage="/images/london/restauranger/dishoom.webp"
      intro="London is one of the world's great eating cities, home to every cuisine imaginable and more Michelin stars than anywhere else in the UK. From cult Bombay cafés and bargain pasta counters to nose-to-tail British institutions and destination fine dining, here are 10 restaurants worth planning a meal around, with prices, areas and booking advice."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
