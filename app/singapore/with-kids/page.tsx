import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "With Kids in Singapore 2026 — Guide | Flyamba",
  description:
    "The best things to do in Singapore with kids — Universal Studios, the S.E.A. Aquarium, the world-beating Singapore Zoo, River Wonders, Adventure Cove…",
  alternates: { canonical: `${SITE}/singapore/with-kids` },
  openGraph: { title: "Singapore With Kids | Flyamba", description: "8 top family attractions in Singapore with ages, prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Theme parks", keys: ["theme-park"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Water", keys: ["water"] },
  { label: "Indoor", keys: ["indoor"] },
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
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/singapore/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function SingaporeWithKids() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Singapore With Kids"
      heroImage="/images/singapore/med-barn/singapore-zoo.webp"
      intro="Safe, clean and endlessly geared to families, Singapore is one of the easiest cities in Asia to visit with children. Sentosa alone packs in Universal Studios, the giant S.E.A. Aquarium and the Adventure Cove waterpark, while the Mandai precinct is home to the world-beating Singapore Zoo, River Wonders and the after-dark Night Safari. Add the free water-play zones of Gardens by the Bay and the hands-on Science Centre, and rainy days are covered too. Here are 8 of the best family attractions, with age guidance, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Singapore with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
