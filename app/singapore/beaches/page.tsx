import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Beaches in Singapore 2026 — Guide | Flyamba",
  description:
    "The best beaches in Singapore — Sentosa's Palawan, Siloso and Tanjong, the 15 km East Coast Park, laid-back Changi and the undeveloped island escapes of…",
  alternates: { canonical: `${SITE}/singapore/beaches` },
  openGraph: { title: "Best Beaches in Singapore | Flyamba", description: "7 top Singapore beaches from Sentosa to hidden island escapes.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Sentosa", keys: ["sentosa"] },
  { label: "East Coast", keys: ["east"] },
  { label: "Islands", keys: ["islands"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/singapore/beaches` },
        ],
      },
      ...BEACHES.map((b) => ({
        "@type": "Beach",
        name: b.name,
        description: b.description,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: b.rating, reviewCount: b.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeBeaches() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Singapore"
      heroImage="/images/singapore/beaches/barceloneta-singapore.webp"
      intro="Singapore is a city of the tropics, and warm, swimmable water is never far away. Sentosa's trio of imported-sand beaches — family-friendly Palawan, lively Siloso and stylish Tanjong — headline the scene, but locals flock to the 15 km ribbon of East Coast Park for cycling and seafood, escape to laid-back Changi, or take a ferry to the untouched white sand of Lazarus Island. Here are 7 of the best beaches and coastal escapes, with facilities, atmosphere and how to reach each one."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
