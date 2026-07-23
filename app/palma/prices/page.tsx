import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { PALMA_CATEGORIES } from "@/app/data/palma-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Palma Prices & Daily Budget 2026 — Cost Guide | Flyamba",
  description:
    "How much does Palma de Mallorca cost? A full breakdown of daily budgets, sample prices for food, drinks, transport, attractions and hotels, plus money-saving tips for your Mallorca trip.",
  alternates: { canonical: `${SITE}/palma/prices` },
  openGraph: { title: "Palma Prices & Daily Budget | Flyamba", description: "Daily budgets and sample costs for food, transport and attractions in Palma.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Palma", item: `${SITE}/palma` },
      { "@type": "ListItem", position: 3, name: "Prices", item: `${SITE}/palma/prices` },
    ],
  };
}

// tier, accommodation, food & drink, transport & sights, daily total
const BUDGETS: [string, string, string, string, string][] = [
  ["Backpacker", "€25–40 (hostel/dorm)", "€20–30", "€10–15", "€55–85"],
  ["Mid-range", "€90–160 (3–4★ double)", "€45–70", "€20–35", "€155–265"],
  ["Luxury", "€250+ (5★/boutique)", "€100+", "€60+", "€410+"],
];

// item, typical price
const SAMPLE: [string, string][] = [
  ["Coffee (café con leche)", "€1.60–2.50"],
  ["Caña (small beer)", "€2.50–4"],
  ["Ensaïmada pastry", "€1.50–3"],
  ["Menú del día (3-course set lunch)", "€13–18"],
  ["Tapas dinner per person", "€20–35"],
  ["Dinner, mid-range restaurant", "€30–45"],
  ["Bottle of local wine (shop)", "€6–12"],
  ["EMT city bus single", "~€2"],
  ["Airport bus A1 to centre", "€5"],
  ["Taxi, airport to centre", "€20–25"],
  ["La Seu Cathedral entry", "€10"],
  ["Bellver Castle entry", "€4"],
  ["Sóller train return", "~€32"],
  ["Sunbed + parasol (beach)", "€10–15/day"],
  ["Hire car (per day)", "€25–45"],
];

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "Is Palma expensive?",
    paragraphs: [
      "Palma is a mid-priced European city break — generally cheaper than Barcelona, Paris or the big northern capitals, but pricier than mainland Spanish cities away from the coast, and noticeably more expensive in the resort areas and marinas than in the everyday parts of the city. Being an island served largely by budget airlines, the flight is often the cheapest part of the trip, especially outside July and August, and once there you can control costs well by eating where locals eat and using public transport.",
      "The biggest cost swings are seasonal: hotel prices in particular can more than double between the mild, quiet winter and the peak of August, so shifting your dates even by a few weeks into the shoulder seasons of May, June, September or October can save a lot while still delivering warm weather.",
    ],
  },
  {
    heading: "Daily budgets",
    paragraphs: [
      "As a rough guide, a budget-conscious traveller staying in a hostel, eating menús del día and picnics and using the bus can get by on around €55–85 a day excluding the flight. A comfortable mid-range trip — a three- or four-star double, a mix of casual and nicer restaurants, some paid attractions and the odd taxi — lands around €155–265 a day for two people to spend per head, and a luxury trip with a boutique or five-star base and fine dining runs €400+ a day. These figures assume high-season prices; expect meaningful savings in winter and the shoulder months.",
    ],
  },
  {
    heading: "Money-saving tips",
    paragraphs: [
      "Eat the menú del día: at lunch, most restaurants offer a three-course set menu with a drink for around €13–18, by far the best-value way to eat well. Step away from the cathedral and Passeig del Born for food and drink — prices drop sharply just a couple of streets back, and the Mercat de l'Olivar and Santa Catalina market are cheap, atmospheric options. Load a rechargeable EMT travel card rather than paying cash on the bus, and remember the compact old town is free to explore on foot.",
      "Time paid attractions around their free or reduced slots where they exist, carry a refillable water bottle, and buy edible souvenirs — sobrassada, sea salt, wine, ensaïmadas — at the markets rather than tourist shops. If you're touring the island, a hire car split between a few people is often cheaper and far more flexible than organised excursions, and booking flights and hotels for the shoulder seasons cuts the single biggest expenses.",
    ],
  },
  {
    heading: "Paying and tipping",
    paragraphs: [
      "Spain uses the euro (€), and card payments — including contactless and mobile wallets — are accepted almost everywhere in Palma, though it's worth carrying a little cash for small market stalls, some beach bars and tips. ATMs are plentiful; try to use bank machines rather than the standalone 'Euronet'-style ones, which levy poor exchange rates and fees.",
      "Tipping is modest and not obligatory: locals typically round up the bill or leave small change at a café, and around 5–10% for good service at a restaurant is generous rather than expected. There's no need to tip for a quick drink at a bar. Prices in shops and restaurants include VAT (IVA), and non-EU visitors can reclaim tax on larger purchases through the tax-free shopping scheme at stores that offer it.",
    ],
  },
];

export default function PalmaPrices() {
  return (
    <CityGuideShell
      citySlug="palma"
      cityName="Palma"
      categories={PALMA_CATEGORIES}
      active="prices"
      crumb="Prices"
      h1="Palma Prices & Daily Budget"
      heroImage="/images/content/photo-1579621970563-ebec7560ff3e.avif"
      intro="Palma is a mid-priced Mediterranean destination where the flight is often the cheapest part of the trip and smart choices on the ground keep costs down. Below is a clear breakdown of what things actually cost — daily budgets for every style of traveller, sample prices for food, drinks, transport and attractions, and practical tips for saving money and paying on your Mallorca break."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />

      <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Daily budget by travel style</h2>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[620px] border-collapse text-sm">
          <thead>
            <tr className="bg-card text-left">
              <th className="px-4 py-3 font-semibold text-foreground">Style</th>
              <th className="px-4 py-3 font-semibold text-foreground">Accommodation</th>
              <th className="px-4 py-3 font-semibold text-foreground">Food &amp; drink</th>
              <th className="px-4 py-3 font-semibold text-foreground">Transport &amp; sights</th>
              <th className="px-4 py-3 font-semibold text-foreground">Daily total (pp)</th>
            </tr>
          </thead>
          <tbody>
            {BUDGETS.map((row) => (
              <tr key={row[0]} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{row[0]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[1]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[2]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[3]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Sample prices in Palma</h2>
      <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="bg-card text-left">
              <th className="px-4 py-3 font-semibold text-foreground">Item</th>
              <th className="px-4 py-3 font-semibold text-foreground">Typical price</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE.map((row) => (
              <tr key={row[0]} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{row[0]}</td>
                <td className="px-4 py-3 text-muted-foreground">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">{s.heading}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i} className="mt-4 text-base leading-relaxed text-muted-foreground">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </CityGuideShell>
  );
}
