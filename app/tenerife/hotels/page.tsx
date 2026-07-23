import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { HOTELS, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Where to Stay in Tenerife 2026 — Best Hotels & Areas | Flyamba",
  description:
    "Where to stay in Tenerife: the best hotels by area and budget, from Costa Adeje's five-star beach resorts and Michelin-starred Abama to boutique stays in the greener north and a lodge inside Teide National Park.",
  alternates: { canonical: `${SITE}/tenerife/hotels` },
  openGraph: { title: "Best Hotels in Tenerife | Flyamba", description: "Where to stay by neighbourhood and budget, with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Beachfront", keys: ["beachfront"] },
  { label: "Boutique", keys: ["boutique"] },
  { label: "Family", keys: ["family"] },
  { label: "Budget", keys: ["budget"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Hotels", item: `${SITE}/tenerife/hotels` },
    ],
  };
}

export default function TenerifeHotels() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Tenerife"
      heroImage="/images/tenerife/strander/playa-del-duque.webp"
      intro="Where you stay shapes your Tenerife holiday. The sunny south — Costa Adeje, Playa de las Américas and Los Cristianos — has the beaches, resorts and best weather; the greener north around Puerto de la Cruz offers cheaper, more characterful stays; and there's even a lodge inside Teide National Park. Here are the best hotels by area and budget, with prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={HOTELS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife hotels in detail" items={HOTELS} />
    </CityGuideShell>
  );
}
