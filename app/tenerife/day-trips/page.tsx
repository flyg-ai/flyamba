import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Tenerife 2026 — Teide, Masca & La Gomera",
  description:
    "The best day trips in Tenerife: the Teide summit and cable car, the Masca gorge hike, a ferry to La Gomera, the Anaga forests, Garachico and Icod, and…",
  alternates: { canonical: `${SITE}/tenerife/day-trips` },
  openGraph: { title: "Best Day Trips from Tenerife | Flyamba", description: "Teide, Masca, La Gomera, Anaga and stargazing.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Nature", keys: ["nature"] },
  { label: "Hiking", keys: ["hiking"] },
  { label: "Island", keys: ["island"] },
  { label: "Stargazing", keys: ["stargazing"] },
];


export default function TenerifeDayTrips() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Tenerife"
      heroImage="/images/tenerife/dagsutflykter/masca-by.webp"
      intro="Tenerife rewards those who venture beyond the beach. In a single day you can stand atop Spain's highest volcano, hike a spectacular gorge to a hidden beach, ferry to the unspoilt island of La Gomera, lose yourself in ancient laurel forests, or stargaze under some of the clearest skies on Earth. Here are the six best day trips, with distances, logistics and tips."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
