import type { MetadataRoute } from "next";
import { SITE } from "@/app/lib/destination-helpers";

// Serves /robots.txt. The sitemap line is what gets crawlers to app/sitemap.ts
// without anyone submitting it in Search Console by hand.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
