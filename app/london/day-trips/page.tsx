import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES, DAY_TRIPS } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Day Trips from London 2026 — Guide | Flyamba",
  description:
    "The best day trips from London — Windsor Castle, Oxford, Cambridge, Bath, Stonehenge and Brighton. How to get there by train, what to see, and prices and timing tips.",
  alternates: { canonical: `${SITE}/london/day-trips` },
  openGraph: { title: "Best Day Trips from London | Flyamba", description: "6 top day trips from London by train, with times and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "History", keys: ["history"] },
  { label: "Universities", keys: ["universities"] },
  { label: "Nature", keys: ["nature"] },
  { label: "Coast", keys: ["coast"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Day trips", item: `${SITE}/london/day-trips` },
    ],
  };
}

export default function LondonDayTrips() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from London"
      heroImage="/images/london/dagsutflykter/windsor-castle.webp"
      intro="London's fast, frequent trains put some of England's finest destinations within easy reach for a day. From royal Windsor Castle and the dreaming spires of Oxford and Cambridge to Georgian Bath, prehistoric Stonehenge and seaside Brighton, here are 6 of the best day trips, with how to get there, what to see and timing tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="London day trips in detail" items={DAY_TRIPS} />
    </CityGuideShell>
  );
}
