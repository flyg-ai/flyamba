import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Amsterdam 2026 — Best Streets & Markets | Flyamba",
  description:
    "Where to shop in Amsterdam — the boutique-lined Nine Streets, Albert Cuyp Market, the floating Flower Market, luxury PC Hooftstraat, flea markets and more, with areas and tips.",
  alternates: { canonical: `${SITE}/amsterdam/shopping` },
  openGraph: { title: "Amsterdam Shopping Guide | Flyamba", description: "Boutiques, markets and department stores — the best shopping in Amsterdam.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Boutiques", keys: ["boutiques"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Local", keys: ["local"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/amsterdam/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AmsterdamShopping() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Amsterdam"
      heroImage="/images/amsterdam/shopping/de-negen-straatjes.webp"
      intro="Amsterdam is a wonderful city to shop, thanks to its compact, walkable centre and its love of independent, one-off stores. Hunt vintage and design in the picture-perfect Nine Streets, graze and bargain at the vast Albert Cuyp Market, pick up tulip bulbs at the floating Flower Market, browse designer flagships on the PC Hooftstraat, or rummage the Waterlooplein flea market. This guide covers the best shopping streets, markets and stores, with what to buy where and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
