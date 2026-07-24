import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { ATTRACTIONS, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Cancún 2026 — Guide | Flyamba",
  description:
    "The best things to do in Cancún — Chichén Itzá, Tulum and Cobá ruins, turquoise cenotes, the eco-parks Xcaret, Xel-Há and Xplor, Isla Mujeres, the MUSA underwater museum and more, with prices, hours and tips.",
  alternates: { canonical: `${SITE}/cancun/attractions` },
  openGraph: { title: "Best Things to Do in Cancún | Flyamba", description: "18 top Cancún attractions — Maya ruins, cenotes and eco-parks — with prices, hours and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Must-see", keys: ["must-see"] },
  { label: "Mayan Ruins", keys: ["ruins"] },
  { label: "Cenotes", keys: ["cenotes"] },
  { label: "Eco Parks", keys: ["parks"] },
  { label: "Beaches & Water", keys: ["water"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Free", keys: ["free"] },
  { label: "Family", keys: ["family"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Cancún", item: `${SITE}/cancun` },
          { "@type": "ListItem", position: 3, name: "Attractions", item: `${SITE}/cancun/attractions` },
        ],
      },
      ...ATTRACTIONS.map((a) => ({
        "@type": "TouristAttraction",
        name: a.name,
        description: a.description,
        address: { "@type": "PostalAddress", addressLocality: "Cancún", addressCountry: "MX" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: a.rating, reviewCount: a.reviewCount ?? undefined },
        isAccessibleForFree: /free/i.test(a.price ?? ""),
      })),
    ],
  };
}

export default function CancunAttractions() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Cancún"
      heroImage="/images/placeholders/placeholder-attractions.webp"
      intro="Cancún is far more than a beach and a swim-up bar. Within a day trip lie some of the greatest wonders of the ancient Maya — the pyramid of Chichén Itzá, cliff-top Tulum and jungle-swallowed Cobá — alongside surreal turquoise cenotes, the world's second-largest coral reef, and the spectacular eco-parks of the Riviera Maya. Right on the Hotel Zone you'll find ruins, a museum and the famous Cancún sign, while a short ferry reaches the laid-back island of Isla Mujeres. Here are the 18 attractions worth building your trip around, with prices, opening hours and insider tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={ATTRACTIONS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cancún attractions in detail" items={ATTRACTIONS} />
    </CityGuideShell>
  );
}
