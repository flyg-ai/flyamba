import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, SHOPPING } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Shopping in London 2026 — Guide | Flyamba",
  description:
    "The best shopping in London — Harrods, Selfridges and Liberty, Oxford Street's flagships, and the antique and food markets of Portobello, Borough and Camden, with hours and insider tips.",
  alternates: { canonical: `${SITE}/london/shopping` },
  openGraph: { title: "Best Shopping in London | Flyamba", description: "8 top London shopping spots, from luxury stores to markets.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Department stores", keys: ["department"] },
  { label: "Markets", keys: ["markets"] },
  { label: "High street", keys: ["high-street"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/london/shopping` },
    ],
  };
}

export default function LondonShopping() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Best Shopping in London"
      heroImage="/images/london/shopping/harrods.webp"
      intro="London shopping ranges from the world's most famous department stores to sprawling street markets full of antiques, vintage and street food. Whether you want luxury flagships on Bond Street, the spectacle of Harrods and Liberty, or a Saturday hunt down Portobello Road, here are 8 of the best places to shop, with opening hours and tips to shop smart."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
