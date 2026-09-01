import { climateYear, type MonthClimate } from "@/app/lib/climate";

/**
 * Month-by-month weather table for lite destination pages.
 *
 * RENDERS ONLY MEASURED SERIES. climateYear() returns null for the 195
 * destinations whose climate rows an LLM invented (gpt_seed), and null renders
 * nothing — no empty state. The "measured, not estimated" footnote below is
 * true by construction, because the unmeasured case never reaches it.
 *
 * A TABLE, NOT A CHART. Four measures per month would make a chart a dashboard;
 * table cells are real text a search engine can parse against "{city} weather
 * in november" queries, which is the point; and the fare calendar stays the
 * page's only chart.
 *
 * SERVER COMPONENT — climate.ts holds the service-role client and reads with
 * cache: "no-store", so any page rendering this needs force-static (the lite
 * [slug] page already has it).
 */

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const f = (c: number) => Math.round(c * 1.8 + 32);
/** US audience: rainfall in inches, one decimal. */
const inches = (mm: number) => (mm / 25.4).toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

function intro(name: string, months: MonthClimate[]): string {
  let warm = 0, cool = 0;
  months.forEach((m, i) => {
    if (m.tempC > months[warm].tempC) warm = i;
    if (m.tempC < months[cool].tempC) cool = i;
  });

  // A flat tropical year makes "warmest X, coolest Y" read like noise — say the
  // true thing instead.
  const base =
    months[warm].tempC - months[cool].tempC <= 2
      ? `Temperatures in ${name} barely move across the year, holding around ${f(months[warm].tempC)}°F.`
      : `The warmest month in ${name} is ${FULL_MONTHS[warm]}, at an average high of ${f(months[warm].tempC)}°F; the coolest is ${FULL_MONTHS[cool]} at ${f(months[cool].tempC)}°F.`;

  const withRain = months.map((m, i) => ({ i, mm: m.precipitationMm })).filter((x) => x.mm != null && x.mm > 0);
  if (!withRain.length) return base;
  const wettest = withRain.reduce((a, b) => (b.mm! > a.mm! ? b : a));
  return `${base} ${FULL_MONTHS[wettest.i]} brings the most rain.`;
}

export async function ClimateSection({ slug, name }: { slug: string; name: string }) {
  const months = await climateYear(slug);
  if (!months) return null;

  const hasRain = months.some((m) => m.precipitationMm != null);
  const hasSea = months.some((m) => m.seaTempC != null);
  const now = new Date().getMonth();

  const th = "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:px-4";
  const td = "px-3 py-2 text-sm text-foreground sm:px-4";

  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">Climate</p>
      <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground sm:text-4xl">
        Weather in {name}, month by month
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{intro(name, months)}</p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className={th}>Month</th>
                <th className={th}>High</th>
                <th className={th}>Low</th>
                {hasRain && <th className={th}>Rain</th>}
                {hasSea && <th className={th}>Ocean</th>}
              </tr>
            </thead>
            <tbody>
              {months.map((m, i) => (
                <tr key={i} className={`border-b border-border last:border-0 ${i === now ? "bg-accent/10" : ""}`}>
                  <td className={`${td} font-medium`}>
                    {FULL_MONTHS[i]}
                    {i === now && <span className="ml-2 text-xs font-semibold text-accent">this month</span>}
                  </td>
                  <td className={td}>{f(m.tempC)}°F</td>
                  <td className={td}>{m.tempMinC != null ? `${f(m.tempMinC)}°F` : "—"}</td>
                  {hasRain && <td className={td}>{m.precipitationMm != null ? `${inches(m.precipitationMm)} in` : "—"}</td>}
                  {hasSea && <td className={td}>{m.seaTempC != null ? `${f(m.seaTempC)}°F` : "—"}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Ten-year average (2015–2024) of measured daily observations, not a brochure estimate.
      </p>
    </section>
  );
}
