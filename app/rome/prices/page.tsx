import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Rome Prices 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much a trip to Rome costs — the cheapest months to fly, daily budgets from backpacker to luxury, attraction and museum ticket prices, what meals cost and getting-around fares, with money-saving tips.",
  alternates: { canonical: `${SITE}/rome/prices` },
  openGraph: { title: "Rome Prices & Budget Guide | Flyamba", description: "What a Rome trip costs: flights, daily budgets, tickets, food and transport, with saving tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/rome/prices` },
    ],
  };
}

export default function RomePrices() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Rome Prices & Budget Guide"
      heroImage="/images/rome/sevardheter/trevi-fontanen.webp"
      intro="Rome can be surprisingly affordable — so much of the city, from the Pantheon and St Peter's to every great piazza and fountain, is free — or a splurge, depending on how you travel. This guide breaks down the real costs: when flights are cheapest, sensible daily budgets from backpacker to luxury, what attractions and museums charge, how much meals and coffee cost, and getting-around fares, all with practical tips to make your euros go further."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of visiting Rome" items={PRICES} />
    </CityGuideShell>
  );
}
