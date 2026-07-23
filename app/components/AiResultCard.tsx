"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, Plane, Utensils, Hotel, Waves, Moon, MapPin, Users, PiggyBank } from "lucide-react";
import type { Destination, DestScores } from "@/app/data/destinations";
import { usdStr } from "@/app/lib/format";
import { currentWeatherBadge } from "@/app/lib/destination-helpers";

// ── Lifestyle tags — emoji + colored pill ────────────────────────────────
const TAG_STYLE: Record<string, { emoji: string; cls: string }> = {
  Beach: { emoji: "🏖️", cls: "bg-sky-500/15 text-sky-700 border-sky-400/30 dark:text-sky-200" },
  Nightlife: { emoji: "🌙", cls: "bg-purple-500/15 text-purple-700 border-purple-400/30 dark:text-purple-200" },
  Culture: { emoji: "🎨", cls: "bg-amber-500/15 text-amber-700 border-amber-400/30 dark:text-amber-100" },
  Food: { emoji: "🍽️", cls: "bg-rose-500/15 text-rose-700 border-rose-400/30 dark:text-rose-100" },
  Romantic: { emoji: "💕", cls: "bg-pink-500/15 text-pink-700 border-pink-400/30 dark:text-pink-100" },
  Adventure: { emoji: "🏔️", cls: "bg-emerald-500/15 text-emerald-700 border-emerald-400/30 dark:text-emerald-100" },
  City: { emoji: "🏙️", cls: "bg-blue-500/15 text-blue-700 border-blue-400/30 dark:text-blue-100" },
  "Long haul": { emoji: "🌍", cls: "bg-indigo-500/15 text-indigo-700 border-indigo-400/30 dark:text-indigo-100" },
};

function deriveTags(d: Destination): string[] {
  const tags = new Set<string>();
  switch (d.category) {
    case "Beach & Sun": tags.add("Beach"); break;
    case "City Breaks": tags.add("City"); break;
    case "Adventure": tags.add("Adventure"); break;
    case "Romantic": tags.add("Romantic"); break;
    case "Long Haul": tags.add("Long haul"); break;
  }
  const text = [d.tagline, d.intro ?? "", ...(d.whyVisit?.map((w) => w.text) ?? [])].join(" ").toLowerCase();
  if (/beach|sun|sea|coast|sand|coastal|mediterranean/.test(text) || (d.summerTemp ?? 0) >= 27) tags.add("Beach");
  if (/nightlife|bars|clubs|party|rooftop/.test(text)) tags.add("Nightlife");
  if (/food|cuisine|tapas|gastronom|wine|restaurant|market/.test(text)) tags.add("Food");
  if (/culture|museum|art|architect|histor|shrine|temple/.test(text)) tags.add("Culture");
  if ((d.avgFlightHours ?? 0) > 6) tags.add("Long haul");
  return [...tags].slice(0, 3);
}

// ── Rating dots (score 1–10 → 5 dots) ────────────────────────────────────
const SCORE_ROWS: { key: keyof DestScores; label: string; Icon: typeof Waves }[] = [
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

function ScoresGrid({ scores }: { scores: DestScores }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SCORE_ROWS.map(({ key, label, Icon }) => (
        <div key={key} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-2.5 py-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Icon className="h-3.5 w-3.5 text-accent" /> {label}
          </span>
          <ScoreDots score={scores[key]} />
        </div>
      ))}
    </div>
  );
}

function InfoPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-[11px] font-medium text-foreground">
      {children}
    </span>
  );
}

/**
 * AI-search result card in the flyg.ai style: image header (compare heart,
 * city/country, weather), then a rich body — prominent price, info pills,
 * lifestyle rating dots, local dishes + top attractions, an insider tip, and
 * two CTAs ("Search flights" → widget, "Explore" → destination page).
 */
export function AiResultCard({
  d,
  reason,
  featured = false,
  month,
  onSearchFlights,
}: {
  d: Destination;
  reason?: string;
  featured?: boolean;
  month?: string | null;
  onSearchFlights: (d: Destination) => void;
}) {
  const weather = currentWeatherBadge(d);
  const flight = d.flightTime ?? `${d.avgFlightHours}h`;
  const tags = deriveTags(d);
  const dishes = d.localDishes?.slice(0, 3).join(", ");
  const attractions = d.thingsToDo?.slice(0, 3).map((t) => t.title).join(", ");
  const searchLabel = month ? `Search flights in ${month}` : "Search flights";

  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elegant">
      {/* Image header */}
      <div className={`relative w-full overflow-hidden ${featured ? "h-56 sm:h-64" : "h-48"}`}>
        <Image
          src={d.image}
          alt={`${d.city}, ${d.country}`}
          fill
          sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 380px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Compare heart */}
        <Link
          href={`/compare?d=${d.slug}`}
          aria-label={`Compare ${d.city}`}
          title={`Compare ${d.city}`}
          className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-accent hover:text-accent-foreground"
        >
          <Heart className="h-4 w-4" />
        </Link>

        {/* Weather badge */}
        {weather && (
          <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {weather}
          </span>
        )}

        {/* City + country */}
        <div className="absolute bottom-3 left-3 text-white">
          <h3 className={`font-serif font-semibold leading-tight ${featured ? "text-4xl" : "text-2xl"}`}>{d.city}</h3>
          <p className="text-xs text-white/80">{d.countryFlag} {d.country}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Prominent price */}
        <p className="font-serif text-2xl font-bold text-accent">
          from {usdStr(d.price)}
          <span className="ml-1.5 align-middle text-xs font-normal text-muted-foreground">round trip</span>
        </p>

        {reason && <p className="text-sm leading-relaxed text-muted-foreground">{reason}</p>}

        {/* Info pills */}
        <div className="flex flex-wrap gap-2">
          <InfoPill><Plane className="h-3.5 w-3.5 text-accent" /> {flight}</InfoPill>
          {d.foodCostPerDay && <InfoPill><Utensils className="h-3.5 w-3.5 text-accent" /> {d.foodCostPerDay}/day</InfoPill>}
          {d.hotelCostPerNight && <InfoPill><Hotel className="h-3.5 w-3.5 text-accent" /> {d.hotelCostPerNight}/night</InfoPill>}
        </div>

        {/* Rating dots */}
        {d.scores && <ScoresGrid scores={d.scores} />}

        {/* Food + attractions */}
        {(dishes || attractions) && (
          <div className="grid grid-cols-2 gap-2">
            {dishes && (
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Local dishes</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground">{dishes}</p>
              </div>
            )}
            {attractions && (
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Top sights</p>
                <p className="mt-1 text-xs leading-relaxed text-foreground">{attractions}</p>
              </div>
            )}
          </div>
        )}

        {/* Insider tip */}
        {d.insiderTip && (
          <blockquote className="rounded-xl border-l-2 border-accent bg-accent/8 px-3 py-2 text-xs italic leading-relaxed text-muted-foreground">
            <span className="font-semibold not-italic text-accent">Insider tip:</span> {d.insiderTip}
          </blockquote>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => {
              const s = TAG_STYLE[t];
              return (
                <span key={t} className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${s?.cls ?? "bg-muted text-foreground border-border"}`}>
                  {s?.emoji} {t}
                </span>
              );
            })}
          </div>
        )}

        {/* Two CTAs */}
        <div className="mt-auto flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={() => onSearchFlights(d)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
          >
            {searchLabel} <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href={`/${d.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            Explore {d.city} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
