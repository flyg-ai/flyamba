import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { BEACHES, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Cancún 2026 — Guide | Flyamba",
  description:
    "The best beaches in Cancún — the showpiece Playa Delfines and its famous sign, calm family-friendly Tortugas and Langosta, wide open Ballenas and Marlin…",
  alternates: { canonical: `${SITE}/cancun/beaches` },
  openGraph: { title: "Best Beaches in Cancún | Flyamba", description: "Cancún's finest public beaches, from calm family shallows to the iconic Playa Delfines, with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Calm Water", keys: ["calm"] },
  { label: "Good Swimming", keys: ["swimming"] },
  { label: "Family", keys: ["family"] },
  { label: "Public", keys: ["public"] },
  { label: "Free", keys: ["free"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Cancún", item: `${SITE}/cancun` },
          { "@type": "ListItem", position: 3, name: "Beaches", item: `${SITE}/cancun/beaches` },
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

export default function CancunBeaches() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="beaches"
      crumb="Beaches"
      h1="Best Beaches in Cancún"
      heroImage="/images/placeholders/placeholder-beaches.webp"
      intro="Cancún's beaches are the headline act — a 22-kilometre ribbon of powdery, cool, coral-white sand fringing water in every shade of Caribbean turquoise. And there's more variety than first appears: the calm, shallow, family-perfect beaches of the sheltered northern strip (Tortugas and Langosta), the wide, wilder open-sea sweeps of the centre and south (Ballenas, Marlin and the spectacular clifftop Playa Delfines with its famous Cancún sign), and, a short ferry away, the glassy Playa Norte on Isla Mujeres, regularly rated the best beach in Mexico. Every Mexican beach is public by law. Here are the best, with how to reach them, what to expect and safety notes on the surf."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={BEACHES} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún beaches in detail" items={BEACHES} />
    </CityGuideShell>
  );
}
