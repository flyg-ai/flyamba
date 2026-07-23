import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/lisbon-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Lisbon with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Lisbon with kids — the world-class Oceanário, the zoo and its cable car, hands-on science at the Pavilhão do Conhecimento, KidZania, riverside parks and a tram 28 ride.",
  alternates: { canonical: `${SITE}/lisbon/with-kids` },
  openGraph: { title: "Lisbon with Kids | Flyamba", description: "Family-friendly attractions and days out in Lisbon.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "All ages", keys: ["all-ages"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Outdoor", keys: ["outdoor"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Lisbon", item: `${SITE}/lisbon` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/lisbon/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Lisbon", addressCountry: "PT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function LisbonWithKids() {
  return (
    <CityGuideShell
      citySlug="lisbon"
      cityName="Lisbon"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Lisbon with Kids"
      heroImage="/images/lisbon/med-barn/oceanrio.webp"
      intro="Lisbon is a surprisingly easy city to enjoy with children. The rattling yellow trams are a ride in themselves, the world-class Oceanário and the cable-car zoo headline a strong roster of family attractions, and the flat, modern riverside of Parque das Nações gives little legs room to run. Add hands-on science museums, adventure playgrounds and beaches a short train away, and there's plenty to fill a family trip. Here are the best things to do in Lisbon with kids, with ages, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Family things to do in Lisbon in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
