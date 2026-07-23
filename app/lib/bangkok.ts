// Bangkok guide configuration shared across the hub page and subpages.
// Order drives the sticky sub-nav tabs and the "Explore Bangkok" card grid.

export type BangkokCategory = {
  slug: string; // path segment, e.g. "attractions" ("" for the hub/flights)
  label: string; // sub-nav label
  emoji: string;
  blurb: string; // one line for the hub category cards
  image: string; // local card image (/images/bangkok/...)
};

export const BANGKOK_CATEGORIES: BangkokCategory[] = [
  { slug: "", label: "Flights", emoji: "✈️", blurb: "Cheap fares, price calendar and airlines.", image: "/images/bangkok/sevardheter/chao-phraya-river-boats.webp" },
  { slug: "attractions", label: "Attractions", emoji: "🎨", blurb: "Temples, markets and the Grand Palace — 18 top sights.", image: "/images/bangkok/sevardheter/grand-palace.webp" },
  { slug: "restaurants", label: "Restaurants", emoji: "🍽️", blurb: "Street food legends to three-Michelin-star tables.", image: "/images/bangkok/restauranger/jay-fai.webp" },
  { slug: "hotels", label: "Hotels", emoji: "🏨", blurb: "Riverside grandes dames, boutiques and hostels.", image: "/images/bangkok/hotell/mandarin-oriental-bangkok.webp" },
  { slug: "transport", label: "Transport", emoji: "🚇", blurb: "BTS, MRT, boats, tuk-tuks and Grab explained.", image: "/images/bangkok/sevardheter/chao-phraya-river-cruise.webp" },
  { slug: "prices", label: "Prices", emoji: "💶", blurb: "Daily budgets, food, transport and entry fees.", image: "/images/bangkok/shopping/chatuchak-weekend-market.webp" },
  { slug: "weather", label: "Weather", emoji: "🌤️", blurb: "The three seasons and the best time to visit.", image: "/images/bangkok/sevardheter/lumphini-park.webp" },
  { slug: "shopping", label: "Shopping", emoji: "🛍️", blurb: "Mega-malls, weekend markets and silk.", image: "/images/bangkok/shopping/iconsiam.webp" },
  { slug: "beaches", label: "Beaches", emoji: "🏖️", blurb: "Day-trip sands from Bang Saen to Koh Samet.", image: "/images/bangkok/strander/bangsaen-beach.webp" },
  { slug: "nightlife", label: "Nightlife", emoji: "🌙", blurb: "Sky-high rooftop bars, speakeasies and clubs.", image: "/images/bangkok/nattliv/sky-bar-lebua.webp" },
  { slug: "with-kids", label: "With kids", emoji: "👨‍👩‍👧", blurb: "Safari World, aquariums and theme parks.", image: "/images/bangkok/med-barn/safari-world.webp" },
  { slug: "day-trips", label: "Day trips", emoji: "🚆", blurb: "Ayutthaya, floating markets and Kanchanaburi.", image: "/images/bangkok/dagsutflykter/ayutthaya.webp" },
  { slug: "events", label: "Events", emoji: "🎉", blurb: "Songkran, Loy Krathong and festivals all year.", image: "/images/bangkok/sevardheter/yaowarat.webp" },
];

// Slug → path. Every Bangkok category has its own index page.
export const bangkokHref = (slug: string) => (slug ? `/bangkok/${slug}` : "/bangkok");
