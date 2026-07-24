import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/mykonos-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Mykonos Nightlife 2026 — Best Bars & Clubs Guide | Flyamba",
  description:
    "The best of Mykonos nightlife — legendary Cavo Paradiso, cult beach club Scorpios, glamorous Nammos, the LGBTQ+ heart at Jackie O', the 180° sunset bar and the island's best-value party at Skandinavian Bar.",
  alternates: { canonical: `${SITE}/mykonos/nightlife` },
  openGraph: { title: "Best Nightlife in Mykonos | Flyamba", description: "8 top Mykonos bars and clubs, from superclubs to sunset bars.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Superclub", keys: ["superclub"] },
  { label: "Beach Club", keys: ["beach"] },
  { label: "Sunset", keys: ["sunset"] },
  { label: "LGBTQ+", keys: ["lgbtq"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Mykonos", item: `${SITE}/mykonos` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/mykonos/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Mykonos", addressCountry: "GR" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function MykonosNightlife() {
  return (
    <CityGuideShell
      citySlug="mykonos"
      cityName="Mykonos"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Mykonos Nightlife"
      heroImage="/images/mykonos/nightlife/cavo-paradiso.webp"
      intro="Mykonos has a nightlife reputation to rival Ibiza, and it starts early: sunset drinks in Little Venice or on the 180° clifftop terrace, then beach clubs like Scorpios and Nammos that build from golden hour into the small hours, then the legendary superclub Cavo Paradiso, where world-famous DJs play a clifftop pool from midnight to sunrise. It's also one of the world's great LGBTQ+ destinations, with Jackie O' at the heart of the scene. Here are 8 of the island's best bars and clubs — superclubs, beach clubs, sunset bars and the best-value party in town — with prices, areas and tips. Book tables well ahead in peak season."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Mykonos nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
