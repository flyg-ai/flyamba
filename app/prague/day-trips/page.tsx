import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Prague 2026 — Castles, Towns & More | Flyamba",
  description:
    "The best day trips from Prague — the bone church at Kutná Hora, fairytale Český Krumlov, Karlštejn Castle, the moving Terezín memorial, spa-town Karlovy Vary and cross-border Dresden, with travel times and tips.",
  alternates: { canonical: `${SITE}/prague/day-trips` },
  openGraph: { title: "Best Day Trips from Prague | Flyamba", description: "6 top day trips from Prague with travel times and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Castles", keys: ["castles"] },
  { label: "UNESCO", keys: ["unesco"] },
  { label: "History", keys: ["history"] },
  { label: "Nature", keys: ["nature"] },
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
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/prague/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PragueDayTrips() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Prague"
      heroImage="/images/prague/dagsutflykter/esk-krumlov.webp"
      intro="Prague sits at the heart of Bohemia, with fast, cheap trains and buses fanning out to some of Central Europe's most rewarding excursions. Within a couple of hours you can reach the eerie bone church of Kutná Hora, the fairytale riverside town of Český Krumlov, an emperor's Gothic treasure-castle, a moving Holocaust memorial, an elegant belle-époque spa town, or even cross the border to baroque Dresden. Here are 6 of the best day trips, with travel times, costs and how to do each one."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
