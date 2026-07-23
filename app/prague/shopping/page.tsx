import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Prague 2026 — Best Streets, Markets & Gifts | Flyamba",
  description:
    "Where to shop in Prague — luxury Pařížská street, the high-street Na Příkopě, Bohemian crystal, Czech design, natural cosmetics, farmers' markets and the best souvenirs, with locations and tips.",
  alternates: { canonical: `${SITE}/prague/shopping` },
  openGraph: { title: "Shopping in Prague | Flyamba", description: "8 top Prague shopping streets, markets and design stores.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Fashion", keys: ["fashion"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Czech Design", keys: ["czech-design"] },
  { label: "Malls", keys: ["malls"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
  { label: "Food", keys: ["food"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/prague/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PragueShopping() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Prague"
      heroImage="/images/prague/shopping/pask.webp"
      intro="Prague's shopping runs from belle-époque luxury to farmers'-market charm. Browse the global flagships of leafy Pařížská, hunt for Bohemian crystal and Czech Cubist design, stock up on natural beer-and-wine cosmetics for tasteful gifts, or graze the riverside Náplavka market on a Saturday morning. Here are 8 of the best places to shop — from grand streets and malls to markets and design stores — with locations, price levels and tips on the souvenirs actually worth buying."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
