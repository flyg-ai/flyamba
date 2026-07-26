import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Vienna 2026 — Guide | Flyamba",
  description:
    "The best day trips from Vienna — the UNESCO Wachau Valley and Dürnstein, Mozart's Salzburg, Baroque Melk Abbey, laid-back Bratislava, storybook Hallstatt and the Semmering mountain railway, with train times and tips.",
  alternates: { canonical: `${SITE}/vienna/day-trips` },
  openGraph: { title: "Best Day Trips from Vienna | Flyamba", description: "Six great day trips from Vienna, from the Wachau and Melk to Salzburg and Bratislava, with directions.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half-day", keys: ["half-day"] },
  { label: "Full-day", keys: ["full-day"] },
  { label: "By Train", keys: ["train"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Culture", keys: ["culture"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Vienna", item: `${SITE}/vienna` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/vienna/day-trips` },
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

export default function ViennaDayTrips() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Vienna"
      heroImage="/images/vienna/dagsutflykter/hallstatt.webp"
      intro="Vienna makes a superb base for exploring Austria and beyond. Within an hour or two you can cruise the vineyard-lined Wachau Valley, tour the golden abbey of Melk, wander laid-back Bratislava across the border or ride a UNESCO mountain railway into the Alps; fast trains reach Mozart's Salzburg and the storybook lakeside village of Hallstatt for the day. Here are the six best excursions, each with realistic travel times, ticket prices and tips on how to make the most of a day away from the city."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Vienna in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
