import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/cape-town-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Cape Town Events & Festivals 2026 — What's On | Flyamba",
  description:
    "Cape Town's best events — the Cape Town Jazz Festival, Kirstenbosch summer sunset concerts, the Cape Town Carnival, the Two Oceans Marathon, the Kaapse…",
  alternates: { canonical: `${SITE}/cape-town/events` },
  openGraph: { title: "Cape Town Events & Festivals | Flyamba", description: "Jazz, sunset concerts, carnival and marathons — Cape Town's event calendar.", type: "article" },
};

const IMG = "/images/destinations/flights-kapstaden.avif";

const INFO: BcnPlace[] = [
  {
    name: "Cape Town International Jazz Festival", slug: "jazz-festival", image: IMG, rating: 5, area: "CTICC / city centre",
    tip: "It's one of Africa's biggest jazz events — weekend passes sell out, so book as soon as the line-up is announced.",
    filterKeys: [],
    description: "Africa's grandest gathering of jazz, held over a weekend at the convention centre each autumn.",
    practicalInfo: { openingHours: "One weekend, usually March/April", price: "Weekend passes (paid)", howToGetThere: "Cape Town International Convention Centre (CTICC), city centre" },
    fullDescription: "Billed as 'Africa's Grandest Gathering', the Cape Town International Jazz Festival is the continent's largest jazz event and the highlight of the city's music calendar. Held over a weekend, usually in autumn (March or April), across multiple stages at the Cape Town International Convention Centre, it brings together dozens of local and international artists spanning jazz, soul, Afro-fusion and more, drawing tens of thousands of fans. Beyond the ticketed festival, a free community concert on Greenmarket Square in the run-up gives the whole city a taste. It's a superb reason to visit at the tail end of summer, when the weather is still warm and the vineyards are harvesting. Tickets — sold as single-day or weekend passes — go fast once the line-up drops, so book early and pair the festival with a few days exploring the Cape. Check the official festival site for dates and the annual programme, which shifts each year.",
  },
  {
    name: "Kirstenbosch Summer Sunset Concerts", slug: "kirstenbosch-concerts", image: IMG, rating: 5, area: "Kirstenbosch, Newlands",
    tip: "Bring a picnic, blanket and warm layer, and arrive when the gates open (around 16:00) to claim a spot on the lawn.",
    filterKeys: [],
    description: "Sunday-evening live music on the lawns of the world-famous botanical garden, all summer long.",
    practicalInfo: { openingHours: "Sunday evenings, late Nov to early April", price: "Ticketed (moderate)", howToGetThere: "Kirstenbosch National Botanical Garden, Newlands" },
    fullDescription: "One of Cape Town's most beloved summer traditions, the Kirstenbosch Summer Sunset Concerts run on Sunday evenings from late November to early April on the sweeping lawns of the world-renowned botanical garden, beneath the eastern slopes of Table Mountain. Locals and visitors spread out picnics, uncork Cape wine and settle on the grass as the light softens, while a weekly rotation of South African bands and artists — pop, rock, folk, jazz, tribute acts — plays against one of the most beautiful natural backdrops imaginable. It's relaxed, family-friendly and quintessentially Capetonian, and a wonderful way to spend a summer evening. Bring a blanket, a picnic (or buy food and drink on site), cash for parking, and a warm layer for when the sun drops behind the mountain. Tickets are sold per concert and popular acts can sell out, so book ahead and arrive early — gates open around 4pm — to grab a good patch of lawn before the music starts.",
  },
  {
    name: "Cape Town Carnival", slug: "carnival", image: IMG, rating: 5, area: "Sea Point / Green Point",
    tip: "The parade is free — line the Fan Walk or Somerset Road early evening for the best view of the floats and costumes.",
    filterKeys: [],
    description: "A vibrant, free street parade of floats, costumes and music celebrating the city's diversity.",
    practicalInfo: { openingHours: "One evening, usually March", price: "Free", howToGetThere: "Along the Green Point Fan Walk / Somerset Road" },
    fullDescription: "The Cape Town Carnival is a joyful, free celebration of the city's cultural diversity — a nighttime street parade of elaborate illuminated floats, costumed dancers, drummers, stilt-walkers and community groups that winds along the Green Point Fan Walk near the stadium, usually on an evening in March. Built around a new theme each year, it draws tens of thousands of spectators lining the route, with a festive, family-friendly atmosphere and food and drink stalls. It grew out of Cape Town's rich carnival heritage and now serves as a showcase of local creativity and social cohesion. Because it's free and popular, arrive early in the evening to secure a good viewing spot along the barriers, and expect crowds and road closures around the stadium precinct. It pairs well with the tail end of the warm summer season. Combined with the nearby V&A Waterfront and Sea Point promenade, it makes for a memorable big-city night out — check the official site for the year's date, theme and exact route.",
  },
  {
    name: "Two Oceans Marathon", slug: "two-oceans-marathon", image: IMG, rating: 5, area: "Southern Peninsula",
    tip: "Even if you're not running, the Chapman's Peak and Constantia Nek sections are spectacular spots to cheer and watch.",
    filterKeys: [],
    description: "'The world's most beautiful marathon' — an Easter ultra along the Cape Peninsula's coast.",
    practicalInfo: { openingHours: "Easter weekend (March/April)", price: "Entry for runners; free to spectate", howToGetThere: "Route runs the southern peninsula from Newlands" },
    fullDescription: "Dubbed 'the world's most beautiful marathon', the Two Oceans is a Cape Town institution held over the Easter weekend, centred on a 56 km ultra-marathon (plus a popular half and shorter fun runs) that loops the southern peninsula. The ultra route takes runners past the Constantia vineyards, up and over the jaw-dropping Chapman's Peak coastal road and along the shoreline where the Atlantic and Indian Ocean influences meet — scenery that more than earns the marathon its nickname. Tens of thousands take part and many more line the course, giving the whole peninsula a festival atmosphere for the weekend. For runners it's a bucket-list event (entries open months ahead and fill fast); for everyone else, the Chapman's Peak and Constantia Nek vantage points are wonderful, free places to watch and cheer. It falls in autumn when Cape Town's weather is often at its most settled. Whether competing or spectating, it's a brilliant reason to time an Easter trip to the Cape — check the official site for dates and entries.",
  },
  {
    name: "First Thursdays & the Kaapse Klopse", slug: "first-thursdays-klopse", image: IMG, rating: 5, area: "City centre",
    tip: "First Thursdays galleries stay open late and are free; for the Klopse minstrel carnival, head to the city centre on 2 January.",
    filterKeys: [],
    description: "A monthly late-night art crawl, plus the colourful January minstrel carnival.",
    practicalInfo: { openingHours: "First Thursday each month; Klopse on 2 January", price: "Free", howToGetThere: "City-centre galleries; Klopse parades through the CBD & Bo-Kaap" },
    fullDescription: "Two very different city-centre traditions round out Cape Town's calendar. First Thursdays turns the first Thursday of every month into a free, buzzing cultural crawl: galleries, museums and shops around the city centre (especially around Church and Bree streets) stay open into the evening, streets fill with people, pop-up bars and street food, and the whole downtown takes on a festival feel — an easy, sociable way to sample the city's creative scene. On a grander scale, the Kaapse Klopse (Cape Town Minstrel Carnival), held on 2 January, is one of the city's oldest and most vibrant traditions: thousands of costumed minstrels in dazzling satin and face paint parade through the CBD and Bo-Kaap with banjos, drums and song, a joyful celebration rooted in Cape Malay heritage. Both are free and deeply local. First Thursdays needs no planning — just turn up; for the Klopse, get into the city centre early on 2 January and expect crowds and road closures. Together they show off Cape Town's creativity and community year-round.",
  },
];


export default function CapeTownEvents() {
  return (
    <CityGuideShell
      citySlug="cape-town"
      cityName="Cape Town"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="Cape Town Events & Festivals"
      heroImage={IMG}
      intro="Cape Town's events lean into its outdoor, creative spirit — jazz weekends, sunset concerts on botanical-garden lawns, a glittering street carnival, one of the world's most scenic marathons and a monthly downtown art crawl. Most of the biggest happen in the warm summer months (roughly November to April), when the city is at its liveliest. Here's what's on and when, so you can time your trip to catch Cape Town in full swing."
      wide
    >
      <CategorySeoSections heading="Cape Town's events — in detail" items={INFO} />
    </CityGuideShell>
  );
}
