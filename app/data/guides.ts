export interface Guide {
  slug: string;
  path: string; // URL segment under /barcelona/, e.g. "best-time-to-visit"
  title: string;
  excerpt: string;
  destination: string;
  category: string;
  readTime: string;
  publishedAt: string;
  image: string;
  content: string; // HTML
}

export const guides: Guide[] = [
  {
    slug: "best-time-to-visit-barcelona",
    path: "best-time-to-visit",
    title: "Best Time to Visit Barcelona — Month by Month Guide",
    excerpt:
      "When is the perfect time to visit Barcelona? We break down weather, crowds, prices and events month by month so you can plan the ideal trip.",
    destination: "barcelona",
    category: "Planning",
    readTime: "6 min",
    publishedAt: "2026-07-01",
    image: "/images/content/photo-1539037116277-4db20889f2d4.avif",
    content: `
<p>Barcelona is a genuine year-round destination — one of the few major European cities where you can sightsee in shorts in October and still find sunshine in January. But the <strong>best time to visit Barcelona</strong> depends entirely on what you want from your trip: beach days and warm sea, or empty museums and cheap flights. This month-by-month guide covers the weather, crowds, prices and events so you can pick the perfect window.</p>

<h2>Spring (March–May) — The Sweet Spot</h2>
<p>Spring is arguably the best time to visit Barcelona. Temperatures climb from a mild 17°C in March to a lovely 22°C by May, the city bursts into bloom, and the crushing summer crowds haven't yet arrived. Days are long and sunny, café terraces fill up, and you can comfortably walk the Gothic Quarter, queue for the Sagrada Família and hike up to Park Güell without wilting in the heat.</p>
<p>April and May are ideal for combining culture with the first proper beach afternoons — the sand is quiet and the light is beautiful, even if the sea is still a touch cool for a long swim. Hotel prices sit in a comfortable middle band, well below the July–August peak, and flight fares are reasonable if you book six to eight weeks ahead. Watch out for Easter (Setmana Santa), when prices and crowds spike for a week. Don't miss Sant Jordi on 23 April, when the whole city fills with books and roses — one of the most charming days in the Barcelona calendar.</p>

<h2>Summer (June–August) — Peak Season</h2>
<p>Summer is Barcelona at full volume. Temperatures hit 29°C and beyond in July and August, the Mediterranean warms to a swimmable 25°C, and the beachfront comes alive with chiringuitos, festivals and nightlife that runs until sunrise. If your priority is sun, sea and a buzzing party atmosphere, this is your season.</p>
<p>The trade-offs are real, though. This is peak tourist season: the Sagrada Família, Park Güell and Las Ramblas are packed, restaurant queues are long, and hotel prices are at their highest — a mid-range double that costs €120 in spring can top €200 in August. The city can feel sticky and humid, and locals famously flee in August, so some small family-run restaurants close for holidays. Book everything — flights, hotels, big attractions — well in advance, and start your sightseeing early to beat both the heat and the crowds. June is the pick of the three, with slightly lower prices and thinner crowds than the July–August crush.</p>

<h2>Autumn (September–November) — Golden Season</h2>
<p>Autumn is a hidden gem. September in particular is many travellers' favourite month: the summer heat softens to a perfect 26°C, the sea is still warm enough to swim, and once the first week passes the crowds thin dramatically as families head home for school. You get near-summer conditions with far more breathing room, and prices begin to fall.</p>
<p>September also brings La Mercè, Barcelona's biggest street festival, around the 24th — a spectacular free week of concerts, fireworks, human towers (castellers) and fire-running correfocs. October stays pleasant at 22°C but is the city's wettest month, so pack a light rain jacket. By November temperatures cool to the mid-teens and the beach season is over, but the city is at its calmest and cheapest for museums, food and long lunches. For the best balance of good weather, manageable crowds and value, mid-September to mid-October is hard to beat.</p>

<h2>Winter (December–February) — Budget Season</h2>
<p>Barcelona's winter is mild by northern-European standards — daytime highs of 14–15°C, plenty of blue-sky days and 2,500+ hours of annual sunshine mean it rarely feels bleak. This is the budget traveller's season: hotel rates drop to their lowest (outside Christmas and New Year), flights are cheap, and the big sights are blissfully quiet. February is statistically the cheapest month to fly, with average round-trip fares around $128.</p>
<p>You won't be swimming, but winter is perfect for the indoor city — the Picasso Museum, MACBA, the Palau de la Música, long tapas lunches and Christmas markets. December sparkles with festive lights and the Fira de Santa Llúcia market outside the cathedral, while January's sales are a shopper's dream. Pack layers and a warm jacket for cool evenings, and you'll have one of Europe's great cities largely to yourself.</p>

<h2>Month by Month at a Glance</h2>
<ul>
<li><strong>January:</strong> 14°C, cheapest flights, quiet, festive-sale bargains.</li>
<li><strong>February:</strong> 15°C, lowest average fares (~$128), few crowds.</li>
<li><strong>March:</strong> 17°C, spring begins, great value.</li>
<li><strong>April:</strong> 19°C, blooming and lively — mind Easter prices.</li>
<li><strong>May:</strong> 22°C, warm, sunny, ideal all-rounder.</li>
<li><strong>June:</strong> 26°C, beach season opens, pick of the summer.</li>
<li><strong>July:</strong> 29°C, hot and busy, priciest hotels.</li>
<li><strong>August:</strong> 29°C, peak crowds, some closures.</li>
<li><strong>September:</strong> 26°C, warm sea, La Mercè, superb value once schools return.</li>
<li><strong>October:</strong> 22°C, pleasant but the wettest month.</li>
<li><strong>November:</strong> 17°C, calm and cheap, beach season over.</li>
<li><strong>December:</strong> 15°C, mild, festive lights and markets.</li>
</ul>

<h2>Flight Tips</h2>
<p>Whenever you go, the biggest saving comes from timing your flight. February is the cheapest month to fly to Barcelona, followed by the shoulder months of March, November and January. July and August are the most expensive by far. Aim to book roughly six to eight weeks before departure for the best fares, and be flexible with your dates — midweek departures (Tuesday and Wednesday) are typically cheaper than weekends. Pairing a shoulder-season trip in May or September with a fare booked in advance is the single best way to enjoy Barcelona at its finest without paying peak prices.</p>
`,
  },
  {
    slug: "barcelona-budget-guide",
    path: "budget-guide",
    title: "Barcelona on a Budget — 5-Day Itinerary Under $500",
    excerpt:
      "Explore Barcelona without breaking the bank. Our complete budget guide covers free attractions, cheap eats, affordable accommodation and money-saving tips.",
    destination: "barcelona",
    category: "Budget",
    readTime: "8 min",
    publishedAt: "2026-07-05",
    image: "/images/content/photo-1558618666-fcd25c85cd64.avif",
    content: `
<p>Barcelona has a reputation as a pricey city break, but that's mostly a myth for anyone willing to plan a little. With free attractions, market lunches, cheap public transport and smart timing, you can experience the very best of the city — Gaudí, tapas, beaches and nightlife — for well under $100 a day. Here's a complete <strong>Barcelona budget guide</strong>, including a five-day itinerary that comes in under $500 excluding flights.</p>

<h2>How Much Does Barcelona Really Cost?</h2>
<p>A committed budget traveller can do Barcelona on $80–100 a day: think a hostel dorm or cheap private room, market and menú del día meals, a metro pass and one or two paid sights daily. Mid-range comfort runs $150–250. The two biggest levers are accommodation and how you eat — nail those and everything else falls into place.</p>

<h2>Where to Stay on a Budget</h2>
<p>Barcelona's hostel scene is excellent, with dorm beds from around $25 and clean private rooms from $60–80, especially in Gràcia, Sant Antoni and around Plaça Universitat. These neighbourhoods are central, safe and full of local life, yet noticeably cheaper than the Gothic Quarter or beachfront. Aparthotels and licensed apartments (look for an HUTB registration number) are great value for stays of four nights or more, giving you a kitchen to cut food costs. Book early and travel in the shoulder or winter seasons for the lowest rates.</p>

<h2>Eating Well for Less</h2>
<p>Food is where Barcelona rewards the savvy. The golden rule is the <strong>menú del día</strong>: a two- or three-course lunch with a drink for €12–16, served at countless neighbourhood restaurants on weekdays. It's the best-value meal in the city and often the day's main event for locals. Beyond that:</p>
<ul>
<li>Order at the bar, not the terrace — the same caña (small beer) or coffee costs 10–20% less.</li>
<li>Eat at market stalls: the bars inside Mercat de Santa Caterina and Mercat de Sant Antoni serve superb, cheap food with far fewer tourists than La Boqueria.</li>
<li>Grab picnic supplies from a supermarket (Bon Preu, Mercadona) — €4–6 buys a great lunch to eat on the beach or in a park.</li>
<li>Skip the picture-menu terraces on Las Ramblas; walk two streets into El Born or the Gothic Quarter for better food at half the price.</li>
</ul>

<h2>Free & Cheap Attractions</h2>
<p>You can fill days with free Barcelona. Wandering the Gothic Quarter and El Born, strolling Las Ramblas and the beaches, and admiring Gaudí's façades on Passeig de Gràcia all cost nothing. Park Güell's surrounding park is free (only the Monumental Zone is ticketed), and the Magic Fountain of Montjuïc puts on a free light-and-music show on select evenings. Many museums — including the Picasso Museum — are free on the first Sunday of the month and on certain weekday evenings, and MACBA is free on Saturday afternoons. The bunkers of El Carmel offer the city's best panoramic view for free.</p>
<p>When you do pay, prioritise: the Sagrada Família (from €26) is the one splurge worth making. Consider whether a Barcelona Card (from ~€22, bundling free transport and museum discounts) or the Articket (major art museums) pays off for your plans.</p>

<h2>Getting Around Cheaply</h2>
<p>Skip taxis and use the metro. A <strong>T-Casual</strong> ticket gives 10 journeys for €12.55, transferable across metro, bus and tram — most visitors need just one or two over several days. From the airport, the L9 Sud metro (€5.75) is cheaper than the Aerobus, and central Barcelona is so walkable you'll often not need transport at all. Rent a Donkey Republic bike (about €15/day) to cover more ground for less.</p>

<h2>A 5-Day Budget Itinerary (Under $500)</h2>
<p><strong>Day 1 — Old city (free):</strong> Explore the Gothic Quarter, the cathedral, El Born and Santa Maria del Mar, lunch on a menú del día, and end with sunset at Barceloneta beach. Cost: ~€20 (food + a drink).</p>
<p><strong>Day 2 — Gaudí (~€36):</strong> Pre-booked Sagrada Família in the morning, then walk Passeig de Gràcia past Casa Batlló and La Pedrera, and up to the free part of Park Güell. Picnic lunch. Cost: ~€45 with food.</p>
<p><strong>Day 3 — Montjuïc (~€15):</strong> Cable car or a walk up Montjuïc, the free Magic Fountain show in the evening, Fundació Joan Miró if the budget allows. Market lunch. Cost: ~€25.</p>
<p><strong>Day 4 — Beach & markets (free–€10):</strong> Morning at a quieter beach like Bogatell, afternoon browsing La Boqueria and Sant Antoni, tapas dinner ordered at the bar. Cost: ~€30.</p>
<p><strong>Day 5 — Day trip or free museums (~€10):</strong> First-Sunday free museums, or a cheap train to Sitges (~€8 return) for a beach day. Cost: ~€25.</p>
<p>Across five days, budget roughly €150 for food and drink, €60–80 for attractions and transport, and the rest for accommodation. Two people sharing a €70 room bring the per-person total comfortably under $500 for the whole trip, flights aside.</p>

<h2>Money-Saving Tips</h2>
<ul>
<li>Travel in the shoulder (April–May, September–October) or winter for the cheapest flights and hotels.</li>
<li>Carry a refillable water bottle — tap water is safe and free public fountains are everywhere.</li>
<li>Buy attraction tickets online in advance to avoid both queues and pricier on-the-door rates.</li>
<li>Keep valuables secure — pickpocketing is the one "hidden cost" that catches budget travellers out.</li>
</ul>
<p>Plan a little and Barcelona is one of Europe's best-value big cities. Lock in a cheap flight, eat where the locals eat, and lean on the wealth of free sights — you'll have an unforgettable trip without the eye-watering bill.</p>
`,
  },
  {
    slug: "barcelona-vs-madrid",
    path: "vs-madrid",
    title: "Barcelona vs Madrid — Which Spanish City Should You Visit?",
    excerpt:
      "Trying to choose between Barcelona and Madrid? We compare both cities on culture, food, nightlife, beaches, costs and flight options to help you decide.",
    destination: "barcelona",
    category: "Comparison",
    readTime: "7 min",
    publishedAt: "2026-07-10",
    image: "/images/content/photo-1543785734-4b6e564642f8.avif",
    content: `
<p>Barcelona and Madrid are Spain's two great cities, and choosing between them is one of the happiest dilemmas in European travel. Both are world-class, but they offer genuinely different experiences: one is a coastal, design-obsessed Catalan capital with a beach; the other a grand, high-energy Spanish capital of art and late nights. Here's an honest <strong>Barcelona vs Madrid</strong> comparison across the things that matter, so you can pick the right city for your trip.</p>

<h2>The Big Picture</h2>
<p>Barcelona sits on the Mediterranean, so it combines a compact, walkable old town with real beaches and Gaudí's unmistakable architecture. Madrid, landlocked in the centre of the country, is bigger, grander and more quintessentially "Spanish" — think monumental boulevards, world-beating art museums and a nightlife that genuinely never stops. Barcelona feels international and coastal; Madrid feels authentic and metropolitan.</p>

<h2>Culture & Architecture</h2>
<p>For architecture, Barcelona wins hands down. Nowhere else can match Gaudí's Sagrada Família, Park Güell, Casa Batlló and La Pedrera, backed by the medieval Gothic Quarter and modernista boulevards. It's a city you experience by looking up.</p>
<p>For fine art, Madrid takes it. The "Golden Triangle" — the Prado (Velázquez, Goya), the Reina Sofía (Picasso's Guernica) and the Thyssen-Bornemisza — is one of the greatest concentrations of masterpieces on earth. Madrid also has grand plazas, the Royal Palace and Retiro Park. So: Barcelona for architecture and atmosphere, Madrid for museums and imperial grandeur.</p>

<h2>Food</h2>
<p>Both cities eat brilliantly, but differently. Barcelona leans Catalan and Mediterranean — seafood, rice dishes, and a creative fine-dining scene (Disfrutar is among the world's best). Madrid is the meeting point of every Spanish region, famous for jamón, cocido madrileño stew, churros con chocolate and some of the country's best tapas crawls in La Latina. Madrid's tapas culture, where a drink often comes with a free bite, edges it for sheer value and variety; Barcelona edges it for seafood and innovation. You can't lose either way.</p>

<h2>Nightlife</h2>
<p>Madrid is Spain's undisputed nightlife capital — the party starts late and runs until dawn across neighbourhoods like Malasaña, Chueca and La Latina, with a legendary, unpretentious energy. Barcelona counters with world-famous beachfront superclubs (Opium, Pacha, Razzmatazz) and stylish cocktail bars in El Born. If you want vast clubs by the sea, choose Barcelona; if you want an all-city, all-night bar crawl with locals, Madrid delivers.</p>

<h2>Beaches</h2>
<p>No contest: Barcelona has beaches, Madrid does not. Barcelona's four kilometres of city sand, plus easy train trips to Sitges and the Costa Brava, make it the clear choice for a sun-and-sea trip. If beach time is on your list, Barcelona wins by default.</p>

<h2>Costs</h2>
<p>The two cities are broadly similar in price, but Madrid is generally a touch cheaper — especially for food and drink, where its tapas culture and less touristy centre keep costs down. Barcelona's hotel prices run higher in summer thanks to beach demand and events. For accommodation and dining value, Madrid has a slight edge; for the number of free outdoor attractions (beaches, Gaudí façades), Barcelona holds its own.</p>

<h2>Crowds & Feel</h2>
<p>Barcelona is more touristed and, in peak season, can feel crowded and occasionally frayed by over-tourism, with pickpocketing a real nuisance on Las Ramblas and the metro. Madrid feels more like a working Spanish capital where tourists blend in, and it's generally more relaxed and less pickpocket-prone. If you want a city that feels lived-in and local, Madrid; if you want the postcard icons and the beach, Barcelona.</p>

<h2>Getting There & Around</h2>
<p>Both have superb airports with excellent global connections and cheap flights from across Europe and direct routes from the US. Barcelona-El Prat and Madrid-Barajas are both well linked to their city centres by metro and bus. If you truly can't choose, the good news is they're just 2.5 hours apart on the high-speed AVE train, making a two-city trip easy — fly into one and out of the other.</p>

<h2>The Verdict</h2>
<p><strong>Choose Barcelona</strong> if you want beaches, jaw-dropping architecture, a compact walkable centre and a coastal, international vibe — ideal for first-time visitors and anyone combining city and sea. <strong>Choose Madrid</strong> if you're an art lover, a foodie chasing authentic tapas, or a night owl who wants the most vibrant, local nightlife in Spain. For most travellers wanting the iconic Spanish city break with a beach thrown in, Barcelona is the pick — and with cheap flights from around $128, it's an easy trip to justify. But you really can't go wrong, and the AVE means you don't have to choose forever.</p>
`,
  },
];

export function getGuidesByDestination(destination: string): Guide[] {
  return guides.filter((g) => g.destination === destination);
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideByPath(path: string): Guide | undefined {
  return guides.find((g) => g.path === path);
}

// Canonical URL for a guide article (now served as a Barcelona subpage).
export const guideHref = (g: Guide) => `/barcelona/${g.path}`;
