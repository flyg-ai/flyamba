import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Vienna 2026 — Bars & Clubs Guide | Flyamba",
  description:
    "Where to go out in Vienna — the historic Loos and Kruger's cocktail bars, the Heuriger wine taverns of Grinzing, canal-side techno clubs like Flex and Grelle Forelle, live jazz and rooftop bars, with tips.",
  alternates: { canonical: `${SITE}/vienna/nightlife` },
  openGraph: { title: "Vienna Nightlife Guide | Flyamba", description: "Vienna's best cocktail bars, wine taverns, clubs, live music and rooftops with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktail Bars", keys: ["cocktails"] },
  { label: "Wine Taverns", keys: ["heuriger"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Live Music", keys: ["music"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Beer Halls", keys: ["beer"] },
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
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/vienna/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ViennaNightlife() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Vienna Nightlife"
      heroImage="/images/vienna/nattliv/loos-american-bar.webp"
      intro="Vienna's night has many moods. It might start with a cocktail in Adolf Loos's tiny 1908 masterpiece or a glass of Grüner Veltliner in a wine bar, unfold in the vineyard Heurigen of Grinzing over young wine and Schrammel music, or head to the canal, where legendary clubs like Flex and Grelle Forelle pump techno until dawn. Add world-class jazz cellars, rooftop bars and cavernous beer halls — plus the old 'Bermuda Triangle' quarter near the canal — and here is where to drink and dance, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Vienna nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
