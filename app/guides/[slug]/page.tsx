import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { FlightCTA } from "@/app/components/FlightCTA";
import { guides, getGuideBySlug, guideHref } from "@/app/data/guides";
import { CALENDAR_DESTINATIONS } from "@/app/lib/low-fare";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";
import { Clock, ArrowRight, CalendarDays } from "lucide-react";

const CITY_LABEL = new Map(CALENDAR_DESTINATIONS.map((d) => [d.slug, d.city]));

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) return { title: "Guide not found — Flyamba", robots: { index: false } };

  const title = clampTitle(`${g.title} | Flyamba`);
  const description = clampDescription(g.excerpt);
  const canonical = `${SITE}${guideHref(g)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: g.publishedAt,
      images: [g.image],
    },
    twitter: { card: "summary_large_image", images: [g.image] },
  };
}

const prettyDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuideBySlug(slug);
  if (!g) notFound();

  const url = `${SITE}${guideHref(g)}`;
  const cityLabel = g.destination ? (CITY_LABEL.get(g.destination) ?? g.destination) : null;

  // Same destination first, then same category, so a guide about London leads
  // with other London guides rather than an unrelated tips article.
  const related = [
    ...guides.filter((x) => x.slug !== g.slug && g.destination && x.destination === g.destination),
    ...guides.filter((x) => x.slug !== g.slug && x.category === g.category && x.destination !== g.destination),
    ...guides.filter((x) => x.slug !== g.slug),
  ]
    .filter((x, i, arr) => arr.findIndex((y) => y.slug === x.slug) === i)
    .slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE}/guides` },
        { "@type": "ListItem", position: 3, name: g.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.excerpt,
      image: `${SITE}${g.image}`,
      datePublished: g.publishedAt,
      dateModified: g.publishedAt,
      author: { "@type": "Organization", name: "Flyamba", url: SITE },
      publisher: {
        "@type": "Organization",
        name: "Flyamba",
        url: SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/images/destinations/placeholder.avif` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
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

      <main className="pb-20 pt-28">
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="text-sm text-muted-foreground">
            <Link href="/guides" className="transition hover:text-accent">
              Guides
            </Link>
            {cityLabel && (
              <>
                <span className="mx-2 opacity-50">/</span>
                <Link href={`/${g.destination}`} className="transition hover:text-accent">
                  {cityLabel}
                </Link>
              </>
            )}
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-accent">{g.category}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            {g.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{g.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" /> {g.readTime} read
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-accent" />
              <time dateTime={g.publishedAt}>{prettyDate(g.publishedAt)}</time>
            </span>
          </div>

          <div className="relative mt-10 h-[320px] overflow-hidden rounded-[2rem] sm:h-[420px]">
            <Image src={g.image} alt={g.title} fill priority sizes="(max-width:1024px) 100vw, 768px" className="object-cover" />
          </div>

          <div className="guide-prose mt-12" dangerouslySetInnerHTML={{ __html: g.content }} />

          {g.destination && cityLabel && (
            <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/12 to-accent/[0.04] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-lg font-semibold text-foreground">Planning a trip to {cityLabel}?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compare fares and find the cheapest dates to fly.
                </p>
              </div>
              <Link
                href={`/${g.destination}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
              >
                Find flights to {cityLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </article>

        {/* Only for guides with no destination — one with a destination already
            ends with its own "Planning a trip to X?" box linking to the same page,
            and two identical calls to action in a row help nobody. */}
        {!g.destination && (
          <section className="mx-auto mt-16 max-w-3xl px-4 sm:px-6">
            <FlightCTA />
          </section>
        )}

        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Related guides</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={guideHref(r)}
                  className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      sizes="(max-width:1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-neutral-900">
                      {r.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-base font-semibold leading-tight text-foreground">{r.title}</h3>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {r.readTime} read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/guides"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              View all guides <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
