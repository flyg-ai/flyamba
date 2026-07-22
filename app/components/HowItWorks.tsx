import { MessagesSquare, Sparkles, Plane } from "lucide-react";

const steps = [
  {
    icon: MessagesSquare,
    title: "Describe your trip",
    desc: "Tell our AI where you want to go — or just the vibe. Warm, cheap, quick, romantic. It gets it.",
  },
  {
    icon: Sparkles,
    title: "AI does the searching",
    desc: "Flyamba scans hundreds of routes and airlines in seconds, factoring in weather, price and timing.",
  },
  {
    icon: Plane,
    title: "Book with confidence",
    desc: "Compare curated options side by side and book directly with the airline. No hidden fees.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">How it works</p>
        <h2 className="mt-3 font-serif text-4xl font-semibold text-foreground sm:text-5xl">
          Smarter flight search, in three steps
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Skip the endless tabs and filter juggling. Just tell Flyamba what you're dreaming of.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="absolute -right-6 -top-6 font-serif text-[8rem] leading-none text-accent/10">
              {i + 1}
            </div>
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
