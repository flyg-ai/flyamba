"use client";

import { useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";

/**
 * "Ask AI about {destination}" widget. Calls /api/destination-chat and shows a
 * concise prose answer. Suggested-question chips populate the input and ask.
 */
export function AskAiWidget({
  destination,
  heading = `Ask AI about ${destination}`,
  subtext = "Get personalized advice about flights, weather, attractions and more.",
}: {
  destination: string;
  heading?: string;
  subtext?: string;
}) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [asked, setAsked] = useState<string | null>(null);

  async function ask(q: string) {
    const question = q.trim();
    if (!question || loading) return;
    setValue(question);
    setLoading(true);
    setError(null);
    setAsked(question);
    try {
      const res = await fetch("/api/destination-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, destination }),
      });
      if (!res.ok) {
        const b = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(b?.error ?? "Something went wrong. Please try again.");
      }
      const data = (await res.json()) as { answer?: string };
      setAnswer(data.answer ?? "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setAnswer(null);
    } finally {
      setLoading(false);
    }
  }

  const suggestions = [
    `Best time to visit ${destination}?`,
    "What should I not miss?",
    `Is ${destination} good for families?`,
    `How much does ${destination} cost per day?`,
    `Which airlines fly to ${destination} from the US?`,
  ];

  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-accent/10 via-card to-card p-6 sm:p-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
        <Sparkles className="h-3.5 w-3.5" /> {heading}
      </div>
      <p className="mt-3 text-muted-foreground">{subtext}</p>

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
            type="button"
            onClick={() => void ask(s)}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent hover:text-accent"
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {(loading || answer) && !error && (
        <div className="mt-5 rounded-2xl border border-border bg-card p-5">
          {asked && <p className="mb-3 text-sm font-semibold text-foreground">{asked}</p>}
          {loading ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </p>
          ) : (
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {(answer ?? "").split(/\n\n+/).filter(Boolean).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
