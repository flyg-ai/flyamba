import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Dubrovnik 2026 — Guide | Flyamba",
  description:
    "The best beaches in and around Dubrovnik — the iconic Banje beneath the walls, quiet Sveti Jakov, family-friendly Copacabana, Lokrum's salt lake…",
  alternates: { canonical: `${SITE}/dubrovnik/beaches` },
  openGraph: { title: "Best Beaches in Dubrovnik | Flyamba", description: "Dubrovnik's best beaches, from Banje beneath the walls to the sandy Šunj, with access and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Near the Old Town", keys: ["near"] },
  { label: "Family", keys: ["family"] },
  { label: "Sandy", keys: ["sandy"] },
  { label: "Pebble", keys: ["pebble"] },
  { label: "Scenic", keys: ["scenic"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubrovnikBeaches() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Dubrovnik"
      heroImage="/images/dubrovnik/beaches/banje-beach.webp"
      intro="Dubrovnik's coast is mostly pebble and rock rather than sand, but the water is some of the clearest and bluest on the whole Adriatic. Within minutes of the walls you can swim off the iconic Banje beach with the Old Town as a backdrop; a little further afield lie quieter coves, a family water-park beach, the salt lake and rocks of Lokrum, a sunset-facing cove and, out on the islands, a genuine sandy beach. Here are the best, with how to reach each and what to expect."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
