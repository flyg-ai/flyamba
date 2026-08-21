import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Florence 2026 — Guide | Flyamba",
  description:
    "The best day trips from Florence — Pisa and its Leaning Tower, medieval Siena, the towers of San Gimignano, the Chianti wine country, walled Lucca and…",
  alternates: { canonical: `${SITE}/florence/day-trips` },
  openGraph: { title: "Best Day Trips from Florence | Flyamba", description: "Pisa, Siena, San Gimignano, Chianti, Lucca and the Cinque Terre, with travel advice.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half-day", keys: ["half-day"] },
  { label: "Full-day", keys: ["full-day"] },
  { label: "By train", keys: ["train"] },
  { label: "Wine & nature", keys: ["wine", "nature"] },
];


export default function FlorenceDayTrips() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Florence"
      heroImage="/images/florence/sevardheter/fiesole.webp"
      intro="Florence sits at the heart of Tuscany and on Italy's high-speed rail network, which makes it one of the best bases in the country for day trips. Within an hour or two you can reach the Leaning Tower of Pisa, the magnificent medieval city of Siena, the towered skyline of San Gimignano, the vineyards of Chianti, the walled charm of Lucca and even the cliff-clinging villages of the Cinque Terre. Here are the best excursions, with travel times, transport advice and tips on doing each one well."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Florence in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
