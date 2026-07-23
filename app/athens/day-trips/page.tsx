import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS, CATEGORIES } from "@/app/data/athens-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Day Trips from Athens 2026 — Guide | Flyamba",
  description:
    "The best day trips from Athens — Cape Sounion's clifftop Temple of Poseidon, the oracle at Delphi, Mycenae, Epidaurus and Nafplio, car-free Hydra island, the monasteries of Meteora and the Corinth Canal, with distances and how to get there.",
  alternates: { canonical: `${SITE}/athens/day-trips` },
  openGraph: { title: "Day Trips from Athens | Flyamba", description: "Sounion, Delphi, Nafplio, Hydra, Meteora and Corinth.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "History", keys: ["history"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Coast & islands", keys: ["coast"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Athens", item: `${SITE}/athens` },
          { "@type": "ListItem", position: 3, name: "Day Trips", item: `${SITE}/athens/day-trips` },
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

export default function AthensDayTrips() {
  return (
    <CityGuideShell
      citySlug="athens"
      cityName="Athens"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day Trips"
      h1="Best Day Trips from Athens"
      heroImage="/images/athens/dagsutflykter/kap-sounion-och-poseidontemplet.webp"
      intro="Athens is the perfect base for exploring the wider glories of Greece. Within a short drive or ferry you can watch the sun set behind the Temple of Poseidon at Cape Sounion, consult the ghost of the oracle at mountain-top Delphi, walk the Bronze-Age citadel of Mycenae, sail to car-free Hydra, or marvel at the cliff-top monasteries of Meteora. Here are 6 of the best day trips, with distances, durations and how to get there."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Athens in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
