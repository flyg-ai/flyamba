import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prague Nightlife 2026 — Beer Halls, Bars & Clubs | Flyamba",
  description:
    "Prague after dark — legendary beer halls pouring perfect pilsner, world-ranked cocktail bars, underground clubs, jazz cellars and rooftop lounges. 10 of the best nightlife spots with hours, prices and tips.",
  alternates: { canonical: `${SITE}/prague/nightlife` },
  openGraph: { title: "Prague Nightlife | Flyamba", description: "10 top Prague bars, beer halls and clubs.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Beer Halls", keys: ["beer-halls"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Cocktail Bars", keys: ["cocktail-bars"] },
  { label: "Live Music", keys: ["live-music"] },
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
          { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/prague/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PragueNightlife() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Prague Nightlife"
      heroImage="/images/prague/nattliv/u-zlatho-tygra.webp"
      intro="Prague drinks in style. This is the home of the world's best pilsner, poured fresh from the tank in gruff, timeless beer halls, but the after-dark scene runs far deeper: world-ranked cocktail bars, an extraordinary art-club built from recycled machinery, historic jazz cellars, sprawling underground wine caves, panoramic rooftop lounges and Central Europe's biggest mega-club. From a quiet perfect pint to dawn on the dance floor, here are 10 of the best places to spend a night out, with hours, prices and etiquette tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
