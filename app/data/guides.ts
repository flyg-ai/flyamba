export interface Guide {
  slug: string;
  /** Legacy URL segment for the three guides first published under
   *  /barcelona/. Kept only so next.config.ts can redirect those URLs to the
   *  canonical /guides/[slug] home; new guides do not set it. */
  path?: string;
  title: string;
  excerpt: string;
  /** Slug of the destination this guide is about, or null for general guides. */
  destination: string | null;
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
  {
    slug: "cheapest-days-to-fly",
    title: "Cheapest Days to Fly — When to Book for the Lowest Price",
    excerpt:
      "Which day of the week is cheapest to fly, how far ahead to book, and the months that consistently cost the least. The patterns behind airline pricing, explained.",
    destination: null,
    category: "Tips",
    readTime: "7 min",
    publishedAt: "2026-07-20",
    image: "/images/content/photo-1436491865332-7a61a109cc05.avif",
    content: `
<p>Airline pricing looks random from the outside, but it isn't. Fares move according to a handful of patterns that repeat across almost every route, and once you know them you can routinely cut a third off the price of the same trip. This guide covers the three things that actually matter — <strong>which day you fly, when you book, and which month you travel</strong> — and the smaller tricks worth knowing after that.</p>

<h2>The Cheapest Day of the Week to Fly</h2>
<p>Tuesday and Wednesday are consistently the cheapest days to depart, and they beat Friday and Sunday by a wide margin. The reason is simple: leisure travellers want to leave on a Friday evening and come home on a Sunday, while business travellers cluster around Monday mornings and Thursday evenings. Midweek departures sit in the gap, and airlines discount them to fill seats.</p>
<p>On short-haul European routes the gap is dramatic. The same Barcelona return can cost $90 leaving Tuesday and $190 leaving Friday, for identical flights three days apart. Shifting a long weekend to a Wednesday-to-Saturday pattern rather than Friday-to-Sunday frequently saves more than switching to a budget airline would.</p>
<p>The old advice about booking on a Tuesday is a myth, incidentally. It was briefly true in the era of weekly manual fare filing; modern airline revenue-management systems reprice continuously, so the day you sit down to buy makes essentially no difference. The day you <em>fly</em> is what matters.</p>

<h2>How Far Ahead to Book</h2>
<p>The sweet spot for most short-haul routes is <strong>six to eight weeks before departure</strong>. For long-haul, and for anything in peak season, stretch that to two or three months. Book much earlier than that and you're often paying the airline's opening price, which is set conservatively high; leave it much later and you're competing for the last few seats in the most expensive fare buckets.</p>
<p>The much-loved last-minute bargain is largely extinct on popular routes. Airlines now know that anyone booking a week out is either desperate or travelling on expenses, and they price accordingly. Genuine late deals still surface on thin routes and in the deep off-season, but betting on one for a summer holiday is how people end up paying double.</p>
<p>The most useful rule: fares generally rise as the aircraft fills, so the question isn't "will it get cheaper?" but "how full is this flight likely to get?" A February midweek flight to a business city has room to fall. An August Saturday to an island does not.</p>

<h2>The Cheapest Months to Fly</h2>
<p>Across Europe and the North Atlantic, <strong>late January to early March</strong> and <strong>the first half of November</strong> are reliably the cheapest windows. Demand collapses after the Christmas holidays and again once autumn half-term ends, and airlines discount hard to keep planes moving.</p>
<p>The most expensive periods are equally predictable: July and August, the fortnight around Christmas and New Year, and Easter week. School holidays drive this almost entirely — if you can travel outside them, you are competing with far fewer people for the same seats.</p>
<p>Watch for inversions, though. Winter-sun destinations like the Canary Islands and Dubai are busiest and priciest in the European winter, and cheapest in high summer when the heat is punishing. Southern-hemisphere destinations such as Cape Town invert the calendar entirely. The general rule is that you pay for pleasant weather, so the cheapest time to visit anywhere is usually the season locals would advise against.</p>

<h2>Flexibility Is Worth More Than Loyalty</h2>
<p>If you take one thing from this guide, make it this: being flexible by two or three days is worth more than any loyalty scheme, discount code or credit-card perk. A price calendar that shows a whole month at once will nearly always reveal a day that costs substantially less than the one you first had in mind, and moving to it takes seconds.</p>
<p>This is also why searching by exact dates is the most expensive way to shop for flights. If you start from "I want to go somewhere warm in November for under $400" rather than "I want to fly on the 14th", the search can work in your favour rather than against it.</p>

<h2>Smaller Things That Genuinely Help</h2>
<ul>
<li><strong>Check nearby airports.</strong> London has six, Milan three, New York three. A different airport can change the fare by a hundred dollars, but count the transfer cost and time before committing.</li>
<li><strong>Price one-ways separately.</strong> On routes served by different carriers in each direction, two one-way tickets often beat a return.</li>
<li><strong>Compare the total, not the headline.</strong> A $19 fare with a $45 bag and $12 seat selection is not a $19 fare. Budget carriers win on many routes even after extras — but you have to check rather than assume.</li>
<li><strong>Ignore the incognito myth.</strong> Airlines do not raise prices because you looked twice. Fares change because seats sell and revenue systems reprice. Clearing cookies achieves nothing.</li>
<li><strong>Book direct where you can.</strong> Once you have found the fare, buying from the airline makes changes, cancellations and disruption far easier to handle than going through a reseller.</li>
</ul>

<h2>Putting It Together</h2>
<p>The cheapest trip is usually a midweek departure, booked six to eight weeks ahead, in a shoulder or off-season month, to an airport you were flexible about. Get three of those four right and you will pay well below what most people on your flight paid. Start with a month-view price calendar rather than a fixed date, and let the cheap days find you.</p>
`,
  },
  {
    slug: "how-to-find-cheap-flights",
    title: "How to Find Cheap Flights — 12 Tips That Actually Work",
    excerpt:
      "Twelve practical, tested ways to pay less for the same seat — and the popular tricks that are myths. No incognito mode required.",
    destination: null,
    category: "Tips",
    readTime: "9 min",
    publishedAt: "2026-07-24",
    image: "/images/content/photo-1488646953014-85cb44e25828.avif",
    content: `
<p>There is a lot of folklore about finding cheap flights, and a fair amount of it is nonsense. What follows are twelve things that genuinely move the price, roughly in order of how much difference they make — plus the myths worth ignoring so you stop wasting effort on them.</p>

<h2>1. Be Flexible With Dates Before Anything Else</h2>
<p>Nothing else comes close. Moving a departure from Friday to Tuesday, or shifting a week either side of a school holiday, regularly halves the fare. Search by month rather than by date and let the calendar show you where the cheap days sit.</p>

<h2>2. Travel in Shoulder Season</h2>
<p>May, early June, late September and October give you most of the good weather at a fraction of the peak price, with thinner crowds as a bonus. For many European destinations the shoulder season is genuinely the best time to visit, not a compromise.</p>

<h2>3. Book Six to Eight Weeks Out</h2>
<p>Long enough that the cheap fare buckets are still open, close enough that the airline has started discounting from its opening price. Stretch to two or three months for long-haul and peak season.</p>

<h2>4. Fly Midweek</h2>
<p>Tuesday and Wednesday departures are the cheapest on almost every route, because leisure demand clusters on Friday and Sunday. Returning midweek compounds the saving.</p>

<h2>5. Check Nearby Airports — But Count the Transfer</h2>
<p>Secondary airports can be dramatically cheaper. Just be honest about the cost: a €25 coach and ninety minutes each way can wipe out a €40 saving, and arriving at 1am to find no public transport is its own kind of expensive.</p>

<h2>6. Compare the Total, Not the Headline Fare</h2>
<p>Budget airlines price the seat and sell everything else separately. Add a cabin bag, hold luggage, seat selection and priority boarding and a €19 fare can land at €90. Sometimes it still wins — but only compare like with like.</p>

<h2>7. Price One-Ways Separately</h2>
<p>Mixing carriers, or flying out with one airline and back with another, frequently beats a single return. This is especially true where a low-cost carrier serves one direction at a better time than the other.</p>

<h2>8. Consider One-Stop Routings on Long-Haul</h2>
<p>A connection through a big hub is often far cheaper than the nonstop, sometimes by hundreds. If the layover is comfortable and you value the money more than the hours, it is the single biggest saving available on intercontinental trips.</p>

<h2>9. Let the Destination Be Flexible Too</h2>
<p>If what you actually want is "somewhere warm and cheap in October", picking the destination last rather than first opens the whole map. Fares vary far more between destinations than between airlines to the same destination.</p>

<h2>10. Set Up Alerts and Then Be Ready to Move</h2>
<p>Price alerts are useful, but only if you can act. A genuinely good fare on a popular route may last hours, not days. Decide your ceiling in advance so you are not deliberating while the fare climbs.</p>

<h2>11. Watch for Error Fares and Flash Sales — Carefully</h2>
<p>They are real and occasionally spectacular. Book quickly, do not book connecting travel or hotels until the ticket is confirmed and ticketed, and accept that an airline may cancel a genuine mistake fare.</p>

<h2>12. Buy From the Airline Once You Have Found the Fare</h2>
<p>Use comparison tools to discover the price, then book direct where the difference is small. If a flight is cancelled, delayed or needs changing, dealing with the airline rather than a third party will save you hours and quite possibly money.</p>

<h2>Myths You Can Safely Ignore</h2>
<ul>
<li><strong>Incognito mode and clearing cookies.</strong> Airlines do not track you and raise prices. Fares change because seats sell.</li>
<li><strong>Booking on a Tuesday.</strong> True in the 1990s when fares were filed weekly by hand. Modern systems reprice continuously.</li>
<li><strong>The magic number of days in advance.</strong> There is a useful range, not a precise date. Anyone quoting an exact best day to book is selling something.</li>
<li><strong>Last-minute bargains.</strong> Rare on popular routes and getting rarer. Waiting is a gamble that usually loses in peak season.</li>
<li><strong>Prices always drop on the day of the week you last checked.</strong> Coincidence. Fares move constantly in both directions.</li>
</ul>

<h2>The Short Version</h2>
<p>Flexibility beats every trick. Search a month rather than a date, favour midweek departures in shoulder season, book six to eight weeks out, compare the total price including bags, and be willing to change airport or destination. Do that and you will pay less than nearly everyone else on the aircraft — without a single browser trick.</p>
`,
  },
  {
    slug: "best-european-city-breaks",
    title: "Best European City Breaks 2026 — 10 Perfect Weekend Destinations",
    excerpt:
      "Ten European cities that work brilliantly in two or three days — what each one is best for, when to go, and roughly what a weekend costs.",
    destination: null,
    category: "Inspiration",
    readTime: "10 min",
    publishedAt: "2026-07-28",
    image: "/images/content/photo-1512100356356-de1b84283e18.avif",
    content: `
<p>The best city break destinations share a few traits: a compact centre you can cover on foot, enough to fill two or three days without rushing, good food at reasonable prices, and cheap enough flights that the trip is worth taking for a weekend. These ten deliver on all four — and each is best for something slightly different.</p>

<h2>1. Lisbon — Best for Value</h2>
<p>Lisbon remains the best-value capital in Western Europe. Tiled façades, tram 28 grinding up through Alfama, viewpoints over terracotta roofs, and some of the finest seafood on the continent for a fraction of what it costs in Paris or Copenhagen. Two full days covers Alfama, Belém and Bairro Alto comfortably. Go in April, May or October — summer is hot and crowded, winter is mild but wetter.</p>

<h2>2. Prague — Best for a First City Break</h2>
<p>Compact, walkable, spectacular, and still cheap once you leave the Old Town Square. The castle, Charles Bridge and the Jewish Quarter fill a weekend easily, and beer costs less than water. December's Christmas markets are magical but pricey and packed; February and March are the value months.</p>

<h2>3. Barcelona — Best for City and Beach</h2>
<p>The rare city where you can see world-class architecture in the morning and swim in the afternoon. Gaudí, the Gothic Quarter and four kilometres of city beach make it the ideal long-weekend pick. Book the Sagrada Família ahead — turning up hoping to walk in is how people miss it. May and September are the sweet spots.</p>

<h2>4. Rome — Best for History</h2>
<p>Nowhere packs more into walking distance. The Colosseum, the Forum, the Pantheon, the Vatican and half a dozen of the world's great piazzas sit within a couple of kilometres. Three days is the minimum to do it without sprinting. Avoid July and August — the heat is genuinely punishing and the queues worse.</p>

<h2>5. Amsterdam — Best for a Short Hop</h2>
<p>Small enough to cross on foot or by bike, with the Rijksmuseum and Van Gogh Museum among Europe's best. The canal belt is beautiful in any weather, which matters in a country that gets plenty of it. April brings the tulips and the crowds; September and October are quieter and just as pleasant.</p>

<h2>6. Athens — Best for Culture on a Budget</h2>
<p>The Acropolis alone justifies the trip, but Athens has become a genuinely great food and nightlife city too, at prices well below Western Europe. Add a day on the Athenian Riviera beaches, or use it as a launchpad to the islands. Spring and autumn are ideal; July and August are brutally hot.</p>

<h2>7. Vienna — Best for Grandeur</h2>
<p>Imperial palaces, world-class classical music and the finest café culture in Europe. Vienna rewards a slower pace than most city breaks — plan fewer things and linger longer. Beautiful in December for the markets, and lovely in May and September.</p>

<h2>8. Copenhagen — Best for Design and Food</h2>
<p>Expensive, but genuinely special: Nordic design, cycling infrastructure that puts everywhere else to shame, and a restaurant scene that reshaped modern cooking. Offset the cost by eating at the street-food markets and renting a bike rather than taking taxis. Best from May to September, when the long evenings are the whole point.</p>

<h2>9. Porto — Best for a Quieter Weekend</h2>
<p>Lisbon's smaller northern rival, and arguably more atmospheric: the Douro riverfront, port lodges across the water in Gaia, and azulejo-covered churches at every turn. Cheaper and calmer than Lisbon, and small enough that two days is genuinely enough. Great from April to October.</p>

<h2>10. Kraków — Best for Value in Central Europe</h2>
<p>One of Europe's most beautiful medieval squares, a castle above the river, and the sobering, essential day trip to Auschwitz-Birkenau. Very affordable, easy to reach on low-cost carriers, and manageable in a long weekend. Spring and early autumn are best.</p>

<h2>Making a City Break Cheap</h2>
<p>The economics of a weekend trip are dominated by two things: the flight and the first night. Fly out Thursday evening or Friday morning and back Sunday evening and you will pay peak prices; shift to a Wednesday-to-Saturday and the same trip often costs a third less. Shoulder season compounds the saving further.</p>
<p>For accommodation, staying one metro stop outside the historic centre typically cuts the rate substantially without costing you more than ten minutes. And in almost all of these cities, lunch is where the value is — a set lunch menu at a proper restaurant costs a fraction of the same food at dinner.</p>

<h2>Choosing Between Them</h2>
<p>If it is your first European city break, take Prague or Lisbon. If you want sun and sea alongside the sightseeing, Barcelona or Athens. If you have three days and a love of history, Rome. If you want somewhere calm and beautiful that most people overlook, Porto. All ten are reachable on cheap direct flights from most of Europe, and every one of them works properly in a weekend.</p>
`,
  },
  {
    slug: "best-beaches-europe",
    title: "Best Beaches in Europe 2026 — Crystal Clear Water & Sun",
    excerpt:
      "From Greek island coves to Atlantic surf and Croatian pebble bays — the European beaches worth planning a trip around, and when to go.",
    destination: null,
    category: "Inspiration",
    readTime: "9 min",
    publishedAt: "2026-08-01",
    image: "/images/content/photo-1507525428034-b723cf961d3e.avif",
    content: `
<p>Europe's coastline runs from Arctic Norway to the edge of Africa, which means "the best beach" depends entirely on what you want — bath-warm Mediterranean water, dramatic Atlantic cliffs, or somewhere you can swim in the morning and eat properly in the evening. These are the beaches and beach regions worth building a trip around, grouped by what makes them special.</p>

<h2>The Greek Islands — Clearest Water</h2>
<p>Nothing in Europe beats the Aegean and Ionian for water clarity. <strong>Kefalonia's Myrtos Beach</strong>, a crescent of white pebbles beneath sheer cliffs, is the classic image, and it earns it. <strong>Lefkada's west coast</strong> — Porto Katsiki and Egremni — offers the same startling turquoise with fewer people. On <strong>Mykonos</strong> the beaches come with beach clubs and a soundtrack; on <strong>Santorini</strong> they are volcanic black and red, more dramatic than swimmable.</p>
<p>Go in June or September. July and August bring the meltemi wind, the highest prices of the year and ferries booked solid.</p>

<h2>Croatia and the Adriatic — Best for Scenery</h2>
<p>Croatian beaches are mostly pebble rather than sand, which is exactly why the water is so clear. <strong>Zlatni Rat</strong> on Brač is the famous one, a shifting spit of shingle that changes shape with the current. The islands around <strong>Hvar</strong> and <strong>Korčula</strong> hide dozens of quieter coves reachable only by boat, and <strong>Dubrovnik</strong> pairs swimming with one of the great walled cities.</p>
<p>Bring water shoes, and travel in June or late September — August on the Adriatic is expensive and busy.</p>

<h2>The Balearics — Best All-Rounder</h2>
<p><strong>Mallorca</strong> has genuinely spectacular coves on its north and east coasts — Cala Formentor and Cala Varques among them — that bear no resemblance to the package-holiday reputation. <strong>Menorca</strong> is the quiet one, with Cala Macarella and Cala Mitjana as good as anything in the Mediterranean. <strong>Ibiza</strong> delivers Cala Comte's sunsets alongside the nightlife, and <strong>Formentera</strong>, a short ferry away, has the best sand in Spain.</p>
<p>May, June and September are ideal. The islands are well served by cheap flights, which makes a beach week genuinely affordable outside August.</p>

<h2>The Canary Islands — Best for Winter Sun</h2>
<p>The only reliable place in Europe to swim in January. <strong>Tenerife</strong>, <strong>Gran Canaria</strong> and <strong>Fuerteventura</strong> sit far enough south for 20–24°C in midwinter, with Fuerteventura's Corralejo dunes the standout for sheer space. The trade-off is that the winter is peak season here, so prices invert — May and June are the cheapest months to visit.</p>

<h2>Portugal — Best for Atlantic Drama</h2>
<p>The <strong>Algarve</strong>'s golden cliffs and sea caves around Lagos and Benagil are the postcard, and rightly so. Further north, the beaches near <strong>Lisbon</strong> — Cascais, Guincho, and the wild Costa da Caparica — put a proper Atlantic beach day within half an hour of a capital city. The water is markedly colder than the Mediterranean and the surf is real, which is the appeal for some and the drawback for others.</p>
<p>June to September for swimming; the Algarve stays pleasant well into October.</p>

<h2>Sardinia and Sicily — Best for Sand</h2>
<p><strong>Sardinia</strong> has the finest sand in the Mediterranean, full stop. La Pelosa in the northwest and the beaches of the Costa Rei rival the Caribbean for colour. <strong>Sicily</strong> offers San Vito Lo Capo and the Scala dei Turchi's white limestone terraces, with far more history attached. Both reward a car and a week rather than a long weekend.</p>

<h2>Southern France — Best for a Polished Trip</h2>
<p>The <strong>Côte d'Azur</strong> is busy, expensive and still lovely — Nice, Antibes and the calanques near Cassis are worth the prices if you go in June or September rather than August, when the whole of France is there.</p>

<h2>Practical Notes</h2>
<ul>
<li><strong>Water temperature lags air temperature by about a month.</strong> June air can be perfect while the sea is still bracing; September is often the best swimming of the year.</li>
<li><strong>Pebble beaches mean clear water.</strong> Sand suspends in the surf; shingle does not. Pack water shoes rather than avoiding them.</li>
<li><strong>The best coves need a car or a boat.</strong> If the beach is walkable from a resort, it will be busy. Half an hour of effort buys a lot of space.</li>
<li><strong>Check the wind, not just the sun.</strong> The meltemi in Greece and the mistral in France can make a beautiful forecast unpleasant on an exposed beach.</li>
</ul>

<h2>Where to Start</h2>
<p>For clear water and island-hopping, the Ionian islands. For a beach holiday that is easy to reach and easy to afford, the Balearics. For winter swimming, the Canaries. For scenery you will remember, Croatia or Sardinia. All are served by cheap direct flights across Europe — and every one of them is a different trip in June than it is in August.</p>
`,
  },
  {
    slug: "london-travel-guide",
    title: "London Travel Guide 2026 — Everything You Need to Know",
    excerpt:
      "How to do London well: which airport to fly into, how to get around, where to stay, what actually costs money and what doesn't, and when to go.",
    destination: "london",
    category: "Guide",
    readTime: "11 min",
    publishedAt: "2026-08-05",
    image: "/images/content/photo-1513735492246-483525079686.avif",
    content: `
<p>London rewards planning more than almost any European capital. It is huge, it is expensive if you let it be, and the difference between a well-organised trip and a chaotic one is enormous. This guide covers the practical decisions — airport, transport, neighbourhood, budget and timing — plus what is genuinely worth your time once you are there.</p>

<h2>Which Airport to Fly Into</h2>
<p>London has six airports and they are not interchangeable. <strong>Heathrow (LHR)</strong> is the largest and best connected to the centre, on the Piccadilly line and the Elizabeth line. <strong>Gatwick (LGW)</strong> is further south but has fast, frequent trains to Victoria and London Bridge. <strong>City (LCY)</strong> is tiny, closest to the centre, and brilliant if your airline flies there.</p>
<p><strong>Stansted (STN)</strong> and <strong>Luton (LTN)</strong> are where most low-cost carriers land, and both are genuinely far out — budget an hour and £20–25 each way. A £15 saving on the fare disappears quickly. <strong>Southend (SEN)</strong> is furthest of all. When comparing fares, always add the transfer cost and time before deciding.</p>

<h2>Getting Around</h2>
<p>Do not buy an Oyster card. Just tap a contactless bank card or phone on every reader — the fare is identical, daily and weekly caps apply automatically, and there is nothing to buy or top up. Tap in and out on the Tube and rail; tap only once on buses.</p>
<p>The Tube is fast but the map distorts distances badly — Covent Garden to Leicester Square takes longer underground than on foot. Central London is far more walkable than visitors expect, and walking is how you actually see the city. Buses are cheaper than the Tube, capped separately, and give you a view.</p>
<p>The Elizabeth line has transformed east–west journeys and is worth knowing about; it connects Heathrow, the West End, the City and Canary Wharf quickly.</p>

<h2>Where to Stay</h2>
<p>Location matters more than the hotel. <strong>South Bank and Southwark</strong> put you walking distance from the Tate Modern, Borough Market and the river, with better value than the West End. <strong>Bloomsbury and King's Cross</strong> are central, well connected and quieter at night. <strong>Shoreditch</strong> for nightlife and food, <strong>Notting Hill and Bayswater</strong> for a calmer, more residential stay.</p>
<p>Staying two or three Tube stops out of Zone 1 typically saves a substantial amount for very little inconvenience. Avoid booking somewhere purely because it is cheap without checking the transport links — a bargain in Zone 4 is not a bargain.</p>

<h2>What Costs Money and What Doesn't</h2>
<p>London's greatest bargain is that its major museums are free. The <strong>British Museum</strong>, <strong>National Gallery</strong>, <strong>Tate Modern</strong>, <strong>Natural History Museum</strong>, <strong>V&A</strong> and <strong>Science Museum</strong> all cost nothing to enter, and any one of them could fill a day. Special exhibitions are ticketed; the permanent collections are not.</p>
<p>Also free: the parks (Hyde Park, Regent's Park, Hampstead Heath for the best view in London), the changing of the guard, Borough Market to wander, the South Bank, Sky Garden if you book a slot in advance, and most of the city's finest architecture from the outside.</p>
<p>What genuinely costs: the Tower of London, Westminster Abbey, St Paul's, the London Eye and West End theatre. Pick two or three rather than trying to do all of them. For theatre, day seats and the TKTS booth in Leicester Square cut prices substantially over booking ahead at face value.</p>

<h2>Eating Well Without Overpaying</h2>
<p>London's food scene is genuinely world-class now, and the value sits at the informal end. Borough Market, Maltby Street and Brick Lane for street food; the city's Indian, Turkish, Vietnamese and West African restaurants for some of the best cooking anywhere at moderate prices. A proper curry on Brick Lane or in Tooting costs a fraction of a mediocre tourist-trap meal in Leicester Square.</p>
<p>Set lunch menus at good restaurants are the single best value in the city — often half the price of the same kitchen's dinner. And a pub lunch remains one of London's great institutions.</p>

<h2>When to Go</h2>
<p>May, June and September are the best months: long days, decent weather and the parks at their best. July and August are warm but busy and expensive, and the city empties of locals. Winter is dark and damp but genuinely cheap — January and February have the lowest flight and hotel prices of the year, and the museums are free regardless of weather, which makes London an unusually good cold-season city break.</p>
<p>December is the exception: Christmas lights and markets push prices back up sharply.</p>

<h2>Practical Notes</h2>
<ul>
<li><strong>Stand on the right</strong> on Tube escalators. This is not a suggestion.</li>
<li><strong>Tipping</strong> is 10–12.5% in restaurants and often added as a service charge — check before adding more. No tipping in pubs when ordering at the bar.</li>
<li><strong>Contactless everywhere.</strong> Cash is genuinely unnecessary; many places no longer take it.</li>
<li><strong>Three days minimum.</strong> London is too big to sample in a weekend and still feel you have seen it. Five days lets you add Greenwich, Hampstead or a day trip.</li>
<li><strong>Book the big-ticket sights ahead.</strong> The Tower, Westminster Abbey and popular exhibitions sell out, and on-the-door prices are higher.</li>
</ul>

<h2>Getting There Cheaply</h2>
<p>London is one of the best-connected cities on earth, which keeps fares competitive year-round. January and February are consistently the cheapest months to fly in, and midweek departures beat weekends as everywhere. With six airports competing, it is always worth checking more than one — but factor the transfer honestly, because the cheapest fare into Stansted is not always the cheapest way to reach London.</p>
`,
  },
];

export function getGuidesByDestination(destination: string): Guide[] {
  return guides.filter((g) => g.destination === destination);
}

/** Most recent guides first. */
export function latestGuides(limit?: number): Guide[] {
  const sorted = [...guides].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return limit ? sorted.slice(0, limit) : sorted;
}

/** Distinct destination slugs that actually have a guide, for the hub filter. */
export function guideDestinations(): string[] {
  return [...new Set(guides.map((g) => g.destination).filter((d): d is string => !!d))].sort();
}

/** Distinct categories in use, so the hub never renders an empty filter. */
export function guideCategories(): string[] {
  return [...new Set(guides.map((g) => g.category))].sort();
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuideByPath(path: string): Guide | undefined {
  return guides.find((g) => g.path === path);
}

// Canonical URL for a guide article. Everything lives under /guides/[slug];
// the three original /barcelona/<path> URLs 308-redirect here so the same
// article is never served from two addresses.
export const guideHref = (g: Guide) => `/guides/${g.slug}`;
