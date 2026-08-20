/**
 * The cities that get a /cheap-flights-from-<city> page.
 *
 * Chosen on measured US search volume, not on how much data we hold: the whole
 * set has a median keyword difficulty of 2 and three sit at 0–1, which is the
 * easiest organic opportunity in the keyword work. Row count deliberately did not
 * decide — San Diego has 69 destinations and covers what a San Diego traveller
 * expects, while Seattle has 127 and no Caribbean, which is geography rather than
 * a gap.
 *
 * `iata` is the metropolitan code Travelpayouts and origin_fares use. Adding a
 * city here is not enough on its own; it also has to be in SUPPORTED_ORIGINS so
 * the nightly job pulls fares for it.
 */
export type Departure = {
  /** URL segment. The whole phrase, because that is the search term. */
  slug: string;
  city: string;
  /** IATA metro code, as origin_fares stores it. */
  iata: string;
  /**
   * True when Americans search the airport code as well as the city name. Only
   * these three carry the code in the title — running the pattern across all
   * fourteen would read as a list of abbreviations rather than as English.
   */
  codeIsSearched: boolean;
  /** Monthly US search volume for "cheap flights from <city>", Ahrefs Aug 2026. */
  volume: number;
  state: string;
};

export const DEPARTURES: Departure[] = [
  { slug: "atlanta", city: "Atlanta", iata: "ATL", codeIsSearched: false, volume: 4600, state: "Georgia" },
  { slug: "chicago", city: "Chicago", iata: "CHI", codeIsSearched: false, volume: 4500, state: "Illinois" },
  { slug: "dallas", city: "Dallas", iata: "DFW", codeIsSearched: false, volume: 4100, state: "Texas" },
  { slug: "houston", city: "Houston", iata: "HOU", codeIsSearched: false, volume: 3900, state: "Texas" },
  { slug: "minneapolis", city: "Minneapolis", iata: "MSP", codeIsSearched: true, volume: 3500, state: "Minnesota" },
  { slug: "denver", city: "Denver", iata: "DEN", codeIsSearched: false, volume: 2500, state: "Colorado" },
  { slug: "detroit", city: "Detroit", iata: "DTT", codeIsSearched: false, volume: 2400, state: "Michigan" },
  { slug: "phoenix", city: "Phoenix", iata: "PHX", codeIsSearched: false, volume: 2200, state: "Arizona" },
  { slug: "tampa", city: "Tampa", iata: "TPA", codeIsSearched: false, volume: 2200, state: "Florida" },
  { slug: "seattle", city: "Seattle", iata: "SEA", codeIsSearched: false, volume: 2100, state: "Washington" },
  { slug: "los-angeles", city: "Los Angeles", iata: "LAX", codeIsSearched: true, volume: 1800, state: "California" },
  { slug: "salt-lake-city", city: "Salt Lake City", iata: "SLC", codeIsSearched: true, volume: 1800, state: "Utah" },
  { slug: "austin", city: "Austin", iata: "AUS", codeIsSearched: false, volume: 1600, state: "Texas" },
  { slug: "san-diego", city: "San Diego", iata: "SAN", codeIsSearched: false, volume: 1300, state: "California" },
];

export const DEPARTURE_BY_SLUG = new Map(DEPARTURES.map((d) => [d.slug, d]));

export const departureHref = (slug: string) => `/cheap-flights-from-${slug}`;

/** "Minneapolis (MSP)" where the code is searched, plain city name otherwise. */
export function headingName(d: Departure): string {
  return d.codeIsSearched ? `${d.city} (${d.iata})` : d.city;
}

/** "Minneapolis MSP" — the code without brackets, for the title tag. */
export function titleName(d: Departure): string {
  return d.codeIsSearched ? `${d.city} ${d.iata}` : d.city;
}
