import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Tenerife with Kids 2026 — Best Family Attractions | Flyamba",
  description:
    "The best family days out in Tenerife: Siam Park, Loro Parque, Aqualand, Jungle Park, Monkey Park, treetop adventure and a real tourist submarine — with ages, prices and tips for a family holiday.",
  alternates: { canonical: `${SITE}/tenerife/with-kids` },
  openGraph: { title: "Tenerife with Kids | Flyamba", description: "Water parks, animals and adventure for a family holiday.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Water parks", keys: ["water-parks"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Adventure", keys: ["adventure"] },
  { label: "Toddlers", keys: ["toddlers"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/tenerife/with-kids` },
    ],
  };
}

export default function TenerifeWithKids() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With kids"
      h1="Tenerife with Kids"
      heroImage="/images/tenerife/sevardheter/siam-park.webp"
      intro="Tenerife is one of Europe's best family destinations, home to two of the world's top-rated parks — Siam Park and Loro Parque — plus a string of water parks, animal encounters, treetop adventures and even a real tourist submarine. Warm year-round weather and safe, sheltered beaches seal the deal. Here are the best family days out, with suitable ages, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife family attractions in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
