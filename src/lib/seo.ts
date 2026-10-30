import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";

export const siteUrl = "https://keepur.app";
export const whatsappUrl = "https://wa.me/8801778726988";
export const appUrl = "https://app.keepur.app";
export const siteDescription = getDictionary("en").meta.homeDescription;

/** `path` is always the English path ("/", "/contact", "/multi-store-pos"). */
export function pageMetadata(title: string, description: string, path = "/", locale: Locale = "en"): Metadata {
  const url = `${siteUrl}${localePath(locale, path)}`;
  const dict = getDictionary(locale);
  return {
    title: { absolute: `${title} | Keepur` },
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}${localePath("en", path)}`,
        bn: `${siteUrl}${localePath("bn", path)}`,
        "x-default": `${siteUrl}${localePath("en", path)}`,
      },
    },
    openGraph: {
      title: `${title} | Keepur`, description, url,
      type: "website", siteName: "Keepur", locale: dict.meta.ogLocale,
      alternateLocale: locale === "en" ? ["bn_BD"] : ["en_BD"],
      images: [{ url: "/images/keepur-og.png", width: 1200, height: 630, alt: dict.meta.ogAlt }],
    },
    twitter: { card: "summary_large_image", title: `${title} | Keepur`, description, images: ["/images/keepur-og.png"] },
  };
}

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "POS & Shop Management Software in Bangladesh | Keepur", template: "%s | Keepur" },
  description: siteDescription,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};
