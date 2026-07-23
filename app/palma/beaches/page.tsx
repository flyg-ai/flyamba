import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Palma & Mallorca 2026 — Guide | Flyamba",
  description:
    "The best beaches near Palma de Mallorca — from the lively city sands of Playa de Palma and chic Illetes to the turquoise, Caribbean-like Es Trenc, Cala Deià and Cala Mondragó, with access tips.",
  alternates: { canonical: `${SITE}/palma/beaches` },
  openGraph: { title: "Best Beaches near Palma | Flyamba", description: "The best Palma and Mallorca beaches, with facilities and access tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Turquoise", keys: ["turquoise"] },
  { label: "Quiet", keys: ["quiet"] },
  { label: "Lively", keys: ["lively"] },
  { label: "Sandy", keys: ["sandy"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/palma/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressRegion: "Mallorca", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
        isAccessibleForFree: true,
      })),
    ],
  };
}

export default function PalmaBeaches() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches near Palma"
      heroImage="/images/palma/strander/es-trenc.webp"
      intro="Mallorca is ringed by more than 260 beaches and coves, and Palma is the perfect base for reaching the best of them. Within a short bus ride lie the lively city sands of Playa de Palma and the chic coves of Illetes and Portals Nous; a little further afield are some of the Mediterranean's most beautiful beaches — the Caribbean-white Es Trenc, the rugged artists' cove of Cala Deià, and the protected turquoise waters of Cala Mondragó. Here's where to swim, with facilities and access tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma and Mallorca beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
