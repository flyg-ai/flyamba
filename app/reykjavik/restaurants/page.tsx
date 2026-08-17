import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Eat in Reykjavik 2026 — Best Restaurants Guide",
  description:
    "The best restaurants in Reykjavik — New Nordic fine dining at Michelin-starred Dill, fresh seafood, lobster soup, the world-famous hot dog stand and…",
  alternates: { canonical: `${SITE}/reykjavik/restaurants` },
  openGraph: { title: "Best Restaurants in Reykjavik | Flyamba", description: "From Michelin-starred New Nordic to lobster soup and lamb hot dogs — where to eat in Reykjavik.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Local", keys: ["local"] },
  { label: "Modern", keys: ["modern"] },
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
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/reykjavik/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavik", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ReykjavikRestaurants() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Reykjavik"
      heroImage="/images/placeholders/placeholder-restaurants.webp"
      intro="Reykjavik's food scene is modern New Nordic at heart — a focus on local Icelandic ingredients like harbour-fresh fish, herb-grazed lamb, skyr and foraged berries, reinterpreted through refined technique. Iceland's only Michelin star belongs to Dill, but the city runs the full range, from ambitious seafood houses to the world-famous lamb hot dog stand and warming bowls of lobster soup. It's an expensive place to eat, so this guide gathers the standout tables at every budget, with cuisines, areas, price guides and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
