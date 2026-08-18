import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Scale, ArrowRight } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { SITE } from "@/app/lib/destination-helpers";
import { clampTitle, clampDescription } from "@/app/lib/seo";
import { usdStr } from "@/app/lib/format";
import { getComparable, type Comparable } from "@/app/compare/comparable";
import { TOP_PAIRS, parsePair, pairSlug, pairHref } from "@/app/compare/pairs";
import { PairView } from "@/app/compare/PairView";

// Static head-to-head pages: /compare/barcelona-vs-rome.
//
// dynamicParams stays TRUE so any valid pair of comparable slugs renders on
// demand — TOP_PAIRS is a pre-render and sitemap list, not a whitelist. A pair
// naming an unknown slug 404s; a pair in non-alphabetical order permanently
// redirects to the canonical one, so there is exactly one URL per comparison.
export const dynamicParams = true;

export function generateStaticParams() {
  return TOP_PAIRS.map((comparison) => ({ comparison }));
}

/** Resolve a URL segment to its two destinations, or null. */
function resolve(segment: string): { a: Comparable; b: Comparable } | null {
  const parsed = parsePair(segment);
  if (!parsed) return null;
  const a = getComparable(parsed[0]);
  const b = getComparable(parsed[1]);
  if (!a || !b) return null;
  return { a, b };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ comparison: string }>;
}): Promise<Metadata> {
  const { comparison } = await params;
  const resolved = resolve(comparison);

  if (!resolved) {
    return { title: "Comparison not found | Flyamba", robots: { index: false } };
  }

  const { a, b } = resolved;
  const canonical = pairSlug(a.slug, b.slug);
  const year = new Date().getFullYear();

  const title = clampTitle(`${a.name} vs ${b.name} ${year} — Which to Visit? | Flyamba`);
  const description = clampDescription(
    `${a.name} or ${b.name}? Compare flight prices, weather, best months and ratings for beaches, nightlife and food — then let our AI pick one for you.`,
  );

  return {
    title,
    description,
    alternates: { canonical: `${SITE}${pairHref(canonical)}` },
    openGraph: {
      title: `${a.name} vs ${b.name} | Flyamba`,
      description,
      type: "article",
      images: [{ url: `${SITE}${a.image}` }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ comparison: string }>;
}) {
  const { comparison } = await params;
  const resolved = resolve(comparison);
  if (!resolved) notFound();

  const { a, b } = resolved;

  // One URL per comparison: /compare/rome-vs-athens → /compare/athens-vs-rome.
  const canonical = pairSlug(a.slug, b.slug);
  if (canonical !== comparison) permanentRedirect(pairHref(canonical));

  // Order the columns the way the URL reads.
  const parsed = parsePair(comparison)!;
  const pair = parsed.map((s) => getComparable(s)!) as Comparable[];
  const [first, second] = pair;
  const year = new Date().getFullYear();

  // Deterministic summary — no AI. The page has to stand on its own for a
  // crawler and for anyone who never clicks the recommendation button.
  const cheaper =
    first.priceSek && second.priceSek && first.priceSek !== second.priceSek
      ? first.priceSek < second.priceSek
        ? first
        : second
      : null;
  const warmer =
    first.summerTemp && second.summerTemp && first.summerTemp !== second.summerTemp
      ? first.summerTemp > second.summerTemp
        ? first
        : second
      : null;

  const faqs = [
    {
      q: `Is ${first.name} or ${second.name} cheaper to fly to?`,
      a: cheaper
        ? `${cheaper.name} is currently the cheaper of the two, with fares from ${usdStr(cheaper.priceSek)} against ${usdStr((cheaper.slug === first.slug ? second : first).priceSek)}. Fares move constantly, so check the low fare calendar for your dates.`
        : `Fares to ${first.name} and ${second.name} are close enough that the cheaper one depends entirely on your dates. Check the low fare calendar for both.`,
    },
    {
      q: `Which is warmer, ${first.name} or ${second.name}?`,
      a: warmer
        ? `${warmer.name} is warmer in summer, averaging around ${warmer.summerTemp}°C against ${(warmer.slug === first.slug ? second : first).summerTemp}°C.`
        : `${first.name} and ${second.name} have similar summer temperatures, so weather alone is unlikely to decide this one.`,
    },
    {
      q: `When is the best time to visit ${first.name} and ${second.name}?`,
      a: `${first.name}: ${first.bestMonths ?? "shoulder season tends to offer the best balance of weather and price"}. ${second.name}: ${second.bestMonths ?? "shoulder season tends to offer the best balance of weather and price"}.`,
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Other pre-rendered pairs featuring either city.
  const related = TOP_PAIRS.filter((p) => {
    if (p === canonical) return false;
    const parts = parsePair(p);
    return parts !== null && (parts.includes(first.slug) || parts.includes(second.slug));
  }).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />

        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Compare", href: "/compare" },
            { name: `${first.name} vs ${second.name}` },
          ]}
        />

        <div className="mt-6 max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            <Scale className="h-3.5 w-3.5" /> Head to head
          </p>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
            {first.name} vs {second.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {cheaper
              ? `${cheaper.name} is the cheaper flight of the two${warmer ? `, ${warmer.name} the warmer` : ""}.`
              : `Fares to ${first.name} and ${second.name} are close${warmer ? `, but ${warmer.name} is the warmer of the two` : ""}.`}{" "}
            Here is how they compare on price, weather and what there is to do — updated for {year}.
          </p>
        </div>

        <div className="mt-10">
          <PairView pair={pair} />
        </div>

        {/* FAQ */}
        <section className="mt-16 max-w-3xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            {first.name} vs {second.name}: common questions
          </h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-foreground">{f.q}</dt>
                <dd className="mt-1.5 text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              More comparisons
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {related.map((p) => {
                const parts = parsePair(p)!;
                const [x, y] = parts.map((s) => getComparable(s)!);
                return (
                  <Link
                    key={p}
                    href={pairHref(p)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                  >
                    {x.name} vs {y.name} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                );
              })}
            </div>
            <Link
              href="/compare"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition hover:underline"
            >
              Compare any destinations yourself <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
