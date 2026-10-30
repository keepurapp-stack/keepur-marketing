import type { MetadataRoute } from "next";
import { localePath } from "@/i18n/config";
import { solutions } from "@/lib/solutions";
import { siteUrl } from "@/lib/seo";

const entry = (path: string, priority: number): MetadataRoute.Sitemap => {
  const alternates = { languages: { en: `${siteUrl}${localePath("en", path)}`, bn: `${siteUrl}${localePath("bn", path)}` } };
  return [
    { url: `${siteUrl}${localePath("en", path)}`, priority, alternates },
    { url: `${siteUrl}${localePath("bn", path)}`, priority: Math.max(0.5, priority - 0.1), alternates },
  ];
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry("/", 1),
    ...entry("/contact", 0.6),
    ...solutions.flatMap((item) => entry(`/${item.slug}`, 0.8)),
  ];
}
