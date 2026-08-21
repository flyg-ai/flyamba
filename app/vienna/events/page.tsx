import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { EVENTS, CATEGORIES } from "@/app/data/vienna-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Vienna Events & Festivals 2026 — Calendar | Flyamba",
  description:
    "Vienna's biggest annual events and festivals — the glittering ball season and Opera Ball, the New Year's Concert and Silvesterpfad, the famous Christmas…",
  alternates: { canonical: `${SITE}/vienna/events` },
  openGraph: { title: "Vienna Events & Festivals | Flyamba", description: "Vienna's annual festival calendar, from the ball season to the Christmas markets, with dates and tips.", type: "article" },
};


export default function ViennaEvents() {
  return (
    <CityGuideShell
      citySlug="vienna"
      cityName="Vienna"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Vienna Events & Festivals"
      heroImage="/images/vienna/sevardheter/rathaus.webp"
      intro="Vienna's calendar blends imperial tradition, world-class music and modern culture. Winter brings the glittering ball season and the world-famous New Year's Concert; December fills the squares with magical Christmas markets; late spring stages the avant-garde Wiener Festwochen; and summer delivers Europe's biggest free music festival on the Danube Island and nightly open-air cinema before the floodlit City Hall. Here are the events worth timing a trip around, with dates, locations and tips."
      wide
    >
      <CategorySeoSections heading="Vienna's annual events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
