import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/tenerife-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Tenerife 2026 — Buses, Cars, Taxis & Ferries | Flyamba",
  description:
    "How to get around Tenerife: the two airports (TFS and TFN), the cheap TITSA bus network and Ten+ card, hiring a car, the northern tram, taxis and ferries to the other Canary Islands — with prices and tips.",
  alternates: { canonical: `${SITE}/tenerife/transport` },
  openGraph: { title: "Getting Around Tenerife | Flyamba", description: "Airports, TITSA buses, hire cars, trams, taxis and ferries.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tenerife", item: `${SITE}/tenerife` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/tenerife/transport` },
    ],
  };
}

export default function TenerifeTransport() {
  return (
    <CityGuideShell
      citySlug="tenerife"
      cityName="Tenerife"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Tenerife"
      heroImage="/images/tenerife/sevardheter/auditorio-de-tenerife.webp"
      intro="Tenerife has two airports, a cheap and surprisingly far-reaching bus network, a modern tram in the north and ferries to the neighbouring islands — but no metro or train. How you get around depends on whether you're staying put at a beach resort or exploring Teide, Masca and the wild north. This guide covers every option, with prices in euros and money-saving tips."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Tenerife in detail" items={TRANSPORT} />
    </CityGuideShell>
  );
}
