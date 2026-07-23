import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE } from "@/app/data/santorini-places";
import { SANTORINI_CATEGORIES } from "@/app/lib/santorini";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Santorini Nightlife 2026 — Sunset Bars & Clubs Guide | Flyamba",
  description:
    "Santorini after dark — legendary caldera cocktail bars in Fira like Franco's and PK, the island's biggest club Koo, rowdy budget bars, and the south-coast beach clubs of Perivolos. Where to drink and dance.",
  alternates: { canonical: `${SITE}/santorini/nightlife` },
  openGraph: { title: "Santorini Nightlife | Flyamba", description: "9 of the best Santorini bars and clubs, from cliff-edge cocktails to beach-club parties.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktails", keys: ["cocktails"] },
  { label: "Sunset", keys: ["sunset"] },
  { label: "Party", keys: ["party"] },
  { label: "Club", keys: ["club"] },
  { label: "Beach bars", keys: ["beach"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Santorini", item: `${SITE}/santorini` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/santorini/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: n.area, addressRegion: "Santorini", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SantoriniNightlife() {
  return (
    <CityGuideShell
      citySlug="santorini"
      cityName="Santorini"
      categories={SANTORINI_CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Santorini Nightlife"
      heroImage="/images/santorini/nattliv/francos-bar.webp"
      intro="Santorini's nightlife is more romance than rave, but it has real range. The caldera cliff in Fira is lined with legendary cocktail bars where you toast the sunset in style; the town also holds the island's biggest club and its cheapest, rowdiest party bars. Down south, the beach clubs of Perissa and Perivolos run from lazy sunbeds to late-night DJs. Here are the nine spots that define a night out on the island, from cliff-edge glamour to beachy mayhem."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Santorini nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
