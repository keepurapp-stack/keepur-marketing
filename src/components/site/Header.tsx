"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { appUrl } from "@/lib/seo";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary["nav"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: dict.features, href: localePath(locale, "/#features") },
    { label: dict.howItWorks, href: localePath(locale, "/#how-it-works") },
    { label: dict.pricing, href: localePath(locale, "/#pricing") },
    { label: dict.faq, href: localePath(locale, "/#faq") },
    { label: dict.contact, href: localePath(locale, "/contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border py-1.5 pl-4 pr-1.5 transition-all duration-300 ${
          scrolled || open
            ? "border-line bg-card/85 shadow-[0_14px_40px_-22px_rgba(14,20,51,0.45)] backdrop-blur-xl"
            : "border-line/70 bg-card/60 backdrop-blur-md"
        }`}
      >
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center" aria-label="Keepur home" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="Keepur" width={110} height={32} className="h-7 w-auto" priority />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Main">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <LanguageSwitcher locale={locale} label={dict.switchLanguage} title={dict.switchLanguageLabel} />
          <a href={`${appUrl}/login`} className="rounded-full px-3.5 py-2 text-sm font-semibold text-foreground transition hover:bg-surface">
            {dict.login}
          </a>
          <a href={`${appUrl}/signup`} className="btn-primary px-5 py-2.5 text-sm">
            {dict.signup}
          </a>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageSwitcher locale={locale} label={dict.switchLanguage} title={dict.switchLanguageLabel} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.menuClose : dict.menuOpen}
            className="relative h-10 w-10 rounded-full bg-ink text-white"
          >
            <span className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 bg-current transition ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 bg-current transition ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
          </button>
        </div>
      </div>

      {open && (
        <>
          <button type="button" aria-label={dict.menuClose} onClick={() => setOpen(false)} className="fixed inset-0 -z-10 bg-ink/30 backdrop-blur-sm lg:hidden" />
          <div id="mobile-menu" className="animate-fade-up mx-auto mt-2 max-w-5xl rounded-3xl border border-line bg-card p-3 shadow-xl lg:hidden">
            <nav className="grid gap-1" aria-label="Mobile">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-base font-semibold text-foreground hover:bg-surface">
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <a href={`${appUrl}/login`} className="btn-secondary px-4 py-3 text-sm">{dict.login}</a>
              <a href={`${appUrl}/signup`} className="btn-primary px-4 py-3 text-sm">{dict.signup}</a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
