import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { FlightCTA } from "@/app/components/FlightCTA";
import { GuidesBrowser, type GuideCard } from "@/app/components/GuidesBrowser";
import { latestGuides, guideHref } from "@/app/data/guides";
import { CALENDAR_DESTINATIONS } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Travel Guides & Inspiration | Flyamba",
  description:
    "Practical guides, destination tips and travel inspiration for smarter trips — from finding cheap flights to the best beaches in Europe.",
  alternates: { canonical: `${SITE}/guides` },
  openGraph: {
    title: "Travel Guides & Inspiration | Flyamba",
    description: "Practical guides, destination tips and travel inspiration for smarter trips.",
    url: `${SITE}/guides`,
    type: "website",
  },
};

const CITY_LABEL = new Map(CALENDAR_DESTINATIONS.map((d) => [d.slug, d.city]));

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flyamba",
    url: SITE,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE}/?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
];

export default function GuidesHub() {
  const cards: GuideCard[] = latestGuides().map((g) => ({
    slug: g.slug,
    title: g.title,
    excerpt: g.excerpt,
    category: g.category,
    readTime: g.readTime,
    image: g.image,
    destination: g.destination,
    destinationLabel: g.destination ? (CITY_LABEL.get(g.destination) ?? g.destination) : null,
    href: guideHref(g),
  }));

  return (
    <div className="min-h-screen bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          <BookOpen className="h-3.5 w-3.5" /> Guides
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
          Travel Guides &amp; Inspiration
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Practical guides, destination tips and travel inspiration for smarter trips
        </p>

        <div className="mt-12">
          <GuidesBrowser guides={cards} />
        </div>

        {/* Destination hubs */}
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Complete destination guides
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Full city guides with attractions, restaurants, hotels, transport, weather and what a trip really costs.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
            {CALENDAR_DESTINATIONS.map((d) => (
              <Link key={d.slug} href={`/${d.slug}`} className="text-muted-foreground transition hover:text-accent">
                {d.city} guide →
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <FlightCTA />
        </section>

        <section className="mt-10 text-center">
          <Link
            href="/low-fare-calendar"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            Find the cheapest days to fly <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
