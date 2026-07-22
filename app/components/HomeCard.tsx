import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/app/data/destinations";
import { usdStr } from "@/app/lib/format";
import { currentWeatherBadge } from "@/app/lib/destination-helpers";
import { Plane } from "lucide-react";

/**
 * Destination card matching the flyg.ai style: image with hover zoom, price
 * pill top-right, weather badge overlay, and flight time. Uses next/image
 * (fill + object-cover in a relative container) so images never overflow.
 */
export function HomeCard({
  d,
  className = "",
  featured = false,
}: {
  d: Destination;
  className?: string;
  featured?: boolean;
}) {
  const weather = currentWeatherBadge(d);
  return (
    <Link
      href={`/${d.slug}`}
      className={`group relative block overflow-hidden rounded-3xl border border-border shadow-elegant ${
        featured ? "h-[420px] sm:h-[480px]" : "h-72"
      } ${className}`}
    >
      <Image
        src={d.image}
        alt={`${d.city}, ${d.country}`}
        fill
        sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 340px"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      {/* Price pill */}
      <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm backdrop-blur">
        from <span className="text-accent">{usdStr(d.price)}</span>
      </div>

      {/* Weather badge */}
      {weather && (
        <div className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          {weather}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <p className="text-xs uppercase tracking-[0.2em] text-white/70">{d.country}</p>
        <h3 className={`mt-1 font-serif font-semibold ${featured ? "text-4xl sm:text-5xl" : "text-2xl"}`}>{d.city}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
          <Plane className="h-3.5 w-3.5" /> {d.flightTime ?? `${d.avgFlightHours}h`} · direct
        </p>
      </div>
    </Link>
  );
}
