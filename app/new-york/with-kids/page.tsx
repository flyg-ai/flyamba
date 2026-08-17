import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "New York With Kids 2026 — Best Family Things to Do | Flyamba",
  description:
    "The best family things to do in New York — the Natural History Museum, Central Park Zoo, the Bronx Zoo, the Intrepid, the Rockefeller ice rink and Coney…",
  alternates: { canonical: `${SITE}/new-york/with-kids` },
  openGraph: { title: "New York With Kids | Flyamba", description: "Museums, zoos, an aircraft carrier and Coney Island — the best family days out in New York.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Museums", keys: ["museums"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Outdoor", keys: ["outdoor"] },
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
          { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/new-york/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(k.price ?? ""),
      })),
    ],
  };
}

export default function NewYorkWithKids() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="New York With Kids — Best Family Things to Do"
      heroImage="/images/new-york/with-kids/american-museum-of-natural-history.webp"
      intro="New York is surprisingly family-friendly. There are world-class museums like the American Museum of Natural History, historic zoos from the compact Central Park Zoo to the vast Bronx Zoo, an aircraft carrier turned museum at the Intrepid, the magical Rockefeller ice rink in winter, and the roller coasters of Coney Island in summer. For younger children there are hands-on museums and playgrounds; for older ones, science, space and thrill rides. Here are the best family attractions, with prices, age guidance and tips — including plenty of air-conditioned indoor options for hot summer days and rain."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
