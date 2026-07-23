import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GuideShell } from "@/app/components/GuideShell";
import { getGuidesByDestination } from "@/app/data/guides";
import { SITE } from "@/app/lib/destination-helpers";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Barcelona Travel Guides 2026 | Flyamba",
  description:
    "In-depth Barcelona travel guides: the best time to visit, a budget 5-day itinerary under $500, and Barcelona vs Madrid — everything to plan the perfect trip.",
  alternates: { canonical: `${SITE}/barcelona/guides` },
  openGraph: { title: "Barcelona Travel Guides | Flyamba", description: "In-depth reads to plan your Barcelona trip.", type: "article" },
};

export default function BarcelonaGuides() {
  const guides = getGuidesByDestination("barcelona");
  return (
    <GuideShell
      active="guides"
      crumb="Guides"
      h1="Barcelona Travel Guides"
      heroImage="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=2000"
      intro="Go deeper with our long-form Barcelona guides — from picking the perfect month and travelling on a budget to deciding between Barcelona and Madrid. Each one is a practical, in-depth read to help you plan a smarter, cheaper and more memorable trip."
    >
      <div className="mt-8 grid gap-8">
        {guides.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="group grid gap-5 overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant sm:grid-cols-[minmax(0,1fr)_1.4fr]">
            <div className="relative h-48 overflow-hidden sm:h-full">
              <Image src={g.image} alt={g.title} fill sizes="(max-width:640px) 100vw, 40vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <p className="text-[11px] uppercase tracking-widest text-accent">{g.category}</p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">{g.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {g.readTime} read</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-accent">Read guide <ArrowRight className="h-3.5 w-3.5" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </GuideShell>
  );
}
