import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Phuket 2026 — Bars & Clubs Guide | Flyamba",
  description:
    "Where to go out in Phuket — the neon of Bangla Road, mega-clubs, glamorous beach clubs, the famous Simon Cabaret, jaw-dropping rooftop bars, mellow…",
  alternates: { canonical: `${SITE}/phuket/nightlife` },
  openGraph: { title: "Phuket Nightlife Guide | Flyamba", description: "Phuket's best bars, clubs, beach clubs, cabaret and sunset spots with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bangla Road", keys: ["patong"] },
  { label: "Beach Clubs", keys: ["beachclub"] },
  { label: "Cabaret", keys: ["cabaret"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Live Music", keys: ["livemusic"] },
  { label: "Sunset Bars", keys: ["sunset"] },
  { label: "Clubs", keys: ["clubs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/phuket/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Phuket", addressCountry: "TH" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PhuketNightlife() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Phuket Nightlife"
      heroImage="/images/phuket/sevardheter/phuket-fantasea.webp"
      intro="Phuket's nightlife is as varied as it is famous. At one extreme roars Bangla Road, Patong's neon-soaked party strip of beer bars, mega-clubs and cabaret; at the other, mellow reggae shacks and clifftop bars pour cheap drinks under spectacular sunsets. In between sit glamorous beach clubs spinning house by the pool, the glittering Simon Cabaret, live-rock venues and one of the world's most jaw-dropping rooftop bars. Here is where to drink, dance and watch the sun go down, from the first sundowner to the last dance floor, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
