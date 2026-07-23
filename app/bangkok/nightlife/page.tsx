import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Bangkok Nightlife 2026 — Rooftop Bars, Clubs & Speakeasies | Flyamba",
  description:
    "The best of Bangkok after dark — sky-high rooftop bars like Sky Bar and Vertigo, hidden speakeasies, live jazz and Thong Lo clubs, with dress codes, prices and tips.",
  alternates: { canonical: `${SITE}/bangkok/nightlife` },
  openGraph: { title: "Best Nightlife in Bangkok | Flyamba", description: "Rooftop bars, speakeasies, live music and clubs.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Rooftop", keys: ["rooftop"] },
  { label: "Speakeasy", keys: ["speakeasy"] },
  { label: "Live music", keys: ["live-music"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Sukhumvit", keys: ["sukhumvit"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/bangkok/nightlife` },
    ],
  };
}

export default function BangkokNightlife() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Bangkok Nightlife"
      heroImage="/images/bangkok/nattliv/sky-bar-lebua.webp"
      intro="Bangkok owns the night. This is the city that made rooftop drinking famous, where you can sip a cocktail 60 floors above the river, dial a secret code into a phone booth to reach a hidden Cuban bar, catch live jazz in a colonial lounge, or dance until 4am in Thong Lo. These 10 venues cover the full range — glamorous sky bars, theatrical speakeasies, live-music institutions and serious clubs — with the dress codes, prices and neighborhoods you need to plan a great night."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bangkok nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
