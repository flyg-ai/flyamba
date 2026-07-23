import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona Nightlife 2026 — Best Bars & Clubs | Flyamba",
  description:
    "Barcelona nightlife guide: the best neighborhoods, top clubs, rooftop and cocktail bars, and when to go out — from vermouth hour to sunrise on the beach.",
  alternates: { canonical: `${SITE}/barcelona/nightlife` },
  openGraph: { title: "Barcelona Nightlife Guide | Flyamba", description: "Best bars, clubs and rooftops in Barcelona.", type: "article" },
};

export default function BarcelonaNightlife() {
  return (
    <GuideShell
      active="nightlife"
      crumb="Nightlife"
      h1="Barcelona Nightlife Guide"
      heroImage="/images/content/photo-1514525253161-7a46d19cd819.avif"
      intro="Barcelona goes out late and hard. The night starts with vermouth or cocktails around 20:00, dinner stretches past 22:00, bars fill after midnight and clubs don't get going until 02:00 — often running to 06:00. From cosy El Born cocktail dens to vast beachfront superclubs, here's where to go and how to time your night like a local."
    >
      <GuideSection title="Best neighborhoods for a night out">
        <div className="grid gap-4 sm:grid-cols-2">
          <GuideCard title="El Born — cocktails &amp; charm">
            <p>Medieval lanes packed with characterful cocktail bars, wine bars and tapas spots. The best area for a stylish, sociable evening that doesn't require a club. Start around Passeig del Born and wander.</p>
          </GuideCard>
          <GuideCard title="Eixample &amp; Gaixample — bars &amp; clubs">
            <p>Smart cocktail bars and the heart of the LGBTQ+ scene (Gaixample), with everything from speakeasies to big-name clubs. Rooftop bars on the grand avenues are perfect for warm evenings.</p>
          </GuideCard>
          <GuideCard title="Barceloneta &amp; the beach — clubs till sunrise">
            <p>The seafront is home to Barcelona's famous megaclubs — Opium, Shôko, Pacha — where international DJs play to crowds until dawn. Dressy, pricey and touristy, but a classic Barcelona experience.</p>
          </GuideCard>
          <GuideCard title="Gràcia &amp; Poble-sec — local &amp; low-key">
            <p>Neighbourhood plazas and vermouth bars for a relaxed, authentic night with locals. Poble-sec's Carrer de Blai is a tapeo (tapas-crawl) favourite before things get lively.</p>
          </GuideCard>
        </div>
      </GuideSection>

      <GuideSection title="Top clubs & bars">
        <ul className="list-disc space-y-1 pl-5">
          <li><strong className="text-foreground">Razzmatazz</strong> — the city's biggest club, five rooms spanning indie, techno and pop in Poblenou.</li>
          <li><strong className="text-foreground">Opium &amp; Pacha</strong> — glossy beachfront clubs with big-room house and international DJs.</li>
          <li><strong className="text-foreground">Sala Apolo</strong> — a beloved former theatre for live gigs and the legendary Nasty Mondays.</li>
          <li><strong className="text-foreground">Paradiso</strong> — a world-ranked speakeasy hidden behind a pastrami shop in El Born.</li>
          <li><strong className="text-foreground">Dr. Stravinsky &amp; Two Schmucks</strong> — inventive cocktail bars beloved by the industry.</li>
          <li><strong className="text-foreground">Rooftop bars</strong> — the terraces at hotels like the W, Grand Hotel Central and Ohla for sunset drinks with a view.</li>
        </ul>
        <Tip>Many clubs offer cheaper or free entry with a guest-list sign-up before midnight — worth it, as door prices run €15–20 and include a drink.</Tip>
      </GuideSection>

      <GuideSection title="How the night runs — and staying safe">
        <p>
          A typical night: vermouth or a caña around 19:00–20:00, dinner from 21:00, cocktail bars from 23:00, and clubs from
          01:00–02:00 onward. If you arrive at a club before 01:00 it'll be empty. Public transport helps you home — the metro
          runs all night on Saturdays, and night buses (N-lines) cover the rest of the week; otherwise use a taxi or FreeNow.
          Keep an eye on your belongings in busy bars and around the beach clubs, where pickpocketing is common, and stick to
          licensed venues. Drinks are reasonably priced by big-city standards, but beachfront clubs charge a premium.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
