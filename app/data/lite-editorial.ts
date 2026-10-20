// Short editorial content for the handful of Lite-catalog destinations Google
// has actually indexed (see app/data/indexed-overrides.ts). Those pages are
// the only Lite pages a real visitor can currently find via search, and until
// Oct 2026 they still showed a "Full guide coming soon" placeholder — a bad
// look on a page Google chose to index. This is deliberately NOT the full
// hub-level content model (no <city>-places.ts, no category subpages) — just
// enough real substance to replace the placeholder honestly. Add a slug here
// when it joins ALREADY_INDEXED_SLUGS; DestinationLite falls back to the
// placeholder for everything else.

export type LiteHighlight = { icon: string; title: string; text: string };
export type LiteEditorial = { intro: string; highlights: LiteHighlight[] };

export const LITE_EDITORIAL: Record<string, LiteEditorial> = {
  aruba: {
    intro:
      "Aruba sits south of the main Caribbean hurricane belt, which gives it one of the most dependable climates in the region — constant trade winds keep the heat comfortable, and the desert-like interior means almost no rain to plan around. It's a small island, easy to see most of in a few days, with English widely spoken and the US dollar accepted everywhere.",
    highlights: [
      { icon: "🏖️", title: "Eagle Beach", text: "Consistently ranked among the best beaches in the world — wide, white sand and the island's iconic divi-divi trees leaning in the wind." },
      { icon: "🏜️", title: "Arikok National Park", text: "Nearly a fifth of the island, covering cactus-studded desert, hidden caves and the natural pool at Conchi, reachable by 4x4." },
      { icon: "🤿", title: "Snorkeling the Antilla wreck", text: "A WWII-era shipwreck sitting close enough to the surface for snorkelers, not just divers, to explore." },
      { icon: "🏘️", title: "Oranjestad", text: "A compact, colorful Dutch-Caribbean capital with duty-free shopping and a cruise-ship waterfront." },
      { icon: "🍽️", title: "Local cuisine", text: "A genuine Dutch-Caribbean-Latin mix — try keshi yena (stuffed cheese) and fresh-caught mahi-mahi at a beachfront zouk." },
      { icon: "☀️", title: "Year-round weather", text: "Average highs stay around 86–88°F every month of the year — there's no real off-season for the climate, only for the crowds." },
    ],
  },
  chicago: {
    intro:
      "Chicago is the rare US city that's genuinely great for both architecture lovers and deep-dish-pizza tourists in the same weekend — a lakefront skyline best seen from the water, world-class museums, and neighborhoods with enough personality that locals will argue for hours about which one is best.",
    highlights: [
      { icon: "🫘", title: "Cloud Gate (\"The Bean\")", text: "Millennium Park's mirrored sculpture is the city's most-photographed spot, and the park around it hosts free summer concerts." },
      { icon: "🛥️", title: "Architecture river cruise", text: "The single best way to understand why Chicago is considered the birthplace of the skyscraper — an hour on the Chicago River pointed out by a trained guide." },
      { icon: "🎨", title: "The Art Institute of Chicago", text: "One of the most important art museums in the US, home to Grant Wood's American Gothic and Seurat's A Sunday on La Grande Jatte." },
      { icon: "🍕", title: "Deep-dish pizza", text: "A legitimate meal, not just a snack — Lou Malnati's and Giordano's are the classic rival names to try." },
      { icon: "🎡", title: "Navy Pier", text: "A lakefront entertainment pier with a Ferris wheel, fireworks in summer, and some of the best skyline views in the city." },
      { icon: "🏙️", title: "Magnificent Mile", text: "Chicago's premier shopping and dining strip along North Michigan Avenue, anchored by the historic Water Tower." },
    ],
  },
  atlanta: {
    intro:
      "Atlanta is a major Southern hub that's become a genuine destination in its own right — one of the country's best aquariums, civil rights history that belongs on any serious itinerary, and a food and music scene that reaches well beyond the convention-center version of the city most travelers pass through.",
    highlights: [
      { icon: "🐋", title: "Georgia Aquarium", text: "One of the largest aquariums in the world, with whale sharks and beluga whales among species rarely seen in captivity elsewhere in the US." },
      { icon: "✊", title: "Martin Luther King Jr. National Historical Park", text: "His birth home, Ebenezer Baptist Church and his tomb, all within the Sweet Auburn neighborhood where he grew up." },
      { icon: "🥤", title: "World of Coca-Cola", text: "An Atlanta institution — the brand's history museum, with a tasting room pouring Coke products from around the world." },
      { icon: "🚶", title: "Atlanta BeltLine", text: "A former rail corridor turned walkable, bikeable park loop connecting dozens of neighborhoods, lined with public art and breweries." },
      { icon: "🌳", title: "Piedmont Park", text: "The city's Central Park equivalent, bordering the Atlanta Botanical Garden and the eclectic Virginia-Highland neighborhood." },
      { icon: "🎶", title: "Music and food scene", text: "The birthplace of modern Southern hip-hop, with a restaurant scene — from soul food to some of the best Southern fine dining in the country — to match." },
    ],
  },
  jamaica: {
    intro:
      "Jamaica packs the most range of any single Caribbean island: resort-belt beaches in Montego Bay and Negril, waterfalls and rainforest inland, Blue Mountain coffee country, and a music and food culture that reaches far beyond the all-inclusive strip. It rewards leaving the resort at least once.",
    highlights: [
      { icon: "🏖️", title: "Negril's Seven Mile Beach", text: "One continuous stretch of white sand backed by low-key resorts and beach bars, with famous sunset cliff-diving at Rick's Café." },
      { icon: "💦", title: "Dunn's River Falls", text: "A terraced waterfall near Ocho Rios you climb hand-in-hand with a guide, straight up from the beach to the top." },
      { icon: "🎵", title: "Bob Marley Museum", text: "His former home in Kingston, now a museum covering the life and influence of Jamaica's most famous export." },
      { icon: "☕", title: "Blue Mountains", text: "Home to some of the most sought-after coffee in the world, and cooler hiking terrain a world away from the coast." },
      { icon: "🍛", title: "Jerk cooking", text: "The real version — smoked over pimento wood at a roadside jerk stand — is worth seeking out beyond the resort buffet." },
      { icon: "🏞️", title: "YS Falls & Black River", text: "A quieter alternative to Dunn's River, plus a boat safari through mangroves to spot crocodiles on the Black River." },
    ],
  },
  nice: {
    intro:
      "Nice is the capital of the French Riviera — a city of pastel façades, a pebble beach that runs the length of downtown, and an old town that smells like lemons and espresso. It's compact enough to see on foot and makes an easy base for day trips along the Côte d'Azur.",
    highlights: [
      { icon: "🌊", title: "Promenade des Anglais", text: "The famous seafront walk — rent a bike or simply stroll the full curve of the Baie des Anges at sunset." },
      { icon: "🍋", title: "Vieux Nice (Old Town)", text: "Narrow ochre streets, the Cours Saleya flower and produce market, and the city's best socca (chickpea pancake) stalls." },
      { icon: "🎨", title: "Musée Matisse", text: "Henri Matisse lived and worked in Nice for decades; this museum holds one of the largest collections of his work anywhere." },
      { icon: "🚆", title: "Day trips", text: "Monaco, Èze and Antibes are all under an hour away by train — the Riviera is built for exploring beyond one city." },
    ],
  },
  detroit: {
    intro:
      "Detroit's comeback is one of the great American city stories of the last decade — a music and design capital rebuilding itself block by block, with some of the country's best-value dining and architecture for the price of a plane ticket.",
    highlights: [
      { icon: "🎵", title: "Motown Museum", text: "Hitsville U.S.A., the actual house where Motown Records began — small, personal, and genuinely moving for any music fan." },
      { icon: "🏙️", title: "Renaissance Center & Riverwalk", text: "The glass GM towers anchor a riverfront walk with Canada visible across the water." },
      { icon: "🌳", title: "Belle Isle", text: "An 982-acre island park with a conservatory, an aquarium and the best skyline view of the city." },
      { icon: "🛍️", title: "Eastern Market", text: "One of the oldest and largest public markets in the US, especially lively on Saturday mornings." },
    ],
  },
  bahamas: {
    intro:
      "The Bahamas is 700 islands of impossibly clear, shallow water — most visitors land in Nassau on New Providence, but the real draw is how easy it is to island-hop from there into some of the best beaches in the Caribbean.",
    highlights: [
      { icon: "🏖️", title: "Nassau & Paradise Island", text: "Colonial architecture downtown, Atlantis resort and Cabbage Beach a short bridge away." },
      { icon: "🐷", title: "Exuma's swimming pigs", text: "A short flight or boat charter from Nassau to the famous pigs of Big Major Cay — one of the most photographed sights in the Caribbean." },
      { icon: "🤿", title: "Reef diving and snorkeling", text: "Some of the clearest water in the hemisphere, with reefs and blue holes reachable right off Nassau and the Exumas." },
      { icon: "✈️", title: "Short flight from Florida", text: "Under an hour from Miami or Fort Lauderdale — one of the quickest ways to reach genuinely tropical water from the US mainland." },
    ],
  },
  barbados: {
    intro:
      "Barbados sits at the more polished end of the Caribbean — calm, swimmable beaches on the Caribbean-side west coast, rougher Atlantic surf to the east, and a rum and food culture that's hard to match in the region.",
    highlights: [
      { icon: "🏖️", title: "The Platinum Coast", text: "The west coast's calm, clear water and fine sand — the island's classic postcard beaches." },
      { icon: "🥃", title: "Mount Gay Rum Distillery", text: "The world's oldest rum brand, distilled on the island since 1703, with tours and tastings in Bridgetown." },
      { icon: "🌊", title: "Bathsheba & the East Coast", text: "Dramatic Atlantic surf, coral rock formations and the island's surfing scene, a world away from the calm west coast." },
      { icon: "🏛️", title: "Historic Bridgetown", text: "A UNESCO World Heritage old town and garrison, walkable from the cruise port." },
    ],
  },
  nairobi: {
    intro:
      "Nairobi is the rare capital city with a national park inside it — and it's the usual starting point for a Kenyan safari, with the Maasai Mara and Amboseli both reachable on a short domestic flight.",
    highlights: [
      { icon: "🦁", title: "Nairobi National Park", text: "Lions, giraffes and rhinos roam within sight of the city skyline — a safari without leaving the capital." },
      { icon: "🐘", title: "Sheldrick Wildlife Trust", text: "An elephant orphanage where visitors watch rescued calves being fed and bathed, a short drive from the centre." },
      { icon: "🦒", title: "Giraffe Centre", text: "Hand-feed endangered Rothschild's giraffes at eye level — one of Nairobi's most popular half-day trips." },
      { icon: "✈️", title: "Gateway to safari country", text: "The Maasai Mara, Amboseli and Lake Nakuru are all a short domestic flight from Nairobi's airports, making it the natural base for a longer Kenya trip." },
    ],
  },
};
