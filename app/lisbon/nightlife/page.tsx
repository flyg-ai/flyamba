import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Lisbon Nightlife 2026 — Best Bars, Clubs & Fado | Flyamba",
  description:
    "Where to go out in Lisbon — the Bairro Alto street party, Pink Street and Cais do Sodré, legendary club Lux Frágil, rooftop bars, jazz and authentic fado taverns, with tips and prices.",
  alternates: { canonical: `${SITE}/lisbon/nightlife` },
  openGraph: { title: "Lisbon Nightlife | Flyamba", description: "Bars, clubs, rooftops and fado in Lisbon.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bars & rooftops", keys: ["bars"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Live music", keys: ["live-music"] },
  { label: "Fado", keys: ["fado"] },
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
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/lisbon/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonNightlife() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Lisbon Nightlife"
      heroImage="/images/lisbon/nattliv/park-bar.webp"
      intro="Lisbon goes out late and goes out well. The night starts with sundowners at a hidden rooftop bar, rolls into the roaming street party of Bairro Alto and the pink-painted lanes of Cais do Sodré, and — for the committed — ends at dawn on the riverside terrace of Lux Frágil. Between it all runs the soulful thread of fado, sung in tiny taverns across Alfama and Bairro Alto. Here's where to drink, dance and listen, from cocktail curiosities to the city's best clubs."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Lisbon nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
