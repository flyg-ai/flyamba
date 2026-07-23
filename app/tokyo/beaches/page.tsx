import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Best Beaches Near Tokyo 2026 — Coast & Day Trips | Flyamba",
  description:
    "The best beaches within reach of Tokyo — Kamakura's Yuigahama, Enoshima, Zushi, Hayama and the surf town of Chigasaki, plus in-city Odaiba and paradise-like Izu.",
  alternates: { canonical: `${SITE}/tokyo/beaches` },
  openGraph: { title: "Best Beaches Near Tokyo | Flyamba", description: "Kamakura, Enoshima, Zushi and the best coast near Tokyo.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Surf", keys: ["surf"] },
  { label: "Quiet", keys: ["quiet"] },
  { label: "Scenic", keys: ["scenic"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/tokyo/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressRegion: "Greater Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function TokyoBeaches() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches Near Tokyo"
      heroImage="/images/tokyo/strander/kamakura-by-the-sea-yuigahama-beach.webp"
      intro="Tokyo is a landlocked-feeling megacity, but the sea is closer than you think. An hour south along the Shonan coast lie the beaches of Kamakura, Enoshima, Zushi and Hayama — an easy combination of sand, surf, temples and, on clear days, Mount Fuji on the horizon. Add the laid-back surf town of Chigasaki, the in-city bayfront of Odaiba, and the paradise-white sands of the Izu Peninsula, and there is a beach day to suit every mood, all reachable by train."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
