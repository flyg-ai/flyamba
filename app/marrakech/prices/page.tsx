import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Marrakech Prices & Costs 2026 — Budget Guide | Flyamba",
  description:
    "What a trip to Marrakech costs — the cheapest months to fly, daily budgets from backpacker to luxury, attraction and food prices, and how money and…",
  alternates: { canonical: `${SITE}/marrakech/prices` },
  openGraph: { title: "Marrakech Prices & Costs | Flyamba", description: "Flight prices, daily budgets, food and attraction costs, and haggling in Marrakech.", type: "article" },
};


export default function MarrakechPrices() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Marrakech Prices & Travel Costs"
      heroImage="/images/marrakech/sevardheter/souker-basarerna.webp"
      intro="Marrakech is one of the best-value city breaks within easy reach of Europe — but costs swing enormously depending on how you travel, from a few-dollar street lunch to a thousand-dollar palace suite. This guide breaks down what a trip really costs: when flights are cheapest, realistic daily budgets for backpacker, mid-range and luxury styles, what the sights, activities and meals cost, and how money and the all-important art of haggling work. Flight prices are shown in USD; on the ground, everything runs on the Moroccan dirham (MAD), a closed currency you can only get once you arrive."
      wide
    >
      <CategorySeoSections heading="Marrakech costs explained" items={PRICES} />
    </CityGuideShell>
  );
}
