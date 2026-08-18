import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Beaches in Dubai 2026 — Guide | Flyamba",
  description:
    "The best beaches in Dubai — lively free JBR and Kite Beach, stylish La Mer, classic Jumeirah Public Beach, the secret Black Palace Beach, surf-friendly…",
  alternates: { canonical: `${SITE}/dubai/beaches` },
  openGraph: { title: "Best Beaches in Dubai | Flyamba", description: "Dubai's best public beaches and beach parks, with facilities and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Family", keys: ["family"] },
  { label: "Watersports", keys: ["watersports"] },
  { label: "Lively", keys: ["lively"] },
  { label: "Quiet & Scenic", keys: ["quiet", "scenic"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/dubai/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubaiBeaches() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Dubai"
      heroImage="/images/dubai/beaches/barceloneta-dubai.webp"
      intro="Dubai's warm, calm Gulf coastline is one of its great free assets, and most of its best beaches cost nothing to enjoy. There's the buzzing, restaurant-backed sand of JBR, the sporty, kitesurf-friendly Kite Beach, the stylish pavilions of La Mer, the classic Jumeirah strip, and the surf and iconic Burj Al Arab views of Sunset Beach — plus a hidden 'secret beach' and a family-focused beach park. Here's where to swim and sunbathe, with facilities, the best times and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
