import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Hotels in Ibiza 2026 — Where to Stay | Flyamba",
  description:
    "Where to stay in Ibiza — from the wellness luxury of Six Senses and Nobu Ibiza Bay to the historic Gran Hotel Montesol, the sunset Hostal La Torre and rural boutique retreats.",
  alternates: { canonical: `${SITE}/ibiza/hotels` },
  openGraph: { title: "Best Hotels in Ibiza | Flyamba", description: "Where to stay on the White Isle, by area and budget.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Beachfront", keys: ["beachfront"] },
  { label: "Family", keys: ["family"] },
  { label: "Adults", keys: ["adults"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/ibiza/hotels` },
        ],
      },
      ...HOTELS.map((h) => ({
        "@type": "Hotel",
        name: h.name,
        description: h.description,
        priceRange: h.price,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: h.rating, reviewCount: h.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaHotels() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Ibiza"
      heroImage={HERO}
      intro="Where you stay shapes your Ibiza. Playa d'en Bossa and Ibiza Town put you at the heart of the beach-club and clubbing scene; Santa Eulària and the wild north offer calm, design-led retreats and family serenity; and the west coast delivers legendary sunsets. From the wellness luxury of Six Senses and Nobu Ibiza Bay to the historic Gran Hotel Montesol and the cult sunset perch of Hostal La Torre, here are the best places to stay, by area and budget, with prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
