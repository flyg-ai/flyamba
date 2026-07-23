// Santorini guide configuration shared across the hub page, subpages and sub-nav.
import type { CityCategory } from "@/app/components/CitySubNav";

export const SANTORINI = {
  slug: "santorini",
  name: "Santorini",
  country: "Greece",
  countryFlag: "🇬🇷",
  continent: "Europe",
  iata: "JTR",
  tpName: "santorini_gr",
  summerTemp: 26,
  tagline: "Whitewashed cliffs and the world's most famous sunset",
  image: "/images/destinations/flights-santorini.avif",
  // Monthly average round-trip fares in USD; null = no meaningful data (winter,
  // when few flights operate). Nulls are handled everywhere they are consumed.
  monthlyUsd: [null, null, null, 335, 430, 550, 665, 650, 525, 400, null, null] as (number | null)[],
} as const;

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Order drives the sub-nav tabs and the hub's image category grid.
export const SANTORINI_CATEGORIES: CityCategory[] = [
  { slug: "", label: "Flights", emoji: "✈️" },
  { slug: "attractions", label: "Attractions", emoji: "🎨" },
  { slug: "restaurants", label: "Restaurants", emoji: "🍽️" },
  { slug: "hotels", label: "Hotels", emoji: "🏨" },
  { slug: "transport", label: "Transport", emoji: "🚇" },
  { slug: "prices", label: "Prices", emoji: "💶" },
  { slug: "weather", label: "Weather", emoji: "🌤️" },
  { slug: "shopping", label: "Shopping", emoji: "🛍️" },
  { slug: "beaches", label: "Beaches", emoji: "🏖️" },
  { slug: "nightlife", label: "Nightlife", emoji: "🌙" },
  { slug: "with-kids", label: "With kids", emoji: "👨‍👩‍👧" },
  { slug: "day-trips", label: "Day trips", emoji: "🚆" },
  { slug: "events", label: "Events", emoji: "🎉" },
];
