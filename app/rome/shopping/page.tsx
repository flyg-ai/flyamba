import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Rome 2026 — Guide | Flyamba",
  description:
    "Where to shop in Rome — luxury flagships on Via dei Condotti, high-street Via del Corso, buzzing markets like Porta Portese and Campo de' Fiori, gourmet food halls and department stores, with tips and opening hours.",
  alternates: { canonical: `${SITE}/rome/shopping` },
  openGraph: { title: "Shopping in Rome | Flyamba", description: "Rome's best shopping streets, markets and food halls with insider tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "High Street", keys: ["highstreet"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Boutiques", keys: ["boutiques"] },
  { label: "Food & Wine", keys: ["food"] },
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
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/rome/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Rome", addressCountry: "IT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function RomeShopping() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Rome"
      heroImage="/images/rome/shopping/via-dei-condotti.webp"
      intro="Rome shops on every level — the designer flagships of Via dei Condotti below the Spanish Steps, the high-street bustle of Via del Corso, characterful weekend markets, independent boutiques in Monti and gourmet food halls piled with edible souvenirs. Here is where to browse, bargain and buy, from luxury to flea market, with opening hours and tips on where locals actually shop."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Rome shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
