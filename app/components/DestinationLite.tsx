import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { AviasalesWidget } from "@/app/components/AviasalesWidget";
import { SmartImage } from "@/app/components/SmartImage";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { destinationCrumbs } from "@/app/lib/destination-crumbs";
import { ALL_DESTINATIONS, type AllDestination } from "@/app/data/all-destinations";
import { fareFor } from "@/app/lib/fare-display";
import { getUsFareTable, formatFareLabelShort } from "@/app/lib/fares";
import { COUNTRY_PAGES } from "@/app/lib/regions";
import { FareCalendarSection } from "@/app/components/FareCalendarSection";
import { ClimateSection } from "@/app/components/ClimateSection";
import { NonstopRoutes } from "@/app/components/NonstopRoutes";
import { FaqSection } from "@/app/components/FaqSection";
import { buildLiteFaq, liteFaqJsonLd } from "@/app/lib/lite-faq";
// Still read directly for the "cheapest month" fact card, which is a single value
// rather than a section. The tier rule itself lives in FareCalendarSection.
import { fareCalendarFor } from "@/app/lib/fare-calendar";
import { SITE } from "@/app/lib/destination-helpers";
import { LowFareCta } from "@/app/components/LowFareCta";
import { CALENDAR_BY_SLUG } from "@/app/lib/low-fare";
import { Plane, Globe, MapPin, TrendingDown, ArrowRight, Sparkles } from "lucide-react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL_MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Structured data for the lite pages. Deliberately smaller than the rich
// DestinationDetail graph — only the facts the slim catalog actually holds.
// `fareAmount` is already a formatted USD string, or null when we hold no fare.
function buildJsonLd(d: AllDestination, fareAmount: string | null) {
  const url = `${SITE}/${d.slug}`;
  const place = d.name === d.country ? d.name : `${d.name}, ${d.country}`;
  // The price in the description is the observed fare or nothing. It used to be
  // the catalog estimate converted from SEK.
  const description = fareAmount
    ? `Cheap flights to ${place} from ${fareAmount} round trip, with the fares we found by month.`
    : `Cheap flights to ${place}, with the fares we found by month.`;

  // No BreadcrumbList here — <Breadcrumbs> owns it and emits it from the trail it
  // actually renders. The copy that lived here also sent a URL-less middle entry
  // for the country, which the spec does not allow.
  return [
    {
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: d.name,
      description,
      url,
      image: `${SITE}${d.image}`,
      address: { "@type": "PostalAddress", addressCountry: d.country },
    },
  ];
}

/**
 * Lightweight destination page for the ~544 ported catalog cities that don't yet
 * have Barcelona-level editorial content. Shows a hero, the live flight-search
 * widget, basic facts, a monthly price calendar, and a "full guide coming soon"
 * note — enough to be useful and indexable while the rich guide is written.
 */
export async function DestinationLite({ d }: { d: AllDestination }) {
  // OBSERVED FARES, NOT `d.monthlyPrices`. That field holds Stockholm-origin SEK
  // estimates whose median error against real US fares is 2.35x, and it inverts
  // the ranking rather than merely scaling it. 173 destinations have no observed
  // fare and show nothing at all — a blank is honest, an estimate is not, and
  // 14 CFR 399.84 requires an advertised price to be purchasable.
  const fare = await fareFor(d.slug);
  const calendar = await fareCalendarFor(d.slug);
  const prices = calendar.observations.map((o) => o.priceUsd);
  const min = prices.length ? Math.min(...prices) : 0;
  const max = prices.length ? Math.max(...prices) : 0;

  // "Cheapest month" is only claimed at six observations or more. With three
  // points the minimum says which months were sampled, not which is cheap.
  const cheapestMonth =
    calendar.tier === "chart"
      ? FULL_MONTHS[calendar.observations.find((o) => o.priceUsd === min)!.monthIndex]
      : null;

  // The continent row excludes the destination's own country: those links live
  // in the country section above it, and a page should not link Barcelona twice.
  const related = ALL_DESTINATIONS.filter((x) => x.continent === d.continent && x.country !== d.country).slice(0, 8);

  // Null when no measured climate year exists — then no FAQ and no FAQPage
  // schema at all. The gate lives in lite-faq.ts.
  const faq = await buildLiteFaq(d.slug, d.name);

  // Country siblings, cheapest first on the New York sort price — the same
  // display/sort rule as the country pages (a column mixing four origins is not
  // a column; no NYC fare sorts last, slug keeps the order total). 70 lite
  // destinations are alone in their country and render no section.
  const siblings = ALL_DESTINATIONS.filter((x) => x.country === d.country && x.slug !== d.slug);
  const fareTable = siblings.length ? await getUsFareTable() : null;
  const countrySiblings = fareTable
    ? siblings
        .sort(
          (a, b) =>
            (fareTable.sortPrice[a.slug] ?? Infinity) - (fareTable.sortPrice[b.slug] ?? Infinity) ||
            a.slug.localeCompare(b.slug),
        )
        .slice(0, 12)
        .map((s) => ({
          slug: s.slug,
          name: s.name,
          fareLabel: fareTable.display[s.slug] ? formatFareLabelShort(fareTable.display[s.slug]) : null,
        }))
    : [];
  const countryPageSlug = COUNTRY_PAGES[d.country] ?? null;

  return (
    <div className="min-h-screen bg-background">
      {buildJsonLd(d, fare?.amount ?? null).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar transparent />

      {/* Hero */}
      <section className="relative isolate h-[70vh] min-h-[480px] w-full overflow-hidden">
        <SmartImage src={d.image} alt={`Cheap flights to ${d.name}, ${d.country}`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-14 pt-24 sm:px-6 lg:px-8">
          {/* The trail is new here. These pages carried a BreadcrumbList in their
              structured data with no breadcrumb on the page at all — schema
              describing a UI that did not exist, the same violation the FAQ rule
              in CLAUDE.md covers. <Breadcrumbs> now emits it from what renders. */}
          <div className="mb-4">
            <Breadcrumbs onDark items={destinationCrumbs(d)} />
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            <span>{d.country}</span>
            {d.iata && (
              <>
                <span className="opacity-40">·</span>
                <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 tracking-[0.2em] backdrop-blur">{d.iata}</span>
              </>
            )}
            <span className="opacity-40">·</span>
            <span>{d.continent}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold text-white sm:text-7xl">Cheap Flights to {d.name}</h1>
          {fare && (
            <p className="mt-4 text-lg text-white/85">
              <span className="font-serif text-2xl text-accent">{fare.long.headline}</span>
              {fare.long.detail ? <span className="ml-2 text-sm text-white/70">{fare.long.detail}</span> : null}
            </p>
          )}
        </div>
      </section>

      {/* Flight search widget */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-3 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Find flights to {d.name}</h2>
        <p className="mb-6 max-w-3xl text-muted-foreground">
          Compare live fares and find cheap flights to {d.name}, {d.country} — search hundreds of airlines and book direct.
        </p>
        <AviasalesWidget toName={d.tpName} />
        {/* Only the 22 cities with a calendar page — everything else would link
            to a route that doesn't exist. */}
        {CALENDAR_BY_SLUG.has(d.slug) && <LowFareCta slug={d.slug} city={d.name} />}
      </section>

      {/* Basic info */}
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Overview</p>
        <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">Flying to {d.name}</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, label: "Country", value: d.country },
            { icon: Globe, label: "Region", value: d.continent },
            { icon: Plane, label: "Airport", value: d.iata || "—" },
            { icon: TrendingDown, label: "Cheapest month we saw", value: cheapestMonth ? `${cheapestMonth} ($${min})` : "—" },
          ].map((s) => (
            <div key={s.label} className="rounded-3xl border border-border bg-card p-6">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent"><s.icon className="h-5 w-5" /></div>
              <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-serif text-lg font-semibold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Same component the 28 hub pages mount, so the tier rule exists once. */}
      <FareCalendarSection slug={d.slug} name={d.name} />

      {/* Evidence fans out by metro code, so the airport framing is mandatory
          here — see the prop's note. Renders nothing without evidence. */}
      <NonstopRoutes slug={d.slug} name={d.name} iata={d.iata} framing="airport" />

      {/* Renders only where all twelve months are measured (open_meteo) — a
          gpt_seed destination gets no section, not an estimated one. */}
      <ClimateSection slug={d.slug} name={d.name} />

      {/* Full guide coming soon */}
      <section className="mx-auto mt-16 max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-dashed border-accent/40 bg-accent/8 p-8 text-center sm:p-10">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/15 text-accent">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground sm:text-3xl">Full {d.name} guide coming soon</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            We&apos;re writing an in-depth guide to {d.name} — attractions, food, hotels, transport and the best time to visit. Meanwhile, search live fares above and grab a deal.
          </p>
        </div>
      </section>

      {/* FAQ — schema mirrors the visible items exactly, per FaqSection's rule. */}
      {faq && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(liteFaqJsonLd(faq)).replace(/</g, "\\u003c") }}
          />
          <FaqSection items={faq} city={d.name} />
        </>
      )}

      {/* Country siblings — cheapest first, with the observed fare where we
          hold one. No price line renders where we hold none. */}
      {countrySiblings.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Same country</p>
          <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">More of {d.country}</h2>
            {countryPageSlug && (
              <Link href={`/${countryPageSlug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">
                All places to visit in {d.country}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {countrySiblings.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="group rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
                <span className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Flights to {s.name}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
                </span>
                {s.fareLabel && <span className="mt-1 block truncate text-xs font-medium text-accent">{s.fareLabel}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related in continent */}
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Nearby</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">More flights in {d.continent}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className="group flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 transition hover:-translate-y-0.5 hover:border-accent">
                <span className="text-sm font-semibold text-foreground">Flights to {r.name}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
