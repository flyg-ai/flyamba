import type { Metadata } from "next";
import { GuideShell, GuideSection } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Top Attractions in Barcelona 2026 — Visitor Guide | Flyamba",
  description:
    "The 20 best things to do in Barcelona — Sagrada Família, Park Güell, the Gothic Quarter, beaches and more, with prices, opening hours and insider tips.",
  alternates: { canonical: `${SITE}/barcelona/attractions` },
  openGraph: { title: "Best Things to Do in Barcelona | Flyamba", description: "20 top Barcelona attractions with prices, hours and tips.", type: "article" },
};

type Attraction = { name: string; desc: string; tip: string; price: string; hours: string };

const ATTRACTIONS: Attraction[] = [
  { name: "Sagrada Família", desc: "Gaudí's unfinished basilica is Barcelona's defining landmark — a forest of stone columns and stained glass that has been under construction since 1882. The interior light show at sunrise and sunset is unforgettable, and completion is targeted for the 2030s.", tip: "Book a timed entry online at least two weeks ahead; add the tower lift for city views.", price: "From €26 (basilica); €36 with towers", hours: "Mon–Sat 09:00–20:00, Sun 10:30–20:00" },
  { name: "Park Güell", desc: "Gaudí's mosaic wonderland on Carmel Hill mixes gingerbread gatehouses, a serpentine tiled bench and sweeping views over the city to the sea. The Monumental Zone with the famous salamander requires a ticket; the surrounding park is free.", tip: "Go early or late — midday is hot and crowded. The 24 bus drops you near the top entrance.", price: "€10 (Monumental Zone)", hours: "Daily 09:30–19:30 (seasonal)" },
  { name: "Casa Batlló", desc: "Gaudí's most theatrical townhouse on Passeig de Gràcia, with a scaly dragon-back roof, bone-like balconies and an ocean-blue light well. The immersive audio-visual tour brings the modernista fantasy to life.", tip: "The 'Gaudí Dôme' evening visit with a rooftop drink is quieter and magical.", price: "From €29", hours: "Daily 09:00–20:00" },
  { name: "La Pedrera (Casa Milà)", desc: "Gaudí's undulating limestone apartment block, a UNESCO site, is famous for its warrior-like rooftop chimneys and wave-shaped façade. The rooftop, attic and a restored period apartment are all part of the visit.", tip: "The 'Night Experience' projection-mapping show on the roof is a highlight.", price: "From €28", hours: "Daily 09:00–20:30" },
  { name: "Gothic Quarter (Barri Gòtic)", desc: "The medieval heart of the old city is a labyrinth of narrow lanes, hidden squares and Roman remains around the cathedral. It's free to wander and best explored on foot, getting pleasantly lost between tapas bars and boutiques.", tip: "Duck into Plaça del Rei and the Roman columns on Carrer del Paradís.", price: "Free (cathedral €9)", hours: "Streets always open" },
  { name: "La Boqueria Market", desc: "Barcelona's most famous food market, just off Las Ramblas, is a riot of jamón, fruit stalls, seafood counters and juice vendors. Come hungry and eat at one of the tapas bars tucked among the stalls.", tip: "Avoid the front entrance stalls (touristy); walk to the back for local prices.", price: "Free entry", hours: "Mon–Sat 08:00–20:30" },
  { name: "Camp Nou", desc: "The legendary home of FC Barcelona is Europe's largest football stadium. The museum and tour cover the club's trophies and history; note the stadium has been under renovation, so check what's open before visiting.", tip: "Match tickets sell fast — buy through the official club site.", price: "From €28 (tour)", hours: "Daily 09:30–19:00 (varies)" },
  { name: "Barceloneta Beach", desc: "The city's most central beach is a wide golden strip a short metro ride from the Gothic Quarter, lined with chiringuitos (beach bars) and seafood restaurants. Great for a swim, a stroll along the boardwalk or people-watching.", tip: "It gets packed in summer — arrive before 11:00 for a good spot.", price: "Free", hours: "Always open" },
  { name: "MACBA", desc: "The Museum of Contemporary Art is a bright Richard Meier building in El Raval, with rotating exhibitions of Catalan and international modern art. Its plaza is also Barcelona's most famous skateboarding spot.", tip: "Free entry on Saturday afternoons (16:00–20:00).", price: "€12", hours: "Wed–Mon 11:00–19:30" },
  { name: "Palau de la Música Catalana", desc: "A jaw-dropping modernista concert hall by Domènech i Montaner, drenched in stained glass, mosaics and sculpture. A UNESCO World Heritage Site — see it on a guided tour or, better, at a live concert.", tip: "A short lunchtime flamenco or guitar concert is an affordable way to experience the hall.", price: "From €22 (tour)", hours: "Daily 10:00–15:30 (tours)" },
  { name: "Tibidabo", desc: "The mountain overlooking Barcelona is crowned by the Sagrat Cor church and a charming century-old amusement park with a Ferris wheel and the best panoramic views in the city.", tip: "Ride the historic Tramvia Blau and funicular up for the full experience.", price: "Park from €28; church free", hours: "Weekends & holidays (seasonal)" },
  { name: "Montjuïc Castle", desc: "A 17th-century fortress atop Montjuïc hill with commanding views over the port and city. The surrounding hill also holds gardens, museums and the 1992 Olympic venues.", tip: "Take the Montjuïc cable car up for the views, then walk down through the gardens.", price: "€12 (castle)", hours: "Daily 10:00–20:00 (seasonal)" },
  { name: "Picasso Museum", desc: "Set in five medieval palaces in El Born, this museum holds one of the world's most complete collections of Picasso's early work, tracing his formative Barcelona years.", tip: "Free on Thursday evenings (17:00–20:00) and the first Sunday of each month — book ahead.", price: "€12", hours: "Tue–Sun 10:00–19:00" },
  { name: "El Born", desc: "A stylish medieval district of boutiques, cocktail bars and the Basílica de Santa Maria del Mar. The El Born Cultural Centre preserves excavated 18th-century streets under a glass floor.", tip: "Santa Maria del Mar is free in the mornings — a Gothic gem.", price: "Free to explore", hours: "Streets always open" },
  { name: "Parc de la Ciutadella", desc: "Barcelona's central green lung, home to a monumental fountain (partly designed by a young Gaudí), a boating lake, the Catalan parliament and the city zoo. A favourite spot for picnics and Sunday drum circles.", tip: "Rent a rowboat on the lake for a cheap, relaxing hour.", price: "Free", hours: "Daily 10:00–22:30" },
  { name: "Font Màgica de Montjuïc", desc: "The Magic Fountain below the Palau Nacional puts on a free choreographed show of water, light and music on select evenings — a classic Barcelona night out.", tip: "Arrive 20 minutes early for a spot on the steps; check the seasonal schedule.", price: "Free", hours: "Show evenings (Thu–Sat, seasonal)" },
  { name: "Casa Milà rooftop", desc: "Beyond the apartment, La Pedrera's rooftop is an attraction in itself — a surreal terrace of helmeted chimneys framing views of the Sagrada Família. Included with entry but worth singling out.", tip: "Sunset slots sell out first; the night show adds projections.", price: "Included with La Pedrera", hours: "See La Pedrera" },
  { name: "Fundació Joan Miró", desc: "A luminous hilltop museum on Montjuïc dedicated to the Catalan surrealist Joan Miró, with bold paintings, sculptures and a sculpture terrace with city views.", tip: "Combine with the nearby Olympic ring and the cable car in one Montjuïc day.", price: "€14", hours: "Tue–Sun 10:00–18:00" },
  { name: "Las Ramblas", desc: "Barcelona's famous tree-lined promenade runs from Plaça Catalunya to the harbour, buzzing with performers, flower stalls and cafés. Touristy but a rite of passage — and the gateway to La Boqueria and the Gothic Quarter.", tip: "Keep valuables secure — this is the city's top pickpocket spot.", price: "Free", hours: "Always open" },
  { name: "Palau Güell", desc: "An early Gaudí mansion just off Las Ramblas, built for his patron Eusebi Güell. Its dramatic parabolic entrance, cathedral-like central hall and colourful rooftop chimneys are a lower-key alternative to the busier Gaudí sites.", tip: "Far fewer crowds than Casa Batlló — a peaceful Gaudí fix.", price: "€12", hours: "Tue–Sun 10:00–17:30" },
];

function attractionJsonLd(a: Attraction) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: a.name,
    description: a.desc,
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
    isAccessibleForFree: /free/i.test(a.price),
  };
}

export default function BarcelonaAttractions() {
  return (
    <GuideShell
      active="attractions"
      crumb="Attractions"
      h1="Best Things to Do in Barcelona"
      heroImage="/images/content/sagrada-familia.avif"
      intro="Barcelona packs more must-see sights into a walkable city than almost anywhere in Europe — from Gaudí's fantastical architecture and world-class museums to Mediterranean beaches and buzzing food markets. Here are the 20 attractions worth building your trip around, with prices, opening hours and tips to skip the queues."
    >
      {ATTRACTIONS.map((a) => (
        <script key={a.name} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionJsonLd(a)).replace(/</g, "\\u003c") }} />
      ))}

      <GuideSection title="Gaudí &amp; modernista masterpieces">
        <p>
          No city is more shaped by one architect than Barcelona is by Antoni Gaudí. His UNESCO-listed works — the
          Sagrada Família, Park Güell, Casa Batlló, La Pedrera and Palau Güell — are the backbone of any first visit, and
          Passeig de Gràcia strings several of them together in one elegant boulevard walk.
        </p>
      </GuideSection>

      <div className="mt-8 space-y-4">
        {ATTRACTIONS.map((a, i) => (
          <div key={a.name} className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl font-semibold text-accent">{i + 1}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground">{a.name}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            <p className="mt-3 rounded-xl border border-accent/20 bg-accent/8 px-4 py-2.5 text-sm text-muted-foreground">
              <span className="font-semibold text-accent">Tip:</span> {a.tip}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
              <span><span className="font-semibold text-foreground">Price:</span> {a.price}</span>
              <span><span className="font-semibold text-foreground">Hours:</span> {a.hours}</span>
            </div>
          </div>
        ))}
      </div>

      <GuideSection title="How many days do you need?">
        <p>
          Three full days is enough to cover the highlights without rushing: dedicate one day to Gaudí (Sagrada Família,
          Park Güell and a Passeig de Gràcia house), one to the old city (Gothic Quarter, El Born, the Picasso Museum and
          La Boqueria), and one to Montjuïc and the beach. Add a fourth day for a coastal day trip to Sitges or the wine
          country. Opening hours shift seasonally, so always confirm times and pre-book the Sagrada Família and Park Güell,
          which regularly sell out.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
