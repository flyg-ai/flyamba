import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/reykjavik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Reykjavik Nightlife 2026 — Best Bars & Clubs Guide | Flyamba",
  description:
    "Reykjavik after dark — craft-beer bars, the cult Kaffibarinn, live-music clubs like Húrra and Gaukurinn, rooftop cocktails and the legendary weekend rúntur bar-crawl, with areas and tips.",
  alternates: { canonical: `${SITE}/reykjavik/nightlife` },
  openGraph: { title: "Reykjavik Nightlife Guide | Flyamba", description: "Craft beer, live music, hipster bars and the famous rúntur — the best of Reykjavik after dark.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bars", keys: ["bar"] },
  { label: "Clubs", keys: ["club"] },
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
          { "@type": "ListItem", position: 2, name: "Reykjavik", item: `${SITE}/reykjavik` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/reykjavik/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Reykjavik", addressCountry: "IS" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ReykjavikNightlife() {
  return (
    <CityGuideShell
      citySlug="reykjavik"
      cityName="Reykjavik"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Reykjavik Nightlife"
      heroImage="/images/placeholders/placeholder-nightlife.webp"
      intro="Reykjavik's nightlife is Nordic-bohemian at its best — a scene built on craft-beer bars, cult hangouts like Kaffibarinn (once part-owned by Damon Albarn of Blur), live-music clubs and rooftop cocktail spots, all packed into a tiny, walkable centre. The famous weekend rúntur, a bar-crawl along Laugavegur that starts late and runs until 4:30am, is a local institution. Drinks are famously expensive, so many Icelanders warm up at home first. Under the summer midnight sun the party can run right through to sunrise. Here are the best bars, clubs and live-music spots, with areas, styles and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Reykjavik nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
