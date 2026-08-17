import type { Metadata } from "next";
import { CityGuideShell } from "@/app/components/CityGuideShell";
import { CategorySeoSections } from "@/app/components/CategorySeoSections";
import type { BcnPlace } from "@/app/data/barcelona-places";
import { CATEGORIES } from "@/app/data/bali-places";
import { SITE } from "@/app/lib/destination-helpers";

export const metadata: Metadata = {
  title: "Getting Around Bali 2026 — Scooters, Drivers & Taxis",
  description:
    "How to get around Bali: airport transfers from Ngurah Rai (DPS), scooter rental, Grab and Gojek ride-hailing, hiring a private driver, buses between…",
  alternates: { canonical: `${SITE}/bali/transport` },
  openGraph: { title: "Getting Around Bali | Flyamba", description: "Scooters, private drivers, Grab, taxis and island boats — the complete Bali transport guide.", type: "article" },
};

const IMG = "/images/bali/attractions/kuta.webp";

const INFO: BcnPlace[] = [
  {
    name: "From the airport (Ngurah Rai / DPS)", slug: "airport-transfer", image: IMG, rating: 5, area: "Denpasar (DPS)",
    tip: "Use the official blue Bluebird taxis (not the yellow ones), and either insist on the meter or agree the fare before you set off.",
    filterKeys: [],
    description: "A metered taxi or pre-booked transfer covers the short hop from the airport to the southern resorts.",
    practicalInfo: { openingHours: "24h", price: "~100,000–250,000 IDR (~$7–16) to Seminyak/Kuta", howToGetThere: "Taxi ranks and pre-booked drivers at Ngurah Rai International Airport" },
    fullDescription: "Bali's Ngurah Rai International Airport (DPS) sits right beside the southern resort strip, so transfers are short. Kuta is minutes away, Seminyak around 25 minutes and Ubud roughly 1.5 hours, though traffic can stretch all of these considerably. For most arrivals the simplest options are a metered taxi or a driver arranged in advance through your hotel. The official Bluebird taxis — genuinely blue, and the most reliable and honest — are the ones to look for, costing roughly 100,000–250,000 IDR (about $7–16) to Seminyak or Kuta; always either insist they run the meter or agree a fixed fare before departing. Ride-hailing apps like Grab and Gojek also operate, though they can only pick up from designated points at the airport. Many hotels and villas offer airport pickups for a set price, which removes the hassle of negotiating on arrival — worth arranging if you land late or are heading further afield to Ubud, Canggu or the east coast. Avoid unofficial touts inside the terminal offering rides, and have some rupiah in cash ready.",
  },
  {
    name: "Scooter rental", slug: "scooter", image: IMG, rating: 5, area: "Islandwide",
    tip: "You legally need an International Driving Permit (motorbike category) — police checkpoints around Kuta and Seminyak do fine foreign riders without one.",
    filterKeys: [],
    description: "Renting a scooter is the cheapest, most flexible way to explore — but only for confident riders.",
    practicalInfo: { openingHours: "24h rentals via shops & hotels", price: "~60,000–100,000 IDR/day (~$4–6); fuel ~15,000 IDR", howToGetThere: "Rent through your hotel or the many roadside rental shops" },
    fullDescription: "A rented scooter is the most common way to get around Bali and by far the cheapest and most flexible — around 60,000–100,000 IDR (roughly $4–6) a day, with a tank costing about 15,000 IDR to fill. It's the classic Bali experience, letting you weave down village lanes and reach rice terraces and beaches at your own pace. But it comes with serious caveats. Legally you need an International Driving Permit with the motorbike category, and police checkpoints around Kuta and Seminyak regularly fine foreign riders who don't have one. More importantly, Bali's traffic is fast, dense and chaotic, and thousands of tourists are injured in scooter accidents every year, so it's genuinely not for anyone unsure on two wheels or unused to riding on the left. Always wear the helmet (included in the rental), never ride after drinking, and avoid central Kuta at rush hour. If you have the experience, licence and confidence, a scooter unlocks the island cheaply; if not, hiring a driver is far safer and lets you see just as much.",
  },
  {
    name: "Grab & Gojek ride-hailing", slug: "ride-hailing", image: IMG, rating: 5, area: "South Bali",
    tip: "The motorbike-taxi option (Gojek/Grab bike) is the cheapest way to zip across town — from around 10,000–25,000 IDR for short hops.",
    filterKeys: [],
    description: "Indonesia's answer to Uber — cheap, app-based cars and motorbike taxis in the south.",
    practicalInfo: { openingHours: "24h via app", price: "Bike ~10,000–25,000 IDR; car ~50,000–150,000 IDR", howToGetThere: "Download the Grab or Gojek app; works best in Seminyak, Kuta, Sanur" },
    fullDescription: "Grab and Gojek — Indonesia's ride-hailing giants, effectively the local Uber — are the easiest and cheapest way to get around southern Bali without a scooter. Both apps let you book either a car or, cheaper still, a motorbike taxi (with a helmet provided), and prices are fixed and shown upfront, so there's no haggling. A motorbike ride for a short hop costs as little as 10,000–25,000 IDR, while a car runs roughly 50,000–150,000 IDR depending on distance. They work reliably in the main southern areas — Seminyak, Kuta, Sanur and, patchily, Canggu — but there's an important catch: in Ubud, around many temples and in parts of the island, local driver cooperatives (the 'transport mafia') block app pickups to protect their own trade, so you'll often find you can't get a ride and must use a local taxi or private driver instead. Where they work, though, the apps are cheap, cashless and hassle-free, and a great way to avoid taxi over-charging. Download and set them up before you arrive, and keep some cash as backup.",
  },
  {
    name: "Hiring a private driver", slug: "private-driver", image: IMG, rating: 5, area: "Islandwide",
    tip: "A full-day driver (around 8 hours) is the smartest way to sightsee — they wait while you explore each temple or terrace and tailor the route to you.",
    filterKeys: [],
    description: "A private driver for the day is the safest, easiest way to see Bali's scattered sights.",
    practicalInfo: { openingHours: "Typically 8–10 h days", price: "~600,000–800,000 IDR/day (~$40–55), incl. fuel", howToGetThere: "Book through your hotel or a reputable local operator" },
    fullDescription: "For sightseeing beyond your immediate area — and especially if you're not riding a scooter or travelling with family — hiring a private driver is the smartest way to get around Bali. For roughly 600,000–800,000 IDR (about $40–55) you get a car and driver for a full day (typically eight hours, fuel included but not attraction entry fees), and the driver will string together the sights you want, wait while you explore each temple, rice terrace or waterfall, and adapt the itinerary as you go. Given how spread out Bali's attractions are and how slow the roads can be, this often lets you see far more in a day than you could otherwise, in air-conditioned comfort and safety. Drivers are usually knowledgeable and can suggest good stops, warungs and photo spots along the way. Book through your hotel or a reputable operator rather than the first person who offers on the street, agree the route, price and hours in advance, and tip for good service. Split between a group it's excellent value, and it removes all the stress of navigating Bali's traffic yourself.",
  },
  {
    name: "Getting between areas", slug: "between-areas", image: IMG, rating: 5, area: "Islandwide",
    tip: "Distances are deceptive — Bali's roads are slow and winding, so 50 km can easily take two hours. Plan generous travel times.",
    filterKeys: [],
    description: "Shuttle buses and drivers link the main hubs, but journeys take longer than the map suggests.",
    practicalInfo: { openingHours: "Daily shuttles & buses", price: "Tourist shuttles from ~50,000–150,000 IDR", howToGetThere: "Kura-Kura and Perama shuttles, or a private driver, link Kuta, Ubud and beyond" },
    fullDescription: "Bali is a big island (5,780 km²) with slow, winding, often congested roads, so getting between areas takes longer than the distances suggest — 50 kilometres can easily take two hours. There's no comprehensive public transport network for visitors, but a few options link the main hubs. Tourist shuttle services such as Perama and the Kura-Kura bus run scheduled routes connecting Kuta, Seminyak, Ubud, Sanur, Lovina and other centres at budget prices (from around 50,000–150,000 IDR), which suit backpackers and the flexible. From the Kuta/Seminyak area, local connections reach Ubud in about an hour and the north-coast beach town of Lovina in around three. For most travellers, though, the easiest way to move between bases — say from the beaches to Ubud, or on to the east coast — is to book a private driver for the transfer, often for a similar price to several separate taxis and with the bonus of sightseeing stops en route. Whatever you choose, build in generous travel time, especially around the traffic-clogged south, and don't try to pack too many far-flung areas into a short trip.",
  },
  {
    name: "Fast boats to the islands", slug: "island-boats", image: IMG, rating: 5, area: "Sanur / Padang Bai",
    tip: "For Nusa Penida, the fast boat leaves from Sanur and takes about 45 minutes — take a seasickness tablet 30 minutes beforehand if you're prone.",
    filterKeys: [],
    description: "Fast boats link Bali to Nusa Penida, the Gili Islands and Lombok.",
    practicalInfo: { openingHours: "Daily daytime departures", price: "Nusa Penida ~200,000 IDR (~$13) one way; Gilis ~$40+ round trip", howToGetThere: "Fast boats depart Sanur, Serangan and Padang Bai" },
    fullDescription: "Some of Bali's best experiences lie just offshore, reached by fast boat. For Nusa Penida — the island of the T-Rex-shaped Kelingking cliff — the fast boat departs from Sanur and takes around 45 minutes, costing roughly 200,000 IDR (about $13) each way; because the island is large with rough roads, book a scooter or driver (around 500,000 IDR/day) once you arrive to reach the scattered viewpoints. The car-free Gili Islands, off Lombok, are about 1.5 hours away by fast boat from eastern Bali (Padang Bai or Serangan), while Lombok itself, with Mount Rinjani and white-sand beaches, is a longer ferry or fast-boat ride. Seas can be choppy and small fast boats bounce hard, so take a seasickness tablet half an hour before boarding if you're susceptible, and choose reputable operators with good safety records rather than the very cheapest. Book combined packages (boat plus island transport and lunch) if your time is tight, as they smooth out the logistics. For island-hopping day trips or overnights, these boats open up some of the most spectacular scenery in the region.",
  },
];

function jsonLd() {
  return {
    "@type": "BreadcrumbList",
    "@context": "https://schema.org",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Flyamba", item: SITE },
      { "@type": "ListItem", position: 2, name: "Bali", item: `${SITE}/bali` },
      { "@type": "ListItem", position: 3, name: "Transport", item: `${SITE}/bali/transport` },
    ],
  };
}

export default function BaliTransport() {
  return (
    <CityGuideShell
      citySlug="bali"
      cityName="Bali"
      categories={CATEGORIES}
      active="transport"
      crumb="Transport"
      h1="Getting Around Bali"
      heroImage={IMG}
      intro="Bali has no visitor-friendly public transport network, so getting around means choosing between a rented scooter, a private driver, ride-hailing apps and taxis — each suited to different travellers and areas. This guide covers every option, from the short transfer out of Ngurah Rai airport and the pros and cons of scooter rental to hiring a driver for the day, moving between the main hubs and catching fast boats to the islands, with rupiah prices and money-saving tips."
      wide
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      <CategorySeoSections heading="Getting around Bali — in detail" items={INFO} />
    </CityGuideShell>
  );
}
