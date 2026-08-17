import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Beaches in Phuket 2026 — Best Beaches Guide | Flyamba",
  description:
    "The best beaches in Phuket — lively Patong, beautiful Kata and Karon, upscale Surin and Bang Tao, family-friendly Kamala, stunning Nai Harn and secret…",
  alternates: { canonical: `${SITE}/phuket/beaches` },
  openGraph: { title: "Best Beaches in Phuket | Flyamba", description: "Phuket's best beaches, from lively Patong to gorgeous Nai Harn, with facilities and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Lively", keys: ["lively"] },
  { label: "Family", keys: ["family"] },
  { label: "Quiet & Scenic", keys: ["quiet", "scenic"] },
  { label: "Surf", keys: ["surf"] },
  { label: "Snorkelling", keys: ["snorkeling"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/phuket/beaches` },
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

export default function PhuketBeaches() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Phuket"
      heroImage="/images/phuket/strander/patong-beach.webp"
      intro="Phuket's west and south coasts are lined with beautiful beaches, and each has its own character. Buzzing Patong is the lively hub of action and nightlife; Kata and Karon strike a lovely balance of beauty and amenities; Kamala is relaxed and family-friendly; upscale Surin and long, chic Bang Tao anchor the island's smart northwest; sheltered Nai Harn is often crowned the finest of all; and secret Freedom Beach rewards a boat ride with paradise. Here are the eight best beaches, with what to expect, facilities, how to get there — and vital advice on swimming safely around the monsoon-season rip currents."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
