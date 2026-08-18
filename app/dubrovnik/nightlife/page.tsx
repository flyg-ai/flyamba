import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubrovnik Nightlife 2026 — Bars & Clubs Guide | Flyamba",
  description:
    "Where to drink and party in Dubrovnik — sunset cocktails at the cliff-side Buža bar, clubbing in the Revelin fortress, wine flights at D'vino, live jazz…",
  alternates: { canonical: `${SITE}/dubrovnik/nightlife` },
  openGraph: { title: "Dubrovnik Nightlife | Flyamba", description: "Dubrovnik's best bars and clubs, from cliff-side Buža to the Revelin fortress club, with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktail Bars", keys: ["cocktails"] },
  { label: "Wine & Beer", keys: ["wine", "beer"] },
  { label: "Clubs", keys: ["club"] },
  { label: "Live Music", keys: ["live-music"] },
  { label: "Sea View", keys: ["view"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/dubrovnik/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubrovnik", addressCountry: "HR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubrovnikNightlife() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Dubrovnik Nightlife"
      heroImage="/images/dubrovnik/nightlife/cocktail-bar-dubrovnik.webp"
      intro="Dubrovnik's nightlife is more about spectacular settings than all-night raving. The essential experience is a sunset drink at Buža, a bar reached through a hole in the city wall with terraces hanging over the sea; from there the evening can run to wine flights and live jazz in hidden squares, cocktails on a rooftop or beach club with the floodlit walls as a backdrop, or the city's one true nightclub, staged inside a 16th-century fortress. Here are the best places to drink after dark, with prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubrovnik nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
