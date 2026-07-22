import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { AISearchBar } from "@/app/components/AISearchBar";
import { HowItWorks } from "@/app/components/HowItWorks";
import { DestinationCard } from "@/app/components/DestinationCard";
import { CategoryPills } from "@/app/components/CategoryPills";
import { TrendingCarousel } from "@/app/components/TrendingCarousel";
import { Footer } from "@/app/components/Footer";
import { destinations } from "@/app/data/destinations";
import { ArrowRight, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Flyamba — AI flight search for curious travelers",
  description:
    "Describe your dream trip. Flyamba's AI scans hundreds of airlines to find your perfect flight in seconds.",
  openGraph: {
    title: "Flyamba — Smarter flight search, powered by AI",
    description: "Warm, curious travel search. Tell Flyamba the vibe — we find the flights.",
  },
};

export default function Home() {
  const featured = destinations.slice(0, 6);
  const [lead, ...rest] = featured;
  const [smallA, smallB, ...more] = rest;

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[92vh] min-h-[640px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80"
          alt="Aerial view of a tropical coastline"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-4 pt-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            AI-powered flight search
          </span>

          <h1
            className="mt-6 font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Find your perfect flight
            <br />
            <span className="italic text-gradient-accent">with AI</span>
          </h1>
          <p
            className="mt-6 max-w-xl text-lg text-white/80 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Smarter than searching yourself. Describe your dream trip in plain words — Flyamba finds the flights.
          </p>

          <div className="mt-10 w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <AISearchBar />
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </section>

      <HowItWorks />

      {/* Featured destinations */}
      <section id="explore" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Editor&apos;s picks</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-5xl">
              Featured destinations
            </h2>
          </div>
          <a href="#" className="hidden items-center gap-2 text-sm font-medium text-accent hover:underline sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Magazine layout: 1 large lead + 2 smaller, then the rest */}
        <div className="mt-10 space-y-6">
          <DestinationCard d={lead} featured />
          <div className="grid gap-6 sm:grid-cols-2">
            {smallA && <DestinationCard d={smallA} />}
            {smallB && <DestinationCard d={smallB} />}
          </div>
          {more.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((d) => (
                <DestinationCard key={d.slug} d={d} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Compare promo */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2.5rem] border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=2000&q=80"
            alt="Two travelers comparing maps"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          <div className="relative max-w-xl p-10 sm:p-16">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
              <Scale className="h-3.5 w-3.5" /> Compare
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
              Not sure where to go?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/85">
              Barcelona or Tokyo? Lisbon or Reykjavík? Compare prices, weather, flight time and
              airlines side by side — so you can make the right call.
            </p>
            <Link
              href="/compare"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
            >
              Compare up to 4 destinations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Inspiration categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Get inspired</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            What kind of trip are you in the mood for?
          </h2>
        </div>
        <div className="mt-8">
          <CategoryPills />
        </div>
      </section>

      <TrendingCarousel />

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface p-10 sm:p-16">
          <div
            className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-2xl">
            <h2 className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
              Describe your dream trip. We handle the rest.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Flyamba is smarter flight search for curious travelers — no filter juggling, no endless tabs.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
            >
              Start searching <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
