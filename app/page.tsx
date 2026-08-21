import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { HomeHero } from "@/app/components/HomeHero";
import { HowItWorks } from "@/app/components/HowItWorks";
import { HomeCard } from "@/app/components/HomeCard";
import { HomeSeoSection, HOME_FAQ } from "@/app/components/HomeSeoSection";
import { GuidesCarousel } from "@/app/components/GuidesCarousel";
import { latestGuides } from "@/app/data/guides";
import { Footer } from "@/app/components/Footer";
import { destinations } from "@/app/data/destinations";
import { BARCELONA_SUBPAGES, barcelonaHref } from "@/app/lib/barcelona";
import { faresFor, sortPrices } from "@/app/lib/fare-display";
import { ArrowRight, Scale, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Cheap Flights with AI — Flyamba",
  description:
    "AI-powered flight search. Describe your dream trip and Flyamba finds the cheapest flights. Compare prices, airlines and book direct.",
  alternates: { canonical: "https://flyamba.com/" },
  openGraph: {
    title: "Find Cheap Flights with AI — Flyamba",
    description: "Describe your dream trip and Flyamba's AI finds the cheapest flights across hundreds of airlines.",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Flyamba",
  url: "https://flyamba.com",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: "https://flyamba.com/?q={search_term_string}" },
    "query-input": "required name=search_term_string",
  },
};

// Mirrors the FAQ rendered by <HomeSeoSection /> below — the schema is only
// valid while those answers are visible on the page.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const TRIP_TYPES = [
  { label: "Beach & Sun", emoji: "🏖️" },
  { label: "City Break", emoji: "🏙️" },
  { label: "Romantic", emoji: "💕" },
  { label: "Family", emoji: "👨‍👩‍👧" },
  { label: "Adventure", emoji: "🏔️" },
  { label: "Culture", emoji: "🎨" },
  { label: "Long Haul", emoji: "✈️" },
];


// 15 "Flights to X" links — the 8 catalog cities (real pages) plus popular
// cities that route to the AI home search until they have their own pages.
const FLIGHT_LINKS = [
  ...destinations.map((d) => ({ city: d.city, href: `/${d.slug}` })),
  { city: "Madrid", href: "/" },
  { city: "Rome", href: "/" },
  { city: "Paris", href: "/" },
  { city: "London", href: "/" },
  { city: "Amsterdam", href: "/" },
  { city: "Dubai", href: "/" },
  { city: "Bangkok", href: "/" },
];

const GUIDE_CARDS = BARCELONA_SUBPAGES.filter((p) => ["attractions", "restaurants", "hotels", "beaches"].includes(p.slug));

// fare-display reads Supabase with cache: "no-store", which would otherwise mark
// the homepage dynamic. force-static keeps it prerendered; revalidate keeps the
// "seen Aug 19" stamps from freezing at build time.
export const dynamic = "force-static";
export const revalidate = 86400;

export default async function Home() {
  const featured = destinations.slice(0, 6);
  const [lead, ...rest] = featured;
  const [smallA, smallB, ...more] = rest;
  // RANKED ON THE NEW YORK PRICE FROM origin_fares, not on `destinations.price`.
  //
  // That field is a hand-authored Stockholm "from" figure in SEK. Sorting on it
  // made a row that claims to show the cheapest fares rank them on a scale that
  // inverts against real US prices — a false statement to the reader, not a
  // cosmetic issue. Only destinations WITH a New York price take part: without a
  // sort key there is no ranking to be in.
  //
  // Display still falls through NYC → MIA → CHI → LAX, so a card can show a Miami
  // price while its position was decided by New York. That is deliberate and the
  // label says which city the ranking is from.
  const nycPrices = await sortPrices();
  const fares = await faresFor(destinations.map((d) => d.slug));
  const cheapest = destinations
    .filter((d) => nycPrices[d.slug] != null)
    .sort((a, b) => nycPrices[a.slug] - nycPrices[b.slug])
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {[websiteJsonLd, faqJsonLd].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar transparent />

      <HomeHero />

      <HowItWorks />

      <GuidesCarousel guides={latestGuides(3)} title="Latest Travel Guides" />

      {/* Featured destinations — 1 large + 2 smaller */}
      <section id="explore" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Editor&apos;s picks</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-5xl">Featured destinations</h2>
          </div>
          <Link href="/explore" className="hidden items-center gap-2 text-sm font-medium text-accent hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 space-y-6">
          <HomeCard d={lead} fareLabel={fares.get(lead.slug)?.short} featured />
          <div className="grid gap-6 sm:grid-cols-2">
            {smallA && <HomeCard d={smallA} fareLabel={fares.get(smallA.slug)?.short} />}
            {smallB && <HomeCard d={smallB} fareLabel={fares.get(smallB.slug)?.short} />}
          </div>
          {more.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((d) => (
                <HomeCard key={d.slug} d={d} fareLabel={fares.get(d.slug)?.short} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* A) Popular right now — horizontal scroll */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Trending</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Popular right now</h2>
        <div className="-mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
          {destinations.map((d) => (
            <div key={d.slug} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
              <HomeCard d={d} fareLabel={fares.get(d.slug)?.short} />
            </div>
          ))}
        </div>
      </section>

      {/* B) Explore by type */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Get inspired</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore by type</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {TRIP_TYPES.map((t) => (
            <Link
              key={t.label}
              href={`/explore?type=${encodeURIComponent(t.label)}`}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card px-4 py-6 text-center transition hover:-translate-y-0.5 hover:border-accent"
            >
              <span className="text-3xl">{t.emoji}</span>
              <span className="text-sm font-semibold text-foreground">{t.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* C) Cheapest flights right now */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Deals</p>
        {/* The heading names the departure city because the ranking is New
            York only. "Cheapest flights right now" over a NYC-ranked list is a
            claim about every reader's airport that we cannot make. */}
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          Cheapest round trip from New York
        </h2>
        <p className="mt-2 text-muted-foreground">
          Ranked on the New York fare we found. Prices move daily and are not an offer.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cheapest.map((d) => (
            <div key={d.slug} className="space-y-2">
              <HomeCard d={d} fareLabel={fares.get(d.slug)?.short} />
              <p className="px-1 text-sm font-semibold text-foreground">
                {fares.get(d.slug)?.long.headline}{" "}
                <span className="font-normal text-muted-foreground">· {d.city}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* D) Complete travel guides */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Plan your trip</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Complete travel guides</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDE_CARDS.map((p) => (
            <Link key={p.slug} href={barcelonaHref(p.slug)} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-40 overflow-hidden">
                <Image src={p.image} alt={`Barcelona ${p.label}`} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-sm">{p.emoji}</span>
              </div>
              <div className="p-5">
                <p className="text-[11px] uppercase tracking-widest text-accent">Barcelona</p>
                <h3 className="mt-1 flex items-center justify-between font-serif text-lg font-semibold text-foreground">
                  {p.label}
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Compare promo */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-border">
          <Image src="/images/content/photo-1488646953014-85cb44e25828.avif" alt="Two travelers comparing maps" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          <div className="relative max-w-xl p-10 sm:p-16">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              <Scale className="h-3.5 w-3.5" /> Compare
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">Not sure where to go?</h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Barcelona or Tokyo? Lisbon or Reykjavík? Compare prices, weather, flight time and airlines side by side.
            </p>
            <Link href="/compare" className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105">
              Compare up to 4 destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* F) Flights by destination */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Destinations</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Flights by destination</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
          {FLIGHT_LINKS.map((l) => (
            <Link key={l.city} href={l.href} className="text-sm text-muted-foreground transition hover:text-accent">
              Flights to {l.city} →
            </Link>
          ))}
        </div>
      </section>

      <HomeSeoSection />

      <Footer />
    </div>
  );
}
