import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Amsterdam Nightlife 2026 — Best Bars & Clubs Guide | Flyamba",
  description:
    "Amsterdam after dark — legendary clubs like Paradiso and the Melkweg, underground techno, cosy brown cafés, speakeasy cocktail bars and the Red Light District, with areas and tips.",
  alternates: { canonical: `${SITE}/amsterdam/nightlife` },
  openGraph: { title: "Amsterdam Nightlife Guide | Flyamba", description: "Clubs, live music, brown cafés and cocktail bars — the best of Amsterdam after dark.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Live music", keys: ["live-music"] },
  { label: "Bars", keys: ["bars"] },
  { label: "Rooftop", keys: ["rooftop"] },
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
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/amsterdam/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AmsterdamNightlife() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Amsterdam Nightlife"
      heroImage="/images/amsterdam/nattliv/paradiso.webp"
      intro="Amsterdam's nightlife is among Europe's best and most varied. Legendary music venues Paradiso and the Melkweg anchor the buzzing Leidseplein, serious techno pounds beneath the A'DAM Toren, and world-class speakeasies pour cocktails behind unmarked doors — while centuries-old 'brown cafés' offer the cosy, jenever-soaked flip side. The famous Red Light District (De Wallen), just east of Dam Square, remains a curiosity to walk through, but note that photographing the windows is strictly forbidden and the neighbourhood is being gradually reshaped by the city. Here are the best bars, clubs and live-music spots for a great night out, with areas, styles and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
