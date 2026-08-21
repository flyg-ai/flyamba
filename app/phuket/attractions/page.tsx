import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Attractions in Phuket 2026 — Guide | Flyamba",
  description:
    "The best things to do in Phuket — the Big Buddha, Wat Chalong, Old Phuket Town, Phang Nga Bay, James Bond Island, Promthep Cape, viewpoints, Phi Phi and…",
  alternates: { canonical: `${SITE}/phuket/attractions` },
  openGraph: { title: "Best Things to Do in Phuket | Flyamba", description: "20 top Phuket attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Temples & Culture", keys: ["temples", "culture"] },
  { label: "Viewpoints", keys: ["viewpoints"] },
  { label: "Islands & Nature", keys: ["islands", "nature"] },
  { label: "Wildlife", keys: ["wildlife"] },
  { label: "Free", keys: ["free"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Phuket", addressCountry: "TH" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function PhuketAttractions() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Phuket"
      heroImage="/images/phuket/sevardheter/big-buddha.webp"
      intro="Phuket is far more than its beaches. Thailand's largest island pairs turquoise bays with hilltop temples, a beautiful Sino-Portuguese old town, jaw-dropping sunset viewpoints and a doorstep scattered with some of the world's most spectacular islands. From the serene Big Buddha and gilded Wat Chalong to the limestone karsts of Phang Nga Bay, James Bond Island and the neon of Bangla Road, here are the 20 attractions worth building your trip around, with prices, opening hours and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Phuket attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
