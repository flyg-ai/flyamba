import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING } from "@/app/data/bangkok-places";
import { BANGKOK_CATEGORIES } from "@/app/lib/bangkok";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Bangkok 2026 — Malls & Markets Guide | Flyamba",
  description:
    "Where to shop in Bangkok — from ICONSIAM and Siam Paragon to Chatuchak Weekend Market, Terminal 21 and Pratunam's wholesale bargains, with tips and transport.",
  alternates: { canonical: `${SITE}/bangkok/shopping` },
  openGraph: { title: "Best Shopping in Bangkok | Flyamba", description: "Mega-malls, weekend markets and bargain bazaars.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Malls", keys: ["malls"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Bargains", keys: ["bargains"] },
  { label: "Riverside", keys: ["riverside"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bangkok", item: `${SITE}/bangkok` },
      { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/bangkok/shopping` },
    ],
  };
}

export default function BangkokShopping() {
  return (
    <CityGuideShell
      citySlug="bangkok"
      cityName="Bangkok"
      categories={BANGKOK_CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Bangkok"
      heroImage="/images/bangkok/shopping/iconsiam.webp"
      intro="Bangkok is one of Asia's great shopping cities, swinging effortlessly between air-conditioned luxury malls and sweaty, bargain-packed markets. Browse global flagships and riverside spectacle at ICONSIAM and Siam Paragon, haggle over gadgets at MBK, buy clothes by the armful in wholesale Pratunam, or lose a whole weekend in the 15,000 stalls of Chatuchak. These 8 destinations cover every style and budget, with tips on getting there and getting a deal."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Bangkok shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
