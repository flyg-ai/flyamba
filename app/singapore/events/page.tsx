import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/singapore-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Events in Singapore 2026 — Guide | Flyamba",
  description:
    "Singapore's biggest events and festivals — Chinese New Year, the F1 Night Race, National Day fireworks, Deepavali in Little India and the Orchard Road…",
  alternates: { canonical: `${SITE}/singapore/events` },
  openGraph: { title: "Singapore Events & Festivals | Flyamba", description: "The best festivals and events in Singapore through the year, with dates and tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Singapore", item: `${SITE}/singapore` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/singapore/events` },
    ],
  };
}

export default function SingaporeEvents() {
  return (
    <CityGuideShell
      citySlug="singapore"
      cityName="Singapore"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Singapore Events & Festivals"
      heroImage="/images/singapore/sevardheter/chinatown.webp"
      intro="Singapore's multicultural calendar delivers a superb spread of festivals and events throughout the year, and timing a trip around one can transform your visit. Chinatown erupts in lights and lion dances for Chinese New Year, Formula 1 blazes around a floodlit street circuit at the September Night Race, the whole city celebrates its birthday with fireworks on National Day, Little India glows for the Deepavali festival of lights, and Orchard Road dazzles with a spectacular Christmas light-up. Here are the biggest events worth planning around, with rough dates, locations and practical tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Singapore events explained" items={EVENTS} />
    </CityGuideShell>
  );
}
