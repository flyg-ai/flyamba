import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Madrid 2026 — Markets, Boutiques & Malls",
  description:
    "Where to shop in Madrid — the El Rastro Sunday flea market, indie fashion in Chueca and Malasaña, the El Corte Inglés flagship, Mercado de Motores design…",
  alternates: { canonical: `${SITE}/madrid/shopping` },
  openGraph: { title: "Shopping in Madrid | Flyamba", description: "Madrid's best markets, boutiques and department stores.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Markets", keys: ["marknader", "markets"] },
  { label: "Boutiques", keys: ["boutiques", "vintage"] },
  { label: "Department stores", keys: ["kopcentrum", "lyx"] },
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
          { "@type": "ListItem", position: 2, name: "Madrid", item: `${SITE}/madrid` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/madrid/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MadridShopping() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Madrid"
      heroImage="/images/madrid/shopping/artisan-shop-madrid.webp"
      intro="Madrid's shopping ranges from the raucous Sunday flea market of El Rastro to the designer flagships of Salamanca's 'Golden Mile', taking in indie fashion and vintage in cool Chueca and Malasaña, the flagship-store cluster of Gran Vía, and Spain's great department store, El Corte Inglés, with its rooftop food terrace. There are gourmet food halls for edible souvenirs and characterful neighbourhood markets where locals actually shop. Here are eight of the city's best shopping destinations, with opening hours, areas and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
