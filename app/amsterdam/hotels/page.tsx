import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Amsterdam 2026 — Best Hotels Guide | Flyamba",
  description:
    "The best hotels in Amsterdam — canal-house luxury, design boutiques and smart budget stays, with areas, nightly prices in USD and tips on the best neighbourhoods.",
  alternates: { canonical: `${SITE}/amsterdam/hotels` },
  openGraph: { title: "Best Hotels in Amsterdam | Flyamba", description: "Canal palaces, design boutiques and budget picks — where to stay in Amsterdam.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Amsterdam", item: `${SITE}/amsterdam` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/amsterdam/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AmsterdamHotels() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Amsterdam"
      heroImage="/images/amsterdam/hotell/pulitzer-amsterdam.webp"
      intro="Amsterdam's most memorable hotels put you right inside its Golden Age heritage — five-star canal palaces on the Herengracht, boutique hideaways wrapped around hidden courtyards, and design-led towers with sweeping IJ views — alongside sharp, affordable modern stays for tighter budgets. This guide covers the best places to stay across every price band, with neighbourhoods, nightly rates in USD and tips on which area suits your trip."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
