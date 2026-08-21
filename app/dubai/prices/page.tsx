import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubai Prices 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much a trip to Dubai costs — when flights are cheapest (summer is low season), daily budgets from backpacker to luxury, attraction and activity…",
  alternates: { canonical: `${SITE}/dubai/prices` },
  openGraph: { title: "Dubai Prices & Budget Guide | Flyamba", description: "What a Dubai trip costs: flights, daily budgets, tickets, food and transport, with saving tips.", type: "article" },
};


export default function DubaiPrices() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Dubai Prices & Budget Guide"
      heroImage="/images/dubai/attractions/gold-souk.webp"
      intro="Dubai has a reputation for expense, but it can be a genuine bargain if you travel smart — cheap Metro rides, superb $5 curry houses, free public beaches and free spectacles like the Dubai Fountain — or eye-wateringly pricey if you stick to five-star resorts, beach clubs, brunches and taxis. This guide breaks down the real costs: when flights are cheapest (summer, counter-intuitively), sensible daily budgets, what attractions and activities charge, food, drink and alcohol prices, and getting-around fares, with tips to make your money go further."
      wide
    >
      <CategorySeoSections heading="The cost of visiting Dubai" items={PRICES} />
    </CityGuideShell>
  );
}
