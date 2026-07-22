import Link from "next/link";
import type { Destination } from "@/app/data/destinations";
import { usdStr } from "@/app/lib/format";

export function DestinationCard({ d, featured = false }: { d: Destination; featured?: boolean }) {
  return (
    <Link
      href={`/${d.slug}`}
      className={`group relative block overflow-hidden rounded-3xl border border-border shadow-elegant ${
        featured ? "h-[420px] sm:h-[480px]" : "h-[360px]"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={d.image}
        alt={`${d.city}, ${d.country}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur">
        from <span className="text-accent">{usdStr(d.price)}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">{d.country}</p>
        <h3 className={`mt-1 font-serif font-semibold ${featured ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
          {d.city}
        </h3>
        <p className={`mt-1 text-sm text-white/80 ${featured ? "max-w-lg" : "line-clamp-1"}`}>{d.tagline}</p>
      </div>
    </Link>
  );
}
