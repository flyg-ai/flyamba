import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/paris-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Attractions in Paris 2026 — Guide | Flyamba",
  description:
    "The 20 best things to do in Paris — the Eiffel Tower, the Louvre, Notre-Dame, Musée d'Orsay, Montmartre, Versailles and more, with prices, opening hours, Métro directions and insider tips.",
  alternates: { canonical: `${SITE}/paris/attractions` },
  openGraph: { title: "Best Things to Do in Paris | Flyamba", description: "20 top Paris attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Free", keys: ["free"] },
  { label: "Art & museums", keys: ["art"] },
  { label: "Architecture", keys: ["architecture"] },
  { label: "History", keys: ["history"] },
  { label: "Gardens", keys: ["gardens"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/paris/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function ParisAttractions() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Paris"
      heroImage="/images/paris/sevardheter/eiffeltornet-la-tour-eiffel.webp"
      intro="No city packs more world-famous sights into a walkable centre than Paris — the Eiffel Tower and the Louvre, a gloriously restored Notre-Dame, the Impressionists of the Musée d'Orsay, bohemian Montmartre and the palace of Versailles beyond the ring road. Here are the 20 attractions worth building your trip around, with prices in euros, opening hours, Métro directions and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Paris attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
