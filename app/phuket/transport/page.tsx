import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/phuket-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Transport in Phuket 2026 — Getting Around Guide | Flyamba",
  description:
    "How to get around Phuket — from the airport to the beaches, the Grab app, the island's pricey taxis and tuk-tuks, cheap songthaew buses, scooter rental and safety, car hire, and the ferries and speedboats to the islands, with baht prices.",
  alternates: { canonical: `${SITE}/phuket/transport` },
  openGraph: { title: "Getting Around Phuket | Flyamba", description: "Phuket transport explained: airport transfers, Grab, taxis, songthaews, scooters and island boats, with prices.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Phuket", item: `${SITE}/phuket` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/phuket/transport` },
    ],
  };
}

export default function PhuketTransport() {
  return (
    <CityGuideShell
      citySlug="phuket"
      cityName="Phuket"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Phuket"
      heroImage="/images/phuket/sevardheter/phuket-old-town.webp"
      intro="Phuket is a big, spread-out island, so understanding your transport options makes a real difference to your trip and your budget. There is no metro or train — instead you'll navigate a mix of airport transfers, the invaluable Grab ride-hailing app, the island's famously pricey taxis and tuk-tuks, cheap local songthaew buses, scooter rental (cheap but risky), car hire and private drivers, and the ferries and speedboats that are the real gateway to the islands. This guide covers everything with realistic baht prices, journey times and practical advice, including how to avoid overpaying and how to stay safe on two wheels."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Phuket transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
