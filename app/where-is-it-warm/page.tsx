import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/app/components/FaqSection";
import { WarmSearch, type SearchDest } from "@/app/components/WarmSearch";
import { buildDestinations } from "@/app/lib/climate";
import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { HUB_CITY_SET } from "@/app/lib/hubs";
import { MONTHS, warmHref, WARM_BASE } from "./months";
import { HUB_COPY } from "./copy";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { Sun, ArrowRight, CalendarRange } from "lucide-react";

// Daily revalidation, so "right now" tracks the real calendar month instead of
// freezing at whatever month the last deploy happened in. The month pages
// themselves stay fully static — only this one has a reason to age.
export const revalidate = 86400;

const TITLE = "Where Is It Warm? Warm Destinations by Month | Flyamba";
const DESCRIPTION =
  "Pick the month you can travel and see every destination that is warm then, with fares, guides and the cheapest dates to fly.";

export const metadata: Metadata = {
  title: clampTitle(TITLE),
  description: clampDescription(DESCRIPTION),
  alternates: { canonical: `${SITE}${WARM_BASE}` },
  openGraph: {
    title: clampTitle(TITLE),
    description: clampDescription(DESCRIPTION),
    url: `${SITE}${WARM_BASE}`,
    type: "website",
  },
};

const FAQ: FaqItem[] = HUB_COPY.faq;

/** The whole catalog, trimmed to what the search box needs. */
function searchCatalog(): SearchDest[] {
  return ALL_DESTINATIONS.map((d) => ({
    slug: d.slug,
    name: d.name,
    country: d.country,
    thumbnail: d.thumbnail || d.image,
  }));
}

export default async function WhereIsItWarmHub() {
  // Recomputed on each revalidation, which is what makes the spotlight follow
  // the calendar. Everything else on the page is month-agnostic.
  const now = new Date();
  const monthIndex = now.getMonth();
  const month = MONTHS[monthIndex];

  // Same 75–88 °F window the month pages open on, so the three cards here match
  // what the visitor sees after clicking through rather than surfacing Riyadh.
  //
  // Narrowed to the 28 cities with a built-out hub, for two reasons. Ranking the
  // whole catalog on temperature alone answers the wrong question: for August it
  // returned Delhi, Valencia and Skopje — Delhi is in monsoon, Skopje is inland
  // North Macedonia, and neither is what someone asking where it is warm wants to
  // see first. And a lite page is a poor landing: it has a hero, a price chart and
  // little else, so the most prominent cards on the hub would lead to the thinnest
  // pages on the site. Warmest-first still decides the order; the hub list only
  // decides who is eligible.
  const all = await buildDestinations(monthIndex);
  const spotlight = all
    .filter((d) => HUB_CITY_SET.has(d.slug) && d.tempC >= 24 && d.tempC <= 31)
    .slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
        { "@type": "ListItem", position: 2, name: "Where Is It Warm", item: `${SITE}${WARM_BASE}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar />

      {/* Hero */}
      <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden">
        {/* The homepage's hero, borrowed until this page gets one of its own. The
            image that shipped with the ported month set was 1200x675 and an
            AI-rendered fantasy world map rather than a photograph; it has been
            deleted. This one is 1600x1064 at 0.043 bytes/px. Still short of what
            DPR 2 wants on a wide screen (1440 CSS x 2 = 2880) — see the hero debt
            note in CLAUDE.md — but it sits under a dark gradient with text over
            it, which is where upscaling shows least. */}
        <Image
          src="/images/content/photo-1507525428034-b723cf961d3e.avif"
          alt=""
          fill
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Breadcrumbs onDark items={[{ name: "Flyamba", href: "/" }, { name: "Where Is It Warm" }]} />
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            <Sun className="h-3.5 w-3.5" /> Where is it warm
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">
            Where Is It Warm Right Now?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{HUB_COPY.intro}</p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        {/* Right now */}
        <section>
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Where&rsquo;s it warm right now
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            It&rsquo;s {month.label}. {HUB_COPY.spotlightLine} See{" "}
            <Link href={warmHref(month.slug)} className="text-accent underline-offset-4 hover:underline">
              all of them for {month.label}
            </Link>
            .
          </p>

          {/* A compact row, not a card grid. The month grid below is the page's
              actual content — twelve doors into twelve pages — and it should be
              what the eye lands on. Three big cards here competed with it and
              pushed the grid under the fold. */}
          {spotlight.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {spotlight.map((d) => (
                <Link
                  key={d.slug}
                  href={`/${d.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-2.5 pr-4 transition-all hover:-translate-y-0.5 hover:border-accent"
                >
                  <div className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      sizes="74px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-serif text-lg font-semibold text-foreground">{d.name}</span>
                      <span className="shrink-0 text-sm font-bold text-accent">
                        {Math.round(d.tempC * 1.8 + 32)}°F
                      </span>
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">{d.country}</span>
                    {d.priceUsd > 0 && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        from <span className="font-semibold text-foreground">${d.priceUsd.toLocaleString()}</span>
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Twelve months */}
        <section className="mt-20">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <CalendarRange className="h-3.5 w-3.5" /> Every month
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Pick a month
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{HUB_COPY.monthsLine}</p>

          {/* Month-card images need 1200px, not 1600. Measured, not guessed: the
              grid is three columns inside max-w-7xl, so each card is 389 CSS px
              wide at any viewport above 1280 — 778px at DPR 2. A 1200px source
              covers that with room to spare. Requiring 1600 ruled out otherwise
              perfect candidates (Agadir, the Azores, the Algarve are all 1200)
              for no benefit the screen can show. The full-bleed hero above is the
              opposite case and does need every pixel it can get. */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {MONTHS.map((m, i) => {
              const current = i === monthIndex;
              return (
                <Link
                  key={m.slug}
                  href={warmHref(m.slug)}
                  aria-current={current ? "page" : undefined}
                  className={`group relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant ${
                    current ? "border-accent ring-2 ring-accent/30" : "border-border hover:border-accent"
                  }`}
                >
                  <div className="relative h-[190px] bg-muted sm:h-[240px] lg:h-[280px]">
                    <Image
                      src={`/images/where-is-it-warm/${m.slug}.avif`}
                      alt=""
                      fill
                      sizes="(max-width:639px) calc((100vw - 48px) / 2), (max-width:1023px) calc((100vw - 72px) / 2), 389px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {current && (
                      <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                        This month
                      </span>
                    )}
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                      <span className="truncate font-serif text-lg font-semibold text-white sm:text-2xl lg:text-3xl">{m.label}</span>
                      <ArrowRight className="hidden h-5 w-5 shrink-0 text-white/70 transition-transform group-hover:translate-x-1 sm:block" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Search */}
        <section className="mt-20">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            Looking for somewhere specific?
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {HUB_COPY.searchLine} All {ALL_DESTINATIONS.length} destinations are searchable.
          </p>
          <div className="mt-6">
            <WarmSearch destinations={searchCatalog()} />
          </div>
        </section>

        <section className="mt-20 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            From a warm month to a booked flight
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Every destination on a month page is a live entry in our catalog, not a name on a list. The card
              carries a round-trip fare, and clicking it opens that destination&rsquo;s own page — flight search,
              a fare chart across the twelve months, and, for our busiest routes, a{" "}
              <Link href="/low-fare-calendar" className="text-accent underline-offset-4 hover:underline">
                low fare calendar
              </Link>{" "}
              showing the cheapest departure dates day by day. Warm months are usually peak months, so that
              calendar is worth opening before you commit to dates.
            </p>
            <p>
              Twenty-eight of our destinations also have full city guides behind them — attractions, restaurants,
              hotels, transport, weather and what a trip actually costs. If you would rather browse by idea than by
              temperature, the{" "}
              <Link href="/guides" className="text-accent underline-offset-4 hover:underline">
                travel guides
              </Link>{" "}
              and{" "}
              <Link href="/explore" className="text-accent underline-offset-4 hover:underline">
                destination explorer
              </Link>{" "}
              cover the same catalog from the other direction, and{" "}
              <Link href="/compare" className="text-accent underline-offset-4 hover:underline">
                head-to-head comparisons
              </Link>{" "}
              help when you are torn between two.
            </p>
          </div>

          <h2 className="mt-14 font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            What the numbers mean
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Every temperature here is the average daily high for that destination in that month, from measured
              climate records rather than editorial judgement. A monthly average describes a typical day, not a
              promise — but it is the right number to plan around, and it is the same number for every destination,
              which is what makes the ranking meaningful.
            </p>
            <p>
              The filters read the same records. Warm sea uses measured sea surface temperature, which is what
              separates a place that looks warm from one you would actually swim in — the Mediterranean in May is
              the standing example, warm in the air and cold in the water. Dry uses monthly rainfall, which is how
              you tell a tropical dry season from a monsoon at the same temperature. Cool nights uses the overnight
              low, which is usually what people mean when they say somewhere was unbearable rather than merely hot.
            </p>
            <p>
              Fares are round-trip and come from the same catalog the rest of the site uses. They move, and the
              figures in our month-by-month writing are medians across all the warm destinations for that month —
              useful for comparing one month against another, not a quote for your route.
            </p>
          </div>
        </section>

      </main>

      <FaqSection items={FAQ} city="warm destinations" heading="Where is it warm — your questions answered" />

      <div className="pb-20" />
      <Footer />
    </div>
  );
}
