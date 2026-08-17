import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/marrakech-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Marrakech 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Marrakech — the Menara Airport transfer, metered petit taxis and shared grands taxis, city buses, calèches, trains and CTM/Supratours…",
  alternates: { canonical: `${SITE}/marrakech/transport` },
  openGraph: { title: "Getting Around Marrakech | Flyamba", description: "Marrakech transport explained: airport, taxis, buses, calèches and intercity travel.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Marrakech", item: `${SITE}/marrakech` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/marrakech/transport` },
    ],
  };
}

export default function MarrakechTransport() {
  return (
    <CityGuideShell
      citySlug="marrakech"
      cityName="Marrakech"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Marrakech"
      heroImage="/images/marrakech/sevardheter/koutoubia.webp"
      intro="Marrakech is above all a walking city — its car-free medina is a maze best explored on foot, where getting pleasantly lost is part of the experience. But you will still need to know your options: how to get in from Menara Airport (barely 6 km away), how the two-tier taxi system of metered petits taxis and shared grands taxis works, whether the city buses and traditional calèches are worth it, and how to travel onward by train or coach to the coast, the mountains and the rest of Morocco. This guide covers everything with real routes, dirham fares and the practical local know-how — like always insisting on the taxi meter — that saves money and hassle."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Marrakech transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
