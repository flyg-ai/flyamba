import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/paris-places";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Events in Paris 2026 — Guide | Flyamba",
  description:
    "The Paris events calendar — Bastille Day, the Fête de la Musique, Roland-Garros, Paris Fashion Week, Paris Plages, Nuit Blanche and the city's magical Christmas season. What's on month by month and how to plan around it.",
  alternates: { canonical: `${SITE}/paris/events` },
  openGraph: { title: "Paris Events & Festivals | Flyamba", description: "The best festivals and events in Paris, month by month.", type: "article" },
};

const PLACEHOLDER = "/images/barcelona/placeholder.webp";

const EVENTS: BcnPlace[] = [
  {
    name: "Roland-Garros (French Open)", slug: "roland-garros", image: PLACEHOLDER,
    rating: 4.7, area: "Late May–early June · 16th", tip: "Tickets are balloted months ahead; ground passes for the outer courts are the affordable, atmospheric way in.",
    filterKeys: [],
    description: "The clay-court Grand Slam at Stade Roland-Garros, one of the highlights of the global tennis calendar.",
    practicalInfo: { openingHours: "Two weeks, late May to early June", price: "Ground passes from ~€30; show-court tickets far higher", howToGetThere: "Métro L10 to Porte d'Auteuil or L9 to Michel-Ange–Molitor" },
    fullDescription: "For two weeks from late May into early June, Paris hosts Roland-Garros, the French Open, the only Grand Slam played on clay and one of the four biggest events in world tennis. Held at the Stade Roland-Garros on the western edge of the city near the Bois de Boulogne, it draws the sport's biggest names and a stylish, knowledgeable crowd to its ochre courts, with the roofed Court Philippe-Chatrier as the showpiece arena. Demand is enormous and tickets for the main courts are allocated by a public ballot that opens months in advance, then resold at a premium, so plan far ahead if you want a show-court seat. A cheaper, wonderfully atmospheric alternative is a grounds pass (from around €30, especially in the early rounds), which lets you roam the outer courts and watch top players up close alongside doubles and juniors. Even non-fans enjoy the buzz, the fashion and the Parisian spring setting. It's easily reached by Métro. Book or enter the ballot early, go in the first week for the best access, and pack for changeable late-spring weather.",
  },
  {
    name: "Fête de la Musique", slug: "fete-de-la-musique", image: PLACEHOLDER,
    rating: 4.6, area: "21 June · city-wide", tip: "It's free and everywhere — just wander from square to square; the Marais and Latin Quarter are especially lively.",
    filterKeys: [],
    description: "A free, city-wide music festival on the summer solstice, with live performances on every corner.",
    practicalInfo: { openingHours: "21 June, afternoon until late", price: "Free", howToGetThere: "All over the city; simply walk between neighbourhoods and stages" },
    fullDescription: "Every year on 21 June, the summer solstice, Paris throws itself into the Fête de la Musique, a joyous, entirely free music festival that fills the whole city with sound. Born in France in 1982 and now copied worldwide, the idea is beautifully simple: for one day and long into the night, anyone can play music anywhere, so the streets, squares, café terraces, parks, church steps and courtyards overflow with performances of every conceivable genre — jazz combos, rock bands, classical ensembles, DJs, choirs, buskers and amateurs alike. There's no single venue or ticket; the pleasure is wandering from neighbourhood to neighbourhood, stumbling on impromptu gigs and dancing crowds, with areas like the Marais, the Latin Quarter, Bastille and the canals particularly lively. Bars and clubs run late, and the whole city takes on a warm, celebratory, communal atmosphere on one of the longest, lightest evenings of the year. It's free, spontaneous and quintessentially Parisian summer. Simply head out on foot in the early evening, follow the music, and expect big, happy crowds and a late night — a wonderful time to be in the city.",
  },
  {
    name: "Bastille Day (Fête Nationale)", slug: "bastille-day", image: PLACEHOLDER,
    rating: 4.7, area: "14 July · Champs-Élysées & Eiffel Tower", tip: "Watch the morning parade on the Champs-Élysées, then claim a Champ de Mars spot early for the evening fireworks.",
    filterKeys: [],
    description: "France's national day, marked by a military parade on the Champs-Élysées and fireworks over the Eiffel Tower.",
    practicalInfo: { openingHours: "14 July: parade from ~10:00; fireworks ~23:00", price: "Free (public spaces)", howToGetThere: "Parade: Champs-Élysées (Métro L1). Fireworks: Champ de Mars / Trocadéro" },
    fullDescription: "Bastille Day, known in France as the Fête Nationale or simply 'le 14 juillet', is the country's national holiday, commemorating the storming of the Bastille in 1789, and Paris marks it with genuine grandeur. The day begins with Europe's oldest and largest military parade, sweeping down the Champs-Élysées from the Arc de Triomphe with troops, tanks, and a flyover of jets trailing the blue-white-red of the tricolore, watched by the President and huge crowds (arrive early for a spot along the avenue). The evening's highlight is the spectacular fireworks display staged over the Eiffel Tower, choreographed to music and visible from the Champ de Mars, the Trocadéro and viewpoints across the city — one of the great free spectacles in Europe. In between and after, the famous Bals des Pompiers (firefighters' balls) are held at fire stations across Paris on the 13th and 14th, open-to-all parties that are a beloved local tradition. Everything is free but extremely busy, so plan your transport, stake out a fireworks viewpoint on the Champ de Mars well before dark, and soak up one of the most festive and patriotic days of the Paris year.",
  },
  {
    name: "Paris Plages", slug: "paris-plages", image: PLACEHOLDER,
    rating: 4.3, area: "July–August · Seine banks & La Villette", tip: "Free deckchairs, sand and activities line the river all summer — go on a warm afternoon for the best atmosphere.",
    filterKeys: [],
    description: "The Seine banks transform into free summer 'beaches' with sand, deckchairs and activities for six weeks.",
    practicalInfo: { openingHours: "~Early July to early September, daily", price: "Free (some activities charged)", howToGetThere: "Along the Right Bank quays near Hôtel de Ville and the Bassin de la Villette" },
    fullDescription: "For about six weeks each summer, roughly early July to early September, the city runs Paris Plages, turning stretches of the Seine's banks and the Bassin de la Villette into free pop-up 'beaches' and a season-long open-air festival. Since 2002, sand, palm trees, deckchairs, parasols and beach games have been laid out along the traffic-free Right Bank quays near the Hôtel de Ville, creating a relaxed, family-friendly riverside playground in the heart of the city. Beyond simply lounging, the programme is packed with free and low-cost activities — outdoor fitness and dance classes, pétanque, live music, kids' workshops, and at the La Villette basin, swimming pools, pedal boats, kayaking and paddleboarding on the cleaned-up water. It's aimed as much at Parisians who stay in the city over the holidays as at visitors, giving the summer a convivial, local feel. Everything is free to enjoy, though some activities charge a small fee, and it makes a lovely, breezy break from sightseeing on a hot day. Head to the riverside quays or the Bassin de la Villette on a warm afternoon, bring sunscreen, and settle in among Parisians making the most of the summer.",
  },
  {
    name: "Nuit Blanche", slug: "nuit-blanche", image: PLACEHOLDER,
    rating: 4.4, area: "Early October · city-wide", tip: "Museums and installations stay open free all night — plan a walking route between the illuminated highlights.",
    filterKeys: [],
    description: "An all-night contemporary-art festival when museums and public spaces open free until dawn.",
    practicalInfo: { openingHours: "One Saturday night in early October, until ~dawn", price: "Free", howToGetThere: "Across the city; some Métro lines run extended hours" },
    fullDescription: "Nuit Blanche ('White Night', meaning a sleepless one) is Paris's celebrated all-night contemporary-art festival, held on one Saturday in early October, when the city stays awake and cultural life spills into the streets until dawn. First staged in Paris in 2002 and since imitated by cities worldwide, the free event fills museums, monuments, churches, parks, courtyards and public squares with contemporary art — large-scale light installations, projections, performances, sound pieces and interactive works — much of it in unexpected or normally inaccessible locations. Many museums and galleries throw open their doors for free through the night, and some Métro lines extend their hours to help the crowds move between the highlights. The atmosphere is unlike any other night in the city: thousands of people of all ages roam from one glowing installation to the next, giving Paris a dreamlike, festive, communal energy after dark. Pick up the published programme and map, plan a walking route between the works that appeal to you (they cluster in shifting districts each year), wear warm layers for the autumn chill, and be ready for a genuinely late night. Free, imaginative and atmospheric, it's a memorable way to experience the city's creative side.",
  },
  {
    name: "Paris Fashion Week", slug: "paris-fashion-week", image: PLACEHOLDER,
    rating: 4.3, area: "Feb–Mar & Sep–Oct", tip: "The runway shows are trade-only, but the city buzzes — spot street style and book hotels far ahead as prices spike.",
    filterKeys: [],
    description: "The world's most prestigious fashion showcase, held twice a year and electrifying the city with style.",
    practicalInfo: { openingHours: "Womenswear ~late Feb–Mar & late Sep–Oct; menswear & couture separately", price: "Shows industry-only; the atmosphere is free", howToGetThere: "Shows across the city; hotspots around the Marais, Palais de Tokyo & Tuileries" },
    fullDescription: "Paris Fashion Week is the grand finale of the international fashion calendar and cements the city's status as the world's style capital. Held several times a year — the major womenswear weeks fall in late February–March and late September–October, with separate menswear and haute couture showcases — it sees the great French and global houses, from Chanel and Dior to Saint Laurent and Louis Vuitton, stage elaborate runway shows in spectacular venues like the Grand Palais, the Tuileries and museum courtyards. The actual shows are strictly industry-only, reserved for buyers, press and celebrities, so ordinary visitors can't simply attend, but the whole city crackles with energy during the weeks: front-row stars, extraordinary street style outside the venues, pop-up events, window displays and a palpable buzz in the fashionable districts. For visitors who love style, it's fun to soak up the atmosphere, watch the street-style photographers at work around show locations, and browse the boutiques of the Marais, Saint-Honoré and Saint-Germain. The practical catch is demand: hotel rooms grow scarce and expensive and restaurants book up during fashion weeks, so if your trip coincides, reserve accommodation and tables well in advance.",
  },
  {
    name: "Christmas & New Year in Paris", slug: "christmas-new-year", image: PLACEHOLDER,
    rating: 4.6, area: "December–early January", tip: "See the department-store windows and Champs-Élysées lights, then ring in the new year near the Eiffel Tower.",
    filterKeys: [],
    description: "The festive season brings lights, markets, ice rinks and magical department-store windows across the city.",
    practicalInfo: { openingHours: "Lights & markets ~mid-Nov to early Jan", price: "Free to enjoy the lights and windows", howToGetThere: "Champs-Élysées, Galeries Lafayette & Printemps (Métro to Opéra/Concorde)" },
    fullDescription: "Paris at Christmas is genuinely magical, and the festive season transforms the city from mid-November into early January. The grand boulevards and the Champs-Élysées are strung with spectacular illuminations, while the great department stores — Galeries Lafayette and Printemps on Boulevard Haussmann — unveil their famous animated window displays and, inside Galeries Lafayette, an enormous Christmas tree beneath the stained-glass dome, a free spectacle that draws crowds every year. Christmas markets set up around the city (the largest at La Défense, plus smaller ones at Notre-Dame, the Tuileries and elsewhere), selling mulled wine, crafts and festive food, and open-air ice rinks and the Tuileries funfair add to the fun. It's a romantic, atmospheric — if cold and busy — time to visit, with prices high over the holidays themselves. New Year's Eve is celebrated in style, with huge crowds gathering on the Champs-Élysées and around the Eiffel Tower for a light show and countdown as the year turns. Wrap up warmly, expect chilly, dark evenings and holiday crowds, book restaurants for Christmas and New Year meals well ahead, and enjoy the lights, windows and markets, most of which cost nothing to admire.",
  },
];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Paris", item: `${SITE}/paris` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/paris/events` },
    ],
  };
}

export default function ParisEvents() {
  return (
    <CityGuideShell
      citySlug="paris"
      cityName="Paris"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Paris Events & Festivals"
      heroImage="/images/paris/sevardheter/seine-kryssning-bateaux-parisiens.webp"
      intro="There is always something on in Paris, and timing your visit to an event can make a trip unforgettable. The calendar runs from the clay-court drama of Roland-Garros in late spring through a summer of music and fireworks — the Fête de la Musique, Bastille Day and the riverside Paris Plages — into the all-night art of Nuit Blanche, the glamour of Fashion Week and the sparkling magic of the Christmas season. Here are the events worth planning around, month by month, with dates, locations and tips on how to enjoy them."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Paris events in detail" items={EVENTS} />
    </CityGuideShell>
  );
}
