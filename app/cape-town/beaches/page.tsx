import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Cape Town 2026 — Complete Guide | Flyamba",
  description:
    "The best beaches in Cape Town — glamorous Camps Bay and Clifton, the penguins at Boulders, warmer-water Muizenberg for surfing, wild Noordhoek and the…",
  alternates: { canonical: `${SITE}/cape-town/beaches` },
  openGraph: { title: "Best Beaches in Cape Town | Flyamba", description: "Atlantic glamour, warmer False Bay swimming and world-class surf — Cape Town's beaches.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Atlantic", keys: ["atlantic"] },
  { label: "False Bay", keys: ["falsebay"] },
  { label: "Surf", keys: ["surf"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CapeTownBeaches() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Cape Town"
      heroImage="/images/cape-town/beaches/camps-bay-beach.webp"
      intro="Cape Town's beaches are among the most spectacular anywhere, framed by mountains and split between two very different coasts. The Atlantic Seaboard delivers glamour and dazzling white sand at Camps Bay, Clifton and Llandudno — though the water is famously cold — while the warmer False Bay side offers penguins at Boulders, easy surf at Muizenberg and sheltered tidal pools. Here are the best beaches, with the water temperatures, facilities and tips you need."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
