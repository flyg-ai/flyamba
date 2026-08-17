import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/cancun-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cancún Events & Festivals 2026 — Calendar | Flyamba",
  description:
    "Cancún's biggest annual events — the world-famous spring break, the moving Day of the Dead festivals, summer whale-shark season, Easter's Semana Santa…",
  alternates: { canonical: `${SITE}/cancun/events` },
  openGraph: { title: "Cancún Events & Festivals | Flyamba", description: "Cancún's annual calendar, from spring break and whale sharks to Day of the Dead and New Year, with tips.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Cancún", item: `${SITE}/cancun` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/cancun/events` },
    ],
  };
}

export default function CancunEvents() {
  return (
    <CityGuideShell
      citySlug="cancun"
      cityName="Cancún"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Cancún Events & Festivals"
      heroImage="/images/placeholders/placeholder-attractions.webp"
      intro="Cancún's calendar mixes global party culture, Mexican tradition and extraordinary natural events. It's one of the world's spring-break capitals, drawing tens of thousands of students each February to April, and the winter Christmas and New Year period is its glittering, festive peak. But there's depth beyond the party: the moving Day of the Dead traditions, celebrated most spectacularly at Xcaret's Life and Death festival; the summer whale-shark season, when you can snorkel beside the ocean's gentle giants; the domestic-holiday buzz of Semana Santa at Easter; and a year-round program of jazz festivals and concerts. Here are the events worth timing a trip around — or planning to avoid — with dates, locations and tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Cancún's annual events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
