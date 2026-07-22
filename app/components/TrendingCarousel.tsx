"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { destinations } from "@/app/data/destinations";
import { DestinationCard } from "./DestinationCard";

export function TrendingCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Trending now</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Where travelers are heading this week
          </h2>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card hover:bg-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card hover:bg-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="-mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0"
      >
        {destinations.map((d) => (
          <div key={d.slug} className="w-[300px] shrink-0 snap-start sm:w-[340px]">
            <DestinationCard d={d} />
          </div>
        ))}
      </div>
    </section>
  );
}
