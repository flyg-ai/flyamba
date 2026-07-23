// Barcelona guide configuration shared across the hub page, subpages and sitemap.

// Affiliate deep link to a Barcelona flight search (Kiwi via Travelpayouts).
export const BARCELONA_KIWI_CTA =
  "https://tp.media/r?marker=711264&trs=508580&p=4478&u=https%3A%2F%2Fwww.kiwi.com%2Fen%2Fsearch%2Fresults%2Fanywhere%2Fbarcelona-el-prat-airport-barcelona-spain%2Fanytime%2Fno-return%2F";

export type SubPage = {
  slug: string; // path segment, e.g. "attractions" ("" for the hub/flights)
  label: string; // sub-nav label
  emoji: string;
  blurb: string; // one line for the "Explore Barcelona" cards
  image: string; // Unsplash card image
};

// Order drives the sub-nav tabs and the image category-card grid on the hub.
export const BARCELONA_SUBPAGES: SubPage[] = [
  { slug: "", label: "Flights", emoji: "✈️", blurb: "Cheap fares, price calendar and airlines.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400" },
  { slug: "attractions", label: "Attractions", emoji: "🎨", blurb: "20 best things to do, from Gaudí to the Gothic Quarter.", image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400" },
  { slug: "restaurants", label: "Restaurants", emoji: "🍽️", blurb: "Tapas bars, seafood, markets and fine dining.", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400" },
  { slug: "hotels", label: "Hotels", emoji: "🏨", blurb: "Where to stay by neighborhood and budget.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" },
  { slug: "transport", label: "Transport", emoji: "🚇", blurb: "Airport transfers, metro, buses, taxis and bikes.", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400" },
  { slug: "prices", label: "Prices", emoji: "💶", blurb: "Daily budgets, food, transport and entry fees.", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400" },
  { slug: "weather", label: "Weather", emoji: "🌤️", blurb: "Month-by-month climate and the best time to visit.", image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=400" },
  { slug: "shopping", label: "Shopping", emoji: "🛍️", blurb: "Luxury avenues, markets, vintage and souvenirs.", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" },
  { slug: "beaches", label: "Beaches", emoji: "🏖️", blurb: "8 beaches from Barceloneta to Sitges.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400" },
  { slug: "nightlife", label: "Nightlife", emoji: "🌙", blurb: "Best bars, clubs and rooftops by neighborhood.", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400" },
  { slug: "with-kids", label: "With kids", emoji: "👨‍👩‍👧", blurb: "Family activities, parks and practical tips.", image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=400" },
  { slug: "day-trips", label: "Day trips", emoji: "🚆", blurb: "Montserrat, Sitges, Girona and the Costa Brava.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
];

export const barcelonaHref = (slug: string) => (slug ? `/barcelona/${slug}` : "/barcelona");
