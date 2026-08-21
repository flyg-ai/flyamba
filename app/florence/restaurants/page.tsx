import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Restaurants in Florence 2026 — Guide | Flyamba",
  description:
    "Where to eat in Florence — the best Tuscan trattorias, the bistecca alla fiorentina, ribollita, legendary schiacciata panini and fine dining, with areas…",
  alternates: { canonical: `${SITE}/florence/restaurants` },
  openGraph: { title: "Where to Eat in Florence | Flyamba", description: "The best Florence restaurants, trattorias and street food with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Tuscan classics", keys: ["tuscan"] },
  { label: "Casual & budget", keys: ["casual", "budget"] },
  { label: "Street food", keys: ["street-food"] },
  { label: "Modern", keys: ["modern"] },
  { label: "Fine dining", keys: ["fine"] },
];


export default function FlorenceRestaurants() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Florence"
      heroImage="/images/florence/sevardheter/mercato-centrale.webp"
      intro="Florence is the heartland of Tuscan cooking — a cuisine built on superb ingredients kept gloriously simple. This is the home of the bistecca alla fiorentina, the enormous charcoal-grilled T-bone of Chianina beef, of ribollita and pappa al pomodoro, of wild-boar pastas and the city's legendary stuffed schiacciata panini. From boisterous lunch-only trattorias to a three-Michelin-star temple, here are the best places to eat, with areas, price levels and booking advice."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Florence restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
