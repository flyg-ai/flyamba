import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Marrakech 2026 — Guide | Flyamba",
  description:
    "The best things to do in Marrakech — Jemaa el-Fnaa, the souks, Bahia and El Badi palaces, the Saadian Tombs, Ben Youssef Madrasa, Jardin Majorelle and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/marrakech/attractions` },
  openGraph: { title: "Best Things to Do in Marrakech | Flyamba", description: "18 top Marrakech attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Palaces", keys: ["palaces"] },
  { label: "Gardens", keys: ["gardens"] },
  { label: "Art & Museums", keys: ["art"] },
  { label: "Historic Sites", keys: ["historic"] },
  { label: "Medina & Souks", keys: ["medina"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/marrakech/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function MarrakechAttractions() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Marrakech"
      heroImage="/images/marrakech/sevardheter/djemaa-el-fna.webp"
      intro="Few cities pack as much colour, history and sensory drama into a walkable old town as Marrakech. Behind its rose-red ramparts lie the electric main square of Jemaa el-Fnaa, a labyrinth of trade souks, dazzling palaces and Koranic schools, dreamlike gardens and hidden museums — with the snow-capped Atlas Mountains as a backdrop. Here are the attractions worth building your trip around, with entry prices in dirhams, opening hours and insider tips to help you skip the crowds and haggle with confidence."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Marrakech attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
