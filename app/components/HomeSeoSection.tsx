import { ArrowRight, ChevronDown } from "lucide-react";

/**
 * Long-form intro + FAQ that closes the homepage.
 *
 * The FAQ uses native <details>, so the answers are in the DOM for crawlers and
 * the whole block stays a server component — no client JS for the accordion.
 * HOME_FAQ is exported because app/page.tsx emits it as FAQPage JSON-LD, and
 * that schema is only legitimate while these answers are visible on the page.
 */
export const HOME_FAQ = [
  {
    q: "What is Flyamba?",
    a: "Flyamba is a free AI-powered flight search engine. Describe your dream trip in plain words and our AI finds the cheapest flights and best destinations for you — no forms, no filters.",
  },
  {
    q: "How does AI flight search work?",
    a: "Instead of searching by dates and airports, you tell Flyamba what you want: “warm beach holiday in October under $400” or “city break in Europe this weekend”. Our AI understands your intent and instantly shows matching destinations with flight prices.",
  },
  {
    q: "Is Flyamba free to use?",
    a: "Yes, completely free. We earn a small commission when you book through our links — at no extra cost to you.",
  },
  {
    q: "Which airlines does Flyamba compare?",
    a: "We compare prices from hundreds of airlines including Ryanair, British Airways, Lufthansa, KLM, Emirates, Turkish Airlines, Norwegian, easyJet and many more.",
  },
  {
    q: "Can I search for specific dates?",
    a: "Yes — just mention your dates in your search. “Flights to Barcelona in September” or “weekend trip 15-17 August” both work perfectly.",
  },
];

export function HomeSeoSection() {
  return (
    <>
      {/* Long-form intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">How it works</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Find Cheap Flights with AI — How Flyamba Works
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Flyamba is an AI-powered flight search built for travelers who want smarter, faster results. Instead of
          filling out forms and comparing prices manually, you describe your trip in plain words — and our AI finds the
          right destination and cheapest flights for you.
        </p>

        <h3 className="mt-10 font-serif text-xl font-semibold text-foreground sm:text-2xl">
          Find Cheap Flights to Anywhere in the World
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Flyamba searches for cheap flights from major airports worldwide to 500+ destinations across Europe, Asia,
          the Americas and Africa. Whether you&apos;re looking for a budget weekend in Europe, a long-haul adventure to
          Asia, or sun and sand in the Mediterranean — Flyamba finds options that fit your budget and travel style.
          Tell us your budget, travel dates, preferred weather or activities, and our AI does the rest.
        </p>

        <h3 className="mt-8 font-serif text-xl font-semibold text-foreground sm:text-2xl">
          The Future of Flight Search
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          AI is transforming how we search for travel. Flyamba is built from the ground up to meet that shift — with
          natural conversation, smart recommendations and travel guides for every destination. Describe what
          you&apos;re looking for: &quot;beach holiday in September under $500&quot; or &quot;romantic city break in
          Europe&quot; — and our AI instantly finds the best flights and destinations.
        </p>

        <h3 className="mt-8 font-serif text-xl font-semibold text-foreground sm:text-2xl">
          AI Flight Search for Global Travelers
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Flyamba compares prices from all major airlines including Ryanair, British Airways, Lufthansa, KLM, Emirates,
          Norwegian and more. Whether you&apos;re searching for cheap flights to the Mediterranean, a long-haul trip to
          Asia, or a quick weekend getaway — you&apos;ll find the best price here. Our AI understands travel intent,
          seasonal patterns and what travelers actually want — without a single filter to fill in.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 pb-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Good to know</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-3">
          {HOME_FAQ.map((f) => (
            <details key={f.q} className="group rounded-3xl border border-border bg-card px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-accent/25 bg-gradient-to-br from-accent/12 to-accent/[0.04] p-10 text-center sm:p-14">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Ready to Find Your Next Flight?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Describe your dream trip and our AI finds the best options — in seconds.
          </p>
          {/* Anchors back to the hero search bar; native hash link, no client JS. */}
          <a
            href="#search"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
          >
            Search flights <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}
