import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Mykonos 2026 — Beach Guide | Flyamba",
  description:
    "The best beaches in Mykonos — long, relaxed Elia, boho Paraga and Scorpios, the windsurf bays of Kalafatis and Ftelia, and wild, empty northern beaches…",
  alternates: { canonical: `${SITE}/mykonos/beaches` },
  openGraph: { title: "Best Beaches in Mykonos | Flyamba", description: "8 top Mykonos beaches, from beach clubs to wild, empty coves.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Party", keys: ["party"] },
  { label: "Windsurf", keys: ["windsurf"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/mykonos/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MykonosBeaches() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Mykonos"
      heroImage="/images/mykonos/beaches/barceloneta-mykonos.webp"
      intro="Mykonos has two very different coasts. The south is sheltered from the Meltemi wind and home to the island's famous organised beaches — from the party sands of Paradise to the boho glamour of Paraga and Scorpios. The north is wilder: whipped by the summer wind into a windsurf and kitesurf paradise at Ftelia, and dotted with empty, facility-free beaches like Agios Sostis and Fokos, reached only by rough tracks. This guide covers 8 of the best beyond the headline party beaches — relaxed, windswept and wild — with lounger prices, facilities and how to get to each. Most beaches are free to walk on; you only pay for loungers and shade."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
