import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Barcelona 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Barcelona — from classic tapas bars and harbour-side paella to buzzing food markets, budget bites and world-ranked fine dining, with areas and prices.",
  alternates: { canonical: `${SITE}/barcelona/restaurants` },
  openGraph: { title: "Where to Eat in Barcelona | Flyamba", description: "Barcelona's best restaurants and food spots.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Tapas", keys: ["tapas"] },
  { label: "Seafood", keys: ["seafood"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Budget", keys: ["budget"] },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
    { "@type": "ListItem", position: 3, name: "Restaurants", item: `${SITE}/barcelona/restaurants` },
  ],
};

export default function BarcelonaRestaurants() {
  return (
    <GuideShell
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Barcelona"
      heroImage="/images/content/photo-1555992336-fb0d29498b13.avif"
      intro="Barcelona is one of Europe's great eating cities — a place where a €2 montadito at a tiled bar and a multi-course tasting menu can both be the meal of the trip. This guide covers the full range: classic tapas bars, harbour-side seafood, buzzing food markets, wallet-friendly bites and the fine dining that put the city on the world map."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Barcelona restaurants in detail" items={RESTAURANTS} />
    </GuideShell>
  );
}
