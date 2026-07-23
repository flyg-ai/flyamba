import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Rome 2026 — Hotels Guide | Flyamba",
  description:
    "The best hotels in Rome for every budget — grand five-stars like Hotel Eden and de Russie, Colosseum-view boutiques, characterful mid-range stays and top budget guesthouses, with areas, prices and tips.",
  alternates: { canonical: `${SITE}/rome/hotels` },
  openGraph: { title: "Best Hotels in Rome | Flyamba", description: "Where to stay in Rome, from luxury to budget, with prices and neighbourhood tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central", keys: ["central"] },
  { label: "Budget", keys: ["budget"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/rome/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        address: { "@type": "PostalAddress", addressLocality: "Rome", addressCountry: "IT" },
        priceRange: h.price,
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function RomeHotels() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Rome"
      heroImage="/images/rome/hotell/hotel-eden.webp"
      intro="Rome rewards staying central — the historic core, Monti, Trastevere and the area around the Spanish Steps put the great sights on your doorstep, while Termini offers value and transport links. From landmark grand hotels and Colosseum-view boutiques to characterful mid-range gems and excellent budget guesthouses, these are the best places to stay for every budget, with neighbourhoods, prices and what makes each special."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Rome hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
