import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cancún Prices 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much a trip to Cancún costs — the cheapest months to fly, daily budgets from backpacker to luxury, all-inclusive versus paying as you go, attraction and tour prices, what meals cost and getting-around fares, with money-saving tips.",
  alternates: { canonical: `${SITE}/cancun/prices` },
  openGraph: { title: "Cancún Prices & Budget Guide | Flyamba", description: "What a Cancún trip costs: flights, daily budgets, all-inclusive vs à la carte, tours, food and transport.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cancún", item: `${SITE}/cancun` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/cancun/prices` },
    ],
  };
}

export default function CancunPrices() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Cancún Prices & Budget Guide"
      heroImage="/images/placeholders/placeholder-shopping.webp"
      intro="Cancún can be a budget beach break or a luxury blowout, with a wider gap between the two than almost any destination thanks to the very different worlds of the tourist Hotel Zone and the local downtown. This guide breaks down the real costs: when flights are cheapest, sensible daily budgets from backpacker to luxury, the big all-inclusive-versus-room-only decision, what attractions, tours and the famous eco-parks charge, how much meals cost on the strip versus downtown, and getting-around fares — all with practical tips to make your money go further and to avoid the timeshare traps that prey on tourists."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of visiting Cancún" items={PRICES} />
    </CityGuideShell>
  );
}
