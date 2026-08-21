import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/florence-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Events in Florence 2026 — Festivals Guide | Flyamba",
  description:
    "Florence's festivals and events — the Easter Scoppio del Carro, the ferocious Calcio Storico, the Festa di San Giovanni, the Maggio Musicale opera…",
  alternates: { canonical: `${SITE}/florence/events` },
  openGraph: { title: "Florence Festivals & Events | Flyamba", description: "The best annual events in Florence, from Calcio Storico to Christmas.", type: "article" },
};


export default function FlorenceEvents() {
  return (
    <CityGuideShell
      citySlug="florence"
      cityName="Florence"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Florence Festivals & Events"
      heroImage="/images/florence/sevardheter/piazza-della-signoria.webp"
      intro="Florence marks the year with some of the most distinctive and historic events in Italy, many of them rooted in the traditions of the Renaissance republic. From the exploding Easter cart in front of the Duomo and the brutal costumed football of the Calcio Storico to one of Europe's oldest opera festivals, a summer-long programme of open-air culture and a magical Christmas season, timing your trip to coincide with a festival adds an unforgettable dimension. Here are the key annual events, with dates, what to expect and tips on where to watch."
      wide
    >
      <CategorySeoSections heading="Florence events through the year" items={EVENTS} />
    </CityGuideShell>
  );
}
