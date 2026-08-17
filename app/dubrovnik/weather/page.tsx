import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/dubrovnik-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Dubrovnik Weather 2026 — When to Visit | Flyamba",
  description:
    "Dubrovnik weather and the best time to visit, season by season — warm springs, hot 28°C summers with swimmable sea, golden autumns and mild winters, plus…",
  alternates: { canonical: `${SITE}/dubrovnik/weather` },
  openGraph: { title: "Dubrovnik Weather & Best Time to Visit | Flyamba", description: "Season-by-season Dubrovnik weather, sea temperatures, crowds and prices, with the best months to go.", type: "article" },
};

const INFO_IMG = "/images/destinations/placeholder.avif";

const WEATHER: BcnPlace[] = [
  {
    name: "Spring in Dubrovnik (March–May)", slug: "spring", image: INFO_IMG,
    rating: 4.7, reviewCount: 0, area: "Mar–May",
    tip: "May is glorious — warm, green and quiet before the summer rush, with the sea just about warm enough for the hardy to swim.",
    filterKeys: [],
    description: "Mild, green and increasingly warm, spring is a lovely, quieter time to visit, though the sea only warms up by late May.",
    practicalInfo: { openingHours: "Lengthening days; comfortable for walking & sightseeing", price: "Highs 14–23°C; sea 15–19°C; some rain, especially early spring", howToGetThere: "Shoulder-season fares; seasonal routes restart around April/May" },
    fullDescription: "Spring is one of the most rewarding and underrated times to visit Dubrovnik, particularly its later half. March is still cool and can be wet, with daytime highs around 14–16°C, but the city is quiet and green; by April temperatures climb to a pleasant 18–19°C and the countryside bursts into blossom; and May is genuinely lovely, with warm, sunny days of 22–23°C, long daylight hours and the landscape at its most verdant. This makes spring ideal for the active side of Dubrovnik — walking the city walls (far more comfortable than in the summer heat), hiking, exploring the Old Town and taking day trips — without the crowds and the fierce sun of peak season. The main caveat is the sea: the Adriatic warms slowly, so water temperatures sit at a bracing 15–17°C for much of spring, only becoming pleasant for swimming for the hardy towards the end of May, meaning spring is better for sightseeing than beach days. Rainfall is moderate and tails off as the season progresses, so pack layers and a light rain jacket for early spring. Crucially, spring is shoulder season, so flights and hotels are noticeably cheaper than in summer and the Old Town is calm and walkable, with the cruise-ship crush yet to peak (though it builds through May). Note too that many of Dubrovnik's seasonal direct flight routes restart around April or May. For warm, green, crowd-light sightseeing at fair prices, late spring is a superb choice.",
  },
  {
    name: "Summer in Dubrovnik (June–August)", slug: "summer", image: INFO_IMG,
    rating: 4.4, reviewCount: 0, area: "Jun–Aug",
    tip: "Walk the walls at 08:00 opening or after 16:00 to beat the heat and cruise crowds; the sea is at its warmest and swimmable well into the evening.",
    filterKeys: [],
    description: "Hot, dry and busy: summer brings peak temperatures around 28–32°C, a warm swimmable sea, big crowds and the Summer Festival.",
    practicalInfo: { openingHours: "Long daylight; sights busiest 11:00–15:00 with cruise crowds", price: "Highs 28–32°C; sea 23–26°C; very little rain", howToGetThere: "Peak-season fares & the busiest month; book accommodation with air-conditioning" },
    fullDescription: "Summer is Dubrovnik's peak season, and it delivers the classic Adriatic experience — hot, dry, sunny days, a warm turquoise sea and a buzzing, festival atmosphere — but demands a strategy to enjoy it. Daytime highs average around 28°C in June, rising to 30–32°C and occasionally higher in the peak of July and August, with abundant sunshine and very little rain; the stone Old Town, with almost no shade, can feel like an oven at midday. The great compensation is the sea, which warms to a beautiful 23–26°C, making swimming, kayaking, island-hopping and boat trips the highlight of any summer visit and offering blessed relief from the heat. This is, however, also the busiest and most expensive time: the Old Town is thronged, especially when cruise ships dock (roughly 11:00–15:00), and flight and hotel prices hit their annual high. The way to enjoy it is to adopt an early-and-late rhythm: tackle the city walls right at the 08:00 opening or after 16:00, when it is cooler and quieter, spend the fierce midday hours swimming at a beach or on the water or resting somewhere shaded, and come out again to explore and dine in the balmy, atmospheric evenings. Stay hydrated, wear sun protection and a hat, and choose accommodation with reliable air-conditioning. Summer also brings the celebrated Dubrovnik Summer Festival (July–August), filling the Old Town's squares and forts with open-air theatre, opera and music under the stars — a real bonus. Book everything well ahead, and embrace the heat by making the sea the centre of your days.",
  },
  {
    name: "Autumn in Dubrovnik (September–November)", slug: "autumn", image: INFO_IMG,
    rating: 4.7, reviewCount: 0, area: "Sep–Nov",
    tip: "September may be the best month of all — still-warm sea, summer-like sun, thinner crowds and lower prices; November turns wet and quiet.",
    filterKeys: [],
    description: "Warm early autumn with a still-swimmable sea cools into a wetter, quiet late season; September is arguably Dubrovnik's sweet spot.",
    practicalInfo: { openingHours: "Shortening days; comfortable sightseeing early autumn", price: "Highs 26°C (Sep) easing to 14°C (Nov); sea 20–24°C (Sep) to ~17°C (Nov)", howToGetThere: "Shoulder-season fares; seasonal routes wind down through October/November" },
    fullDescription: "Autumn is a wonderful time to visit Dubrovnik, and September in particular is arguably the finest month of the whole year. Early autumn still feels like summer: September brings warm, sunny highs around 25–26°C and, crucially, a sea that remains a delightful 22–24°C after a whole summer of warming, so you get beach days and swimming without the fierce midday heat, the biggest crowds or the peak prices — a near-perfect combination. October is classic shoulder-season pleasure, with comfortable days of 20–22°C, a sea still swimmable for many at around 20°C early in the month, golden light and noticeably thinner tourist numbers, ideal for walking the walls and sightseeing. As the season moves into November, the weather turns cooler and distinctly wetter — this is one of Dubrovnik's rainiest months, with highs dropping to around 14–16°C and grey, showery spells — and many seasonal flights and some tourist businesses wind down, but the reward is some of the lowest prices of the year and a calm, local feel. Autumn is also a lovely time for the food and wine of the region, with the grape and olive harvests and heartier seasonal cooking. Pack layers and rain protection for later in the season. For the sweet spot of warm weather, a swimmable sea, thinner crowds and better value, target September and early October; for bargains and tranquillity (with an umbrella), November delivers. Overall, September may be the single best month to experience Dubrovnik at its most balanced.",
  },
  {
    name: "Winter in Dubrovnik (December–February)", slug: "winter", image: INFO_IMG,
    rating: 4.2, reviewCount: 0, area: "Dec–Feb",
    tip: "Mild but wet and much quieter, with the lowest prices — good for atmospheric Old Town wandering and the winter festival, but the sea is cold and many boat trips pause.",
    filterKeys: [],
    description: "Mild by European standards but wet and low-key, winter brings the cheapest prices and emptiest streets, plus a festive Christmas season.",
    practicalInfo: { openingHours: "Shorter days; some sights & boats on reduced winter hours", price: "Highs 12–14°C; lows 5–8°C; the wettest season; sea ~14°C", howToGetThere: "Cheapest fares but fewest direct routes (often connect via a hub)" },
    fullDescription: "Winter is Dubrovnik's true low season, and it is a mixed but characterful proposition. The climate is mild by northern European standards — daytime highs typically 12–14°C, rarely dropping to freezing, with the surrounding mountains occasionally dusted in snow — but it is also the wettest time of year, with December through February bringing frequent rain, grey skies and the odd blustery storm off the Adriatic, so waterproofs are essential. The great rewards are the year's lowest flight and hotel prices and gloriously empty streets: you can wander the Old Town lanes and walk the walls (weather permitting) with barely another soul around, experiencing the city at its most intimate and local, a world away from the summer crush. It is a fine time for atmospheric sightseeing, cosy konoba dinners and soaking up the medieval setting without the crowds. The trade-offs are real, though: the sea is cold (around 14°C) and swimming is off the agenda, daylight is short, many boat trips, beach clubs and some restaurants and sights either close or run reduced winter hours, and — importantly — a good number of Dubrovnik's direct European flight routes don't operate in winter, so you may need to connect via a hub such as Frankfurt or Zagreb. The exception to the quiet is the festive season: from late November into January the Old Town hosts the Dubrovnik Winter Festival, with Christmas lights, market stalls, mulled wine, concerts and a lovely atmosphere on Stradun, and the New Year is celebrated with open-air parties. For budget-conscious travellers who prize solitude, atmosphere and low prices over beach weather, winter has genuine appeal.",
  },
  {
    name: "The best time to visit Dubrovnik", slug: "best-time-to-visit", image: INFO_IMG,
    rating: 4.8, reviewCount: 0, area: "Overview",
    tip: "Aim for June or September for the ideal balance — warm weather, a swimmable sea, lively but not overwhelming crowds and better prices than July–August.",
    filterKeys: [],
    description: "An at-a-glance verdict weighing weather, sea temperature, crowds and prices to pinpoint the ideal months for a Dubrovnik trip.",
    practicalInfo: { openingHours: "Summer destination; sweet spots in June & September", price: "Best value: May, June & September; cheapest: Feb & Nov", howToGetThere: "Match your priorities — beach, sightseeing or budget — to the season" },
    fullDescription: "The best time to visit Dubrovnik depends on what you want, but for the ideal all-round balance of warm weather, a swimmable sea, manageable crowds and reasonable prices, the clear winners are June and September — the shoulders of the peak season. In these months you get hot, sunny days of 26–28°C, an Adriatic warm enough for swimming (especially September, after a summer of warming), long daylight and a lively but not yet overwhelming atmosphere, all at flight and hotel prices below the July–August peak. May is also excellent for warm, green, crowd-light sightseeing, though the sea is still on the cool side for swimming, while early October extends the shoulder-season pleasure with golden light and thinning crowds. July and August deliver the hottest weather, the warmest sea and the buzz of the Summer Festival, but at the cost of the fiercest heat, the biggest crowds (amplified by cruise ships), and the highest prices, so they suit those tied to school holidays who don't mind the intensity and who plan an early-and-late sightseeing rhythm. At the opposite end, if your priorities are the lowest prices and the emptiest streets, and you don't mind cool, wet weather and no swimming, winter — especially February and November — is unbeatable for value and tranquillity, though direct flights are scarcer. In short: for the classic Dubrovnik of sun, sea and stone at its best-balanced, book for June or September; for beach-focused peak summer, July–August; and for budget and solitude, the winter shoulders. Whenever you go, plan around the cruise-ship hours and the summer heat, and you'll experience the pearl of the Adriatic at its finest.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Dubrovnik", item: `${SITE}/dubrovnik` },
      { "@type": "ListItem", position: 3, name: "Weather", item: `${SITE}/dubrovnik/weather` },
    ],
  };
}

export default function DubrovnikWeather() {
  return (
    <CityGuideShell
      citySlug="dubrovnik"
      cityName="Dubrovnik"
      categories={CATEGORIES}
      active="weather"
      crumb="Weather"
      h1="Dubrovnik Weather & Best Time to Visit"
      heroImage="/images/dubrovnik/attractions/old-town-harbour.webp"
      intro="Dubrovnik enjoys a classic Mediterranean climate — hot, dry summers and mild, wetter winters — and choosing when to go shapes your whole trip. Do you want a warm, swimmable sea and buzzing festival nights, or crowd-free walls and low prices? This season-by-season guide covers the weather, sea temperatures, crowds and costs across the year, and pinpoints the sweet-spot months when Dubrovnik is at its balanced best."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Dubrovnik weather by season" items={WEATHER} />
    </CityGuideShell>
  );
}
