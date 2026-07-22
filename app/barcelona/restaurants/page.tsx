import type { Metadata } from "next";
import { GuideShell, GuideSection } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Restaurants in Barcelona 2026 — Where to Eat | Flyamba",
  description:
    "Where to eat in Barcelona: the best tapas bars, seafood, food markets, budget bites and fine dining, by neighborhood, with prices and tips.",
  alternates: { canonical: `${SITE}/barcelona/restaurants` },
  openGraph: { title: "Where to Eat in Barcelona | Flyamba", description: "15 of Barcelona's best restaurants and food spots.", type: "article" },
};

type Spot = { name: string; type: string; area: string; price: string; desc: string };

const SPOTS: Spot[] = [
  { name: "Bar Cañete", type: "Classic tapas", area: "El Raval", price: "€€", desc: "A buzzing marble-counter tapas bar serving impeccable jamón, grilled prawns and market vegetables. Sit at the bar for the full show and book ahead — it fills fast." },
  { name: "Quimet & Quimet", type: "Montaditos", area: "Poble-sec", price: "€€", desc: "A tiny, wall-of-bottles standing bar famous for its montaditos (little open sandwiches) built from tinned seafood, cheese and honey. No seats, big flavour." },
  { name: "Cervecería Catalana", type: "Tapas", area: "Eixample", price: "€€", desc: "A perennially packed all-rounder with a huge range of hot and cold tapas and montaditos. Arrive early or expect a wait — it's popular with locals and visitors alike." },
  { name: "La Cova Fumada", type: "Bombas & seafood", area: "Barceloneta", price: "€", desc: "A cash-only, sign-less institution said to have invented the 'bomba' (a spicy potato croquette). Rough-and-ready, cheap and utterly authentic — lunch only." },
  { name: "Can Solé", type: "Seafood & paella", area: "Barceloneta", price: "€€€", desc: "A century-old classic for rice dishes and fresh seafood near the harbour. The arròs (paella) and fideuà are the reasons to come — book a table." },
  { name: "Els Pescadors", type: "Seafood", area: "Poblenou", price: "€€€", desc: "Set on a leafy old fishermen's square, this refined seafood spot serves the catch of the day and superb rice dishes away from the tourist crush." },
  { name: "Disfrutar", type: "Modernist tasting", area: "Eixample", price: "€€€€", desc: "One of the world's very best restaurants, run by elBulli alumni. A playful, boundary-pushing tasting menu — reserve months ahead for a once-in-a-trip splurge." },
  { name: "Bodega 1900", type: "Vermouth & bites", area: "Sant Antoni", price: "€€", desc: "The Adrià brothers' homage to the classic Barcelona vermouth bar, with brilliant tinned seafood, house vermouth and a perfect long Catalan lunch." },
  { name: "Bar del Pla", type: "Modern tapas", area: "El Born", price: "€€", desc: "A relaxed spot near the Picasso Museum blending traditional tapas with modern twists — the slow-cooked pork and croquettes are standouts, paired with natural wines." },
  { name: "El Xampanyet", type: "Cava & tapas", area: "El Born", price: "€€", desc: "A tiled, always-heaving classic pouring house cava alongside anchovies and simple tapas. Squeeze in at the bar for a lively, old-school experience." },
  { name: "Tickets", type: "Tapas theatre", area: "Sant Antoni", price: "€€€", desc: "The Adriàs' theatrical tapas bar turns dinner into a show, with liquid olives and playful bites. Hard to book but a joyful mid-range splurge." },
  { name: "Mercat de Santa Caterina", type: "Food market", area: "Sant Pere", price: "€", desc: "A colourful, wave-roofed market with far fewer tourists than La Boqueria. Grab fresh produce or eat well at Cuines Santa Caterina inside." },
  { name: "La Boqueria stalls", type: "Market bar", area: "El Raval", price: "€", desc: "Beyond the famous market's produce, its tucked-away bars — like Pinotxo and El Quim — serve some of the city's best-value cooked-to-order seafood and eggs." },
  { name: "Federal Café", type: "Brunch & budget", area: "Sant Antoni / Gòtic", price: "€", desc: "An Aussie-style café loved for all-day brunch, good coffee and a sunny rooftop. A reliable, affordable break from tapas overload." },
  { name: "Xurreria (Carrer dels Banys Nous)", type: "Churros", area: "Gothic Quarter", price: "€", desc: "A hole-in-the-wall selling fresh churros and ensaïmadas to take away. The cheapest, most delicious sweet snack in the old city." },
];

export default function BarcelonaRestaurants() {
  return (
    <GuideShell
      active="restaurants"
      crumb="Restaurants"
      h1="Where to Eat in Barcelona"
      heroImage="https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=2000&q=80"
      intro="Barcelona is one of Europe's great eating cities — a place where a €2 montadito at a tiled bar and a multi-course tasting menu can both be the meal of the trip. This guide covers the full range: classic tapas bars, harbour-side seafood, buzzing food markets, wallet-friendly bites and the fine dining that put the city on the world map."
    >
      <GuideSection title="How eating out works in Barcelona">
        <p>
          Locals eat late: lunch runs from around 14:00 and dinner rarely starts before 21:00. Many kitchens close between
          16:00 and 20:00, so plan around the schedule or head to a tapas bar, which serves throughout the day. Tapas are
          meant for sharing — order a few plates for the table and keep going. Tipping is not expected; rounding up or
          leaving 5–10% for great service is plenty. Menú del día (a fixed-price lunch of 2–3 courses with a drink, often
          €12–16) is the best value meal in the city.
        </p>
      </GuideSection>

      <div className="mt-8 space-y-4">
        {SPOTS.map((s) => (
          <div key={s.name} className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/15 font-serif text-lg text-accent">{s.price}</div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <h3 className="font-serif text-lg font-semibold text-foreground">{s.name}</h3>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.type}</span>
              </div>
              <p className="text-xs text-accent">{s.area}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <GuideSection title="Where to eat by budget">
        <p>
          <strong className="text-foreground">Budget (under €15):</strong> market bars in La Boqueria and Santa Caterina,
          menú del día lunches, and neighbourhood spots in Sant Antoni and Poble-sec. <strong className="text-foreground">Mid-range
          (€25–45):</strong> the classic tapas bars — Cañete, Cervecería Catalana, Bar del Pla — and harbour seafood.
          <strong className="text-foreground"> Fine dining (€120+):</strong> Disfrutar and Tickets for a special occasion,
          booked well in advance. Wherever you eat, skip the picture-menu terraces right on Las Ramblas — walk two streets
          into the Gothic Quarter or El Born and both quality and value jump.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
