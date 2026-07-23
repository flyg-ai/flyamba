import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Lisbon 2026 — Best Shops, Markets & Gifts | Flyamba",
  description:
    "Where to shop in Lisbon — heritage stores like A Vida Portuguesa and Conserveira de Lisboa, the Feira da Ladra flea market, Chiado, LX Factory and the luxury Avenida da Liberdade.",
  alternates: { canonical: `${SITE}/lisbon/shopping` },
  openGraph: { title: "Shopping in Lisbon | Flyamba", description: "Best shops, markets and gifts in Lisbon.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Gifts", keys: ["gifts"] },
  { label: "Fashion", keys: ["fashion"] },
  { label: "Markets", keys: ["market"] },
  { label: "Luxury", keys: ["luxury"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/lisbon/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonShopping() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Lisbon"
      heroImage="/images/lisbon/shopping/lx-factory.webp"
      intro="Lisbon shopping is at its best when it's Portuguese — beautifully wrapped tinned fish, heritage soaps in vintage packaging, hand-painted ceramics, cork goods and treasures dug out of a centuries-old flea market. Add elegant Chiado, the creative boutiques of LX Factory and Príncipe Real, and the luxury flagships of Avenida da Liberdade, and there's something for every taste and budget. Here's where to go, and what to bring home."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Lisbon shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
