import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, HOTELS } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Hotels in London 2026 — Guide | Flyamba",
  description:
    "Where to stay in London — from the Savoy, Ritz and Claridge's to hip Shoreditch boutiques and great-value chains. The 8 best hotels by neighbourhood and budget, with nightly rates and tips.",
  alternates: { canonical: `${SITE}/london/hotels` },
  openGraph: { title: "Best Hotels in London | Flyamba", description: "8 top London hotels by area and budget, with rates and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Central", keys: ["central"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/london/hotels` },
    ],
  };
}

export default function LondonHotels() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in London"
      heroImage="/images/london/hotell/the-savoy.webp"
      intro="Choosing where to stay shapes any London trip, from legendary grande-dame hotels to design-led boutiques and dependable budget bases. This guide covers 8 of the best places to stay across neighbourhoods and price points — the iconic luxury names, the coolest boutiques and the smartest-value picks — with nightly rates and location tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
