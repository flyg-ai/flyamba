import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { TRANSPORT, CATEGORIES } from "@/app/data/rome-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Rome 2026 — Transport Guide | Flyamba",
  description:
    "How to get around Rome — the Leonardo Express from Fiumicino, Ciampino shuttles, the three-line metro, buses and trams, the Roma Pass and taxis, with ticket prices, routes and practical tips.",
  alternates: { canonical: `${SITE}/rome/transport` },
  openGraph: { title: "Getting Around Rome | Flyamba", description: "Rome transport explained: airports, metro, buses, the Roma Pass and taxis, with prices.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Rome", item: `${SITE}/rome` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/rome/transport` },
    ],
  };
}

export default function RomeTransport() {
  return (
    <CityGuideShell
      citySlug="rome"
      cityName="Rome"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Rome"
      heroImage="/images/rome/sevardheter/spanska-trappan.webp"
      intro="Rome is a walker's city — its dense historic centre is best explored on foot, and many of the great sights sit within a short stroll of one another. But you will still need to know your options: how to get in from Fiumicino and Ciampino airports, how the compact three-line metro and the extensive bus and tram network work, whether the Roma Pass is worth it, and how taxis are priced. This guide covers everything with real routes, ticket prices and practical advice."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Rome transport explained" items={TRANSPORT} />
    </CityGuideShell>
  );
}
