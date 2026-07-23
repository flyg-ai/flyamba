import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches Near Rome 2026 — Guide | Flyamba",
  description:
    "The best beaches within reach of Rome — from Lido di Ostia on a city train ticket to whitewashed Sperlonga, family-friendly Santa Marinella and the wild dunes of Sabaudia, with how to get there and tips.",
  alternates: { canonical: `${SITE}/rome/beaches` },
  openGraph: { title: "Best Beaches Near Rome | Flyamba", description: "Rome's best day-trip beaches, from Ostia to Sperlonga, with train and driving directions.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Nearest to Rome", keys: ["near"] },
  { label: "Family", keys: ["family"] },
  { label: "Sandy", keys: ["sandy"] },
  { label: "Scenic", keys: ["scenic"] },
  { label: "By Train", keys: ["train"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/rome/beaches` },
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

export default function RomeBeaches() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches Near Rome"
      heroImage="/images/rome/strander/sperlonga.webp"
      intro="Rome is not on the coast, but the Tyrrhenian Sea is closer than you think — Lido di Ostia is 40 minutes on a city train, and a string of sandier, prettier beaches lie within a day's reach along the Lazio coast. From family-friendly Santa Marinella and historic Anzio to postcard Sperlonga and the wild dunes of Sabaudia, here are the best beach escapes, with how to get there by train or car and what to expect."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Beaches near Rome in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
