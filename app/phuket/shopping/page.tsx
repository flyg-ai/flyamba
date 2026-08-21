import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Phuket 2026 — Guide | Flyamba",
  description:
    "Where to shop in Phuket — the heritage boutiques of Old Town, the Sunday Walking Street, sprawling weekend night markets, hip container markets, big…",
  alternates: { canonical: `${SITE}/phuket/shopping` },
  openGraph: { title: "Shopping in Phuket | Flyamba", description: "Phuket's best markets, malls and Old Town shops with insider tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Markets", keys: ["markets"] },
  { label: "Night Markets", keys: ["nightmarket"] },
  { label: "Malls", keys: ["malls"] },
  { label: "Old Town", keys: ["oldtown"] },
  { label: "Food", keys: ["food"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Phuket", addressCountry: "TH" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PhuketShopping() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Phuket"
      heroImage="/images/phuket/sevardheter/bangla-road.webp"
      intro="Phuket shops on every level, from atmospheric heritage streets to gleaming malls and buzzing night markets. Browse independent boutiques, art and crafts in the restored shophouses of Old Town, graze and shop the wonderful Sunday Walking Street, haggle at the vast Naka weekend bazaar, hang out at hip container markets, cool off amid the international brands of Central Phuket, or pick your dinner at a fresh seafood market. Here is where to browse, bargain and buy, with opening hours and tips on where locals actually shop."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
