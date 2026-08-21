import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Vienna with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Vienna with children — the Prater funfair and Ferris wheel, the world's oldest zoo at Schönbrunn, the Haus des Meeres aquarium…",
  alternates: { canonical: `${SITE}/vienna/with-kids` },
  openGraph: { title: "Vienna with Kids | Flyamba", description: "Family-friendly Vienna: funfair, zoo, aquarium and hands-on museums, with ages and prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Outdoors", keys: ["outdoors"] },
  { label: "Indoors", keys: ["indoors"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Museums", keys: ["museums"] },
  { label: "Free", keys: ["free"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function ViennaWithKids() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Vienna with Kids"
      heroImage="/images/vienna/med-barn/prater-riesenrad.webp"
      intro="Palaces and paintings can only hold small attention spans for so long — happily, Vienna is a wonderfully child-friendly city. Kids can ride the Prater's funfair and giant Ferris wheel, meet pandas at the world's oldest zoo in the Schönbrunn gardens, climb a flak-tower aquarium, get hands-on in brilliant science and children's museums, and run wild on the car-free Danube Island. Here are the best family outings, with suggested ages, prices and practical tips — and several are free or free for under-19s."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Vienna with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
