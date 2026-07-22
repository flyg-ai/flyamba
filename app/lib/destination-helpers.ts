import type { Destination } from "@/app/data/destinations";

export const SITE = "https://flyamba.com";

// Airline display names, preferring the rich `airlines` list, falling back to
// the simpler `topAirlines`.
export function airlineNames(d: Destination): string[] {
  return d.airlines?.map((a) => a.name) ?? d.topAirlines;
}

// A display price string, e.g. "$128" when authored, else the kr price.
export function lowestPriceStr(d: Destination): string {
  return d.lowestPrice ?? `${d.price.toLocaleString()} kr`;
}

// Best time to visit, derived from monthly weather: months at a pleasant
// 18–28°C; falls back to the three warmest months if none qualify.
export function bestTimeToVisit(d: Destination): string {
  const pleasant = d.weather.filter((w) => w.tempC >= 18 && w.tempC <= 28).map((w) => w.month);
  if (pleasant.length) return pleasant.join(", ");
  return [...d.weather].sort((a, b) => b.tempC - a.tempC).slice(0, 3).map((w) => w.month).join(", ");
}

// Current-month temperature from the 12-entry weather array.
export function currentTemp(d: Destination): number | null {
  const idx = new Date().getMonth(); // 0-11, aligns with Jan–Dec weather array
  return d.weather[idx]?.tempC ?? null;
}

const WEATHER_EMOJI: Record<string, string> = { sun: "☀️", cloud: "⛅", rain: "🌧️", snow: "❄️" };
export function currentWeatherBadge(d: Destination): string | null {
  const idx = new Date().getMonth();
  const w = d.weather[idx];
  if (!w) return null;
  return `${WEATHER_EMOJI[w.icon] ?? "☀️"} ${w.tempC}°C`;
}
