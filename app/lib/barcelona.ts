// Barcelona guide configuration shared across the hub page, subpages and sitemap.

// Affiliate deep link to a Barcelona flight search (Kiwi via Travelpayouts).
export const BARCELONA_KIWI_CTA =
  "https://tp.media/r?marker=711264&trs=508580&p=4478&u=https%3A%2F%2Fwww.kiwi.com%2Fen%2Fsearch%2Fresults%2Fanywhere%2Fbarcelona-el-prat-airport-barcelona-spain%2Fanytime%2Fno-return%2F";

export type SubPage = {
  slug: string; // path segment, e.g. "attractions" ("" for the hub/flights)
  label: string; // sub-nav label
  emoji: string;
  blurb: string; // one line for the "Explore Barcelona" cards
  image: string; // Unsplash thumbnail
};

// Order drives the sub-nav tabs and the "Explore Barcelona" grid.
export const BARCELONA_SUBPAGES: SubPage[] = [
  { slug: "", label: "Flights", emoji: "✈️", blurb: "Cheap fares, price calendar and airlines.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" },
  { slug: "attractions", label: "Attractions", emoji: "🎨", blurb: "20 best things to do, from Gaudí to the Gothic Quarter.", image: "https://images.unsplash.com/photo-1583779457094-ab6f8be4a1c8?auto=format&fit=crop&w=800&q=80" },
  { slug: "restaurants", label: "Restaurants", emoji: "🍽️", blurb: "Tapas bars, seafood, markets and fine dining.", image: "https://images.unsplash.com/photo-1555992336-fb0d29498b13?auto=format&fit=crop&w=800&q=80" },
  { slug: "hotels", label: "Hotels", emoji: "🏨", blurb: "Where to stay by neighborhood and budget.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" },
  { slug: "transport", label: "Transport", emoji: "🚇", blurb: "Airport transfers, metro, buses, taxis and bikes.", image: "https://images.unsplash.com/photo-1554072675-66db59dba46f?auto=format&fit=crop&w=800&q=80" },
  { slug: "weather", label: "Weather", emoji: "🌤️", blurb: "Month-by-month climate and the best time to visit.", image: "https://images.unsplash.com/photo-1591792063115-a3e10eaa6a4b?auto=format&fit=crop&w=800&q=80" },
  { slug: "prices", label: "Prices", emoji: "💶", blurb: "Daily budgets, food, transport and entry fees.", image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80" },
  { slug: "nightlife", label: "Nightlife", emoji: "🌙", blurb: "Best bars, clubs and rooftops by neighborhood.", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80" },
  { slug: "beaches", label: "Beaches", emoji: "🏖️", blurb: "8 beaches from Barceloneta to Sitges.", image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800&q=80" },
];

export const barcelonaHref = (slug: string) => (slug ? `/barcelona/${slug}` : "/barcelona");
