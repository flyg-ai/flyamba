import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDestination } from "@/app/data/destinations";
import { DestinationDetail } from "@/app/components/DestinationDetail";
import { BarcelonaSubNav } from "@/app/components/BarcelonaSubNav";
import { BARCELONA_SUBPAGES, barcelonaHref } from "@/app/lib/barcelona";
import { SITE, airlineNames, lowestPriceStr } from "@/app/lib/destination-helpers";
import { ArrowRight } from "lucide-react";

const d = getDestination("barcelona")!;

export function generateMetadata(): Metadata {
  const year = new Date().getFullYear();
  const title = `Cheap Flights to Barcelona ${year} — Guide, Prices & Attractions | Flyamba`;
  const description = `Find cheap flights to Barcelona, Spain. Compare prices from ${airlineNames(d)
    .slice(0, 3)
    .join(", ")}, plus complete guides to attractions, restaurants, hotels, transport, weather, prices, nightlife and beaches. From ${lowestPriceStr(d)}.`;
  const canonical = `${SITE}/barcelona`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website", images: [d.image] },
    twitter: { card: "summary_large_image", images: [d.image] },
  };
}

function ExploreBarcelona() {
  const guides = BARCELONA_SUBPAGES.filter((p) => p.slug);
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Complete guide</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Explore Barcelona</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Everything you need to plan the trip — from Gaudí&apos;s masterpieces to the best beaches and where to eat.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {guides.map((p) => (
          <Link
            key={p.slug}
            href={barcelonaHref(p.slug)}
            className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="relative h-40 overflow-hidden">
              <Image src={p.image} alt={`Barcelona ${p.label}`} fill sizes="(max-width:1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-sm">{p.emoji}</span>
            </div>
            <div className="p-5">
              <h3 className="flex items-center justify-between font-serif text-lg font-semibold text-foreground">
                {p.label}
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BarcelonaHub() {
  if (!d) notFound();
  return (
    <DestinationDetail
      d={d}
      afterHero={<BarcelonaSubNav active="" />}
      beforeFooter={<ExploreBarcelona />}
    />
  );
}
