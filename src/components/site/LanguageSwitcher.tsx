"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLocale, type Locale } from "@/i18n/config";

export default function LanguageSwitcher({ locale, label, title, className = "" }: {
  locale: Locale; label: string; title: string; className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const target: Locale = locale === "en" ? "bn" : "en";
  const href = localePath(target, stripLocale(pathname));
  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      title={title}
      aria-label={title}
      prefetch={false}
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-brand ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4 text-primary" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
      {label}
    </Link>
  );
}
