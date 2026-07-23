import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, PRAGUE_CATEGORIES } from "@/app/data/prague-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Prague with Kids 2026 — Best Family Attractions | Flyamba",
  description:
    "The best things to do in Prague with children — the world-class zoo, the Petřín mirror maze, a giant model railway, hands-on museums, a planetarium, aquarium and big green parks, with prices and tips.",
  alternates: { canonical: `${SITE}/prague/with-kids` },
  openGraph: { title: "Prague with Kids | Flyamba", description: "8 top family attractions in Prague with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Animals", keys: ["animals"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Outdoors", keys: ["outdoors"] },
  { label: "Rainy Day", keys: ["rainy-day"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Prague", item: `${SITE}/prague` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/prague/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Prague", addressCountry: "CZ" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function PragueWithKids() {
  return (
    <CityGuideShell
      citySlug="prague"
      cityName="Prague"
      categories={PRAGUE_CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Prague with Kids"
      heroImage="/images/prague/med-barn/prag-zoo.webp"
      intro="Prague is a wonderfully easy city to visit with children. Beyond the fairytale castle and bridge that fire young imaginations, it has one of the world's best-rated zoos, a giggle-inducing mirror maze, a giant interactive model railway, a hands-on museum of trains and planes, a planetarium and aquarium, and huge green parks to run wild in — much of it affordable and easily reached by tram. Here are 8 of the best family attractions, with ages, prices and rainy-day tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Prague with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
