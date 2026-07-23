import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Athens 2026 — Best Hotels Guide | Flyamba",
  description:
    "The best hotels in Athens by neighbourhood and budget — from grand five-stars and Acropolis-view rooftop pools to design boutiques and stylish budget hostels, with prices and tips.",
  alternates: { canonical: `${SITE}/athens/hotels` },
  openGraph: { title: "Best Hotels in Athens | Flyamba", description: "Where to stay in Athens, from luxury to budget.", type: "article" },
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
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/athens/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Athens", addressCountry: "GR" },
        priceRange: h.price ?? undefined,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function AthensHotels() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Athens"
      heroImage="/images/content/photo-1566073771259-6a8506099945.avif"
      intro="Where you stay shapes your Athens trip. The Syntagma and Plaka–Makrygianni areas put you within walking distance of the Acropolis and the ancient sites; Monastiraki and Psyrri buzz with markets and nightlife; leafy Kolonaki is chic and calm. From landmark five-stars and Acropolis-view rooftop pools to design boutiques and stylish budget hostels, here are 7 of the best places to stay, with prices and neighbourhoods."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Athens hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
