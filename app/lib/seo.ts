// Length guards for <title> and <meta name="description">.
//
// Google truncates titles around 60 characters and descriptions around 155, so
// anything past that is invisible in the SERP. Static metadata literals are
// already written within these limits; these helpers exist for the pages that
// interpolate a city name into a template, where the final length depends on
// data and can't be checked by reading the source.

export const TITLE_MAX = 60;
export const DESC_MAX = 155;

/**
 * Shortens a title to TITLE_MAX, giving up the least valuable part first: the
 * " | Flyamba" brand suffix, then a trailing "— descriptor" clause, and only
 * then falling back to a word-boundary trim.
 */
export function clampTitle(title: string, max = TITLE_MAX): string {
  if (title.length <= max) return title;

  const noBrand = title.replace(/\s*\|\s*Flyamba\s*$/, "");
  if (noBrand.length <= max) return noBrand;

  // Drop a trailing em-dash clause ("Rome 2026 — Guide, Prices & Attractions"),
  // but only if what remains is still a meaningful title.
  const noTail = noBrand.replace(/\s*[—–]\s*[^—–]*$/, "");
  if (noTail.length <= max && noTail.length >= 15) return noTail;

  return trimToWord(noBrand, max);
}

/**
 * Shortens a description to DESC_MAX. Prefers ending on a complete sentence
 * when one falls late enough to keep the description substantial; otherwise
 * trims at a word boundary and marks the cut with an ellipsis.
 */
export function clampDescription(desc: string, max = DESC_MAX): string {
  if (desc.length <= max) return desc;

  const window = desc.slice(0, max);
  const sentenceEnd = Math.max(
    window.lastIndexOf(". "),
    window.lastIndexOf("! "),
    window.lastIndexOf("? "),
  );
  if (sentenceEnd >= Math.floor(max * 0.6)) return desc.slice(0, sentenceEnd + 1);

  return trimToWord(desc, max);
}

// Cuts at the last space that fits, leaving room for the ellipsis, and strips
// any dangling punctuation so we don't end on "fares, …".
function trimToWord(s: string, max: number): string {
  const cut = s.slice(0, max - 1).lastIndexOf(" ");
  const body = s.slice(0, cut > 0 ? cut : max - 1);
  return body.replace(/[\s,;:.—–-]+$/, "") + "…";
}
