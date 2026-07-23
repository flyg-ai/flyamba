import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Palma 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Palma de Mallorca — the airport bus and taxis, EMT city buses, the historic Sóller train and tram, the metro and regional trains, plus taxis, bikes and car hire, with fares and tips.",
  alternates: { canonical: `${SITE}/palma/transport` },
  openGraph: { title: "Getting Around Palma | Flyamba", description: "Airport transfers, buses, the Sóller train, taxis, bikes and car hire in Palma.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/palma/transport` },
    ],
  };
}

export default function PalmaTransport() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Palma"
      heroImage="/images/content/photo-1544620347-c4fd4a3d5957.avif"
      intro="Palma is compact and largely walkable, so most visitors get around the historic centre entirely on foot. For the beaches, hilltop sights and the airport you'll want the cheap and comprehensive EMT bus network, while the historic Sóller railway offers a scenic route into the mountains. Here's everything you need to know about airport transfers, city buses, trains, taxis, bikes and hiring a car to explore the wider island — with fares, hours and practical tips."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Palma — options in detail" items={TRANSPORT} />
    </CityGuideShell>
  );
}
