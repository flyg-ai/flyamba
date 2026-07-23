import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Prague 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Prague — from Michelin-starred Field and La Degustation to classic beer-hall Czech cooking at Lokál, grand cafés and buzzing food halls, with prices, hours and tips.",
  alternates: { canonical: `${SITE}/prague/restaurants` },
  openGraph: { title: "Best Restaurants in Prague | Flyamba", description: "10 top Prague restaurants from Michelin stars to beer halls.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Czech", keys: ["czech"] },
  { label: "Fine Dining", keys: ["fine-dining"] },
  { label: "Beer Hall", keys: ["beer-hall"] },
  { label: "Café", keys: ["cafe"] },
  { label: "International", keys: ["international"] },
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
          { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/prague/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PragueRestaurants() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Prague"
      heroImage="/images/prague/restauranger/lokl.webp"
      intro="Prague's dining scene has come a long way from pork-and-dumplings clichés. Today the city serves everything from Michelin-starred tasting menus and reinvented Bohemian classics to buzzing beer halls pouring fresh-tank pilsner, gilded belle-époque cafés and globe-trotting food halls — much of it at prices that put Western Europe to shame. Here are 10 of the best places to eat, from special-occasion splurges to great-value local favourites, with prices, opening hours and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
