import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prices in Vienna 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much a trip to Vienna costs — the cheapest months to fly, daily budgets from backpacker to luxury, attraction and museum ticket prices, what meals and coffee cost and getting-around fares, with money-saving tips.",
  alternates: { canonical: `${SITE}/vienna/prices` },
  openGraph: { title: "Vienna Prices & Budget Guide | Flyamba", description: "What a Vienna trip costs: flights, daily budgets, tickets, food and transport, with saving tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Vienna", item: `${SITE}/vienna` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/vienna/prices` },
    ],
  };
}

export default function ViennaPrices() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Vienna Prices & Budget Guide"
      heroImage="/images/vienna/sevardheter/karlskirche.webp"
      intro="Vienna can be a surprisingly affordable city break — so much of it, from the churches and palace gardens to the parks, the Ring and standing-room opera tickets, is free or cheap — or a grand splurge, depending on how you travel. This guide breaks down the real costs: when flights are cheapest, sensible daily budgets from backpacker to luxury, what attractions and museums charge, how much meals and coffee-house treats cost, and getting-around fares, all with practical tips to make your euros go further."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of visiting Vienna" items={PRICES} />
    </CityGuideShell>
  );
}
