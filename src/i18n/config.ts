export const locales = ["en", "bn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Prefix an English path for the given locale: ("bn", "/contact") -> "/bn/contact". */
export function localePath(locale: Locale, path = "/") {
  if (locale === defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return path.startsWith("/#") ? `/${locale}${path.slice(1)}` : `/${locale}${path}`;
}

/** Strip a locale prefix: "/bn/contact" -> "/contact". */
export function stripLocale(pathname: string) {
  const match = pathname.match(/^\/bn(?=\/|$)/);
  if (!match) return pathname || "/";
  return pathname.slice(match[0].length) || "/";
}

export function formatNumber(locale: Locale, value: number) {
  return value.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");
}
