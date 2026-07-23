import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Shopping in Barcelona 2026 — Best Areas & Stores | Flyamba",
  description:
    "Where to shop in Barcelona: luxury on Passeig de Gràcia, boutiques in El Born, vintage in El Raval, food markets and the best souvenirs — with areas, stores and tips.",
  alternates: { canonical: `${SITE}/barcelona/shopping` },
  openGraph: { title: "Shopping in Barcelona | Flyamba", description: "Best shopping areas, markets and stores in Barcelona.", type: "article" },
};

export default function BarcelonaShopping() {
  return (
    <GuideShell
      active="shopping"
      crumb="Shopping"
      h1="Shopping in Barcelona"
      heroImage="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2000"
      intro="Barcelona is one of Europe's great shopping cities — a place where flagship luxury boutiques on a modernista boulevard sit minutes from medieval lanes full of independent designers, and where century-old food markets outshine any mall. Whether you're after Spanish fashion, local craft, vintage finds or edible souvenirs, here's where to go, area by area."
    >
      <GuideSection title="Passeig de Gràcia — luxury & flagships">
        <p>
          Barcelona's grandest avenue is its luxury spine, lined with international houses — Chanel, Louis Vuitton, Gucci,
          Prada — alongside Spanish flagships like Loewe and the huge Zara and Mango stores the country is famous for.
          It's also an architectural stroll, passing Gaudí's Casa Batlló and La Pedrera, so you can window-shop and
          sightsee at once.
        </p>
        <Tip>For Spanish high-street fashion at their best, hit the flagship Zara, Mango and Massimo Dutti here — often with stock you won't find abroad.</Tip>
        <p>
          Nearby, <strong className="text-foreground">Avinguda Diagonal</strong> continues the upmarket theme, and
          <strong className="text-foreground"> Portal de l&apos;Àngel</strong> (running down to the Gothic Quarter) is the
          busiest pedestrian shopping street in Spain, packed with mainstream chains. The city's landmark department store,
          <strong className="text-foreground"> El Corte Inglés</strong> on Plaça Catalunya, has everything under one roof
          plus a top-floor food hall with city views.
        </p>
      </GuideSection>

      <GuideSection title="El Born & the Gothic Quarter — boutiques & design">
        <p>
          For independent Barcelona fashion, head to <strong className="text-foreground">El Born</strong>: its narrow
          medieval streets around Passeig del Born are full of local designers, concept stores, jewellery workshops and
          homeware boutiques. The neighbouring <strong className="text-foreground">Gothic Quarter</strong> mixes tourist
          shops with genuine gems — try Carrer de la Palla and Carrer Banys Nous for antiques, art and artisan leather.
        </p>
        <GuideCard title="Gaudí-inspired & Catalan craft">
          <p>Look for ceramics, mosaic-tile homeware and design objects riffing on Gaudí and Catalan modernism — a stylish step up from generic souvenirs. Small workshops in El Born and the Gothic Quarter do it best.</p>
        </GuideCard>
      </GuideSection>

      <GuideSection title="El Raval — vintage & second-hand">
        <p>
          Bohemian <strong className="text-foreground">El Raval</strong> is Barcelona's vintage heartland. Kilo stores like
          Flamingos Vintage Kilo sell second-hand clothing by weight, while Holala! Plaza is a huge treasure trove of retro
          fashion and vinyl. Gràcia adds more indie and vintage boutiques with a village feel. On weekends, the open-air
          <strong className="text-foreground"> Palo Alto Market</strong> in Poblenou gathers design, food and music stalls.
        </p>
      </GuideSection>

      <GuideSection title="Food markets & edible souvenirs">
        <p>
          Barcelona's markets are a highlight in themselves. <strong className="text-foreground">La Boqueria</strong> off
          Las Ramblas is the famous one; <strong className="text-foreground">Mercat de Sant Antoni</strong> (beautifully
          restored) and <strong className="text-foreground">Mercat de Santa Caterina</strong> are calmer and more local.
          For the best edible gifts, buy Iberian jamón, tinned seafood, saffron, turrón, olive oil and cava — a wine shop
          like Vila Viniteca in El Born is ideal. <strong className="text-foreground">Mercat dels Encants</strong> is the
          city's big flea market for antiques and bric-a-brac.
        </p>
        <Tip>Jamón and most cured meats are fine to bring back within the EU; check your home country's customs rules for meat and dairy if travelling further.</Tip>
      </GuideSection>

      <GuideSection title="Malls & practical tips">
        <p>
          If you prefer everything in one place, <strong className="text-foreground">Maremàgnum</strong> at Port Vell is
          central and open on Sundays (when most shops close), <strong className="text-foreground">Las Arenas</strong> is a
          former bullring turned mall with a rooftop terrace, and <strong className="text-foreground">La Maquinista</strong>
          is the biggest, a little further out. Standard shop hours are roughly 10:00–20:00/21:00 Monday–Saturday; many
          smaller shops still close for a midday break, and most non-tourist shops shut on Sundays. Non-EU visitors can
          claim VAT (IVA) refunds on purchases over €90.16 from a single store — ask for a tax-free form and process it at
          the airport.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
