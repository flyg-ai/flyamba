"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

/** One searchable catalog entry. Narrow on purpose — the whole 550-row catalog
 *  ships to the browser, so every field here costs bytes twelve hundred times. */
export type SearchDest = {
  slug: string;
  name: string;
  country: string;
  thumbnail: string;
};

/**
 * Fold for diacritic-insensitive matching, so "malaga" finds "Málaga" and
 * "reykjavik" finds "Reykjavík".
 *
 * The range is written with \u escapes rather than the literal combining marks
 * flyg.ai's version uses. Literal combining characters in source are invisible
 * in most editors, survive a copy-paste only by luck, and are silently mangled
 * by any tool that normalises the file — at which point the regex quietly stops
 * matching anything and search just gets worse with no error.
 */
function fold(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const MAX_RESULTS = 6;

export function WarmSearch({ destinations }: { destinations: SearchDest[] }) {
  const [query, setQuery] = useState("");

  const q = fold(query.trim());
  // Nothing renders until something is typed — the month grid above already
  // covers browsing, and 550 cards on load would bury it.
  const results = q
    ? destinations.filter((d) => fold(d.name).includes(q) || fold(d.country).includes(q)).slice(0, MAX_RESULTS)
    : [];

  return (
    <div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try Málaga, Bangkok, Tenerife…"
          aria-label="Search destinations by city or country"
          className="w-full rounded-full border border-border bg-card py-3.5 pl-11 pr-4 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/20"
        />
      </div>

      {q &&
        (results.length > 0 ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d) => (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 pr-4 transition-all hover:-translate-y-0.5 hover:border-accent"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={d.thumbnail}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{d.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">{d.country}</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-5 text-sm text-muted-foreground">
            Nothing matches &ldquo;{query.trim()}&rdquo;.
          </p>
        ))}
    </div>
  );
}
