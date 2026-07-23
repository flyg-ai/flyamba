import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Athens 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Athens — cult souvlaki joints, meze and deli tavernas, historic cellars, modern Greek bistros and Michelin-starred tables, with prices, areas and insider tips.",
  alternates: { canonical: `${SITE}/athens/restaurants` },
  openGraph: { title: "Where to Eat in Athens | Flyamba", description: "9 of the best Athens restaurants, from €3 souvlaki to Michelin stars.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Souvlaki", keys: ["souvlaki"] },
  { label: "Meze", keys: ["meze"] },
  { label: "Traditional", keys: ["traditional"] },
  { label: "Seafood", keys: ["seafood"] },
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
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/athens/restaurants` },
        ],
      },
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: "Greek",
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        priceRange: r.price ?? undefined,
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AthensRestaurants() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Athens"
      heroImage="/images/content/photo-1414235077428-338989a2e8c0.avif"
      intro="Athens is one of Europe's most rewarding — and best-value — food cities. You can eat a superb charcoal-grilled souvlaki for a few euros, graze on meze and cured meats in a buzzing deli-taverna, dig into homestyle dishes in a century-old cellar, or splash out at a two-Michelin-star table. Here are 9 of the best places to eat, from cult street food to fine dining, with prices, neighbourhoods and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athens restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
