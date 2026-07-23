import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Shopping in Ibiza 2026 — Markets & Fashion | Flyamba",
  description:
    "Shopping in Ibiza — the Las Dalias and Punta Arabí hippy markets, signature white 'Adlib' island fashion, glossy marina boutiques and the Sluiz concept store, with tips.",
  alternates: { canonical: `${SITE}/ibiza/shopping` },
  openGraph: { title: "Shopping in Ibiza: Hippy Markets & Adlib Fashion | Flyamba", description: "Where to shop on the White Isle, from bohemian markets to designer boutiques.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Markets", keys: ["markets"] },
  { label: "Fashion", keys: ["fashion"] },
  { label: "Concept", keys: ["concept"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/ibiza/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Store",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaShopping() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Ibiza"
      heroImage={HERO}
      intro="Ibiza's shopping is as distinctive as the island itself. Its famous hippy markets — Las Dalias and Punta Arabí — sell handmade fashion, jewellery and art rooted in the island's 1960s countercultural spirit, while 'Adlib', Ibiza's own flowing white fashion movement, fills the boutiques of the old town. Add the glossy designer strip of Marina Botafoch and the cult Sluiz concept store, and there is something for every taste and budget. Here is where to shop across the island, with opening hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
