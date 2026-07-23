import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Paris With Kids 2026 — Guide | Flyamba",
  description:
    "The best things to do in Paris with children — Europe's biggest science museum, gentle amusement parks, a historic zoo, aquariums, wax museums, boat-sailing in the Tuileries and a magical fairground museum. Ages, prices and Métro directions.",
  alternates: { canonical: `${SITE}/paris/with-kids` },
  openGraph: { title: "Paris With Kids | Flyamba", description: "Family-friendly things to do in Paris with children.", type: "article" },
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
          { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/paris/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function ParisWithKids() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Paris With Kids"
      heroImage="/images/paris/med-barn/cit-des-sciences.webp"
      intro="Paris is far more child-friendly than its grand reputation suggests. Between the big monuments you'll find Europe's largest science museum with hands-on zones for under-12s, gentle old-fashioned amusement parks, one of the world's oldest zoos in a botanical garden, an aquarium opposite the Eiffel Tower, toy boats to sail on the Tuileries ponds and a magical museum of antique fairground rides. Here are the outings that keep families happy, with age guidance, prices and Métro directions — Disneyland Paris features in our day-trips guide."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Paris with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
