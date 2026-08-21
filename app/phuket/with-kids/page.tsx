import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Phuket with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Phuket with children — huge water parks like Andamanda, an ethical elephant sanctuary, the aquarium, FantaSea, gentle island…",
  alternates: { canonical: `${SITE}/phuket/with-kids` },
  openGraph: { title: "Phuket with Kids | Flyamba", description: "Family-friendly Phuket: water parks, elephants, aquarium, shows and island trips, with ages and prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Water Parks", keys: ["water"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Outdoors", keys: ["outdoors"] },
  { label: "Shows", keys: ["shows"] },
  { label: "Rainy Day", keys: ["rainy"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Phuket", addressCountry: "TH" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PhuketWithKids() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Phuket with Kids"
      heroImage="/images/phuket/sevardheter/phuket-aquarium.webp"
      intro="Phuket is a superb family destination, with far more for children than just the beach. They can splash through some of Asia's biggest water parks, meet rescued elephants at an ethical sanctuary, walk through the aquarium's underwater tunnel, gasp at the FantaSea show, snorkel in the calm shallows of a close-in island, or play a round of dinosaur mini-golf. Here are the best family outings, with suggested ages, prices and practical tips — including plenty of air-conditioned and rainy-day options for the hottest afternoons."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
