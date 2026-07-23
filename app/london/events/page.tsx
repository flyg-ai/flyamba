import type { Metadata } from "next";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import { CATEGORIES } from "@/app/data/london-places";

const SITE = "https://flyamba.com";

export const metadata: Metadata = {
  title: "Events in London 2026 — Festivals & What's On | Flyamba",
  description:
    "London's biggest annual events month by month — New Year fireworks, the Marathon, Chelsea Flower Show, Trooping the Colour, Wimbledon, Pride, Notting Hill Carnival and Christmas, with dates and tips.",
  alternates: { canonical: `${SITE}/london/events` },
  openGraph: { title: "London Events & Festivals | Flyamba", description: "The city's biggest annual events, month by month.", type: "article" },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "London", item: `${SITE}/london` },
      { "@type": "ListItem", position: 3, name: "Events", item: `${SITE}/london/events` },
    ],
  };
}

const IMG = "/images/content/photo-1533174072545-7a4b6ad7a6c3.avif";

const ITEMS: BcnPlace[] = [
  {
    name: "New Year's Eve Fireworks & Day Parade", slug: "new-year", image: IMG, rating: 4.5, area: "Westminster / South Bank",
    tip: "The riverside fireworks are ticketed and sell out — buy early, or watch the free New Year's Day Parade instead.",
    filterKeys: [],
    description: "London rings in the year with a spectacular fireworks display over the Thames, followed by a big city parade.",
    practicalInfo: { openingHours: "31 December (midnight) & 1 January", price: "Fireworks viewing tickets ~£15; parade free", howToGetThere: "Fireworks: near the London Eye (Westminster/Waterloo); parade: Piccadilly to Parliament Square" },
    fullDescription: "London begins the year in style. On the stroke of midnight on New Year's Eve, a huge, choreographed fireworks display erupts around the London Eye and the Thames, watched by hundreds of thousands along the riverbanks and by millions more on television. Crucially, the prime riverside viewing areas are now ticketed to manage the enormous crowds, and tickets are inexpensive but sell out well in advance, so book early; otherwise you can catch glimpses from higher vantage points around the city or watch the broadcast. The public-transport network runs extended, often free services that night, but expect big crowds and road closures. The celebration continues the next day with London's New Year's Day Parade (LNYDP), one of the world's largest street parades, a free spectacle of marching bands, dancers, performers and floats that winds through the West End from Piccadilly down to Parliament Square around midday. It's a family-friendly, free way to start the year if you miss out on fireworks tickets. Wrap up very warmly for both, arrive early to secure a spot, and plan your route home in advance, as central stations get extremely busy.",
  },
  {
    name: "Lunar New Year celebrations", slug: "lunar-new-year", image: IMG, rating: 4.4, area: "Chinatown / West End",
    tip: "Head to Chinatown and Trafalgar Square for the free festivities — go early, as the streets get packed.",
    filterKeys: [],
    description: "London hosts one of the largest Lunar New Year celebrations outside Asia, centred on Chinatown and the West End.",
    practicalInfo: { openingHours: "Late January or February (date varies each year)", price: "Free", howToGetThere: "Tube: Leicester Square or Piccadilly Circus for Chinatown & Trafalgar Square" },
    fullDescription: "London stages one of the biggest Lunar (Chinese) New Year celebrations outside Asia, a free, colourful and hugely popular event that lights up the West End in late January or February, depending on the lunar calendar. The heart of the festivities is Chinatown, around Gerrard Street near Leicester Square, where red lanterns, decorations and food stalls create a festive buzz, spilling out into Trafalgar Square and Shaftesbury Avenue. The main day brings a grand parade of dragon and lion dancers weaving through the streets, plus a full programme on a Trafalgar Square stage of traditional music, dance, acrobatics and martial-arts displays, culminating in firecrackers and, sometimes, fireworks. It's a wonderful, family-friendly cultural spectacle, and entirely free to enjoy. The trade-off is crowds: the compact streets of Chinatown and the square around it get extremely busy, so arrive early to see the parade and performances, and consider booking a table at one of Chinatown's many restaurants (they're in huge demand) if you want to eat. Dress warmly for the winter chill, keep an eye on belongings in the crush, and soak up one of London's most vibrant and welcoming annual street festivals.",
  },
  {
    name: "London Marathon", slug: "london-marathon", image: IMG, rating: 4.6, area: "Greenwich to The Mall",
    tip: "You don't need a ticket — line the route (Tower Bridge and the Embankment are electric) to cheer the runners for free.",
    filterKeys: [],
    description: "One of the world's great marathons, when 50,000 runners cross the city from Greenwich to Buckingham Palace.",
    practicalInfo: { openingHours: "Late April (usually a Sunday)", price: "Free to watch; entry ballot to run", howToGetThere: "Great free viewing at Tower Bridge, Canary Wharf, the Embankment & The Mall" },
    fullDescription: "The London Marathon, held on a Sunday in late April, is one of the world's six major marathons and a joyous, only-in-London spectacle. Around 50,000 runners — elite athletes, club runners, charity fundraisers and a legendary parade of costumed participants — pound a 26.2-mile course that starts near Greenwich, crosses the iconic Tower Bridge, loops through the Docklands around Canary Wharf, and finishes in front of Buckingham Palace on The Mall. It's as much a citywide celebration as a race: crowds line the entire route, brass bands play, and the atmosphere of encouragement is genuinely moving. You don't need a ticket to enjoy it — simply pick a spot along the course and cheer, with Tower Bridge, the Embankment, Canary Wharf and the finish near St James's Park among the best (and busiest) vantage points. Getting a place to run is highly competitive, through a public ballot months in advance or a charity place. If you're visiting that weekend, be aware of extensive road closures across central and east London and plan journeys around them, using the Tube. Whether you run or watch, marathon day showcases London's community spirit at its warmest.",
  },
  {
    name: "Chelsea Flower Show", slug: "chelsea-flower-show", image: IMG, rating: 4.6, area: "Chelsea (SW3)",
    tip: "Tickets sell out fast and must be booked in advance; the final-day sell-off of plants is a famous scramble.",
    filterKeys: [],
    description: "The world's most prestigious flower show, a dazzling display of gardens and horticulture in the grounds of the Royal Hospital Chelsea.",
    practicalInfo: { openingHours: "Five days in late May", price: "Tickets from ~£45 (must book ahead)", howToGetThere: "Tube: Sloane Square (District & Circle), then a short walk" },
    fullDescription: "The RHS Chelsea Flower Show, staged over five days in late May in the grounds of the Royal Hospital Chelsea, is the most prestigious horticultural event in the world and a beloved fixture of the British social calendar. Organised by the Royal Horticultural Society, it showcases spectacular, meticulously designed show gardens, cutting-edge landscaping and breathtaking floral displays from leading designers and nurseries, setting the trends that ripple through gardens nationwide for the year ahead. It's a feast for anyone who loves plants, design or simply beautiful spectacle, and it regularly draws royal visitors. Tickets are limited, must be booked in advance (RHS members get priority and early days), and sell out, so plan ahead if you want to attend; the show is not suitable for spontaneous drop-ins. The famous finale is the final afternoon's plant sell-off, when exhibitors sell their displays and visitors dash to snap up show plants at bargain prices. To make the most of it, go early to beat crowds around the popular gardens, wear comfortable shoes for a full day on your feet, and check the RHS website for ticket release dates. For garden lovers, it's a bucket-list day out in a genteel corner of London.",
  },
  {
    name: "Trooping the Colour", slug: "trooping-the-colour", image: IMG, rating: 4.5, area: "The Mall / Horse Guards",
    tip: "Line The Mall early for a free view of the royal carriages and the RAF flypast over Buckingham Palace.",
    filterKeys: [],
    description: "The monarch's official birthday parade, a dazzling display of royal pageantry, cavalry and marching bands.",
    practicalInfo: { openingHours: "A Saturday in mid-June", price: "Free to watch The Mall; grandstand seats balloted", howToGetThere: "Tube: St James's Park, Green Park or Charing Cross for The Mall & Horse Guards" },
    fullDescription: "Trooping the Colour, held on a Saturday in mid-June, is the grandest display of royal pageantry in the British calendar, marking the monarch's official birthday. Dating back centuries, the ceremony sees more than 1,400 immaculately turned-out soldiers, 200 horses and 400 musicians parade in a precise, colourful spectacle between Buckingham Palace and Horse Guards Parade, with the King and other members of the Royal Family taking part on horseback or in carriages. The event culminates in the family gathering on the Buckingham Palace balcony to watch a dramatic Royal Air Force flypast. Tickets for the seated grandstand at Horse Guards are allocated by ballot months in advance, but you can watch much of the procession for free by lining The Mall — the tree-lined avenue between the palace and Admiralty Arch — as the royal carriages and mounted troops pass. Arrive very early (a couple of hours ahead) to secure a good, free spot along The Mall or near the palace for the flypast, and expect large crowds and road closures. Combine it with a stroll through St James's Park. For a quintessential dose of British ceremony, colour and precision, it's an unforgettable free spectacle.",
  },
  {
    name: "Wimbledon Championships", slug: "wimbledon", image: IMG, rating: 4.7, area: "Wimbledon (SW19)",
    tip: "Join 'The Queue' in person for same-day grounds tickets, or soak up the atmosphere for free on Wimbledon Park's big screen.",
    filterKeys: [],
    description: "The world's oldest and most prestigious tennis tournament, played on the famous grass courts of the All England Club.",
    practicalInfo: { openingHours: "Two weeks, late June into July", price: "Grounds passes from ~£30 (via The Queue or online ballot)", howToGetThere: "Tube: Southfields (District line) then a walk or shuttle; or rail to Wimbledon" },
    fullDescription: "The Wimbledon Championships, held over two weeks from late June into July, is the oldest and most revered tennis tournament in the world, and the only Grand Slam still played on grass. Staged at the All England Lawn Tennis Club in the leafy suburb of Wimbledon, it's steeped in tradition: the strict all-white dress code, strawberries and cream, Pimm's, royal patronage and impeccably manicured lawns. Beyond the tennis, it's a quintessentially British summer social occasion. Getting in is famously part of the experience: show-court tickets (Centre and No.1 Court) are mostly allocated by a public ballot the year before, but a limited number of grounds passes and some show-court tickets are released each day to people who join 'The Queue' — the legendary, well-organised, often overnight line that is a tradition in itself. Grounds passes give access to the outer courts and the famous 'Henman Hill'/'Murray Mound', where crowds watch the big matches on a giant screen. Even without a ticket, the surrounding area buzzes during the fortnight. If you visit, go early to queue, bring cash, sunscreen and patience, and enjoy one of sport's most atmospheric and traditional events.",
  },
  {
    name: "Pride in London", slug: "pride-in-london", image: IMG, rating: 4.6, area: "West End",
    tip: "The parade and Trafalgar Square stage are free — arrive early along the route for the best spot amid the party atmosphere.",
    filterKeys: [],
    description: "One of the world's biggest LGBTQ+ celebrations, a huge, colourful parade and party through central London.",
    practicalInfo: { openingHours: "Late June or early July (a Saturday)", price: "Free to watch the parade & stages", howToGetThere: "Tube: Oxford Circus, Piccadilly Circus or Charing Cross for the route & Trafalgar Square" },
    fullDescription: "Pride in London, usually held on a Saturday in late June or early July, is one of the largest and most vibrant LGBTQ+ celebrations in the world, filling the heart of the city with colour, music and an atmosphere of joyful inclusion. The centrepiece is the enormous Pride parade, when tens of thousands of participants — community groups, charities, businesses and revellers in dazzling costumes — march through central London, typically from around Hyde Park Corner along Piccadilly and down to Whitehall, cheered by huge crowds lining the route. Around it, free stages and events spring up across the West End, notably in Trafalgar Square, Soho (the beating heart of London's gay scene) and Leicester Square, with live performances, DJs and speeches turning the streets into a citywide party that runs into the night. It's free to watch the parade and enjoy the main stages, and the mood is welcoming to everyone. Expect very large crowds, road closures across the centre, and a lively, celebratory vibe. Arrive early to find a good spot along the parade route, stay hydrated, and dive into the festivities in Soho afterwards. For a joyful, meaningful and quintessentially open London occasion, Pride is a highlight of the summer.",
  },
  {
    name: "Notting Hill Carnival", slug: "notting-hill-carnival", image: IMG, rating: 4.4, area: "Notting Hill (W11)",
    tip: "Go on the Sunday for the more family-friendly Children's Day; wear comfortable shoes and keep valuables secure in the crowds.",
    filterKeys: [],
    description: "Europe's biggest street festival, a two-day explosion of Caribbean music, costume, dance and food.",
    practicalInfo: { openingHours: "August bank holiday weekend (Sun & Mon)", price: "Free", howToGetThere: "Tube: Notting Hill Gate, Ladbroke Grove or Westbourne Park (some exit-only/closed on the day)" },
    fullDescription: "Notting Hill Carnival, held over the August bank holiday weekend, is the biggest street festival in Europe and a joyous celebration of London's Caribbean community and culture, drawing around two million people to the streets of west London. Rooted in the Caribbean traditions brought to Britain in the 1950s and 60s, it's a spectacular explosion of colour, sound and energy: a grand parade of elaborately costumed masqueraders and steel-pan bands, thundering sound systems pumping soca, reggae, dancehall and dub on every corner, and the irresistible aroma of jerk chicken, rice and peas and rum punch from hundreds of street-food stalls. The Sunday is 'Children's Day', a slightly calmer, more family-oriented affair, while the Monday is the bigger, wilder main parade. It's completely free, but it's an intense, extremely crowded experience: wear comfortable shoes and light clothing, keep valuables secure and phones zipped away, agree a meeting point with your group, and be aware that many local Tube stations are exit-only or closed and roads are shut across the area. Embrace the crowds, the music and the food, and you'll experience one of the world's great street parties, and a proud showcase of London's multicultural spirit.",
  },
  {
    name: "Christmas lights & Winter Wonderland", slug: "christmas-in-london", image: IMG, rating: 4.6, area: "West End / Hyde Park",
    tip: "The Oxford, Regent and Carnaby Street lights are free to stroll; book Winter Wonderland entry online to skip the queue.",
    filterKeys: [],
    description: "London sparkles at Christmas with dazzling street lights, festive markets, ice rinks and the giant Winter Wonderland fair.",
    practicalInfo: { openingHours: "Mid-November to early January", price: "Lights & markets free; Winter Wonderland free entry (rides/attractions paid)", howToGetThere: "Tube: Oxford Circus for the lights; Hyde Park Corner or Marble Arch for Winter Wonderland" },
    fullDescription: "From mid-November to early January, London transforms into one of the world's most magical Christmas destinations. The famous festive lights are switched on above the West End's shopping streets — the elegant displays on Oxford Street, Regent Street and, especially, the sparkling angels of Carnaby and the covered lights of Bond Street — all free to stroll beneath and dazzling after dark. Across the city, Christmas markets, carol concerts, pantomimes, and ice rinks at picturesque settings like Somerset House, the Natural History Museum and the Tower of London add to the seasonal cheer, while department-store windows compete to outdo each other. The season's biggest single attraction is Hyde Park Winter Wonderland, a vast festive fair with fairground rides, an ice rink, circus and cabaret shows, a Christmas market and endless food and mulled-wine stalls; entry to the park is free, with rides and attractions paid for individually (book timed entry online at peak times to avoid queues). It's a busy, joyful, atmospheric time to visit, though cold and often wet, so wrap up warmly. Combine an evening of light-gazing along the West End with a spin around Winter Wonderland, and enjoy London at its most festive and glittering.",
  },
];

export default function LondonEvents() {
  return (
    <CityGuideShell
      citySlug="london"
      cityName="London"
      categories={CATEGORIES}
      active="events"
      crumb="Events"
      h1="London Events & Festivals"
      heroImage={IMG}
      intro="London's calendar overflows with world-famous events, from royal pageantry and Grand Slam tennis to the biggest street party in Europe. This month-by-month guide runs through the city's major annual happenings — New Year fireworks, the Marathon, Chelsea Flower Show, Trooping the Colour, Wimbledon, Pride, Notting Hill Carnival and Christmas — with dates, costs and tips on how to enjoy them."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="London's biggest annual events, month by month" items={ITEMS} />
    </CityGuideShell>
  );
}
