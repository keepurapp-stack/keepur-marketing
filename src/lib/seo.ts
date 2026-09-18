import type { Metadata } from "next";
export const siteUrl = "https://keepur.app";
export const siteDescription = "Keepur is web-based POS and shop management software for Bangladesh. Manage retail sales, billing, inventory, staff, stores, and business reports.";
export function pageMetadata(title: string, description: string, path = "/"): Metadata {
  return {
    title: { absolute: `${title} | Keepur` }, description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: { title: `${title} | Keepur`, description, url: `${siteUrl}${path}`,
      type: "website", siteName: "Keepur", locale: "en_BD",
      images: [{ url: "/images/keepur-og.png", width: 1200, height: 630, alt: "Keepur POS and shop management software" }] },
    twitter: { card: "summary_large_image", title: `${title} | Keepur`, description, images: ["/images/keepur-og.png"] },
  };
}
