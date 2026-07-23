import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Athens 2026 — Athenian Riviera Guide | Flyamba",
  description:
    "The best beaches near Athens — the Athenian Riviera from Alimos and Glyfada to turquoise Vouliagmeni, exclusive Astir, the warm thermal Lake Vouliagmeni and pine-backed Schinias, with how to get there and prices.",
  alternates: { canonical: `${SITE}/athens/beaches` },
  openGraph: { title: "Athenian Riviera Beaches | Flyamba", description: "8 of the best beaches near Athens, by tram and bus.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Organized", keys: ["organized"] },
  { label: "Free", keys: ["free"] },
  { label: "Family", keys: ["family"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Nightlife", keys: ["nightlife"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/athens/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AthensBeaches() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches on the Athenian Riviera"
      heroImage="/images/athens/strander/vouliagmeni.webp"
      intro="Athens is that rare capital with a full Mediterranean coastline on its doorstep. The Athenian Riviera runs south from the city, strung with organized beaches, glamorous beach clubs and free public sand — from the easy-to-reach Alimos and cosmopolitan Glyfada to the gin-clear water of Vouliagmeni, exclusive Astir, the warm thermal Lake Vouliagmeni and wilder, pine-backed Schinias. Here are 8 of the best, with how to get there by tram and bus, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athenian Riviera beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
