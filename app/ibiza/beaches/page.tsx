import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Beaches in Ibiza 2026 — Guide | Flyamba",
  description:
    "Ibiza's best beaches and coves — from turquoise Cala Comte and family-friendly Cala Bassa to the bohemian drumming of Benirràs and the Es Vedrà view at Cala d'Hort.",
  alternates: { canonical: `${SITE}/ibiza/beaches` },
  openGraph: { title: "Best Beaches in Ibiza | Flyamba", description: "The White Isle's best beaches and coves, with facilities, access and tips.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Family", keys: ["family"] },
  { label: "Snorkel", keys: ["snorkel"] },
  { label: "Sunset", keys: ["sunset"] },
  { label: "Party", keys: ["party"] },
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
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/ibiza/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaBeaches() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Ibiza"
      heroImage={HERO}
      intro="Ibiza's coastline is a string of dazzling coves and beaches, from the Caribbean-clear water of Cala Comte to the sheltered family sands of Cala Bassa, the chic scene at Ses Salines and the bohemian sunset drumming of Benirràs. Whether you want calm shallows for children, a glossy beach-club day or a wild, undeveloped cove, here are the island's best stretches of sand, with facilities, access and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
