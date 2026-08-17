import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Reykjavik 2026 — Best Streets & Markets",
  description:
    "Where to shop in Reykjavik — design-lined Laugavegur and Skólavörðustígur, hand-knitted wool sweaters, 66°North outerwear, the Kolaportið flea market and…",
  alternates: { canonical: `${SITE}/reykjavik/shopping` },
  openGraph: { title: "Reykjavik Shopping Guide | Flyamba", description: "Icelandic design, wool sweaters, outdoor gear and flea markets — the best shopping in Reykjavik.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Souvenirs", keys: ["souvenirs"] },
  { label: "Design", keys: ["luxury"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Boutiques", keys: ["boutiques"] },
  { label: "Malls", keys: ["mall"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/reykjavik/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavik", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ReykjavikShopping() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Reykjavik"
      heroImage="/images/placeholders/placeholder-shopping.webp"
      intro="Reykjavik is a compact, walkable city for shopping, where the pleasure is finding something genuinely Icelandic. Browse design shops and galleries along Laugavegur and the rainbow-painted Skólavörðustígur, pick up a hand-knitted lopapeysa sweater or a 66°North jacket built for Atlantic storms, rummage the weekend Kolaportið flea market, or gather local design under one roof at Kraum. This guide covers the best shopping streets, stores and markets, with what to buy where, opening-hours tips and advice on tax-free shopping."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
