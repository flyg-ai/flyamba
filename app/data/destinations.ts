export type MonthPrice = { month: string; price: number };
export type AirlineTip = { code: string; name: string; tips: string[] };
export type Insight = { label: string; value: string; icon: "calendar" | "day" | "time" | "moon" };
export type NearbyDest = { slug: string; city: string; country: string; flag: string; price: number };
export type Faq = { q: string; a: string };
export type DayPrice = { day: string; price: number };
export type Airline = { name: string; code: string; fromPrice: number; type?: string };
export type PracticalStrip = {
  currency: string;
  language: string;
  plug: string;
  timezone: string;
  safety: string;
  visa: string;
};
export type DirectRoute = {
  origin: string;
  iata: string;
  duration: string;
  airlines: string[];
  price: number;
  perWeek: number;
};
export type Neighborhood = {
  name: string;
  vibe: string;
  pricePerNight: string;
  bestFor: string;
  image: string;
};
export type Restaurant = {
  name: string;
  type: string;
  area: string;
  priceLevel: "€" | "€€" | "€€€";
  note: string;
};
export type TransportMode = {
  mode: string;
  price: string;
  time: string;
  note: string;
  icon: "metro" | "bus" | "taxi" | "walk" | "train";
};
export type DayTrip = {
  name: string;
  distance: string;
  travelTime: string;
  note: string;
  image: string;
};
export type EventItem = { month: string; name: string; note: string };
export type Guide = { title: string; readMinutes: number; image: string; category: string };
export type RecentSearch = { from: string; when: string; price: number; ago: string };

export type Destination = {
  slug: string;
  city: string;
  country: string;
  countryFlag?: string;
  iata?: string;
  tpName?: string;
  price: number;
  image: string;
  thumbnail?: string;
  tagline: string;
  category: string;
  avgFlightHours: number;
  flightTime?: string;
  topAirlines: string[];
  bestMonths: string;
  weather: { month: string; tempC: number; icon: "sun" | "cloud" | "rain" | "snow" }[];
  thingsToDo: { title: string; desc: string; image: string }[];
  airlines?: Airline[];
  whyVisit?: { icon: string; text: string }[];

  // SEO helpers. Note: month names for cheapest/priciest come from the existing
  // `cheapestMonth.name` / `priciestMonth.name` objects below — not separate
  // string fields (which would collide with those object types).
  airportName?: string;
  lowestPrice?: string; // display string incl. currency, e.g. "$128"
  coordinates?: { lat: number; lng: number };
  // Per-category hero images for the /[slug]/[category] guide pages.
  categoryImages?: Record<string, string>;

  summerTemp?: number;
  foodCostPerDay?: string;
  hotelCostPerNight?: string;
  intro?: string;
  monthlyPrices?: MonthPrice[];
  cheapestMonth?: { name: string; price: number; savingsPct: number; note: string };
  priciestMonth?: { name: string; price: number; premiumPct: number; note: string };
  popularMonth?: { name: string; note: string };
  airlineTips?: AirlineTip[];
  proTip?: string;
  bookingWindow?: { best: number; goodTime: number; lastMinute: number };
  cheapestDay?: string;
  insights?: Insight[];
  bestTimeToVisit?: string;
  airlinesAirports?: string;
  practicalTips?: string;
  nearby?: NearbyDest[];
  faqs?: Faq[];

  dayPrices?: DayPrice[];
  practicalStrip?: PracticalStrip;
  directRoutes?: DirectRoute[];
  neighborhoods?: Neighborhood[];
  restaurants?: Restaurant[];
  transport?: TransportMode[];
  dayTrips?: DayTrip[];
  events?: EventItem[];
  guides?: Guide[];
  recentSearches?: RecentSearch[];
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const weatherFor = (temps: number[]): Destination["weather"] =>
  months.map((m, i) => ({
    month: m,
    tempC: temps[i],
    icon: temps[i] >= 22 ? "sun" : temps[i] >= 12 ? "cloud" : temps[i] >= 2 ? "rain" : "snow",
  }));

export const destinations: Destination[] = [
  {
    slug: "barcelona",
    city: "Barcelona",
    country: "Spain",
    countryFlag: "🇪🇸",
    iata: "BCN",
    tpName: "barcelona_es",
    price: 1290,
    image: "/images/destinations/flights-barcelona.avif",
    thumbnail: "/images/destinations/flights-barcelona-thumb.avif",
    tagline: "Gaudí's dreamscape by the Mediterranean",
    category: "City Breaks",
    avgFlightHours: 3.5,
    flightTime: "3h 10min",
    airportName: "Barcelona–El Prat Airport (BCN)",
    lowestPrice: "$128",
    coordinates: { lat: 41.3851, lng: 2.1734 },
    categoryImages: {
      attractions: "/images/content/photo-1539037116277-4db20889f2d4.avif",
      restaurants: "/images/content/photo-1414235077428-338989a2e8c0.avif",
      hotels: "/images/content/photo-1566073771259-6a8506099945.avif",
      transport: "/images/content/photo-1544620347-c4fd4a3d5957.avif",
      prices: "/images/content/photo-1579621970563-ebec7560ff3e.avif",
      weather: "/images/content/photo-1504386106331-3e4e71712b38.avif",
      shopping: "/images/content/photo-1483985988355-763728e1935b.avif",
      beaches: "/images/content/photo-1507525428034-b723cf961d3e.avif",
      nightlife: "/images/content/photo-1516450360452-9312f5e86fc7.avif",
      "with-kids": "/images/content/photo-1484820540004-14229fe36ca4.avif",
      "day-trips": "/images/content/photo-1506905925346-21bda4d32df4.avif",
    },
    topAirlines: ["Vueling", "Iberia", "SAS", "Norwegian"],
    bestMonths: "May – June, September",
    airlines: [
      { name: "British Airways", code: "BA", fromPrice: 990, type: "Full-service carrier" },
      { name: "Iberia", code: "IB", fromPrice: 1090, type: "Full-service carrier" },
      { name: "Vueling", code: "VY", fromPrice: 1090, type: "Low-cost carrier" },
      { name: "Ryanair", code: "FR", fromPrice: 890, type: "Low-cost carrier" },
      { name: "easyJet", code: "U2", fromPrice: 990, type: "Low-cost carrier" },
      { name: "Air France", code: "AF", fromPrice: 1190, type: "Full-service carrier" },
    ],
    whyVisit: [
      { icon: "☀️", text: "300+ sunny days per year" },
      { icon: "🏖️", text: "Beautiful beaches 20 min from city center" },
      { icon: "🍷", text: "World-class food & nightlife" },
      { icon: "✈️", text: "Nonstop flights from major cities worldwide" },
    ],
    weather: weatherFor([11, 12, 14, 16, 20, 24, 27, 27, 24, 20, 15, 12]),
    thingsToDo: [
      { title: "Sagrada Família", desc: "Gaudí's unfinished basilica — a century in the making.", image: "/images/content/sagrada-familia.avif" },
      { title: "Park Güell", desc: "Mosaic terraces with sweeping views of the city.", image: "/images/content/photo-1509840841025-9088ba78a826.avif" },
      { title: "La Boqueria", desc: "Sensory-overload food market off Las Ramblas.", image: "/images/content/photo-1555992336-fb0d29498b13.avif" },
      { title: "Barceloneta Beach", desc: "Golden sand a short metro ride from the Gothic Quarter.", image: "/images/content/barceloneta.avif" },
    ],
    summerTemp: 27,
    foodCostPerDay: "€35–50",
    hotelCostPerNight: "€100–140",
    intro:
      "Barcelona is one of Europe's most captivating cities — a rare mix of modernist architecture, world-class food and easy Mediterranean beach life. Gaudí's masterpieces like Sagrada Família and Park Güell draw millions each year, while neighborhoods like Gràcia and El Born stay stubbornly local.",
    monthlyPrices: [
      { month: "Jan", price: 1350 },
      { month: "Feb", price: 1290 },
      { month: "Mar", price: 1490 },
      { month: "Apr", price: 1790 },
      { month: "May", price: 1990 },
      { month: "Jun", price: 2290 },
      { month: "Jul", price: 2490 },
      { month: "Aug", price: 2390 },
      { month: "Sep", price: 1890 },
      { month: "Oct", price: 1690 },
      { month: "Nov", price: 1450 },
      { month: "Dec", price: 1590 },
    ],
    cheapestMonth: { name: "February", price: 1290, savingsPct: 22, note: "Lowest average round-trip. Save up to 1 200 kr vs. peak season." },
    priciestMonth: { name: "July", price: 2490, premiumPct: 29, note: "High season with heavy demand. Book at least 3 months ahead." },
    popularMonth: { name: "August", note: "Most searched — book early for the best flight & hotel selection." },
    airlineTips: [
      {
        code: "V",
        name: "Vueling",
        tips: [
          "Barcelona is Vueling's home hub — most departures and best net price",
          "Optima fare includes cabin bag (55×40×20 cm) — skip the baggage fee",
          "Easy to combine BCN with a domestic hop to Ibiza or Mallorca",
        ],
      },
      {
        code: "R",
        name: "Ryanair",
        tips: [
          "Flies from secondary airports — the fare looks cheap, add bags and seats before comparing",
          "Tuesday vs. Friday can differ by €40–70 — flex your day",
          "Priority boarding is worth it in summer when overhead space vanishes fast",
        ],
      },
      {
        code: "S",
        name: "SAS",
        tips: [
          "Checked bag is included in SAS Go — better for longer trips",
          "EuroBonus points on every flight — build toward award tickets",
          "Departs Terminal 2 at Arlanda — shorter queues, smoother security",
        ],
      },
    ],
    proTip:
      "Book hotels in Gràcia or Eixample instead of Las Ramblas — 20–30% cheaper, quieter at night, and you're the same short metro ride from every sight and beach.",
    bookingWindow: { best: 1290, goodTime: 1590, lastMinute: 2390 },
    cheapestDay: "Monday",
    insights: [
      { label: "Best time to book", value: "6–8 weeks ahead", icon: "calendar" },
      { label: "Cheapest day", value: "Monday", icon: "day" },
      { label: "Cheapest time", value: "Early morning", icon: "time" },
      { label: "Cheapest month", value: "February", icon: "moon" },
    ],
    bestTimeToVisit:
      "Barcelona rewards visitors nearly year-round, but the sweet spot is May to mid-June and September to October. Temperatures sit at 20–25°C, the sea is swimmable and the crowds are manageable. July and August are peak — beaches are packed and prices climb. Winter (December–February) is mild at 10–14°C, perfect for museums and long lunches. Don't miss the free La Mercè festival in September.",
    airlinesAirports:
      "Vueling operates the most frequent direct flights into Barcelona El Prat (BCN); SAS, Norwegian and Iberia round out the network from major European hubs. Ryanair flies from secondary airports for the lowest fares. Flight time from Northern Europe is around 3h 30m. Terminal 1 handles network carriers; Terminal 2 serves the low-cost airlines. The Aerobus reaches Plaça de Catalunya in 35 minutes for €6.75.",
    practicalTips:
      "Barcelona's metro (TMB) is the backbone — a 10-trip T-casual card is €12.15. Take pickpocket warnings seriously: use a zipped bag on Las Ramblas and inside the metro. EU citizens don't need a visa. Tipping isn't mandatory but 5–10% is appreciated. Reserve Sagrada Família at least two weeks ahead on sagradafamilia.org.",
    nearby: [
      { slug: "madrid", city: "Madrid", country: "Spain", flag: "🇪🇸", price: 1190 },
      { slug: "valencia", city: "Valencia", country: "Spain", flag: "🇪🇸", price: 1090 },
      { slug: "ibiza", city: "Ibiza", country: "Spain", flag: "🇪🇸", price: 1390 },
      { slug: "mallorca", city: "Mallorca", country: "Spain", flag: "🇪🇸", price: 1290 },
      { slug: "seville", city: "Seville", country: "Spain", flag: "🇪🇸", price: 1490 },
    ],
    faqs: [
      { q: "What documents do I need to fly to Barcelona?", a: "EU/EEA travelers can enter with a national ID card. Non-EU visitors need a passport valid for at least 3 months beyond the return date; short stays under 90 days are visa-free for most Western nationalities under Schengen rules." },
      { q: "Are there alternative airports to Barcelona?", a: "El Prat (BCN) is the main airport, 12 km from the city. Girona (GRO) is 90 km north and used mainly by Ryanair — a bus reaches Barcelona in 75 minutes. Reus (REU), 100 km south, is another Ryanair option that pairs well with Tarragona." },
      { q: "What's included in each airline's baggage allowance?", a: "SAS Go includes 1 checked bag + 1 cabin bag. Vueling Basic is cabin-only (small under-seat bag); Optima adds a 10 kg cabin bag. Ryanair's basic fare is one small under-seat bag; priority + a 10 kg cabin bag is a paid add-on." },
      { q: "How flexible are the tickets if I need to change?", a: "Low-cost carriers charge €40–60 per change plus any fare difference. SAS and Iberia flex fares allow one free change but cost more up front. Always check the fare rules on your confirmation before booking." },
      { q: "Is it safe to travel to Barcelona?", a: "Barcelona is very safe for tourists — the main risk is pickpocketing on Las Ramblas, in the metro, and around Sagrada Família. Keep valuables in a zipped bag in front of you and you'll be fine." },
    ],
    dayPrices: [
      { day: "Mon", price: 1290 },
      { day: "Tue", price: 1390 },
      { day: "Wed", price: 1350 },
      { day: "Thu", price: 1490 },
      { day: "Fri", price: 1890 },
      { day: "Sat", price: 1790 },
      { day: "Sun", price: 1590 },
    ],
    practicalStrip: {
      currency: "Euro (€)",
      language: "Catalan · Spanish",
      plug: "Type C / F · 230V",
      timezone: "CET (UTC+1)",
      safety: "Very safe · watch pockets",
      visa: "Schengen · 90 days",
    },
    directRoutes: [
      { origin: "New York", iata: "JFK", duration: "8h 05m", airlines: ["Iberia", "American", "Level"], price: 5490, perWeek: 21 },
      { origin: "London", iata: "LHR", duration: "2h 15m", airlines: ["British Airways", "Vueling", "easyJet"], price: 890, perWeek: 56 },
      { origin: "Los Angeles", iata: "LAX", duration: "11h 40m", airlines: ["Iberia", "Delta"], price: 7290, perWeek: 7 },
      { origin: "Chicago", iata: "ORD", duration: "9h 20m", airlines: ["American", "Iberia"], price: 6190, perWeek: 7 },
      { origin: "Amsterdam", iata: "AMS", duration: "2h 25m", airlines: ["KLM", "Vueling", "Transavia"], price: 990, perWeek: 35 },
    ],
    neighborhoods: [
      {
        name: "Gràcia",
        vibe: "Bohemian & local",
        pricePerNight: "€90–130",
        bestFor: "Repeat visitors, slow travel, café mornings",
        image: "/images/content/photo-1539037116277-4db20889f2d4.avif",
      },
      {
        name: "Eixample",
        vibe: "Modernist grid, upscale",
        pricePerNight: "€120–180",
        bestFor: "Design lovers, boutique hotels, walking",
        image: "/images/content/photo-1573155993874-d5d48af862ba.avif",
      },
      {
        name: "El Born",
        vibe: "Medieval lanes & bars",
        pricePerNight: "€110–160",
        bestFor: "Nightlife, tapas, first-timers",
        image: "/images/content/photo-1523531294919-4bcd7c65e216.avif",
      },
      {
        name: "Barceloneta",
        vibe: "Beach & seafood",
        pricePerNight: "€130–200",
        bestFor: "Summer stays, families, joggers",
        image: "/images/content/barceloneta.avif",
      },
    ],
    restaurants: [
      { name: "Bar Cañete", type: "Classic tapas", area: "El Raval", priceLevel: "€€", note: "Marble counter, jamón, sit at the bar." },
      { name: "Disfrutar", type: "Modernist tasting", area: "Eixample", priceLevel: "€€€", note: "3 Michelin stars — book 3 months ahead." },
      { name: "Bodega 1900", type: "Vermouth & bites", area: "Sant Antoni", priceLevel: "€€", note: "Adrià family — the perfect long lunch." },
      { name: "Els Pescadors", type: "Seafood", area: "Poblenou", priceLevel: "€€€", note: "Old fisherman's square, catch of the day." },
      { name: "La Cova Fumada", type: "Bombas & beers", area: "Barceloneta", priceLevel: "€", note: "Cash only, no sign — birthplace of the bomba." },
      { name: "Quimet & Quimet", type: "Montaditos", area: "Poble-sec", priceLevel: "€€", note: "Standing-room only, tinned fish heaven." },
    ],
    transport: [
      { mode: "Metro (TMB)", price: "€2.55 single · €12.15 for 10", time: "Every 3–5 min", note: "Fastest way across the city; runs 5:00–24:00.", icon: "metro" },
      { mode: "Aerobus (BCN → center)", price: "€6.75", time: "35 min", note: "Departs T1/T2 every 5 min to Plaça Catalunya.", icon: "bus" },
      { mode: "Airport train (R2 Nord)", price: "€4.60", time: "25 min", note: "Cheapest airport link — station under T2.", icon: "train" },
      { mode: "Taxi from airport", price: "€35–45", time: "20–30 min", note: "Fixed rate to center, +€1 per bag.", icon: "taxi" },
      { mode: "Bicing & walking", price: "Free–€5/day", time: "—", note: "Old town is flat and walkable; bikes flow along Diagonal.", icon: "walk" },
    ],
    dayTrips: [
      {
        name: "Montserrat",
        distance: "60 km NW",
        travelTime: "1h 20m by train + cable car",
        note: "Sawtooth mountain monastery, boys' choir at 13:00.",
        image: "/images/content/montserrat.avif",
      },
      {
        name: "Sitges",
        distance: "40 km SW",
        travelTime: "40 min by R2 train",
        note: "Whitewashed seaside town, 17 beaches, LGBTQ+ classic.",
        image: "/images/destinations/flights-sitges.avif",
      },
      {
        name: "Girona",
        distance: "100 km NE",
        travelTime: "40 min AVE high-speed",
        note: "Colored houses on the Onyar, Game of Thrones streets.",
        image: "/images/destinations/flights-girona.avif",
      },
    ],
    events: [
      { month: "Feb", name: "Santa Eulàlia", note: "Human towers, giants and street parades." },
      { month: "Apr", name: "Sant Jordi", note: "Books and roses on every corner — the city's love day." },
      { month: "Jun", name: "Primavera Sound", note: "Global indie & electronic lineup at Parc del Fòrum." },
      { month: "Aug", name: "Festa Major de Gràcia", note: "Neighbours dress their streets — a week-long block party." },
      { month: "Sep", name: "La Mercè", note: "The city's biggest festival — free concerts, fireworks, castellers." },
      { month: "Dec", name: "Fira de Santa Llúcia", note: "Christmas market in front of the cathedral." },
    ],
    guides: [
      {
        title: "Barcelona in 3 days — the perfect weekend",
        readMinutes: 9,
        category: "Itinerary",
        image: "/images/content/photo-1583422409516-2895a77efded.avif",
      },
      {
        title: "Where locals actually eat tapas",
        readMinutes: 6,
        category: "Food",
        image: "/images/content/photo-1544025162-d76694265947.avif",
      },
      {
        title: "Every Gaudí building, ranked",
        readMinutes: 12,
        category: "Architecture",
        image: "/images/content/photo-1509840841025-9088ba78a826.avif",
      },
      {
        title: "The best beaches within 1 hour",
        readMinutes: 5,
        category: "Beach",
        image: "/images/content/barceloneta.avif",
      },
    ],
    recentSearches: [
      { from: "Stockholm", when: "Fri 12 → Mon 15 Sep", price: 1690, ago: "2 min ago" },
      { from: "Copenhagen", when: "Sat 20 → Wed 24 Sep", price: 1290, ago: "5 min ago" },
      { from: "Oslo", when: "Thu 25 → Sun 28 Sep", price: 1890, ago: "8 min ago" },
      { from: "Gothenburg", when: "Fri 3 → Sun 5 Oct", price: 1590, ago: "12 min ago" },
    ],
  },
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    countryFlag: "🇯🇵",
    iata: "HND",
    tpName: "tokyo_jp",
    price: 5490,
    image: "/images/destinations/flights-tokyo.avif",
    thumbnail: "/images/destinations/flights-tokyo-thumb.avif",
    tagline: "Neon nights and quiet shrines",
    category: "Long Haul",
    avgFlightHours: 11,
    topAirlines: ["ANA", "JAL", "Finnair", "KLM"],
    bestMonths: "March – May, October – November",
    weather: weatherFor([5, 6, 10, 15, 19, 23, 27, 28, 24, 19, 13, 8]),
    thingsToDo: [
      { title: "Shibuya Crossing", desc: "The world's busiest intersection at neon golden hour.", image: "/images/content/photo-1554797589-7241bb691973.avif" },
      { title: "Senso-ji Temple", desc: "Ancient temple in the heart of Asakusa.", image: "/images/content/senso-ji.avif" },
      { title: "Tsukiji Outer Market", desc: "Sushi breakfasts and knife shops.", image: "/images/content/photo-1526318472351-c75fcf070305.avif" },
    ],
  },
  {
    slug: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    countryFlag: "🇵🇹",
    iata: "LIS",
    tpName: "lisbon_pt",
    price: 1690,
    image: "/images/destinations/flights-lisbon.avif",
    thumbnail: "/images/destinations/flights-lisbon-thumb.avif",
    tagline: "Tiled facades and Atlantic light",
    category: "City Breaks",
    avgFlightHours: 4,
    topAirlines: ["TAP", "Ryanair", "SAS"],
    bestMonths: "April – June, September",
    weather: weatherFor([12, 13, 15, 17, 20, 23, 25, 26, 24, 20, 16, 13]),
    thingsToDo: [
      { title: "Alfama", desc: "Fado music in the oldest quarter.", image: "/images/content/alfama.avif" },
      { title: "Tram 28", desc: "Vintage yellow tram climbing the seven hills.", image: "/images/content/photo-1513735492246-483525079686.avif" },
      { title: "Belém", desc: "Custard tarts, monasteries, and river views.", image: "/images/content/belem.avif" },
    ],
  },
  {
    slug: "new-york",
    city: "New York",
    country: "United States",
    countryFlag: "🇺🇸",
    iata: "JFK",
    tpName: "new-york_us",
    price: 3890,
    image: "/images/destinations/flights-new-york.avif",
    thumbnail: "/images/destinations/flights-new-york-thumb.avif",
    tagline: "The city that keeps rewriting itself",
    category: "City Breaks",
    avgFlightHours: 8,
    topAirlines: ["Delta", "United", "SAS", "Norse"],
    bestMonths: "April – June, September – November",
    weather: weatherFor([1, 2, 7, 13, 18, 23, 26, 25, 21, 15, 9, 3]),
    thingsToDo: [
      { title: "Central Park", desc: "843 acres of green in the middle of Manhattan.", image: "/images/content/photo-1518391846015-55a9cc003b25.avif" },
      { title: "MoMA", desc: "Modern art heavyweight collection.", image: "/images/content/photo-1554907984-15263bfd63bd.avif" },
      { title: "Brooklyn Bridge", desc: "Sunset walk with the skyline behind you.", image: "/images/content/photo-1524293581917-878a6d017c71.avif" },
    ],
  },
  {
    slug: "bali",
    city: "Bali",
    country: "Indonesia",
    countryFlag: "🇮🇩",
    iata: "DPS",
    tpName: "bali_id",
    price: 6790,
    image: "/images/destinations/flights-bali.avif",
    thumbnail: "/images/destinations/flights-bali-thumb.avif",
    tagline: "Rice terraces, temples, and long slow mornings",
    category: "Beach & Sun",
    avgFlightHours: 16,
    topAirlines: ["Singapore Airlines", "Qatar", "Emirates"],
    bestMonths: "April – October",
    weather: weatherFor([27, 27, 27, 27, 27, 26, 26, 26, 27, 27, 27, 27]),
    thingsToDo: [
      { title: "Ubud", desc: "Jungle spas, cafés, and monkey forests.", image: "/images/content/photo-1531592937781-344ad608fabf.avif" },
      { title: "Tegallalang", desc: "Iconic emerald rice terraces.", image: "/images/content/photo-1573790387438-4da905039392.avif" },
      { title: "Uluwatu", desc: "Cliff temple at sunset with kecak dance.", image: "/images/destinations/flights-ubud.avif" },
    ],
  },
  {
    slug: "cape-town",
    city: "Cape Town",
    country: "South Africa",
    countryFlag: "🇿🇦",
    iata: "CPT",
    tpName: "cape-town_za",
    price: 6290,
    image: "/images/content/photo-1580060839134-75a5edca2e99.avif",
    tagline: "Table Mountain meets two oceans",
    category: "Adventure",
    avgFlightHours: 12,
    topAirlines: ["KLM", "Lufthansa", "Qatar"],
    bestMonths: "November – March",
    weather: weatherFor([22, 22, 21, 18, 16, 14, 13, 14, 15, 17, 19, 21]),
    thingsToDo: [
      { title: "Table Mountain", desc: "Cable car up, hike down through fynbos.", image: "/images/content/photo-1580060839134-75a5edca2e99.avif" },
      { title: "Cape Point", desc: "Where two oceans meet the wild coast.", image: "/images/content/photo-1516026672322-bc52d61a55d5.avif" },
      { title: "Bo-Kaap", desc: "Rainbow-colored houses in the Cape Malay quarter.", image: "/images/content/photo-1611746872915-64382b5c76da.avif" },
    ],
  },
  {
    slug: "reykjavik",
    city: "Reykjavík",
    country: "Iceland",
    countryFlag: "🇮🇸",
    iata: "KEF",
    tpName: "reykjavik_is",
    price: 2490,
    image: "/images/destinations/flights-reykjavik.avif",
    thumbnail: "/images/destinations/flights-reykjavik-thumb.avif",
    tagline: "Northern lights and geothermal steam",
    category: "Adventure",
    avgFlightHours: 3,
    topAirlines: ["Icelandair", "PLAY", "SAS"],
    bestMonths: "September – March (aurora), June – August (midnight sun)",
    weather: weatherFor([-1, 0, 1, 4, 8, 11, 13, 12, 9, 5, 2, 0]),
    thingsToDo: [
      { title: "Blue Lagoon", desc: "Milky geothermal waters against black lava.", image: "/images/content/photo-1520769945061-0a448c463865.avif" },
      { title: "Golden Circle", desc: "Geysers, waterfalls, and rift valleys.", image: "/images/content/photo-1531168556467-80aace0d0144.avif" },
    ],
  },
  {
    slug: "marrakech",
    city: "Marrakech",
    country: "Morocco",
    countryFlag: "🇲🇦",
    iata: "RAK",
    tpName: "marrakech_ma",
    price: 2190,
    image: "/images/destinations/flights-marrakech.avif",
    thumbnail: "/images/destinations/flights-marrakech-thumb.avif",
    tagline: "Souks, spice, and rose-pink walls",
    category: "Romantic",
    avgFlightHours: 5,
    topAirlines: ["Royal Air Maroc", "Ryanair", "Air France"],
    bestMonths: "March – May, October – November",
    weather: weatherFor([13, 15, 18, 20, 24, 28, 32, 32, 28, 23, 18, 14]),
    thingsToDo: [
      { title: "Jemaa el-Fnaa", desc: "Storytellers, food stalls, and the call to prayer.", image: "/images/content/photo-1489749798305-4fea3ae63d43.avif" },
      { title: "Majorelle Garden", desc: "Cobalt-blue oasis once owned by YSL.", image: "/images/content/photo-1553603227-2358aabe821e.avif" },
    ],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);
