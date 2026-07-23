import type { Metadata } from "next";
import { GuideShell } from "@/app/components/GuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona Nightlife 2026 — Best Bars & Clubs | Flyamba",
  description:
    "Where to go out in Barcelona: the best cocktail bars, beachfront superclubs, rooftops, flamenco and live music — with areas, timings and insider tips.",
  alternates: { canonical: `${SITE}/barcelona/nightlife` },
  openGraph: { title: "Barcelona Nightlife Guide | Flyamba", description: "Best bars, clubs and rooftops in Barcelona.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Bars", keys: ["bars"] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Live music", keys: ["live-music"] },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
    { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/barcelona/nightlife` },
  ],
};

export default function BarcelonaNightlife() {
  return (
    <GuideShell
      active="nightlife"
      crumb="Nightlife"
      h1="Barcelona Nightlife Guide"
      heroImage="/images/content/photo-1514525253161-7a46d19cd819.avif"
      intro="Barcelona goes out late and hard. The night starts with vermouth or cocktails around 20:00, dinner stretches past 22:00, bars fill after midnight and clubs don't get going until 02:00 — often running to 06:00. From cosy El Born cocktail dens to vast beachfront superclubs, here's where to go and how to time your night like a local."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Barcelona nightlife in detail" items={NIGHTLIFE} />
    </GuideShell>
  );
}
