import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Rome Nightlife 2026 — Bars & Clubs Guide | Flyamba",
  description:
    "Where to go out in Rome — Trastevere aperitivo bars, hidden speakeasies, rooftop terraces with dome views, live jazz and blues, and the city's best clubs, with areas, prices and insider tips.",
  alternates: { canonical: `${SITE}/rome/nightlife` },
  openGraph: { title: "Rome Nightlife Guide | Flyamba", description: "Rome's best bars, rooftops, live music and clubs with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktail Bars", keys: ["cocktails"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Live Music", keys: ["music"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Wine Bars", keys: ["wine"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/rome/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Rome", addressCountry: "IT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function RomeNightlife() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Rome Nightlife"
      heroImage="/images/rome/nattliv/terrazza-caffarelli.webp"
      intro="Rome's night begins gently with aperitivo — a spritz and a spread of snacks as the light softens — and unfolds from there. Trastevere's lanes buzz with bars, hidden speakeasies mix serious cocktails, rooftop terraces frame the domes at sunset, cellars host live jazz and blues, and a handful of clubs keep going until dawn. Here is where to drink and dance, from the first Negroni to the last dance floor, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Rome nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
