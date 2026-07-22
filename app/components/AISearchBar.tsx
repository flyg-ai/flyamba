"use client";

import { Loader2, Mic, Send, Sparkles, Plane, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { AiSearchResult, AiSearchMatch } from "@/app/lib/ai-search-types";
import { destinations } from "@/app/data/destinations";
import { DestinationCard } from "@/app/components/DestinationCard";
import { AviasalesResultsWidget } from "@/app/components/AviasalesResultsWidget";

// "See all flights" CTA target — deep-link by destination IATA; Kiwi resolves
// the origin.
const kiwiDeepLink = (iata: string) => `https://www.kiwi.com/deep?to=${iata}`;

const suggestions = [
  "A sunny beach in April under 3000 kr",
  "Romantic weekend in Europe",
  "Book flights to Barcelona from Oslo",
  "10 days somewhere warm in November",
];

const bySlug = new Map(destinations.map((d) => [d.slug, d]));

export function AISearchBar() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiSearchResult | null>(null);

  async function runSearch(query: string) {
    const trimmed = query.trim();
    if (!trimmed || loading) return;
    setLoading(true);
    setError(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const intent = result?.bookingIntent ?? null;

  const renderMatch = (m: AiSearchMatch, featured = false) => {
    const d = bySlug.get(m.slug);
    if (!d) return null;
    return (
      <div key={m.slug} className="space-y-2">
        <DestinationCard d={d} featured={featured} />
        <p className="px-1 text-sm text-white/70">{m.reason}</p>
      </div>
    );
  };

  return (
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
            <span className="ml-2 hidden text-sm font-medium sm:inline">
              {loading ? "Searching" : "Search"}
            </span>
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

      {error && (
        <p className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
          {error}
        </p>
      )}

      {result && !error && (
        <div className="mt-8 text-left">
          {/* Booking intent → prefilled flight-results widget */}
          {intent && (
            <div className="mb-8 rounded-3xl border border-border bg-card/95 p-4 shadow-elegant backdrop-blur-xl sm:p-6">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Plane className="h-4 w-4 text-accent" />
                Live fares to {intent.city}
                {intent.fromName && (
                  <span className="text-muted-foreground">
                    {" "}
                    from {intent.fromName.split("_")[0].replace(/-/g, " ")}
                  </span>
                )}
              </div>
              {/* Fixed-height, clipped container so the injected widget iframe
                  can't grow and push the rest of the page off screen. */}
              <div style={{ maxHeight: 500, overflow: "hidden", borderRadius: 12 }}>
                <AviasalesResultsWidget
                  key={`${intent.toName}|${intent.fromName ?? ""}`}
                  toName={intent.toName}
                  fromName={intent.fromName}
                />
              </div>
              <a
                href={kiwiDeepLink(intent.iata)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-2.5"
              >
                See all flights <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {result.matches.length > 0 ? (
            intent ? (
              // Secondary "you might also like" — uniform grid below the widget.
              <>
                <p className="mb-4 text-center text-sm text-white/70">You might also like</p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {result.matches.map((m) => renderMatch(m))}
                </div>
              </>
            ) : (
              // Inspiration results — 1 large lead + smaller cards below.
              <div className="space-y-6">
                {renderMatch(result.matches[0], true)}
                {result.matches.length > 1 && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {result.matches.slice(1).map((m) => renderMatch(m))}
                  </div>
                )}
              </div>
            )
          ) : (
            !intent && (
              <p className="text-center text-sm text-white/70">
                No matches yet — try describing your trip a little differently.
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
