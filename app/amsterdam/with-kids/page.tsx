import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/amsterdam-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Amsterdam with Kids 2026 — Best Family Attractions | Flyamba",
  description:
    "The best things to do in Amsterdam with kids — Artis Zoo, NEMO Science Museum, Micropia, the Pancake Boat, indoor playgrounds and more, with ages, prices and tips.",
  alternates: { canonical: `${SITE}/amsterdam/with-kids` },
  openGraph: { title: "Amsterdam with Kids | Flyamba", description: "Zoos, science museums, playgrounds and boat trips — family fun in Amsterdam.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Outdoor", keys: ["outdoor"] },
  { label: "Educational", keys: ["educational"] },
  { label: "Free", keys: ["free"] },
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
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/amsterdam/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function AmsterdamWithKids() {
  return (
    <CityGuideShell
      citySlug="amsterdam"
      cityName="Amsterdam"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Amsterdam with Kids"
      heroImage="/images/amsterdam/med-barn/artis-zoo.webp"
      intro="Amsterdam is a brilliantly easy city for a family trip: compact, flat, bike-friendly and packed with attractions aimed squarely at children. Feed the goats at a historic zoo, run wild through five floors of hands-on science at NEMO, meet the invisible world at Micropia, cruise the harbour on an all-you-can-eat Pancake Boat, or duck underground into a giant indoor playground when it rains. Here are the best family attractions, with age guidance, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Amsterdam family attractions in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
