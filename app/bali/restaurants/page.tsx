import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Bali 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Bali — from acclaimed Locavore and modern-Indonesian Merah Putih to the island's famous babi guling at Ibu Oka, beachfront La Lucciola…",
  alternates: { canonical: `${SITE}/bali/restaurants` },
  openGraph: { title: "Best Restaurants in Bali | Flyamba", description: "Bali's best restaurants, from local warungs to fine dining.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Local", keys: ["local"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Romantic", keys: ["romantic"] },
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
          { "@type": "ListItem", position: 2, name: "Bali", item: `${SITE}/bali` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/bali/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function BaliRestaurants() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Best Restaurants in Bali"
      heroImage="/images/bali/restaurants/restaurant-bali.avif"
      intro="Bali's food scene spans everything from smoky roadside warungs to some of Asia's most acclaimed tasting menus. Try the island's definitive babi guling at Ibu Oka, dig into modern Indonesian cooking at Merah Putih, splurge on foraged fine dining at Locavore, or watch the sunset over a beachfront pasta at La Lucciola. Here are the restaurants worth booking, with areas, prices and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
