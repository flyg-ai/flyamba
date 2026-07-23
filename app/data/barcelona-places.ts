// Editorial Barcelona place data for the category subpages. Ratings and review
// counts are research-based editorial estimates (rounded, plausible against
// public Google Maps figures), NOT live data — they give the cards a credible
// "★ rating (N reviews)" row without a Places API dependency.

export type PracticalInfo = {
  openingHours: string;
  price: string;
  howToGetThere: string;
};

export type BcnPlace = {
  name: string;
  slug: string;
  image: string;
  rating: number; // 4.1–4.9
  reviewCount?: number;
  price?: string; // pill (e.g. "€26", "Free", "€€€")
  type?: string; // pill / right value (nightlife, shopping, restaurants, hotels)
  area: string; // left value
  category?: string; // attractions right value
  facilities?: string; // beaches right value
  ageGroup?: string; // with-kids right value
  distance?: string; // day-trips right value
  duration?: string;
  tip: string; // italic insider quote
  tiqetsUrl?: string; // affiliate booking link (attractions/day-trips)
  filterKeys: string[]; // aligns with each page's filter pills
  description: string; // 2–3 sentence card/summary line
  practicalInfo: PracticalInfo;
  fullDescription: string; // 150–200 words for the long-form SEO section
};

const A = (f: string) => `/images/barcelona/attractions/${f}`;
const B = (f: string) => `/images/barcelona/beaches/${f}`;
const N = (f: string) => `/images/barcelona/nightlife/${f}`;
const S = (f: string) => `/images/barcelona/shopping/${f}`;
const K = (f: string) => `/images/barcelona/with-kids/${f}`;
const D = (f: string) => `/images/barcelona/day-trips/${f}`;
const FOOD_IMG = "/images/content/photo-1414235077428-338989a2e8c0.avif";
const HOTEL_IMG = "/images/content/photo-1566073771259-6a8506099945.avif";
const tiqets = (q: string) =>
  `https://tp.media/r?campaign_id=89&marker=711264&p=2074&trs=508580&u=${encodeURIComponent(
    `https://www.tiqets.com/en/search?q=${encodeURIComponent(q)}`,
  )}`;

// ── Attractions (20) ────────────────────────────────────────────────────────
export const ATTRACTIONS: BcnPlace[] = [
  {
    name: "Sagrada Família", slug: "sagrada-familia", image: A("sagrada-familia.webp"),
    rating: 4.8, reviewCount: 328000, price: "€26", area: "Eixample", category: "Architecture",
    tip: "Book online two weeks ahead and go at 09:00 or 16:00 for the best stained-glass light.",
    tiqetsUrl: tiqets("Sagrada Familia Barcelona"), filterKeys: ["must-see", "architecture"],
    description: "Gaudí's unfinished basilica is Barcelona's defining landmark and a UNESCO World Heritage Site, under construction since 1882.",
    practicalInfo: { openingHours: "Mon–Sat 09:00–20:00, Sun 10:30–20:00 (seasonal)", price: "From €26; +€10 for tower access", howToGetThere: "Metro L2/L5 to Sagrada Família (exit at the base of the towers)" },
    fullDescription: "Antoni Gaudí's Sagrada Família is the single sight no first-time visitor should miss. Begun in 1882 and still rising toward completion, this UNESCO-listed basilica fuses Gothic ambition with Gaudí's nature-driven Modernisme. The exterior tells the story across the Nativity and Passion façades, but it's the interior that stuns: a forest of tree-like columns branching into the vaults, washed in coloured light pouring through the stained glass — warm reds and oranges to the west, cool blues and greens to the east. Allow 1.5–2 hours, and add the tower lift for close-up views of the city and the intricate spires. Tickets are timed and sell out days ahead in high season, so buy online in advance. Arriving right at opening or in the late afternoon gives you the best light and thinner crowds. It remains a working church, so dress respectfully.",
  },
  {
    name: "Park Güell", slug: "park-guell", image: A("park-guell.webp"),
    rating: 4.7, reviewCount: 182000, price: "€10", area: "Gràcia", category: "Architecture / Nature",
    tip: "Book the 08:00–09:30 slot — softer light, far fewer people, and cooler in summer.",
    tiqetsUrl: tiqets("Park Guell Barcelona"), filterKeys: ["must-see", "architecture", "nature", "parks"],
    description: "Gaudí's mosaic wonderland on Carmel Hill, with gingerbread gatehouses, a serpentine tiled bench and sweeping city views.",
    practicalInfo: { openingHours: "Daily 09:30–19:30 (seasonal)", price: "€10 Monumental Zone (online); surrounding park free", howToGetThere: "Metro L3 to Vallcarca, then escalators uphill; or bus 24 to the top gate" },
    fullDescription: "Perched on Carmel Hill, Park Güell is Gaudí's most joyful creation — a would-be garden city reimagined as a surreal public park. The ticketed Monumental Zone holds the icons: the mosaic salamander (El Drac) on the dragon stairway, the Hypostyle Hall of tilted columns, and the undulating trencadís bench that frames one of the best panoramas in Barcelona, out over the city to the Mediterranean. Beyond the paid zone, a large free park of paths and viewpoints rewards a wander. Entry is timed and capped, so book ahead; the earliest morning slots give soft light, cooler temperatures and room to breathe. Getting there is half the fun — take metro L3 to Vallcarca and ride the outdoor escalators up, or catch the 24 bus to the upper entrance to save the climb. Budget around 1.5 hours for the Monumental Zone plus the free viewpoints.",
  },
  {
    name: "Casa Batlló", slug: "casa-batllo", image: A("casa-batllo.webp"),
    rating: 4.7, reviewCount: 151000, price: "€35", area: "Passeig de Gràcia", category: "Architecture",
    tip: "The evening 'Magic Nights' visit with a rooftop drink is quieter and genuinely magical.",
    tiqetsUrl: tiqets("Casa Batllo Barcelona"), filterKeys: ["architecture", "art"],
    description: "Gaudí's most theatrical townhouse, with a scaly dragon-back roof, bone-like balconies and an ocean-blue light well.",
    practicalInfo: { openingHours: "Daily 09:00–20:00 (last entry ~19:00)", price: "From €35 standard; Gold skip-line ~€45", howToGetThere: "Metro L2/L3/L4 to Passeig de Gràcia; the house is a two-minute walk" },
    fullDescription: "On the elegant Passeig de Gràcia, Casa Batlló is Gaudí at his most playful. Remodelled in 1904–06, the façade shimmers with broken-tile mosaic and glass, its balconies shaped like masks or bones — locals nicknamed it the 'House of Bones'. Inside, straight lines all but vanish: doorways curve like waves, the central light well deepens from pale to deep blue to distribute light evenly, and the loft's catenary arches evoke a ribcage. The rooftop is the finale, a spine of scaly tiles and mushroom-shaped chimneys read by many as St George's dragon. The standard ticket includes an augmented-reality guide that animates the rooms; the evening 'Magic Nights' add live music and a drink on the roof with far smaller crowds. Book online to skip the queue, and pair it with Casa Milà 400 metres up the street for a single Modernisme morning.",
  },
  {
    name: "Casa Milà (La Pedrera)", slug: "casa-mila-la-pedrera", image: A("casa-mil-la-pedrera.webp"),
    rating: 4.6, reviewCount: 92000, price: "€25", area: "Passeig de Gràcia", category: "Architecture",
    tip: "The rooftop 'Night Experience' projection show is the highlight — book a summer evening slot.",
    tiqetsUrl: tiqets("La Pedrera Casa Mila Barcelona"), filterKeys: ["architecture"],
    description: "Gaudí's undulating limestone apartment block, famous for its warrior-like rooftop chimneys and wave-shaped façade.",
    practicalInfo: { openingHours: "Daily 09:00–20:30; night visits after 21:00 (seasonal)", price: "From €25 day; night experience ~€35", howToGetThere: "Metro L3/L5 to Diagonal, 200 m along Passeig de Gràcia" },
    fullDescription: "Casa Milà, universally known as La Pedrera ('the stone quarry') for its rippling limestone façade, was Gaudí's last civil work before he devoted himself to the Sagrada Família. A UNESCO World Heritage Site, it broke every convention of its day: a self-supporting stone skin, an open-plan interior free of load-bearing walls, and interior courtyards that flood the flats with light. The visit climbs through a restored Modernista apartment furnished in period style and a parabolic-arch attic that once housed the laundry, before opening onto the surreal rooftop — a landscape of helmeted chimneys and vents framing views to the Sagrada Família. After dark, the 'Night Experience' projects light and music across those chimneys, a genuinely memorable way to end a day. It sits 400 metres from Casa Batlló, so most visitors do the two together. Book ahead, especially for the sought-after evening slots.",
  },
  {
    name: "Gothic Quarter", slug: "gothic-quarter", image: A("gotiska-kvarteren.webp"),
    rating: 4.7, reviewCount: 61000, price: "Free", area: "Ciutat Vella", category: "History",
    tip: "Wander at 08:00–10:00 before the shops open — the medieval lanes are almost yours.",
    filterKeys: ["free", "must-see"],
    description: "The medieval heart of the old city: a labyrinth of narrow lanes, hidden squares, Roman remains and the cathedral.",
    practicalInfo: { openingHours: "Streets always open; cathedral ~09:30–18:30", price: "Free to explore; cathedral ~€9", howToGetThere: "Metro L3/L4 to Liceu or Jaume I; the quarter is fully walkable" },
    fullDescription: "The Barri Gòtic is Barcelona's atmospheric medieval core, a maze of narrow stone lanes layered over two thousand years of history. At its centre stands the Gothic cathedral, ringed by hidden squares like Plaça del Rei and Plaça Sant Felip Neri, still scarred from the Civil War. Roman columns survive on Carrer del Paradís, sections of the old wall trace the original city, and the medieval Jewish quarter, El Call, threads through some of the tightest alleys. It's free and best experienced on foot with no fixed plan — turn down promising lanes and let them open onto sunlit plazas full of buskers and tapas bars. Come early morning before the boutiques open, or in the evening when the lamplight does the work, to feel the quarter at its most cinematic. Watch your bag around Plaça Reial and the busier arteries, where pickpockets work the crowds. A guided walk (from about €15) helps decode the history.",
  },
  {
    name: "Las Ramblas", slug: "las-ramblas", image: A("las-ramblas.webp"),
    rating: 4.3, reviewCount: 121000, price: "Free", area: "Ciutat Vella", category: "Promenade",
    tip: "Walk it early, keep valuables zipped, and eat two streets away — never on the boulevard itself.",
    filterKeys: ["free"],
    description: "Barcelona's famous tree-lined promenade from Plaça Catalunya to the harbour, buzzing with performers and flower stalls.",
    practicalInfo: { openingHours: "Always open; La Boqueria market Mon–Sat 08:00–20:30", price: "Free", howToGetThere: "Metro L1/L3 to Catalunya (top) or L3 to Drassanes/Liceu (middle)" },
    fullDescription: "Las Ramblas is the 1.2-kilometre promenade that slices through the old city from Plaça de Catalunya down to the Columbus monument at the harbour. Tree-shaded and always in motion, it's lined with flower kiosks, cafés, human statues and newsstands, and it's the classic first walk for anyone arriving in Barcelona. Halfway down, duck into the Mercat de la Boqueria — one of Europe's most colourful food markets, piled with jamón, seafood and fresh juices — and note the Miró pavement mosaic at Pla de l'Os. The boulevard is unashamedly touristy and its restaurants are overpriced tourist traps, so treat it as a corridor rather than a destination: stroll it, then step into El Raval or the Gothic Quarter for real food and lower prices. It is also the city's number-one spot for pickpockets, so keep your phone and wallet secured, especially in the crowds near the market and the port.",
  },
  {
    name: "Picasso Museum", slug: "picasso-museum", image: A("picasso-museet.webp"),
    rating: 4.5, reviewCount: 46000, price: "€12", area: "El Born", category: "Museum",
    tip: "Free Thursday evenings (17:00–20:00) and the first Sunday of the month — book the slot online.",
    tiqetsUrl: tiqets("Picasso Museum Barcelona"), filterKeys: ["art"],
    description: "One of the world's most complete collections of Picasso's early work, set across five medieval palaces in El Born.",
    practicalInfo: { openingHours: "Tue–Sun 10:00–19:00 (closed Mon)", price: "€12; free Thu 17:00–20:00 and first Sun of month", howToGetThere: "Metro L4 to Jaume I, five-minute walk into El Born" },
    fullDescription: "The Museu Picasso occupies five linked Gothic palaces on Carrer Montcada in El Born, a beautiful setting for a collection of more than 4,000 works. Rather than the famous later masterpieces, it concentrates on Picasso's formative years — his precocious academic training, his Blue Period, and above all his deep ties to Barcelona, where he grew as an artist. The undisputed highlight is the 1957 series of 58 canvases riffing on Velázquez's Las Meninas, a room that shows his restless reinvention at full tilt. Because the galleries are compact and hugely popular, timed online tickets are essential; the free Thursday-evening and first-Sunday slots draw long queues, so reserve ahead and arrive early. Give it 1.5 hours, then linger in the surrounding streets of El Born — home to Santa Maria del Mar and some of the city's best tapas — which reward exploration just as much as the museum itself.",
  },
  {
    name: "MNAC", slug: "mnac", image: A("mnac.webp"),
    rating: 4.6, reviewCount: 26000, price: "€12", area: "Montjuïc", category: "Museum",
    tip: "Free Saturdays after 15:00. The terrace views over the city are free and spectacular any time.",
    filterKeys: ["art"],
    description: "Catalonia's national art museum in the grand Palau Nacional, holding the world's finest Romanesque collection.",
    practicalInfo: { openingHours: "Tue–Sat 10:00–18:00/20:00, Sun 10:00–15:00 (closed Mon)", price: "€12; free Sat after 15:00 and first Sun of month", howToGetThere: "Metro L1/L3 to Espanya, then walk up past the Magic Fountain" },
    fullDescription: "The Museu Nacional d'Art de Catalunya crowns Montjuïc from the monumental Palau Nacional, built for the 1929 International Exhibition. Its calling card is the world's greatest collection of Romanesque art — vivid twelfth-century frescoes and altar fronts rescued from remote Pyrenean churches and reassembled here in reconstructed apses. Beyond that, the galleries sweep through Gothic, Renaissance and Baroque works to a strong Catalan Modernisme section with pieces by Gaudí's contemporaries. Even if you skip the collection, the building rewards the climb: the domed hall is spectacular, and the front terraces offer one of Barcelona's best free panoramas, straight down the axis past the Magic Fountain to Plaça d'Espanya. Entry is a reasonable €12, free on Saturday afternoons and the first Sunday of each month. Combine it with the fountain's evening light show and the nearby Fundació Joan Miró for a full, culture-rich day on the hill.",
  },
  {
    name: "CosmoCaixa", slug: "cosmocaixa", image: A("cosmocaixa.webp"),
    rating: 4.5, reviewCount: 21000, price: "€6", area: "Sarrià", category: "Science Museum",
    tip: "The indoor Amazon rainforest is the star — kids under 16 go free.",
    filterKeys: ["nature"],
    description: "Barcelona's science museum, home to a 1,000 m² indoor rainforest and hundreds of hands-on exhibits.",
    practicalInfo: { openingHours: "Daily 10:00–20:00", price: "€6; under-16s free", howToGetThere: "FGC line to Avinguda Tibidabo, then a short walk or the 196 bus" },
    fullDescription: "CosmoCaixa is one of Europe's best science museums and a reliable rainy-day winner with families. Its showpiece is the Bosc Inundat — a genuine 1,000-square-metre slice of flooded Amazon rainforest recreated indoors, complete with humidity, tropical fish, caimans and daily simulated downpours you can watch from above and below the waterline. Elsewhere, a towering 'Geological Wall' cross-sections seven distinct rock formations, a Planetarium runs immersive shows, and hall after hall of interactive experiments explains physics, evolution and the cosmos in ways that keep children genuinely absorbed. It sits up in leafy Sarrià near the foot of Tibidabo, easily reached on the FGC train, and entry is a bargain €6 with under-16s free — remarkable value for half a day out of the heat or rain. Allow two to three hours, more if your kids fall for the rainforest, and consider pairing it with a Tibidabo trip since both are on the same side of the city.",
  },
  {
    name: "Fundació Joan Miró", slug: "fundacio-joan-miro", image: A("fundacio-miro.webp"),
    rating: 4.6, reviewCount: 15000, price: "€14", area: "Montjuïc", category: "Art Museum",
    tip: "The sculpture terrace with city and sea views is the museum's quiet highlight.",
    tiqetsUrl: tiqets("Fundacio Joan Miro Barcelona"), filterKeys: ["art"],
    description: "A luminous hilltop museum dedicated to Catalan surrealist Joan Miró, with bold paintings, sculptures and a rooftop terrace.",
    practicalInfo: { openingHours: "Tue–Sun 10:00–18:00/20:00 (closed Mon)", price: "€14", howToGetThere: "Metro L1/L3 to Espanya, then the Montjuïc funicular or 150 bus" },
    fullDescription: "The Fundació Joan Miró is both a museum and a gift from the artist to his city, housed in a radiant white building designed by his friend Josep Lluís Sert to bathe the art in natural Mediterranean light. The collection traces Miró's whole career through some 10,000 works — the instantly recognisable biomorphic shapes, primary colours, stars and birds across paintings, drawings, textiles and monumental sculpture. Airy galleries open onto a rooftop sculpture terrace where playful bronzes are set against sweeping views over Barcelona and out to the sea, arguably the loveliest spot in the whole building. Set on Montjuïc, it pairs naturally with MNAC, the Magic Fountain and the 1992 Olympic ring, all within walking distance. Reach it via the funicular from Paral·lel or the cable car up the hill. Entry is €14; give it around 1.5 hours, longer if you linger on the terrace with a coffee.",
  },
  {
    name: "Barceloneta Beach", slug: "barceloneta-beach", image: A("barceloneta-beach.webp"),
    rating: 4.3, reviewCount: 81000, price: "Free", area: "Barceloneta", category: "Beach",
    tip: "Arrive before 11:00 for a good spot, or walk 10 min north to Bogatell for calmer sand.",
    filterKeys: ["free", "nature"],
    description: "The city's most central and liveliest beach, a wide golden strip a short metro ride from the Gothic Quarter.",
    practicalInfo: { openingHours: "Always open; lifeguards in summer", price: "Free; sunbed + parasol ~€10–15/day", howToGetThere: "Metro L4 to Barceloneta, then a 10-minute walk to the sand" },
    fullDescription: "Barceloneta is the beach that put Barcelona on the sun-and-city map — a broad, golden 1.1-kilometre stretch just fifteen minutes on foot from the Gothic Quarter. Created for the 1992 Olympics, it's backed by a lively promenade of chiringuitos (beach bars), seafood restaurants and the old fishermen's quarter behind. Expect volleyball nets, paddle-boarders, roving vendors and a festive, crowded buzz, especially on summer weekends. The Mediterranean here warms to a swimmable 24–26°C in high summer. It's the most convenient beach in the city, but also the busiest and most touristy, so serious sun-seekers walk ten minutes north to quieter Bogatell, Nova Icària or Mar Bella. Come before mid-morning to claim space, keep an eye on your belongings while you swim, and finish with paella or a cold vermouth at one of the Barceloneta seafood spots just off the sand. It's free; sunbeds and parasols rent for around €10–15 a day.",
  },
  {
    name: "Montjuïc", slug: "montjuic", image: A("montjuic.webp"),
    rating: 4.6, reviewCount: 41000, price: "Varies", area: "Montjuïc", category: "Hill / Parks",
    tip: "Take the cable car up and walk down through the gardens, catching MNAC and the fountain en route.",
    filterKeys: ["nature", "parks"],
    description: "The green hill overlooking the port, packed with gardens, museums, Olympic venues and a hilltop castle.",
    practicalInfo: { openingHours: "Park always open; castle ~10:00–20:00; cable car ~10:00–19:00", price: "Park free; castle €5; cable car ~€13.50 return", howToGetThere: "Metro L2/L3 to Paral·lel + funicular, then the Montjuïc cable car" },
    fullDescription: "Montjuïc is Barcelona's great green hill, a whole day's worth of sights rolled into one leafy massif above the port. At the top sits the seventeenth-century castle, with commanding views over the harbour and city; below spread landscaped gardens, the 1992 Olympic stadium and pool, and a string of major attractions — MNAC, the Fundació Joan Miró, the Poble Espanyol architecture village and the free Magic Fountain, which stages an evening light-and-music show. The smartest way to see it is to ride the Montjuïc cable car up for the panoramas, then wander gently downhill through the gardens, ticking off museums and viewpoints as you go. It's a refreshing, less frantic counterpoint to the dense old town, and much of it — the parks, the viewpoints, the fountain show — costs nothing. Allow half a day, wear comfortable shoes for the slopes, and time your descent to catch the fountain after dark from spring through autumn.",
  },
  {
    name: "Tibidabo", slug: "tibidabo", image: A("tibidabo.webp"),
    rating: 4.5, reviewCount: 31000, price: "€35", area: "Tibidabo", category: "Amusement / Nature",
    tip: "Ride the historic Tramvia Blau and funicular up — the journey is half the fun.",
    filterKeys: ["nature", "parks"],
    description: "Barcelona's highest point, crowned by a century-old amusement park, a landmark church and the best panoramas in the city.",
    practicalInfo: { openingHours: "Weekends & holidays, seasonal (check ahead)", price: "Park from €35; church free; viewpoint ~€6", howToGetThere: "FGC to Avinguda Tibidabo, then Tramvia Blau + funicular, or the T2A bus" },
    fullDescription: "At 512 metres, Tibidabo is the peak that closes Barcelona's skyline to the north-west, and on a clear day the views stretch across the whole city to the sea and, occasionally, out toward Mallorca. Two landmarks share the summit: the neo-Gothic Temple del Sagrat Cor, visible from much of the city and free to enter, and a charming amusement park founded in 1901, whose vintage aeroplane ride and Ferris wheel spin against that vast panorama. Half the pleasure is the approach — the restored Tramvia Blau tram and a funicular haul you up the wooded slope in old-world style. It makes a relaxed half-day, combining fairground nostalgia, the church and the viewpoint, and works well alongside nearby CosmoCaixa on the same side of town. Note that the amusement park runs on a seasonal, mainly weekend schedule, so check opening dates before you set out, and go on a clear day for those unforgettable sunset views over Barcelona.",
  },
  {
    name: "Montserrat", slug: "montserrat", image: A("montserrat.webp"),
    rating: 4.7, reviewCount: 52000, price: "€22", area: "1h northwest", category: "Monastery / Nature",
    tip: "Take the 08:00 train to hear the boys' choir sing at 13:00 — one of Europe's oldest.",
    tiqetsUrl: tiqets("Montserrat Barcelona"), filterKeys: ["nature", "must-see"],
    description: "A dramatic mountain monastery on serrated peaks, Catalonia's spiritual heart and its most rewarding day trip.",
    practicalInfo: { openingHours: "Monastery ~09:00–18:30; choir sings ~13:00 (not always daily)", price: "Train + rack railway/cable car ~€22 return; combo packages ~€42", howToGetThere: "FGC R5 from Plaça Espanya to Monistrol, then the rack railway or Aeri cable car" },
    fullDescription: "Montserrat is the day trip most visitors remember longest — a Benedictine monastery clinging to a mountain of strange, saw-toothed rock 725 metres up, an hour north-west of Barcelona. It's the spiritual centre of Catalonia, home to La Moreneta, the revered twelfth-century Black Madonna, and to the Escolania, one of Europe's oldest boys' choirs, which sings in the basilica around 1 pm on most days. Beyond the religious draw, the setting is spectacular: funiculars and marked trails climb to hermitages and to the Sant Jeroni summit for 360-degree views across Catalonia. The classic route is the FGC train from Plaça Espanya to Monistrol, then the rack railway or the Aeri cable car up the cliff — combined tickets run about €22, with all-in packages including lunch and the museum around €42. Take the early train to fit in the choir, the monastery, a short hike and the museum, and pack layers, as it's noticeably cooler up top than in the city.",
  },
  {
    name: "Palau de la Música Catalana", slug: "palau-de-la-musica", image: A("palau-musica.webp"),
    rating: 4.7, reviewCount: 22000, price: "€22", area: "El Born", category: "Concert Hall",
    tip: "A short lunchtime guitar or flamenco concert is an affordable way to see the hall in use.",
    tiqetsUrl: tiqets("Palau de la Musica Catalana Barcelona"), filterKeys: ["architecture", "art", "must-see"],
    description: "A jaw-dropping Modernista concert hall drenched in stained glass, mosaic and sculpture — a UNESCO World Heritage Site.",
    practicalInfo: { openingHours: "Guided tours daily ~10:00–15:30; concerts in the evening", price: "Tour from €22; concert tickets vary", howToGetThere: "Metro L1/L4 to Urquinaona, a three-minute walk" },
    fullDescription: "The Palau de la Música Catalana is Modernisme at its most exuberant — a 1908 concert hall by Lluís Domènech i Montaner and a UNESCO World Heritage Site tucked into the tight streets between El Born and the Gothic Quarter. Where Gaudí worked in curves and stone, here the material is coloured light: the auditorium is topped by an enormous inverted stained-glass skylight in gold and blue that seems to pour sunshine into the room, while the walls bristle with mosaic, sculpted muses and floral ironwork. You can visit on a guided tour that explains the building and the Catalan cultural revival it was built to celebrate, but the real magic is hearing music fill the space. Tickets to full concerts vary widely, yet short lunchtime recitals — classical guitar, flamenco, opera highlights — offer an affordable way to experience the hall alive with sound. Book the tour or a concert ahead, as both sell out, and pair it with nearby Santa Maria del Mar and the Picasso Museum.",
  },
  {
    name: "Camp Nou", slug: "camp-nou", image: A("camp-nou.webp"),
    rating: 4.5, reviewCount: 93000, price: "€32", area: "Les Corts", category: "Stadium",
    tip: "Match tickets sell fast — buy via the official club site; tours run best on weekday mornings.",
    tiqetsUrl: tiqets("Camp Nou Barcelona tour"), filterKeys: ["must-see"],
    description: "The legendary home of FC Barcelona and Europe's largest football stadium, with a museum and behind-the-scenes tour.",
    practicalInfo: { openingHours: "Daily ~09:30–19:00 (varies; check during renovation)", price: "Tour + museum from €32; match tickets vary", howToGetThere: "Metro L3 to Les Corts or Palau Reial, a short walk to the ground" },
    fullDescription: "Camp Nou is a pilgrimage for football fans — the vast home of FC Barcelona and, at nearly 100,000 seats, the largest stadium in Europe. The 'Barça Immersive Tour' and museum walk you through the club's trophy-laden history and its 'més que un club' identity, with a self-guided route that normally takes in the changing rooms, the players' tunnel and a pitch-side view of the stands rising around you, plus interactive exhibits and a hall of Ballon d'Or and Champions League silverware. Note that the stadium has been undergoing a major redevelopment, so parts of the tour and the ground itself may be modified or relocated — always check what's open before you travel. Nothing beats seeing an actual match, but tickets go quickly and are best bought through the official club channels to avoid resale mark-ups. If you're touring rather than watching, aim for a weekday morning when it's quietest, and allow around two hours for the full museum-and-stadium experience.",
  },
  {
    name: "El Born", slug: "el-born", image: A("el-born.webp"),
    rating: 4.6, reviewCount: 18000, price: "Free", area: "El Born", category: "District",
    tip: "Santa Maria del Mar is free in the mornings — a soaring Gothic gem worth planning around.",
    filterKeys: ["free"],
    description: "Barcelona's trendiest medieval quarter: boutiques, cocktail bars, galleries and the great church of Santa Maria del Mar.",
    practicalInfo: { openingHours: "Streets always open; shops ~10:00–21:00", price: "Free to explore", howToGetThere: "Metro L4 to Jaume I, then walk east into the quarter" },
    fullDescription: "El Born is the old city's most fashionable corner, a compact grid of narrow medieval streets that has become the go-to district for independent boutiques, design studios, cocktail bars and low-lit tapas spots. Its spiritual and architectural anchor is Santa Maria del Mar, a pure Catalan Gothic basilica built by the medieval port workers and famous for its soaring, light-filled nave — free to visit in the mornings and quietly breathtaking. Nearby, the Picasso Museum draws the culture crowd, while the El Born Centre de Cultura preserves excavated eighteenth-century streets beneath a handsome iron-and-glass market hall. The real pleasure, though, is simply wandering: Passeig del Born and its tributary lanes are made for aimless drifting, coffee stops and evening tapas-hopping, when the quarter is at its most atmospheric. It's free, central and endlessly photogenic, and slots neatly between the Gothic Quarter and the beach. Give it an unhurried half-day and let dinner run into a nightcap.",
  },
  {
    name: "Eixample", slug: "eixample", image: A("eixample.webp"),
    rating: 4.5, reviewCount: 12000, price: "Free", area: "Eixample", category: "District",
    tip: "Walk Passeig de Gràcia to string Casa Batlló, Casa Milà and the boutiques into one route.",
    filterKeys: ["free", "architecture"],
    description: "The grand nineteenth-century grid district where Gaudí's masterpieces and Barcelona's smartest shopping cluster together.",
    practicalInfo: { openingHours: "Always open", price: "Free to explore (attraction tickets extra)", howToGetThere: "Metro L2/L3/L4 to Passeig de Gràcia or L3/L5 to Diagonal" },
    fullDescription: "Eixample ('the Extension') is the vast, orderly grid laid out by Ildefons Cerdà in the nineteenth century to relieve the cramped old town, and it became the showcase for Catalan Modernisme. Its signature is the chamfered octagonal block corner, designed to open up light and sightlines, and its spine is Passeig de Gràcia — the elegant boulevard that lines up Gaudí's Casa Batlló and Casa Milà alongside flagship fashion stores and pavement cafés. Wander a few blocks off the main drag to find the 'Illa de la Discòrdia', where rival Modernista architects built duelling façades side by side, plus quieter design shops, vermouth bars and the odd hidden interior courtyard. It's free simply to stroll, camera in hand, reading the architecture as you go, and it's the natural base for pairing several ticketed sights in a single walk. Split into Dreta and Esquerra halves, Eixample also holds much of the city's best dining, so it rewards both daytime sightseeing and an evening out.",
  },
  {
    name: "Sitges", slug: "sitges", image: A("sitges.webp"),
    rating: 4.6, reviewCount: 26000, price: "Train €5", area: "35 min south", category: "Coastal Town",
    tip: "Take the R2 Sud train from Sants — 17 beaches, whitewashed lanes and a relaxed, bohemian buzz.",
    filterKeys: ["nature"],
    description: "A pretty whitewashed seaside town 35 minutes south, with 17 beaches, a bohemian streak and a lively scene.",
    practicalInfo: { openingHours: "Always open; museums ~10:00–19:00", price: "R2 Sud train ~€5 each way", howToGetThere: "Rodalies R2 Sud from Barcelona-Sants to Sitges (~35 min)" },
    fullDescription: "Sitges is the easiest and prettiest coastal escape from Barcelona — a whitewashed town of 17 beaches just 35 minutes south on the R2 Sud commuter train. Its landmark is the seventeenth-century church of Sant Bartomeu, perched on a rocky outcrop above the sand and endlessly photographed at sunset. Behind it, a compact old town of narrow lanes, modernista mansions and the Cau Ferrat museum (once the home of painter Santiago Rusiñol) rewards a slow wander between swims. Long famous as a bohemian and LGBTQ+ hub, Sitges has a relaxed, festive atmosphere, good seafood terraces and a nightlife that punches above its size, especially in summer and during its flamboyant Carnival. It makes an ideal half-day or lazy full-day trip: alternate beach time with tapas and a stroll through the galleries, then catch an evening train back. Because it's so accessible and so pleasant, it also works as a calmer base for anyone who wants sea air within commuting distance of the city.",
  },
];

// ── Beaches (8) ──────────────────────────────────────────────────────────────
export const BEACHES: BcnPlace[] = [
  {
    name: "Barceloneta", slug: "barceloneta", image: B("barceloneta.webp"),
    rating: 4.3, reviewCount: 81000, area: "Barceloneta", facilities: "Showers, bars, volleyball",
    tip: "Liveliest and most central, but come early — it fills fast on summer weekends.",
    filterKeys: ["sport"],
    description: "The city's most central and lively beach, backed by seafood restaurants and the old fishermen's quarter.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free; sunbeds ~€12/day", howToGetThere: "Metro L4 to Barceloneta, 10-minute walk" },
    fullDescription: "Barceloneta is the beach everyone means when they picture Barcelona sand — wide, golden and buzzing, a fifteen-minute walk from the Gothic Quarter. It has the fullest facilities of any city beach: lifeguards, showers, volleyball courts, sun-lounger hire and a promenade lined with chiringuitos and seafood terraces. That convenience makes it the busiest and most touristy stretch, particularly on summer weekends, so arrive before mid-morning for space and keep valuables close while you swim. The water is clean and warms into the mid-20s Celsius in high summer, and the neighbourhood behind — the tight grid of the old fishing quarter — serves some of the best paella and cold vermouth in the city. Great for people-watching, a swim between sights and an easy sunset drink; head a little north to Bogatell if you want the same sand with fewer crowds.",
  },
  {
    name: "Bogatell", slug: "bogatell", image: B("mediterranean-beach.webp"),
    rating: 4.4, reviewCount: 19000, area: "Poblenou", facilities: "Calm, family-friendly, sport",
    tip: "The locals' pick — wider, calmer and cleaner than Barceloneta, 10 minutes north.",
    filterKeys: ["family", "quiet"],
    description: "A wide, calmer beach popular with locals, cleaner and more relaxed than its central neighbours.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free", howToGetThere: "Metro L4 to Llacuna or Bogatell, then a short walk" },
    fullDescription: "Bogatell is where Barcelonans go to escape the Barceloneta crush without leaving the city. A short walk or metro hop north into Poblenou, it's a broad, well-kept stretch of sand with a noticeably calmer, more local feel — families, joggers on the promenade, and groups of friends rather than tour crowds. Facilities are solid: showers, lifeguards in season, sun-lounger and pedalo hire, table-tennis, volleyball nets and a couple of laid-back beach bars. The water tends to be cleaner and the sand less packed than the central beaches, which makes it a favourite for a longer, lazier day. The regenerated Poblenou district behind it — full of design studios, breweries and good-value restaurants — is worth a wander when you've had enough sun. All in, Bogatell is the sweet spot for visitors who want genuine beach time with amenities but without the tourist-trap intensity of Barceloneta, and it's still an easy metro ride from the centre.",
  },
  {
    name: "Nova Icària", slug: "nova-icaria", image: B("family-beach.webp"),
    rating: 4.4, reviewCount: 12000, area: "Vila Olímpica", facilities: "Accessible, family, calm",
    tip: "Gentle, accessible and family-friendly — good ramps and calm water for younger kids.",
    filterKeys: ["family", "quiet"],
    description: "A calm, accessible family beach beside the Olympic Village, with gentle water and good amenities.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free", howToGetThere: "Metro L4 to Ciutadella | Vila Olímpica, then walk to the shore" },
    fullDescription: "Nova Icària sits just below the Olympic Village and is one of the most relaxed, family-friendly beaches in the city. The water is typically gentle and the sand well-tended, with good accessibility — including ramps and adapted facilities — that make it a practical choice for families with young children, older visitors or anyone with mobility needs. You'll find the usual comforts: lifeguards in season, showers, sun-lounger hire, volleyball and a couple of decent beach bars for lunch or an afternoon drink. Because it's slightly removed from the Barceloneta hotspot, the atmosphere is calmer and the crowds thinner, yet it's still an easy metro ride from the centre via the Vila Olímpica stop. The Olympic Port marina next door adds restaurants and a pleasant promenade for a post-swim stroll. For a low-key beach day with everything to hand and none of the tourist crush, Nova Icària is a dependable, easygoing pick.",
  },
  {
    name: "Mar Bella", slug: "mar-bella", image: B("beach-bar.webp"),
    rating: 4.2, reviewCount: 9000, area: "Sant Martí", facilities: "Sport, watersports, nudist zone",
    tip: "Best for watersports and a younger crowd; there's a designated nudist section at the north end.",
    filterKeys: ["sport", "nudist"],
    description: "A sporty, youthful beach known for watersports and a lively vibe, with a designated nudist section.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free; watersports rentals extra", howToGetThere: "Metro L4 to Selva de Mar or Poblenou, then walk to the shore" },
    fullDescription: "Mar Bella is the city's sport-and-scene beach, a lively stretch in the Sant Martí district that draws a younger, energetic crowd. It's the go-to spot for watersports — a base school offers windsurfing, paddleboarding, kayaking and sailing — and there are skate ramps, volleyball nets and a beach bar with a party lean in summer. The northern end includes a well-established nudist zone, and the beach has long been popular with the LGBTQ+ community, giving it a friendly, open atmosphere. Facilities cover the essentials: lifeguards in season, showers and rental gear. Backed by the Parc del Poblenou greenery and a short walk from the regenerated Poblenou neighbourhood, it feels a step removed from the tourist beaches closer to the centre, which is exactly its appeal. Come here to be active on the water, to catch a livelier daytime scene, or simply for a stretch of sand where the crowd skews local. Reach it easily via the L4 metro.",
  },
  {
    name: "Nova Mar Bella", slug: "nova-mar-bella", image: B("beach-sunset.webp"),
    rating: 4.3, reviewCount: 6000, area: "Sant Martí", facilities: "Quiet, local, residential",
    tip: "One of the calmest, most local beaches — barely a tourist in sight.",
    filterKeys: ["quiet"],
    description: "A quiet, residential beach at the northern edge of the city, popular with locals and largely tourist-free.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free", howToGetThere: "Metro L4 to Selva de Mar, then a short walk" },
    fullDescription: "Nova Mar Bella is about as local as a Barcelona city beach gets. Sitting near the northern end of the shoreline in a residential pocket of Sant Martí, it draws neighbourhood families and regulars far more than visitors, which gives it a relaxed, unhurried feel that the central beaches lost long ago. The essentials are all present — lifeguards in season, showers, a beach bar and space to spread out — but the mood is quieter, the sand less trampled and the pace slower. It's part of the chain of newer beaches created in the city's eastern regeneration, close to the Diagonal Mar district and its large shopping centre for anything you forget. For travellers who want a genuine, low-key swim away from the crowds and are happy to ride the L4 a few stops further out, this is one of the calmest options in the city. Pair it with a wander around the modern Diagonal Mar waterfront and Fòrum area next door.",
  },
  {
    name: "Sant Sebastià", slug: "sant-sebastia", image: B("mediterranean-beach.webp"),
    rating: 4.3, reviewCount: 14000, area: "Barceloneta", facilities: "Widest, family, historic",
    tip: "The oldest and widest city beach — quieter than Barceloneta but just as central.",
    filterKeys: ["family"],
    description: "Barcelona's oldest and widest beach, at the southern tip of Barceloneta with a calmer, roomier feel.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free; sunbeds ~€12/day", howToGetThere: "Metro L4 to Barceloneta, walk south past the marina" },
    fullDescription: "Sant Sebastià is Barcelona's oldest beach and one of its widest, curving around the southern tip of the Barceloneta peninsula near the W Hotel. Despite sitting right beside the ever-busy Barceloneta beach, it tends to feel roomier and a touch calmer, with space to spread out even on warm days. It offers full facilities — lifeguards in season, showers, sun-lounger hire and accessible ramps — plus a swimmers' club and a promenade of restaurants at its landward end, making it a comfortable, well-serviced choice for families. Its position at the end of the strip means lovely long views back along the coast and out to the marina, and it catches good sun through the day. Because it's still fully central, you can pair a swim here with the seafood restaurants of the Barceloneta quarter and a stroll along the Passeig Marítim. For central sand with a little more elbow room than its famous neighbour, Sant Sebastià is a smart pick.",
  },
  {
    name: "Ocata (El Masnou)", slug: "ocata", image: B("beach-sunset.webp"),
    rating: 4.5, reviewCount: 5000, area: "20 min by train", facilities: "Long, clean, quiet, family",
    tip: "A long, clean beach a short train ride north — the local secret for a calmer day.",
    filterKeys: ["quiet", "family"],
    description: "A long, clean, uncrowded beach a 20-minute train ride north in El Masnou — a favourite local escape.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free; train ~€2–3 each way", howToGetThere: "Rodalies R1 from Barcelona to Ocata (El Masnou), ~20 min, then a two-minute walk" },
    fullDescription: "Ocata, in the town of El Masnou just up the coast, is the beach locals slip away to when the city sand gets too crowded. It's a broad, exceptionally clean and surprisingly long stretch, and — best of all — the R1 commuter train drops you almost onto the sand after a twenty-minute ride from central Barcelona for a couple of euros. The space means you can always find room, even in July, and the shallow, gently shelving water makes it excellent for families. Facilities are simple but sufficient: lifeguards in season, showers, a couple of chiringuitos for lunch and drinks, and the pleasant small-town seafront of El Masnou behind. Because it feels like a proper day at the seaside rather than a city beach, it's ideal when you want to swim, read and switch off without the tour-group intensity of Barceloneta. Bring a picnic or eat at a beach bar, and take a later train back after a swim at golden hour.",
  },
  {
    name: "Sitges Beaches", slug: "sitges-beaches", image: B("costa-brava.webp"),
    rating: 4.6, reviewCount: 22000, area: "35 min south", facilities: "17 beaches, lively, scenic",
    tip: "Seventeen beaches in one photogenic town — livelier and prettier than the city stretches.",
    filterKeys: ["sport"],
    description: "The 17 photogenic beaches of Sitges, 35 minutes south by train, from lively central sands to quiet coves.",
    practicalInfo: { openingHours: "Always open; summer lifeguards", price: "Free; R2 Sud train ~€5 each way", howToGetThere: "Rodalies R2 Sud from Barcelona-Sants to Sitges (~35 min)" },
    fullDescription: "If you want the best beach day within easy reach of Barcelona, take the 35-minute train south to Sitges, a whitewashed resort town strung with seventeen distinct beaches. The central stretches below the landmark church buzz with sun-loungers, beach bars and a festive crowd, while a short walk in either direction finds quieter, prettier sands and small coves against a backdrop of the Garraf hills. The water is clean and clear, the promenade lined with seafood terraces, and the town's bohemian, LGBTQ+-friendly atmosphere gives the whole scene a relaxed, colourful energy. Between swims you can browse the old town's narrow lanes, visit the Cau Ferrat museum or simply graze your way along the seafront. It's the ideal alternative when the city beaches feel too crowded — more scenic, more variety and just as accessible by the R2 Sud commuter line. Go for a full day, pick a beach to suit your mood, and catch an evening train back after sunset drinks.",
  },
];

// ── Nightlife (10) ───────────────────────────────────────────────────────────
export const NIGHTLIFE: BcnPlace[] = [
  {
    name: "Opium", slug: "opium", image: N("nightlife-bar.webp"), rating: 4.1, reviewCount: 24000,
    type: "Beach Club", area: "Port Olímpic", tip: "Beachfront club with big-name DJs — go late (after 01:00) and dress up.",
    filterKeys: ["clubs"],
    description: "A glossy beachfront superclub at Port Olímpic with international DJs and a see-and-be-seen crowd.",
    practicalInfo: { openingHours: "Club nights from ~23:59 until ~06:00", price: "Entry ~€20 (often includes a drink)", howToGetThere: "Metro L4 to Ciutadella | Vila Olímpica, walk to the marina" },
    fullDescription: "Opium is one of Barcelona's flagship beachfront clubs, part of the strip of glossy venues lining Port Olímpic. By day it operates as a restaurant and terrace on the sand; after midnight it flips into a full-on nightclub with a big sound system, international guest DJs spinning house and commercial dance, and a dressed-up, cosmopolitan crowd. Things don't really start until well after 1 am, in true Barcelona fashion, and continue until dawn. It's polished, pricey and unashamedly mainstream — expect a door policy, a cover charge that usually includes a drink, and premium prices at the bar. That makes it a reliable pick if you want a lively, high-energy night by the water with a party atmosphere and sea breeze, rather than something underground or local. Book a table or grab tickets online to smooth entry on busy nights, arrive late, and pace yourself: the marina's cluster of clubs means you can easily hop between venues if the mood takes you.",
  },
  {
    name: "Pacha Barcelona", slug: "pacha", image: N("nightlife-bar.webp"), rating: 4.0, reviewCount: 16000,
    type: "Club", area: "Port Olímpic", tip: "Classic marina club — house and commercial dance for a big, mainstream night.",
    filterKeys: ["clubs"],
    description: "The Barcelona outpost of the famous Pacha brand, a marina club for house and commercial dance nights.",
    practicalInfo: { openingHours: "Club nights from ~midnight until ~06:00", price: "Entry ~€20–25", howToGetThere: "Metro L4 to Ciutadella | Vila Olímpica, walk to Port Olímpic" },
    fullDescription: "Pacha carries one of clubland's best-known names, and its Barcelona venue delivers exactly what that promises: a big, glossy marina nightclub at Port Olímpic playing house and commercial dance to an up-for-it, largely international crowd. Like its neighbours along the waterfront, it runs late — doors from around midnight, peaking in the small hours and going until roughly 6 am — with guest DJs, bottle-service tables and a lively, dress-to-impress atmosphere. It's mainstream rather than cutting-edge, and prices reflect the brand and the location, so expect a cover charge and premium drinks. What you get in return is a dependable, high-energy party right by the sea, easy to combine with the cluster of clubs around the Olympic port for a night of venue-hopping. Buy tickets or reserve a table online for the smoothest entry on weekend nights, turn up late, and treat it as one stop on a marina crawl rather than the whole evening.",
  },
  {
    name: "Razzmatazz", slug: "razzmatazz", image: N("live-music.webp"), rating: 4.4, reviewCount: 33000,
    type: "Club / Live Music", area: "Poblenou", tip: "Five rooms, five genres under one roof — the city's essential big night out.",
    filterKeys: ["clubs", "live-music"],
    description: "Barcelona's biggest and most beloved club: five rooms of different music, plus a top live-gig venue.",
    practicalInfo: { openingHours: "Club Fri–Sat from ~01:00; gigs earlier", price: "Club entry ~€15–20; gig tickets vary", howToGetThere: "Metro L1 to Marina or L4 to Bogatell, short walk into Poblenou" },
    fullDescription: "Razzmatazz is the beating heart of Barcelona's music scene — a converted Poblenou warehouse that works as both the city's premier mid-size live venue and its most-loved nightclub. On club nights it splits into five separate rooms, each with its own sound and crowd: indie and rock in the main Razz Club, electronic and techno in The Loft and Lolita, pop and dance elsewhere, so a single ticket lets you roam between genres until the early hours. Before the club takes over, the main hall hosts an excellent programme of international touring bands, from breaking acts to established names. The crowd is a proper mix of locals and visitors, the atmosphere unpretentious and the energy high. It's the one venue most Barcelonans would send you to for a big night out. Check the gig calendar in case a band you like is playing, buy tickets online, and remember club nights don't fill up until well after 1 am.",
  },
  {
    name: "Paradiso", slug: "paradiso", image: N("cocktail-bar.webp"), rating: 4.6, reviewCount: 15000,
    type: "Cocktail Bar", area: "El Born", tip: "Enter through the pastrami-shop fridge door — one of the world's best bars, so go early.",
    filterKeys: ["bars"],
    description: "A world-renowned speakeasy hidden behind a pastrami shop in El Born, famous for theatrical cocktails.",
    practicalInfo: { openingHours: "Daily ~19:00–02:30", price: "Cocktails ~€14–16", howToGetThere: "Metro L4 to Barceloneta or Jaume I, walk into El Born" },
    fullDescription: "Paradiso is Barcelona's most celebrated cocktail bar — regularly ranked among the very best in the world — and half the fun is finding it. From the street it looks like a tiny pastrami sandwich shop in El Born; open the wooden fridge door at the back and you step into a warm, curved, speakeasy-style room where the city's most inventive drinks are made. The cocktails are theatrical and genuinely delicious, arriving with smoke, bubbles, edible garnishes and clever presentation that still put flavour first. Because of its reputation, it gets busy fast and doesn't take many reservations, so arrive early in the evening — right at opening is ideal — to avoid a long wait, especially on weekends. Prices sit at the premium end for Barcelona, but for a special night out it's worth every euro. Pair it with dinner in El Born beforehand, and treat the whole thing as an experience rather than just a drink. It's the standout stop on any serious cocktail crawl.",
  },
  {
    name: "Dr. Stravinsky", slug: "dr-stravinsky", image: N("cocktail-bar.webp"), rating: 4.5, reviewCount: 4000,
    type: "Cocktail Bar", area: "El Born", tip: "House-made infusions and ferments — an apothecary-style bar for cocktail nerds.",
    filterKeys: ["bars"],
    description: "An apothecary-themed cocktail bar in El Born using house infusions, ferments and foraged ingredients.",
    practicalInfo: { openingHours: "Daily ~19:00–02:00", price: "Cocktails ~€13–15", howToGetThere: "Metro L4 to Jaume I, walk into El Born" },
    fullDescription: "Dr. Stravinsky is a cocktail bar for the curious, tucked into the lanes of El Born and styled like an old apothecary, its shelves lined with jars of house infusions, tinctures, ferments and foraged botanicals. The team makes much of what goes into the glass in-house, so the menu leans experimental and seasonal, built around unusual flavours and techniques rather than the standard classics. The room is intimate and low-lit, the service knowledgeable, and the whole experience feels closer to a tasting than a night at a bar — which is exactly why cocktail enthusiasts seek it out. It regularly appears on 'world's best bars' long-lists alongside its more famous neighbours, yet stays a little more under the radar and personal. It's small, so it fills up on weekends; go earlier in the evening or midweek for a seat and the bartenders' full attention. Combine it with Paradiso a few streets away for an El Born cocktail crawl that showcases why Barcelona has become a serious drinks city.",
  },
  {
    name: "Eclipse (W Barcelona)", slug: "eclipse", image: N("rooftop-bar-night.webp"), rating: 4.3, reviewCount: 8000,
    type: "Rooftop Bar", area: "Barceloneta", tip: "26th-floor sea views — come for sunset, then stay for the DJ set.",
    filterKeys: ["rooftop", "bars"],
    description: "A glamorous 26th-floor rooftop bar in the sail-shaped W Hotel, with panoramic sea and city views.",
    practicalInfo: { openingHours: "Evenings, DJ sets on weekends (seasonal)", price: "Cocktails ~€18–22; possible entry on club nights", howToGetThere: "Metro L4 to Barceloneta, walk to the end of the peninsula" },
    fullDescription: "Eclipse sits on the 26th floor of the sail-shaped W Barcelona at the tip of the Barceloneta peninsula, and its selling point is the view: floor-to-ceiling windows and a wraparound outlook over the Mediterranean on one side and the whole city skyline on the other. It works best as a sunset spot — arrive as the light softens, take a window seat and watch the sea turn gold — before it shifts into a glossy late-night lounge with resident and guest DJs at weekends. The atmosphere is upscale and dressy, the cocktails are expensive, and there can be a cover charge on busier club nights, so it's a special-occasion choice rather than a casual drink. Reserve ahead, particularly for a prime sunset window, and dress smart to satisfy the door. For sheer altitude and panorama it's hard to beat among Barcelona's rooftops, and pairing early drinks here with dinner in Barceloneta below makes for a memorable, glamorous evening by the water.",
  },
  {
    name: "La Terrazza", slug: "la-terrazza", image: N("rooftop-bar-night.webp"), rating: 4.2, reviewCount: 11000,
    type: "Open-air Club", area: "Montjuïc", tip: "Summer-only open-air club at Poble Espanyol — dance under the stars.",
    filterKeys: ["rooftop", "clubs"],
    description: "A famous summer-only open-air nightclub set within Poble Espanyol on Montjuïc, dancing under the stars.",
    practicalInfo: { openingHours: "Summer season only, Fri–Sat from ~midnight", price: "Entry ~€20–30", howToGetThere: "Metro L1/L3 to Espanya, then walk or bus up to Poble Espanyol" },
    fullDescription: "La Terrazza is Barcelona's classic summer club — an open-air venue set inside the Poble Espanyol complex on Montjuïc, where you dance beneath the stars amid greenery and Mediterranean architecture. Running only through the warm months, it has a devoted following for its house and electronic line-ups, international DJs and the simple magic of a big open-air party on a summer night. The crowd mixes locals and visitors, the production is polished, and the hillside setting gives it a distinctly different feel from the beachfront superclubs down at the port. Nights start late and run until dawn, and there's a proper door and cover charge, so plan for a classic Barcelona late one. Because it's seasonal and popular, check the calendar and buy tickets in advance, and factor in the trip up Montjuïc — a taxi is easiest in the small hours. If you're in town in summer and want the quintessential open-air clubbing experience, this is the one to prioritise.",
  },
  {
    name: "Tablao Cordobés", slug: "tablao-cordobes", image: N("flamenco.webp"), rating: 4.5, reviewCount: 9000,
    type: "Flamenco", area: "Las Ramblas", tip: "Book the show-plus-tapas option and sit close for the full flamenco intensity.",
    filterKeys: ["live-music"],
    description: "A long-running flamenco tablao on Las Ramblas, staging intimate, high-quality live performances nightly.",
    practicalInfo: { openingHours: "Nightly shows (multiple sittings)", price: "Show from ~€45; with dinner/tapas from ~€75", howToGetThere: "Metro L3 to Liceu, on Las Ramblas" },
    fullDescription: "Flamenco isn't native to Catalonia, but Barcelona has a strong scene, and Tablao Cordobés on Las Ramblas is among the most established places to experience it. Running since 1970 in a Moorish-styled room, it stages intimate live performances several times a night, with rotating casts of respected singers, guitarists and dancers delivering the raw, foot-stamping intensity the art form is known for. You can book the show alone or add a tapas spread or dinner beforehand, and because the room is small there isn't a bad seat — sitting near the front puts you close enough to feel the emotion. It's a polished, tourist-friendly introduction rather than a gritty back-room peña, but the quality of the artists keeps it credible and moving. Reserve ahead, as sittings sell out, and consider the earlier show if you have other evening plans. For a memorable, culturally rich night that's easy to slot into a central itinerary, a flamenco tablao is a Barcelona classic worth doing once.",
  },
  {
    name: "Jamboree", slug: "jamboree", image: N("live-music.webp"), rating: 4.3, reviewCount: 12000,
    type: "Jazz Club", area: "Gothic Quarter", tip: "Live jazz early, then it turns into a club — one ticket, two nights out.",
    filterKeys: ["live-music", "clubs"],
    description: "A legendary basement jazz club on Plaça Reial that turns into a club after the last set.",
    practicalInfo: { openingHours: "Live sets ~20:00 & 22:00; club after ~01:00", price: "Gig ~€15–25; club entry ~€10–15", howToGetThere: "Metro L3 to Liceu, on Plaça Reial" },
    fullDescription: "Jamboree has been a fixture of Barcelona nightlife since 1960, a low-ceilinged basement club under the arcades of Plaça Reial in the Gothic Quarter. It made its name in jazz — legends have played here over the decades — and it still runs live sets most nights, usually a couple of sittings of jazz, soul or blues in an intimate, atmospheric room where you're close to the musicians. What makes it especially good value is the switch: after the final set, the space turns into a nightclub playing funk, hip-hop and pop into the small hours, so a single evening delivers both a proper gig and a dance. The crowd is a lively mix of students, locals and visitors, and the central Plaça Reial location means you're surrounded by more bars if you want to keep going. Check the live line-up and book gig tickets ahead for the acts you want; the club portion is cheaper and busier later. It's a characterful, unpretentious pick for a music-led night in the old town.",
  },
  {
    name: "El Xampanyet", slug: "el-xampanyet", image: N("cocktail-bar.webp"), rating: 4.5, reviewCount: 13000,
    type: "Cava & Tapas Bar", area: "El Born", tip: "Order the house cava and anchovies, stand at the bar, and soak up a true local institution.",
    filterKeys: ["bars"],
    description: "A tiny, century-old cava and tapas bar in El Born, all tiled walls, house fizz and anchovies.",
    practicalInfo: { openingHours: "Tue–Sat ~12:00–15:30 & 19:00–23:00 (closed Sun eve/Mon)", price: "Cava ~€2.50/glass; tapas cheap", howToGetThere: "Metro L4 to Jaume I, near the Picasso Museum in El Born" },
    fullDescription: "El Xampanyet is the antidote to Barcelona's slick cocktail scene — a tiny, tile-lined bar in El Born that's been pouring its own lightly sparkling house cava since 1929. Standing-room-only and gloriously old-school, it's run by the same family across generations, and the ritual is simple: squeeze in at the marble counter, order a glass of the cloudy, low-fizz cava for a couple of euros, and pair it with the house anchovies, boquerones, cured meats and simple tapas. The walls are crammed with antique bottles, tiles and clutter; the atmosphere is loud, warm and unmistakably local, even though word has long since got out. It sits right by the Picasso Museum and Santa Maria del Mar, making it a perfect early-evening stop before dinner. Don't expect a menu or much English — just point, share and enjoy the crush. Go early, as it fills fast and doesn't take reservations. For a genuine taste of traditional Barcelona bar culture, it's an essential, budget-friendly institution.",
  },
];

// ── Shopping (8) ─────────────────────────────────────────────────────────────
export const SHOPPING: BcnPlace[] = [
  {
    name: "Passeig de Gràcia", slug: "passeig-de-gracia", image: S("shopping-street.webp"), rating: 4.6, reviewCount: 45000,
    type: "Luxury Avenue", area: "Eixample", tip: "Combine flagship shopping with Gaudí — Casa Batlló and Casa Milà line the same street.",
    filterKeys: ["luxury"],
    description: "Barcelona's grand luxury boulevard, lining designer flagships alongside Gaudí's Casa Batlló and Casa Milà.",
    practicalInfo: { openingHours: "Shops ~10:00–21:00 (Mon–Sat)", price: "Free to browse", howToGetThere: "Metro L2/L3/L4 to Passeig de Gràcia" },
    fullDescription: "Passeig de Gràcia is Barcelona's most prestigious shopping street, a wide, elegant boulevard through Eixample where international luxury houses — the big fashion names, jewellers and watchmakers — occupy handsome Modernista buildings. It's also an open-air architecture gallery: Gaudí's Casa Batlló and Casa Milà stand on the same stretch, along with the rival façades of the 'Illa de la Discòrdia', so you can window-shop and sightsee in a single stroll. Even if the flagship prices aren't for you, it's worth walking end to end for the shop windows, the pavement mosaics and the grand café terraces, with more accessible mid-market brands filling the side streets and nearby Rambla de Catalunya. Come on a weekday to avoid weekend crowds, and note that most shops close on Sundays. It anchors any shopping itinerary and pairs naturally with the Eixample's Gaudí sights, so many visitors combine a morning of Modernisme with an afternoon of browsing here. For high-end retail with a side of world-class architecture, it's the obvious first stop.",
  },
  {
    name: "La Roca Village", slug: "la-roca-village", image: S("mall.webp"), rating: 4.4, reviewCount: 60000,
    type: "Outlet Village", area: "40 min north", tip: "Designer outlet with a direct shopping bus from the centre — go early for the best stock.",
    filterKeys: ["luxury", "local"],
    description: "A designer outlet village 40 minutes north, with discounted premium and luxury brands in an open-air setting.",
    practicalInfo: { openingHours: "Daily ~10:00–21:00", price: "Free entry; shopping bus ~€20 return", howToGetThere: "Shopping Express bus from Passeig de Gràcia, or train + bus (~45 min)" },
    fullDescription: "La Roca Village is the region's big designer outlet, an open-air 'village' of more than 140 boutiques about forty minutes north of Barcelona where premium and luxury brands sell past-season stock at sizeable discounts. Laid out like a pretty pedestrian street rather than a mall, it gathers international fashion, accessories, homeware and sportswear names under one roof-less roof, with cafés and restaurants for a full day out. Getting there is easy: a dedicated Shopping Express coach runs from the centre near Passeig de Gràcia, or you can combine train and local bus. Go early in the day and midweek for the best size availability and the smallest crowds, and check the website for any tourist-discount cards that add a further percentage off. It's a detour rather than a city-centre stop, so it suits travellers who genuinely want bargains on labels rather than a quick browse. If discounted designer shopping is a priority, it's the definitive option near Barcelona — combine it with a relaxed lunch on site.",
  },
  {
    name: "El Born Boutiques", slug: "el-born-boutiques", image: S("artisan-shop.webp"), rating: 4.5, reviewCount: 9000,
    type: "Independent Boutiques", area: "El Born", tip: "The best area for one-off local design, jewellery and concept stores — wander the side lanes.",
    filterKeys: ["local"],
    description: "The medieval lanes of El Born, packed with independent designers, concept stores and local jewellery.",
    practicalInfo: { openingHours: "Shops ~11:00–21:00", price: "Free to browse", howToGetThere: "Metro L4 to Jaume I, walk into El Born" },
    fullDescription: "For independent, design-led shopping, El Born is Barcelona's best hunting ground. The quarter's narrow medieval lanes — especially around Passeig del Born, Carrer del Rec and Carrer dels Flassaders — are lined with small boutiques run by local designers, concept stores, artisan jewellers, leather workshops and homeware shops that you won't find on the main avenues. It's the place to pick up genuinely original pieces and Catalan-made goods rather than global chain-store labels, and the hunt itself is a pleasure: the streets are photogenic, the pace unhurried and there's a cocktail bar or coffee stop around every corner when you need a break. Prices span accessible to high-end depending on the maker, and many shops keep slightly later, more relaxed hours than the big-brand stores. Because it sits beside the Picasso Museum and Santa Maria del Mar, you can fold shopping into a broader afternoon in the old town. For souvenirs with real character and support for local creators, browse El Born's back streets with time to spare and no fixed list.",
  },
  {
    name: "Mercat de la Boqueria", slug: "boqueria-market", image: S("outdoor-market.webp"), rating: 4.6, reviewCount: 140000,
    type: "Food Market", area: "Las Ramblas", tip: "Shop and snack at the back stalls — the front rows are pricier and aimed at tourists.",
    filterKeys: ["markets"],
    description: "Barcelona's most famous food market off Las Ramblas — a riot of jamón, seafood, fruit and tapas counters.",
    practicalInfo: { openingHours: "Mon–Sat ~08:00–20:30 (closed Sun)", price: "Free entry; snacks a few euros", howToGetThere: "Metro L3 to Liceu, on Las Ramblas" },
    fullDescription: "The Mercat de la Boqueria is Barcelona's most celebrated market, a cavernous, colour-saturated hall just off Las Ramblas that has been trading since the nineteenth century. Under its iron-and-glass roof, stalls overflow with jamón ibérico, glistening seafood, pyramids of fruit, cheeses, olives, spices and fresh juices, and tucked among them are little tapas counters where you can perch and eat superb, market-fresh food. It's a feast for the senses and a photographer's dream, though its fame means the front rows by the entrance are touristy and marked up — walk to the back and sides for local prices, better produce and shorter queues. Come hungry, ideally mid-morning before the lunch rush, and treat it as both a shop and a place to graze. It closes on Sundays and gets extremely busy at peak times. For food lovers it's an essential Barcelona experience; buy picnic supplies, sample as you go, or sit at one of the classic bar counters like El Quim for a memorable, unpretentious meal.",
  },
  {
    name: "Els Encants Vells", slug: "els-encants", image: S("vintage-market.webp"), rating: 4.2, reviewCount: 20000,
    type: "Flea Market", area: "Glòries", tip: "Go early on market days to dig for vintage and antiques before the best pieces vanish.",
    filterKeys: ["markets", "local"],
    description: "One of Europe's oldest flea markets, now under a mirrored canopy at Glòries — antiques, vintage and bric-a-brac.",
    practicalInfo: { openingHours: "Mon, Wed, Fri, Sat ~09:00–20:00", price: "Free entry", howToGetThere: "Metro L1 to Glòries, beside the Torre Glòries" },
    fullDescription: "Els Encants Vells is one of the oldest flea markets in Europe, trading in some form since the medieval period and now housed under a striking mirrored golden canopy beside the Torre Glòries. Several days a week its stalls sprawl with antiques, vintage clothing, retro furniture, vinyl, tools, books and pure bric-a-brac, plus an upper level of more organised second-hand and craft vendors. Part of the fun is the treasure-hunt unpredictability — you might turn up a genuine antique, a quirky souvenir or nothing at all — and the haggling that goes with it. Serious buyers arrive early on market mornings, before the good pieces are picked over, and cash is king. It's a very local, slightly chaotic scene rather than a polished shopping experience, which is exactly its charm, and the futuristic canopy makes it worth a look even if you don't buy. Combine it with the design museum and the regenerated Glòries district nearby. For vintage hunters and the curious, it's a characterful, free half-hour to a half-day depending on your appetite for rummaging.",
  },
  {
    name: "Mercat de Sant Antoni", slug: "sant-antoni-market", image: S("outdoor-market.webp"), rating: 4.5, reviewCount: 14000,
    type: "Market", area: "Sant Antoni", tip: "Locals' food market by week; Sunday brings the famous book, comic and collector market.",
    filterKeys: ["markets", "local"],
    description: "A beautifully restored iron market hall for food, plus a famous Sunday book and collectors' market.",
    practicalInfo: { openingHours: "Food hall Mon–Sat ~08:00–20:00; Sunday book market mornings", price: "Free entry", howToGetThere: "Metro L2 to Sant Antoni" },
    fullDescription: "Mercat de Sant Antoni is a magnificent nineteenth-century iron market hall, beautifully restored, that anchors the increasingly hip Sant Antoni neighbourhood. Inside, it functions as a proper local food market — far less touristy than the Boqueria — where residents shop for produce, meat, fish and deli goods, and where the tapas counters serve excellent, honestly priced snacks with barely a tour group in sight. That local authenticity is the draw for visitors who want to eat and shop the way Barcelonans do. On Sunday mornings the market spills outdoors with its long-running book, comic, magazine and collectors' fair, a beloved city tradition where bibliophiles and vintage hunters browse the stalls. The surrounding streets have become one of the city's best areas for independent cafés, wine bars and brunch spots, so it's easy to build a relaxed morning around a visit. Come on a weekday for the food hall and local flavour, or on Sunday for the book market, and stay for coffee in the neighbourhood. It's a rewarding, crowd-free alternative to the tourist markets.",
  },
  {
    name: "Gothic Quarter Souvenirs", slug: "gothic-souvenirs", image: S("souvenir-shop.webp"), rating: 4.1, reviewCount: 7000,
    type: "Souvenirs & Crafts", area: "Ciutat Vella", tip: "Skip the mass-made magnets on the main lanes; the side streets hide real Catalan crafts.",
    filterKeys: ["souvenirs", "local"],
    description: "The souvenir and craft shops woven through the Gothic Quarter, from tourist trinkets to genuine Catalan crafts.",
    practicalInfo: { openingHours: "Shops ~10:00–21:00", price: "Free to browse", howToGetThere: "Metro L3/L4 to Liceu or Jaume I" },
    fullDescription: "The Gothic Quarter is where most visitors do their souvenir shopping, its medieval lanes thick with shops selling everything from fridge magnets and flamenco fans to espadrilles, ceramics and Barça merchandise. The trick is knowing where to look: the busiest arteries around the cathedral and Carrer de la Portaferrissa lean heavily towards mass-produced tourist tat at marked-up prices, while a short detour into the quieter side streets turns up genuine Catalan crafts — hand-painted ceramics, traditional espadrilles from long-established makers, artisan leather, and design-led gift shops. Look out for authentic touches like locally made pottery, quality olive oil and turrón, or a proper pair of espardenyes rather than the generic keepsakes. Prices are negotiable in some of the smaller independent stores, less so in the chains. Because the quarter is compact and central, souvenir hunting folds easily into general sightseeing between the cathedral, Plaça Reial and the waterfront. Shop with a little discernment and you'll come away with something that actually feels of Barcelona rather than off a global gift-shop shelf.",
  },
  {
    name: "Diagonal Mar / La Maquinista", slug: "shopping-malls", image: S("mall.webp"), rating: 4.3, reviewCount: 30000,
    type: "Shopping Mall", area: "Sant Martí / Sant Andreu", tip: "All-weather high-street shopping under one roof — handy on a rainy day or with kids.",
    filterKeys: ["local"],
    description: "Barcelona's large modern malls, gathering high-street and mid-market brands, food courts and cinemas under one roof.",
    practicalInfo: { openingHours: "Daily ~10:00–22:00", price: "Free entry", howToGetThere: "Diagonal Mar: Metro L4 to El Maresme | Fòrum; La Maquinista: Metro L1 to Sant Andreu" },
    fullDescription: "When the weather turns or you just want familiar high-street shopping in one place, Barcelona's big malls do the job. Diagonal Mar, out by the eastern waterfront, and La Maquinista, in the north of the city, are the two largest — sprawling, modern centres gathering hundreds of high-street and mid-market fashion, sportswear, tech and homeware brands, along with sizeable food courts, cafés and multiplex cinemas. They're a world away from the character of the old-town streets, but they're practical: air-conditioned, all under cover, open late and open on Sundays (unlike most independent shops), which makes them genuinely useful on a rainy afternoon, with children in tow, or when you need something specific quickly. La Maquinista is partly open-air and family-friendly; Diagonal Mar pairs neatly with the nearby beaches and the Fòrum. Prices match the mainstream chains you'll know from home, so this is about convenience and range rather than local flavour or bargains. Use the mall metro stops to reach them directly, and treat them as a backup option rather than a highlight of a Barcelona shopping trip.",
  },
];

// ── With kids (8) ────────────────────────────────────────────────────────────
export const WITH_KIDS: BcnPlace[] = [
  {
    name: "Tibidabo Amusement Park", slug: "tibidabo-park", image: K("tibidabo.webp"), rating: 4.5, reviewCount: 31000,
    ageGroup: "All ages", price: "€35", area: "Tibidabo", tip: "Vintage rides plus the best city views — take the Tramvia Blau up for extra magic.",
    filterKeys: ["outdoor"],
    description: "A charming century-old hilltop amusement park with vintage rides and Barcelona's best panoramas.",
    practicalInfo: { openingHours: "Weekends & holidays, seasonal", price: "From €35 (free rides area for less)", howToGetThere: "FGC to Avinguda Tibidabo, then Tramvia Blau + funicular" },
    fullDescription: "Perched on Barcelona's highest hill, the Tibidabo Amusement Park has entertained families since 1901, blending old-fashioned charm with jaw-dropping views. The star attractions are its heritage rides — the aeroplane that swings out over the city, a lovingly maintained carousel and Ferris wheel — set against a panorama that stretches across the whole city to the sea. It's smaller and gentler than a modern mega-park, which suits younger children perfectly, and there's a section of free rides plus the ticketed 'Sky Walk' area. Half the adventure is the journey up: the vintage Tramvia Blau tram and a funicular haul you through the woods to the summit, an experience in itself. Combine the fairground with the free hilltop church and the viewpoint for a memorable half-day. The park runs a seasonal, mainly weekend schedule, so check opening dates before setting out, and pick a clear day to make the most of those views. It's a nostalgic, scenic alternative to a big theme park and a firm family favourite.",
  },
  {
    name: "Barcelona Aquarium", slug: "aquarium", image: K("aquarium.webp"), rating: 4.3, reviewCount: 42000,
    ageGroup: "All ages", price: "€25", area: "Port Vell", tip: "The 80-metre glass shark tunnel is the highlight — book online to skip the queue.",
    tiqetsUrl: tiqets("Aquarium Barcelona"), filterKeys: ["indoor", "educational"],
    description: "A large aquarium at Port Vell with an 80-metre walk-through shark tunnel and a big Mediterranean focus.",
    practicalInfo: { openingHours: "Daily ~10:00–20:00 (later in summer)", price: "From €25 adult; child discounts", howToGetThere: "Metro L3 to Drassanes, walk to Port Vell / Maremagnum" },
    fullDescription: "The Barcelona Aquarium at Port Vell is one of the biggest in Europe with a strong Mediterranean focus, and it's a dependable, weatherproof hit with children. Its signature is the Oceanari, a vast tank crossed by an 80-metre glass tunnel that puts sharks, rays and shoals of fish gliding right over your head — a genuine wow moment for kids and adults alike. Beyond it, themed zones showcase tropical reefs, penguins and dozens of tanks of colourful marine life, with an interactive 'Planeta Aqua' area and a well-designed children's zone (Explora!) full of hands-on exhibits aimed at younger visitors. It sits inside the Maremagnum leisure complex on the waterfront, so it's easy to combine with a harbour walk, lunch and the nearby beach. Buy tickets online to skip the ticket queue, which can be long in peak season and on rainy days, and allow around two hours. Educational, sheltered and central, it's an ideal option for a family morning or an afternoon when the weather won't cooperate.",
  },
  {
    name: "CosmoCaixa Science Museum", slug: "cosmocaixa-kids", image: K("kids-museum.webp"), rating: 4.5, reviewCount: 21000,
    ageGroup: "6+ (all welcome)", price: "€6", area: "Sarrià", tip: "Hands-on experiments and an indoor rainforest — under-16s go free.",
    filterKeys: ["indoor", "educational"],
    description: "An outstanding interactive science museum with an indoor rainforest, planetarium and hundreds of experiments.",
    practicalInfo: { openingHours: "Daily 10:00–20:00", price: "€6; under-16s free", howToGetThere: "FGC to Avinguda Tibidabo, short walk or 196 bus" },
    fullDescription: "CosmoCaixa is a brilliant rainy-day and any-day option for families, an interactive science museum that manages to be genuinely educational and great fun at once. Children can wander through a real recreated Amazon rainforest — 1,000 square metres of humidity, tropical fish, caimans and simulated storms — press, pull and experiment their way through halls of physics and evolution exhibits, and take in a Planetarium show. There's a dedicated space for the youngest visitors and enough hands-on stations to absorb curious minds for hours. Up in leafy Sarrià near the foot of Tibidabo, it's easy to reach on the FGC train, and at just €6 with under-16s free it's exceptional value for a half-day out of the heat or rain. Allow two to three hours, longer if the rainforest captivates your kids, and consider pairing it with a Tibidabo trip since they're on the same side of the city. For a family outing that sneaks in real learning, it's one of Barcelona's best.",
  },
  {
    name: "Barcelona Zoo", slug: "zoo", image: K("zoo.webp"), rating: 4.2, reviewCount: 40000,
    ageGroup: "All ages", price: "€21", area: "Parc de la Ciutadella", tip: "Set inside the city's central park — easy to combine with a picnic and playground time.",
    filterKeys: ["outdoor", "educational"],
    description: "The city zoo inside Parc de la Ciutadella, home to hundreds of species and set in leafy central parkland.",
    practicalInfo: { openingHours: "Daily ~10:00–18:00/19:30 (seasonal)", price: "From €21 adult; child discounts", howToGetThere: "Metro L1 to Arc de Triomf or L4 to Ciutadella | Vila Olímpica" },
    fullDescription: "Barcelona Zoo occupies a big green chunk of the Parc de la Ciutadella, right in the centre of the city, which makes it one of the easiest family attractions to reach and combine with other things. It houses hundreds of species across gorillas, big cats, primates, reptiles, birds and a farm area, with shaded paths, plenty of space and regular feeding and educational activities through the day. Being inside the city's most popular park is a real bonus: you can pair the zoo with a picnic on the lawns, a row on the boating lake, the playgrounds and the grand Cascada fountain, turning it into a full, low-stress day out for children. It's a traditional city zoo rather than a modern safari park, so manage expectations, but younger kids in particular love it. Buy tickets online for a small saving and to skip the queue, wear sun protection in summer as much of it is open, and allow two to three hours. Central, green and reliably kid-pleasing, it's a solid family choice.",
  },
  {
    name: "Parc de la Ciutadella", slug: "ciutadella-park", image: K("family-park.webp"), rating: 4.6, reviewCount: 55000,
    ageGroup: "All ages", price: "Free", area: "Ciutat Vella", tip: "Rent a rowboat on the lake, then let the kids loose on the lawns and playgrounds.",
    filterKeys: ["free", "outdoor"],
    description: "Barcelona's central green park, with a boating lake, a monumental fountain, playgrounds and space to roam.",
    practicalInfo: { openingHours: "Daily ~10:00–22:30", price: "Free; rowboat hire ~€6/30 min", howToGetThere: "Metro L1 to Arc de Triomf or L4 to Barceloneta / Ciutadella" },
    fullDescription: "Parc de la Ciutadella is Barcelona's central green lung and a free, easy win for families. Laid out on the site of an old fortress, it packs a lot into its lawns and tree-lined avenues: a boating lake where you can hire a rowboat for a gentle half-hour, the theatrical Cascada fountain (which a young Gaudí helped design), a mammoth statue kids love, shady picnic spots, playgrounds and wide paths perfect for scooters and running off energy. The Catalan parliament and the city zoo sit within the park, and it's ringed by the Arc de Triomf and the El Born neighbourhood, so it's superbly central and simple to fold into a day of sightseeing. On weekends it fills with locals, drum circles and jugglers, giving it a relaxed, communal atmosphere. It costs nothing, needs no booking and offers a welcome breather from the dense old town — ideal for a picnic lunch, some rowboat fun and letting children play. Bring a ball, a blanket and snacks, and let the afternoon unwind.",
  },
  {
    name: "Poble Espanyol", slug: "poble-espanyol", image: K("family-park.webp"), rating: 4.2, reviewCount: 25000,
    ageGroup: "All ages", price: "€14", area: "Montjuïc", tip: "An open-air 'village' of Spanish architecture with craft workshops kids can watch.",
    tiqetsUrl: tiqets("Poble Espanyol Barcelona"), filterKeys: ["outdoor", "educational"],
    description: "An open-air architecture museum recreating streets and squares from across Spain, with artisan workshops.",
    practicalInfo: { openingHours: "Daily ~10:00–20:00 (later in summer)", price: "From €14 adult; child discounts", howToGetThere: "Metro L1/L3 to Espanya, then walk or bus up Montjuïc" },
    fullDescription: "Poble Espanyol, on the slopes of Montjuïc, is an open-air 'Spanish village' built for the 1929 International Exhibition, recreating streets, squares and buildings from across the country in a single walkable complex. For families it works on several levels: children can roam the traffic-free lanes and plazas, watch artisans at work in glass-blowing, ceramics and craft workshops, and there's plenty of space without the intensity of the city streets. Adults get an easy architectural tour of Spain's regional styles plus galleries, shops and restaurants, and the whole site hosts festivals and events through the year. It's a slightly touristy, curated experience rather than a 'real' neighbourhood, but that curation is exactly what makes it relaxed and manageable with kids. Buy tickets online for a discount and to save time, and combine it with the nearby MNAC, Magic Fountain and Montjuïc gardens for a fuller day on the hill. Allow a couple of hours, more if the workshops and open spaces keep the children happily occupied. It's a gentle, screen-free outing with something for every age.",
  },
  {
    name: "Magic Fountain of Montjuïc", slug: "magic-fountain", image: K("family-park.webp"), rating: 4.6, reviewCount: 60000,
    ageGroup: "All ages", price: "Free", area: "Montjuïc", tip: "Free evening light-and-music show — arrive 20 minutes early for a spot on the steps.",
    filterKeys: ["free", "outdoor"],
    description: "A free, choreographed evening show of water, light and music below the Palau Nacional on Montjuïc.",
    practicalInfo: { openingHours: "Show evenings (Thu–Sat, seasonal); check schedule", price: "Free", howToGetThere: "Metro L1/L3 to Espanya, walk up toward the Palau Nacional" },
    fullDescription: "The Font Màgica de Montjuïc is one of Barcelona's most reliable free crowd-pleasers, and children are mesmerised by it. On selected evenings, the grand fountain below the illuminated Palau Nacional stages a choreographed show of jetting water, shifting colour and music — everything from classical to pop — that lasts around twenty minutes and repeats through the evening. It's a magical, no-cost end to a day of sightseeing, best watched from the fountain steps or the terraces above with the palace glowing behind. Arrive fifteen to twenty minutes before the first show to claim a good vantage point, as it draws big audiences on summer weekends. Because it sits at the foot of Montjuïc by Plaça d'Espanya, you can pair it with a daytime visit to MNAC, the Poble Espanyol or the hill's gardens, then linger for the show as darkness falls. Note that it runs on a seasonal schedule with reduced days in winter, so always check current show times before you go. Free, festive and family-friendly, it's a lovely way to cap an evening.",
  },
  {
    name: "Museu de la Xocolata", slug: "chocolate-museum", image: K("kids-museum.webp"), rating: 4.3, reviewCount: 11000,
    ageGroup: "All ages", price: "€6", area: "El Born", tip: "Your entry ticket is an edible chocolate bar — and yes, there are tastings.",
    filterKeys: ["indoor", "educational"],
    description: "A small, sweet museum in El Born tracing chocolate's history with elaborate cocoa sculptures — and tastings.",
    practicalInfo: { openingHours: "Mon–Sat ~10:00–19:00, Sun ~10:00–15:00", price: "€6 (ticket is an edible chocolate bar)", howToGetThere: "Metro L1 to Arc de Triomf or L4 to Jaume I, into El Born" },
    fullDescription: "The Museu de la Xocolata in El Born is a small but delightful stop that wins over children instantly — starting with the entry ticket, which is a real chocolate bar you can eat. Inside, it tells the story of chocolate from its origins in the Americas to its arrival and popularity in Europe, illustrated with genuinely impressive chocolate sculptures — famous buildings, cartoon characters and Gaudí landmarks all modelled in cocoa. It's compact enough not to tax young attention spans, and the museum runs chocolate-making workshops and tastings (book ahead) that turn a quick visit into a hands-on treat. Set in the atmospheric streets of El Born beside the Parc de la Ciutadella, it slots easily into a family day that might also take in the park, the zoo or the beach. At around €6 it's inexpensive, indoors and reliably sweet-toothed fun, making it a perfect option for an hour out of the sun or rain. Finish, inevitably, at the shop for a bar or two to take home.",
  },
];

// ── Day trips (6) ────────────────────────────────────────────────────────────
export const DAY_TRIPS: BcnPlace[] = [
  {
    name: "Montserrat", slug: "montserrat-trip", image: D("montserrat.webp"), rating: 4.7, reviewCount: 52000,
    distance: "50 km NW", duration: "Half / full day", area: "Catalonia", tip: "Catch the 08:00 train to hear the boys' choir sing at 13:00.",
    tiqetsUrl: tiqets("Montserrat day trip Barcelona"), filterKeys: ["nature", "culture"],
    description: "A mountaintop monastery on serrated peaks, Catalonia's spiritual heart and the region's classic day trip.",
    practicalInfo: { openingHours: "Monastery ~09:00–18:30; choir ~13:00 most days", price: "Train + rack railway/cable car ~€22 return; combos ~€42", howToGetThere: "FGC R5 from Plaça Espanya to Monistrol, then rack railway or Aeri cable car" },
    fullDescription: "Montserrat is the day trip most first-time visitors prioritise — a Benedictine monastery clinging to a mountain of extraordinary saw-toothed rock about an hour north-west of the city. It's the spiritual centre of Catalonia, home to the revered twelfth-century Black Madonna (La Moreneta) and to the Escolania, one of Europe's oldest boys' choirs, which sings in the basilica around 1 pm on most days. The setting is the real star: funiculars and marked trails climb to hermitages and the Sant Jeroni summit, rewarding walkers with 360-degree views across Catalonia. The standard route is the FGC train from Plaça Espanya to Monistrol, then the rack railway or the Aeri cable car up the cliff-face, with combined and all-inclusive tickets available. Take the early train to fit in the choir, monastery, a short hike and the museum before heading back, and pack layers — it's noticeably cooler and breezier on the mountain than down in Barcelona. Half a day covers the essentials; a full day lets you walk.",
  },
  {
    name: "Sitges", slug: "sitges-trip", image: D("sitges.webp"), rating: 4.6, reviewCount: 26000,
    distance: "40 km SW", duration: "Half day", area: "Costa del Garraf", tip: "A 35-minute train to 17 beaches, whitewashed lanes and a relaxed, bohemian buzz.",
    filterKeys: ["beach", "culture"],
    description: "A pretty seaside town 35 minutes south, with 17 beaches, a photogenic old town and a lively, bohemian scene.",
    practicalInfo: { openingHours: "Always open; museums ~10:00–19:00", price: "R2 Sud train ~€5 each way", howToGetThere: "Rodalies R2 Sud from Barcelona-Sants to Sitges (~35 min)" },
    fullDescription: "Sitges is the simplest, prettiest coastal escape from Barcelona — a whitewashed town of seventeen beaches just 35 minutes south on the R2 Sud commuter train. Its landmark, the seventeenth-century church of Sant Bartomeu, stands on a rocky outcrop above the sea and is one of Catalonia's most photographed views, especially at sunset. Behind it, a compact old town of narrow lanes, modernista mansions and the Cau Ferrat museum rewards a wander between swims, and the town's long-standing bohemian, LGBTQ+-friendly character gives it a relaxed, festive energy. It makes an ideal half-day or unhurried full-day trip: alternate beach time with tapas terraces, gelato and a stroll through the galleries, then catch an evening train home. Because it's so accessible and pleasant, it also suits travellers who want reliable sun and sand without the crowds of the city beaches. Go on a clear day, pick a beach to match your mood — lively central sands or quieter coves a short walk away — and don't rush the seafront at golden hour.",
  },
  {
    name: "Girona", slug: "girona", image: D("girona.webp"), rating: 4.7, reviewCount: 38000,
    distance: "100 km NE", duration: "Full day", area: "Catalonia", tip: "Take the high-speed AVE (38 min) and walk the medieval walls and colourful riverfront.",
    filterKeys: ["culture"],
    description: "A gorgeously preserved medieval city 38 minutes away by fast train, with colourful riverside houses and old walls.",
    practicalInfo: { openingHours: "Streets always open; cathedral & sights ~10:00–18:00", price: "AVE high-speed ~€15–25 each way", howToGetThere: "AVE/Avant high-speed train from Barcelona-Sants to Girona (~38 min)" },
    fullDescription: "Girona is one of Catalonia's most rewarding day trips and, thanks to the high-speed train, one of the easiest — barely forty minutes from Barcelona-Sants. The city's centrepiece is its beautifully preserved medieval old town, a maze of stone lanes rising to a vast Gothic cathedral with one of the widest naves in the world, reached by a dramatic sweep of steps. You can walk long stretches of the ancient city walls for views over terracotta rooftops, explore one of Europe's best-preserved Jewish quarters (El Call), and photograph the famous line of red, ochre and yellow houses reflected in the River Onyar. Game of Thrones fans will recognise several locations used in the series. It's compact, walkable and less hectic than Barcelona, with excellent restaurants (the region is a gastronomic heavyweight) making lunch a highlight. A full day lets you cover the cathedral, walls, Jewish quarter and riverfront at a relaxed pace with time for a long lunch. Book train tickets ahead for the best fares on the fast service.",
  },
  {
    name: "Costa Brava", slug: "costa-brava-trip", image: D("costa-brava-landscape.webp"), rating: 4.7, reviewCount: 30000,
    distance: "1.5h north", duration: "Full day", area: "Girona coast", tip: "Rent a car to reach the best hidden coves — Tossa de Mar is the easiest by bus.",
    filterKeys: ["nature", "beach", "adventure"],
    description: "The wild, cove-studded coast north of Barcelona, with dramatic cliffs, turquoise water and charming fishing towns.",
    practicalInfo: { openingHours: "Always open", price: "Bus to Tossa de Mar ~€13 each way; car hire varies", howToGetThere: "Sarfa/Moventis bus to Tossa de Mar (~1.5h); or hire a car for flexibility" },
    fullDescription: "The Costa Brava — the 'wild coast' — begins about an hour and a half north of Barcelona and offers the region's most dramatic seaside scenery: pine-clad cliffs plunging to hidden coves of turquoise water, whitewashed fishing villages and coastal footpaths (camins de ronda) that thread between them. The most accessible highlight by public transport is Tossa de Mar, where a walled medieval old town rises straight from the beach, reachable by direct bus. To really explore, though, hiring a car pays off, letting you string together coves and towns like Calella de Palafrugell, Begur and the artist enclave of Cadaqués, once home to Salvador Dalí and set in some of Catalonia's loveliest landscape. It's a nature-and-beach day rather than a city one, ideal for swimming in clear water, cliff-top walking and long seafood lunches with a view. Go on a settled, sunny day, start early to beat the traffic and crowds, and pick either one town to savour slowly or a car route to sample several. It's the coast at its most beautiful.",
  },
  {
    name: "Tarragona", slug: "tarragona", image: D("tarragona.webp"), rating: 4.5, reviewCount: 18000,
    distance: "100 km SW", duration: "Full day", area: "Costa Daurada", tip: "Roman ruins meet a Mediterranean beach — the seaside amphitheatre is unmissable.",
    filterKeys: ["culture", "beach"],
    description: "A seaside city with Spain's best Roman remains, including a clifftop amphitheatre overlooking the Mediterranean.",
    practicalInfo: { openingHours: "Ruins & sights ~09:00–18:00", price: "Regional/AVE train ~€8–20 each way", howToGetThere: "Rodalies or high-speed train from Barcelona to Tarragona (~35–70 min)" },
    fullDescription: "Tarragona pairs serious history with a Mediterranean beach, making it one of the more varied day trips from Barcelona. As the Roman capital of this part of Iberia (ancient Tarraco), it preserves an outstanding, UNESCO-listed collection of Roman remains: a dramatic seaside amphitheatre set on the cliffs above the sea, the circus and forum, stretches of city wall and, just outside town, the Les Ferreres aqueduct (the 'Pont del Diable'). Layered on top is an atmospheric medieval old town crowned by a fine cathedral, and — the bonus — genuine city beaches right below, so you can combine ruins in the morning with a swim and seafood lunch in the afternoon. It's reachable in as little as 35 minutes on the high-speed train (a bit longer and cheaper on the regional line), and it feels relaxed and untouristy compared with Barcelona. A full day comfortably covers the main Roman sites, the cathedral, the old town and some beach time. History buffs and anyone wanting a culture-plus-coast combination will find it richly rewarding — bring swimwear as well as good walking shoes.",
  },
  {
    name: "Penedès Wine Country", slug: "penedes", image: D("penedes-vineyard.webp"), rating: 4.6, reviewCount: 12000,
    distance: "45 min west", duration: "Half / full day", area: "Penedès", tip: "Tour a cava cellar in Sant Sadurní — book a tasting and let the train do the driving.",
    filterKeys: ["nature", "culture"],
    description: "Catalonia's premier wine region, home of cava, with historic cellars and vineyards a short train ride west.",
    practicalInfo: { openingHours: "Cellar tours by appointment, daytime", price: "Train ~€4–7 each way; cellar tours ~€15–30", howToGetThere: "Rodalies R4 to Sant Sadurní d'Anoia or Vilafranca del Penedès (~45–60 min)" },
    fullDescription: "The Penedès, just forty-five minutes west of Barcelona by regional train, is Catalonia's great wine country and the birthplace of cava, the region's celebrated sparkling wine. The hub is Sant Sadurní d'Anoia, home to the famous cava houses — the vast, cathedral-like Codorníu cellars and the extensive Freixenet caves among them — where guided tours take you underground through kilometres of ageing bottles and finish with a tasting. Nearby Vilafranca del Penedès offers still-wine producers and a good wine museum, all set among rolling vineyards with the serrated silhouette of Montserrat on the horizon. Because the train drops you close to the cellars, it's an easy, car-free day: book a tour or two in advance, space them around a long Catalan lunch, and let the railway handle the driving so everyone can taste. It's a relaxed, grown-up day trip that swaps sightseeing for scenery, cellar visits and good glasses of cava and red. Half a day covers one or two wineries; a full day lets you add lunch and a second estate. A lovely change of pace from the city.",
  },
];

// ── Restaurants (8) — generic food image (no photo rights from source) ───────
export const RESTAURANTS: BcnPlace[] = [
  {
    name: "Bar Cañete", slug: "bar-canete", image: FOOD_IMG, rating: 4.5, reviewCount: 9000,
    type: "Classic Tapas", price: "€€", area: "El Raval", tip: "Sit at the marble counter for the full show — book ahead, it's always packed.",
    filterKeys: ["tapas"],
    description: "A buzzing marble-counter tapas bar in El Raval serving polished classics with real energy.",
    practicalInfo: { openingHours: "Mon–Sat ~13:00–23:30 (closed Sun)", price: "~€35–50 per person", howToGetThere: "Metro L3 to Liceu, short walk into El Raval" },
    fullDescription: "Bar Cañete is one of Barcelona's most beloved tapas bars, a lively El Raval institution where white-jacketed waiters work a long marble counter with theatrical energy. The kitchen turns out impeccable versions of Catalan and Spanish classics — jamón and cured meats, grilled prawns, croquetas, fried artichokes, a superb tortilla — using top-quality produce and cooking it simply and precisely. Sitting at the bar, watching the plates fly and the staff banter, is the way to do it, though there's a smart dining room behind for those who prefer a table. It's more polished and pricier than a neighbourhood tapas joint, but the consistency and buzz justify it, which is why it stays booked out. Reserve in advance, especially for the counter, and come hungry and ready to share several small plates. Expect around €35–50 a head with wine. Central and reliably excellent, it's an ideal introduction to Barcelona's tapas culture done at a high level, and a safe recommendation for a first proper meal in the city.",
  },
  {
    name: "Can Solé", slug: "can-sole", image: FOOD_IMG, rating: 4.4, reviewCount: 6000,
    type: "Seafood / Paella", price: "€€€", area: "Barceloneta", tip: "Century-old paella house — order the rice for two and the catch of the day.",
    filterKeys: ["seafood"],
    description: "A century-old Barceloneta institution for classic paella, rice dishes and fresh Mediterranean seafood.",
    practicalInfo: { openingHours: "Tue–Sat lunch & dinner; Sun lunch (closed Mon)", price: "~€45–70 per person", howToGetThere: "Metro L4 to Barceloneta, into the old fishing quarter" },
    fullDescription: "Can Solé has been serving the seafaring Barceloneta quarter since 1903, and stepping inside — past walls hung with signed photos and traditional tiling — feels like entering old maritime Barcelona. This is the place for the real thing: proper Valencian-style paellas, arroz negro stained with squid ink, fideuà and a suquet de peix (fisherman's stew) built on the day's catch, all cooked with the confidence of a kitchen that has done it for over a century. The seafood is fresh and generous, the rice dishes are the signature (order them for two), and the service is warm and old-school. It's a special-occasion spot rather than a budget one — expect around €45–70 a head — but for classic Catalan rice and seafood in an atmospheric, authentic setting, few places match it. Book ahead, particularly for weekend lunch, and pair it with a pre-meal vermouth and a post-meal walk along the Barceloneta beachfront just outside. A memorable, traditional taste of the city's seafood heritage.",
  },
  {
    name: "Disfrutar", slug: "disfrutar", image: FOOD_IMG, rating: 4.8, reviewCount: 5000,
    type: "Fine Dining", price: "€€€€", area: "Eixample", tip: "One of the world's best — reserve months ahead for the multi-course tasting menu.",
    filterKeys: ["fine-dining"],
    description: "A three-Michelin-star, world-top-ranked tasting-menu restaurant from former elBulli chefs — book months ahead.",
    practicalInfo: { openingHours: "Tue–Sat, tasting menus only (closed Sun–Mon)", price: "Tasting menu from ~€250 per person", howToGetThere: "Metro L1 to Rocafort or L3/L5 to Hospital Clínic, in Eixample" },
    fullDescription: "Disfrutar is Barcelona's most acclaimed restaurant — three Michelin stars and, in recent years, ranked the best restaurant in the world — created by three chefs who came up through the legendary elBulli. Its long tasting menu is a playful, technically astonishing parade of dishes that surprise, delight and occasionally trick the senses, delivered in a bright, Mediterranean-styled room in Eixample. This is destination dining rather than a casual meal: a multi-hour experience with wine pairings, immaculate service and a bill to match (from around €250 a head). Tables are among the hardest to get in the city, released in batches and snapped up months in advance, so if it's on your list, plan far ahead and be ready to book the moment reservations open. For food-obsessed travellers marking a special occasion, it's a genuine bucket-list experience and a showcase of why Barcelona sits at the cutting edge of gastronomy. If Disfrutar is full, its sibling and other Michelin spots in the city offer similarly creative, if slightly less impossible, alternatives.",
  },
  {
    name: "Quimet & Quimet", slug: "quimet-quimet", image: FOOD_IMG, rating: 4.5, reviewCount: 8000,
    type: "Montaditos / Tapas", price: "€€", area: "Poble-sec", tip: "Standing room only — order the montaditos and let them pair the tinned seafood and wine.",
    filterKeys: ["tapas", "budget"],
    description: "A tiny, standing-only Poble-sec bar famous for layered montaditos and outstanding tinned seafood and wine.",
    practicalInfo: { openingHours: "Mon–Fri ~12:00–16:00 & 19:00–22:30; Sat lunch (check days)", price: "~€20–35 per person", howToGetThere: "Metro L3 to Poble Sec, short walk" },
    fullDescription: "Quimet & Quimet is a Barcelona cult classic — a minuscule, family-run bodega in Poble-sec, standing-room-only and lined floor to ceiling with bottles. There's no kitchen in the usual sense; instead the magic is in the montaditos, little open sandwiches built to order with combinations of premium tinned seafood, cheeses, cured meats, honey, caviar and clever flourishes, plus a superb range of conservas and wines by the glass. You perch at a barrel or squeeze along the counter, tell them roughly what you like, and let them assemble a sequence of exquisite bites. It's inexpensive for the quality, endlessly popular and gloriously atmospheric, though the tight space and no-reservations policy mean going at off-peak times to get in comfortably — right at opening is best. Expect around €20–35 a head depending on your appetite for the pricier tins. For a genuinely local, delicious and characterful tapas experience that won't break the budget, it's a must, and a perfect stop while exploring the up-and-coming Poble-sec neighbourhood. Cash and patience help.",
  },
  {
    name: "La Cova Fumada", slug: "la-cova-fumada", image: FOOD_IMG, rating: 4.4, reviewCount: 5000,
    type: "Traditional Tapas", price: "€", area: "Barceloneta", tip: "No sign, cash only — come for the original 'bomba' and grilled seafood at lunch.",
    filterKeys: ["tapas", "budget"],
    description: "A no-frills, no-sign Barceloneta institution and the birthplace of the 'bomba' — cheap, authentic and cash-only.",
    practicalInfo: { openingHours: "Mon–Sat lunch (& some evenings); closed Sun", price: "~€15–25 per person", howToGetThere: "Metro L4 to Barceloneta, into the old fishing quarter" },
    fullDescription: "La Cova Fumada is as authentic as Barcelona tapas gets — a scruffy, family-run bar in Barceloneta with no sign over the door, communal tables and a chalkboard of the day's dishes. It's famous as the birthplace of the bomba, a fried potato-and-meat croquette topped with spicy and garlic sauces, and it's still the benchmark version. Alongside it come simple, brilliant plates of grilled sardines, chickpeas with morcilla, fried artichokes and whatever seafood came in fresh, cooked on an ancient stove behind the bar. It's cheap, cash-only, cramped and often busy with a mix of old regulars and clued-up visitors, which is exactly the appeal. Go at lunch (its core hours), be prepared to wait or share a table, and don't expect frills or much English — just point, order the bomba and a few plates, and enjoy one of the city's most genuine, budget-friendly meals for around €15–25 a head. For real, unvarnished Barceloneta flavour, this humble tavern beats any polished tourist tapas bar.",
  },
  {
    name: "Cal Pep", slug: "cal-pep", image: FOOD_IMG, rating: 4.4, reviewCount: 7000,
    type: "Tapas / Seafood", price: "€€€", area: "El Born", tip: "Skip the menu — sit at the bar and let Pep's team send out whatever's freshest.",
    filterKeys: ["tapas", "seafood"],
    description: "A legendary El Born counter bar where you sit down and let the kitchen send out the day's best seafood tapas.",
    practicalInfo: { openingHours: "Tue–Sat lunch & dinner; Mon dinner (closed Sun)", price: "~€45–60 per person", howToGetThere: "Metro L4 to Barceloneta or Jaume I, on Plaça de les Olles in El Born" },
    fullDescription: "Cal Pep has been an El Born institution since 1977, a small standing-and-stool bar where the smart move is to forget the menu entirely. Take a place at the counter and let Pep's team feed you a rolling sequence of whatever's freshest — sizzling prawns, tiny fried fish, clams, a perfect tortilla, the house 'trifàsic' of squid, egg and seafood — cooked on the grill right in front of you and served with brisk, friendly showmanship. The quality of the seafood is superb and the atmosphere buzzy and convivial, part of the pleasure being the interaction with the cooks and the diners squeezed alongside you. It doesn't take many reservations, so arrive right at opening (around 1:30 for lunch or 7:30 for dinner) and be prepared to queue for a spot at the bar. It's pricier than a basic tapas bar — expect roughly €45–60 a head — but the produce and the experience justify it. For a lively, high-quality, hands-in-the-air seafood tapas session in the heart of El Born, it's a Barcelona classic.",
  },
  {
    name: "Els Pescadors", slug: "els-pescadors", image: FOOD_IMG, rating: 4.4, reviewCount: 4000,
    type: "Seafood", price: "€€€", area: "Poblenou", tip: "Book a terrace table on the old square and order the rice or the whole grilled fish.",
    filterKeys: ["seafood", "fine-dining"],
    description: "A refined seafood restaurant on a leafy old Poblenou square, known for rice dishes and pristine grilled fish.",
    practicalInfo: { openingHours: "Daily lunch & dinner", price: "~€50–75 per person", howToGetThere: "Metro L4 to Poblenou, walk to Plaça de Prim" },
    fullDescription: "Els Pescadors sits on the pretty, tree-shaded Plaça de Prim in Poblenou, one of the few corners of old fishermen's Barcelona to survive the city's eastward redevelopment, and its terrace under the ombú trees is one of the loveliest places to eat seafood in town. The kitchen is serious about produce: pristine grilled fish sold by weight, a range of accomplished rice and noodle dishes (the arròs and fideuà are highlights), and classic Catalan seafood preparations executed with finesse. It's more elegant and grown-up than a bustling tapas bar — an ideal choice for a relaxed, special lunch or a romantic dinner away from the tourist crush — with prices to match at around €50–75 a head. Being a little off the standard trail in residential Poblenou is part of its charm, giving it a local, in-the-know feel. Book ahead and request a terrace table in good weather, arrive with time to linger over several courses and a bottle of Catalan white, and finish with a stroll through the neighbourhood or down to the nearby beaches.",
  },
  {
    name: "Bodega 1900", slug: "bodega-1900", image: FOOD_IMG, rating: 4.5, reviewCount: 6000,
    type: "Vermouth & Tapas", price: "€€", area: "Sant Antoni", tip: "Adrià-family bodega — the perfect long lunch of vermouth, conservas and 'fake' olives.",
    filterKeys: ["tapas"],
    description: "An Adrià-family vermouth bar in Sant Antoni reinventing the classic bodega with playful, top-quality tapas.",
    practicalInfo: { openingHours: "Tue–Sat lunch & dinner (closed Sun–Mon)", price: "~€35–55 per person", howToGetThere: "Metro L2 to Sant Antoni, short walk" },
    fullDescription: "Bodega 1900 is the Adrià brothers' loving tribute to the traditional Catalan vermuteria, in the fashionable Sant Antoni district — a warm, tiled room that looks like a classic old bodega but cooks with elBulli-level care. The concept is the long, lazy Spanish aperitivo done impeccably: house vermouth on tap, superb conservas (tinned mussels, cockles, anchovies), charcuterie and pickles, alongside a few signature flourishes like the famous 'spherified' olives that pop with liquid flavour. Everything is small, shareable and built on outstanding ingredients, making it a joyful place to graze slowly over a couple of hours rather than a formal dinner. It's more affordable and relaxed than the family's fine-dining ventures — around €35–55 a head — yet delivers the same obsession with quality. Book ahead, as it's small and popular, go at lunchtime for the true vermouth-hour spirit, and let the staff steer you through the tinned seafood and daily specials. For a stylish, delicious and quintessentially Catalan grazing session, it's one of Sant Antoni's stars.",
  },
];

// ── Hotels (8) — generic hotel image (no photo rights from source) ───────────
export const HOTELS: BcnPlace[] = [
  {
    name: "Hotel Arts Barcelona", slug: "hotel-arts", image: HOTEL_IMG, rating: 4.6, reviewCount: 12000,
    type: "Luxury", price: "€€€€", area: "Port Olímpic", tip: "Beachfront luxury with a rooftop pool and city-plus-sea views from a landmark tower.",
    filterKeys: ["luxury", "beachfront"],
    description: "A landmark beachfront five-star in a Port Olímpic tower, with a rooftop pool and sweeping sea-and-city views.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "From ~€350/night", howToGetThere: "Metro L4 to Ciutadella | Vila Olímpica, walk to the marina" },
    fullDescription: "Hotel Arts is one of Barcelona's most recognisable luxury addresses, occupying a landmark glass-and-steel tower right on the beachfront at Port Olímpic. It's the classic top-end choice for travellers who want sea and sand on the doorstep without sacrificing city access: rooms and suites look out over the Mediterranean or the skyline, and the outdoor pool and terraces sit above the beach with knockout views. Facilities are full five-star — a spa, several restaurants (including high-end dining), attentive service and direct access to the marina's bars and the sand below. It's a polished, resort-like base a short taxi or metro ride from the old town and Sagrada Família, ideal for combining beach time with sightseeing in comfort. Rates are premium, typically from around €350 a night and well above in peak season, so it's a splurge or special-occasion pick. Book well ahead for summer and sea-view rooms. For beachfront glamour with the full luxury-hotel package and easy links to the rest of the city, it remains a benchmark.",
  },
  {
    name: "W Barcelona", slug: "w-barcelona", image: HOTEL_IMG, rating: 4.5, reviewCount: 11000,
    type: "Luxury", price: "€€€€", area: "Barceloneta", tip: "The sail-shaped beach icon — book a sea-view room and drinks at the 26th-floor Eclipse bar.",
    filterKeys: ["luxury", "beachfront"],
    description: "The iconic sail-shaped luxury hotel at the tip of Barceloneta beach, with a rooftop bar and direct sand access.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "From ~€300/night", howToGetThere: "Metro L4 to Barceloneta, walk to the end of the peninsula" },
    fullDescription: "The W Barcelona — universally known as the 'sail hotel' for its billowing, spinnaker-shaped silhouette — is the city's most photographed modern building and a design-led luxury landmark at the very tip of the Barceloneta peninsula. Its position is unbeatable for a beach-focused stay: it sits directly on the sand with the Mediterranean wrapping around it, and many rooms have panoramic sea views. Inside, expect the W brand's slick, party-leaning style — buzzy bars, a beach club, pools and the glamorous 26th-floor Eclipse cocktail bar with its sweeping city-and-sea panorama. It's more scene-y and energetic than a classic grand hotel, which suits travellers who want nightlife and design as much as comfort. The trade-off for the setting and the wow factor is a fifteen-to-twenty-minute walk or short cab to the old-town sights, and premium rates from around €300 a night, higher in summer. Book sea-view rooms early. For an iconic, beachfront, design-hotel experience with a lively social buzz, the W delivers exactly that.",
  },
  {
    name: "Cotton House Hotel", slug: "cotton-house", image: HOTEL_IMG, rating: 4.7, reviewCount: 5000,
    type: "Boutique Luxury", price: "€€€€", area: "Eixample", tip: "A refined Eixample townhouse hotel — central, elegant and quieter than the beach towers.",
    filterKeys: ["luxury", "boutique"],
    description: "An elegant boutique-luxury hotel in a restored neoclassical mansion in central Eixample, calm and refined.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "From ~€280/night", howToGetThere: "Metro L2/L3/L4 to Passeig de Gràcia, short walk" },
    fullDescription: "Cotton House Hotel occupies a restored nineteenth-century neoclassical mansion — the former headquarters of the cotton-makers' guild — on a smart Eixample avenue, and it's the pick for travellers who want central luxury with character rather than a big-brand tower. A member of Marriott's Autograph Collection, it blends the building's grand original features (a sweeping spiral staircase, a library, high ceilings) with polished contemporary comfort, giving it a refined, residential feel. There's a small rooftop plunge pool and terrace, an elegant restaurant and bar, and a genuinely central location within easy walking distance of Passeig de Gràcia's Gaudí sights, shopping and the old town. It's quieter and more intimate than the beachfront giants — better suited to a couple's city break or a design-minded stay than a poolside beach holiday. Rates are high, from roughly €280 a night, but the setting and service justify it for a special trip. For sophisticated, boutique luxury in the heart of the Modernista city, with everything walkable, it's one of Barcelona's most charming choices.",
  },
  {
    name: "Casa Bonay", slug: "casa-bonay", image: HOTEL_IMG, rating: 4.5, reviewCount: 4000,
    type: "Boutique", price: "€€€", area: "Eixample", tip: "Design-led and social — great café, rooftop bar and a hip local crowd.",
    filterKeys: ["boutique"],
    description: "A stylish, design-led boutique hotel in an 1869 Eixample building, with a buzzy café and rooftop bar.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "From ~€160/night", howToGetThere: "Metro L1 to Girona or L2/L3/L4 to Passeig de Gràcia" },
    fullDescription: "Casa Bonay is a firm favourite among design-conscious travellers, set in a restored 1869 Eixample building near the Girona metro. It nails the modern boutique formula: characterful rooms mixing original features (hydraulic-tiled floors, tall windows, wrought-iron balconies) with contemporary Catalan design, plus a ground-floor café-restaurant and coffee bar that draw a hip local crowd, and a lovely rooftop bar for evening drinks. The mood is social and creative rather than formal — this is a place to hang out in the communal spaces as much as retreat to your room — which makes it great for solo travellers, couples and anyone who wants a hotel that feels plugged into the city's scene. The location is excellent and central, walkable to Passeig de Gràcia, the old town and the Sagrada Família area, and rates are relatively reasonable for the style, from around €160 a night. For a stylish, well-priced base with strong food-and-drink credentials and a genuine sense of place, Casa Bonay is one of Barcelona's most likeable boutique options.",
  },
  {
    name: "The Hoxton, Poblenou", slug: "hoxton-poblenou", image: HOTEL_IMG, rating: 4.5, reviewCount: 6000,
    type: "Boutique", price: "€€€", area: "Poblenou", tip: "Cool rooftop pool and taquería in creative Poblenou — a short hop to the beach.",
    filterKeys: ["boutique"],
    description: "A hip boutique hotel in creative Poblenou, with a rooftop pool and taquería and easy beach access.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "From ~€170/night", howToGetThere: "Metro L4 to Poblenou or Llacuna" },
    fullDescription: "The Hoxton's Barcelona outpost sits in Poblenou, the city's creative, up-and-coming district, and brings the brand's signature blend of style, sociability and value. Rooms range from compact 'Snug' to roomier categories, all done in the warm, retro-modern Hoxton look, and the real draws are the shared spaces: a rooftop pool and bar with city views, a lively lobby that doubles as a co-working and hangout space, and a rooftop taquería serving Mexican food and cocktails. Poblenou puts you among design studios, craft breweries, good-value restaurants and the L4 metro, with Bogatell and the other quieter beaches just a short walk or ride away — a genuinely local base a step removed from the tourist centre, yet well connected to it. Rates are mid-to-upper but fair for the style and facilities, from around €170 a night. It suits travellers who want a design-driven, social hotel with a pool and beach access, and who like the idea of staying in a real neighbourhood rather than the old-town crush. A cool, well-rounded choice.",
  },
  {
    name: "Praktik Rambla", slug: "praktik-rambla", image: HOTEL_IMG, rating: 4.4, reviewCount: 5000,
    type: "Boutique / Value", price: "€€", area: "Eixample", tip: "Modernista charm at mid-range prices — a lovely tiled lounge and a central location.",
    filterKeys: ["boutique", "budget"],
    description: "A charming, well-priced boutique hotel in a Modernista building on Rambla de Catalunya in central Eixample.",
    practicalInfo: { openingHours: "Check-in from 14:00", price: "From ~€110/night", howToGetThere: "Metro L2/L3/L4 to Passeig de Gràcia" },
    fullDescription: "Praktik Rambla proves you don't need a big budget for character and a great location in Barcelona. Housed in a twentieth-century Modernista building on the elegant Rambla de Catalunya, it pairs original period features — a beautiful tiled lobby, high ceilings, mosaic floors and a lovely little interior terrace — with clean, contemporary, sensibly sized rooms. The result is a boutique feel at a distinctly mid-range price, typically from around €110 a night, which is excellent value for this central Eixample setting. You're a short walk from Passeig de Gràcia's Gaudí houses, the shopping streets, Plaça de Catalunya and the old town, with metro links on the doorstep. Facilities are pared-back (there's no pool or restaurant beyond breakfast and a café-lounge), reflecting the smart, no-frills-but-stylish philosophy of the Praktik group. It suits travellers who prioritise location, character and price over resort extras — ideal for a city-focused break where you'll be out sightseeing most of the day. For affordable boutique charm right in the heart of the Modernista district, it's one of the best mid-range picks in the city.",
  },
  {
    name: "Generator Barcelona", slug: "generator", image: HOTEL_IMG, rating: 4.2, reviewCount: 9000,
    type: "Hostel / Budget", price: "€", area: "Gràcia", tip: "Stylish dorms and cheap privates near Gràcia — great for solo and budget travellers.",
    filterKeys: ["budget"],
    description: "A design-led budget hostel near Gràcia with dorms and private rooms, a bar and a sociable atmosphere.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "Dorms from ~€25; privates from ~€70", howToGetThere: "Metro L3/L4/L5 to Diagonal, short walk toward Gràcia" },
    fullDescription: "Generator Barcelona is the standout choice for budget and solo travellers who still want style and a social buzz. Part of the design-focused Generator hostel group, it offers a mix of clean, modern dorms (from around €25 a bed) and affordable private rooms (from about €70), wrapped in a slick, contemporary look that feels far more boutique than backpacker. The ground floor centres on a lively bar and lounge that make it easy to meet people, and there's a rooftop terrace for evening drinks. The location, near the Diagonal metro on the edge of the characterful Gràcia district, is a genuine plus — you're among neighbourhood squares, cheap eats and local life, with quick transport links to the Gaudí sights and the centre. It hits the sweet spot for cost-conscious visitors: cheaper than a hotel, more comfortable and design-led than a traditional hostel, and sociable without being a party dive. For younger travellers, solo trips or anyone keeping accommodation costs down while still enjoying a stylish, well-located base, Generator is a reliable, good-value pick.",
  },
  {
    name: "Yurbban Trafalgar", slug: "yurbban-trafalgar", image: HOTEL_IMG, rating: 4.6, reviewCount: 7000,
    type: "Boutique", price: "€€€", area: "Sant Pere", tip: "Small rooftop pool and a superb old-town location on the edge of El Born.",
    filterKeys: ["boutique"],
    description: "A friendly boutique hotel on the edge of the old town, with a small rooftop pool and terrace bar.",
    practicalInfo: { openingHours: "Check-in from 15:00", price: "From ~€150/night", howToGetThere: "Metro L1/L4 to Urquinaona, short walk toward Sant Pere / El Born" },
    fullDescription: "Yurbban Trafalgar is a highly rated boutique hotel just north of the old town in the Sant Pere district, on the doorstep of El Born and the Gothic Quarter. It punches above its size with a warm, personal style of service and a standout feature for a city hotel of its class: a small rooftop pool and terrace bar with views over the surrounding rooftops, perfect for cooling off after a day's sightseeing or for an evening drink. Rooms are comfortable, contemporary and quiet, and the location is superb — you can walk to the Palau de la Música, the Picasso Museum, the cathedral and the waterfront in minutes, with the Urquinaona metro close by. It strikes a good balance between boutique character, genuine amenities (that pool, a café-restaurant) and reasonable rates from around €150 a night, making it a smart mid-to-upper choice for couples and culture-focused travellers who want to be right in the historic heart. Friendly, well-run and brilliantly located, it's consistently one of the best-reviewed boutique stays in the old city.",
  },
];
