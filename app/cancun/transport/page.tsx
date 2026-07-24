import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Cancún 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Cancún — the airport transfer, the cheap R-1 Hotel Zone bus, ADO coaches and colectivos across the Yucatán, taxis and ride-hailing, ferries to Isla Mujeres and Cozumel, and car rental, with real prices and tips.",
  alternates: { canonical: `${SITE}/cancun/transport` },
  openGraph: { title: "Getting Around Cancún | Flyamba", description: "Cancún transport explained: airport transfers, the R-1 bus, ADO coaches, taxis, ferries and car hire, with prices.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cancún", item: `${SITE}/cancun` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/cancun/transport` },
    ],
  };
}

export default function CancunTransport() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Cancún"
      heroImage="/images/placeholders/placeholder-transport.webp"
      intro="Getting around Cancún is easy and, if you know the tricks, cheap. The single best hack is the local R-1 bus, which runs the length of the Hotel Zone and into downtown for under a dollar. Beyond the city, the excellent ADO coach network and shared colectivo vans connect you affordably to the ruins, cenotes and towns of the whole Yucatán, while fast ferries reach the islands of Isla Mujeres and Cozumel. Taxis are unmetered, so always agree the fare first. This guide covers everything — the airport transfer (and how to dodge the timeshare touts), the buses, taxis and ride-hailing, the ferries and car rental — with real prices and practical advice."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Cancún transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
