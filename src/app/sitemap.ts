import type { MetadataRoute } from "next";
import { solutions } from "@/lib/solutions";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, priority: 1 }, { url: `${siteUrl}/contact`, priority: 0.6 },
    ...solutions.map(item => ({ url: `${siteUrl}/${item.slug}`, priority: 0.8 }))];
}
