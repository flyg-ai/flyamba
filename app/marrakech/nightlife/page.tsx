import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Marrakech 2026 — Bars & Clubs Guide | Flyamba",
  description:
    "Marrakech after dark — rooftop cocktail bars, dinner-cabarets, glamorous clubs and pool parties, plus how alcohol licensing works, where to drink in the…",
  alternates: { canonical: `${SITE}/marrakech/nightlife` },
  openGraph: { title: "Nightlife in Marrakech | Flyamba", description: "The best rooftop bars, cabarets and clubs in Marrakech, with licensing notes.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Rooftop bars", keys: ["rooftop"] },
  { label: "Cocktails", keys: ["cocktails"] },
  { label: "Clubs", keys: ["club"] },
  { label: "Cabaret & shows", keys: ["cabaret"] },
  { label: "Live music", keys: ["live-music"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/marrakech/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "Place",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MarrakechNightlife() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Marrakech Nightlife: Bars, Rooftops & Clubs"
      heroImage="/images/marrakech/nattliv/sky-bar-la-renaissance.webp"
      intro="Marrakech nightlife has two very different faces. Within the medina, evenings are mostly about atmosphere — the nightly carnival of Jemaa el-Fnaa, mint tea on rooftop terraces and a handful of licensed bars — while the new town of Gueliz and the hotel district of Hivernage host the glamorous other side: cocktail rooftops, theatrical dinner-cabarets, late-opening clubs and Palmeraie pool parties. One important thing to understand is alcohol: this is a Muslim city, so drink is served only in licensed venues, not in the souks or on the street, and dressier spots enforce a smart code. This guide covers the best of both worlds, with opening hours, prices and what to expect."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
