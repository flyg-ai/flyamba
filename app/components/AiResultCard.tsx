"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, Plane, Utensils, Hotel, Waves, Moon, MapPin, Users, PiggyBank } from "lucide-react";
import type { AiSearchMatch, MatchFare, MatchScores } from "@/app/lib/ai-search-types";

// Renders one AI search result.
//
// Takes the AiSearchMatch payload straight from /api/ai-search rather than a
// rich `Destination`. It used to require the latter, so HomeHero had to resolve
// each slug against the 8 hand-authored destinations — and once the search
// catalog grew to all 550, every result outside those 8 rendered as nothing.
// Optional fields are simply hidden, so a slim catalog destination shows a
// smaller card instead of no card.

// ── Tag pills ────────────────────────────────────────────────────────────
// Keys are the controlled vocabulary from app/data/destination-facts.ts.
// A tag with no entry here still renders, just without emoji or colour.
const TAG_STYLE: Record<string, { label: string; emoji: string; cls: string }> = {
  beach: { label: "Beach", emoji: "🏖️", cls: "bg-sky-500/15 text-sky-700 border-sky-400/30 dark:text-sky-200" },
  coast: { label: "Coast", emoji: "🌊", cls: "bg-sky-500/15 text-sky-700 border-sky-400/30 dark:text-sky-200" },
  island: { label: "Island", emoji: "🏝️", cls: "bg-teal-500/15 text-teal-700 border-teal-400/30 dark:text-teal-200" },
  "city-break": { label: "City", emoji: "🏙️", cls: "bg-blue-500/15 text-blue-700 border-blue-400/30 dark:text-blue-100" },
  culture: { label: "Culture", emoji: "🎨", cls: "bg-amber-500/15 text-amber-700 border-amber-400/30 dark:text-amber-100" },
  history: { label: "History", emoji: "🏛️", cls: "bg-amber-500/15 text-amber-700 border-amber-400/30 dark:text-amber-100" },
  unesco: { label: "UNESCO", emoji: "🏆", cls: "bg-amber-500/15 text-amber-700 border-amber-400/30 dark:text-amber-100" },
  architecture: { label: "Architecture", emoji: "🏗️", cls: "bg-amber-500/15 text-amber-700 border-amber-400/30 dark:text-amber-100" },
  food: { label: "Food", emoji: "🍽️", cls: "bg-rose-500/15 text-rose-700 border-rose-400/30 dark:text-rose-100" },
  wine: { label: "Wine", emoji: "🍷", cls: "bg-rose-500/15 text-rose-700 border-rose-400/30 dark:text-rose-100" },
  nightlife: { label: "Nightlife", emoji: "🌙", cls: "bg-purple-500/15 text-purple-700 border-purple-400/30 dark:text-purple-200" },
  romantic: { label: "Romantic", emoji: "💕", cls: "bg-pink-500/15 text-pink-700 border-pink-400/30 dark:text-pink-100" },
  family: { label: "Family", emoji: "👨‍👩‍👧", cls: "bg-orange-500/15 text-orange-700 border-orange-400/30 dark:text-orange-100" },
  nature: { label: "Nature", emoji: "🌿", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  mountains: { label: "Mountains", emoji: "🏔️", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  hiking: { label: "Hiking", emoji: "🥾", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  adventure: { label: "Adventure", emoji: "🧗", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  safari: { label: "Safari", emoji: "🦁", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  wildlife: { label: "Wildlife", emoji: "🐘", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  diving: { label: "Diving", emoji: "🤿", cls: "bg-cyan-500/15 text-cyan-700 border-cyan-400/30 dark:text-cyan-100" },
  surf: { label: "Surf", emoji: "🏄", cls: "bg-cyan-500/15 text-cyan-700 border-cyan-400/30 dark:text-cyan-100" },
  sailing: { label: "Sailing", emoji: "⛵", cls: "bg-cyan-500/15 text-cyan-700 border-cyan-400/30 dark:text-cyan-100" },
  skiing: { label: "Skiing", emoji: "⛷️", cls: "bg-indigo-500/15 text-indigo-700 border-indigo-400/30 dark:text-indigo-100" },
  "northern-lights": { label: "Northern lights", emoji: "🌌", cls: "bg-indigo-500/15 text-indigo-700 border-indigo-400/30 dark:text-indigo-100" },
  "winter-sun": { label: "Winter sun", emoji: "☀️", cls: "bg-yellow-500/15 text-yellow-700 border-yellow-400/30 dark:text-yellow-100" },
  tropical: { label: "Tropical", emoji: "🌴", cls: "bg-teal-500/15 text-teal-700 border-teal-400/30 dark:text-teal-200" },
  desert: { label: "Desert", emoji: "🏜️", cls: "bg-yellow-500/15 text-yellow-700 border-yellow-400/30 dark:text-yellow-100" },
  budget: { label: "Budget", emoji: "💰", cls: "bg-lime-500/15 text-lime-700 border-lime-400/30 dark:text-lime-100" },
  luxury: { label: "Luxury", emoji: "💎", cls: "bg-violet-500/15 text-violet-700 border-violet-400/30 dark:text-violet-100" },
  "long-haul": { label: "Long haul", emoji: "🌍", cls: "bg-indigo-500/15 text-indigo-700 border-indigo-400/30 dark:text-indigo-100" },
  "all-inclusive": { label: "All-inclusive", emoji: "🍹", cls: "bg-orange-500/15 text-orange-700 border-orange-400/30 dark:text-orange-100" },
  quiet: { label: "Quiet", emoji: "🍃", cls: "bg-neutral-500/15 text-neutral-700 border-neutral-400/30 dark:text-neutral-100" },
  "off-the-beaten-path": { label: "Off the beaten path", emoji: "🧭", cls: "bg-neutral-500/15 text-neutral-700 border-neutral-400/30 dark:text-neutral-100" },
  wellness: { label: "Wellness", emoji: "🧘", cls: "bg-green-500/15 text-green-700 border-green-400/30 dark:text-green-100" },
  spiritual: { label: "Spiritual", emoji: "🛕", cls: "bg-green-500/15 text-green-700 border-green-400/30 dark:text-green-100" },
  shopping: { label: "Shopping", emoji: "🛍️", cls: "bg-fuchsia-500/15 text-fuchsia-700 border-fuchsia-400/30 dark:text-fuchsia-100" },
  sport: { label: "Sport", emoji: "🏟️", cls: "bg-blue-500/15 text-blue-700 border-blue-400/30 dark:text-blue-100" },
  golf: { label: "Golf", emoji: "⛳", cls: "bg-lime-500/15 text-lime-700 border-lime-400/30 dark:text-lime-100" },
  business: { label: "Business", emoji: "💼", cls: "bg-slate-500/15 text-slate-700 border-slate-400/30 dark:text-slate-100" },
  student: { label: "Student", emoji: "🎓", cls: "bg-slate-500/15 text-slate-700 border-slate-400/30 dark:text-slate-100" },
  "day-trips": { label: "Day trips", emoji: "🚌", cls: "bg-neutral-500/15 text-neutral-700 border-neutral-400/30 dark:text-neutral-100" },
};

// ── Rating dots (score 1–10 → 5 dots) ────────────────────────────────────
const SCORE_ROWS: { key: keyof MatchScores; label: string; Icon: typeof Waves }[] = [
  { key: "beaches", label: "Beaches", Icon: Waves },
  { key: "nightlife", label: "Nightlife", Icon: Moon },
  { key: "food", label: "Food", Icon: Utensils },
  { key: "activities", label: "Activities", Icon: MapPin },
  { key: "family", label: "Family", Icon: Users },
  { key: "value", label: "Value", Icon: PiggyBank },
];

function ScoreDots({ score }: { score: number }) {
  const filled = Math.round(score / 2);
  return (
    <span className="flex shrink-0 gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className={`h-2 w-2 rounded-full ${i < filled ? "bg-accent" : "bg-muted-foreground/25"}`} />
      ))}
    </span>
  );
}

function ScoresGrid({ scores }: { scores: MatchScores }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
      {SCORE_ROWS.map((r) => (
        <div key={r.key} className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <r.Icon className="h-3 w-3 text-accent" /> {r.label}
          </span>
          <ScoreDots score={scores[r.key]} />
        </div>
      ))}
    </div>
  );
}

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-foreground">
      {children}
    </span>
  );
}

/**
 * "14–21 Mar", or "28 Mar–5 Apr" when the range crosses a month.
 * Null when there is no usable date, so the caller omits the line.
 */
function fareDates(f: MatchFare): string | null {
  const fmt = (iso: string, withMonth: boolean) => {
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return null;
    const day = d.getUTCDate();
    return withMonth
      ? `${day} ${d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" })}`
      : `${day}`;
  };
  if (!f.departDate) return null;
  if (!f.returnDate) return fmt(f.departDate, true);
  const sameMonth = f.departDate.slice(0, 7) === f.returnDate.slice(0, 7);
  const from = fmt(f.departDate, !sameMonth);
  const to = fmt(f.returnDate, true);
  return from && to ? `${from}–${to}` : null;
}

export function AiResultCard({
  m,
  featured = false,
  month,
  originLabel,
  onSearchFlights,
}: {
  m: AiSearchMatch;
  featured?: boolean;
  month?: string | null;
  /** Airport the fare is from, e.g. "London". A price without one is meaningless. */
  originLabel?: string;
  onSearchFlights: (m: AiSearchMatch) => void;
}) {
  const tags = (m.tags ?? []).slice(0, 3);
  const fare = m.fares?.[0];
  const alt = m.fares?.[1];
  const dates = fare ? fareDates(fare) : null;
  const altDates = alt ? fareDates(alt) : null;
  const searchLabel = month ? `Search flights in ${month}` : "Search flights";

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
      {/* Image header */}
      <div className={`relative w-full overflow-hidden ${featured ? "h-56 sm:h-64" : "h-48"}`}>
        <Image
          src={m.image}
          alt={`${m.city}, ${m.country}`}
          fill
          sizes={
            featured
              ? "(max-width:639px) calc(100vw - 32px), (max-width:1023px) calc(100vw - 48px), (max-width:1151px) calc(100vw - 64px), 1088px"
              : "(max-width:639px) calc(100vw - 32px), (max-width:1023px) calc((100vw - 72px) / 2), (max-width:1151px) calc((100vw - 112px) / 3), 347px"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Compare heart */}
        <Link
          href={`/compare?d=${m.slug}`}
          aria-label={`Compare ${m.city}`}
          title={`Compare ${m.city}`}
          className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-accent hover:text-accent-foreground"
        >
          <Heart className="h-4 w-4" />
        </Link>

        {/* Weather badge — rich destinations only */}
        {m.weatherBadge && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {m.weatherBadge}
          </span>
        )}

        {/* City + country */}
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className={`font-serif font-semibold leading-tight ${featured ? "text-4xl" : "text-2xl"}`}>{m.city}</h3>
          <p className="text-xs text-white/80">
            {m.countryFlag} {m.country}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/*
          Real fares only. This used to render the catalog's own figure — a
          Stockholm round-trip average in SEK — labelled "one way". When there is
          no fare for this route the price is omitted entirely; an absent price is
          better than a wrong one, and calling a round trip "one way" is a
          deceptive practice under 14 CFR 399.84.
        */}
        {fare ? (
          <div>
            <p className="font-serif text-2xl font-bold text-accent">
              from ${fare.priceUsd.toLocaleString()}
              <span className="ml-1.5 align-middle text-xs font-normal text-muted-foreground">
                {fare.oneWay ? "one way" : "round trip"}
                {originLabel ? ` from ${originLabel}` : ""}
              </span>
            </p>
            {(dates || alt) && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {dates}
                {dates && alt ? " · " : ""}
                {alt ? `or $${alt.priceUsd.toLocaleString()} ${altDates ?? ""}`.trim() : ""}
              </p>
            )}
          </div>
        ) : (
          // No cached fare for this route. An apology is a dead end, so the empty
          // price slot becomes the invitation instead — same action as the CTA
          // below, just reached from where the eye already is.
          <button
            type="button"
            onClick={() => onSearchFlights(m)}
            className="group/price inline-flex items-center gap-1.5 text-left font-serif text-2xl font-bold text-accent transition hover:brightness-110"
          >
            Find your best price
            <ArrowRight className="h-5 w-5 transition-transform group-hover/price:translate-x-0.5" />
          </button>
        )}

        {m.reason && <p className="text-sm leading-relaxed text-muted-foreground">{m.reason}</p>}

        {/* Info pills */}
        {(m.flightTime || m.foodPerDay || m.hotelPerNight) && (
          <div className="flex flex-wrap gap-2">
            {m.flightTime && (
              <InfoPill>
                <Plane className="h-3.5 w-3.5 text-accent" /> {m.flightTime}
              </InfoPill>
            )}
            {m.foodPerDay && (
              <InfoPill>
                <Utensils className="h-3.5 w-3.5 text-accent" /> {m.foodPerDay}/day
              </InfoPill>
            )}
            {m.hotelPerNight && (
              <InfoPill>
                <Hotel className="h-3.5 w-3.5 text-accent" /> {m.hotelPerNight}/night
              </InfoPill>
            )}
          </div>
        )}

        {m.scores && <ScoresGrid scores={m.scores} />}

        {/* Food + attractions — rich destinations only */}
        {(m.localDishes || m.topSights) && (
          <div className="grid grid-cols-2 gap-2">
            {m.localDishes && (
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Local dishes</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground">{m.localDishes}</p>
              </div>
            )}
            {m.topSights && (
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Top sights</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground">{m.topSights}</p>
              </div>
            )}
          </div>
        )}

        {m.insiderTip && (
          <blockquote className="rounded-xl border-l-2 border-accent bg-accent/8 px-3 py-2 text-xs italic leading-relaxed text-muted-foreground">
            <span className="font-semibold not-italic text-accent">Insider tip:</span> {m.insiderTip}
          </blockquote>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => {
              const s = TAG_STYLE[t];
              return (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${s?.cls ?? "border-border bg-muted text-foreground"}`}
                >
                  {s?.emoji} {s?.label ?? t}
                </span>
              );
            })}
          </div>
        )}

        {/* Two CTAs */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={() => onSearchFlights(m)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
          >
            {searchLabel} <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href={`/${m.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            Explore {m.city} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
