import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Dubrovnik 2026 — Guide | Flyamba",
  description:
    "Where to eat in Dubrovnik — from the Michelin-starred Restaurant 360 and grande-dame Nautika to century-old Proto, modern Dalmatian Pantarul and budget…",
  alternates: { canonical: `${SITE}/dubrovnik/restaurants` },
  openGraph: { title: "Best Restaurants in Dubrovnik | Flyamba", description: "10 top Dubrovnik restaurants from fine dining to budget bites, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fine Dining", keys: ["fine-dining"] },
  { label: "Local & Traditional", keys: ["local"] },
  { label: "Budget-Friendly", keys: ["budget"] },
  { label: "Family", keys: ["family"] },
  { label: "Romantic", keys: ["romantic"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/dubrovnik/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        priceRange: r.price,
        address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubrovnikRestaurants() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Dubrovnik"
      heroImage="/images/dubrovnik/restaurants/nautika.webp"
      intro="Dubrovnik dining is built on the Adriatic — pristine fish and shellfish, black cuttlefish risotto, Ston oysters and Pelješac wines — served everywhere from a Michelin-starred terrace on the harbour ramparts to tiny stone konobas down the Old Town lanes. It is also one of Croatia's pricier tables, so this guide spans the full range, from special-occasion fine dining to honest home cooking and cheap bakery bites, with prices, areas and booking tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
