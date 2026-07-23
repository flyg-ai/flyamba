import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Santorini 2026 — Red, Black & White Sand | Flyamba",
  description:
    "Santorini's beaches are unlike anywhere else — the Red Beach, black-sand Perissa, Kamari and Perivolos, the sculpted cliffs of Vlychada, secluded White Beach and family-friendly Monolithos. Facilities, access and tips.",
  alternates: { canonical: `${SITE}/santorini/beaches` },
  openGraph: { title: "Best Beaches in Santorini | Flyamba", description: "8 volcanic Santorini beaches — red, black and white sand — with facilities and access tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Organised", keys: ["organised"] },
  { label: "Scenic", keys: ["scenic"] },
  { label: "Family", keys: ["family"] },
  { label: "Beach clubs", keys: ["beach-club"] },
  { label: "South coast", keys: ["south"] },
  { label: "Quiet", keys: ["quiet"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/santorini/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: b.area, addressRegion: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SantoriniBeaches() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Santorini"
      heroImage="/images/santorini/strander/red-beach.webp"
      intro="Forget golden sand — Santorini's volcanic origins give it beaches found almost nowhere else on earth: the astonishing Red Beach beneath rust-coloured cliffs, long stretches of jet-black sand at Perissa, Kamari and Perivolos, the sculpted moon-grey cliffs of Vlychada, and the secluded, boat-access White Beach. This guide covers all eight, with the facilities, the crowds, the dark sand that burns bare feet, and which beach suits families, parties or quiet swims."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
