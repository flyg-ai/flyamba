import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Palma with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Palma de Mallorca with kids — the Palma Aquarium, Marineland, Katmandu Park, Aqualand water park, the vintage Sóller train, Bellver Castle and easy family beaches.",
  alternates: { canonical: `${SITE}/palma/with-kids` },
  openGraph: { title: "Palma with Kids | Flyamba", description: "Family activities, water parks and practical tips for Palma with children.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Aquariums", keys: ["aquarium"] },
  { label: "Water parks", keys: ["water-park"] },
  { label: "Outdoors", keys: ["outdoors"] },
  { label: "Rainy day", keys: ["rainy-day"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
          { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/palma/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Palma", addressRegion: "Mallorca", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function PalmaWithKids() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="with-kids"
      crumb="With kids"
      h1="Palma with Kids"
      heroImage="/images/palma/sevardheter/castell-de-bellver.webp"
      intro="Palma and Mallorca are wonderfully easy with children: shallow, gently shelving beaches, a big modern aquarium with a walk-through shark tank, marine-animal parks and water parks, a real circular castle to explore, and a century-old wooden train that turns a trip into the mountains into an adventure. Many of the best family days out are a short bus ride from the city, and the mild climate makes outdoor plans reliable. Here are the top things to do with kids, with ages, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Palma with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
