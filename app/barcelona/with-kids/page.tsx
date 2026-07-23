import type { Metadata } from "next";
import { GuideShell, GuideSection, GuideCard, Tip } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona with Kids 2026 — Family Travel Guide | Flyamba",
  description:
    "Barcelona with kids: the best family activities (Tibidabo, the aquarium, CosmoCaixa, parks and beaches), where to stay and practical tips for travelling with children.",
  alternates: { canonical: `${SITE}/barcelona/with-kids` },
  openGraph: { title: "Barcelona with Kids | Flyamba", description: "Family activities, parks and practical tips for Barcelona.", type: "article" },
};

const FAQS = [
  { q: "Is Barcelona good for families with young children?", a: "Very. Barcelona is walkable, has warm weather, safe beaches, big parks and lots of kid-friendly attractions like Tibidabo, the aquarium and CosmoCaixa science museum. Spaniards adore children, so kids are welcome almost everywhere, including restaurants late into the evening." },
  { q: "What's the best area to stay in with kids?", a: "Eixample is the top choice — central, flat, easy to walk and full of apartments with space for families, close to the metro. Barceloneta suits a beach-focused trip, and Gràcia offers a quieter, village feel with playgrounds and family cafés." },
  { q: "Can you use a stroller on the Barcelona metro?", a: "Yes. Most metro stations have lifts or escalators and strollers are allowed on trains. Buses have dedicated stroller spaces too. Avoid rush hour (08:00–09:30 and 17:30–19:30) when trains get crowded." },
  { q: "What should we pack for kids in Barcelona?", a: "Sunscreen and hats year-round (the sun is strong), comfortable shoes for cobbled streets, swimwear in summer, and a lightweight stroller or carrier. Baby supplies are easy to buy at pharmacies and supermarkets." },
];

function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export default function BarcelonaWithKids() {
  return (
    <GuideShell
      active="with-kids"
      crumb="With kids"
      h1="Barcelona with Kids"
      heroImage="/images/content/photo-1484820540004-14229fe36ca4.avif"
      intro="Barcelona is a dream family destination: a compact, walkable city with warm weather, sandy beaches, big green parks and a surprising number of attractions built for children. Add welcoming, child-friendly restaurants and excellent public transport, and it's easy to keep everyone happy. Here are the best things to do with kids, where to base yourselves, and the practical tips that make travelling with children stress-free."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c") }} />

      <GuideSection title="Top family attractions">
        <div className="grid gap-4 sm:grid-cols-2">
          <GuideCard title="Tibidabo amusement park">
            <p>A charming century-old amusement park on the mountain above the city, with gentle rides for little ones, a Ferris wheel and the best views in Barcelona. Reached by the historic Tramvia Blau and a funicular — an adventure in itself. From about €28.</p>
          </GuideCard>
          <GuideCard title="Barcelona Aquarium">
            <p>One of Europe's largest aquariums at Port Vell, with an 80-metre underwater tunnel through a shark-filled ocean tank. A guaranteed hit on a rainy day; around €25 for adults, less for kids.</p>
          </GuideCard>
          <GuideCard title="CosmoCaixa science museum">
            <p>A brilliant hands-on science museum with a recreated flooded Amazon rainforest, a planetarium and interactive exhibits. Great for curious kids of all ages and excellent value (about €6).</p>
          </GuideCard>
          <GuideCard title="Barcelona Zoo">
            <p>Set inside Parc de la Ciutadella, the zoo is easy to combine with a picnic and playtime in the park. Around €21 adults; the park itself is free.</p>
          </GuideCard>
        </div>
      </GuideSection>

      <GuideSection title="Parks, beaches & the outdoors">
        <p>
          <strong className="text-foreground">Parc de la Ciutadella</strong> is the city's family playground — playgrounds,
          a boating lake, the zoo and plenty of space to run around. <strong className="text-foreground">Park Güell</strong>
          delights kids with its fairy-tale Gaudí buildings and mosaic dragon. For something quieter, the
          <strong className="text-foreground"> Parc del Laberint d&apos;Horta</strong> has a genuine hedge maze. The city
          beaches — especially calmer <strong className="text-foreground">Nova Icària</strong> — are shallow, sandy and
          lifeguarded in summer, perfect for a family beach day right in town.
        </p>
        <Tip>Even Gaudí's big sights are kid-friendly if you keep visits short — the Sagrada Família's colourful light and the wavy rooftops at La Pedrera fascinate children.</Tip>
      </GuideSection>

      <GuideSection title="Where to stay & getting around with kids">
        <p>
          <strong className="text-foreground">Eixample</strong> is the best family base: central, flat and full of
          spacious apartments near the metro. <strong className="text-foreground">Barceloneta</strong> is ideal for a
          beach-led trip, and <strong className="text-foreground">Gràcia</strong> offers a calmer, village atmosphere with
          playgrounds and family cafés. Apartments (officially licensed — look for an HUTB number) often work better than
          hotels for families, giving you a kitchen and room to spread out. The metro is stroller-friendly with lifts at
          most stations, and children under 4 travel free.
        </p>
      </GuideSection>

      <GuideSection title="Practical tips">
        <ul className="list-disc space-y-1 pl-5">
          <li>Spanish meal times are late — restaurants get going after 21:00. Bring snacks, or eat the affordable menú del día at lunch.</li>
          <li>Kids&apos; menus are uncommon, but sharing tapas suits children perfectly.</li>
          <li>Sun protection is essential year-round; siesta-time (roughly 15:00–17:00) is a good window for a rest or the beach.</li>
          <li>Pharmacies (green cross) are everywhere and stock baby supplies; tap water is safe to drink.</li>
        </ul>
      </GuideSection>

      <GuideSection id="faq" title="Frequently asked questions">
        <div className="space-y-4">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-serif text-base font-semibold text-foreground">{f.q}</h3>
              <p className="mt-1 text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideShell>
  );
}
