import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/tokyo-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Tokyo Nightlife 2026 — Best Bars, Clubs & Golden Gai | Flyamba",
  description:
    "The best of Tokyo after dark — the tiny bars of Golden Gai, megaclubs like Womb and Ageha, world-class cocktail dens, jazz clubs, karaoke and sky-high views.",
  alternates: { canonical: `${SITE}/tokyo/nightlife` },
  openGraph: { title: "Best Nightlife in Tokyo | Flyamba", description: "Golden Gai, Shibuya clubs, cocktail bars and karaoke.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Bars", keys: ["bar"] },
  { label: "Clubs", keys: ["club"] },
  { label: "Live Music", keys: ["live-music"] },
  { label: "Karaoke", keys: ["karaoke"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
          { "@type": "ListItem", position: 2, name: "Tokyo", item: `${SITE}/tokyo` },
          { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/tokyo/nightlife` },
        ],
      },
      ...NIGHTLIFE.map((n) => ({
        "@type": "NightClub",
        name: n.name,
        description: n.description,
        address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: n.rating, reviewCount: n.reviewCount ?? undefined },
      })),
    ],
  };
}

export default function TokyoNightlife() {
  return (
    <CityGuideShell
      citySlug="tokyo"
      cityName="Tokyo"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Tokyo Nightlife"
      heroImage="/images/tokyo/nattliv/golden-gai.webp"
      intro="Tokyo after dark is a world unto itself, running from the shoebox bars of Shinjuku's Golden Gai and the smoky yakitori alleys to thumping megaclubs, some of the finest cocktail bars on earth, intimate jazz cellars and private karaoke rooms where you sing till dawn. Nights run late — clubs barely warm up before midnight and go until the first trains — so pace yourself and plan your route home. Here are the essential venues, with door prices, opening hours and how to get in."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tokyo nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
