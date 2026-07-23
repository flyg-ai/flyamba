"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { SubPage } from "@/app/lib/barcelona";
import { barcelonaHref } from "@/app/lib/barcelona";

/**
 * Image category grid. All cards are always rendered in the HTML (for SEO);
 * on mobile only the first 6 show until "Show all guides" is tapped. On
 * desktop (md+) every card is always visible.
 */
export function CategoryGrid({ categories }: { categories: SubPage[] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={barcelonaHref(c.slug)}
            className={`group relative h-[180px] overflow-hidden rounded-3xl border border-border ${
              i >= 6 && !expanded ? "hidden md:block" : "block"
            }`}
          >
            <Image src={c.image} alt={`Barcelona ${c.label}`} fill sizes="(max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-white">
              <span className="font-serif text-xl font-semibold">{c.label}</span>
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      {categories.length > 6 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-accent transition hover:border-accent md:hidden"
        >
          {expanded ? "Show fewer" : "Show all guides"}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}
    </>
  );
}
