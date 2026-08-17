import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Restaurants in Vienna 2026 — Guide | Flyamba",
  description:
    "Where to eat in Vienna — the best schnitzel houses and Tafelspitz, historic coffee houses, traditional Beisln and Michelin-starred fine dining, from…",
  alternates: { canonical: `${SITE}/vienna/restaurants` },
  openGraph: { title: "Best Restaurants in Vienna | Flyamba", description: "Vienna's top schnitzel houses, coffee houses, Beisln and fine dining with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Viennese Classics", keys: ["viennese"] },
  { label: "Coffee Houses", keys: ["cafe"] },
  { label: "Fine Dining", keys: ["fine"] },
  { label: "Traditional Beisl", keys: ["beisl"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Schnitzel", keys: ["schnitzel"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Vienna", item: `${SITE}/vienna` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/vienna/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
        priceRange: r.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ViennaRestaurants() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Vienna"
      heroImage="/images/vienna/restauranger/figlmuller.webp"
      intro="Viennese cooking is hearty, imperial and steeped in ritual — the plate-swamping Wiener schnitzel, the emperor's boiled-beef Tafelspitz, rich goulash and, above all, the coffee-house culture of a Melange and a slice of Sachertorte enjoyed at leisure. These are the schnitzel houses, grand cafés, cosy Beisln and Michelin-starred tables that Viennese and clued-up visitors actually book, from a €10 giant schnitzel to a €235 tasting menu, with prices and what to order at each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Vienna restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
