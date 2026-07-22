import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Best Hotels in Barcelona 2026 — Where to Stay | Flyamba",
  description:
    "Where to stay in Barcelona: the best neighborhoods (Eixample, Gothic Quarter, Barceloneta, Gràcia) plus luxury, mid-range and budget picks with price ranges.",
  alternates: { canonical: `${SITE}/barcelona/hotels` },
  openGraph: { title: "Where to Stay in Barcelona | Flyamba", description: "Barcelona neighborhoods and hotels by budget.", type: "article" },
};

export default function BarcelonaHotels() {
  return (
    <GuideShell
      active="hotels"
      crumb="Hotels"
      h1="Where to Stay in Barcelona"
      heroImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=80"
      intro="Barcelona is compact and superbly connected, so almost any central neighborhood puts you within a short metro ride of the sights. The bigger question is what kind of trip you want: grand modernista boulevards, medieval lanes, beach life or a local village feel. This guide breaks down the best areas to stay and what to expect at every budget."
    >
      <GuideSection title="Best neighborhoods to stay in">
        <div className="grid gap-4 sm:grid-cols-2">
          <GuideCard title="Eixample — elegant &amp; central">
            <p>Gaudí's boulevard district, laid out on a grid of wide streets and modernista façades. Great restaurants, boutique shopping and easy metro access. The best all-round base for first-timers; the Dreta side is smart, and Gaixample (left side) is the LGBTQ+ hub.</p>
          </GuideCard>
          <GuideCard title="Gothic Quarter — medieval &amp; atmospheric">
            <p>Stay in the heart of the old city among narrow lanes, plazas and the cathedral. Everything is walkable, but streets can be noisy at night and busy with day-trippers. Perfect for those who want to be in the thick of it.</p>
          </GuideCard>
          <GuideCard title="Barceloneta — beach life">
            <p>The old fishermen's quarter right on the sand, with seafood restaurants and the boardwalk on your doorstep. Ideal for a summer trip, though further from the Gaudí sights and pricier in peak season.</p>
          </GuideCard>
          <GuideCard title="Gràcia — local village vibe">
            <p>A bohemian former village of leafy plazas, indie shops and neighbourhood bars, just above Eixample. Quieter and more residential — great value and character, a short walk from Park Güell.</p>
          </GuideCard>
        </div>
        <p className="mt-4">
          Also consider <strong className="text-foreground">El Born</strong> (stylish, central, near the Picasso Museum) and
          <strong className="text-foreground"> Sant Antoni</strong> (up-and-coming, foodie, great value). Areas to be a
          little more selective in include the lower stretch of Las Ramblas and parts of El Raval at night.
        </p>
      </GuideSection>

      <GuideSection title="Hotels by budget">
        <div className="space-y-4">
          <GuideCard title="Luxury — from €250/night">
            <p>Barcelona's five-stars cluster in Eixample and along the waterfront: think rooftop pools, Michelin dining and modernista grandeur. Standouts include the seafront W Barcelona, the elegant Hotel Casa Fuster and the Mandarin Oriental on Passeig de Gràcia. Peak summer and event weeks push rates well above €400.</p>
          </GuideCard>
          <GuideCard title="Mid-range — €120–200/night">
            <p>The sweet spot: stylish boutique hotels and design-led four-stars across Eixample, El Born and Gràcia, often with rooftop terraces. Book 6–8 weeks ahead in shoulder season (April–May, September–October) for the best value.</p>
          </GuideCard>
          <GuideCard title="Budget — €40–90/night">
            <p>Barcelona has an excellent hostel and budget-hotel scene, especially in Gràcia, Sant Antoni and around Plaça Universitat. Expect clean private rooms from around €70, or dorm beds from €25. Aparthotels and apartments can be great value for stays of 4+ nights.</p>
          </GuideCard>
        </div>
        <Tip>Barcelona strictly regulates tourist apartments — book only officially licensed listings (look for an HUTB registration number) to avoid last-minute cancellations.</Tip>
      </GuideSection>

      <GuideSection title="When to book and what to pay">
        <p>
          Rates swing hard by season. The cheapest months are November to February (outside Christmas and New Year), when a
          good mid-range double can dip under €100. Prices climb from Easter, peak in June–August and around major trade
          fairs like Mobile World Congress in late February/early March, when hotels city-wide sell out and rates can double.
          Wherever you stay, factor in the city tourist tax (a few euros per person per night, charged at checkout) and note
          that most central hotels don't include parking — you won't need a car in the city anyway.
        </p>
      </GuideSection>
    </GuideShell>
  );
}
