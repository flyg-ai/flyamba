import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { SHOPPING, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Tenerife 2026 — Malls, Markets & Duty-Free | Flyamba",
  description:
    "Where to shop in Tenerife: the big southern malls, luxury boutiques at Plaza del Duque, the capital's shopping streets and food markets, and duty-friendly deals thanks to the Canaries' low taxes.",
  alternates: { canonical: `${SITE}/tenerife/shopping` },
  openGraph: { title: "Shopping in Tenerife | Flyamba", description: "Malls, markets, luxury boutiques and Canarian crafts.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Malls", keys: ["malls"] },
  { label: "Markets", keys: ["markets"] },
  { label: "Luxury", keys: ["luxury"] },
  { label: "Souvenirs", keys: ["souvenirs"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Shopping", item: `${SITE}/tenerife/shopping` },
    ],
  };
}

export default function TenerifeShopping() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Tenerife"
      heroImage="/images/tenerife/sevardheter/la-orotava-dalen.webp"
      intro="Because the Canary Islands sit outside the EU's VAT area and apply a much lower local sales tax, Tenerife is a genuine bargain for perfume, cosmetics, electronics, spirits and tobacco. Beyond the duty-friendly deals you'll find big modern malls in the south, luxury boutiques in Costa Adeje, and the capital's atmospheric markets and craft stalls. Here's where to shop."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={SHOPPING} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife shopping in detail" items={SHOPPING} />
    </CityGuideShell>
  );
}
