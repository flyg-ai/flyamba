import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Amsterdam 2026 — Guide | Flyamba",
  description:
    "The best day trips from Amsterdam — Zaanse Schans windmills, the Keukenhof tulip gardens, historic Haarlem and Utrecht, fairytale Giethoorn and modern Rotterdam, with travel times and tips.",
  alternates: { canonical: `${SITE}/amsterdam/day-trips` },
  openGraph: { title: "Day Trips from Amsterdam | Flyamba", description: "Windmills, tulips, canal towns and modern cities — the best day trips from Amsterdam.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Culture", keys: ["culture"] },
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
          { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/amsterdam/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((t) => ({
        "@type": "TouristAttraction",
        name: t.name,
        description: t.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: t.rating, reviewCount: t.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AmsterdamDayTrips() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Amsterdam"
      heroImage="/images/amsterdam/dagsutflykter/zaanse-schans.webp"
      intro="One of the joys of Amsterdam is how easily the rest of the Netherlands opens up from it, thanks to a fast, reliable rail network. In well under an hour you can be among working windmills at Zaanse Schans, wandering the Golden Age streets of Haarlem or Utrecht, or exploring bold, modern Rotterdam — while spring brings the world's greatest tulip garden at Keukenhof, and the fairytale canal village of Giethoorn rewards a longer day out. Here are the best day trips, with travel times, costs and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
