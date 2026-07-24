import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Bali 2026 — Guide | Flyamba",
  description:
    "The best day trips from Bali — the T-Rex cliff of Nusa Penida, a Mount Batur sunrise trek, the car-free Gili Islands, Ubud's temples and rice terraces, iconic Tanah Lot and the north-coast dolphins of Lovina, with travel times and tips.",
  alternates: { canonical: `${SITE}/bali/day-trips` },
  openGraph: { title: "Day Trips from Bali | Flyamba", description: "Islands, volcanoes, temples and rice terraces — the best day trips from Bali.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half-day", keys: ["half-day"] },
  { label: "Full-day", keys: ["full-day"] },
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
          { "@type": "ListItem", position: 2, name: "Bali", item: `${SITE}/bali` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/bali/day-trips` },
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

export default function BaliDayTrips() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Bali"
      heroImage="/images/bali/day-trips/nusa-penida.webp"
      intro="Bali makes a superb base for exploring beyond its shores. In a day you can boat across to the dramatic clifftops of Nusa Penida, climb an active volcano for sunrise on Mount Batur, snorkel with turtles off the car-free Gili Islands, dive into the temples and rice terraces of Ubud, or watch the sun set behind the sea temple of Tanah Lot. Here are the best day trips, with travel times, costs and tips — some so good you may want to stay overnight."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
