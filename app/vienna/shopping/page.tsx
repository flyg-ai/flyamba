import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Vienna 2026 — Guide | Flyamba",
  description:
    "Where to shop in Vienna — luxury flagships on Kohlmarkt and the Graben, high-street Kärntner and Mariahilfer Strasse, the Naschmarkt and its Saturday…",
  alternates: { canonical: `${SITE}/vienna/shopping` },
  openGraph: { title: "Shopping in Vienna | Flyamba", description: "Vienna's best shopping streets, markets and historic shops with insider tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "High Street", keys: ["highstreet"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Gourmet & Gifts", keys: ["gourmet"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Vienna", item: `${SITE}/vienna` },
          { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/vienna/shopping` },
        ],
      },
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ViennaShopping() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Vienna"
      heroImage="/images/vienna/shopping/graben.webp"
      intro="Vienna shops with imperial style. The luxury flagships of Kohlmarkt lead the eye to the Hofburg, the grand Graben and busy Kärntner Strasse form the old town's shopping spine, and the long Mariahilfer Strasse is the high-street heartland. Add the cosmopolitan Naschmarkt with its Saturday flea market and a clutch of historic gourmet grocers, chocolatiers and craftsmen, and you have everything from Chanel to a collectible box of hand-made pralines. Here is where to browse and buy, with opening hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Vienna shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
