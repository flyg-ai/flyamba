"use client";

import { useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";
import type { AiSearchResult } from "@/app/lib/ai-search-types";

/**
 * "Ask AI about {destination}" widget. Calls /api/ai-search with a
 * destinationContext so answers focus on the current city, and shows the
 * response inline (matches + reasons).
 */
export function AskAiWidget({
  destination,
  heading = `Ask AI about ${destination}`,
  subtext = "Get personalized advice about flights, weather, attractions and more.",
  compact = false,
}: {
  destination: string;
  heading?: string;
  subtext?: string;
  compact?: boolean;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AiSearchResult | null>(null);

  async function ask(q: string) {
    const query = q.trim();
    if (!query || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, destinationContext: destination }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(b?.error ?? "Something went wrong. Please try again.");
      }
      setResult((await res.json()) as AiSearchResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = compact
    ? [`Best time to visit ${destination}?`, `Is ${destination} expensive?`]
    : [`Best time to visit ${destination}?`, `What should I not miss?`, `Is ${destination} good for families?`];

  return (
    <div className={`rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-6 sm:p-8`}>
      <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
        <Sparkles className="h-3.5 w-3.5" /> {heading}
      </div>
      {!compact && <p className="mt-3 text-muted-foreground">{subtext}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void ask(value);
        }}
        className="mt-4 flex items-center gap-2 rounded-full border border-border bg-card p-2 pl-5"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Ask anything about ${destination}...`}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Ask"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground shadow-glow transition hover:scale-105 disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => {
              setValue(s);
              void ask(s);
            }}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent hover:text-accent"
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {result && !error && (
        <div className="mt-5 space-y-3">
          {result.matches.length > 0 ? (
            result.matches.map((m) => (
              <div key={m.slug} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground">{m.city}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.reason}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Try describing what you want to know about {destination} a little differently.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
