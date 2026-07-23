import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Athens Nightlife 2026 — Best Bars, Rooftops & Clubs | Flyamba",
  description:
    "Where to drink and party in Athens — world-ranked cocktail bars, Acropolis-view rooftops in Monastiraki, the alternative clubs of Gazi and historic Plaka bars, with areas, prices and tips.",
  alternates: { canonical: `${SITE}/athens/nightlife` },
  openGraph: { title: "Athens Nightlife | Flyamba", description: "The best bars, rooftops and clubs in Athens.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bars", keys: ["bars"] },
  { label: "Rooftops", keys: ["rooftop"] },
  { label: "Clubs", keys: ["clubs"] },
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
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/athens/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AthensNightlife() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Athens Nightlife: Bars, Rooftops & Clubs"
      heroImage="/images/content/photo-1516450360452-9312f5e86fc7.avif"
      intro="Athens has quietly become one of Europe's great nights out. The centre around Kolokotroni and Agia Irini holds cocktail bars that regularly rank among the world's best; Monastiraki's rooftops serve sundowners with the floodlit Acropolis as backdrop; the former gasworks district of Gazi throbs with clubs and live venues; and Plaka hides a historic distillery bar. Here are 9 of the best places to drink and dance, with neighbourhoods, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athens nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
