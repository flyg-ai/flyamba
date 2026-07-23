"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Loader2, Mic, Send, Sparkles, Plane, ArrowRight, MessageCircle } from "lucide-react";
import type { AiSearchResult } from "@/app/lib/ai-search-types";
import { destinations, type Destination } from "@/app/data/destinations";
import { AiResultCard } from "@/app/components/AiResultCard";
import { AviasalesResultsWidget } from "@/app/components/AviasalesResultsWidget";

// "See all flights" CTA — Kiwi deep-link by destination IATA (origin auto).
const kiwiDeepLink = (iata: string) => `https://www.kiwi.com/deep?to=${iata}`;

const suggestions = [
  "A sunny beach in April under $300",
  "Romantic weekend in Europe",
  "Book flights to Barcelona from Oslo",
  "10 days somewhere warm in November",
];

const bySlug = new Map(destinations.map((d) => [d.slug, d]));

// Words highlighted in the AI headline (mirrors flyg.ai's cyan-word treatment).
const HEADLINE_ACCENT = new Set([
  "romantic", "cheap", "cheapest", "budget", "luxury", "luxurious", "exotic", "popular",
  "warm", "sunny", "sun", "beach", "beaches", "adventure", "cultural", "culture", "family",
  "calm", "party", "festival", "shopping", "food", "gastronomy", "weekend", "city", "cities",
  "long-haul", "european", "asian", "tropical", "nordic", "magical", "wonderful", "amazing",
  "stunning", "island", "islands", "wine", "nightlife",
]);

function Headline({ text }: { text: string }) {
  return (
    <h2 className="mb-6 text-center font-serif text-3xl font-bold text-foreground sm:text-4xl">
      {text.split(/(\s+)/).map((tok, i) => {
        const bare = tok.toLowerCase().replace(/[^a-z-]/g, "");
        return HEADLINE_ACCENT.has(bare) ? (
          <span key={i} className="text-accent">{tok}</span>
        ) : (
          <span key={i}>{tok}</span>
        );
      })}
    </h2>
  );
}

type WidgetDest = { toName: string; iata: string; city: string; fromName?: string };

export function HomeHero() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiSearchResult | null>(null);
  const [widgetDest, setWidgetDest] = useState<WidgetDest | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  async function runSearch(query: string) {
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    setError(null);
    setWidgetDest(null);
    scrollTo(resultsRef);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      const data = (await res.json()) as AiSearchResult;
      setResult(data);
      // A booking intent immediately targets the embedded flight widget.
      if (data.bookingIntent) {
        setWidgetDest({
          toName: data.bookingIntent.toName,
          iata: data.bookingIntent.iata,
          city: data.bookingIntent.city,
          fromName: data.bookingIntent.fromName,
        });
      }
      scrollTo(resultsRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  // A card's "Search flights" button targets the embedded widget for that city.
  function handleSearchFlights(d: Destination) {
    setWidgetDest({ toName: d.tpName ?? (d.iata ?? "").toUpperCase(), iata: (d.iata ?? "").toUpperCase(), city: d.city });
    scrollTo(widgetRef);
  }

  const matches = result?.matches ?? [];
  const hasOutput = loading || error || result;

  return (
    <>
      {/* Hero */}
      <section className="relative isolate h-[92vh] min-h-[640px] w-full overflow-hidden">
        <Image
          src="/images/content/photo-1507525428034-b723cf961d3e.avif"
          alt="Aerial view of a tropical coastline"
          fill
          priority
          sizes="100vw"
          className="object-cover"
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
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Find Cheap Flights
            <br />
            <span className="italic text-gradient-accent">with AI</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Describe your dream trip in plain words — Flyamba finds the cheapest flights across hundreds of airlines.
          </p>

          {/* Search bar */}
          <div className="mt-10 w-full animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative">
                <div className="absolute -inset-2 rounded-[2rem] bg-accent/25 blur-2xl animate-pulse-glow" aria-hidden />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    void runSearch(value);
                  }}
                  className="relative flex items-center gap-2 rounded-full border border-border bg-card/95 p-2 pl-5 shadow-elegant backdrop-blur-xl"
                >
                  <Sparkles className="h-5 w-5 shrink-0 text-accent" />
                  <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Where do you want to go? Describe your dream trip..."
                    className="min-w-0 flex-1 bg-transparent py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-lg"
                  />
                  <button
                    type="button"
                    aria-label="Voice search"
                    className="hidden h-11 w-11 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground sm:grid"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    aria-label="Search"
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-glow transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 sm:h-12 sm:w-auto sm:px-5"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    <span className="ml-2 hidden text-sm font-medium sm:inline">{loading ? "Searching" : "Search"}</span>
                  </button>
                </form>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setValue(s);
                      void runSearch(s);
                    }}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur transition hover:bg-white/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Results — rendered BELOW the hero in normal flow so nothing is clipped */}
      <div ref={resultsRef} className="scroll-mt-20">
        {hasOutput && (
          <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            {loading && (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
                <p className="text-sm text-muted-foreground">Searching hundreds of airlines for your trip…</p>
              </div>
            )}

            {error && !loading && (
              <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                {error}
              </p>
            )}

            {result && !loading && !error && (
              <div>
                {/* Embedded flight widget — booking intent or a card's "Search flights" */}
                {widgetDest && (
                  <div ref={widgetRef} className="mb-10 scroll-mt-24 rounded-3xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur-xl sm:p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <Plane className="h-4 w-4 text-accent" />
                      Live fares to {widgetDest.city}
                      {widgetDest.fromName && (
                        <span className="text-muted-foreground"> from {widgetDest.fromName.split("_")[0].replace(/-/g, " ")}</span>
                      )}
                    </div>
                    {/* Clipped container so the injected iframe can't grow and push the page. */}
                    <div style={{ maxHeight: 500, overflow: "hidden", borderRadius: 12 }}>
                      <AviasalesResultsWidget
                        key={`${widgetDest.toName}|${widgetDest.fromName ?? ""}`}
                        toName={widgetDest.toName}
                        fromName={widgetDest.fromName}
                      />
                    </div>
                    <a
                      href={kiwiDeepLink(widgetDest.iata)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5"
                    >
                      See all flights <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                )}

                {/* Conversational reply (very vague / off-topic) */}
                {result.conversational && result.followUp && (
                  <div className="mx-auto flex max-w-xl items-start gap-3 rounded-3xl border border-border bg-card px-5 py-4 text-left shadow-elegant">
                    <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-foreground">{result.followUp}</p>
                  </div>
                )}

                {/* Headline + follow-up + cards */}
                {matches.length > 0 && (
                  <>
                    {result.headline && <Headline text={result.headline} />}
                    {result.followUp && !result.conversational && (
                      <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">{result.followUp}</p>
                    )}
                    <div className="space-y-6">
                      {(() => {
                        const lead = bySlug.get(matches[0].slug);
                        return lead ? (
                          <AiResultCard d={lead} reason={matches[0].reason} month={result.month} onSearchFlights={handleSearchFlights} featured />
                        ) : null;
                      })()}
                      {matches.length > 1 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                          {matches.slice(1).map((m) => {
                            const d = bySlug.get(m.slug);
                            return d ? (
                              <AiResultCard key={m.slug} d={d} reason={m.reason} month={result.month} onSearchFlights={handleSearchFlights} />
                            ) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {matches.length === 0 && !result.conversational && !widgetDest && (
                  <p className="text-center text-sm text-muted-foreground">
                    No matches yet — try describing your trip a little differently.
                  </p>
                )}
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
