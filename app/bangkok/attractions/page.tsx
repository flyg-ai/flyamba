import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Bangkok 2026 — Visitor Guide | Flyamba",
  description:
    "The 18 best things to do in Bangkok — the Grand Palace, Wat Pho, Wat Arun, Chatuchak Market, Chinatown and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/bangkok/attractions` },
  openGraph: { title: "Best Things to Do in Bangkok | Flyamba", description: "18 top Bangkok attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Free", keys: ["free"] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Temples", keys: ["temples"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Views", keys: ["views"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/bangkok/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Bangkok", addressCountry: "TH" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function BangkokAttractions() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Bangkok"
      heroImage="/images/bangkok/sevardheter/grand-palace.webp"
      intro="Bangkok overwhelms the senses in the best way — glittering royal temples and golden Buddhas, chaotic markets, a river lined with palaces, and street-food lanes that never sleep. Here are the 18 attractions worth building your trip around, from the Grand Palace and Wat Arun to Chatuchak Market and neon-lit Chinatown, each with prices, opening hours and tips to beat the heat and the crowds."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bangkok attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
