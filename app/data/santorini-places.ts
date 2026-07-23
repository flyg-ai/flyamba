// Editorial Santorini place data for the category subpages. Ratings and review
// counts are research-based editorial estimates (rounded, plausible against
// public Google Maps figures), NOT live data — they give the cards a credible
// "★ rating (N reviews)" row without a Places API dependency. Prices are shown
// in euros (Santorini is in the eurozone) as rough tiers, not quoted fares.

import type { BcnPlace } from "@/app/data/barcelona-places";

// ── Image path helpers (Swedish-named folders on disk) ──────────────────────
const SEV = (f: string) => `/images/santorini/sevardheter/${f}`;
const REST = (f: string) => `/images/santorini/restauranger/${f}`;
const HOT = (f: string) => `/images/santorini/hotell/${f}`;
const NAT = (f: string) => `/images/santorini/nattliv/${f}`;
const SHOP = (f: string) => `/images/santorini/shopping/${f}`;
const KID = (f: string) => `/images/santorini/med-barn/${f}`;
const DAY = (f: string) => `/images/santorini/dagsutflykter/${f}`;
const BCH = (f: string) => `/images/santorini/strander/${f}`;

const tiqets = (q: string) =>
  `https://tp.media/r?campaign_id=89&marker=711264&p=2074&trs=508580&u=${encodeURIComponent(
    `https://www.tiqets.com/en/search?q=${encodeURIComponent(q)}`,
  )}`;

// ── Attractions (18) ─────────────────────────────────────────────────────────
export const ATTRACTIONS: BcnPlace[] = [
  {
    name: "Oia & the Sunset", slug: "oia-sunset", image: SEV("oia-solnedgang.webp"),
    rating: 4.8, reviewCount: 96000, price: "Free", area: "Oia", category: "Village / Viewpoint",
    tip: "Claim a wall spot near the Byzantine Castle ruins 90 minutes before sundown, or watch from Amoudi Bay below to dodge the crush.",
    tiqetsUrl: tiqets("Santorini Oia sunset tour"), filterKeys: ["must-see", "free", "views", "romantic"],
    description: "The whitewashed cliff-top village at Santorini's northern tip, home to the most famous sunset in the world over the caldera.",
    practicalInfo: { openingHours: "Village open all day; sunset roughly 18:00 winter to 20:45 midsummer", price: "Free to walk; castle viewpoint free", howToGetThere: "KTEL bus from Fira (about 25 min) or ATV/car; the main street is pedestrian only" },
    fullDescription: "Oia (pronounced 'Ee-ah') is the postcard Santorini everyone pictures: sugar-cube houses, blue-domed churches and boutique cave hotels cascading down the caldera rim at the island's northern tip. Its marble-paved main lane is a slow parade of galleries, jewellers and cafes, but the reason crowds gather is the sunset — arguably the most photographed on earth. As the sun drops behind the volcanic islets, the whole village turns gold and pink, and the ruins of the Byzantine Castle become standing room only. Arrive early to secure a wall or rooftop-bar table, or escape the throng by descending the 300-odd steps to Amoudi Bay for a sea-level view. Beyond the sunset, Oia rewards a morning wander when the light is soft and the lanes are quiet, before the day-trippers arrive from the cruise port. It is the single most essential experience on the island, and worth building an evening around."
  },
  {
    name: "Fira (Thira) Town", slug: "fira-town", image: SEV("fira.webp"),
    rating: 4.6, reviewCount: 42000, price: "Free", area: "Fira", category: "Capital / Viewpoint",
    tip: "Walk the caldera path north toward Firostefani at dusk — the cliff-edge tavernas light up and the crowds thin out.",
    filterKeys: ["must-see", "free", "views"],
    description: "Santorini's bustling capital, strung along the caldera cliff with cafes, shops and the island's best transport links.",
    practicalInfo: { openingHours: "Town always open; museums typically 08:00–20:00 in season", price: "Free to explore", howToGetThere: "Central KTEL bus hub links Fira to every village; walkable from the caldera hotels" },
    fullDescription: "Fira is the beating heart of Santorini — the island capital, its main transport hub, and the liveliest stretch of the caldera rim. Where Oia is serene, Fira is energetic: a warren of stepped lanes packed with cafes, cocktail bars, gold shops and gelato counters, all perched on the cliff edge with jaw-dropping views across the caldera to the volcano. The KTEL bus station in the centre is where nearly every island journey begins, making Fira the natural base for travellers without a car. Don't miss the walk along the caldera path to Firostefani and Imerovigli, a level, easy stroll that delivers the same million-dollar panorama without the crowds. The Museum of Prehistoric Thera sits in the centre, and the cable car or the winding donkey steps drop to the Old Port for boat trips. Come evening, Fira's rooftop bars fill for their own version of the sunset show."
  },
  {
    name: "Fira–Oia Caldera Cliff Walk", slug: "fira-oia-hike", image: SEV("fira-till-oia-vandring.webp"),
    rating: 4.7, reviewCount: 18000, price: "Free", area: "Caldera Rim", category: "Hiking / Views",
    tip: "Start from Fira in the early morning, carry water and a hat — there's almost no shade — and wear proper shoes for the loose volcanic gravel.",
    tiqetsUrl: tiqets("Santorini Fira to Oia hiking tour"), filterKeys: ["free", "views", "active", "must-see"],
    description: "The classic 10 km clifftop trail from Fira through Firostefani and Imerovigli to Oia, with nonstop caldera views.",
    practicalInfo: { openingHours: "Daylight hours; best at sunrise or late afternoon", price: "Free", howToGetThere: "Begin at Fira's caldera path; take the KTEL bus back from Oia" },
    fullDescription: "The walk from Fira to Oia is the best free thing to do on Santorini and one of the finest coastal hikes in Greece. Following the caldera rim for roughly 10 kilometres, it threads through Firostefani and Imerovigli — the highest points on the cliff — before the paved path gives way to a rugged volcanic trail that rises and dips past Skaros Rock, the little chapel of Profitis Ilias and open hillside, finally descending into Oia. Reckon on three to four hours at a gentle pace with photo stops. The reward is a constantly shifting panorama: whitewashed villages spilling down the cliffs, the deep blue caldera, and the smoking islets of Nea Kameni far below. There is virtually no shade and the afternoon sun is fierce, so set off at sunrise or after 16:00, bring plenty of water, and time the finish to catch the Oia sunset. Wear grippy shoes for the loose gravel on the final third."
  },
  {
    name: "Akrotiri Archaeological Site", slug: "akrotiri-site", image: SEV("akrotiri.webp"),
    rating: 4.6, reviewCount: 21000, price: "€12", area: "Akrotiri", category: "Archaeology",
    tip: "Go mid-afternoon when tour groups thin out; the bioclimatic roof keeps it cool, so it's the perfect midday heat-escape.",
    tiqetsUrl: tiqets("Akrotiri Santorini archaeological site ticket"), filterKeys: ["history", "must-see", "indoor"],
    description: "The 'Minoan Pompeii' — a Bronze Age town buried and preserved by the volcanic eruption around 1600 BC.",
    practicalInfo: { openingHours: "Wed–Mon 08:00–20:00 in season (reduced in winter)", price: "About €12; combined ticket with other sites available", howToGetThere: "KTEL bus from Fira toward Akrotiri/Red Beach; ATV or car park on site" },
    fullDescription: "Akrotiri is one of the most important prehistoric sites in the Aegean — a sophisticated Bronze Age town frozen in time by the same volcanic eruption that shaped Santorini's caldera around 1600 BC. Often called the 'Minoan Pompeii', it was buried under metres of ash that preserved multi-storey buildings, paved streets, drainage systems and vivid wall frescoes for over three millennia. A modern bioclimatic canopy shelters the excavation, and elevated walkways let you look down into houses where storage jars still stand in place. Unlike Pompeii, no human remains have been found, suggesting the inhabitants fled in time. The finest frescoes are displayed in the Museum of Prehistoric Thera in Fira, so the two pair naturally. Allow around an hour; a guide or audio guide brings the ruins to life, as the site itself is understated. Being fully roofed and shaded, it's also the ideal thing to do during the fierce midday heat when the beaches broil."
  },
  {
    name: "Ancient Thera", slug: "ancient-thera", image: SEV("ancient-thera.webp"),
    rating: 4.5, reviewCount: 6800, price: "€6", area: "Mesa Vouno", category: "Archaeology",
    tip: "Drive or hike up early; the ridge-top ruins have no shade and the views over Kamari and Perissa are best in morning light.",
    tiqetsUrl: tiqets("Ancient Thera Santorini"), filterKeys: ["history", "views", "active"],
    description: "Ruins of a Greco-Roman city dramatically sited on the Mesa Vouno ridge between Kamari and Perissa beaches.",
    practicalInfo: { openingHours: "Typically Wed–Mon 08:00–15:00 (seasonal)", price: "About €6", howToGetThere: "Steep road/switchback trail up from Kamari or Perissa; taxi or ATV recommended" },
    fullDescription: "Perched on the narrow Mesa Vouno ridge some 360 metres above the sea, Ancient Thera is the island's other great archaeological site — a city founded by Dorian settlers in the 9th century BC and lived in through Hellenistic, Roman and Byzantine times. Where Akrotiri is prehistoric and roofed, Ancient Thera is classical and open to the sky, its terraces, agora, theatre, temples and houses spread along a spectacular rocky spine with Kamari on one side and Perissa on the other far below. The setting is half the appeal: sweeping views across the Aegean in every direction. Getting there is an adventure — a steep, winding road climbs from Kamari, or you can hike up on foot in around 45 minutes. There's no shade and the stone radiates heat, so bring water and go early or late. History buffs and view-hunters will find it well worth the effort; those short on time may prefer to admire the ridge from below."
  },
  {
    name: "Amoudi Bay", slug: "amoudi-bay", image: SEV("amoudi-bay.webp"),
    rating: 4.7, reviewCount: 24000, price: "Free", area: "Below Oia", category: "Harbour / Swimming",
    tip: "Descend the 300 steps before your dinner reservation, swim off the rocks past the taverna row, then jump from the little red church cliff.",
    filterKeys: ["free", "views", "food", "swimming"],
    description: "A tiny red-rock fishing harbour at the foot of Oia's cliffs, famous for seafood tavernas and cliff-jumping.",
    practicalInfo: { openingHours: "Always open; tavernas roughly 12:00–22:00 in season", price: "Free (charge only if you dine or take a boat)", howToGetThere: "300 steps down from Oia, or drive down the switchback road and park below" },
    fullDescription: "Directly below Oia, reached by around 300 steps or a hairpin road, Amoudi Bay is the village's postcard-perfect fishing harbour — a cluster of ochre and red rock, bobbing boats and a row of waterside tavernas serving the day's catch. It is one of the best places on Santorini to eat fresh grilled octopus and whole fish with your feet almost in the water, and sunset tables here book out days ahead. Beyond the last taverna, a short scramble over the rocks leads to a natural swimming spot and a tiny red-domed chapel on an islet, where visitors leap from the low cliffs into deep, clear water. Amoudi is also a departure point for small boats to the volcano and to Thirassia island. It's free to visit, and even if you don't eat, the walk down for a swim and the walk back up for the sunset is a quintessential Oia experience. Wear proper shoes — the steps are steep and often shared with donkeys."
  },
  {
    name: "Santo Wines Winery", slug: "santo-wines", image: SEV("santo-wines.webp"),
    rating: 4.5, reviewCount: 33000, price: "€25", area: "Pyrgos", category: "Winery / Views",
    tip: "Book the sunset flight of 12 wines a day ahead; the caldera-facing terrace is the best-value sunset seat on the island.",
    tiqetsUrl: tiqets("Santo Wines Santorini tasting"), filterKeys: ["food", "views", "romantic", "wine"],
    description: "The island's most famous cooperative winery, with caldera-edge tasting terraces and the volcanic Assyrtiko grape.",
    practicalInfo: { openingHours: "Daily roughly 10:00–22:00 in season", price: "Tasting flights from about €25; single glasses available", howToGetThere: "Near Pyrgos on the caldera side; bus toward Akrotiri, or ATV/taxi (about 10 min from Fira)" },
    fullDescription: "Santo Wines is Santorini's largest cooperative and its most popular winery visit, thanks to a tasting terrace that hangs right over the caldera with an uninterrupted view to the volcano and Oia. The island's volcanic soil and the basket-woven 'kouloura' vines produce distinctive wines, above all the crisp, mineral Assyrtiko white and the sweet sun-dried Vinsanto. Tasting flights range from a few pours to a dozen wines paired with local cheeses, olives, tomato paste and capers, and staff explain the unusual viticulture that lets vines survive with almost no rain. It's touristy and busy, especially at sunset when it becomes one of the hottest tables on the island, so reserve ahead. For a quieter, more artisanal experience, smaller family wineries like Gavalas, Venetsanos or Domaine Sigalas offer more intimate tours. But for first-timers wanting the wine, the food and that jaw-dropping caldera panorama in one place, Santo Wines is hard to beat."
  },
  {
    name: "Pyrgos Village", slug: "pyrgos-village", image: SEV("pyrgos.webp"),
    rating: 4.6, reviewCount: 9200, price: "Free", area: "Pyrgos", category: "Traditional Village",
    tip: "Climb through the old Kasteli to the church at the very top for a 360° view taking in both coasts — free and near-empty at golden hour.",
    filterKeys: ["free", "views", "history", "quiet"],
    description: "A hilltop medieval village of winding lanes and a Venetian castle, offering island-wide views away from the crowds.",
    practicalInfo: { openingHours: "Always open; small churches variable", price: "Free", howToGetThere: "Bus from Fira toward Perissa/Akrotiri; ATV or taxi (about 10 min from Fira)" },
    fullDescription: "Before Fira grew into the capital, Pyrgos was Santorini's most important settlement, and it remains the island's best-preserved traditional village. Crowning one of the highest hills in the interior, it's a tangle of narrow whitewashed lanes, arches and stairways spiralling up around a Venetian-era Kasteli (castle). Because it sits away from the caldera, Pyrgos escapes the worst of the crowds, and wandering its quiet alleys past blue-shuttered houses and tiny Byzantine churches feels like the Santorini of decades past. From the church at the summit you get a rare 360-degree panorama that takes in both the caldera and the Aegean coast, plus the monastery-topped peak of Profitis Ilias, the island's highest point, nearby. Pyrgos also has a growing reputation for food, with a handful of excellent tavernas and the celebrated Selene restaurant. Come for a late-afternoon stroll and an early dinner, and you'll experience a gentler, more authentic side of the island."
  },
  {
    name: "Imerovigli & Skaros Rock", slug: "imerovigli-skaros", image: SEV("skaros-rock.webp"),
    rating: 4.6, reviewCount: 11000, price: "Free", area: "Imerovigli", category: "Village / Hiking",
    tip: "Follow the path around Skaros to the hidden chapel of Theoskepasti on the far side — most people turn back before they find it.",
    filterKeys: ["free", "views", "romantic", "active"],
    description: "The highest village on the caldera rim, with a short scramble out to the dramatic ruined promontory of Skaros Rock.",
    practicalInfo: { openingHours: "Always open", price: "Free", howToGetThere: "On the Fira–Oia caldera path; bus or ATV from Fira (about 10 min)" },
    fullDescription: "Imerovigli sits at the highest point of the caldera rim, earning it the nickname 'the balcony of the Aegean'. Quieter and more romantic than neighbouring Fira, it's a village of luxury cave suites, infinity pools and honeymoon hotels strung along the cliff, with what many consider the finest sunset view on the island. Its signature sight is Skaros Rock, a huge volcanic promontory jutting from the cliff that once held a medieval fortress and the island's main town, protecting islanders from pirate raids. A well-trodden path descends from Imerovigli and loops out onto the rock; the full walk to the little whitewashed chapel of Theoskepasti on its seaward side takes about 40 minutes return and delivers heart-stopping views back at the villages. It's an easy detour off the Fira–Oia hike or a rewarding short outing on its own. Bring water and decent shoes, and time it for late afternoon when the light gilds the cliffs."
  },
  {
    name: "Museum of Prehistoric Thera", slug: "prehistoric-thera-museum", image: SEV("prehistoric-museum.webp"),
    rating: 4.5, reviewCount: 4200, price: "€6", area: "Fira", category: "Museum",
    tip: "Visit right after Akrotiri so the frescoes make sense in context; the gold ibex figurine is the star exhibit — don't rush past it.",
    tiqetsUrl: tiqets("Museum of Prehistoric Thera Santorini"), filterKeys: ["history", "indoor", "art"],
    description: "Fira's compact museum holding the frescoes and finds excavated from the buried Bronze Age town of Akrotiri.",
    practicalInfo: { openingHours: "Wed–Mon 08:30–15:30 (seasonal)", price: "About €6", howToGetThere: "Central Fira, near the bus station — walkable" },
    fullDescription: "This small but superb museum in the centre of Fira is the essential companion to the Akrotiri excavation, gathering the finest objects lifted from the buried Bronze Age town. Because the site itself is deliberately understated, it's here that Akrotiri truly comes alive: delicate wall frescoes of blue monkeys, swallows and elegant figures; sophisticated painted pottery; and stone and metal tools that reveal a wealthy, cultured society trading across the Aegean some 3,600 years ago. The undisputed highlight is a tiny gold ibex figurine, astonishingly preserved, discovered inside a clay box. Well-labelled displays trace the island's geology and the catastrophic eruption that ended this civilisation and gave Santorini its caldera. It's a manageable size — an hour is plenty — and being fully indoors and air-conditioned, it makes a welcome break from the midday sun. History lovers should pair it with Akrotiri and Ancient Thera for the full arc of the island's past, from prehistory to the classical era."
  },
  {
    name: "Blue-Domed Churches of Oia", slug: "blue-domed-churches", image: SEV("oia.webp"),
    rating: 4.7, reviewCount: 38000, price: "Free", area: "Oia", category: "Landmark / Photo Spot",
    tip: "The famous 'three blue domes' shot is off a small side lane near the Anemomilos windmill — go at sunrise for the shot without a hundred phones in it.",
    filterKeys: ["free", "must-see", "views", "romantic"],
    description: "The iconic cobalt cupolas of Oia's Orthodox churches against whitewashed walls and the sea — Santorini's defining image.",
    practicalInfo: { openingHours: "Exteriors always viewable; interiors during services", price: "Free", howToGetThere: "In Oia village; the classic viewpoint is signposted near the northwestern lanes" },
    fullDescription: "No image says 'Santorini' more instantly than a cluster of blue-domed churches set against whitewashed walls and the deep blue Aegean. The cobalt cupolas — their colour a striking echo of sea and sky — top the island's small Greek Orthodox churches, and Oia has the most photogenic concentration of them. The single most photographed spot is a viewpoint in Oia's northwestern lanes where three blue domes line up perfectly above the caldera, a scene reproduced on a million postcards and phone screens. It gets genuinely crowded through the day, with queues forming for that one frame, so serious photographers come at sunrise when the light is soft and the lanes are empty. Beyond the famous trio, dozens of churches and bell towers are scattered through Oia, Fira and Firostefani, each a worthwhile photo in its own right. Wandering to find your own is one of the simple pleasures of the island, and it costs nothing but time and a little patience."
  },
  {
    name: "Catamaran Caldera Cruise", slug: "catamaran-cruise", image: SEV("caldera.webp"),
    rating: 4.8, reviewCount: 27000, price: "€130", area: "Caldera", category: "Boat Tour",
    tip: "Choose the semi-private sunset departure with a hot meal cooked on board; it swims at the hot springs, Red and White beaches with far fewer people.",
    tiqetsUrl: tiqets("Santorini catamaran caldera cruise"), filterKeys: ["must-see", "romantic", "boat", "swimming"],
    description: "A half-day sailing tour around the caldera with swim stops at the hot springs and coloured beaches, often ending at sunset.",
    practicalInfo: { openingHours: "Morning and sunset departures in season (roughly 5 hours)", price: "From about €130 including food and drinks", howToGetThere: "Boats leave from Vlychada or Ammoudi marinas; hotel pickup often included" },
    fullDescription: "A catamaran cruise is the best way to see Santorini from the water, and for many visitors it's the highlight of the trip. Sailing out around the caldera, these half-day tours string together the sights you can't reach by land: the ochre cliffs of the Red Beach, the pale volcanic White Beach, and the warm, rust-coloured sulphur springs off Nea Kameni where you swim in bath-temperature water. Between stops there's time to snorkel, sunbathe on the netting over the bow, and enjoy a full barbecue meal cooked on board with free-flowing local wine. The classic version is the sunset cruise, which times the return to catch the sun sinking behind Oia from sea level — a rival to the view from the village itself, and often with fewer people around you. Semi-private departures cap the group size for a calmer experience. Bring a swimsuit, a towel and sunscreen; almost everything else, including the food and drinks, is provided."
  },
  {
    name: "Nea Kameni Volcano & Hot Springs", slug: "nea-kameni-volcano", image: SEV("nea-kameni.webp"),
    rating: 4.4, reviewCount: 19000, price: "€25", area: "Caldera Islet", category: "Volcano / Boat Tour",
    tip: "Wear old dark swimwear for the hot springs — the iron-rich water stains fabric — and sturdy shoes for the sharp lava trail up the crater.",
    tiqetsUrl: tiqets("Santorini volcano hot springs boat tour"), filterKeys: ["active", "boat", "swimming", "family"],
    description: "A boat trip to the still-active volcanic islet at the heart of the caldera, with a crater hike and a hot-springs swim.",
    practicalInfo: { openingHours: "Daily boat departures in season (half-day trips)", price: "From about €25 for the boat; site entry small extra", howToGetThere: "Boats from Fira Old Port (cable car down) or Ammoudi; often combined with Thirassia" },
    fullDescription: "At the very centre of the caldera lie the dark volcanic islets of Nea Kameni and Palea Kameni, born from eruptions over the last two thousand years and still geologically active. A classic Santorini excursion sails you out to Nea Kameni, where a marked trail climbs across a moonscape of black lava rock to steaming fumaroles and the rim of the main crater — a 30–40 minute walk that rewards you with sulphur vents you can smell and superb views back to the caldera walls. The boat then anchors off Palea Kameni, where you jump into the sea and swim into a cove of warm, rust-orange sulphur springs, said to be good for the skin (but staining to swimwear). Most trips bundle the volcano with a stop at Thirassia island and time the return for the Oia sunset. It's a fun, active, family-friendly half day and a chance to understand the volcanic force that created the island. Wear closed shoes for the sharp, hot lava path and bring water."
  },
  {
    name: "Megalochori Village", slug: "megalochori-village", image: SEV("megalochori.webp"),
    rating: 4.6, reviewCount: 5100, price: "Free", area: "Megalochori", category: "Traditional Village",
    tip: "Come at golden hour when the bougainvillea glows; several old canava wineries here open their vaulted cellars for tastings.",
    filterKeys: ["free", "quiet", "history", "wine"],
    description: "A sleepy, unspoilt village of neoclassical mansions, bell towers and wine cellars in the island's interior.",
    practicalInfo: { openingHours: "Always open", price: "Free", howToGetThere: "Between Fira and Akrotiri; bus toward Akrotiri or ATV/taxi (about 10 min from Fira)" },
    fullDescription: "Megalochori is one of Santorini's most charming and least spoilt villages, a quiet counterpoint to the caldera crowds. Set inland among the vineyards, it grew wealthy in the 18th and 19th centuries on the Vinsanto wine trade, and that heritage shows in its grand neoclassical captains' mansions, ornate bell towers and the network of old 'canava' wine cellars carved into the rock. The village square, shaded by trees and ringed by a couple of low-key tavernas and cafes, is a lovely spot to pause, and the whitewashed lanes draped in bougainvillea are made for aimless wandering and photography. Because it sees a fraction of Oia's visitors, Megalochori retains a genuine lived-in feel, with locals chatting outside blue-doored houses. Several historic wineries, including Gavalas and Boutari nearby, offer tastings in atmospheric vaulted cellars. It makes an easy, rewarding stop on the way to or from Akrotiri and the southern beaches, especially in the softer light of late afternoon."
  },
  {
    name: "Red Beach (Kokkini Ammos)", slug: "red-beach-attraction", image: SEV("red-beach.webp"),
    rating: 4.4, reviewCount: 41000, price: "Free", area: "Akrotiri", category: "Beach / Geology",
    tip: "View it from the little clifftop path for the best photo; the beach itself is prone to rockfall, so read the warning signs before descending.",
    filterKeys: ["free", "must-see", "beach", "views"],
    description: "Santorini's most striking beach, framed by towering red-and-black volcanic cliffs near ancient Akrotiri.",
    practicalInfo: { openingHours: "Daylight hours", price: "Free", howToGetThere: "Short walk over the headland from the Akrotiri site car park; bus from Fira toward Akrotiri" },
    fullDescription: "The Red Beach is Santorini's most dramatic stretch of coast and one of its signature sights, whether or not you swim. Tucked beside the Akrotiri archaeological site, it's a small cove of dark red and black volcanic sand hemmed in by soaring rust-coloured cliffs that plunge straight into turquoise water — a colour palette found in few places on earth. The contrast of red rock, black sand and blue sea is simply spectacular, and it's a favourite for photographers who shoot it from the clifftop viewpoint on the approach path. The beach is reached by a short but rough scramble over the headland from the car park, and swimming is good in the clear, sheltered water. A word of caution: the cliffs are unstable and prone to rockfall, and authorities periodically post warnings, so check the signs and keep away from the base of the walls. Sunbeds and a small drinks boat are usually present in season. Combine it with Akrotiri and the White Beach next door."
  },
  {
    name: "Profitis Ilias Monastery", slug: "profitis-ilias", image: SEV("profitis-ilias.webp"),
    rating: 4.4, reviewCount: 3600, price: "Free", area: "Pyrgos", category: "Monastery / Viewpoint",
    tip: "Drive up for the highest view on the island; the small museum of ecclesiastical treasures is worth the short visit when it's open.",
    filterKeys: ["free", "views", "history", "quiet"],
    description: "An 18th-century monastery crowning the island's highest peak above Pyrgos, with panoramic views in every direction.",
    practicalInfo: { openingHours: "Grounds daytime; museum hours variable", price: "Free (donations welcome)", howToGetThere: "Winding road up from Pyrgos; ATV, car or taxi (radar domes at the summit)" },
    fullDescription: "Crowning the summit of Santorini's highest mountain at around 567 metres, the Monastery of Profitis Ilias has watched over the island since 1711. The whitewashed complex sits just below a cluster of modern radar and communications masts, and from its terraces you get the broadest view anywhere on Santorini — a true 360-degree sweep taking in the caldera, both coasts, the airport, and on a clear day the neighbouring Cycladic islands and even distant Crete. Historically the monastery was a centre of learning and craft, running schools and workshops, and a small museum preserves icons, vestments, manuscripts and old workshop tools from that era, though opening hours can be unpredictable. The drive up the switchback road from Pyrgos is short and scenic, and the cool mountain air is a relief in high summer. Dress respectfully as it remains a working monastery. It's an easy add-on to a visit to Pyrgos village directly below, and a fine spot to get your bearings on the whole island."
  },
  {
    name: "Emporio & Kasteli", slug: "emporio-kasteli", image: SEV("emporio.webp"),
    rating: 4.5, reviewCount: 4800, price: "Free", area: "Emporio", category: "Traditional Village",
    tip: "Lose yourself in the labyrinth of the old Kasteli in the early evening — the covered passages were built to confuse pirates and still do the same to visitors.",
    filterKeys: ["free", "history", "quiet"],
    description: "The largest village in Santorini's interior, with a maze-like medieval castle quarter and windmills on the hill above.",
    practicalInfo: { openingHours: "Always open", price: "Free", howToGetThere: "Bus from Fira toward Perissa; ATV or taxi (about 15 min from Fira)" },
    fullDescription: "Emporio, in the fertile south of the island, is the largest of Santorini's inland villages and one of its most atmospheric — yet it's almost entirely overlooked by visitors chasing the caldera view. At its core is the Kasteli, a remarkably intact medieval fortified quarter where houses were packed wall-to-wall to form the outer defences, and where narrow covered alleys twist and double back, deliberately designed to disorientate raiding pirates. Wandering it today is like stepping into a stone maze, opening onto tiny courtyards, chapels and the occasional cat. Above the village rises a ridge dotted with old white windmills and the blue-domed church of Agios Nikolaos Marmaritis, a fine viewpoint over the southern plain and its vineyards. Emporio has a handful of genuine, locally priced tavernas around its square, making it a good place to eat away from the tourist mark-up. Combine it with Pyrgos and the southern beaches of Perissa and Perivolos for a rewarding half day exploring the real, everyday Santorini."
  },
];

// ── Restaurants (10) ─────────────────────────────────────────────────────────
export const RESTAURANTS: BcnPlace[] = [
  {
    name: "Selene", slug: "selene", image: REST("selene.webp"),
    rating: 4.7, reviewCount: 2100, price: "€€€€", type: "Modern Greek", area: "Pyrgos",
    tip: "Ask for a table on the vaulted terrace and let the tasting menu lead — the fava and the local cheeses are the signatures.",
    filterKeys: ["fine-dining", "greek", "views"],
    description: "Santorini's most celebrated fine-dining restaurant, championing island produce and traditional recipes reimagined.",
    practicalInfo: { openingHours: "Dinner in season; reservations essential", price: "Tasting menus in the upper tier; à la carte available", howToGetThere: "In Pyrgos village, inland; ATV/taxi from Fira (about 10 min)" },
    fullDescription: "For decades Selene has set the benchmark for serious dining on Santorini, and its move to the hilltop village of Pyrgos only sharpened its focus on the island's own larder. The kitchen builds refined, contemporary dishes around ingredients grown in Santorini's volcanic soil — the intensely sweet cherry tomatoes, split-pea fava, white aubergine, capers and local goat and sheep cheeses — alongside fish from the surrounding Aegean. Expect elegant plating and a strong list of island Assyrtiko and Vinsanto wines, served either in a stone-vaulted dining room or on a terrace looking out over the vineyards. It is a special-occasion restaurant with prices to match, and booking well ahead is essential in high season. Selene also runs cooking classes and a more casual meze-and-wine bistro alongside the main room for those wanting the flavour without the full tasting-menu commitment. For anyone who wants to understand what makes Santorini's cuisine distinctive, this remains the island's definitive table."
  },
  {
    name: "Metaxi Mas", slug: "metaxi-mas", image: REST("metaxi-mas.webp"),
    rating: 4.7, reviewCount: 8900, price: "€€€", type: "Greek / Cretan", area: "Exo Gonia",
    tip: "Book days ahead for a terrace table at sunset; if it's full, the meze bar inside is just as good and easier to get into.",
    filterKeys: ["greek", "views", "local-favourite"],
    description: "A beloved taverna hidden below a church in Exo Gonia, famous for generous Greek and Cretan meze.",
    practicalInfo: { openingHours: "Lunch and dinner in season; reservations strongly advised", price: "Mid-to-upper range; sharing meze", howToGetThere: "Below Agios Charalambos church, Exo Gonia; ATV/taxi from Fira" },
    fullDescription: "Tucked discreetly beneath the church of Agios Charalambos in the village of Exo Gonia, Metaxi Mas has grown from a local secret into one of Santorini's most loved tavernas — a place islanders and returning visitors rate above the flashier caldera restaurants. The cooking is generous, homestyle Greek with a strong Cretan streak: slow-cooked lamb, wild greens, grilled octopus, fried cheese, and a fava and tomato-based mezes that showcase Santorini's produce. Portions are big, the wine is honest and reasonably priced, and the vine-shaded terrace looks east over the countryside toward the sea rather than the caldera, which keeps prices sane and the atmosphere relaxed. Its reputation means tables are hard won, so reserve several days in advance for dinner, particularly for a sunset slot on the terrace. If you can only fit in a couple of dinners on the island and want the real, unpretentious taste of Santorini rather than a view-tax menu, Metaxi Mas should be near the top of the list."
  },
  {
    name: "Ambrosia", slug: "ambrosia", image: REST("ambrosia.webp"),
    rating: 4.6, reviewCount: 2600, price: "€€€€", type: "Mediterranean", area: "Oia",
    tip: "Request a front-row caldera table when booking; it's one of Oia's most romantic sunset dinners, so dress up a little.",
    filterKeys: ["fine-dining", "views", "romantic"],
    description: "An upscale Oia restaurant with front-row caldera views and refined Mediterranean cooking, popular for special occasions.",
    practicalInfo: { openingHours: "Dinner in season; reservations essential for caldera tables", price: "Upper tier", howToGetThere: "On Oia's main pedestrian street; walkable in the village" },
    fullDescription: "Ambrosia is one of Oia's premier caldera-view restaurants, the kind of place couples choose for an anniversary or a milestone dinner. Its narrow terraces are cut into the cliff along the village's main lane, and every table looks straight out over the caldera toward the sunset, so timing a reservation for the golden hour turns dinner into an event. The kitchen deals in polished Mediterranean cooking with Greek foundations — fresh Aegean fish and seafood, prime cuts, and island vegetables — plated with fine-dining care and paired with a deep cellar of Greek and international wines. Service is attentive and the setting genuinely special, though, as with all the front-row Oia tables, you pay a premium for the view as much as the food. Book well ahead and request a caldera-edge table specifically. For visitors wanting to combine that once-in-a-trip Oia sunset with a smart, romantic meal rather than jostling for a spot on a public wall, Ambrosia delivers exactly that experience."
  },
  {
    name: "1800 Floga", slug: "1800-restaurant", image: REST("1800-restaurant.webp"),
    rating: 4.6, reviewCount: 3400, price: "€€€€", type: "Fine Dining", area: "Oia",
    tip: "The rooftop is the draw at sunset, but the elegant dining rooms inside the restored captain's mansion are lovely too if it's windy.",
    filterKeys: ["fine-dining", "views", "romantic"],
    description: "Set in a restored 19th-century sea captain's mansion in Oia, an elegant fine-dining institution with a rooftop terrace.",
    practicalInfo: { openingHours: "Dinner in season; reservations essential", price: "Upper tier", howToGetThere: "On Oia's main street, in the Nikolas Nomikos mansion" },
    fullDescription: "Housed in a beautifully restored 1800s sea captain's mansion on Oia's main street, 1800 Floga is one of the village's most established fine-dining names, blending heritage surroundings with contemporary Greek and Mediterranean cooking. The historic rooms retain their neoclassical character — high ceilings, period furniture and old family portraits — while the rooftop terrace opens onto that peerless Oia sunset over the caldera. The menu leans refined and creative, working seasonal Greek produce and Aegean seafood into carefully composed plates, supported by a well-chosen list of island and mainland wines and polished, formal service. As with Oia's other top tables, it's a special-occasion restaurant where you're paying for setting and craft as much as for the food, so book ahead and secure a rooftop table for the sunset if that's your priority. On a windy evening — not uncommon on the exposed cliff — the elegant interior rooms are an equally atmospheric fallback, and arguably show off the historic building better."
  },
  {
    name: "To Psaraki", slug: "to-psaraki", image: REST("to-psaraki.webp"),
    rating: 4.6, reviewCount: 5200, price: "€€€", type: "Seafood", area: "Vlychada",
    tip: "Sit on the terrace above the marina and order whatever fish came in that morning; the raw and cured seafood starters are excellent.",
    filterKeys: ["seafood", "views", "local-favourite"],
    description: "A fish-focused taverna above Vlychada marina, prized for extremely fresh seafood and a relaxed harbour setting.",
    practicalInfo: { openingHours: "Lunch and dinner in season; booking advised", price: "Mid-to-upper range; fish by weight", howToGetThere: "Overlooking Vlychada marina in the south; ATV/taxi from Fira" },
    fullDescription: "Perched above the small marina at Vlychada on the island's south coast, To Psaraki — 'the little fish' — has built a devoted following for doing one thing exceptionally well: serving the freshest possible Aegean seafood in an unfussy, welcoming setting. The daily catch dictates the menu, from grilled whole fish sold by weight to octopus, prawns and a rotating cast of raw, cured and lightly cooked seafood starters that regulars rave about. Vegetables and salads lean on Santorini's own produce, and the wine list favours crisp local Assyrtiko that pairs naturally with the food. The terrace looks out over the bobbing fishing boats of the marina, an authentic, low-key harbour scene far removed from the caldera glamour, and prices — while not cheap for good fish anywhere — feel fair for the quality. It's popular with Greek visitors and in-the-know travellers, so reserve for dinner in peak season. Combine it with a morning on the dramatic grey cliffs of Vlychada beach next door for a fine south-coast day."
  },
  {
    name: "Metaxi Mas Meze Bar / Candouni", slug: "candouni", image: REST("candouni.webp"),
    rating: 4.6, reviewCount: 1900, price: "€€€", type: "Traditional Greek", area: "Oia",
    tip: "It's set back off the tourist drag in a lovely garden courtyard — a quieter, cooler alternative to Oia's cliff-edge crush.",
    filterKeys: ["greek", "romantic", "quiet"],
    description: "A romantic garden restaurant in Oia serving classic Greek home cooking away from the sunset scrum.",
    practicalInfo: { openingHours: "Dinner in season; booking advised", price: "Mid-to-upper range", howToGetThere: "In a courtyard off Oia's main street" },
    fullDescription: "Candouni offers a different side of dining in Oia — not a cliff-edge sunset spectacle, but an intimate, candlelit garden courtyard set back from the main street, where the focus is squarely on warm hospitality and honest Greek home cooking. Housed in a restored old building with a leafy walled terrace, it's a calm, romantic retreat from the crush that descends on Oia's caldera restaurants each evening. The kitchen turns out well-executed traditional dishes — slow-cooked meats, fresh fish, stuffed vegetables, island fava and mezes — using good local ingredients, and the setting under the bougainvillea makes for a genuinely lovely dinner without the premium the front-row view tables command. Service tends to be personal and unhurried. For couples who want the romance of an Oia evening but would rather trade the sunset panorama for a peaceful, cooler garden and more attention to the food itself, Candouni is an excellent choice. Book ahead in high season, as its modest size and good reputation mean tables fill quickly."
  },
  {
    name: "Aktaion", slug: "aktaion", image: REST("aktaion.webp"),
    rating: 4.5, reviewCount: 2300, price: "€€", type: "Traditional Taverna", area: "Firostefani",
    tip: "One of the island's oldest tavernas — go for honest, fairly priced classics and a caldera view without the Oia mark-up.",
    filterKeys: ["greek", "views", "budget", "local-favourite"],
    description: "A long-running family taverna in Firostefani serving traditional Santorinian dishes with a caldera outlook at fair prices.",
    practicalInfo: { openingHours: "Lunch and dinner in season", price: "Mid range; good value for the view", howToGetThere: "In Firostefani, a short walk from Fira along the caldera path" },
    fullDescription: "Aktaion is one of Santorini's oldest tavernas, run by the same family for generations in the quieter village of Firostefani, a ten-minute caldera-path stroll from Fira. It represents an increasingly rare thing on the island: a genuine, traditional Greek taverna with a caldera view that hasn't priced itself into the stratosphere. The menu is comfortingly classic — Santorinian fava and tomato fritters (tomatokeftedes), grilled meats and fish, moussaka, stuffed vegetables and fresh salads — cooked without fuss and served in generous portions. The terrace enjoys a fine outlook over the caldera, and while it may lack the polish and Instagram gloss of the Oia hotspots, that's rather the point: this is where you come for the flavours of the island at a price locals would recognise. It's a reliable lunch or dinner stop, popular with families and repeat visitors who value substance over spectacle. For an authentic, good-value taste of old Santorini within easy reach of Fira, Aktaion is a dependable pick."
  },
  {
    name: "Krinaki", slug: "krinaki", image: REST("krinaki.webp"),
    rating: 4.6, reviewCount: 2000, price: "€€€", type: "Farm-to-Table Greek", area: "Finikia",
    tip: "It sits in sleepy Finikia just east of Oia; come for a relaxed dinner of garden vegetables and grilled fish away from the crowds.",
    filterKeys: ["greek", "local-favourite", "quiet"],
    description: "A farm-to-table taverna in the quiet village of Finikia, cooking with its own garden produce and local ingredients.",
    practicalInfo: { openingHours: "Lunch and dinner in season; booking advised", price: "Mid-to-upper range", howToGetThere: "In Finikia, just east of Oia; short ATV/taxi hop or a pleasant walk" },
    fullDescription: "In the tranquil, largely residential village of Finikia, a short walk or drive east of tourist-thronged Oia, Krinaki is a warm family taverna built on a farm-to-table philosophy. Much of what appears on the plate comes from the owners' own garden and local producers — sun-ripened tomatoes, greens, capers, cheeses and herbs — turned into honest, seasonal Greek cooking rather than showpiece plating. Expect classic mezes, fresh fish, slow-cooked meats and generous salads, paired with island wine at prices that feel fair given the quality and setting. The terrace is relaxed and low-key, catching a pleasant breeze, and because Finikia sees only a trickle of the visitors who pack Oia a few minutes away, dinner here feels calm and unhurried. It's the kind of place that reminds you Santorini has a farming and food culture beneath the caldera glamour. For travellers staying in or near Oia who want a genuine, produce-driven Greek meal without the sunset-strip prices and crush, Krinaki is a rewarding find. Reserve ahead in peak weeks."
  },
  {
    name: "Lucky's Souvlaki", slug: "luckys-souvlaki", image: REST("luckys-souvlaki.webp"),
    rating: 4.6, reviewCount: 6700, price: "€", type: "Souvlaki / Street Food", area: "Fira",
    tip: "The cheapest good meal in Fira — grab a chicken gyros to go and eat it on the caldera steps for the price of a coffee elsewhere.",
    filterKeys: ["budget", "street-food", "greek", "quick"],
    description: "A cheap-and-cheerful souvlaki and gyros joint in central Fira, a lifesaver for budget travellers.",
    practicalInfo: { openingHours: "Lunch through late in season", price: "Budget; a few euros a wrap", howToGetThere: "Central Fira, near the main square — walkable" },
    fullDescription: "On an island where a caldera-view dinner can cost more than a night's accommodation elsewhere, Lucky's Souvlaki is a genuine budget hero in the heart of Fira. This no-frills counter turns out the Greek street-food staples done right: pork and chicken souvlaki skewers, gyros wraps loaded with meat, tomato, onion and tzatziki, and crisp fries, all for a few euros. It's fast, filling and reliably tasty, which is why you'll find a mix of backpackers, local workers and savvy travellers queuing at all hours. There's limited seating, so most people grab their wrap to go and eat it perched on the caldera steps or on a bench with a view that costs nothing. For anyone watching their spending — or simply craving an honest, unpretentious meal after one too many elaborate tasting menus — Lucky's is invaluable, and it proves you don't need a big budget to eat well on Santorini. Cash is handy, portions are generous, and it stays open late for post-bar hunger."
  },
  {
    name: "Pitogyros", slug: "pitogyros", image: REST("pitogyros.webp"),
    rating: 4.6, reviewCount: 4100, price: "€", type: "Gyros / Grill", area: "Oia",
    tip: "The best-value bite in pricey Oia — the pork gyros and homemade pita are consistently excellent for the money.",
    filterKeys: ["budget", "street-food", "greek", "quick"],
    description: "A popular grill house in Oia serving quality gyros and souvlaki at prices that undercut the village's cliff-edge tables.",
    practicalInfo: { openingHours: "Lunch through evening in season", price: "Budget", howToGetThere: "On Oia's main street; walkable in the village" },
    fullDescription: "Oia is not known for affordable eating, which is exactly why Pitogyros has such a loyal following. This straightforward grill house on the village's main street specialises in properly made gyros and souvlaki — well-seasoned pork and chicken carved fresh, wrapped in soft house-made pita with tomato, onion, tzatziki and a handful of fries — at a fraction of the cost of the surrounding sunset restaurants. The quality is a cut above typical fast food: the meat is flavourful, the pita is freshly griddled, and portions are satisfying. There's some simple seating, but many visitors take their food away to eat while wandering Oia's lanes or watching the sunset. For travellers who want to experience beautiful, expensive Oia without blowing the daily budget on every meal, Pitogyros is a reliable, tasty and genuinely good-value option, and a reminder that some of the most enjoyable food in Greece is also the simplest. It gets busy at peak times, so expect a short wait for that fresh-off-the-grill wrap."
  },
];

// ── Hotels (8) ───────────────────────────────────────────────────────────────
export const HOTELS: BcnPlace[] = [
  {
    name: "Canaves Oia", slug: "canaves-oia", image: HOT("canaves-oia.webp"),
    rating: 4.8, reviewCount: 1400, price: "€€€€", type: "Luxury cave suites", area: "Oia",
    tip: "Book a suite with a private plunge pool on the caldera edge; the sister property Canaves Epitome inland is a good-value alternative.",
    filterKeys: ["luxury", "caldera-view", "adults", "pool"],
    description: "A flagship five-star cave-hotel in Oia with carved suites, private plunge pools and impeccable caldera-edge service.",
    practicalInfo: { openingHours: "Open in season (roughly April–October)", price: "Top luxury tier", howToGetThere: "On Oia's caldera edge; hotel transfer from the airport/port arranged" },
    fullDescription: "Canaves Oia is one of the names that defined Santorini's luxury cave-hotel scene, and it remains a benchmark for high-end caldera-edge stays. Its suites are carved into the cliff in the traditional 'yposkafa' style — cool, vaulted, whitewashed spaces — but finished to a contemporary five-star standard, many with private plunge pools or terraces hanging over the caldera. There's a stylish infinity pool, a serious restaurant and wine cellar, a spa, and the kind of anticipatory service that arranges everything from private cruises to in-suite dining. The location on Oia's quieter northern edge means you're steps from the village yet slightly removed from its busiest lanes. It is expensive — firmly in the honeymoon and special-occasion bracket — and the group now runs several properties, including the larger, better-value Canaves Epitome inland and an adults-only Sunday retreat, giving a range of price points under the same trusted management. For travellers seeking the quintessential Oia luxury experience with polished service, Canaves is a safe and celebrated choice."
  },
  {
    name: "Mystique, a Luxury Collection Hotel", slug: "mystique", image: HOT("mystique.webp"),
    rating: 4.8, reviewCount: 1100, price: "€€€€", type: "Design luxury resort", area: "Oia",
    tip: "The Secret Wine Cave and Captain's Lounge are highlights; ask about the private caldera pool suites for the ultimate splurge.",
    filterKeys: ["luxury", "caldera-view", "adults", "pool"],
    description: "A dramatic Marriott Luxury Collection resort in Oia, carved into the cliff with a design-led, sophisticated feel.",
    practicalInfo: { openingHours: "Open in season", price: "Top luxury tier", howToGetThere: "On the Oia caldera cliff; private transfers arranged" },
    fullDescription: "Part of Marriott's Luxury Collection, Mystique is one of Oia's most architecturally striking resorts, its suites and villas tumbling down the caldera cliff in sculpted whitewashed forms that blur the line between building and rock. The mood is more design-hotel sophistication than traditional Cycladic simplicity: muted natural materials, moody lighting and a grown-up, romantic atmosphere that suits couples and honeymooners. Signature touches include the Secret Wine Cave carved into the volcanic stone for private tastings, the Captain's Lounge, an excellent restaurant and a spa, plus infinity pools and premium suites with private caldera-facing plunge pools. As with all the top Oia addresses, the sunset views are extraordinary and the service is polished and discreet. Prices sit firmly at the luxury end, and the resort trades on atmosphere and design as much as on the view. For travellers who want the caldera-edge Santorini experience wrapped in a stylish, contemporary package with the reassurance of a global luxury brand behind it, Mystique is among the island's most desirable stays."
  },
  {
    name: "Perivolas", slug: "perivolas", image: HOT("perivolas.webp"),
    rating: 4.8, reviewCount: 700, price: "€€€€", type: "Boutique cave houses", area: "Oia",
    tip: "The famous horizon-edge infinity pool is the shot everyone comes for; the whitewashed suites are serene and refreshingly minimalist.",
    filterKeys: ["luxury", "caldera-view", "adults", "pool"],
    description: "An iconic, understated boutique retreat in Oia built from 300-year-old cave dwellings around a horizon-edge pool.",
    practicalInfo: { openingHours: "Open in season", price: "Top luxury tier", howToGetThere: "On Oia's caldera edge; transfers arranged by the hotel" },
    fullDescription: "Perivolas is arguably the original Santorini luxury cave hotel, a quietly iconic retreat that has drawn design lovers and honeymooners to Oia for decades. Created from 300-year-old cave dwellings once used by farmers and sailors, its suites are studies in serene minimalism — whitewashed curves, hand-smoothed surfaces, natural textures and almost no clutter — letting the light, the space and the caldera view do the work. The hotel's signature is its horizon-edge infinity pool, whose water appears to spill straight into the caldera and which has been photographed endlessly. Beyond that, the appeal is restraint and privacy: a small number of suites, a cave spa and lounge, and understated, intuitive service rather than showy resort facilities. It attracts guests who prize calm and timeless design over glitz. Prices are firmly in the top tier, reflecting the exclusivity and the address. For travellers who find some of Oia's newer luxury hotels too polished or busy, Perivolas offers a purer, more meditative version of caldera-edge indulgence that has aged remarkably well."
  },
  {
    name: "Andronis Boutique Hotel", slug: "andronis-boutique", image: HOT("andronis-boutique.webp"),
    rating: 4.7, reviewCount: 1500, price: "€€€€", type: "Boutique cave suites", area: "Oia",
    tip: "The Lauda restaurant on site is one of Oia's best; book a caldera suite and time dinner for sunset.",
    filterKeys: ["luxury", "caldera-view", "adults", "pool"],
    description: "A polished Oia cave hotel from the Andronis group, with sculpted suites, an infinity pool and a top-tier restaurant.",
    practicalInfo: { openingHours: "Open in season", price: "Top luxury tier", howToGetThere: "On the Oia caldera cliff; transfers arranged" },
    fullDescription: "Andronis Boutique Hotel is the flagship of the well-regarded Andronis collection, and one of Oia's most photographed cliff-edge stays. Its suites are carved and stacked down the caldera wall in sinuous whitewashed forms, many with private terraces, jacuzzis or plunge pools angled at the sunset, and finished in a warm, contemporary style. The hotel packs a lot into a compact footprint: a beautiful infinity pool that hangs over the caldera, a spa, and Lauda, an acclaimed fine-dining restaurant that ranks among the best places to eat in Oia. Service is attentive and geared to couples and honeymooners, and the location puts you right in the heart of the village yet cocooned from its crowds. The broader Andronis group runs several properties across the island at different price points, so there are options if the flagship is booked or beyond budget. Prices here are firmly luxury, but the combination of dramatic architecture, a standout restaurant and prime caldera position makes it one of Oia's most complete high-end packages."
  },
  {
    name: "Grace Hotel Santorini (Auberge)", slug: "grace-hotel", image: HOT("grace-hotel.webp"),
    rating: 4.7, reviewCount: 900, price: "€€€€", type: "Design luxury resort", area: "Imerovigli",
    tip: "Perched in Imerovigli at the caldera's highest point, its infinity pool and champagne lounge draw a stylish crowd; quieter than Oia.",
    filterKeys: ["luxury", "caldera-view", "adults", "pool"],
    description: "A chic Auberge Resorts hotel in Imerovigli, known for its cascading infinity pool and contemporary elegance.",
    practicalInfo: { openingHours: "Open in season", price: "Top luxury tier", howToGetThere: "In Imerovigli on the caldera rim; transfers arranged" },
    fullDescription: "Set on the highest point of the caldera rim in Imerovigli — 'the balcony of the Aegean' — Grace Hotel Santorini, part of the Auberge Resorts Collection, offers a more contemporary, design-forward take on caldera luxury than the traditional cave hotels of Oia. Its clean-lined suites in white and soft neutrals step down the cliff, many with private pools or terraces, and the hotel's showpiece is a stunning cascading infinity pool that seems to pour toward the volcano. There's a champagne lounge, an accomplished restaurant, a spa and the kind of stylish, grown-up atmosphere that appeals to couples and design-minded travellers. The Imerovigli setting is a genuine advantage: you get arguably the finest sunset view on the island along with noticeably fewer crowds than Oia, while Fira's restaurants and nightlife are a short walk or drive away. Prices are firmly in the luxury bracket. For those who want top-tier Santorini indulgence with a modern aesthetic and a slightly quieter, more private base than the Oia hotspots, Grace is a superb choice."
  },
  {
    name: "Astra Suites", slug: "astra-suites", image: HOT("astra-suites.webp"),
    rating: 4.8, reviewCount: 800, price: "€€€€", type: "Cave suites", area: "Imerovigli",
    tip: "Renowned for warm, personal service; the village-like layout of suites around the pool feels intimate rather than resort-like.",
    filterKeys: ["luxury", "caldera-view", "pool", "family"],
    description: "A long-established Imerovigli cave-suite hotel celebrated for exceptional, personal service and caldera views.",
    practicalInfo: { openingHours: "Open in season", price: "Upper luxury tier", howToGetThere: "In Imerovigli on the caldera rim; transfers arranged" },
    fullDescription: "Astra Suites has spent decades quietly earning a reputation as one of Santorini's most warmly run hotels, consistently praised for service that turns first-time guests into loyal returnees. Set on the caldera rim in Imerovigli, its whitewashed cave suites are arranged like a miniature Cycladic village tumbling around a beautiful infinity pool, with the volcano and Oia laid out across the water beyond. The suites blend traditional carved-cave coolness with comfortable, understated modern furnishings, and many have private terraces or plunge pools facing the sunset. What sets Astra apart is less any single showpiece feature than the attentive, genuinely personal hospitality — staff who remember names, anticipate needs and help craft the trip. There's a good restaurant, a spa and the superb, less-crowded Imerovigli sunset outlook. While firmly a luxury property, it's often seen as slightly more relaxed and welcoming to couples and families than some of the adults-only Oia icons. For travellers who rate service and atmosphere as highly as design, Astra Suites is a perennial favourite."
  },
  {
    name: "Caveland Hostel", slug: "caveland-hostel", image: HOT("caveland-hostel.webp"),
    rating: 4.6, reviewCount: 1300, price: "€", type: "Hostel", area: "Karterados",
    tip: "The island's best budget base — a converted winery with a pool and dorms; free shuttle links it to Fira and the beaches.",
    filterKeys: ["budget", "hostel", "pool", "social"],
    description: "A characterful budget hostel in a converted 18th-century winery near Fira, with dorms, private rooms and a pool.",
    practicalInfo: { openingHours: "Open in season", price: "Budget; dorm beds and simple private rooms", howToGetThere: "In Karterados, a short shuttle or walk from Fira" },
    fullDescription: "Santorini has a reputation as a honeymoon splurge, but Caveland proves you can experience the island on a backpacker budget without sacrificing charm. Housed in a beautifully converted 18th-century winery in the village of Karterados, a short distance from Fira, it wraps dorms and simple private rooms around leafy courtyards and a genuinely inviting swimming pool — a rare luxury at this price. The atmosphere is sociable and laid-back, with communal kitchen and lounge areas, yoga sessions, barbecue nights and a mixed crowd of solo travellers, couples and groups swapping tips. A free shuttle connects guests to Fira and the beaches, solving the island's transport headache for those without a scooter. While you obviously won't get a caldera view or cave-suite polish, you get atmosphere, community and money left over to spend on boat trips, wine tastings and sunset drinks. For young and budget-conscious travellers who want to enjoy Santorini without the eye-watering room rates, Caveland is comfortably the island's standout hostel."
  },
  {
    name: "Iconic Santorini", slug: "iconic-santorini", image: HOT("iconic-santorini.webp"),
    rating: 4.8, reviewCount: 600, price: "€€€€", type: "Boutique cave hotel", area: "Imerovigli",
    tip: "A small, adults-oriented boutique carved into the Skaros cliff; the suites are dramatic and the setting wonderfully private.",
    filterKeys: ["luxury", "caldera-view", "adults", "pool"],
    description: "An intimate boutique cave hotel dramatically built into the Skaros Rock cliff at Imerovigli, big on privacy and views.",
    practicalInfo: { openingHours: "Open in season", price: "Top luxury tier", howToGetThere: "Below Imerovigli toward Skaros Rock; transfers and luggage porters arranged" },
    fullDescription: "Iconic Santorini lives up to its name, occupying one of the most dramatic positions on the island — carved directly into the cliff face beneath Imerovigli, looking straight out at Skaros Rock and the caldera. This is a small, boutique property rather than a sprawling resort, with a handful of individually designed cave suites that make the most of the volcanic stone, natural light and the vertiginous setting, many with private terraces and hot tubs angled at the sunset. The intimacy is the point: few rooms, deep privacy, and a serene, adults-oriented atmosphere ideal for honeymoons and romantic escapes. Facilities include a cliff-edge pool, a restaurant and personal, discreet service, with staff on hand to porter luggage down the steps and arrange excursions. Because it sits slightly below and apart from the village, it feels like a private eyrie. Prices are firmly at the luxury end. For couples who prize seclusion, striking architecture and a knockout view over resort-scale amenities, Iconic Santorini is one of the caldera's most memorable boutique stays."
  },
];

// ── Nightlife (9) ────────────────────────────────────────────────────────────
export const NIGHTLIFE: BcnPlace[] = [
  {
    name: "Franco's Bar", slug: "francos-bar", image: NAT("francos-bar.webp"),
    rating: 4.4, reviewCount: 3100, price: "€€€", type: "Sunset cocktail bar", area: "Fira",
    tip: "Reserve a caldera-edge table for sunset and order a classic cocktail; it's pricey but the view and classical soundtrack are legendary.",
    filterKeys: ["cocktails", "sunset", "views", "romantic"],
    description: "A Fira institution since 1976, famous for cocktails, classical music and a front-row caldera sunset.",
    practicalInfo: { openingHours: "Late afternoon until late in season", price: "Premium cocktails; reservation advised for sunset", howToGetThere: "On the caldera cliff in central Fira — walkable" },
    fullDescription: "Franco's Bar has been serving cocktails on Fira's caldera cliff since 1976, and it remains one of the most storied sunset spots on the island. The formula is simple and enduring: perfectly made classic cocktails, a soundtrack of classical music drifting over the terraces, attentive white-jacketed service, and a front-row seat as the sun melts into the caldera. The cascading terraces are cut into the cliff so that nearly every table has an unobstructed view, and at golden hour the place fills with couples toasting the moment. It is unashamedly upmarket — drinks are expensive and a reservation for a sunset table is effectively essential in high season — but for a special occasion or a romantic evening, few bars can match the setting or the sense of occasion. Come early to secure your spot, settle in with a negroni or a glass of champagne, and watch the sky perform. For a taste of classic, grown-up Santorini glamour rather than a club night, Franco's is the definitive choice in Fira."
  },
  {
    name: "PK Cocktail Bar", slug: "pk-cocktail-bar", image: NAT("pk-cocktail-bar.webp"),
    rating: 4.5, reviewCount: 4200, price: "€€€", type: "Cocktail bar", area: "Fira",
    tip: "Its multi-level caldera terraces are a top sunset perch; book ahead or arrive an hour early for a front-row seat.",
    filterKeys: ["cocktails", "sunset", "views", "romantic"],
    description: "A stylish multi-level caldera-edge bar in Fira, hugely popular for creative cocktails at sunset.",
    practicalInfo: { openingHours: "Afternoon until late in season", price: "Upper-range cocktails", howToGetThere: "On the Fira caldera path — walkable" },
    fullDescription: "PK Cocktail Bar has become one of Fira's most popular sunset venues, its tiered terraces stepping down the caldera cliff to give a huge number of tables that coveted volcano-and-sunset view. The vibe is a touch more contemporary and buzzy than the old-school elegance of Franco's next door, with a strong list of creative and classic cocktails, chilled music and a lively, international crowd. As the sun drops, every seat fills and the atmosphere builds, making it a great spot to start an evening. Because demand is so high, booking a sunset table in advance is strongly recommended in peak season, or you'll need to arrive well before to grab a place. Prices are on the higher side, as with all the caldera-edge bars, but the setting justifies a splurge for at least one memorable evening. After sunset it stays lively into the night. For travellers who want that iconic Fira sunset with a good drink in hand and a slightly younger, more energetic feel than the classic cocktail lounges, PK is a reliable favourite."
  },
  {
    name: "Two Brothers Bar", slug: "two-brothers-bar", image: NAT("two-brothers-bar.webp"),
    rating: 4.5, reviewCount: 5600, price: "€", type: "Party bar", area: "Fira",
    tip: "The cheapest, rowdiest fun in Fira — cheap shots, loud music and a young crowd; it kicks off after midnight.",
    filterKeys: ["party", "budget", "lively", "late-night"],
    description: "A legendary cheap-and-cheerful party bar in Fira, the loud, boozy heart of the island's budget nightlife.",
    practicalInfo: { openingHours: "Evening until very late in season", price: "Budget; cheap drinks and shots", howToGetThere: "In Fira's central bar strip — walkable" },
    fullDescription: "If the caldera cocktail lounges are Santorini's polished face, Two Brothers Bar is its wild younger sibling — a legendary, no-frills party bar in central Fira that's been fuelling budget nightlife for years. Famous for cheap drinks, potent shots and a raucous, shoulder-to-shoulder atmosphere, it draws a young, international crowd of backpackers, groups and anyone looking to let loose without spending a fortune. The music is loud, the drinks flow, and things typically get going late and rowdy, often spilling out into the surrounding lanes of Fira's compact bar strip. Don't expect views, sophistication or quiet conversation; this is about dancing, meeting people and a proper night out. It's the kind of place that features heavily in travellers' Santorini stories the next morning. For young and budget-minded visitors who've had their fill of romantic sunset dinners and want an unpretentious, high-energy party, Two Brothers is an island institution. Pace yourself with those cheap shots, keep an eye on your belongings, and stumble home knowing you've experienced the fun, unglamorous side of Fira after dark."
  },
  {
    name: "Tango Bar", slug: "tango-bar", image: NAT("tango-bar.webp"),
    rating: 4.4, reviewCount: 2400, price: "€€€", type: "Cocktail & music bar", area: "Fira",
    tip: "A caldera-edge cocktail bar that shifts from mellow sunset drinks to dancing later; the upstairs balcony is the sweet spot.",
    filterKeys: ["cocktails", "sunset", "lively", "views"],
    description: "A caldera-view cocktail bar in Fira that eases from sunset drinks into late-night music and dancing.",
    practicalInfo: { openingHours: "Afternoon until late in season", price: "Upper-range cocktails", howToGetThere: "On Fira's caldera cliff — walkable" },
    fullDescription: "Tango Bar occupies a prime caldera-edge spot in Fira and neatly bridges two moods of Santorini nightlife. In the late afternoon and at sunset it's a stylish cocktail bar, its balconies and terraces filling with couples and groups enjoying well-made drinks against the backdrop of the volcano and the sinking sun. As the evening wears on, the energy lifts, the music turns up, and it becomes one of Fira's livelier late-night spots for dancing without the full-on club commitment. The upstairs balcony is a favourite perch, catching both the view and the atmosphere. Prices sit in the usual caldera-bar bracket — not cheap, but fair for the setting — and the crowd is a sociable international mix. It's a good choice if you want somewhere that works for a romantic sunset drink and then keeps the night going in the same spot, saving you a bar-hop. For a versatile evening out in Fira that spans the golden-hour glamour and the after-dark buzz, Tango Bar covers both bases well."
  },
  {
    name: "Koo Club", slug: "koo-club", image: NAT("koo-club.webp"),
    rating: 4.2, reviewCount: 3800, price: "€€€", type: "Nightclub", area: "Fira",
    tip: "The island's biggest club — an open-air, multi-level space that peaks well after 1am; entry can include a drink.",
    filterKeys: ["club", "party", "late-night", "lively"],
    description: "Santorini's largest and best-known nightclub, an open-air, multi-level venue in Fira for serious late-night dancing.",
    practicalInfo: { openingHours: "Late night in season, typically from midnight", price: "Cover charge some nights; premium drinks", howToGetThere: "In Fira's nightlife district — walkable" },
    fullDescription: "Koo Club is the biggest and most famous nightclub on Santorini, and the natural destination once the bars start to wind down. Set across multiple open-air levels in Fira's nightlife quarter, it combines the island's easy climate with a proper club experience — big sound, DJs spinning mainstream and dance sets, bar-lined terraces and a crowd that ranges from holidaying twenty-somethings to anyone in the mood to dance under the stars. As is standard for Greek island clubbing, nothing much happens early; the venue fills and peaks well after 1am and runs into the small hours. There may be a cover charge on busier nights, sometimes including a drink, and cocktail prices are premium. It's the closest thing Santorini has to a Mykonos-style big-club night, though the island's overall scene stays smaller and more laid-back than its party-focused neighbour. For visitors who want to round off a night with real dancing rather than a quiet cocktail, Koo is the island's headline club and a Fira institution."
  },
  {
    name: "Senor Zorba", slug: "senor-zorba", image: NAT("senor-zorba.webp"),
    rating: 4.5, reviewCount: 2900, price: "€€", type: "Mezcaleria bar", area: "Perissa",
    tip: "A fun, tequila-and-mezcal bar on the Perissa beach strip; the beachy, boozy vibe is a good alternative to Fira's cliff bars.",
    filterKeys: ["party", "beach", "lively", "cocktails"],
    description: "A lively Mexican-themed bar on the Perissa beach strip, popular for tequila, mezcal and a laid-back party vibe.",
    practicalInfo: { openingHours: "Afternoon until late in season", price: "Mid range", howToGetThere: "On the Perissa beachfront in the south; bus from Fira or ATV" },
    fullDescription: "Down on the long black-sand beach strip of Perissa, Senor Zorba brings a splash of Mexican colour to Santorini's nightlife with a tequila- and mezcal-fuelled party atmosphere that's a world away from the caldera cocktail lounges. This buzzy beach bar is a firm favourite with the younger, beach-based crowd staying in Perissa and Perivolos, offering a big range of agave spirits, margaritas and fun, sociable evenings that build from sunset drinks into a proper party. The setting — casual, beachy and unpretentious — makes it an easy place to meet people, and it's often livelier and better value than the more formal Fira scene. It works well as a base for a night out on the south coast, where a string of beach bars keeps things going. For visitors staying near Perissa who don't fancy the trek up to Fira, or anyone wanting a relaxed, boozy beach-bar night with a Mexican twist, Senor Zorba is a reliably good time. Expect it to get busy and loud as the evening rolls on."
  },
  {
    name: "Wet Stories Beach Bar", slug: "wet-stories", image: NAT("wet-stories.webp"),
    rating: 4.4, reviewCount: 2200, price: "€€€", type: "Beach club", area: "Perivolos",
    tip: "A stylish day-to-night beach club on Perivolos; come for sunbeds and cocktails by day and it morphs into a party after dark.",
    filterKeys: ["beach", "party", "cocktails", "lively"],
    description: "A chic beach club on Perivolos beach, seamlessly blending daytime sunbeds with cocktails and a night-time party scene.",
    practicalInfo: { openingHours: "Day into late night in season", price: "Upper range; sunbed and drinks minimums", howToGetThere: "On Perivolos beach in the south; bus from Fira or ATV" },
    fullDescription: "Perivolos, the southern continuation of Perissa's black-sand beach, is Santorini's beach-club heartland, and Wet Stories is one of its stylish flagships. It captures the day-to-night formula perfectly: by day it's a chic beach lounge of plush sunbeds, cabanas and cocktails where you can swim, sunbathe and graze on Mediterranean plates to a soundtrack of chilled house; by evening and into the night it ramps up into one of the liveliest party spots on the south coast, with DJs, dancing and a good-looking, sociable crowd. It offers the more contemporary, resort-style side of Santorini nightlife, an alternative to both the romantic caldera bars and the rowdy Fira party joints. Expect sunbed rental and minimum spends typical of a proper beach club, with premium drink prices to match. For visitors basing themselves on the south-coast beaches who want somewhere they can spend the whole day and roll straight into the evening without moving, Wet Stories delivers a polished, energetic beach-club experience under the Santorini sun and stars."
  },
  {
    name: "Seaside by Notos", slug: "seaside", image: NAT("seaside.webp"),
    rating: 4.5, reviewCount: 1800, price: "€€€€", type: "Beach lounge bar", area: "Perivolos",
    tip: "The most upscale beach club on Perivolos; book a front cabana for a smart cocktails-and-sunset session by the water.",
    filterKeys: ["beach", "cocktails", "romantic", "upscale"],
    description: "An upscale beach lounge and restaurant on Perivolos, offering polished cocktails, dining and a refined seaside vibe.",
    practicalInfo: { openingHours: "Day into evening in season", price: "Upper range; cabana and minimum spend", howToGetThere: "On Perivolos beach; bus from Fira or ATV" },
    fullDescription: "Seaside by Notos is the more refined face of the Perivolos beach-club strip, aimed at visitors who want the sun-lounger-and-cocktail lifestyle with a touch more polish and a little less full-throttle party. Spread along the black sand, it pairs stylish sunbeds and cabanas with a genuinely good restaurant and bar, so you can drift from a lazy lunch and an afternoon swim into elegant sundowners without changing venue. The design leans smart and contemporary, the service is attentive, and the cocktails are well made, drawing a slightly older, more upscale crowd than the rowdier bars nearby. In the evening it settles into a sophisticated seaside lounge rather than a thumping club, making it ideal for couples and groups who want atmosphere over mayhem. As with all the south-coast beach clubs, expect sunbed fees and minimum spends, and prices toward the higher end. For those staying near Perissa and Perivolos who fancy a classy, relaxed day-to-dusk experience by the water — the beach equivalent of a caldera cocktail bar — Seaside by Notos hits the mark."
  },
  {
    name: "V Lounge / Vibes Rooftop", slug: "vibes-rooftop", image: NAT("wet-stories.webp"),
    rating: 4.3, reviewCount: 1200, price: "€€€", type: "Rooftop lounge", area: "Fira",
    tip: "For a rooftop cocktail with the caldera as backdrop, arrive around sunset; the pool-deck seating books up fast.",
    filterKeys: ["cocktails", "sunset", "views", "romantic"],
    description: "A rooftop cocktail lounge in Fira serving drinks with sweeping caldera views, mellow by day and lively at night.",
    practicalInfo: { openingHours: "Afternoon until late in season", price: "Upper-range cocktails", howToGetThere: "On the Fira caldera side — walkable" },
    fullDescription: "Fira's caldera cliff is lined with terraced bars, and rooftop lounges like this one offer another angle on the island's celebrated sunset — drinks in hand, feet up, the volcano and the sea spread out below. The appeal is a relaxed, elevated perch above the bustle of the town's lanes, where you can settle in for well-made cocktails and easy music as the sky shifts from gold to pink to deep blue. By day these spots are mellow places for a coffee or a first drink with a view; as the sun sets they fill quickly with couples and groups, and later in the evening the tempo picks up with DJs or livelier playlists. Prices reflect the prime position, as everywhere along the caldera, and securing a good seat for sunset means arriving early or booking ahead. For visitors who want that quintessential Santorini sunset-with-a-cocktail experience but prefer a rooftop vantage over a cliff-edge terrace, Fira's lounge bars provide a stylish and versatile option that carries the evening from golden hour into the night."
  },
];

// ── Shopping (8) ─────────────────────────────────────────────────────────────
export const SHOPPING: BcnPlace[] = [
  {
    name: "Atlantis Books", slug: "atlantis-books", image: SHOP("atlantis-books.webp"),
    rating: 4.8, reviewCount: 3900, price: "€€", type: "Bookshop", area: "Oia",
    tip: "Descend into this tiny cave bookshop for hand-lettered signs and a rooftop with sea views; the staff's recommendations are gold.",
    filterKeys: ["books", "unique", "gifts"],
    description: "A world-famous, whimsical cave bookshop in Oia, run by a collective and packed with literary charm.",
    practicalInfo: { openingHours: "Daytime into evening in season", price: "Books at cover price; some rare editions", howToGetThere: "On Oia's main street, down a few steps — walkable" },
    fullDescription: "Atlantis Books is not just a shop but one of Oia's most beloved little institutions — a tiny, cave-like bookstore founded by a group of friends that has grown into a cult destination for booklovers the world over. Reached down a few steps off the main street, its whitewashed rooms are crammed floor to ceiling with English, Greek and multilingual titles, from Greek classics and travel writing to fiction and rare editions, all chosen with genuine care. Hand-painted signs, quirky decorations and a rooftop terrace with sea views add to the bohemian charm, and the young international staff who live and work there are full of passionate recommendations. It hosts occasional literary festivals and events, and simply browsing feels like stepping into a labour of love rather than a commercial venture. It's the perfect antidote to the island's identikit souvenir stalls, and a paperback bought here makes a far more meaningful memento of Santorini than a fridge magnet. Even non-readers should poke their head in to experience one of the most charming small bookshops anywhere in the Mediterranean."
  },
  {
    name: "Oia Main Street (Nikolaou Nomikou)", slug: "oia-main-street", image: SHOP("oia-main-street.webp"),
    rating: 4.6, reviewCount: 12000, price: "€€€", type: "Boutique strip", area: "Oia",
    tip: "Best browsed in the morning before the crowds; look past the mass-market shops for genuine art galleries and jewellers.",
    filterKeys: ["boutiques", "art", "jewellery", "gifts"],
    description: "Oia's marble-paved main lane, lined with art galleries, jewellers and upmarket boutiques.",
    practicalInfo: { openingHours: "Shops roughly 10:00 until late in season", price: "Mixed; boutiques to high-end galleries", howToGetThere: "The pedestrian spine of Oia village — walkable" },
    fullDescription: "The marble-paved main street of Oia — officially Nikolaou Nomikou — is the island's most upmarket shopping promenade, a slow-moving pedestrian ribbon threading past some of Santorini's best galleries and boutiques with the caldera glinting between the buildings. Here you'll find serious art galleries showing contemporary Greek painters and sculptors, jewellers crafting pieces inspired by the sea and the island's blue-and-white palette, boutiques of resort wear and linen, and design stores selling ceramics and homeware. Interspersed among them are the inevitable souvenir shops, so a little discernment separates the genuinely lovely from the mass-produced. The setting makes browsing a pleasure in itself, and the light on the whitewashed lanes is magical, especially in the softer hours of morning and early evening. Prices reflect Oia's premium positioning, but this is the place to find a special, higher-end memento — a piece of original art, fine jewellery or handmade ceramics. Come early to enjoy the shops before the day-trippers arrive and the narrow lane becomes a shuffling sunset-bound crowd."
  },
  {
    name: "Gold Street, Fira", slug: "fira-gold-street", image: SHOP("fira-gold-street.webp"),
    rating: 4.4, reviewCount: 6800, price: "€€€", type: "Jewellery district", area: "Fira",
    tip: "Prices are often negotiable, especially for gold by weight; compare a few shops and ask to see the hallmark before buying.",
    filterKeys: ["jewellery", "gold", "gifts"],
    description: "Fira's famous jewellery quarter, densely lined with gold and gemstone shops on the caldera cliff.",
    practicalInfo: { openingHours: "Roughly 10:00 until late in season", price: "Wide range; gold sold by weight", howToGetThere: "Along the Gold Street lane in central Fira — walkable" },
    fullDescription: "Fira's 'Gold Street' — the caldera-side lane officially named Ipapantis — is one of the densest concentrations of jewellery shops in Greece, a glittering run of stores selling gold, silver and gemstone pieces to a steady stream of visitors and honeymooners. Greece has a long goldsmithing tradition, and here you'll find everything from classical Greek key and Byzantine-inspired designs to contemporary pieces and diamond jewellery, much of it sold by weight at prices that are often open to negotiation. It's a place to shop with a little care: quality and value vary between shops, so it pays to compare, ask about gold purity and hallmarks, and haggle politely, particularly on higher-value items. Many couples buy a ring or a keepsake to mark a Santorini honeymoon or engagement, and the better shops offer certificates and international shipping. Even if jewellery isn't on your list, the street is worth a stroll for its caldera views and buzzing atmosphere. For serious buyers, though, Gold Street offers real choice and the chance to bring home a lasting, wearable memory of the island."
  },
  {
    name: "Nikolas Pottery (Ceramic Art Studio)", slug: "nikolas-pottery", image: SHOP("nikolas-pottery.webp"),
    rating: 4.7, reviewCount: 1400, price: "€€", type: "Ceramics studio", area: "Vothonas",
    tip: "Watch the potter throw pieces on the wheel; you can often buy straight from the workshop and even try the wheel yourself.",
    filterKeys: ["ceramics", "handmade", "art", "gifts"],
    description: "A traditional working pottery studio where you can watch pieces being thrown and buy handmade ceramics.",
    practicalInfo: { openingHours: "Daytime in season", price: "Mid range; handmade one-off pieces", howToGetThere: "In the Vothonas/Episkopi area inland; ATV or car" },
    fullDescription: "Santorini has a long ceramic tradition rooted in its volcanic clay, and family-run studios like Nikolas Pottery keep that craft alive, offering a refreshingly authentic alternative to mass-produced souvenirs. At these working workshops, tucked into the island's inland villages, you can watch a potter shape bowls, plates, mugs and decorative pieces on the wheel, glazed in the blues, whites and earthy tones that echo the island's landscape. Each piece is a genuine one-off, handmade on site, which makes it a far more meaningful keepsake than the identical trinkets in the tourist shops. Many studios welcome visitors to browse the shelves, chat with the makers about the process, and in some cases even try their own hand at the wheel or buy directly from the workshop at fair prices. Buying a handmade bowl or a set of ceramic tumblers here supports local artisans and gives you a functional, beautiful memento you'll use at home for years. For travellers who value craft and provenance over convenience, seeking out one of the island's pottery studios is a rewarding detour off the caldera trail."
  },
  {
    name: "Gavalas Winery Shop", slug: "gavalas-winery", image: SHOP("gavalas-winery.webp"),
    rating: 4.6, reviewCount: 1600, price: "€€", type: "Winery / Wine shop", area: "Megalochori",
    tip: "Buy the Vinsanto and a bottle of Assyrtiko straight from this old family winery; they can pack bottles safely for the flight home.",
    filterKeys: ["wine", "gifts", "local", "food"],
    description: "A historic family winery in Megalochori selling Santorini's distinctive Assyrtiko and sweet Vinsanto wines.",
    practicalInfo: { openingHours: "Daytime into evening in season", price: "Mid range; bottles and tastings", howToGetThere: "In Megalochori village; ATV, car or bus toward Akrotiri" },
    fullDescription: "Wine is one of Santorini's great exports and its most rewarding thing to take home, and the shop at a historic family winery like Gavalas in Megalochori is a perfect place to buy it. The island's volcanic soil and ancient basket-trained vines produce wines found nowhere else: the crisp, mineral, saline-edged Assyrtiko white that has won international acclaim, and the luscious, amber Vinsanto, made from sun-dried grapes and aged for years. At a winery shop you can taste before you buy, learn about the unusual viticulture directly from the people who make it, and choose bottles far more interesting than anything in a supermarket. Staff will typically wrap and pack bottles securely for the journey home, and some can arrange shipping for larger orders. A bottle of good Santorini Assyrtiko or a Vinsanto dessert wine makes an excellent gift or a way to relive the trip long after you've left. Combining a winery-shop stop with a tasting and a wander around pretty Megalochori village turns a simple souvenir run into one of the more pleasurable afternoons on the island."
  },
  {
    name: "Theodora Art Gallery", slug: "theodora-art", image: SHOP("theodora-art.webp"),
    rating: 4.6, reviewCount: 800, price: "€€€", type: "Art gallery", area: "Oia",
    tip: "One of several serious galleries in Oia; even if you're not buying, they're worth stepping into for contemporary Greek art.",
    filterKeys: ["art", "unique", "gifts", "boutiques"],
    description: "A contemporary art gallery in Oia showcasing paintings and sculpture by Greek and international artists.",
    practicalInfo: { openingHours: "Daytime into evening in season", price: "Varies widely by work", howToGetThere: "On or near Oia's main street — walkable" },
    fullDescription: "Oia has quietly become one of Greece's more interesting places to buy art, its main street dotted with galleries that punch well above what you'd expect of a small island village. Spaces like Theodora Art Gallery show contemporary painting, sculpture and mixed-media work by Greek and international artists, often inspired by the extraordinary light, colours and forms of the Aegean and the island itself. Wandering in is a pleasure whether or not you intend to buy — the works range from accessible pieces and prints to significant original artworks, and the cool, calm galleries offer a cultured pause from the bustle outside. For visitors looking for a truly special and personal souvenir, an original artwork or limited print carries far more meaning than the usual keepsakes, and reputable galleries can arrange careful packing and international shipping. Prices span a wide range, so there's often something for varied budgets alongside the headline pieces. Combining a browse through Oia's galleries with the village's boutiques and the famous Atlantis Books makes for a genuinely cultured afternoon's shopping, a side of Santorini beyond the sunsets and beaches."
  },
  {
    name: "Oia Treasures", slug: "oia-treasures", image: SHOP("oia-treasures.webp"),
    rating: 4.5, reviewCount: 1100, price: "€€", type: "Gifts & crafts", area: "Oia",
    tip: "Good for tasteful, higher-quality souvenirs — ceramics, textiles and local products — a step up from the tat.",
    filterKeys: ["gifts", "handmade", "boutiques"],
    description: "A curated gift and craft shop in Oia offering quality Greek-made ceramics, textiles and local products.",
    practicalInfo: { openingHours: "Daytime into evening in season", price: "Mid range", howToGetThere: "In Oia village — walkable" },
    fullDescription: "Amid the sea of near-identical souvenir stalls that trail through Santorini's villages, curated shops like Oia Treasures stand out for offering keepsakes with genuine quality and taste. Rather than mass-produced trinkets, these stores focus on Greek-made goods — handmade ceramics and pottery in island blues and whites, woven textiles and linens, olive-wood kitchenware, natural cosmetics, local food products and thoughtfully designed gifts — the kind of things you'll actually want to keep or give. Browsing here is a more pleasant experience than the tourist-tat shops, with pieces displayed with care and staff who can tell you where things are made. Prices sit at a fair mid-range for the quality, higher than the cheap magnets and shot glasses but far more rewarding. For travellers who want to bring home something authentic and lasting from Santorini — a handmade bowl, a bottle of local olive oil, a linen throw — without the expense of fine art or jewellery, a curated gift shop like this hits the sweet spot. It's an easy stop while wandering Oia's photogenic lanes."
  },
  {
    name: "Fira Central Shops", slug: "fira-central-shops", image: SHOP("fira-fira.webp"),
    rating: 4.3, reviewCount: 4500, price: "€€", type: "Shopping district", area: "Fira",
    tip: "Fira has the island's widest range of shops and the fairest prices; stock up on wine, sandals and beachwear here rather than in Oia.",
    filterKeys: ["boutiques", "gifts", "jewellery", "wine"],
    description: "The main shopping hub of Santorini, with the island's broadest mix of boutiques, jewellers and souvenir shops.",
    practicalInfo: { openingHours: "Roughly 10:00 until late in season", price: "Wide range; generally better value than Oia", howToGetThere: "Central Fira, around the main square and caldera lanes — walkable" },
    fullDescription: "As the island's capital and transport hub, Fira has the widest and most varied shopping on Santorini, and often the fairest prices too. The lanes radiating from the main square and running along the caldera are packed with a mix of everything: fashion and resort-wear boutiques, leather sandal-makers, jewellers (the famous Gold Street runs through here), art and ceramics, cosmetics and natural sponge shops, wine merchants, and plenty of souvenir stores for the fridge magnets and evil-eye charms. Because Fira caters to a broader crowd than upscale Oia, you'll generally find better value here, making it the smart place to stock up on wine to take home, a pair of handmade leather sandals, beachwear or gifts. The density of shops means you can compare prices easily, particularly for jewellery and gold. It's busy and commercial rather than romantic, but for practical shopping and the greatest choice on the island, Fira is the place. Combine a browse with a coffee on the caldera and you can knock out most of your souvenir buying in an afternoon."
  },
];

// ── With kids (7) ────────────────────────────────────────────────────────────
export const WITH_KIDS: BcnPlace[] = [
  {
    name: "Santorini Water Park (Kamari)", slug: "santorini-water-park", image: KID("santorini-water-park.webp"),
    rating: 4.3, reviewCount: 2100, price: "€€", area: "Kamari", ageGroup: "All ages", category: "Water park",
    tip: "A reliable half-day of slides and pools to break up the sightseeing; go in the morning before it gets hot and busy.",
    filterKeys: ["kids", "active", "cooling-off"],
    description: "A family water park near Kamari beach with slides and pools — a welcome change of pace for children.",
    practicalInfo: { openingHours: "Daytime in summer season", price: "Day tickets; family rates available", howToGetThere: "Near Kamari on the east coast; bus from Fira or car" },
    fullDescription: "Santorini is famous for romance and scenery rather than family thrills, so for parents travelling with children a water park near Kamari is a genuinely useful ace up the sleeve. With a cluster of water slides, splash pools and shallow areas for younger kids, it offers a few hours of pure fun and cooling-off that has nothing to do with clifftop views or archaeological sites — exactly the kind of break children need between the grown-up sightseeing. The east-coast location near Kamari's long beach makes it easy to combine with a beach day, and facilities typically include sunbeds, a snack bar and shaded areas for parents. As with any water park in the Greek summer, going early in the day means smaller crowds and cooler temperatures before the midday heat peaks. Ticket prices are reasonable by island standards, with family options usually available. While it won't be the highlight of an adult's Santorini trip, for families it can be the highlight of the children's, and a happy, tired-out afternoon here buys plenty of goodwill for the next day's villages and viewpoints."
  },
  {
    name: "Volcano & Hot Springs Boat Trip", slug: "kids-volcano-tour", image: KID("vulkan-tur.webp"),
    rating: 4.5, reviewCount: 8200, price: "€€", area: "Caldera", ageGroup: "6+", category: "Boat excursion",
    tip: "Kids love the boat ride, the 'real volcano' crater walk and the warm sulphur swim; bring water shoes for the sharp lava.",
    filterKeys: ["kids", "active", "boat", "adventure"],
    description: "A boat trip to the volcanic islet with a crater walk and a warm-springs swim — an adventure children love.",
    practicalInfo: { openingHours: "Daily departures in season", price: "Boat from about €25; site entry small extra", howToGetThere: "Boats from Fira Old Port (cable car down) or Ammoudi" },
    fullDescription: "Of all Santorini's activities, the boat trip out to the Nea Kameni volcano tends to be the one children remember most. The adventure begins with the boat ride itself across the caldera, followed by a walk up a genuine, still-active volcano — a moonscape of black lava rock leading to steaming vents and a crater rim, which fires up young imaginations far more than another pretty village. The trip usually continues to the warm sulphur springs off Palea Kameni, where kids and adults alike jump from the boat and swim into bath-temperature, rust-coloured water, a novelty they'll be talking about for weeks. Most tours combine the two and can be paired with the Oia sunset on the way back. Practical tips for families: bring water shoes because the lava path is sharp and hot, pack sun protection and water, and note the springs will stain swimwear orange, so use old costumes. Suitable for children old enough to manage the short uphill walk, it's an active, memorable half-day that blends real science and fun."
  },
  {
    name: "Kamari Beach", slug: "kids-kamari-beach", image: KID("kamari-strand.webp"),
    rating: 4.4, reviewCount: 15000, price: "Free", area: "Kamari", ageGroup: "All ages", category: "Beach",
    tip: "The organised beachfront with sunbeds, shallow entry and lots of tavernas makes Kamari the easiest beach day with young kids.",
    filterKeys: ["kids", "beach", "cooling-off"],
    description: "A long, organised black-sand beach with shallow water, sunbeds and family-friendly tavernas along the front.",
    practicalInfo: { openingHours: "Daylight hours", price: "Free; sunbed rental extra", howToGetThere: "East coast at Kamari; regular bus from Fira or car" },
    fullDescription: "For families, Kamari is one of the most practical beaches on Santorini. This long stretch of dark volcanic sand and pebbles on the east coast is fully organised, with rows of sunbeds and umbrellas, a paved promenade lined with tavernas, cafes, shops and ice-cream stands, and lifeguards in high season — everything you need to keep both children and parents happy for a full day. The water tends to be calm and the entry gradual, which suits younger swimmers, though the dark sand and pebbles get genuinely hot underfoot in midday sun, so water shoes are a smart idea. The promenade means lunch, snacks, toilets and shade are always close at hand, removing much of the stress that wilder beaches bring. There are also watersports and pedalo hire for older kids. Because it's away from the caldera cliffs, Kamari offers easy, flat, buggy-friendly access too. Combined with the nearby water park and the cable-car-free simplicity of a beach day, Kamari makes an ideal low-effort, high-reward outing for families needing a break from villages and viewpoints."
  },
  {
    name: "Santo Winery (family visit)", slug: "kids-santo-winery", image: KID("santo-winery.webp"),
    rating: 4.5, reviewCount: 33000, price: "€€", area: "Pyrgos", ageGroup: "All ages", category: "Winery / Views",
    tip: "The huge terrace, grape juice for the kids and knockout caldera view make this an easy early-evening stop the whole family enjoys.",
    filterKeys: ["kids", "views", "food"],
    description: "The caldera-view cooperative winery is surprisingly family-friendly, with space, snacks and non-alcoholic options.",
    practicalInfo: { openingHours: "Daily until late in season", price: "Tastings for adults; soft drinks and food for kids", howToGetThere: "Near Pyrgos on the caldera side; bus toward Akrotiri or car" },
    fullDescription: "A winery might sound like an odd family outing, but Santo Wines works surprisingly well with children in tow, making it a nice way for parents to enjoy a taste of Santorini's wine culture without leaving the kids out. The huge caldera-edge terrace has plenty of space, and while the adults work through a tasting flight of the island's Assyrtiko and Vinsanto, children can be kept happy with soft drinks, grape juice, and platters of local cheeses, bread and olives to graze on. The real draw for everyone, though, is the view: an unobstructed panorama across the caldera to the volcano and Oia, spectacular at any time and magical at sunset. Because it's set up for large numbers of visitors, it's relaxed about families rather than precious, and an early-evening visit before the peak sunset rush means more space and a calmer atmosphere. It's an easy, low-effort stop that lets parents feel they've done something for themselves while the children enjoy the snacks and the drama of the view. Combine it with nearby Pyrgos village."
  },
  {
    name: "Lost Atlantis Experience", slug: "lost-atlantis-museum", image: KID("lost-atlantis-museum.webp"),
    rating: 4.5, reviewCount: 1900, price: "€€", area: "Megalochori", ageGroup: "6+", category: "Museum / 9D",
    tip: "The immersive 9D show about the eruption and the Atlantis myth is a fun, air-conditioned hit with older kids on a hot afternoon.",
    filterKeys: ["kids", "indoor", "history", "cooling-off"],
    description: "An immersive multimedia experience near Megalochori telling the story of Santorini's eruption and the Atlantis legend.",
    practicalInfo: { openingHours: "Daytime into evening in season", price: "Ticketed; family options", howToGetThere: "Near Megalochori; ATV, car or bus toward Akrotiri" },
    fullDescription: "The Lost Atlantis Experience is a modern, family-friendly attraction that turns Santorini's dramatic volcanic history and its links to the legend of Atlantis into an immersive, entertaining show — perfect for engaging children who might glaze over at ruins and museums. Using multimedia, a detailed model of the ancient island, and a '9D' cinema experience complete with motion and effects, it tells the story of the catastrophic Bronze Age eruption that destroyed the Minoan settlement at Akrotiri and may have inspired Plato's Atlantis myth. It's educational without feeling like a lesson, and being fully indoors and air-conditioned, it's an ideal thing to do during the fierce heat of a summer afternoon or on the rare cloudy day. Older children and curious adults get the most out of it, and it pairs neatly with a visit to the actual Akrotiri excavation to bring the real history to life. Tickets are reasonable with family options, and the whole visit is easily digestible in an hour or so. For families seeking a fun, cooling, screen-based break that still teaches them something about the island, it's a solid choice."
  },
  {
    name: "Donkey Ride, Fira Old Port", slug: "kids-donkey-ride", image: KID("donkey-ride.webp"),
    rating: 4.0, reviewCount: 3400, price: "€", area: "Fira", ageGroup: "All ages", category: "Novelty ride",
    tip: "A traditional but ethically debated experience — many families now prefer the cable car and simply watch or photograph the donkeys.",
    filterKeys: ["kids", "novelty"],
    description: "The traditional donkeys of Fira's caldera steps — a novelty for children, though the cable car is the kinder option.",
    practicalInfo: { openingHours: "Daytime in season", price: "Small per-ride fee", howToGetThere: "Between Fira town and the Old Port, alongside the cable car" },
    fullDescription: "The donkeys that carry visitors up and down the steep zigzag of steps between Fira and the Old Port are one of Santorini's oldest traditions, and for many children the sight of them is a memorable novelty. Historically the donkeys and mules were the only way to move people and goods up the caldera cliff before the cable car arrived, and they remain a photogenic part of the island's character. However, the practice has become ethically controversial, with animal-welfare groups raising serious concerns about the loads, the heat and the treatment of the animals, and many responsible travellers now choose not to ride them. The kinder and more comfortable option for getting up and down the cliff is the cable car, which is quick, cheap and offers great views — while children can still enjoy watching and photographing the donkeys along the path without adding to the burden. If you do want a gentle, brief donkey encounter for young kids, seek out operators with visibly well-cared-for animals. For most families, the cable car plus a look at the donkeys strikes the right balance of tradition and conscience."
  },
  {
    name: "Mini Cruise & Swim Stops", slug: "kids-mini-cruise", image: KID("mini-cruise.webp"),
    rating: 4.5, reviewCount: 5400, price: "€€", area: "Caldera", ageGroup: "All ages", category: "Boat excursion",
    tip: "A gentler alternative to the full volcano hike — a relaxed cruise with swimming and snacks that suits younger children.",
    filterKeys: ["kids", "boat", "swimming"],
    description: "A relaxed caldera mini-cruise with swim stops at the coloured beaches, gentler and easier than the volcano hike.",
    practicalInfo: { openingHours: "Morning and afternoon departures in season", price: "From around €50 including some food", howToGetThere: "Boats from Vlychada or Ammoudi marinas; hotel pickup often included" },
    fullDescription: "For families with younger children who might find the volcano crater walk too demanding, a relaxed caldera mini-cruise offers the fun of a boat trip and swimming without the effort. These sailing or motor-catamaran excursions cruise gently around the caldera, stopping at scenic spots like the Red Beach and White Beach where kids and parents can jump in and swim in clear, sheltered water, snorkel over the volcanic rocks, and lounge on deck between dips. Many include a barbecue or snacks and drinks on board, turning the trip into an easy half-day out where the sea does the entertaining. The gentler pace and the swimming make it more suitable for small children than the sulphur-springs-and-crater expeditions, and semi-private options keep group sizes manageable for nervous parents. Timed for the afternoon, some cruises finish with the Oia sunset from the water, a lovely end to a family day. Bring swimsuits, towels, sun protection and a change of clothes. It's one of the most enjoyable and low-stress ways to get children out on the famous caldera and off the villages for a few hours."
  },
];

// ── Day trips (6) ────────────────────────────────────────────────────────────
export const DAY_TRIPS: BcnPlace[] = [
  {
    name: "Volcano & Hot Springs Cruise", slug: "day-volcano-cruise", image: DAY("nea-kameni-vulkan.webp"),
    rating: 4.5, reviewCount: 21000, price: "€€", area: "Caldera", distance: "Centre of caldera", duration: "Half day",
    tip: "The classic Santorini excursion — combine the volcano crater walk, the hot springs and Thirassia in one trip, ending at the Oia sunset.",
    tiqetsUrl: tiqets("Santorini volcano hot springs Thirassia cruise"), filterKeys: ["boat", "active", "must-see", "half-day"],
    description: "The signature boat excursion combining the Nea Kameni volcano, the warm sulphur springs and often Thirassia island.",
    practicalInfo: { openingHours: "Daily departures in season (morning, midday and sunset)", price: "From about €25 boat only; guided/BBQ versions more", howToGetThere: "Boats from Fira Old Port (via cable car) or Ammoudi Bay" },
    fullDescription: "The volcano and hot springs cruise is the quintessential Santorini day (or half-day) trip, taking you into the heart of the caldera that gives the island its extraordinary shape. From Fira's Old Port — reached by cable car — or from Ammoudi Bay, boats sail out to the black volcanic islet of Nea Kameni, where a guided trail climbs across steaming lava fields to the crater rim, revealing the geological force that created Santorini. The boat then moves to Palea Kameni for a swim in the warm, rust-coloured sulphur springs, a bucket-list dip in bath-temperature water. Many versions extend the day with a stop at the traditional island of Thirassia across the caldera for lunch, and the most popular timing returns past Oia for the famous sunset from sea level. Options range from cheap, no-frills boat tickets to guided tours with barbecue meals and drinks aboard elegant catamarans. Wear closed shoes for the sharp lava, bring old swimwear for the staining springs, and pack sun protection. It's the one boat trip most visitors shouldn't leave the island without."
  },
  {
    name: "Thirassia Island", slug: "day-thirassia", image: DAY("thirasia.webp"),
    rating: 4.6, reviewCount: 4100, price: "€€", area: "Across the caldera", distance: "Boat from Ammoudi/Fira", duration: "Half to full day",
    tip: "Santorini as it was 40 years ago — a sleepy island of a few tavernas and no crowds; go for a long, lazy fish lunch by the water.",
    tiqetsUrl: tiqets("Thirassia island Santorini boat trip"), filterKeys: ["boat", "quiet", "food", "half-day"],
    description: "The quiet, undeveloped island across the caldera, offering a glimpse of old Santorini without the crowds.",
    practicalInfo: { openingHours: "Daytime; small ferries and excursion boats in season", price: "Ferry a few euros; tours more", howToGetThere: "Small ferry from Ammoudi Bay/Athinios, or on a caldera cruise" },
    fullDescription: "Directly across the caldera from Oia lies Thirassia, a small island that was part of Santorini until the great eruption blew them apart, and which today offers a spellbinding glimpse of what the island was like before mass tourism arrived. Home to only a few hundred residents, Thirassia has no big hotels, no cruise crowds and no glossy sunset bars — just a scattering of whitewashed villages, a couple of tavernas by the little harbour of Korfos, quiet beaches and footpaths climbing to the sleepy clifftop capital of Manolas. A trip here is about slowing right down: a boat across the water, a long lunch of fresh fish with your feet almost in the sea, a wander through streets where locals outnumber visitors, and views back across the caldera to Santorini's famous cliffs. Some visitors come on organised caldera cruises that pause here; others take the small public ferry for a more independent, unhurried day. For travellers craving peace and authenticity as an antidote to Santorini's busy honeypots, Thirassia is a rewarding and easy escape."
  },
  {
    name: "Ios Island", slug: "day-ios", image: DAY("ios.webp"),
    rating: 4.5, reviewCount: 6200, price: "€€€", area: "Neighbouring Cyclades", distance: "About 45 min by fast ferry", duration: "Full day",
    tip: "Famous for gorgeous beaches by day and legendary nightlife by night; go for Mylopotas beach and the pretty hilltop Chora.",
    filterKeys: ["ferry", "beach", "nightlife", "full-day"],
    description: "A short ferry hop to a neighbouring Cycladic island known for superb beaches and buzzing summer nightlife.",
    practicalInfo: { openingHours: "Daytime; fast ferries daily in season", price: "Ferry fares vary; book ahead in peak", howToGetThere: "Fast ferry from Athinios port (about 45 min)" },
    fullDescription: "Just a short fast-ferry hop north of Santorini, Ios makes an easy and fun day trip to a very different kind of Cycladic island. Where Santorini is romance and dramatic caldera views, Ios is beaches and energy: it's famous for some of the finest sandy beaches in the Cyclades, above all the long golden sweep of Mylopotas, as well as a hilltop Chora (main town) of whitewashed lanes, windmills and blue-domed churches that's a delight to wander. By night, Ios has a legendary party reputation, its Chora packed with bars that draw a young summer crowd, though the island is perfectly enjoyable by day for those not chasing the nightlife. A day trip typically allows time for a swim and lunch at Mylopotas, a stroll and coffee in the Chora, and the ferry back — or you could stay over to experience the famous nights. Fast ferries run daily in season and take around 45 minutes, so it's a genuinely doable outing. For beach lovers and younger travellers wanting a change of pace from Santorini's refined mood, Ios delivers sun, sand and fun."
  },
  {
    name: "Naxos Island", slug: "day-naxos", image: DAY("naxos.webp"),
    rating: 4.6, reviewCount: 3800, price: "€€€", area: "Neighbouring Cyclades", distance: "About 2 hours by ferry", duration: "Full day",
    tip: "The greenest, most self-sufficient Cyclade — go for the Portara gateway, the old Venetian Chora and huge sandy beaches.",
    filterKeys: ["ferry", "beach", "history", "full-day"],
    description: "A larger, greener Cycladic island with a Venetian old town, the iconic Portara ruin and long sandy beaches.",
    practicalInfo: { openingHours: "Daytime; ferries in season", price: "Ferry fares vary; book ahead", howToGetThere: "Ferry from Athinios port (roughly 1.5–2 hours depending on service)" },
    fullDescription: "Larger and greener than its neighbours, Naxos is the most fertile and self-sufficient of the Cyclades, and a rewarding full-day ferry trip from Santorini for those wanting history, beaches and a more lived-in island. Its calling card is the Portara, a colossal marble doorway standing alone on an islet by the harbour — all that was built of a 6th-century BC temple to Apollo, and a magnet at sunset. Behind it, the old town rises in a maze of Venetian lanes topped by a medieval Kastro, full of shops, tavernas and history. Naxos also boasts some of the finest, longest sandy beaches in the Cyclades along its west coast, plus a mountainous interior of traditional villages, olive groves and ancient kouros statues for those who venture inland by car. As a day trip, ferry times mean you'll focus on the town, the Portara and a beach, but it gives a real taste of a bigger, more rounded island. Check ferry schedules carefully, as journey times vary by vessel; the faster services make a comfortable day out."
  },
  {
    name: "Wine Country Tour", slug: "day-wine-country", image: DAY("paros.webp"),
    rating: 4.7, reviewCount: 5900, price: "€€€", area: "Santorini interior", distance: "Across the island", duration: "Half day",
    tip: "A guided half-day hitting three or four wineries is the best way to taste Assyrtiko and Vinsanto without worrying about driving.",
    tiqetsUrl: tiqets("Santorini wine tour tasting"), filterKeys: ["wine", "food", "guided", "half-day"],
    description: "A guided tour of Santorini's distinctive volcanic wineries, tasting the island's Assyrtiko and Vinsanto.",
    practicalInfo: { openingHours: "Morning or afternoon departures in season", price: "Guided tours with tastings from around €90–130", howToGetThere: "Hotel pickup; wineries clustered around Pyrgos, Megalochori and Akrotiri" },
    fullDescription: "Santorini's volcanic soil, near-total lack of rain and ancient basket-trained vines produce wines unlike anywhere else on earth, and a guided wine-country tour is the ideal way to explore them without the worry of drinking and driving. Over a half-day, a small-group tour with hotel pickup typically visits three or four contrasting wineries — from big caldera-view operations like Santo Wines to intimate family estates such as Gavalas, Venetsanos, Domaine Sigalas or Boutari — tasting a range of the island's signature crisp, mineral Assyrtiko whites and the luscious sun-dried Vinsanto dessert wine, often paired with local cheeses, tomato paste and other Santorinian bites. A knowledgeable guide explains the extraordinary viticulture, the volcanic terroir and the history of winemaking here, turning it into an education as much as an indulgence. The clustered wineries around Pyrgos, Megalochori and Akrotiri mean minimal driving between stops, and sunset-timed tours end on a high with a caldera-view finale. For food-and-wine lovers, it's one of the most enjoyable and distinctive day activities the island offers, and a delicious counterpoint to beaches and viewpoints."
  },
  {
    name: "Milos Island", slug: "day-milos", image: DAY("milos.webp"),
    rating: 4.6, reviewCount: 2600, price: "€€€", area: "Neighbouring Cyclades", distance: "About 2–3 hours by ferry", duration: "Full day",
    tip: "Go for the lunar-white cliffs of Sarakiniko and the island's astonishing, otherworldly beaches; a longer but memorable hop.",
    filterKeys: ["ferry", "beach", "unique", "full-day"],
    description: "A volcanic Cycladic island of astonishing beaches, famed for the moon-like white rock formations of Sarakiniko.",
    practicalInfo: { openingHours: "Daytime; seasonal ferries, check schedules", price: "Ferry fares vary; longer crossing", howToGetThere: "Seasonal fast ferry from Santorini (roughly 2–3 hours; verify times)" },
    fullDescription: "For travellers with a full day and a taste for the extraordinary, Milos — like Santorini, a volcanic Cycladic island — rewards the longer ferry crossing with some of the most spectacular and surreal coastal scenery in Greece. Its most famous sight is Sarakiniko, a stretch of coast where wind and waves have sculpted brilliant white volcanic rock into smooth, lunar formations that feel more like another planet than a beach, dazzling against the deep blue sea. Beyond it, Milos is ringed by an astonishing variety of beaches and coves — over seventy of them — in colours from white to red to ochre, many reachable only by boat, plus the pretty fishing village of Klima with its colourful boathouses and the ancient site where the Venus de Milo was found. As a day trip it's ambitious given the ferry time, so check seasonal schedules carefully and consider it best for those willing to make an early start or even stay a night. But for landscape lovers wanting to see something genuinely unique, Milos is unforgettable and a fascinating volcanic cousin to Santorini."
  },
];

// ── Beaches (8) ──────────────────────────────────────────────────────────────
export const BEACHES: BcnPlace[] = [
  {
    name: "Red Beach", slug: "red-beach", image: BCH("red-beach.webp"),
    rating: 4.4, reviewCount: 41000, price: "Free", area: "Akrotiri", facilities: "Sunbeds, drinks boat", category: "Scenic cove",
    tip: "Come early for a spot; admire it from the clifftop path and heed the rockfall warnings before scrambling down.",
    filterKeys: ["must-see", "scenic", "swimming", "south"],
    description: "Santorini's iconic cove of red volcanic sand beneath towering rust-coloured cliffs, near ancient Akrotiri.",
    practicalInfo: { openingHours: "Daylight hours", price: "Free; sunbed rental extra", howToGetThere: "Short rough walk from the Akrotiri site car park; bus from Fira toward Akrotiri" },
    fullDescription: "The Red Beach is the most photographed and dramatic beach on Santorini, a small cove of deep-red and black volcanic sand hemmed in by soaring rust-coloured cliffs that plunge into clear turquoise water. The combination of red rock, dark sand and blue sea creates a genuinely otherworldly scene, and it's a must-see near the Akrotiri archaeological site on the island's southwestern tip. Reaching the sand involves a short but rough scramble over a rocky headland from the car park, and swimming in the sheltered bay is lovely. However, the cliffs are unstable and prone to rockfall, and authorities periodically warn against sitting directly beneath them or even closing the beach after landslides, so read the signs and take the risk seriously — many visitors now simply admire the beach from the clifftop viewpoint on the approach path. In season there are usually a few sunbeds and a small boat selling drinks. It gets busy and the space is limited, so arrive early. Combine it with the neighbouring White Beach, reachable by a short boat ride, and the Akrotiri ruins."
  },
  {
    name: "Perissa Beach", slug: "perissa-beach", image: BCH("perissa-beach.webp"),
    rating: 4.5, reviewCount: 22000, price: "Free", area: "Perissa", facilities: "Full amenities, watersports", category: "Organised black sand",
    tip: "A long, lively, fully organised black-sand beach with cheap tavernas and beach bars — the best value beach base on the island.",
    filterKeys: ["organised", "swimming", "family", "south", "watersports"],
    description: "A long stretch of organised black volcanic sand on the south coast, backed by tavernas, bars and watersports.",
    practicalInfo: { openingHours: "Daylight hours; bars into the evening", price: "Free; sunbeds and watersports extra", howToGetThere: "South coast at Perissa; regular bus from Fira or car" },
    fullDescription: "Perissa is one of Santorini's best all-round beaches and a superb base for a beach-focused stay. This long, wide stretch of jet-black volcanic sand on the island's south coast is fully organised, with endless rows of sunbeds and umbrellas, a lively strip of tavernas, cafes and beach bars running the length of the front, and watersports from jet skis to paddleboards. Backed by the dramatic Mesa Vouno mountain — the same ridge that carries the ruins of Ancient Thera — it has a great setting as well as great facilities. The black sand gets seriously hot underfoot in summer, so water shoes or flip-flops are essential, but the water is clear and good for swimming, and the beach is long enough that you can always find space. Prices for food, drink and accommodation here are noticeably lower than up on the caldera, which makes Perissa and its neighbour Perivolos popular with younger travellers, families and anyone wanting a relaxed, good-value beach holiday alongside the Santorini sightseeing. Bars keep things going into the evening, giving the area its own nightlife."
  },
  {
    name: "Kamari Beach", slug: "kamari-beach", image: BCH("kamari-beach.webp"),
    rating: 4.4, reviewCount: 19000, price: "Free", area: "Kamari", facilities: "Full amenities, promenade", category: "Organised black sand",
    tip: "The paved promenade of tavernas and shops makes Kamari the most convenient beach day; the water gets deep quickly, good for swimming.",
    filterKeys: ["organised", "swimming", "family", "east", "promenade"],
    description: "A popular organised black-sand beach on the east coast, with a long promenade of tavernas, shops and cafes.",
    practicalInfo: { openingHours: "Daylight hours; promenade into the evening", price: "Free; sunbeds extra", howToGetThere: "East coast at Kamari; frequent bus from Fira or car" },
    fullDescription: "Kamari is Santorini's most developed and convenient beach resort, sitting on the east coast beneath the towering Mesa Vouno headland that separates it from Perissa on the other side. Its long beach of dark grey-black sand and pebbles is fully organised with sunbeds and umbrellas, and its defining feature is a lovely paved seafront promenade lined with tavernas, cafes, bars, ice-cream parlours and shops — meaning everything you need for a comfortable day is right behind you. The water deepens fairly quickly, making it good for proper swimming, and there are watersports and boat trips on offer. As with all the island's volcanic beaches, the dark sand and pebbles get very hot in midday sun, so bring water shoes. Kamari is well connected to Fira by frequent buses and has a good range of hotels and apartments, making it a popular and practical base for families and those wanting a beach-plus-sightseeing holiday. In the evening the promenade comes alive with diners and strollers, and there's an open-air summer cinema nearby, adding to its easy-going resort appeal."
  },
  {
    name: "Perivolos Beach", slug: "perivolos-beach", image: BCH("perivolos-beach.webp"),
    rating: 4.6, reviewCount: 12000, price: "Free", area: "Perivolos", facilities: "Beach clubs, watersports", category: "Beach-club black sand",
    tip: "The chic southern continuation of Perissa — this is beach-club territory, so pick a lounge, grab a cabana and stay all day.",
    filterKeys: ["organised", "beach-club", "swimming", "south", "watersports"],
    description: "The stylish southern extension of Perissa, lined with trendy beach clubs, cocktail bars and watersports.",
    practicalInfo: { openingHours: "Daylight into late; clubs in the evening", price: "Free; sunbed/cabana fees at clubs", howToGetThere: "South coast, continuing from Perissa; bus from Fira or car" },
    fullDescription: "Perivolos is the longer, more stylish southern continuation of Perissa's great sweep of black volcanic sand, and it's the heart of Santorini's beach-club scene. While it shares the same fine dark sand and clear water, Perivolos has carved out a reputation as the island's chic day-to-night beach destination, lined with trendy beach clubs and lounges offering plush sunbeds, cabanas, cocktails, DJ soundtracks and Mediterranean dining right on the sand. Places like Wet Stories and Seaside by Notos let you settle in for a full day of swimming, sunbathing and grazing that rolls seamlessly into sunset drinks and, at some, an evening party. There's a full range of watersports too, from jet skis to windsurfing. Compared with the more family-oriented, budget-friendly Perissa end, Perivolos skews a little more upscale and social, drawing a fashionable crowd, though it remains far better value than the caldera. Expect sunbed rental and minimum spends at the clubs. For visitors who want the beach-club lifestyle — sun, sea, cocktails and music in one polished package — Perivolos is the place on Santorini to find it."
  },
  {
    name: "Vlychada Beach", slug: "vlychada-beach", image: BCH("vlychada-beach.webp"),
    rating: 4.6, reviewCount: 7800, price: "Free", area: "Vlychada", facilities: "Some sunbeds, marina tavernas", category: "Dramatic sculpted cliffs",
    tip: "The wind-carved grey cliffs look like moonscape sculpture; quieter than Perissa, with the excellent To Psaraki taverna at the marina.",
    filterKeys: ["scenic", "quiet", "swimming", "south"],
    description: "A striking, quieter south-coast beach backed by wind-sculpted grey-white cliffs resembling abstract sculpture.",
    practicalInfo: { openingHours: "Daylight hours", price: "Free; some sunbeds", howToGetThere: "South coast at Vlychada, near the marina; bus from Fira or car" },
    fullDescription: "Vlychada, on the island's south coast near a pretty marina, is one of Santorini's most distinctive and photogenic beaches — and noticeably quieter than the busy resorts of Perissa and Kamari. Its signature is the backdrop: tall cliffs of soft grey and white volcanic ash that wind and weather have carved into smooth, undulating, almost sculptural forms, giving the beach a wild, lunar, artistic quality quite unlike anywhere else on the island. The sand is dark grey and the water clear and good for swimming, and while parts of the beach are organised with sunbeds, it retains a more natural, laid-back feel with far fewer crowds. The adjacent marina is home to a handful of excellent fish tavernas, most famously To Psaraki, making Vlychada a great spot to combine a scenic swim with a superb seafood lunch. There's also the quirky Tomato Industrial Museum nearby in a former cannery. For travellers wanting a beautiful, characterful and more peaceful beach experience away from the beach-club buzz, Vlychada is one of the island's hidden gems."
  },
  {
    name: "White Beach", slug: "white-beach", image: BCH("white-beach.webp"),
    rating: 4.4, reviewCount: 6100, price: "Free", area: "Akrotiri", facilities: "Sunbeds, taverna (boat access)", category: "Secluded cove",
    tip: "Reachable mainly by a short water-taxi from Akrotiri — that little effort keeps it calmer than the Red Beach next door.",
    filterKeys: ["scenic", "quiet", "swimming", "south", "boat-access"],
    description: "A secluded cove near the Red Beach, framed by pale cliffs and reached mainly by a short boat ride.",
    practicalInfo: { openingHours: "Daylight hours in season", price: "Free; small boat-taxi fare; sunbeds extra", howToGetThere: "Water-taxi from Akrotiri/Red Beach area; limited rough footpath" },
    fullDescription: "White Beach lies just around the headland from the famous Red Beach on Santorini's southwestern tip, and its relative inaccessibility is exactly what makes it special. Named for the pale grey-white cliffs that frame it — a striking contrast to its neighbour's red rock — this secluded cove of dark pebbles and clear, deep water is reached mainly by a short water-taxi from the Red Beach or Akrotiri, with only a rough and partly impassable footpath as the alternative. That small barrier keeps the crowds down, so it's usually calmer and more relaxed than the heaving Red Beach nearby, with a peaceful, cut-off feel. In season there are sunbeds and umbrellas and sometimes a small taverna or drinks service, all supplied by boat. The swimming is excellent in the sheltered, transparent water, and the dramatic pale cliffs make a beautiful backdrop. It's best combined with a Red Beach visit and the Akrotiri ruins, or reached as a stop on a caldera boat cruise. For those willing to hop on a little boat, White Beach offers a quieter, scenic reward."
  },
  {
    name: "Monolithos Beach", slug: "monolithos-beach", image: BCH("monolithos-beach.webp"),
    rating: 4.3, reviewCount: 3200, price: "Free", area: "Monolithos", facilities: "Shallow water, playgrounds, tavernas", category: "Family beach",
    tip: "The calmest, shallowest and most kid-friendly beach on the island, with playgrounds and lifeguards — ideal for little ones.",
    filterKeys: ["family", "organised", "swimming", "east", "shallow"],
    description: "A calm, shallow east-coast beach near the airport, the most family-friendly on the island with playgrounds.",
    practicalInfo: { openingHours: "Daylight hours", price: "Free; sunbeds extra", howToGetThere: "East coast near the airport at Monolithos; bus from Fira or car" },
    fullDescription: "Monolithos, on the east coast near the airport, is widely regarded as Santorini's most family-friendly beach, and for parents with young children it's a godsend. Unlike the deeper, sometimes wave-washed shores elsewhere, Monolithos has notably calm, shallow, gently shelving water that's safe and reassuring for small swimmers, and it's one of the few beaches on the island with lifeguards, children's playgrounds and open green space right behind the sand. The beach itself is a long stretch of dark sand and fine pebbles, well organised with sunbeds and umbrellas, and backed by a handful of relaxed, reasonably priced tavernas serving the family crowd. Because it's a little removed from the main tourist resorts, it tends to be less crowded and more locally frequented, with an easy-going, unpretentious atmosphere. The proximity to the airport means occasional plane noise, but that's a minor trade-off for the safety and facilities. For families prioritising a stress-free beach day where the children can paddle, play and swim safely while parents relax, Monolithos is comfortably the top choice on Santorini."
  },
];
