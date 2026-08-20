import type { FaqItem } from "@/app/components/FaqSection";
import type { MonthSlug } from "./months";

/**
 * Editorial copy for the twelve /where-is-it-warm/<month> pages.
 *
 * Written against the real climate_data figures rather than around them, because
 * the numbers tell a story no generic "best places in March" page can: Europe has
 * **zero** destinations above 75 °F in January and 182 in August, the catalog's
 * warm window bottoms out in April rather than midwinter, and the tropics barely
 * move all year while everything else swings around them.
 *
 * FIGURES ARE ROUNDED AND HEDGED ON PURPOSE. The precise counts are computed and
 * rendered live by WarmBrowser; repeating an exact number in prose would go stale
 * the first time the table is re-seeded, and the page would contradict itself on
 * screen. "Around 130" survives that. Never write a figure here that the grid
 * next to it can prove wrong.
 */
export type MonthCopy = {
  /**
   * The phrase people actually type, which is NOT the phrase on the page.
   * "warm places to visit in december" is searched 5,500 times a month in the US
   * against a fraction of that for "where is it warm in december", so the title
   * carries the first and the H1 carries the second. The page answers both.
   *
   * Kept under 60 characters so clampTitle does not drop the brand.
   */
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: { h2: string; body: string[] }[];
  faq: FaqItem[];
};

const HOW_IT_WORKS =
  "Every temperature on this page is the average daily high for that destination in that month, measured rather than estimated. The sea and rainfall filters come from the same source. Drag either end of the range to change what counts as warm — the list re-sorts instantly, warmest first.";

/**
 * Copy for the /where-is-it-warm hub.
 *
 * The hub has a job the month pages do not: it has to say what this is *for*.
 * Someone landing on "where is it warm in February" already knows what they
 * want; someone landing here is deciding whether the tool is worth their time.
 * So the copy leads with the planning problem — I have these dates, where can I
 * fly — rather than with the weather, and every section points at what happens
 * after the visitor picks a month: a destination page, a fare, a guide.
 *
 * The long-form sections live in page.tsx rather than here because they carry
 * internal links, which are half the point of the section.
 */
export const HUB_COPY = {
  intro:
    "Most trips start with dates, not a destination. Pick the month you can travel and this guide turns it around: every place in our catalog that is genuinely warm then, ranked by temperature, with a fare from your airport and a route through to booking.",
  spotlightLine:
    "Three of the warmest places you can fly to this month, drawn from destinations with full guides behind them.",
  monthsLine:
    "Every month has its own page: the full list of warm destinations, a temperature range you can drag, and filters for sea temperature, rainfall and overnight lows. Prices are round-trip and update with the catalog.",
  searchLine:
    "Already have somewhere in mind? Search the catalog by city or country and go straight to its fares, guides and best time to visit.",
  faq: [
    {
      q: "What does this guide actually do?",
      a: "It answers the question the other way round. Instead of picking a destination and hoping the weather works, you pick the month you can travel and see every destination that is genuinely warm then — sorted warmest first, with a round-trip fare next to each one. From there you can open the destination for its guides, its price calendar and a flight search.",
    },
    {
      q: "Where is it warm right now?",
      a: "The current month's page has the full answer, and it changes as the calendar does. Broadly: from November to April the warmth is in Southeast Asia, the Caribbean, the Gulf and the southern hemisphere, with almost nothing in Europe. From May to October Europe takes over, peaking in July and August.",
    },
    {
      q: "Which month is warmest overall?",
      a: "August, by a wide margin — more destinations clear 75 °F then than in any other month. The narrowest month is April, not midwinter, because the southern hemisphere has cooled out of its summer before the northern hemisphere has warmed into its own.",
    },
    {
      q: "Are the temperatures reliable?",
      a: "Each figure is the average daily high for that destination in that month, from measured climate records rather than editorial judgement. The sea temperature, rainfall and overnight low filters come from the same source. It is a monthly average, so it describes a typical day rather than promising one.",
    },
    {
      q: "How do I find cheap flights once I have picked a destination?",
      a: "Every destination card links through to its own page, which carries a flight search, a fare chart across the year and, for our most popular routes, a low fare calendar showing the cheapest departure dates day by day. Warm months are often peak months, so the calendar is usually worth a look before you commit to dates.",
    },
    {
      q: "Can I filter by more than temperature?",
      a: "Yes. Each month page has filters for warm sea, dry weather and cool nights, plus a region filter. They read measured sea temperature, monthly rainfall and overnight lows, which is what separates somewhere that is hot and dry from somewhere that is hot and wet — a distinction the daytime temperature alone will never make.",
    },
  ],
};

export const MONTH_COPY: Record<MonthSlug, MonthCopy> = {
  january: {
    title: "Warm Places to Visit in January | Flyamba",
    description:
      "Nowhere in Europe clears 75°F in January. The warmth is in Southeast Asia, the Caribbean and the southern hemisphere. See every destination.",
    h1: "Where Is It Warm in January?",
    intro:
      "January is the month the map empties out. Not one European destination in our catalog averages a daily high above 75 °F — not the Canaries, not Sicily, not the Algarve. If you want genuine warmth this month you are crossing an ocean or the equator.",
    sections: [
      {
        h2: "Where the warmth actually is in January",
        body: [
          "Three regions carry January. Southeast Asia is in its dry season and at its best: Phuket, Bangkok and Singapore all sit in the mid-eighties with the humidity at its lowest of the year. The Caribbean and Mexico are in the sweet spot that makes January their peak season — Cancún, the Yucatán and the islands run high seventies to low eighties with reliable sun. And the southern hemisphere is in high summer, which is why Cape Town, Rio and Sydney appear on a list of warm places in the northern winter.",
          "The Gulf is the outlier worth knowing about. Dubai in January is around 75 °F — pleasant, walkable, and nothing like the 108 °F it hits in July. It is the one time of year the desert cities read as a beach holiday rather than an endurance test.",
        ],
      },
      {
        h2: "Two kinds of warm, and only one of them swims",
        body: [
          "January is where the difference between air and water matters most, because the two answers look identical on a list. Montego Bay averages 81 °F with the sea at 82 °F. Fuerteventura, the warmest of the Canaries this month, is 65 °F with the sea at 68 °F. Both get called warm; only one is a swimming holiday.",
          "Rainfall splits the tropics just as hard. Phuket runs 84 °F on 52 mm of rain with 320 hours of sunshine, while Flores at a similar temperature takes 421 mm. And the Red Sea is the outlier at both ends — Marsa Alam records essentially no rain at all in January.",
        ],
      },
      {
        h2: "Flying there in January",
        body: [
          "January splits in two. The first week carries New Year pricing on almost every route, and then it falls away into the quietest stretch of the year for long-haul — the second through fourth weeks are as calm as travel gets. Warmth in January means distance, so lead time matters more than usual: book further out for Southeast Asia than for the Caribbean, and expect the Caribbean itself to be firm rather than soft, because January is its high season.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Is anywhere in Europe warm in January?",
        a: "Not by this page's standard. No European destination in the catalog averages a daily high above 75 °F in January. The Canary Islands come closest at around 70 °F, which is mild and pleasant for walking but well short of beach weather. If you drag the lower end of the temperature range down to 65 °F, southern Spain, the Canaries and Malta appear.",
      },
      {
        q: "Where is the warmest place to travel in January?",
        a: "Southeast Asia and the equatorial tropics. Phuket, Bangkok, Singapore and the Indonesian islands all sit in the mid-eighties, and January falls in the dry season for most of them — high temperatures with comparatively low rainfall, which is an unusual combination.",
      },
      {
        q: "Is the Caribbean good in January?",
        a: "Yes, and it is the reason January is peak season there. The Caribbean and the Mexican Caribbean coast run high seventies to low eighties with sea temperatures to match, outside hurricane season and in the driest part of the year. Prices reflect that, so booking early matters more here than in most months.",
      },
      {
        q: "Can I swim in January?",
        a: "Use the Warm sea filter. It reads the measured sea surface temperature for January, not the air temperature, which is what separates a place that looks warm from one you would actually get into. Around fifty destinations clear 82 °F this month, almost all of them tropical.",
      },
      {
        q: "When should I book for January?",
        a: "Six to eight weeks ahead for the Caribbean and Mexico, and longer for Southeast Asia — ten to fourteen weeks is a fair guide for long-haul in peak season. Avoid the first week if you can move: New Year pricing sits on most routes through it. The low fare calendar shows the cheapest departure dates day by day on our busiest routes.",
      },
    ],
  },

  february: {
    title: "Warm Places to Visit in February | Flyamba",
    description:
      "February mirrors January: Southeast Asia, the Caribbean and the southern hemisphere. See every destination above your temperature, warmest first.",
    h1: "Where Is It Warm in February?",
    intro:
      "February barely differs from January. The warm list is nearly the same size and made up of the same places — Southeast Asia, the Caribbean, and the southern hemisphere in high summer. Europe still has nothing above 75 °F.",
    sections: [
      {
        h2: "Where the warmth actually is in February",
        body: [
          "Southeast Asia is still in dry season and still the most reliable answer: Singapore and Phuket in the mid-eighties, Bangkok close behind, with the rain that arrives in May months away. The Caribbean and Mexico hold their January form. The southern hemisphere is at its warmest of the year, which is why Cape Town shows up ahead of anywhere in Europe.",
          "Egypt and the Red Sea deserve a mention February makes easy to miss. Hurghada and Marsa Alam are among the driest places on this list — under a few millimetres of rain in a whole month — with sea temperatures that stay swimmable through winter. They are also the shortest flight of any genuinely warm option from Europe, which matters if you are connecting.",
        ],
      },
      {
        h2: "The measurements behind February",
        body: [
          "February's most useful number is rainfall, because it separates two places that read the same on temperature. Aruba averages 80 °F with 14 mm of rain and 327 hours of sun. Komodo, at 81 °F, takes 390 mm — nearly thirty times as much water for one degree less heat.",
          "The Atlantic islands stay a step behind: Fuerteventura is 67 °F with a 66 °F sea, dry at 5 mm but not swimmable in the way Turks & Caicos is at 78 °F air and 78 °F water.",
        ],
      },
      {
        h2: "Flying there in February",
        body: [
          "February's shape is set by two long weekends. Presidents' Day pulls demand forward in the middle of the month, and school half-terms do the same at different times depending on the district. Either side of them February is one of the easier months to fly long-haul — the holidays are behind and spring break has not started.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Where is it warm in February?",
        a: "Southeast Asia, the Caribbean, Mexico, the Gulf, and the southern hemisphere. Phuket and Singapore sit in the mid-eighties, Cancún around 79 °F, and Cape Town and Sydney are in high summer. Around 120 destinations in the catalog average a daily high above 75 °F this month.",
      },
      {
        q: "Is February a good time for the Canary Islands?",
        a: "It is mild rather than warm. The Canaries average around 70 °F in February, which is comfortable for walking and sitting outside but below what most people mean by beach weather. They sit just under this page's default range — drag the lower end down to 65 °F and they appear.",
      },
      {
        q: "Where is warm and dry in February?",
        a: "The Red Sea and West Africa. Hurghada, Marsa Alam and Dakar record almost no rain in February. Use the Dry filter to see them ranked — it uses measured monthly rainfall, so it separates places that are hot and wet from places that are hot and dry.",
      },
      {
        q: "Is it too early for southern Europe in February?",
        a: "Yes, if warmth is the point. Nowhere in Europe averages above 75 °F in February. Southern Spain, Sicily and Greece are perfectly pleasant for sightseeing at 60–68 °F, and much cheaper and emptier than in summer, but they are not warm in the sense this page measures.",
      },
      {
        q: "When should I book for February?",
        a: "Six to eight weeks for most routes. The two things to plan around are Presidents' Day and school half-terms, which pull demand into specific weeks rather than lifting the whole month. Outside them February is one of the easier months to fly long-haul.",
      },
    ],
  },

  march: {
    title: "Warm Places to Visit in March | Flyamba",
    description:
      "Southeast Asia peaks in March and the Caribbean holds, while the Med is still weeks away. See every warm destination, sorted warmest first.",
    h1: "Where Is It Warm in March?",
    intro:
      "March is when Southeast Asia is at its hottest and the Caribbean at its best, while Europe is still weeks from anything you would call warm. It is the last month of the year's quiet stretch — the warm list is close to its smallest.",
    sections: [
      {
        h2: "Where the warmth actually is in March",
        body: [
          "Phuket peaks in March at around 88 °F, the hottest it gets all year, and Thailand's Andaman coast is at the tail end of its dry season before the rains build in May. Dubai hits the mid-eighties, which is the last comfortable month before the Gulf becomes unbearable. The Caribbean and Mexico continue their run: Cancún around 81 °F, dry, with the sea already warm.",
          "North America starts to appear here in a way it does not in January and February. Southern Florida, southern Texas and the Mexican Pacific coast all cross into the range during March, which matters if you would rather not leave the continent.",
        ],
      },
      {
        h2: "The measurements behind March",
        body: [
          "March is the best-lit month in the Caribbean by a clear margin. Turks & Caicos records 357 hours of sunshine on 22 mm of rain, and Aruba 361 hours on 17 mm — the sort of numbers that only line up in a dry season.",
          "Southeast Asia is hotter and wetter at the same time. Phuket peaks at 87 °F but takes 94 mm, four times Aruba's rainfall. The Canaries are dry too — Fuerteventura at 6 mm — but the sea is 66 °F, which is the number that decides whether the beach gets used.",
        ],
      },
      {
        h2: "Flying there in March",
        body: [
          "March is spring break, and it is less a month than three different pricing regimes. Demand to Mexico, the Caribbean and Florida climbs steeply through the middle weeks and drops away at the end, so the same route can differ enormously depending on which week you pick. If your dates can move at all, the last week of March is usually the cheapest of the four.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Where is it warm in March?",
        a: "Southeast Asia is at its annual peak — Phuket around 88 °F — and the Gulf is in its last comfortable month at around 86 °F. The Caribbean, Mexico and equatorial Africa hold steady. Around 120 destinations average a daily high above 75 °F.",
      },
      {
        q: "Is the Mediterranean warm in March?",
        a: "Not yet. Southern Spain, Italy, Greece and Turkey are in the sixties in March — good for cities, walking and food, and much quieter than summer, but the sea is around 59 °F and nobody is swimming. May is the first month the Mediterranean joins this list in numbers.",
      },
      {
        q: "Is March a good time for Dubai?",
        a: "It is one of the best. Dubai averages around 86 °F in March, with almost no rain, before the climb into the forties Celsius that makes summer there impractical. April is warmer still but noticeably heavier; by June the city is above the range this page shows by default.",
      },
      {
        q: "Where can I swim in March?",
        a: "Turn on the Warm sea filter. Around forty destinations have sea temperatures above 82 °F in March, concentrated in Southeast Asia, West Africa and the Indian Ocean. The Caribbean sits a little below that but is comfortably swimmable.",
      },
      {
        q: "How do I avoid spring break pricing in March?",
        a: "Move the week rather than the destination. Demand to Mexico, the Caribbean and Florida climbs through the middle of March and falls away at the end, so the last week is usually the cheapest of the four. If your dates are fixed to a school break, book early — that is the one case where waiting does not help.",
      },
    ],
  },

  april: {
    title: "Warm Places to Visit in April | Flyamba",
    description:
      "April is the year's narrowest month for warmth — the north has not arrived, the south has cooled. See which destinations still clear your temperature.",
    h1: "Where Is It Warm in April?",
    intro:
      "April is the hardest month of the year to find warmth, which surprises most people. The southern hemisphere has cooled out of its summer and the northern hemisphere has not yet warmed into its own, so the warm list is at its smallest of the whole year — smaller even than January.",
    sections: [
      {
        h2: "Where the warmth actually is in April",
        body: [
          "What is left is the belt that does not care about seasons. Southeast Asia stays in the mid-eighties, the equatorial Indian Ocean is at its warmest for swimming, and the Caribbean and Mexico hold through to the start of their wet season. Marrakech crosses into the range in April and is one of the few short-haul options from Europe that genuinely qualifies.",
          "Egypt and Jordan are the standouts for dry heat. Hurghada, Marsa Alam and Wadi Rum record essentially no rain in April while sitting comfortably inside the range — a combination almost nowhere else offers this month.",
        ],
      },
      {
        h2: "The measurements behind April",
        body: [
          "April is the month the Mediterranean's numbers become properly misleading. Santorini reaches 63 °F in the air and 63 °F in the water: pleasant to walk, cold to swim. Cancún at the same time is 83 °F air and 81 °F sea on 34 mm of rain.",
          "It is also when Southeast Asia's rain starts arriving ahead of its reputation. Phuket is still 86 °F with an 86 °F sea, the warmest water on this page, but rainfall has climbed to 161 mm — a fivefold jump from March.",
        ],
      },
      {
        h2: "Flying there in April",
        body: [
          "April moves with Easter, which is the complication. The week either side of it behaves like peak season wherever Europeans travel, and the rest of the month is quiet. If you are tied to the school break, book early rather than hoping — April is the year's narrowest month for warm options, so the competition for the good ones is unusually concentrated.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Why are there fewer warm places in April than in January?",
        a: "Because the two hemispheres are out of phase. In January the southern hemisphere is in high summer and carries the list; by April it has cooled, while the northern hemisphere is still warming up. The overlap is at its thinnest, so April has the fewest destinations above 75 °F of any month in the year — around 110, against more than 300 in August.",
      },
      {
        q: "Where is it warm in Europe in April?",
        a: "Very little clears 75 °F. Southern Cyprus, parts of southern Spain and the Canaries come closest. Easter travel in Europe is realistically a 68–73 °F proposition, which is fine for sightseeing and poor for swimming — the Mediterranean sea is still around 64 °F.",
      },
      {
        q: "Is April a good time for the Caribbean?",
        a: "Yes. April is the end of the Caribbean dry season and still outside hurricane season, with air and sea both in the low eighties. It is one of the better months, and prices ease after the January–March peak.",
      },
      {
        q: "Where is hot and dry in April?",
        a: "Egypt and Jordan. The Red Sea resorts and Wadi Rum record close to zero rainfall in April while staying inside the temperature range. Use the Dry filter to rank them by measured monthly rainfall.",
      },
      {
        q: "Why is April harder to book than other months?",
        a: "Two things at once. It has the fewest genuinely warm destinations of any month, and Easter concentrates demand into one or two weeks. The result is a lot of competition for a short list. Booking early matters more here than in months with more choice.",
      },
    ],
  },

  may: {
    title: "Warm Places to Visit in May | Flyamba",
    description:
      "May is when Europe switches on: around 75 Mediterranean destinations cross 75°F at once. See all of them plus the tropics, warmest first.",
    h1: "Where Is It Warm in May?",
    intro:
      "May is the month Europe switches on. After four months with essentially nothing above 75 °F, around seventy-five European destinations cross the line at once — and the warm list nearly doubles from April as a result.",
    sections: [
      {
        h2: "Where the warmth actually is in May",
        body: [
          "The Mediterranean is the story. Athens, Seville, Málaga, Sicily, Cyprus and the Greek islands all arrive in the range during May, and they arrive without the crowds or the prices of July. Marrakech is in the low eighties. The catch is the sea: Mediterranean water is still around 64–66 °F in May, so this is warm-air, cold-water weather. The Warm sea filter will show you that honestly rather than letting the air temperature imply something it should not.",
          "Outside Europe, the tropics carry on unchanged — Singapore, Phuket and Cancún in the mid-eighties — and the Indian Ocean has some of the warmest sea of the year, with Koh Phangan and Langkawi around 88–90 °F.",
        ],
      },
      {
        h2: "Warm air, cold water",
        body: [
          "May is the clearest case on the whole site of a month that measures warm and does not feel it. Santorini averages 69 °F with the sea at 66 °F. Palma is 72 °F with 68 °F water. The Mediterranean warms weeks behind its own air, so May delivers the temperature of a beach holiday without the beach.",
          "Where the water has caught up, it has caught up completely. Montego Bay is 85 °F air and 85 °F sea, and Hurghada is 88 °F with a 76 °F sea on zero recorded rainfall. The gap between those and Santorini is not temperature — it is what the sea has been doing since February.",
        ],
      },
      {
        h2: "Flying there in May",
        body: [
          "May is the month the calendar works in your favour. Memorial Day weekend is the one spike, and either side of it the Mediterranean is open without the school-holiday demand that arrives in late June. If your dates can move, the first three weeks of May buy the same weather as July on a quieter airport and a quieter beach.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Is May warm enough for the Mediterranean?",
        a: "The air is. Athens, Seville, Málaga, Cyprus and the Greek islands all average above 75 °F in May, and it is one of the most pleasant months to be there. The sea is a different matter — around 64–66 °F, which is bracing rather than inviting. Use the Warm sea filter to see which destinations actually have swimmable water this month.",
      },
      {
        q: "Where is it warm in May?",
        a: "Around 190 destinations average a daily high above 75 °F, roughly seventy-five of them in Europe. The rest are the year-round tropics — Southeast Asia, the Caribbean, equatorial Africa — plus Morocco and the Gulf.",
      },
      {
        q: "Is May a good time to travel to Europe?",
        a: "For warmth without crowds, it is hard to beat. May delivers temperatures close to what July offers in much of the Mediterranean, at lower prices and with far fewer people. The compromise is sea temperature and slightly less settled weather.",
      },
      {
        q: "Where has the warmest sea in May?",
        a: "Southeast Asia and the Indian Ocean. Koh Phangan, Langkawi and the Andaman coast are around 88–90 °F, among the warmest water anywhere in the year. The Caribbean is in the low eighties. The Mediterranean is not close.",
      },
      {
        q: "Is May a good month to book?",
        a: "One of the best. Memorial Day weekend is the only real spike, and either side of it the Mediterranean is open before the school holidays arrive in late June. Six to eight weeks ahead is comfortable, and midweek departures are noticeably quieter than weekends.",
      },
    ],
  },

  june: {
    title: "Warm Places to Visit in June | Flyamba",
    description:
      "June brings around 180 European destinations above 75°F, with the sea finally catching up. See every warm destination, sorted warmest first.",
    h1: "Where Is It Warm in June?",
    intro:
      "June is when the warm list stops being a shortlist. Around 300 destinations clear 75 °F — roughly three times April's figure — and about 180 of them are in Europe. The Mediterranean sea has finally caught up with the air.",
    sections: [
      {
        h2: "Where the warmth actually is in June",
        body: [
          "Almost everywhere in southern Europe qualifies now, and June is the month the sea becomes the point rather than the caveat: Mediterranean water climbs into the low seventies, warm enough that swimming stops being a dare. Marrakech is around 88 °F, Athens 86 °F, Madrid in the low eighties. The Croatian and Greek coasts are at what many people would call their best — warm, long-dayed, and a few weeks ahead of the August crush.",
          "The tropics start to divide in June. Southeast Asia is still hot but the monsoon has arrived, so the temperature holds while the rainfall climbs steeply. That is the month's one real trap, and the Dry filter is the way to see it: hot and wet reads identically to hot and dry until you look at the rainfall.",
        ],
      },
      {
        h2: "Same temperature, thirteen times the rain",
        body: [
          "June contains the sharpest contrast in the year's data. Phuket and Aruba both average 83 °F. Phuket takes 313 mm of rain that month; Aruba takes 23 mm. Identical on a temperature list, thirteen times apart on water falling out of the sky.",
          "The Mediterranean has arrived by June and the numbers show it: Palma at 80 °F air and 75 °F sea, Santorini 75 °F on 2 mm of rain. Fuerteventura records 1 mm. This is the month the European sea stops being the caveat.",
        ],
      },
      {
        h2: "Flying there in June",
        body: [
          "June is the handover month. The first half still prices like spring; the second half, once school years end across the US and Europe, prices like summer. That transition is sharp rather than gradual, so a week earlier is worth more in June than in almost any other month.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Is June a good time for the Mediterranean?",
        a: "It is one of the best. Air temperatures are in the high seventies to high eighties across southern Europe, the sea has warmed into the low seventies, and the peak-season crowds and prices of July and August have not arrived. Greece, Croatia, Spain and southern Italy all qualify.",
      },
      {
        q: "Where is it warm in June?",
        a: "Around 300 destinations average above 75 °F, about 180 of them European. Outside Europe the Caribbean, Mexico, the year-round tropics and North Africa all qualify. Marrakech at around 88 °F is among the warmest places on the list that is still a short flight from Europe.",
      },
      {
        q: "Is Southeast Asia good in June?",
        a: "It is hot, but the monsoon has started. Temperatures hold in the mid-eighties while rainfall climbs sharply — the air figure looks identical to January's, and the experience is not. Use the Dry filter to separate the two.",
      },
      {
        q: "Where is warm in June without being too hot at night?",
        a: "Use the Cool nights filter, which reads the measured overnight low rather than the daytime high. It rules out much of the southern Mediterranean and the Gulf in June, and tends to leave coastal and higher-altitude destinations where the temperature actually drops after dark.",
      },
      {
        q: "Why does timing matter so much in June?",
        a: "Because June is a handover month. The first half prices like spring and the second half — once school years end across the US and Europe — prices like summer, and the transition is sharp rather than gradual. A week earlier is worth more in June than in almost any other month.",
      },
    ],
  },

  july: {
    title: "Warm Places to Visit in July | Flyamba",
    description:
      "July is peak northern summer — over 300 destinations above 75°F. The question becomes where is too hot. See the full list, warmest first.",
    h1: "Where Is It Warm in July?",
    intro:
      "In July the question inverts. More than three hundred destinations clear 75 °F, so the useful question is no longer where is warm but where is too hot — and the answer includes a lot of places people book anyway.",
    sections: [
      {
        h2: "Where the warmth actually is in July",
        body: [
          "Europe is at its peak: Rome, Palma, Ibiza and Florence all in the mid-to-high eighties, the Mediterranean sea in the mid-seventies, and every coast on the continent open. Miami and Key West have sea temperatures around 90 °F, which is bathwater. Southeast Asia continues hot and wet.",
          "The Gulf and the desert belt are the places to be careful with. Riyadh averages 115 °F in July, Kuwait 112 °F, Phoenix 110 °F, Dubai 108 °F. This page's default range stops at 88 °F precisely so those do not dominate the top of the list — but they are still there if you drag the upper end up, and it is worth knowing that is what you would be choosing.",
        ],
      },
      {
        h2: "The measurements behind July",
        body: [
          "July is when the sea stops being a compromise anywhere in the northern hemisphere. Miami reaches 90 °F in the water and Key West 89 °F — bathwater by any definition. Palma is 82 °F, Santorini 76 °F, and both are dry: 12 mm and effectively zero.",
          "The desert numbers are worth reading as a warning rather than an invitation. Dubai averages 108 °F air with a 94 °F sea, and Hurghada 95 °F on zero rain. Water that warm stops cooling you down, which is the part a temperature ranking cannot tell you.",
        ],
      },
      {
        h2: "Flying there in July",
        body: [
          "July is peak almost everywhere in the northern hemisphere, and the Fourth of July week is its own spike on top of that. There is no clever week to find — the useful flexibility in July is in the destination rather than the date. Somewhere that is not in peak season will beat any date trick on a route that is.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Where is it warm in July?",
        a: "Almost everywhere in the northern hemisphere. Over 300 destinations average above 75 °F, around 180 of them in Europe. Rome, Palma, Ibiza and Bangkok are all around 88 °F, and the Mediterranean is at its warmest for swimming.",
      },
      {
        q: "Where is too hot in July?",
        a: "The Gulf and the desert belt. Riyadh averages 115 °F, Kuwait 112 °F, Phoenix 110 °F and Dubai 108 °F. This page's temperature range stops at 88 °F by default so those do not fill the first screen — raise the upper end if you want to see them.",
      },
      {
        q: "Is the Mediterranean sea warm in July?",
        a: "Yes. Mediterranean sea temperatures reach the mid-seventies in July, which is the warmest they get outside August and September. Miami and the Florida Keys are warmer still at around 90 °F.",
      },
      {
        q: "Where is warm in July without the crowds?",
        a: "July is peak season almost everywhere in the northern hemisphere, so the honest answer is that quiet and warm rarely coincide this month. The southern hemisphere is the exception — it is winter there, but places like Cape Town and northern Australia stay mild. Filter by region to see what a given continent offers.",
      },
      {
        q: "How do I avoid peak prices in July?",
        a: "Change the destination rather than the date. July is peak almost everywhere in the northern hemisphere and the Fourth of July week is a spike on top of that, so there is no clever week to find. Somewhere that is not in its own peak season will beat any date trick on a route that is.",
      },
    ],
  },

  august: {
    title: "Warm Places to Visit in August | Flyamba",
    description:
      "August is the warmest month by count: over 310 destinations above 75°F, with the sea at its annual peak. See the full list, warmest first.",
    h1: "Where Is It Warm in August?",
    intro:
      "August is the warmest month of the year by simple count: more destinations clear 75 °F than in any other month, and the sea is at its annual peak almost everywhere in the northern hemisphere.",
    sections: [
      {
        h2: "Where the warmth actually is in August",
        body: [
          "Around 180 European destinations qualify, and the sea is finally as warm as the air suggests — the Mediterranean holds its heat into August and September better than it warms in spring, which is why late summer swimming is better than early summer swimming. Palma, Ibiza and Rome sit in the mid-eighties, Tenerife at 84 °F with the Atlantic to temper it.",
          "August is also the month southern Africa becomes interesting for dry heat. Victoria Falls and Lusaka record essentially no rain, sitting inside the range in what is their winter. It is the opposite of the tropical picture, where August is deep monsoon.",
        ],
      },
      {
        h2: "The measurements behind August",
        body: [
          "August is the driest the Mediterranean gets and among the wettest the Caribbean gets, at almost the same temperature. Santorini averages 79 °F air, 79 °F sea and 1 mm of rain. Montego Bay is 87 °F with an 87 °F sea and 184 mm.",
          "Both are genuinely warm. One is a settled fortnight and the other is a hurricane-season month with afternoon rain built into the average, and only the rainfall column says so.",
        ],
      },
      {
        h2: "Flying there in August",
        body: [
          "August rewards waiting. The last week behaves like September on much of southern Europe, with school holidays over across most of the US, while the sea is still at its annual peak. If you can push a trip back a fortnight, late August is one of the better trades in the calendar.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Is August the warmest month?",
        a: "By count, yes. More destinations in the catalog average a daily high above 75 °F in August than in any other month — over 310, against around 110 in April. The northern hemisphere is at its peak and the sea has had all summer to warm up.",
      },
      {
        q: "Where has the warmest sea in August?",
        a: "Miami, Key West and the Gulf of Mexico are around 90 °F, along with parts of Southeast Asia. The Mediterranean is in the mid-to-high seventies, its warmest of the year. Use the Warm sea filter to rank by measured sea temperature rather than air.",
      },
      {
        q: "Where is warm in August but not crowded?",
        a: "Southern Africa. Victoria Falls, Lusaka and much of the region sit inside the temperature range in August with almost no rain, in what is their dry winter — the inverse of the European peak. Filter by region to see the full set.",
      },
      {
        q: "Where is too hot at night in August?",
        a: "Much of the southern Mediterranean, the Gulf and the tropics stay above 72 °F overnight in August. The Cool nights filter reads the measured overnight low and hides them, which usually leaves coastal, Atlantic-facing and higher-altitude destinations.",
      },
      {
        q: "Is it better to travel early or late in August?",
        a: "Late. The last week behaves like September on much of southern Europe, with US school holidays over, while the sea is still at its annual peak. Pushing a trip back a fortnight is one of the better trades in the calendar.",
      },
    ],
  },

  september: {
    title: "Warm Places to Visit in September | Flyamba",
    description:
      "September keeps August's sea and loses August's crowds — around 150 European destinations still clear 75°F. See every warm destination.",
    h1: "Where Is It Warm in September?",
    intro:
      "September is the month that keeps August's sea and loses August's crowds. Around 150 European destinations still clear 75 °F, and the Mediterranean is as warm for swimming as it has been all year.",
    sections: [
      {
        h2: "Where the warmth actually is in September",
        body: [
          "The Mediterranean holds through September far better than most people expect — Athens and Ibiza in the low eighties, Tenerife at 82 °F, the Greek and Croatian coasts still fully open. Water temperature lags air temperature by about six weeks, which is why September swimming beats June swimming even though the air is cooler.",
          "The Caribbean is warm and worth a caveat: sea temperatures around 88 °F, but September is the statistical peak of the Atlantic hurricane season. The figures on this page describe averages, not risk, and that is one place where the average does not tell you what you need to know.",
        ],
      },
      {
        h2: "The measurements behind September",
        body: [
          "September is the month the Mediterranean's numbers are at their best and least known. Santorini holds 76 °F air with a 77 °F sea on 8 mm of rain and 353 hours of sun — warmer water than June, drier than May, and after the crowds have gone.",
          "The Caribbean is warmer and much wetter. Montego Bay is 87 °F with an 88 °F sea, but 171 mm of rain, and Cancún 182 mm. Water temperature and storm season are driven by the same heat, which is why September gives you the best swimming and the highest risk in the same figure.",
        ],
      },
      {
        h2: "Flying there in September",
        body: [
          "September's dividing line is Labor Day, and it is a hard one. Before it, summer pricing; after it, the quietest and best-value stretch of the northern year. If you are choosing between late August and mid-September, the second is cheaper, emptier and warmer in the water.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Is September still warm in the Mediterranean?",
        a: "Yes, and the sea is at its best. Athens, Ibiza and much of the Greek and Croatian coast average above 80 °F in September, and Mediterranean sea temperatures are at or near their annual peak because water warms and cools more slowly than air.",
      },
      {
        q: "Is September better than June for a beach holiday?",
        a: "For swimming, usually yes. Air temperatures are similar, but the sea is several degrees warmer in September after a full summer of heating, where in June it is still catching up. June has more settled weather; September has warmer water and lower prices.",
      },
      {
        q: "Is the Caribbean safe to visit in September?",
        a: "September is the statistical peak of the Atlantic hurricane season. The temperatures shown here are monthly averages and say nothing about storm risk, so check forecasts and travel insurance separately. Sea temperatures around 88 °F are what drive both the swimming and the storms.",
      },
      {
        q: "Where is it warm in September?",
        a: "Around 300 destinations average above 75 °F, roughly half of them European. Bangkok is around 88 °F, Cancún 84 °F, and Tenerife, Ibiza and Athens all sit in the low eighties.",
      },
      {
        q: "When does September get cheaper?",
        a: "After Labor Day, and the line is a hard one. Before it you are paying summer prices; after it comes the quietest and best-value stretch of the northern year, with warmer sea than June. If you are choosing between late August and mid-September, the second is emptier and warmer in the water.",
      },
    ],
  },

  october: {
    title: "Warm Places to Visit in October | Flyamba",
    description:
      "October halves Europe's warm list. Madeira, the Azores and the Canaries hold on while the tropics take over. See the full list, warmest first.",
    h1: "Where Is It Warm in October?",
    intro:
      "October halves Europe's warm list — from around 150 destinations above 75 °F in September to roughly 77. What holds on is the Atlantic islands, southern Spain and the eastern Mediterranean, and the Atlantic islands hold on best.",
    sections: [
      {
        h2: "Where the warmth actually is in October",
        body: [
          "The Atlantic islands are the strongest European answer, and it is not the one most people expect: Madeira and the Azores are around 82 °F in October, warmer than Tenerife at 79 °F, with Fuerteventura at 77 °F and almost no rain. The Costa del Sol, Seville and Córdoba all still qualify, as do Cyprus, Malta and the Turkish and Greek coasts. Marrakech at around 81 °F is the short-haul alternative outside Europe.",
          "October has the warmest sea of any month on this list — more destinations clear 82 °F now than at any other point in the year, because the tropics have had all summer to heat and the northern hemisphere has not yet cooled. Cuba, Jamaica and much of Southeast Asia are in that group.",
        ],
      },
      {
        h2: "The measurements behind October",
        body: [
          "October has the warmest sea of any month on this page, and the rainfall to go with it. Aruba records an 87 °F sea, Turks & Caicos 87 °F, Montego Bay 88 °F — all warmer than in July. Aruba also takes 102 mm of rain, four times its March figure.",
          "The Atlantic islands are the opposite trade: Fuerteventura is 77 °F air, 75 °F sea and 7 mm of rain across the whole month, with 327 hours of sunshine. Cooler water, almost no weather.",
        ],
      },
      {
        h2: "Flying there in October",
        body: [
          "October is a quiet month with two exceptions: Columbus Day weekend, and the school half-terms that land in the middle of it in much of Europe. Around those it is genuinely soft — one of the few months where booking closer in does not usually cost you.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Where is it warm in Europe in October?",
        a: "Around 77 European destinations still average above 75 °F. Madeira and the Azores lead at roughly 82 °F, ahead of Tenerife at 79 °F and Fuerteventura at 77 °F. Southern Spain, Cyprus, Malta and the Turkish and Greek coasts all still qualify, though they fall away through November.",
      },
      {
        q: "Is October a good time for Morocco?",
        a: "It is one of the best months. Marrakech averages around 81 °F in October — comfortably warm without the extreme summer heat — and rainfall is minimal. Essaouira and the Atlantic coast are cooler and windier.",
      },
      {
        q: "Where has the warmest sea in October?",
        a: "October has more destinations above 82 °F sea temperature than any other month, because tropical water has had the whole summer to warm and has not started cooling. Cuba, Jamaica, Southeast Asia and West Africa all qualify. Use the Warm sea filter to rank them.",
      },
      {
        q: "Is Southeast Asia good in October?",
        a: "It depends heavily on which coast. The monsoon retreats at different times across the region, so two destinations at the same temperature can have very different rainfall. Use the Dry filter — it reads measured monthly rainfall and separates them.",
      },
      {
        q: "Do I need to book October far ahead?",
        a: "Less than most months. October is genuinely soft apart from Columbus Day weekend and the European school half-terms in the middle of it. It is one of the few months where booking closer in does not usually cost you.",
      },
    ],
  },

  november: {
    title: "Warm Places to Visit in November | Flyamba",
    description:
      "By November Europe is down to Madeira, the Azores and Tenerife, and the tropics are back in dry season. See every destination above 75°F.",
    h1: "Where Is It Warm in November?",
    intro:
      "By November Europe is down to three destinations — Madeira, the Azores and Tenerife. The warm list halves again from October, and what is left is the winter pattern that holds until spring: Southeast Asia, the Gulf, the Caribbean and the southern hemisphere.",
    sections: [
      {
        h2: "Where the warmth actually is in November",
        body: [
          "Thailand's dry season begins, and Bangkok at around 88 °F is one of the warmest places on the list. Dubai returns to the mid-eighties as the Gulf becomes habitable again — November through March is its season. The Caribbean comes out of hurricane season, and the southern hemisphere is warming toward its summer.",
          "November has the most destinations with sea temperatures above 82 °F of any month bar October, so if swimming is the point this is a strong month for it. Singapore, Kota Kinabalu and the Andaman coast are all around 86–88 °F in the water.",
        ],
      },
      {
        h2: "84 °F and 188 mm, or 72 °F and 9 mm",
        body: [
          "November is the month where two reasonable answers point in opposite directions. Phuket averages 84 °F — comfortably the warmer option — on 188 mm of rain and only 249 hours of sunshine. Fuerteventura is 72 °F with 9 mm and 295 hours. Twelve degrees against twenty times the rain.",
          "Bali makes the point harder still: 73 °F in the air, an 85 °F sea, and 354 mm of rain. The water is the warmest on this page and the month is a washout. A single temperature figure cannot carry that, which is what the rain and sea filters are for.",
        ],
      },
      {
        h2: "Flying there in November",
        body: [
          "November is two different months on either side of Thanksgiving. The week itself is the single most expensive stretch of the American travel year and the least flexible — book it months out or not at all. Around it, November is a good time to fly long-haul: Southeast Asia's dry season is starting and Christmas pricing has not begun.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Where is it warm in November?",
        a: "Around 150 destinations average above 75 °F. Bangkok is near 88 °F, Dubai 86 °F, Phuket 84 °F, and Singapore and Cancún are in the low eighties. Europe is down to three: Madeira and the Azores at around 79 °F, and Tenerife at 75 °F.",
      },
      {
        q: "Is November a good time for Thailand?",
        a: "It is the start of the best stretch. The monsoon retreats through November and the dry season runs to around March, so temperatures in the mid-to-high eighties come with steadily falling rainfall. Use the Dry filter to see how the coasts differ.",
      },
      {
        q: "Is Dubai warm in November?",
        a: "Around 86 °F, and this is when the Gulf becomes pleasant again after a summer above 100 °F. November through March is the region's season, with almost no rain and warm sea temperatures.",
      },
      {
        q: "Where can I swim in November?",
        a: "November has one of the highest counts of destinations with sea temperatures above 82 °F in the year — around 75 of them. Singapore, Malaysian Borneo, the Andaman coast and the Caribbean all qualify. Use the Warm sea filter to rank by measured sea temperature.",
      },
      {
        q: "What should I know about booking in November?",
        a: "Thanksgiving week is the single most expensive and least flexible stretch of the American travel year — book it months out or not at all. Around it, November is a good time for long-haul: Southeast Asia's dry season is starting and Christmas pricing has not begun.",
      },
    ],
  },

  december: {
    title: "Warm Places to Visit in December | Flyamba",
    description:
      "December warmth means long haul: Southeast Asia in dry season, the Caribbean and the southern hemisphere. See every destination above 75°F.",
    h1: "Where Is It Warm in December?",
    intro:
      "December warmth means going a long way. Around 140 destinations clear 75 °F and only two are in Europe — Madeira and the Azores, both scraping the line. The rest is Southeast Asia in dry season, the Caribbean, the Gulf, and a southern hemisphere heading into its summer.",
    sections: [
      {
        h2: "Where the warmth actually is in December",
        body: [
          "Thailand is in the middle of its best stretch: Bangkok around 88 °F, Phuket 84 °F, with the rain gone and the humidity down. The Caribbean is at the start of its peak season, dry and outside hurricane season. Dubai at around 79 °F is mild rather than hot and is at its most walkable. And the southern hemisphere is in summer, which is why Cape Town and Sydney read as warm in the northern midwinter.",
          "The Indian Ocean has some of the warmest water of the year in December — Bali, Zanzibar and the East African coast are all around 86 °F — which is what makes them a Christmas destination rather than a coincidence.",
        ],
      },
      {
        h2: "The measurements behind December",
        body: [
          "December's numbers reward reading past the headline. Bali shows an 86 °F sea, among the warmest anywhere, with 466 mm of rain — the wettest figure in the year's data. Turks & Caicos is cooler in the water at 81 °F but takes 44 mm and logs 315 hours of sun.",
          "Zanzibar sits between them at 86 °F air, 86 °F sea and 107 mm. The Canaries are the European floor: Fuerteventura at 66 °F air and a 71 °F sea, dry at 13 mm, mild rather than warm.",
        ],
      },
      {
        h2: "Flying there in December",
        body: [
          "December has a cliff edge, and it falls around the 18th. Before it, fares behave like a normal low-season month and the first week is among the cheapest of the winter. After it, they behave like nothing else in the year. If the holidays themselves are fixed, book three to five months ahead — December is the one month where waiting reliably costs money.",
          "Three things move a fare more than the destination does. Book six to eight weeks ahead for short-haul and two to three months for long-haul or peak season — later than that and you are usually paying for someone else's cancellation. Fly midweek: leisure demand clusters on Friday evenings and Sunday returns, and a Tuesday departure is routinely cheaper for the same trip. And shift your dates before you shop for airlines — a day or two either side of a holiday weekend saves more than any loyalty programme. The low fare calendar shows which days are actually cheapest on our busiest routes.",
          HOW_IT_WORKS,
        ],
      },
    ],
    faq: [
      {
        q: "Where is it warm in December?",
        a: "Around 140 destinations average above 75 °F: Southeast Asia in dry season, the Caribbean, the Gulf, equatorial Africa and the southern hemisphere. Bangkok is near 88 °F, Phuket and Singapore in the low-to-mid eighties. In Europe only Madeira and the Azores qualify, at around 75 °F.",
      },
      {
        q: "Is anywhere in Europe warm at Christmas?",
        a: "Barely. Madeira and the Azores average around 75 °F in December, just inside the range, and the Canary Islands sit a little below at 70–72 °F — mild and sunny rather than warm. Drag the lower end of the range down to 65 °F to see the whole of southern Europe.",
      },
      {
        q: "Is December a good time for Thailand?",
        a: "It is the peak of the dry season and generally considered the best month. Temperatures in the mid-to-high eighties, minimal rain and lower humidity than the rest of the year. It is also the busiest and most expensive time to go.",
      },
      {
        q: "Where has the warmest sea in December?",
        a: "The Indian Ocean and equatorial Africa. Bali, Zanzibar, Accra and Lagos are around 86 °F, along with much of Southeast Asia. Use the Warm sea filter to rank by measured sea temperature for December.",
      },
      {
        q: "When should I book for December?",
        a: "Three to five months ahead if you are travelling over the holidays — December is the one month where waiting reliably costs money. The dividing line falls around the 18th: before it fares behave like a normal low-season month, and the first week is among the cheapest of the winter.",
      },
    ],
  },
};
