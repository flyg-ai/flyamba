import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Restaurants in Singapore 2026 — Guide | Flyamba",
  description:
    "Where to eat in Singapore — from three-Michelin-star Odette and Les Amis to the world's cheapest Michelin meal at Hawker Chan, chilli crab, laksa and the…",
  alternates: { canonical: `${SITE}/singapore/restaurants` },
  openGraph: { title: "Best Restaurants in Singapore | Flyamba", description: "10 top Singapore restaurants and hawker centres with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fine dining", keys: ["fine"] },
  { label: "Hawker", keys: ["hawker"] },
  { label: "Asian", keys: ["asian"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...RESTAURANTS.map((r) => ({
        "@type": "Restaurant",
        name: r.name,
        description: r.description,
        servesCuisine: r.type,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: r.rating, reviewCount: r.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeRestaurants() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Singapore"
      heroImage="/images/singapore/restaurants/restaurant-singapore.avif"
      intro="Singapore is arguably the greatest food city on Earth, where a Michelin-starred hawker stall plates chicken rice for a few dollars, three-star French temples sit minutes from open-air food centres, and Chinese, Malay, Indian and Peranakan flavours collide on every street. From chilli crab and laksa to fine-dining tasting menus, here are 10 essential places to eat, spanning hawker legends to world-ranked restaurants, with prices, hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
