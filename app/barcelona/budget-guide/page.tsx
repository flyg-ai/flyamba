import type { Metadata } from "next";
import { getGuideByPath, guideHref } from "@/app/data/guides";
import { GuideArticleView } from "@/app/components/GuideArticleView";
import { SITE } from "@/app/lib/destination-helpers";
import { clampDescription, clampTitle } from "@/app/lib/seo";

const g = getGuideByPath("budget-guide")!;

export const metadata: Metadata = {
  title: clampTitle(`${g.title} | Flyamba`),
  description: clampDescription(g.excerpt),
  alternates: { canonical: `${SITE}${guideHref(g)}` },
  openGraph: { title: g.title, description: g.excerpt, type: "article", url: `${SITE}${guideHref(g)}`, images: [g.image] },
  twitter: { card: "summary_large_image", images: [g.image] },
};

export default function Page() {
  return <GuideArticleView guide={g} />;
}
