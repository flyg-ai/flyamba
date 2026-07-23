import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, WITH_KIDS } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "London with Kids 2026 — Guide | Flyamba",
  description:
    "The best things to do in London with kids — free museums, London Zoo, the Harry Potter Studio Tour, aquarium and adventure playgrounds, with ages, prices and practical tips.",
  alternates: { canonical: `${SITE}/london/with-kids` },
  openGraph: { title: "London with Kids | Flyamba", description: "8 top family attractions in London, with ages, prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Outdoor", keys: ["outdoor"] },
  { label: "Educational", keys: ["educational"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/london/with-kids` },
    ],
  };
}

export default function LondonWithKids() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With kids"
      h1="London with Kids"
      heroImage="/images/london/med-barn/natural-history-museum.webp"
      intro="London is a brilliant city for families, with many of its best attractions free and genuinely fun for all ages. From dinosaur-filled museums and a historic zoo to the magical Harry Potter Studio Tour and imaginative playgrounds, here are 8 of the best things to do with children, with age guidance, prices and practical tips to keep everyone happy."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
