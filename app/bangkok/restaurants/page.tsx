import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { RESTAURANTS } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Bangkok 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Bangkok — from Michelin street-food legend Jay Fai and three-star Sorn to Gaggan, Le Du and the city's best pad thai, with tips and price…",
  alternates: { canonical: `${SITE}/bangkok/restaurants` },
  openGraph: { title: "Best Restaurants in Bangkok | Flyamba", description: "Street-food legends to fine dining, with tips and prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Street food", keys: ["street-food"] },
  { label: "Fine dining", keys: ["fine-dining"] },
  { label: "Michelin", keys: ["michelin"] },
  { label: "Thai", keys: ["thai"] },
  { label: "Local", keys: ["local"] },
];


export default function BangkokRestaurants() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Bangkok"
      heroImage="/images/bangkok/restaurants/restaurant-bangkok.avif"
      intro="Few cities on earth eat as well as Bangkok. This is a place where a roadside stall can hold a Michelin star and a tasting menu can top the list of Asia's finest — where charcoal-fired woks, fiery southern curries and the world's most famous pad thai sit alongside progressive fine dining. These 10 restaurants span the full spectrum, from Jay Fai's legendary crab omelette to three-Michelin-star Sorn, each with the practical details to help you plan and book."
      wide
    >
      <div className="mt-8">
        <CategoryExplorer items={RESTAURANTS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bangkok restaurants in detail" items={RESTAURANTS} />
    </CityGuideShell>
  );
}
