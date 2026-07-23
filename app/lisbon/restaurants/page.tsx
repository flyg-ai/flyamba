import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Lisbon 2026 — Best Restaurants | Flyamba",
  description:
    "The best restaurants in Lisbon, from Belcanto's Michelin stars and Cervejaria Ramiro's shellfish to the Time Out Market and the city's best pastéis de nata — with prices and tips.",
  alternates: { canonical: `${SITE}/lisbon/restaurants` },
  openGraph: { title: "Best Restaurants in Lisbon | Flyamba", description: "Where to eat in Lisbon, from seafood halls to fine dining.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Portuguese", keys: ["portuguese"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Fine dining", keys: ["fine-dining"] },
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
          { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/lisbon/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonRestaurants() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Lisbon"
      heroImage="/images/lisbon/restauranger/cervejaria-ramiro.webp"
      intro="Lisbon has quietly become one of Europe's most exciting places to eat — a city where you can demolish a bucket of garlic prawns at a buzzing beer hall, graze across a dozen chefs at the Time Out Market, splurge on a two-Michelin-star tasting menu, and still spend less than you would in Paris or London. These are the restaurants and food stops worth planning your days around, from seafood institutions to the perfect pastel de nata."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Lisbon restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
