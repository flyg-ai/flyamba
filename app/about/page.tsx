import type { Metadata } from "next";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { Sparkles, Compass, Shield, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Flyamba — Smarter flight search for curious travelers",
  description:
    "Flyamba blends warm travel curation with AI-powered flight search. Meet the team building the future of trip planning.",
  openGraph: {
    title: "About Flyamba",
    description: "Warm, AI-powered flight search built for people who love to travel.",
  },
};

const values = [
  { icon: Sparkles, title: "AI that actually helps", desc: "Not a chatbot for the sake of it — real time saved on real trips." },
  { icon: Compass, title: "Made for curious travelers", desc: "Editorial curation, not just spreadsheets of flights." },
  { icon: Shield, title: "Honest & transparent", desc: "No hidden fees, no dark patterns. Book direct with airlines." },
  { icon: Heart, title: "Built with love", desc: "By a small team of travelers, engineers and designers." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative isolate overflow-hidden pt-32">
        <div className="mx-auto max-w-4xl px-4 pb-16 pt-16 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">About Flyamba</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold text-foreground sm:text-6xl">
            Smarter flight search for <span className="italic text-gradient-accent">curious travelers</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Flyamba was born from a simple frustration: searching for flights hasn&apos;t gotten better in a decade.
            We rebuilt it from scratch, with AI at the center — so you can describe your trip like you would to a friend,
            and get back the flights that actually fit.
          </p>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
            alt="Plane wing over clouds"
            className="h-[420px] w-full rounded-[2rem] object-cover shadow-elegant"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-foreground">Our mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Travel is one of the most rewarding things a person can do. Finding the flights shouldn&apos;t be the worst part.
              We believe planning a trip should feel as inspiring as taking one.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Flyamba combines editorial-quality destination curation with AI that understands nuance — &quot;warm in April,
              under 3000 kr, not too touristy.&quot; Just tell us the vibe.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-border bg-card p-6">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
