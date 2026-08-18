import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in New York 2026 — Best Stores & Markets Guide",
  description:
    "Where to shop in New York — the Fifth Avenue flagships, cast-iron SoHo, Chelsea Market, Macy's, the Brooklyn Flea and the Union Square Greenmarket, with…",
  alternates: { canonical: `${SITE}/new-york/shopping` },
  openGraph: { title: "Best Shopping in New York | Flyamba", description: "Fifth Avenue flagships, SoHo boutiques, food halls and markets — where to shop in New York.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Department stores", keys: ["department"] },
  { label: "Vintage", keys: ["vintage"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/new-york/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function NewYorkShopping() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in New York — Flagships, Markets & Boutiques"
      heroImage="/images/new-york/shopping/artisan-shop-new-york.webp"
      intro="New York is a shopping city like no other, from the flagship-lined luxury of Fifth Avenue to the cobbled boutiques of SoHo, the food halls of Chelsea Market and the vintage stalls of the Brooklyn Flea. Whether you want designer labels, discount deals at Century 21, ten floors of everything at Macy's, or fresh produce at the Union Square Greenmarket, there's a district to match. Here are the best places to shop across every style and budget — and a reminder that 8.875% sales tax is added at the register, though clothing and shoes under $110 are tax-free in New York City."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
