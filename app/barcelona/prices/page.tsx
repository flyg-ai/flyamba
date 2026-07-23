import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona Travel Costs 2026 — Budget Guide | Flyamba",
  description:
    "How much does Barcelona cost? Daily budgets for budget, mid-range and luxury travelers, plus real prices for food, transport, attractions and hotels.",
  alternates: { canonical: `${SITE}/barcelona/prices` },
  openGraph: { title: "How Much Does Barcelona Cost? | Flyamba", description: "Daily budgets and real prices for Barcelona.", type: "article" },
};

export default function BarcelonaPrices() {
  return (
    <GuideShell
      active="prices"
      crumb="Prices"
      h1="How Much Does Barcelona Cost?"
      heroImage="/images/content/photo-1512909006721-3d6018887383.avif"
      intro="Barcelona is one of the better-value major European cities — cheaper than Paris or London, with excellent public transport and affordable food if you eat where the locals do. Here's a realistic breakdown of what a day costs at every level, plus typical prices for food, transport, attractions and hotels so you can plan your budget with confidence."
    >
      <GuideSection title="Daily budget at a glance">
        <div className="grid gap-4 sm:grid-cols-3">
          <GuideCard title="Budget · $80–120/day">
            <p>Hostel dorm or budget room, market lunches and menú del día, metro travel, and one or two paid sights a day. Doable while still eating and drinking well.</p>
          </GuideCard>
          <GuideCard title="Mid-range · $150–250/day">
            <p>A comfortable 3–4★ hotel, tapas dinners with wine, taxis when convenient, and daily attractions including the big Gaudí sites.</p>
          </GuideCard>
          <GuideCard title="Luxury · $300+/day">
            <p>A 5★ or design hotel, fine dining, private tours and no compromises. Easy to spend far more in peak season.</p>
          </GuideCard>
        </div>
        <Tip>These are per-person, per-day estimates excluding flights. Two people sharing a room bring the mid-range figure down noticeably.</Tip>
      </GuideSection>

      <GuideSection title="Food & drink prices">
        <p>Eating is where Barcelona rewards the savvy. Typical prices:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Coffee (cortado): €1.50–2.50</li>
          <li>Pastry or croissant: €1.50–3</li>
          <li>Menú del día (2–3 course lunch with drink): €12–16</li>
          <li>Tapas dish: €4–9; a shared tapas dinner: €20–35/person</li>
          <li>Glass of wine / caña (small beer): €2.50–4</li>
          <li>Mid-range dinner with wine: €30–45/person</li>
          <li>Bottle of water / supermarket lunch: €0.60 / €4–6</li>
        </ul>
        <Tip>Order at the bar rather than the terrace and you'll often pay 10–20% less for the same drink.</Tip>
      </GuideSection>

      <GuideSection title="Transport costs">
        <p>
          Public transport is cheap and covers everything you need. A T-Casual (10 journeys, shareable across metro, bus and
          tram) is €12.55 — most visitors use one or two over a few days. The Aerobus from the airport is €7.25 each way, or
          the L9 metro €5.75. Taxis start around €2.50 with typical short rides €10–12. You won't need a car in the city.
        </p>
      </GuideSection>

      <GuideSection title="Attraction entry fees">
        <p>The big sights add up, so prioritise:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Sagrada Família: from €26 (€36 with towers)</li>
          <li>Park Güell (Monumental Zone): €10</li>
          <li>Casa Batlló: from €29 · La Pedrera: from €28</li>
          <li>Picasso Museum: €12 (free Thursday evenings)</li>
          <li>Montjuïc cable car: ~€14 return</li>
          <li>Many museums: free on the first Sunday of the month</li>
        </ul>
        <Tip>If you'll visit several museums, the Barcelona Card (from ~€22) bundles free transport and discounted or free entry.</Tip>
      </GuideSection>

      <GuideSection title="Hotel prices by season">
        <p>
          Accommodation is the biggest single cost. Budget rooms start around €40–70, mid-range doubles run €120–200, and
          luxury from €250. Rates are lowest November–February (outside the holidays) and highest June–August and during
          big trade fairs like Mobile World Congress, when the whole city sells out and prices can double. Add a small nightly
          tourist tax (a few euros per person), payable at checkout. Booking 6–8 weeks ahead in shoulder season gets the best
          value — and pairing a cheap flight with a shoulder-season hotel is the single biggest way to cut the cost of a
          Barcelona trip.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
