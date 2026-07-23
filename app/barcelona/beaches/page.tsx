import type { Metadata } from "next";
import { GuideShell, GuideSection } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Beaches in Barcelona 2026 — Complete Guide | Flyamba",
  description:
    "Barcelona's best beaches: Barceloneta, Bogatell, Mar Bella, Nova Icària, Ocata and the Sitges day trip — with facilities, vibe and how to get there.",
  alternates: { canonical: `${SITE}/barcelona/beaches` },
  openGraph: { title: "Barcelona's Best Beaches | Flyamba", description: "8 beaches from Barceloneta to Sitges.", type: "article" },
};

type Beach = { name: string; vibe: string; facilities: string; getting: string; desc: string };

const BEACHES: Beach[] = [
  { name: "Barceloneta", vibe: "Central & lively", facilities: "Showers, loungers, chiringuitos, lifeguards", getting: "Metro L4 Barceloneta, 10-min walk", desc: "The city's most famous and central beach — a wide golden strip backed by seafood restaurants and the W hotel. Buzzing, social and often crowded in summer, but unbeatable for convenience and people-watching." },
  { name: "Sant Sebastià", vibe: "Relaxed & central", facilities: "Showers, sports areas, accessible ramps", getting: "Metro L4 Barceloneta", desc: "Barceloneta's quieter southern neighbour, a little calmer and with good accessibility. Popular with locals and home to a couple of upscale beach clubs." },
  { name: "Nova Icària", vibe: "Family-friendly", facilities: "Showers, volleyball, calm water, restaurants", getting: "Metro L4 Ciutadella-Vila Olímpica", desc: "A cleaner, calmer beach by the Olympic Port, favoured by families for its gentle water and relaxed atmosphere. Fewer party crowds than Barceloneta." },
  { name: "Bogatell", vibe: "Local & spacious", facilities: "Showers, sports courts, bars, lifeguards", getting: "Metro L4 Llacuna / Poblenou", desc: "A wide, well-kept beach in Poblenou that's popular with locals and joggers. More space and a laid-back feel — a great choice to escape the tourist crush." },
  { name: "Mar Bella", vibe: "Young & alternative", facilities: "Showers, skate park, bars, nudist section", getting: "Metro L4 Selva de Mar", desc: "A lively, youthful beach with a sporty, alternative vibe and a designated clothing-optional area at its northern end. Backed by a skate park and beach bars." },
  { name: "Nova Mar Bella", vibe: "Quiet & residential", facilities: "Showers, kayak/paddle rental, restaurants", getting: "Metro L4 Selva de Mar", desc: "Continuing north, this stretch is calmer and more residential, popular with local families and watersports fans. The city beaches taper off pleasantly here." },
  { name: "Ocata (El Masnou)", vibe: "Wide & uncrowded", facilities: "Showers, restaurants, plenty of space", getting: "Renfe R1 train, ~25 min to El Masnou", desc: "A long, broad, golden beach just up the coast — a favourite local escape when the city beaches are packed. An easy, cheap train ride for far more room and cleaner sand." },
  { name: "Sitges (day trip)", vibe: "Charming resort town", facilities: "17 beaches, promenade, bars, full amenities", getting: "Renfe R2 Sud train, ~40 min", desc: "The classic Barcelona beach day trip: a whitewashed seaside town 40 minutes south with 17 beaches, a beautiful seafront church, buzzing bars and a famously welcoming LGBTQ+ scene. Worth a full day." },
];

function beachJsonLd(b: Beach) {
  return {
    "@context": "https://schema.org",
    "@type": "Beach",
    name: b.name,
    description: b.desc,
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
  };
}

export default function BarcelonaBeaches() {
  return (
    <GuideShell
      active="beaches"
      crumb="Beaches"
      h1="Barcelona's Best Beaches"
      heroImage="/images/content/photo-1523531294919-4bcd7c65e216.avif"
      intro="Few big cities put a proper beach 20 minutes from the medieval old town. Barcelona has more than four kilometres of golden sand right in the city, plus quieter stretches and resort towns a short train ride away. Here are the eight best beaches — from the buzzing centre to family-friendly sands and the perfect day-trip escape — with facilities and how to reach each."
    >
      {BEACHES.map((b) => (
        <script key={b.name} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(beachJsonLd(b)).replace(/</g, "\\u003c") }} />
      ))}

      <GuideSection title="City beaches & day trips">
        <p>
          Barcelona's beaches run in a chain north from the Port Vell: Barceloneta, Sant Sebastià, Nova Icària, Bogatell, Mar
          Bella and Nova Mar Bella, all reachable on metro line L4. For more space and cleaner water, hop on a short Renfe train
          to Ocata or spend the day in the seaside town of Sitges. Beach season runs roughly June to October, with water warm
          enough to swim and lifeguards on duty; outside those months the boardwalk is still a lovely walk.
        </p>
      </GuideSection>

      <div className="mt-8 space-y-4">
        {BEACHES.map((b, i) => (
          <div key={b.name} className="rounded-3xl border border-border bg-card p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl font-semibold text-accent">{i + 1}</span>
              <h3 className="font-serif text-xl font-semibold text-foreground">{b.name}</h3>
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{b.vibe}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
            <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:gap-6">
              <span><span className="font-semibold text-foreground">Facilities:</span> {b.facilities}</span>
              <span><span className="font-semibold text-foreground">Getting there:</span> {b.getting}</span>
            </div>
          </div>
        ))}
      </div>

      <GuideSection title="Beach tips">
        <p>
          Barcelona's central beaches are notorious for petty theft and persistent hawkers — take only what you need and never
          leave belongings unattended while you swim. The sand is busiest 12:00–17:00 in summer, so arrive before 11:00 for a
          good spot, or come late afternoon as the crowds thin. Chiringuitos (beach bars) are handy but pricey; a supermarket
          picnic is cheaper. For calm water and space, head north to Bogatell and beyond, or take the train to Ocata or Sitges.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
