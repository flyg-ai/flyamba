import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { WITH_KIDS, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bali with Kids 2026 — Family Attractions & Tips | Flyamba",
  description:
    "The best things to do in Bali with kids — Asia's top water park Waterbom, Bali Safari, the Ubud Monkey Forest, Bali Bird Park, jungle ziplines at Bedugul…",
  alternates: { canonical: `${SITE}/bali/with-kids` },
  openGraph: { title: "Bali with Kids | Flyamba", description: "Family-friendly Bali — water parks, wildlife, animals and adventure.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Outdoor", keys: ["outdoor"] },
  { label: "Indoor", keys: ["indoor"] },
  { label: "Full-day", keys: ["full-day"] },
  { label: "Ages 0–5", keys: ["0-5"] },
  { label: "Ages 6–12", keys: ["6-12"] },
  { label: "Teens", keys: ["teens"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Bali", item: `${SITE}/bali` },
          { "@type": "ListItem", position: 3, name: "With Kids", item: `${SITE}/bali/with-kids` },
        ],
      },
      ...WITH_KIDS.map((k) => ({
        "@type": "TouristAttraction",
        name: k.name,
        description: k.description,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: k.rating, reviewCount: k.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function BaliWithKids() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="with-kids"
      crumb="With Kids"
      h1="Bali with Kids"
      heroImage="/images/bali/with-kids/waterbom-bali.webp"
      intro="Bali is a wonderfully welcoming island for families, and there's plenty to keep every age entertained between the temples and rice fields. Splash the day away at Asia's top-rated Waterbom water park, get close to lions and elephants at Bali Safari, meet the macaques in the Ubud Monkey Forest, wander the walk-through aviaries of Bali Bird Park, or send older kids flying down jungle ziplines at Bedugul. Here are the best family attractions, with age guidance, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={WITH_KIDS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali with kids in detail" items={WITH_KIDS} />
    </CityGuideShell>
  );
}
