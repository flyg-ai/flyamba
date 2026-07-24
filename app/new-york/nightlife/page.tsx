import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/new-york-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "New York Nightlife 2026 — Best Bars & Clubs Guide | Flyamba",
  description:
    "New York's best nightlife — world-ranked speakeasies like Employees Only and PDT, historic jazz clubs, the Dead Rabbit, Bemelmans piano bar and Brooklyn's House of Yes, with prices and tips.",
  alternates: { canonical: `${SITE}/new-york/nightlife` },
  openGraph: { title: "Best Nightlife in New York | Flyamba", description: "Speakeasies, jazz clubs, cocktail bars and Brooklyn clubs — New York after dark.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Speakeasy", keys: ["speakeasy"] },
  { label: "Cocktail bars", keys: ["cocktail"] },
  { label: "Live music", keys: ["live"] },
  { label: "Clubs", keys: ["clubs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "New York", item: `${SITE}/new-york` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/new-york/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function NewYorkNightlife() {
  return (
    <CityGuideShell
      citySlug="new-york"
      cityName="New York"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="New York Nightlife — Speakeasies, Jazz & Rooftop Bars"
      heroImage="/images/new-york/nightlife/employees-only.webp"
      intro="New York's nightlife is the most dynamic on earth — hidden speakeasies like Employees Only, PDT and Attaboy (all on the 'World's 50 Best Bars'), the historic Bemelmans piano bar, jazz clubs running since 1935 at the Village Vanguard, and Brooklyn's wild circus-club House of Yes. The city's neighbourhoods each have their own scene: the Lower East Side for hidden bars, the West Village for jazz, Chelsea and the Meatpacking District for clubs, and Williamsburg and Bushwick for something more underground. Here are the best places to go out, with prices, dress codes and tips — and a reminder to tip the bartender $1–2 a drink."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="New York nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
