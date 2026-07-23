import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { DAY_TRIPS } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Barcelona 2026 — Best Excursions | Flyamba",
  description:
    "The best day trips from Barcelona — Montserrat, Sitges, Girona, the Costa Brava, Tarragona and the Penedès wine country — with distances, timings and how to get there.",
  alternates: { canonical: `${SITE}/barcelona/day-trips` },
  openGraph: { title: "Best Day Trips from Barcelona | Flyamba", description: "Montserrat, Sitges, Girona, Tarragona and the Costa Brava.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Nature", keys: ["nature"] },
  { label: "Culture", keys: ["culture"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Adventure", keys: ["adventure"] },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
    { "@type": "ListItem", position: 3, name: "Day trips", item: `${SITE}/barcelona/day-trips` },
  ],
};

export default function BarcelonaDayTrips() {
  return (
    <GuideShell
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Barcelona"
      heroImage="/images/content/photo-1506905925346-21bda4d32df4.avif"
      intro="Barcelona is a superb base for exploring Catalonia. Within an hour or two by train you can reach a sawtooth mountain monastery, whitewashed beach towns, Roman ruins, a Game-of-Thrones film set and the vineyards that make Spain's best sparkling wine. Here are the six best day trips, with what to see, how to get there and how much time to set aside."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={DAY_TRIPS} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Day trips from Barcelona — in detail" items={DAY_TRIPS} />
    </GuideShell>
  );
}
