import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { PRICES, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Tenerife Prices & Budget 2026 — How Much Does a Trip Cost? | Flyamba",
  description:
    "How much does Tenerife cost? A full price guide in euros — eating out and the menú del día, attraction tickets, transport, accommodation and daily budgets for budget, mid-range and luxury travellers.",
  alternates: { canonical: `${SITE}/tenerife/prices` },
  openGraph: { title: "Tenerife Prices & Daily Budgets | Flyamba", description: "Food, tickets, transport and accommodation costs in euros.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/tenerife/prices` },
    ],
  };
}

export default function TenerifePrices() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Tenerife Prices & Daily Budgets"
      heroImage="/images/tenerife/sevardheter/la-laguna.webp"
      intro="Tenerife is an affordable destination by European standards, helped by the Canary Islands' low taxes on fuel, alcohol and many goods. The big theme parks are the main splurge, while nature, historic towns and beaches cost little or nothing. This guide breaks down real prices in euros — food, tickets, transport and accommodation — and sets out daily budgets for every travel style."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Tenerife costs in detail" items={PRICES} />
    </CityGuideShell>
  );
}
