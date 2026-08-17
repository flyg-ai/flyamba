import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prices in Florence 2026 — Cost Guide | Flyamba",
  description:
    "How much a trip to Florence costs — cheapest times to fly, daily budgets for every travel style, museum and attraction ticket prices, what meals cost…",
  alternates: { canonical: `${SITE}/florence/prices` },
  openGraph: { title: "How Much Does Florence Cost? | Flyamba", description: "Flights, daily budgets, museum tickets, food and transport costs for Florence.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Florence", item: `${SITE}/florence` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/florence/prices` },
    ],
  };
}

export default function FlorencePrices() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="How Much Does Florence Cost?"
      heroImage="/images/florence/sevardheter/uffizierna-galleria-degli-uffizi.webp"
      intro="Florence is a compact, high-demand city where the big costs are accommodation and the major museums, but where so much of the beauty — the churches, the piazzas, the open-air sculpture and the great viewpoints — is free or nearly so. This guide breaks down what a trip really costs: when it is cheapest to fly, realistic daily budgets for backpackers, mid-range travellers and luxury visitors, the price of tickets to the Uffizi, Accademia and Duomo, what meals and the famous bistecca cost, and how little you will spend getting around a city best walked."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Florence costs explained" items={PRICES} />
    </CityGuideShell>
  );
}
