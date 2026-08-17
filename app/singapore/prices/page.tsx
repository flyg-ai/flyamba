import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prices in Singapore 2026 — Guide | Flyamba",
  description:
    "How much does Singapore cost? When flights are cheapest, realistic daily budgets, whether Singapore is expensive, and money-saving tips from hawker meals…",
  alternates: { canonical: `${SITE}/singapore/prices` },
  openGraph: { title: "Singapore Prices & Budget | Flyamba", description: "Flight prices, daily budgets and money-saving tips for Singapore.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/singapore/prices` },
    ],
  };
}

export default function SingaporePrices() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Singapore Prices & Budget"
      heroImage="/images/singapore/sevardheter/merlion-park.webp"
      intro="Singapore has a reputation as one of the world's most expensive cities, and for hotels, alcohol and taxis that is fair — but food and public transport are outstanding value, and many of the best experiences are free. That contrast means your daily budget depends heavily on your choices. This guide breaks down when flights to Singapore are cheapest, realistic daily budgets from backpacker to luxury, where the city is costly and where it is a bargain, and the best money-saving tips, from hawker meals and GST refunds to happy hours and advance tickets. Prices on the ground are quoted in Singapore dollars (SGD)."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Singapore prices explained" items={PRICES} />
    </CityGuideShell>
  );
}
