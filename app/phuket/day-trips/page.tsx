import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Phuket 2026 — Guide | Flyamba",
  description:
    "The best day trips from Phuket — the Phi Phi Islands and Maya Bay, Phang Nga Bay and James Bond Island, the pristine Similan Islands, Krabi and Railay…",
  alternates: { canonical: `${SITE}/phuket/day-trips` },
  openGraph: { title: "Best Day Trips from Phuket | Flyamba", description: "Six great island day trips from Phuket, from Phi Phi to the Similans, with directions and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Half-day", keys: ["half-day"] },
  { label: "Full-day", keys: ["full-day"] },
  { label: "Islands", keys: ["islands"] },
  { label: "Snorkelling & Diving", keys: ["snorkeling"] },
  { label: "Nature", keys: ["nature"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/phuket/day-trips` },
        ],
      },
      ...DAY_TRIPS.map((d) => ({
        "@type": "TouristAttraction",
        name: d.name,
        description: d.description,
        aggregateRating: { "@type": "AggregateRating", ratingValue: d.rating, reviewCount: d.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function PhuketDayTrips() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Phuket"
      heroImage="/images/phuket/dagsutflykter/phi-phi-islands.webp"
      intro="Phuket's greatest asset may be its position as a launchpad to some of the most beautiful islands and seascapes on earth. Within a boat ride you can reach the soaring cliffs and Maya Bay of Phi Phi, the surreal limestone karsts and hidden lagoons of Phang Nga Bay, the pristine reefs of the Similan Islands, the karst-and-beach coast of Krabi and Railay, and easy, family-friendly islands like Coral and the Rachas. Here are the six best excursions, with realistic travel times, prices, seasons and tips to make the most of a day on the water — most with hotel transfers included."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Phuket in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
