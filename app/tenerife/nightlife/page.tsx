import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategoryExplorer, type CategoryFilter } from "@/app/components/CategoryExplorer";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { NIGHTLIFE, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Tenerife Nightlife 2026 — Best Bars, Clubs & Beach Clubs | Flyamba",
  description:
    "Where to go out in Tenerife: chic beach clubs and the rowdy Veronicas strip in Playa de las Américas and Costa Adeje, live-music bars, a casino, and where locals really party in the capital.",
  alternates: { canonical: `${SITE}/tenerife/nightlife` },
  openGraph: { title: "Tenerife Nightlife Guide | Flyamba", description: "Beach clubs, bars and clubs in Las Américas and Costa Adeje.", type: "article" },
};

const FILTERS: CategoryFilter[] = [
  { label: "All", keys: [] },
  { label: "Beach clubs", keys: ["beach-club"] },
  { label: "Bars", keys: ["bars"] },
  { label: "Clubs", keys: ["clubs"] },
  { label: "Live music", keys: ["live-music"] },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Nightlife", item: `${SITE}/tenerife/nightlife` },
    ],
  };
}

export default function TenerifeNightlife() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="nightlife"
      crumb="Nightlife"
      h1="Tenerife Nightlife"
      heroImage="/images/tenerife/strander/playa-de-las-amricas.webp"
      intro="Tenerife's nightlife centres on the southern resorts, where glamorous oceanfront beach clubs sit a short walk from the famously raucous Veronicas strip in Playa de las Américas. Beyond the party scene there are live-music bars, a casino, gentler pubs in Los Cristianos, and the authentically Canarian clubs of the capital. Here's where to go out, whatever your style."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <div className="mt-8">
        <CategoryExplorer items={NIGHTLIFE} filters={FILTERS} />
      </div>
      <CategorySeoSections heading="Tenerife nightlife in detail" items={NIGHTLIFE} />
    </CityGuideShell>
  );
}
