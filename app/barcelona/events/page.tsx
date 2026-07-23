import type { Metadata } from "next";
import { GuideShell, GuideSection } from "@/app/components/GuideShell";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Barcelona Events 2026 — Festivals, Concerts & Things to Do | Flyamba",
  description:
    "A complete calendar of Barcelona events and festivals in 2026 — La Mercè, Primavera Sound, Sónar, Sant Jordi, Carnival and New Year — month by month, with tips on when to fly.",
  alternates: { canonical: `${SITE}/barcelona/events` },
  openGraph: { title: "Barcelona Events & Festivals 2026 | Flyamba", description: "Month-by-month Barcelona events calendar for 2026.", type: "article" },
};

type Signature = { name: string; when: string; desc: string };
const SIGNATURE: Signature[] = [
  {
    name: "La Mercè",
    when: "Around 24 September",
    desc: "Barcelona's biggest street festival honours the city's patron saint over four or five days of mostly free events. Expect human towers (castellers), fire-running correfocs, giant papier-mâché figures (gegants), open-air concerts across a dozen stages and a spectacular closing fireworks-and-light show (Piromusical) on Montjuïc. It is the single best week to experience Catalan culture at full volume.",
  },
  {
    name: "Primavera Sound",
    when: "Late May / early June",
    desc: "One of Europe's most influential music festivals, drawing hundreds of thousands to the Parc del Fòrum for a cross-genre line-up of indie, pop, electronic and hip-hop headliners. The city also hosts free 'Primavera a la Ciutat' club shows. Three-day and single-day tickets sell out early, so book flights and passes well in advance.",
  },
  {
    name: "Sónar",
    when: "Mid-June",
    desc: "The world-renowned festival of electronic music, creativity and technology splits into Sónar by Day (talks, exhibitions, experimental sets) and Sónar by Night (huge headline DJs and live acts). It coincides with Barcelona's warm early-summer evenings and turns the whole city into an after-party.",
  },
  {
    name: "Sant Jordi",
    when: "23 April",
    desc: "Catalonia's romantic 'day of books and roses' is one of the most charming days on the calendar. Las Ramblas and every neighbourhood fill with book stalls and rose sellers, authors sign in the streets, and locals exchange a book and a flower. It's free, joyful and utterly local — a wonderful reason to visit in spring.",
  },
  {
    name: "Carnival (Carnestoltes)",
    when: "February (before Lent)",
    desc: "The pre-Lenten carnival brings costumed parades, the arrival of the mischievous King Carnestoltes and neighbourhood celebrations across the city, with a bigger, wilder version down the coast in Sitges. It overlaps with Santa Eulàlia (12 February), the city's winter festival for families with parades, castellers and light shows.",
  },
  {
    name: "New Year's Eve (Cap d'Any)",
    when: "31 December",
    desc: "Barcelona sees in the new year with a large free show at the Font Màgica de Montjuïc — music, projections and fireworks over the Palau Nacional — plus lively parties along the beachfront and in every plaça. Locals eat twelve grapes at midnight, one for each chime, for a year of good luck.",
  },
];

type MonthBlock = { month: string; items: { name: string; date: string; note: string }[] };
const CALENDAR: MonthBlock[] = [
  { month: "January", items: [
    { name: "Three Kings' Parade (Cavalcada de Reis)", date: "5 Jan", note: "A magical evening procession as the Magi arrive by sea — the highlight of the Spanish Christmas for families." },
    { name: "Winter sales (rebaixes)", date: "Early Jan", note: "The year's biggest shopping discounts across the city's stores." },
  ]},
  { month: "February", items: [
    { name: "Santa Eulàlia", date: "~12 Feb", note: "Barcelona's winter festival with castellers, gegants, a light show and events aimed at children." },
    { name: "Carnival (Carnestoltes)", date: "Late Feb", note: "Costumed parades in the city and a famously flamboyant celebration in nearby Sitges." },
  ]},
  { month: "March", items: [
    { name: "Barcelona Beer Festival", date: "Mid-Mar", note: "Hundreds of craft beers from Catalan and international brewers." },
  ]},
  { month: "April", items: [
    { name: "Sant Jordi", date: "23 Apr", note: "The city-wide day of books and roses — romantic, literary and completely free." },
    { name: "Feria de Abril de Catalunya", date: "Late Apr", note: "A Catalan take on Seville's April fair, with flamenco, casetas and food by the Fòrum." },
  ]},
  { month: "May", items: [
    { name: "Ciutat Flamenco", date: "May", note: "Intimate flamenco performances in venues around the old city." },
    { name: "Primavera Sound", date: "Late May", note: "Europe's landmark music festival kicks off at the Parc del Fòrum." },
  ]},
  { month: "June", items: [
    { name: "Sónar", date: "Mid-Jun", note: "Global electronic-music and digital-arts festival, day and night editions." },
    { name: "Nit de Sant Joan", date: "23 Jun", note: "The 'night of fire' — bonfires, firecrackers, cava and all-night beach parties for the summer solstice." },
  ]},
  { month: "July", items: [
    { name: "Grec Festival", date: "All month", note: "Barcelona's flagship summer arts festival of theatre, dance and music, including shows in the open-air Greek theatre on Montjuïc." },
    { name: "Cruïlla", date: "Mid-Jul", note: "An eclectic music festival spanning rock, hip-hop, reggae and pop." },
  ]},
  { month: "August", items: [
    { name: "Festa Major de Gràcia", date: "~15–21 Aug", note: "The Gràcia neighbourhood's streets compete to build the most spectacular hand-made decorations, with free concerts nightly." },
    { name: "Festa Major de Sants", date: "Late Aug", note: "A second, equally lively decorated-streets festival in the Sants district." },
  ]},
  { month: "September", items: [
    { name: "La Mercè", date: "~24 Sep", note: "The city's biggest festival — castellers, correfocs, gegants, free concerts and the Piromusical finale." },
    { name: "Barcelona Beach Festival", date: "Sep", note: "A huge open-air electronic-music event on the sand." },
  ]},
  { month: "October", items: [
    { name: "48h Open House Barcelona", date: "Mid-Oct", note: "A free weekend of access to hundreds of the city's finest buildings, normally closed to the public." },
    { name: "Sitges Film Festival", date: "Oct", note: "The world's premier fantasy and horror film festival, a short train ride down the coast." },
  ]},
  { month: "November", items: [
    { name: "Voll-Damm Festival de Jazz", date: "Oct–Dec", note: "Weeks of jazz across the city's theatres and clubs, peaking in November." },
  ]},
  { month: "December", items: [
    { name: "Fira de Santa Llúcia", date: "Dec", note: "The historic Christmas market outside the cathedral, selling nativity figures, greenery and the quirky Catalan caganer." },
    { name: "New Year's Eve (Cap d'Any)", date: "31 Dec", note: "A free light-and-fireworks show at the Magic Fountain, plus parties across the city and beachfront." },
  ]},
];

const FAQ = [
  {
    q: "What is the biggest festival in Barcelona?",
    a: "La Mercè, held around 24 September, is Barcelona's biggest festival. This four-to-five-day celebration for the city's patron saint features human towers, fire-runs, giant figures, dozens of free concerts and a spectacular closing fireworks show on Montjuïc.",
  },
  {
    q: "When is Primavera Sound 2026?",
    a: "Primavera Sound is held in late May at the Parc del Fòrum, with a related run of city club shows. Exact 2026 dates and the line-up are announced by the organisers each year, and tickets typically sell out well before the festival, so book early.",
  },
  {
    q: "What is the best month for events in Barcelona?",
    a: "September is arguably the best month, combining warm weather, thinner summer crowds and La Mercè, the city's flagship festival. May and June are also excellent thanks to Primavera Sound, Sónar and the Sant Joan solstice celebrations.",
  },
  {
    q: "Are Barcelona festivals free?",
    a: "Many of the best are free, including La Mercè, Sant Jordi, the Festa Major de Gràcia, Santa Eulàlia and the New Year's Eve show. Ticketed events are mainly the big commercial music festivals such as Primavera Sound, Sónar and Cruïlla.",
  },
];

function jsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Barcelona", item: `${SITE}/barcelona` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/barcelona/events` },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return [breadcrumb, faq];
}

export default function BarcelonaEvents() {
  return (
    <GuideShell
      active="events"
      crumb="Events"
      h1="Barcelona Events & Festivals 2026"
      heroImage="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=2000&q=80"
      intro="Barcelona throws a party in every season. From the books-and-roses romance of Sant Jordi in spring to the fire, music and human towers of La Mercè in autumn, the city's calendar is packed with world-class festivals and free neighbourhood celebrations. Here's the complete 2026 guide to Barcelona's biggest events — the signature festivals worth planning a trip around, plus a full month-by-month calendar — so you can time your flights to catch the city at its most exciting."
    >
      {jsonLd().map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, "\\u003c") }} />
      ))}

      <GuideSection title="Signature festivals worth flying in for">
        <p>
          A handful of Barcelona's festivals are big enough to build a whole trip around. If you can align your dates with
          any of the six below, you'll see the city at its most alive — and should book flights and accommodation early,
          because these are the weeks when Barcelona fills up.
        </p>
      </GuideSection>

      <div className="mt-8 space-y-4">
        {SIGNATURE.map((e) => (
          <div key={e.name} className="rounded-3xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-serif text-xl font-semibold text-foreground">{e.name}</h3>
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{e.when}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
          </div>
        ))}
      </div>

      <GuideSection title="Barcelona events calendar, month by month">
        <p>
          Whenever you visit, something is happening. Use this month-by-month calendar to see what's on — the exact dates
          of the big music festivals shift a little each year, so confirm with the organisers before booking non-refundable
          flights.
        </p>
      </GuideSection>

      <div className="mt-8 space-y-4">
        {CALENDAR.map((m) => (
          <div key={m.month} className="rounded-3xl border border-border bg-card p-6">
            <h3 className="font-serif text-lg font-semibold text-accent">{m.month}</h3>
            <ul className="mt-3 space-y-3">
              {m.items.map((it) => (
                <li key={it.name} className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">{it.name}</span>
                  <span className="text-muted-foreground/70"> · {it.date}</span>
                  <br />
                  {it.note}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <GuideSection title="Frequently asked questions">
        <div className="space-y-5">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-serif text-lg font-semibold text-foreground">{f.q}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </GuideSection>
    </GuideShell>
  );
}
