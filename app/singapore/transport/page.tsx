import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Transport in Singapore 2026 — Guide | Flyamba",
  description:
    "Getting around Singapore — the airport MRT from Changi, the world-class metro, buses and the EZ-Link card, honest taxis and the Grab app, and whether the Singapore Tourist Pass is worth it, with prices and tips.",
  alternates: { canonical: `${SITE}/singapore/transport` },
  openGraph: { title: "Getting Around Singapore | Flyamba", description: "Singapore transport explained: Changi transfers, the MRT, buses, taxis and passes, with prices.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/singapore/transport` },
    ],
  };
}

export default function SingaporeTransport() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Singapore"
      heroImage="/images/singapore/sevardheter/jewel-changi-airport.webp"
      intro="Getting around Singapore is a genuine pleasure. The city runs one of the best public-transport systems in the world: a spotless, air-conditioned MRT metro that reaches almost every attraction, an extensive bus network, honest metered taxis and the ubiquitous Grab app, all cheap and superbly efficient. This guide covers how to get in from Changi Airport, how to ride the MRT and buses with a single contactless tap or EZ-Link card, when to use taxis and Grab, and whether the Singapore Tourist Pass is worth buying — with real routes, prices and practical advice."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Singapore transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
