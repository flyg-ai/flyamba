import { ALL_DESTINATIONS } from "@/app/data/all-destinations";
import { getFaresByOrigin, formatFareLabelShort, type UsFare } from "./fares";
import { buildDestinations } from "./climate";
import { HUB_CITY_SET } from "./hubs";
import type { Departure } from "./departures";

/**
 * Everything one /cheap-flights-from-<city> page renders, assembled server-side.
 *
 * SERVER ONLY — it pulls the service-role Supabase client through fares.ts and
 * climate.ts. The shape it returns is plain and serializable so a client
 * component could take it as props.
 *
 * Each page reads ITS OWN origin. A page headed Atlanta must not quote New York:
 * `originForCountry` sends every US visitor to NYC by design, which is right for
 * the homepage and wrong here, where the city is the whole subject.
 */

export type DepartureRoute = {
  slug: string;
  name: string;
  country: string;
  image: string;
  priceUsd: number;
  fareLabel: string;
  /** Average daily high at the destination this month, °C. Null when unmeasured. */
  tempC: number | null;
  seaTempC: number | null;
  precipitationMm: number | null;
  isHub: boolean;
};

export type DepartureData = {
  /** Every destination we hold a fare for from this city, cheapest first. */
  routes: DepartureRoute[];
  /** The subset that is genuinely warm this month, warmest first. */
  warm: DepartureRoute[];
  monthLabel: string;
  /** How many destinations the upstream returned for this origin. */
  total: number;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export async function getDepartureData(d: Departure, monthIndex: number): Promise<DepartureData> {
  const [faresBySlug, climate] = await Promise.all([
    getFaresByOrigin(d.iata),
    buildDestinations(monthIndex),
  ]);

  const catalog = new Map(ALL_DESTINATIONS.map((x) => [x.slug, x]));
  const climateBySlug = new Map(climate.map((c) => [c.slug, c]));

  const routes: DepartureRoute[] = [];
  for (const [slug, options] of Object.entries(faresBySlug)) {
    const fare = options[0];
    const cat = catalog.get(slug);
    if (!fare || !cat) continue;
    // A route from a city to itself is not a route.
    if (cat.iata?.toUpperCase() === d.iata) continue;

    const c = climateBySlug.get(slug);
    const usFare: UsFare = { fare, origin: d.iata as UsFare["origin"] };
    routes.push({
      slug,
      name: cat.name,
      country: cat.country,
      image: cat.thumbnail || cat.image,
      priceUsd: fare.priceUsd,
      fareLabel: formatFareLabelShort(usFare),
      tempC: c?.tempC ?? null,
      seaTempC: c?.seaTempC ?? null,
      precipitationMm: c?.precipitationMm ?? null,
      isHub: HUB_CITY_SET.has(slug),
    });
  }

  routes.sort((a, b) => a.priceUsd - b.priceUsd);

  // Same 75–88 °F window the warm guide opens on, so the two agree on what "warm"
  // means rather than each page inventing a threshold.
  const warm = routes
    .filter((r) => r.tempC != null && r.tempC >= 24 && r.tempC <= 31)
    .sort((a, b) => (b.tempC ?? 0) - (a.tempC ?? 0));

  return { routes, warm, monthLabel: MONTHS[monthIndex], total: routes.length };
}
