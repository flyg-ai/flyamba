import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Dubrovnik 2026 — Guide | Flyamba",
  description:
    "The best day trips from Dubrovnik — Kotor and the Bay of Montenegro, Ottoman Mostar in Bosnia, the car-free Elaphiti islands, the oyster-and-wine…",
  alternates: { canonical: `${SITE}/dubrovnik/day-trips` },
  openGraph: { title: "Best Day Trips from Dubrovnik | Flyamba", description: "Day trips from Dubrovnik: Montenegro, Mostar, the islands, Cavtat and more, with distances and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "By Boat", keys: ["boat"] },
  { label: "Cross-Border", keys: ["cross-border"] },
  { label: "Historic Towns", keys: ["historic"] },
  { label: "Nature", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubrovnikDayTrips() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Dubrovnik"
      heroImage="/images/dubrovnik/day-trips/costa-brava-landscape-dubrovnik.webp"
      intro="Few cities sit at such a crossroads. From Dubrovnik you can cross into Montenegro to the fjord-like Bay of Kotor, into Bosnia to Ottoman Mostar and its diving bridge, or hop by boat to a string of car-free islands, all in a day. Closer to home lie the oyster beds and wineries of the Pelješac peninsula, charming little Cavtat, the green lakes of Mljet and Roman Split up the coast. Here are the best day trips, with real distances, transport and tips — and don't forget your passport for the border runs."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Dubrovnik in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
