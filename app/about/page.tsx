import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { SITE } from "@/app/lib/destination-helpers";
import { CONTACT_EMAIL } from "@/app/components/LegalPage";
import { MessageSquare, Sparkles, Plane, ArrowRight, Compass, Shield, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Flyamba — Smarter flight search",
  description:
    "Flyamba is an AI-powered flight search built to make finding cheap flights easier. Describe your trip in plain words — our AI does the rest.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: "About Flyamba — Smarter flight search",
    description: "AI-powered flight search built for curious travelers. Describe your trip — we handle the rest.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
  ],
};

const STEPS = [
  {
    icon: MessageSquare,
    title: "Describe your trip",
    desc: "Write freely — a destination, a month, a budget, or just a mood. No forms, no dropdowns, no filters to fill in.",
  },
  {
    icon: Sparkles,
    title: "Our AI finds the match",
    desc: "It reads your intent — season, budget, flight time, the kind of trip you want — and picks destinations that genuinely fit.",
  },
  {
    icon: Plane,
    title: "Book direct",
    desc: "Follow a result straight through to the airline or booking site. We never sit between you and your ticket.",
  },
];

const VALUES = [
  { icon: Sparkles, title: "AI that actually helps", desc: "Not a chatbot for the sake of it — real time saved on real trips." },
  { icon: Compass, title: "Made for curious travelers", desc: "Editorial curation, not just spreadsheets of flights." },
  { icon: Shield, title: "Honest & transparent", desc: "No hidden fees, no dark patterns. Book direct with airlines." },
  { icon: Heart, title: "Built with care", desc: "By a small team of travel and tech enthusiasts." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">About Flyamba</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.1] text-foreground sm:text-6xl">
            Smarter flight search for <span className="italic text-gradient-accent">curious travelers</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Searching for flights hasn&apos;t really improved in a decade. Flyamba rebuilds it around AI — so you can
            describe a trip the way you&apos;d describe it to a friend, and get back flights that actually fit.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Image
            src="/images/content/photo-1436491865332-7a61a109cc05.avif"
            alt="Plane wing above the clouds"
            width={1600}
            height={840}
            className="h-[420px] w-full rounded-[2rem] object-cover shadow-elegant"
            priority
          />
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-foreground">Our story</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            Flyamba started from a simple frustration. Every flight search asked the same rigid questions — origin,
            destination, exact dates — when what we actually wanted was something looser. Somewhere warm in November.
            A cheap weekend in Europe. Anywhere, really, as long as it&apos;s under a certain price.
          </p>
          <p>
            Traditional search engines can&apos;t answer that. They need you to already know the answer. So we built
            the opposite: a search that starts with intent rather than parameters, reads what you mean, and works out
            the destination for you.
          </p>
          <p>
            Around that we added proper editorial guides — attractions, restaurants, transport, weather, what a trip
            actually costs — because finding a cheap flight is only half of planning a trip. Flyamba is{" "}
            <strong className="text-foreground">completely free to use</strong>, with no booking fees and no account
            required.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-foreground">Our mission</h2>
        <div className="mt-6 rounded-[2rem] border border-accent/25 bg-gradient-to-br from-accent/12 to-accent/[0.04] p-8 sm:p-10">
          <p className="font-serif text-2xl font-semibold leading-relaxed text-foreground">
            &quot;We believe everyone should get to see the world. AI makes finding the trip simpler, cheaper and more
            personal — so planning it feels as good as taking it.&quot;
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-foreground">How it works</h2>
        <div className="mt-8 space-y-4">
          {STEPS.map((s, i) => (
            <div key={s.title} className="flex items-start gap-5 rounded-3xl border border-border bg-card p-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent/15 text-accent">
                <s.icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  <span className="mr-2 text-accent">{i + 1}.</span>
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we stand for */}
      <section className="mx-auto max-w-5xl px-4 pt-16 sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-foreground">What we stand for</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl border border-border bg-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                <v.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* We're not a travel agency */}
      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-foreground">We&apos;re not a travel agency</h2>
        <div className="mt-6 space-y-4 rounded-3xl border border-border bg-card p-8 text-muted-foreground">
          <p className="leading-relaxed">
            Flyamba shows prices and information from airlines and travel providers. We don&apos;t make bookings and we
            never handle payments.
          </p>
          <p className="leading-relaxed">
            When you find a flight you like, we send you straight to the airline or booking site — the whole purchase
            happens there. Prices move constantly, and availability is only ever confirmed at the moment you book.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
        <h2 className="font-serif text-4xl font-semibold text-foreground">The team</h2>
        <div className="mt-6 space-y-4 rounded-3xl border border-border bg-card p-8 text-muted-foreground">
          <p className="leading-relaxed">
            Flyamba was founded by a small team of travel and tech enthusiasts who believed AI could make finding the
            right trip simpler and more enjoyable — without clunky search forms or expensive middlemen.
          </p>
          <p className="leading-relaxed">
            Every guide on Flyamba is researched and fact-checked to be genuinely useful rather than filler. We also
            work with contributing writers and travelers who visit these places in person, which gives our guides and
            recommendations more weight.
          </p>
          <p className="leading-relaxed">
            Want to talk to us? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            — we usually reply within 24 hours.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-glow transition hover:scale-105"
        >
          Start searching <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
