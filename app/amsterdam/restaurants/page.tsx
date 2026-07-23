import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Amsterdam 2026 — Best Restaurants Guide | Flyamba",
  description:
    "The best restaurants in Amsterdam — traditional Dutch cooking, food halls, seafood and Michelin-starred canal-side dining, with prices, areas and booking tips.",
  alternates: { canonical: `${SITE}/amsterdam/restaurants` },
  openGraph: { title: "Best Restaurants in Amsterdam | Flyamba", description: "From brown-café classics to Michelin stars — where to eat in Amsterdam.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Dutch", keys: ["dutch"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Casual", keys: ["casual"] },
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
          { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/amsterdam/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AmsterdamRestaurants() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Amsterdam"
      heroImage="/images/amsterdam/restauranger/moeders.webp"
      intro="Amsterdam's food scene runs from hearty traditional Dutch home cooking and cosy brown-café kitchens to global street-food halls, pristine seafood and some of the most creative Michelin-starred tables in the Netherlands. This guide gathers the standout places to eat, whatever your budget, with cuisines, neighbourhoods, price guides and booking tips so you can plan every meal of your trip."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
