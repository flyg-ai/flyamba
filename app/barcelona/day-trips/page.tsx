import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Day Trips from Barcelona 2026 — Best Excursions | Flyamba",
  description:
    "The best day trips from Barcelona: Montserrat, Sitges, Girona, Tarragona and the Costa Brava — what to see, how to get there and how long you need.",
  alternates: { canonical: `${SITE}/barcelona/day-trips` },
  openGraph: { title: "Best Day Trips from Barcelona | Flyamba", description: "Montserrat, Sitges, Girona, Tarragona and the Costa Brava.", type: "article" },
};

export default function BarcelonaDayTrips() {
  return (
    <GuideShell
      active="day-trips"
      crumb="Day trips"
      h1="Best Day Trips from Barcelona"
      heroImage="/images/content/photo-1506905925346-21bda4d32df4.avif"
      intro="Barcelona is a superb base for exploring Catalonia. Within an hour or two by train you can reach a sawtooth mountain monastery, whitewashed beach towns, Roman ruins, a Game-of-Thrones film set and the vineyards that make Spain's best sparkling wine. Here are the five best day trips, with what to see, how to get there and how much time to set aside."
    >
      <GuideSection title="Montserrat — the obvious choice">
        <p>
          The serrated peaks of Montserrat, an hour northwest of the city, cradle a mountaintop Benedictine monastery that
          is Catalonia&apos;s spiritual heart. Come for the famous Black Madonna (La Moreneta), the boys&apos; choir (the
          Escolania, usually singing around 13:00), and spectacular hiking trails and funiculars with views over the whole
          region.
        </p>
        <GuideCard title="How to get there">
          <p>Take the R5 train from Plaça Espanya (about 1 hour), then either the Aeri cable car or the Cremallera rack railway up to the monastery. Combined tickets covering train + mountain transport are the easiest option. Allow a full day — around 6–8 hours door to door.</p>
        </GuideCard>
      </GuideSection>

      <GuideSection title="Sitges — the pretty coastal town">
        <p>
          A whitewashed seaside resort just 40 minutes south by train, Sitges pairs 17 beaches with a charming old town, a
          landmark seafront church, buzzing bars and a famously welcoming LGBTQ+ scene. Perfect for a relaxed beach-and-
          strolling day, and lovely out of season too.
        </p>
        <GuideCard title="Transport & timing">
          <p>Frequent R2 Sud trains from Barcelona Sants or Passeig de Gràcia (~40 min, a few euros each way). A half-day works, but it&apos;s worth staying for dinner and the sunset.</p>
        </GuideCard>
      </GuideSection>

      <GuideSection title="Girona — the Game of Thrones city">
        <p>
          A beautifully preserved medieval city 40 minutes away on the high-speed AVE train, Girona wraps colourful houses
          along the Onyar river around a soaring Gothic cathedral (whose steps starred in Game of Thrones). Wander the
          Jewish Quarter (El Call), walk the old city walls, and eat exceptionally well — this is the home of the
          world-renowned El Celler de Can Roca.
        </p>
        <GuideCard title="Transport">
          <p>The AVE high-speed train reaches Girona in ~40 minutes; slower regional trains take about 1h20 for less money. Easy to combine with the Costa Brava if you have a car.</p>
        </GuideCard>
      </GuideSection>

      <GuideSection title="Tarragona — Roman ruins by the sea">
        <p>
          An hour south, Tarragona was one of Roman Spain&apos;s great capitals, and it wears its history openly: a
          seafront amphitheatre, a circus, forum and aqueduct, all UNESCO-listed, plus an atmospheric medieval old town and
          its own beaches. A rewarding, less-crowded alternative to Sitges for history lovers.
        </p>
        <GuideCard title="Transport">
          <p>Regional trains from Barcelona Sants take about 1h10; the high-speed AVE is faster to Camp de Tarragona station just outside town. A half to full day.</p>
        </GuideCard>
      </GuideSection>

      <GuideSection title="Costa Brava & the Penedès wine country">
        <p>
          For wild coastline, the <strong className="text-foreground">Costa Brava</strong> offers crystal-clear coves and
          pretty towns like Tossa de Mar, Cadaqués (Dalí&apos;s home village) and Begur, linked by the clifftop Camí de
          Ronda coastal path — though these are easiest with a car or a guided tour. Closer and simpler by train, the
          <strong className="text-foreground"> Penedès</strong> wine region is where Spain&apos;s cava is made: tour the big
          cellars around Sant Sadurní d&apos;Anoia or the market town of Vilafranca del Penedès for tastings.
        </p>
        <Tip>For the Costa Brava and Penedès vineyards, a guided tour or rental car saves a lot of connections; for Montserrat, Sitges, Girona and Tarragona the train is cheaper, greener and stress-free.</Tip>
      </GuideSection>
    </GuideShell>
  );
}
