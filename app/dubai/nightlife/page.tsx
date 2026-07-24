import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/dubai-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Nightlife in Dubai 2026 — Bars & Clubs Guide | Flyamba",
  description:
    "Where to go out in Dubai — the White mega-club, Zero Gravity and Barasti beach clubs, sky-high rooftop bars with Burj Khalifa views, the Vegas-style Drai's and The Act, plus laid-back pubs, with prices and tips.",
  alternates: { canonical: `${SITE}/dubai/nightlife` },
  openGraph: { title: "Dubai Nightlife Guide | Flyamba", description: "Dubai's best clubs, rooftop bars, beach clubs and pubs with prices and tips.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Clubs", keys: ["club"] },
  { label: "Rooftop Bars", keys: ["rooftop"] },
  { label: "Beach Clubs", keys: ["beach-club"] },
  { label: "Cocktail Bars", keys: ["cocktail"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Dubai", item: `${SITE}/dubai` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/dubai/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function DubaiNightlife() {
  return (
    <CityGuideShell
      citySlug="dubai"
      cityName="Dubai"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Dubai Nightlife"
      heroImage="/images/dubai/nightlife/white-dubai.webp"
      intro="Dubai's nightlife is glossier and more high-production than you might expect — world-famous DJs at the White mega-club, day-to-night beach clubs like Zero Gravity, sky-high rooftop bars gazing at the Burj Khalifa, Vegas-style show clubs and the city's legendary weekend brunches. A key thing to know: alcohol is served only at licensed venues, almost all attached to hotels, and it's pricey. Here's where to drink and dance, from casual pubs to VIP tables, with areas, prices and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Dubai nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
