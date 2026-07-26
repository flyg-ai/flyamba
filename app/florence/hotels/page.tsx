import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Hotels in Florence 2026 — Guide | Flyamba",
  description:
    "Where to stay in Florence — the best areas and hotels, from Renaissance-palace luxury and Ferragamo boutiques to central four-stars and budget guesthouses, with prices and neighbourhood advice.",
  alternates: { canonical: `${SITE}/florence/hotels` },
  openGraph: { title: "Where to Stay in Florence | Flyamba", description: "The best Florence hotels and neighbourhoods with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Central", keys: ["central"] },
  { label: "Family", keys: ["family"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Florence", item: `${SITE}/florence` },
      { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/florence/hotels` },
    ],
  };
}

export default function FlorenceHotels() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Florence"
      heroImage="/images/florence/sevardheter/ponte-vecchio.webp"
      intro="Florence is compact enough to walk almost anywhere, so where you stay is about atmosphere as much as location. The Centro Storico puts every major sight on your doorstep; the artisan Oltrarno across the Arno is quieter, more local and often better value; and the streets around Santa Croce and San Lorenzo buzz with restaurants and markets. From Renaissance-palace grand hotels and Ferragamo-owned boutiques to reliable central four-stars and friendly budget guesthouses, here are the best places to stay, with areas, prices and honest advice."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Florence hotels & areas in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
