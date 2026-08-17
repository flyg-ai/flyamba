import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { SITE } from "@/app/lib/destination-helpers";
import { CONTACT_EMAIL } from "@/app/components/LegalPage";
import { Mail, Clock, Handshake, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Flyamba",
  description:
    "Questions, feedback or partnership enquiries — email contact@flyamba.com. We typically respond within 24 hours.",
  alternates: { canonical: `${SITE}/contact` },
  openGraph: {
    title: "Contact Flyamba",
    description: "Email contact@flyamba.com — we typically respond within 24 hours.",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE}/contact` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Flyamba",
    url: `${SITE}/contact`,
  },
];

const REASONS = [
  { icon: MessageSquare, title: "Feedback", desc: "Something broken, confusing or missing? Tell us — it goes straight to the people building it." },
  { icon: Handshake, title: "Partnerships", desc: "Airlines, tourism boards and travel brands: we're open to working together." },
  { icon: Mail, title: "Press", desc: "Writing about AI and travel search? Happy to help with background or comment." },
];

export default function Contact() {
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

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Get in touch</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-foreground sm:text-6xl">Contact Flyamba</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Have a question, feedback or partnership inquiry? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Email — the primary action on this page. */}
        <div className="mt-12 rounded-[2rem] border border-border bg-card p-8 text-center shadow-elegant sm:p-12">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
            <Mail className="h-6 w-6" />
          </span>
          <p className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">Email us at</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block break-all font-serif text-3xl font-semibold text-accent transition hover:underline sm:text-4xl"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4 text-accent" />
            We typically respond within 24 hours
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {REASONS.map((r) => (
            <div key={r.title} className="rounded-3xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <r.icon className="h-4 w-4" />
              </span>
              <h2 className="mt-4 font-serif text-lg font-semibold text-foreground">{r.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl font-semibold text-foreground">Booked a flight and need help?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Flyamba is a search tool — we don&apos;t sell tickets or hold bookings, so we have no access to your
            reservation. For changes, cancellations, refunds or baggage, contact the airline or booking site you
            purchased from directly. More detail in our <Link href="/terms" className="font-semibold text-accent hover:underline">Terms of Service</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
