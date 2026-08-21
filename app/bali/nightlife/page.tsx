import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bali Nightlife 2026 — Beach Clubs, Bars & Clubs | Flyamba",
  description:
    "The best nightlife in Bali — iconic Seminyak beach clubs Potato Head and Ku De Ta, clifftop Single Fin at Uluwatu, spectacular clubs La Favela and…",
  alternates: { canonical: `${SITE}/bali/nightlife` },
  openGraph: { title: "Bali Nightlife | Flyamba", description: "Beach clubs, cocktail bars, clubs and sunset spots across Bali.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktail bar", keys: ["cocktail"] },
  { label: "Club", keys: ["club"] },
  { label: "Live music", keys: ["live"] },
  { label: "Pub", keys: ["pub"] },
  { label: "Rooftop", keys: ["rooftop"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...NIGHTLIFE.map((n) => ({
        "@type": "TouristAttraction",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Bali", addressCountry: "ID" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function BaliNightlife() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Bali Nightlife"
      heroImage="/images/bali/nightlife/cocktail-bar-bali.webp"
      intro="Bali's nightlife is defined by the sunset: it starts on the sand and carries into the small hours. Toast the golden hour at Seminyak's iconic beach clubs Potato Head and Ku De Ta, watch surfers from the clifftop at Single Fin, dance beneath the cathedral arches of Mirror, sip craft cocktails at Ubud's Night Rooster, or join the legendary parties at Canggu's Old Man's. Here are the best spots for a night out, with areas, opening times and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bali nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
