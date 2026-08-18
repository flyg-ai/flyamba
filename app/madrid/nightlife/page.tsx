import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/madrid-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Madrid Nightlife 2026 — Bars, Clubs & Flamenco Guide",
  description:
    "The best of Madrid nightlife — World's 50 Best cocktail bars like Salmon Guru, the legendary Corral de la Morería flamenco tablao, Café Central jazz…",
  alternates: { canonical: `${SITE}/madrid/nightlife` },
  openGraph: { title: "Madrid Nightlife | Flyamba", description: "Madrid's best bars, clubs, flamenco and jazz.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktail bars", keys: ["cocktail", "bars"] },
  { label: "Clubs", keys: ["klubb", "clubs"] },
  { label: "Live music", keys: ["live"] },
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
          { "@type": "ListItem", position: 2, name: "Madrid", item: `${SITE}/madrid` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/madrid/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Madrid", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MadridNightlife() {
  return (
    <CityGuideShell
      citySlug="madrid"
      cityName="Madrid"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Madrid Nightlife"
      heroImage="/images/madrid/nightlife/cocktail-bar-madrid.webp"
      intro="Madrid barely sleeps — the night starts late (the first drink often around 10pm, clubs filling after 1am) and runs until dawn. The range is world-class: World's 50 Best cocktail bars like Salmon Guru, the most famous flamenco tablao on Earth at Corral de la Morería, jazz at the legendary Café Central, rooftop terraces, and clubs from the seven-floor Teatro Kapital to the vast Fabrik superclub. Here are 10 of the city's best evening and late-night spots, with opening times, areas and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Madrid nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
