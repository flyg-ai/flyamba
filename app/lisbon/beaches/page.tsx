import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches Near Lisbon 2026 — Guide | Flyamba",
  description:
    "The best beaches near Lisbon — Carcavelos, Costa da Caparica, wild Guincho, family-friendly Estoril and the surf coast at Ericeira and Praia Grande, with how to get there by train.",
  alternates: { canonical: `${SITE}/lisbon/beaches` },
  openGraph: { title: "Best Beaches Near Lisbon | Flyamba", description: "Atlantic beaches near Lisbon, from surf breaks to family sands.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Surf", keys: ["surf"] },
  { label: "Family", keys: ["family"] },
  { label: "Wild & natural", keys: ["nature"] },
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
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/lisbon/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonBeaches() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches Near Lisbon"
      heroImage="/images/lisbon/strander/praia-do-guincho.webp"
      intro="One of Lisbon's great advantages is that Atlantic beaches are barely a train ride away. In under an hour you can be on the wide golden sands of Carcavelos, the family coves of Estoril, the endless dunes of Costa da Caparica or the wild, windswept surf of Guincho and the Sintra coast. Here are the best beaches near the capital, from easy town sands reachable without a car to world-class surf breaks, with how to get to each."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Beaches near Lisbon in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
