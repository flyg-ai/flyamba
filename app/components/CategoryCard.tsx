"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, MapPin, ArrowUpRight, Ticket } from "lucide-react";
import type { BcnPlace } from "@/app/data/barcelona-places";

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

// Uses the place's own area/name (not a hardcoded city) so it works for every city.
const mapsUrl = (name: string, area: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(area ? `${name}, ${area}` : name)}`;

// Derive the right-hand info cell label/value from whichever category field is set.
function rightInfo(p: BcnPlace): { label: string; value: string } | null {
  if (p.category) return { label: "Category", value: p.category };
  if (p.type) return { label: "Type", value: p.type };
  if (p.facilities) return { label: "Facilities", value: p.facilities };
  if (p.ageGroup) return { label: "Ages", value: p.ageGroup };
  if (p.distance) return { label: "Distance", value: p.distance };
  return null;
}

/**
 * A Barcelona place card: image with name overlay + pill badge, editorial star
 * rating, a 2-column info grid, an italic insider tip, and two CTAs (book /
 * details + Google Maps). Falls back to a placeholder if the image 404s.
 */
export function CategoryCard({ place }: { place: BcnPlace }) {
  const [src, setSrc] = useState(place.image);
  const pill = place.price ?? place.type;
  const right = rightInfo(place);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition hover:-translate-y-1 hover:border-accent/50">
      {/* Image + overlays */}
      <div className="relative h-[220px] w-full overflow-hidden bg-muted">
        <Image
          src={src}
          alt={place.name}
          width={400}
          height={260}
          onError={() => setSrc(PLACEHOLDER)}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        {pill && (
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-accent backdrop-blur">
            {pill}
          </span>
        )}
        <h3 className="absolute inset-x-4 bottom-3 font-serif text-xl font-semibold leading-tight text-white drop-shadow">
          {place.name}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Editorial rating */}
        <div className="flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-foreground">{place.rating.toFixed(1)}</span>
          {place.reviewCount != null && (
            <span className="text-xs text-muted-foreground">({place.reviewCount.toLocaleString("en-US")} reviews)</span>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Area</p>
            <p className="mt-0.5 text-sm text-foreground">{place.area}</p>
          </div>
          {right && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">{right.label}</p>
              <p className="mt-0.5 text-sm text-foreground">{right.value}</p>
            </div>
          )}
        </div>

        {/* Insider tip */}
        <p className="border-l-2 border-accent/40 pl-3 text-sm italic leading-relaxed text-muted-foreground">
          &ldquo;{place.tip}&rdquo;
        </p>

        {/* CTAs */}
        <div className="mt-auto flex items-center gap-2 pt-1">
          {place.tiqetsUrl ? (
            <a
              href={place.tiqetsUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.5 text-xs font-bold text-accent-foreground transition hover:brightness-110"
            >
              <Ticket className="h-3.5 w-3.5" /> Book tickets
            </a>
          ) : (
            <a
              href={`#${place.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-3 py-2.5 text-xs font-bold text-accent-foreground transition hover:brightness-110"
            >
              View details
            </a>
          )}
          <a
            href={mapsUrl(place.name, place.area)}
            target="_blank"
            rel="nofollow noopener"
            aria-label={`${place.name} on Google Maps`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-foreground transition hover:border-accent hover:text-accent"
          >
            <MapPin className="h-3.5 w-3.5" /> Map <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
