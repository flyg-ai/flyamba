// Catalogue behind /low-fare-calendar/[slug] and the per-airline calendar pages.
//
// Kept separate from app/data/all-destinations.ts because these 22 are the cities
// that also have a full editorial hub — the calendar pages link back into those
// guides, so the two lists have to stay in step.

export type CalendarDestination = {
  slug: string;
  city: string;
  country: string;
  iata: string;
  /** Airport name, used in the intro copy and the "which airport" FAQ. */
  airport: string;
  /** Cheapest and priciest months, for the intro and the seasonality FAQ. */
  cheapest: string;
  priciest: string;
  /** One sentence on what drives this route's price pattern. */
  pattern: string;
  /** Carriers that actually fly the route, for the airlines FAQ. */
  airlines: string;
  /** Typical nonstop time from London, the default calendar origin. */
  flightTime: string;
};

export const CALENDAR_DESTINATIONS: CalendarDestination[] = [
  { slug: "barcelona", city: "Barcelona", country: "Spain", iata: "BCN", airport: "Barcelona–El Prat (BCN)", cheapest: "February", priciest: "August", pattern: "Fares track the Mediterranean beach season, climbing steeply from June and peaking in August before falling away through October.", airlines: "Vueling, Ryanair, easyJet, British Airways and Iberia", flightTime: "about 2h 10m" },
  { slug: "london", city: "London", country: "United Kingdom", iata: "LHR", airport: "Heathrow (LHR), with Gatwick, Stansted and Luton nearby", cheapest: "January", priciest: "July", pattern: "One of the densest route networks in the world, so fares stay low year-round outside school holidays and the December peak.", airlines: "British Airways, easyJet, Ryanair, Norwegian and Virgin Atlantic", flightTime: "the default origin for this calendar" },
  { slug: "paris", city: "Paris", country: "France", iata: "CDG", airport: "Charles de Gaulle (CDG) and Orly (ORY)", cheapest: "February", priciest: "July", pattern: "A short, competitive hop with fares that stay flat most of the year and spike around summer and the Christmas markets.", airlines: "Air France, easyJet, British Airways, Ryanair and Vueling", flightTime: "about 1h 20m" },
  { slug: "rome", city: "Rome", country: "Italy", iata: "FCO", airport: "Fiumicino (FCO), with Ciampino (CIA) for low-cost carriers", cheapest: "February", priciest: "July", pattern: "Shoulder seasons are the sweet spot — April, May and October combine mild weather with fares well below the summer peak.", airlines: "ITA Airways, Ryanair, easyJet, British Airways and Wizz Air", flightTime: "about 2h 35m" },
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", iata: "AMS", airport: "Schiphol (AMS)", cheapest: "February", priciest: "August", pattern: "A short-haul workhorse route with very stable pricing; tulip season in April and the summer peak are the two reliable jumps.", airlines: "KLM, easyJet, British Airways, Transavia and Norwegian", flightTime: "about 1h 15m" },
  { slug: "lisbon", city: "Lisbon", country: "Portugal", iata: "LIS", airport: "Humberto Delgado (LIS)", cheapest: "February", priciest: "August", pattern: "Portugal's mild winters keep off-season fares genuinely low, while July and August carry a steep premium.", airlines: "TAP Air Portugal, Ryanair, easyJet and British Airways", flightTime: "about 2h 45m" },
  { slug: "prague", city: "Prague", country: "Czechia", iata: "PRG", airport: "Václav Havel (PRG)", cheapest: "February", priciest: "December", pattern: "Unusually, the December Christmas-market surge rivals summer — late winter and early spring are markedly cheaper.", airlines: "Ryanair, easyJet, Wizz Air, British Airways and Lufthansa", flightTime: "about 2h" },
  { slug: "athens", city: "Athens", country: "Greece", iata: "ATH", airport: "Eleftherios Venizelos (ATH)", cheapest: "February", priciest: "July", pattern: "Fares follow the Greek island season closely — the July and August peak is roughly double the February floor.", airlines: "Aegean, Olympic Air, Ryanair, easyJet and British Airways", flightTime: "about 3h 45m" },
  { slug: "tokyo", city: "Tokyo", country: "Japan", iata: "NRT", airport: "Narita (NRT) and Haneda (HND)", cheapest: "February", priciest: "July", pattern: "A long-haul route where booking lead time matters more than season; cherry-blossom weeks in late March also carry a premium.", airlines: "Japan Airlines, ANA, British Airways, Lufthansa and Finnair", flightTime: "about 12h" },
  { slug: "bangkok", city: "Bangkok", country: "Thailand", iata: "BKK", airport: "Suvarnabhumi (BKK), with Don Mueang (DMK) for budget carriers", cheapest: "February", priciest: "June", pattern: "The cool dry season from November to February is both the nicest time to visit and among the cheapest — a rare alignment.", airlines: "Thai Airways, Emirates, Qatar Airways, British Airways and EVA Air", flightTime: "about 11h 30m" },
  { slug: "palma", city: "Palma", country: "Spain", iata: "PMI", airport: "Palma de Mallorca (PMI)", cheapest: "February", priciest: "July", pattern: "A pure summer-season route: capacity collapses in winter, so the cheapest fares sit either side of the peak in May and October.", airlines: "Ryanair, easyJet, Vueling, Jet2 and Eurowings", flightTime: "about 2h 20m" },
  { slug: "tenerife", city: "Tenerife", country: "Spain", iata: "TFS", airport: "Tenerife South (TFS) and Tenerife North (TFN)", cheapest: "May", priciest: "August", pattern: "The Canaries invert the usual pattern — winter sun keeps demand high from December to March, so late spring is cheapest.", airlines: "Ryanair, easyJet, Jet2, TUI and Iberia Express", flightTime: "about 4h 20m" },
  { slug: "ibiza", city: "Ibiza", country: "Spain", iata: "IBZ", airport: "Ibiza Airport (IBZ)", cheapest: "April", priciest: "August", pattern: "Almost entirely seasonal: most routes run May to October only, and fares climb sharply once the club season opens.", airlines: "Ryanair, easyJet, Vueling, British Airways and Jet2", flightTime: "about 2h 30m" },
  { slug: "santorini", city: "Santorini", country: "Greece", iata: "JTR", airport: "Santorini (JTR)", cheapest: "April", priciest: "August", pattern: "A small island airport with limited slots and a short season, which makes early booking unusually valuable here.", airlines: "Aegean, Ryanair, easyJet, British Airways and Volotea", flightTime: "about 4h" },
  { slug: "madrid", city: "Madrid", country: "Spain", iata: "MAD", airport: "Adolfo Suárez Madrid–Barajas (MAD)", cheapest: "February", priciest: "August", pattern: "An inland city rather than a beach route, so summer demand is softer — the August peak is milder than on the coast.", airlines: "Iberia, Ryanair, easyJet, British Airways and Air Europa", flightTime: "about 2h 25m" },
  { slug: "dubrovnik", city: "Dubrovnik", country: "Croatia", iata: "DBV", airport: "Dubrovnik (DBV)", cheapest: "April", priciest: "August", pattern: "Sharply seasonal — the Adriatic summer commands a heavy premium, while May and late September are far better value.", airlines: "Croatia Airlines, Ryanair, easyJet, British Airways and Wizz Air", flightTime: "about 2h 45m" },
  { slug: "mykonos", city: "Mykonos", country: "Greece", iata: "JMK", airport: "Mykonos (JMK)", cheapest: "May", priciest: "August", pattern: "Peak-season fares are among the steepest in the Mediterranean; shoulder months either side of summer save the most.", airlines: "Aegean, Ryanair, easyJet, British Airways and Volotea", flightTime: "about 3h 50m" },
  { slug: "new-york", city: "New York", country: "United States", iata: "JFK", airport: "JFK, with Newark (EWR) and LaGuardia (LGA)", cheapest: "January", priciest: "July", pattern: "A high-capacity transatlantic route where fares swing widely — January and February are consistently the cheapest months.", airlines: "British Airways, Delta, United, American Airlines and Norse Atlantic", flightTime: "about 8h" },
  { slug: "bali", city: "Bali", country: "Indonesia", iata: "DPS", airport: "Ngurah Rai (DPS)", cheapest: "February", priciest: "July", pattern: "No nonstop from Europe, so fares depend on connecting hubs — the wet season from January to March is the cheapest window.", airlines: "Emirates, Qatar Airways, Singapore Airlines, Etihad and Turkish Airlines", flightTime: "about 16h with one stop" },
  { slug: "cape-town", city: "Cape Town", country: "South Africa", iata: "CPT", airport: "Cape Town International (CPT)", cheapest: "June", priciest: "December", pattern: "Southern-hemisphere seasons invert the pattern — the European summer is Cape Town's winter, and its cheapest months.", airlines: "British Airways, Virgin Atlantic, Emirates, KLM and Qatar Airways", flightTime: "about 11h 30m" },
  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", iata: "DXB", airport: "Dubai International (DXB)", cheapest: "June", priciest: "December", pattern: "Inverted again — summer heat pushes demand and fares down, while the mild December to February months are the priciest.", airlines: "Emirates, British Airways, flydubai, Etihad and Virgin Atlantic", flightTime: "about 7h" },
  { slug: "reykjavik", city: "Reykjavík", country: "Iceland", iata: "KEF", airport: "Keflavík (KEF)", cheapest: "February", priciest: "July", pattern: "Winter fares are low despite aurora season, making January and February the best value for a northern-lights trip.", airlines: "Icelandair, PLAY, easyJet, British Airways and Wizz Air", flightTime: "about 3h" },
];

export const CALENDAR_BY_SLUG = new Map(CALENDAR_DESTINATIONS.map((d) => [d.slug, d]));

export type CalendarAirline = {
  slug: string;
  name: string;
  /** IATA carrier code, used to filter the calendar to this airline. */
  code: string;
  logo: string;
  /** Short positioning line for the intro. */
  tagline: string;
  /** Long-form intro copy, one paragraph per entry. */
  intro: string[];
  /** Destination slugs this carrier actually serves, for the calendar grid. */
  destinations: string[];
  baggage: string;
  hub: string;
};

export const CALENDAR_AIRLINES: CalendarAirline[] = [
  {
    slug: "ryanair",
    name: "Ryanair",
    code: "FR",
    logo: "/images/airlines/ryanair.png",
    tagline: "Europe's largest low-cost carrier",
    hub: "Dublin, London Stansted and around 90 other bases across Europe",
    baggage: "A small under-seat bag is included. Cabin bags and checked luggage are paid extras, and adding them at the airport costs far more than online.",
    intro: [
      "Ryanair is the cheapest way to fly across Europe for most routes, and its fares swing more day to day than almost any other airline. The same route can cost three times as much on a Friday as it does on a Tuesday, which is exactly what a low fare calendar is for — seeing the whole month at once instead of guessing at dates.",
      "The pattern is consistent. Tuesday and Wednesday departures are almost always the cheapest, Friday evenings and Sunday returns the most expensive. Flying out midweek and returning midweek regularly halves the fare compared with a Friday-to-Sunday weekend, for exactly the same trip.",
      "Ryanair fares also rise steadily as the aircraft fills, so the earlier you book the better — with the caveat that genuinely quiet routes sometimes drop in the last fortnight. Six to eight weeks ahead is the reliable sweet spot for summer travel; for winter city breaks you can often leave it later.",
      "Watch the extras. The headline fare covers a small under-seat bag only, and priority boarding, a cabin bag, checked luggage and seat selection are all charged separately. A €20 fare with €50 of add-ons is no longer a bargain, so compare the total rather than the teaser price.",
    ],
    destinations: ["barcelona", "madrid", "rome", "lisbon", "prague", "athens", "palma", "ibiza", "tenerife", "dubrovnik"],
  },
  {
    slug: "easyjet",
    name: "easyJet",
    code: "U2",
    logo: "/images/airlines/easyjet.png",
    tagline: "Low-cost flights from primary airports",
    hub: "London Gatwick, with bases across the UK and Europe",
    baggage: "One small cabin bag is included. Larger cabin bags, hold luggage and seat selection are paid extras.",
    intro: [
      "easyJet sits between the ultra-low-cost carriers and the full-service airlines. Fares are usually a little higher than Ryanair's, but it flies to primary airports — Paris Charles de Gaulle rather than Beauvais, Milan Malpensa rather than Bergamo — which often makes the total cost of the trip lower once transfers are counted.",
      "Its pricing moves the same way: fares climb as seats sell, and midweek departures undercut weekends substantially. School holidays are the sharpest premium of all, so shifting a trip by a single week either side of half term can cut the fare dramatically.",
      "easyJet publishes seats around a year ahead, and the cheapest fares genuinely do appear early on popular summer routes. For winter and shoulder-season travel there is less urgency, and prices often stay flat until about a month out.",
      "Use the calendar below to see how much a day either way is worth on your route. On short-haul European flights the difference between the best and worst day in the same month is routinely more than the fare itself.",
    ],
    destinations: ["barcelona", "amsterdam", "paris", "lisbon", "prague", "athens", "palma", "ibiza", "tenerife", "reykjavik"],
  },
  {
    slug: "british-airways",
    name: "British Airways",
    code: "BA",
    logo: "/images/airlines/british-airways.png",
    tagline: "Full-service flying from London",
    hub: "London Heathrow and Gatwick",
    baggage: "A cabin bag and a personal item are included on every fare. Checked luggage is included on all but the cheapest short-haul Basic tickets.",
    intro: [
      "British Airways fares include things the low-cost carriers charge for — a full-size cabin bag, seat selection at check-in, and checked luggage on most tickets — so a headline fare that looks higher often is not once bags are added.",
      "Short-haul BA pricing behaves much like easyJet's: midweek is cheaper, weekends and school holidays cost more, and fares rise as the cabin fills. Long-haul is different. Transatlantic and Asian routes reward booking two to three months ahead, and the cheapest departures cluster in January, February and the first half of November.",
      "One quirk worth knowing: BA frequently prices a Saturday-night stay lower on business-heavy routes, because the fare buckets were designed to separate business travellers from leisure ones. On routes like New York or Dubai, shifting a return by a day to include a Saturday can move the price noticeably.",
      "The calendar below shows the whole booking window at once, which makes those patterns visible rather than something you have to know in advance.",
    ],
    destinations: ["barcelona", "rome", "amsterdam", "athens", "new-york", "dubai", "tokyo", "cape-town", "bangkok", "madrid"],
  },
  {
    slug: "lufthansa",
    name: "Lufthansa",
    code: "LH",
    logo: "/images/airlines/lufthansa.png",
    tagline: "Germany's flag carrier and its hub network",
    hub: "Frankfurt and Munich",
    baggage: "A cabin bag and personal item are included. Checked luggage is included on most fares outside the cheapest Economy Light tickets.",
    intro: [
      "Lufthansa is built around its Frankfurt and Munich hubs, which means most journeys involve a connection — and that is precisely where the savings hide. A one-stop routing is frequently far cheaper than the nonstop equivalent, and Lufthansa's network gives it more of those combinations than almost anyone else.",
      "Because fares are hub-driven, the cheapest dates often have less to do with your destination than with how busy Frankfurt is that week. German public holidays and the major trade fairs push prices up across the whole network, sometimes on routes that have nothing to do with the event.",
      "For long-haul, booking two to three months ahead is the reliable approach, and Tuesday and Wednesday departures consistently price below weekends. Economy Light fares exclude checked luggage, so compare the total once bags are added rather than the lead-in fare.",
      "The calendar below shows every cached fare in the booking window, so you can spot the quiet weeks rather than working them out from a hub schedule.",
    ],
    destinations: ["barcelona", "rome", "athens", "prague", "madrid", "tokyo", "bangkok", "dubai", "new-york", "lisbon"],
  },
  {
    slug: "klm",
    name: "KLM",
    code: "KL",
    logo: "/images/airlines/klm.png",
    tagline: "Amsterdam Schiphol and a wide connecting network",
    hub: "Amsterdam Schiphol",
    baggage: "A cabin bag and personal item are included on every fare. Checked luggage is included on all but the cheapest Economy Light tickets.",
    intro: [
      "KLM runs one of Europe's most efficient single-hub operations out of Amsterdam Schiphol, which makes it strong on connecting routes to Asia, Africa and the Americas — often at fares below the nonstop alternatives from other carriers.",
      "Schiphol's compact layout means short connections are realistic, so one-stop KLM itineraries are worth comparing even when a nonstop exists. The saving on long-haul routes is frequently substantial.",
      "KLM's fare pattern follows the standard European shape: midweek departures undercut weekends, Dutch school holidays carry a clear premium, and long-haul rewards booking two to three months out. Tulip season in April and the summer peak are the two predictable jumps on European routes.",
      "Use the calendar to compare a whole month at a glance. On connecting routes the difference between adjacent days is often larger than on point-to-point ones, because availability depends on two flights lining up rather than one.",
    ],
    destinations: ["amsterdam", "barcelona", "rome", "lisbon", "athens", "new-york", "bangkok", "cape-town", "dubai", "tokyo"],
  },
  {
    slug: "norwegian",
    name: "Norwegian",
    code: "DY",
    logo: "/images/airlines/norwegian.png",
    tagline: "Low-cost flying across Europe and the Nordics",
    hub: "Oslo, with bases across Scandinavia",
    baggage: "A cabin bag is included on most fares. Checked luggage is a paid extra, cheapest when added at booking.",
    intro: [
      "Norwegian is the low-cost option across Scandinavia and to a growing list of European leisure destinations. Fares undercut the legacy carriers substantially, particularly on routes out of Oslo, Stockholm and Copenhagen.",
      "Its pricing is unusually seasonal. Nordic winter routes to the Mediterranean and the Canaries fill quickly and price accordingly, while the same routes in spring and autumn can be strikingly cheap. Norwegian also adds and drops seasonal routes at short notice, so availability shifts more than on the bigger carriers.",
      "The usual low-cost rules apply: midweek beats weekends, adding bags at booking is cheaper than at the airport, and the earlier you book a peak-season flight the better. Off-peak, fares often stay flat until quite close to departure.",
      "The calendar below makes the seasonal shape obvious — you can see immediately where the cheap weeks sit rather than checking dates one at a time.",
    ],
    destinations: ["barcelona", "palma", "tenerife", "ibiza", "athens", "rome", "lisbon", "madrid", "prague", "dubrovnik"],
  },
];

export const AIRLINE_BY_SLUG = new Map(CALENDAR_AIRLINES.map((a) => [a.slug, a]));

export const lowFareHref = (slug: string) => `/low-fare-calendar/${slug}`;
