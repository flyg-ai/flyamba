import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Phuket Prices 2026 — Costs & Budget Guide | Flyamba",
  description:
    "How much a trip to Phuket costs — the cheapest months to fly, daily budgets from backpacker to luxury, tour, activity and attraction prices, what meals…",
  alternates: { canonical: `${SITE}/phuket/prices` },
  openGraph: { title: "Phuket Prices & Budget Guide | Flyamba", description: "What a Phuket trip costs: flights, daily budgets, tours, food and transport, with saving tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/phuket/prices` },
    ],
  };
}

export default function PhuketPrices() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Phuket Prices & Budget Guide"
      heroImage="/images/phuket/sevardheter/promthep-cape.webp"
      intro="Phuket is one of the best-value beach destinations in the world, but costs swing enormously depending on how you travel — from a few dollars a day eating at markets and riding songthaews, to five-star villa resorts and premium tours. This guide breaks down the real costs: when flights are cheapest, sensible daily budgets from backpacker to luxury, what island tours and activities charge, how much meals and drinks cost, and getting-around fares, all with practical tips to make your baht go further. Flight prices are shown in US dollars; on-the-ground costs are in Thai baht (฿)."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="The cost of visiting Phuket" items={PRICES} />
    </CityGuideShell>
  );
}
