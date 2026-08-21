import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Cancún 2026 — Guide | Flyamba",
  description:
    "Where to shop in Cancún — the open-air La Isla village, luxury and duty-free at Kukulcán Plaza, the crafts and haggling of Mercado 28, authentic local…",
  alternates: { canonical: `${SITE}/cancun/shopping` },
  openGraph: { title: "Shopping in Cancún | Flyamba", description: "Cancún's malls, markets and boutiques, from duty-free luxury to haggling for souvenirs, with tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Malls", keys: ["malls"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...SHOPPING.map((s) => ({
        "@type": "Place",
        name: s.name,
        description: s.description,
        address: { "@type": "PostalAddress", addressLocality: "Cancún", addressCountry: "MX" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: s.rating, reviewCount: s.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CancunShopping() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Cancún"
      heroImage="/images/placeholders/placeholder-shopping.webp"
      intro="Shopping in Cancún runs the full spectrum, and where you go shapes both the experience and the price. The Hotel Zone has the glossy stuff: the canal-laced open-air La Isla village with its aquarium and lagoon-side dining, and the fully air-conditioned Kukulcán Plaza with its Luxury Avenue of designer and duty-free boutiques. Downtown, the sprawling Mercado 28 is souvenir central — silver, hammocks, tequila and crafts, all open to a good-natured haggle — while Mercado 23 and Plaza Las Américas show where locals actually shop. For a calmer, upscale evening, the marina at Puerto Cancún is a stylish alternative. Here's the full rundown, with what to buy where, and when to bargain."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
