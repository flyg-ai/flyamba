import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { FaqItem } from "@/app/components/FaqItem";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Barcelona 2026 — Metro, Bus & Taxi Guide | Flyamba",
  description:
    "How to get around Barcelona: airport transfers, the metro, buses, cycling, taxis and Uber, plus ticket types, prices in euros and money-saving tips.",
  alternates: { canonical: `${SITE}/barcelona/transport` },
  openGraph: { title: "Getting Around Barcelona | Flyamba", description: "Airport transfers, metro, buses, taxis and bikes.", type: "article" },
};

export default function BarcelonaTransport() {
  return (
    <GuideShell
      active="transport"
      crumb="Transport"
      h1="Getting Around Barcelona"
      heroImage="/images/content/photo-1554072675-66db59dba46f.avif"
      intro="Barcelona has one of Europe's best public transport networks — 12 metro lines, hundreds of bus routes, trams, the Aerobus and city bikes — and a compact centre that's a joy to walk. This guide covers everything from getting in from the airport to which ticket saves you the most, plus the pickpocket warnings every visitor should know."
    >
      <GuideSection title="From the airport to the city">
        <p>Barcelona-El Prat (BCN) sits 15 km southwest of the centre. You have four main options depending on luggage, budget and where you're staying.</p>
        <div className="mt-4 space-y-4">
          <GuideCard title="Aerobus — fastest & most comfortable">
            <p>Express bus from both terminals (T1 and T2) to Plaça Catalunya in 35 minutes, every 5 minutes from 05:00–01:00. €7.25 one-way, €12.50 return (valid 15 days). Luggage racks, WiFi and USB charging on board — the best choice with big bags.</p>
            <Tip>Buy a return online in advance for a discount.</Tip>
          </GuideCard>
          <GuideCard title="Metro L9 Sud — cheapest">
            <p>The L9 Sud metro line runs straight from T1 and T2 into the city (about 32 minutes to Zona Universitària, then change to L3 for the centre). €5.75 with the airport-specific single ticket. Cheaper than the Aerobus but not fully central — ideal if you're staying in Eixample or Gràcia.</p>
          </GuideCard>
          <GuideCard title="Taxi — quickest with lots of luggage">
            <p>Barcelona's black-and-yellow taxis are regulated and safe. From the airport, expect €35–45 to the centre plus a €4.50 airport supplement; 15–25 minutes depending on traffic. Card payment accepted. Ignore anyone touting 'taxi' inside the terminal — use the official rank.</p>
            <Tip>If the meter isn't running, get out and take the next cab.</Tip>
          </GuideCard>
          <GuideCard title="Renfe train (R2 Nord) — for Sants or Passeig de Gràcia">
            <p>From T2 only, Renfe's R2 Nord train reaches Barcelona Sants and Passeig de Gràcia in 25 minutes for about €4.90, every 30 minutes. Great if your hotel is near those stations; T1 passengers take the free shuttle to T2 first.</p>
          </GuideCard>
        </div>
      </GuideSection>

      <GuideSection title="The metro (TMB)">
        <p>The metro is the fastest way across the city — 12 lines, 160+ stations, running roughly 05:00–24:00 Sunday–Thursday, until 02:00 on Friday and all night on Saturday.</p>
        <div className="mt-4 space-y-4">
          <GuideCard title="Key lines for visitors">
            <p><strong className="text-foreground">L3 (green):</strong> Las Ramblas, Plaça Catalunya, Passeig de Gràcia, Park Güell. <strong className="text-foreground">L4 (yellow):</strong> Barceloneta, Gothic Quarter. <strong className="text-foreground">L2/L5:</strong> Sagrada Família. <strong className="text-foreground">L9 Sud:</strong> the airport.</p>
          </GuideCard>
          <GuideCard title="Pickpockets — an important warning">
            <p>Barcelona's metro is unfortunately known for pickpockets, especially on L3 between Diagonal, Passeig de Gràcia and Plaça Catalunya. Common tricks: someone 'falling' into you, a stranger 'helping' with bags, or groups blocking the gates. Keep your wallet in a front pocket, phone out of reach and bag in front of you.</p>
          </GuideCard>
        </div>
      </GuideSection>

      <GuideSection title="Buses, trams & cycling">
        <p>Buses fill the gaps the metro misses and run 24 hours with night services (N-lines) after 23:00. Trams mainly serve the outskirts. Barcelona is also one of Europe's most cycle-friendly cities, with 200+ km of bike lanes.</p>
        <div className="mt-4 space-y-4">
          <GuideCard title="Bikes & e-scooters for visitors">
            <p>The city's own Bicing scheme is for residents only. Tourists should use <strong className="text-foreground">Donkey Republic</strong> (around €15/day) for bikes, or the Dott and Bolt apps for e-scooters (about €1 to unlock + €0.20/min). Ride only in bike lanes and on the road — never on pavements, which is fined.</p>
          </GuideCard>
          <GuideCard title="Hop-on hop-off (Bus Turístic)">
            <p>Red double-deckers loop the main sights on three routes with multilingual audio. About €33 for one day, €44 for two — handy if you're short on time, though the metro is far cheaper.</p>
          </GuideCard>
        </div>
      </GuideSection>

      <GuideSection title="Taxis & ride-hailing">
        <p>
          Taxis are metered and reliable — a typical 10-minute ride costs €10–12. Uber returned to Barcelona in 2021 but
          availability is limited; <strong className="text-foreground">Cabify</strong> and <strong className="text-foreground">FreeNow</strong> are
          more widely used, with prices comparable to taxis. Waits can be longer than in other cities, especially on
          weekend nights.
        </p>
      </GuideSection>

      <GuideSection title="Tickets & prices">
        <div className="space-y-4">
          <GuideCard title="T-Casual — best for most visitors">
            <p>10 journeys for €12.55, transferable across metro, bus and tram (free changes within 75 minutes). Single-person only — can't be shared. Ideal for a 2–3 day trip with moderate travel.</p>
          </GuideCard>
          <GuideCard title="Hola Barcelona — unlimited travel card">
            <p>Unlimited travel including the Aerobus: about €16.40 (48h), €23.80 (72h), €31 (96h). Worth it if you'll make 4+ trips a day. Activates on first use.</p>
          </GuideCard>
          <GuideCard title="Single ticket">
            <p>€2.55 for one journey with no transfers — poor value; avoid if you'll travel more than a few times.</p>
          </GuideCard>
        </div>
        <Tip>Keep your ticket until you exit the station — inspectors do check, and the fine for riding without a valid ticket is €100.</Tip>
      </GuideSection>

      <GuideSection id="faq" title="Frequently asked questions">
        <div className="divide-y divide-border rounded-3xl border border-border bg-card">
          <FaqItem q="How do I get from Barcelona airport to the city centre?" a="The Aerobus (€7.25) reaches Plaça Catalunya in 35 minutes from both terminals every 5 minutes. The L9 Sud metro (€5.75) is cheaper but less central. A taxi runs €35–45 plus a €4.50 airport supplement and takes 15–25 minutes." />
          <FaqItem q="What's the best metro ticket in Barcelona?" a="For most visitors the T-Casual (10 journeys, €12.55, transferable across metro/bus/tram) is best value. If you'll travel a lot, the Hola Barcelona card offers unlimited travel including the Aerobus from about €16.40 for 48 hours." />
          <FaqItem q="Can you cycle in Barcelona?" a="Yes — Barcelona has 200+ km of bike lanes. The local Bicing system is residents-only, but Donkey Republic rents to tourists (around €15/day), and Dott and Bolt e-scooters cost about €1 to unlock plus €0.20/min. Always ride in bike lanes, never on pavements." />
          <FaqItem q="Is Uber available in Barcelona?" a="Yes, but availability is limited. Cabify and FreeNow are more common for ride-hailing, with prices comparable to metered taxis. Waits can be longer on weekend nights." />
        </div>
      </GuideSection>
    </GuideShell>
  );
}
