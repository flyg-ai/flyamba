import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubai with Kids 2026 — Family Guide | Flyamba",
  description:
    "The best things to do in Dubai with children — the Aquaventure and Wild Wadi water parks, the Dubai Aquarium, KidZania, The Green Planet rainforest, Ski…",
  alternates: { canonical: `${SITE}/dubai/with-kids` },
  openGraph: { title: "Dubai with Kids | Flyamba", description: "Family-friendly Dubai: water parks, aquariums, indoor play and theme parks, with ages and prices.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Water Parks", keys: ["water"] },
  { label: "Theme Parks", keys: ["thrills"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Animals", keys: ["animals"] },
  { label: "Hands-on", keys: ["hands-on"] },
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
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubaiWithKids() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Dubai with Kids"
      heroImage="/images/dubai/with-kids/aquaventure-waterpark.webp"
      intro="Dubai is one of the world's great family destinations, purpose-built to entertain children whatever the weather. There are record-breaking water parks, a mall aquarium with a walk-through shark tunnel, a role-play city where kids earn their own currency, an indoor rainforest, real snow and penguins, and theme parks galore — and crucially, most of it is air-conditioned, so the summer heat is no barrier. Here are the best family outings, with suggested ages, prices and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
