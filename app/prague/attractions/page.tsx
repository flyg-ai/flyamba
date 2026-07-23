import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Prague 2026 — Visitor Guide | Flyamba",
  description:
    "The 18 best things to do in Prague — Charles Bridge, Prague Castle, St Vitus Cathedral, the Old Town Square and Astronomical Clock, the Jewish Quarter and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/prague/attractions` },
  openGraph: { title: "Best Things to Do in Prague | Flyamba", description: "18 top Prague attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "History", keys: ["history"] },
  { label: "Architecture", keys: ["architecture"] },
  { label: "Views", keys: ["views"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Parks", keys: ["parks"] },
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
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/prague/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function PragueAttractions() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Prague"
      heroImage="/images/prague/sevardheter/karlsbron.webp"
      intro="Few cities pack as much beauty into as small a space as Prague. From the Gothic sweep of Charles Bridge and the vast hilltop castle to the medieval theatre of the Astronomical Clock, the haunting Jewish Quarter and the green heights of Petřín and Vyšehrad, almost everything worth seeing is walkable and much of it is free. Here are the 18 attractions worth building your trip around, each with prices, opening hours and tips to dodge the crowds."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
