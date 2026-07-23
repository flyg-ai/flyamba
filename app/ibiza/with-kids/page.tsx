import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, IBIZA_CATEGORIES } from "@/app/data/ibiza-places";
import { SITE } from "@/app/lib/destination-helpers";

const HERO = "/images/destinations/flights-ibiza.avif";

export const metadata: Metadata = {
  title: "Ibiza with Kids 2026 — Family Guide | Flyamba",
  description:
    "Ibiza with kids — the Aguamar water park, an easy Formentera boat trip, calm family beaches like Cala Bassa and Talamanca, tree-top adventure and a salt-flat nature walk.",
  alternates: { canonical: `${SITE}/ibiza/with-kids` },
  openGraph: { title: "Ibiza with Kids: Family Things to Do | Flyamba", description: "Family-friendly beaches, boat trips and activities on the White Isle.", type: "article", images: [HERO] },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Beaches", keys: ["beaches"] },
  { label: "Water park", keys: ["water-park"] },
  { label: "Boat trips", keys: ["boat-trips"] },
  { label: "Adventure", keys: ["adventure"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Ibiza", item: `${SITE}/ibiza` },
          { "@type": "ListItem", position: 3, name: "With kids", item: `${SITE}/ibiza/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Ibiza", addressCountry: "ES" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function IbizaWithKids() {
  return (
    <CityGuideShell
      citySlug="ibiza"
      cityName="Ibiza"
      categories={IBIZA_CATEGORIES}
      active="with-kids"
      crumb="With kids"
      h1="Ibiza with Kids"
      heroImage={HERO}
      intro="Beyond its party reputation, Ibiza is a genuinely rewarding family destination — as long as you know where to go. Its calm, shallow bays like Cala Bassa and Talamanca are perfect for young swimmers, a short ferry opens up the dazzling beaches of Formentera, and there are water parks, tree-top adventure courses, glass-bottom boat rides and gentle nature walks to fill the days. Here is the pick of family-friendly Ibiza, with age guidance, prices and practical tips for a stress-free trip with children."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Ibiza with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
