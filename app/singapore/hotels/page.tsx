import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Hotels in Singapore 2026 — Guide | Flyamba",
  description:
    "Where to stay in Singapore — from the iconic Marina Bay Sands and colonial Raffles to island resorts, boutique shophouse stays and stylish value picks, with areas, prices and tips.",
  alternates: { canonical: `${SITE}/singapore/hotels` },
  openGraph: { title: "Best Hotels in Singapore | Flyamba", description: "8 top Singapore hotels across every budget, with areas, prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Marina Bay", keys: ["marina"] },
  { label: "Colonial", keys: ["colonial"] },
  { label: "Boutique", keys: ["boutique"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/singapore/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeHotels() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Singapore"
      heroImage="/images/singapore/hotell/marina-bay-sands.webp"
      intro="Singapore's hotels run from bucket-list icons to characterful boutique bolt-holes. You can swim in the world's most famous rooftop infinity pool at Marina Bay Sands, sip a Sling in the colonial splendour of Raffles, retreat to an island resort on Sentosa, or bed down in a restored shophouse in Chinatown. Accommodation is one of the pricier parts of a Singapore trip, so here are 8 standout stays across every budget and neighbourhood, with areas, prices and tips to help you choose."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
