import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cape Town Nightlife 2026 — Best Bars & Clubs Guide | Flyamba",
  description:
    "The best of Cape Town's nightlife — Bree Street cocktail bars, hidden gin speakeasies, Long Street clubs, glamorous beach clubs and cool indie hangouts…",
  alternates: { canonical: `${SITE}/cape-town/nightlife` },
  openGraph: { title: "Best Bars & Clubs in Cape Town | Flyamba", description: "Cocktail bars, gin speakeasies, clubs and beach clubs — Cape Town after dark.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Cocktails", keys: ["cocktail"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Beach", keys: ["beach"] },
  { label: "Gin", keys: ["gin"] },
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
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/cape-town/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "BarOrPub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function CapeTownNightlife() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Cape Town Nightlife: Bars & Clubs"
      heroImage="/images/cape-town/nightlife/cocktail-bar-cape-town.webp"
      intro="Cape Town's nightlife spans world-ranked cocktail bars, hidden gin speakeasies and craft-brandy temples on buzzing Bree Street, the pubs and clubs of Long Street, glamorous waterfront beach clubs and cool indie hangouts in Tamboerskloof. This guide rounds up the best places for a night out, whatever your mood, with neighbourhoods, price guides and tips on when to go and where to book."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Cape Town nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
