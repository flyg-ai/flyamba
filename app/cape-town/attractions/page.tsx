import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Things to Do in Cape Town 2026 — Attractions Guide | Flyamba",
  description:
    "The 18 best things to do in Cape Town — Table Mountain, Robben Island, Cape Point, the Boulders Beach penguins, the V&A Waterfront, Kirstenbosch and more, with prices, hours and insider tips.",
  alternates: { canonical: `${SITE}/cape-town/attractions` },
  openGraph: { title: "Best Things to Do in Cape Town | Flyamba", description: "18 top Cape Town attractions with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Views", keys: ["views"] },
  { label: "History", keys: ["history"] },
  { label: "Museums", keys: ["museum"] },
  { label: "Free", keys: ["free"] },
  { label: "Wine", keys: ["wine"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Cape Town", item: `${SITE}/cape-town` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/cape-town/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function CapeTownAttractions() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Cape Town"
      heroImage="/images/cape-town/attractions/table-mountain.webp"
      intro="Few cities pack in as much drama as Cape Town, wedged between the flat-topped bulk of Table Mountain, two oceans and a coastline of vineyards. In a single day you can ride a cableway up a world-famous mountain, swim near penguins, tour Nelson Mandela's prison island and dine on a 17th-century wine estate. Here are the 18 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
