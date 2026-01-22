"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";

const ACCENT = "#1E2A5A";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#signal" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -88;
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function normalizeIdFromHref(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavLinkClick = (
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string,
    closeMenu = false
  ) => {
    event.preventDefault();
    scrollToId(normalizeIdFromHref(href));
    if (closeMenu) setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const headerClass = useMemo(() => {
    const base = "fixed inset-x-0 top-0 z-50 transition-all duration-300";

    // When menu is open, force a unified surface (same as menu panel)
    if (menuOpen) {
      return `${base} bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_10px_40px_rgba(15,23,42,0.06)]`;
    }

    const surface = hasScrolled
      ? "bg-white/70 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_10px_40px_rgba(15,23,42,0.06)]"
      : "bg-transparent border-b border-transparent";

    return `${base} ${surface}`;
  }, [hasScrolled, menuOpen]);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className={headerClass}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Keepur home">
          <div className="relative h-8 w-[120px] sm:h-9 sm:w-[132px]">
            <Image
              src="/images/logo.png"
              alt="keepur"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavLinkClick(e, link.href)}
                className="rounded-full px-2 py-1 transition hover:text-slate-900"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              className="rounded-full border border-slate-300 bg-white/60 px-5 py-2 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-slate-400"
              href="https://app.keepur.app/login"
              target="_blank"
              rel="noreferrer"
            >
              Log in
            </Link>

            <Link
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-95"
              style={{ background: ACCENT }}
              href="https://app.keepur.app/signup"
              target="_blank"
              rel="noreferrer"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className={[
            "md:hidden rounded-full border p-2.5 text-slate-700 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            menuOpen
              ? "border-slate-200 bg-white/90"
              : "border-slate-200/70 bg-white/80 shadow-sm",
          ].join(" ")}
          style={{ outlineColor: `${ACCENT}66` }}
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-6 bg-current" />
            <span className="h-0.5 w-6 bg-current" />
            <span className="h-0.5 w-6 bg-current" />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Panel (match header surface) */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative z-50 bg-white/90 px-6 pb-6 backdrop-blur-xl"
            >
              {/* seam remover line */}
              <div className="h-px w-full bg-slate-200/70" />

              <div className="flex flex-col gap-2 pt-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={(e) => handleNavLinkClick(e, link.href, true)}
                    className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:bg-white"
                  >
                    {link.label}
                  </button>
                ))}

                <div className="mt-2 grid gap-2">
                  <Link
                    href="https://app.keepur.app/login"
                    rel="noreferrer"
                    target="_blank"
                    className="w-full rounded-full border border-slate-300 bg-white/70 px-5 py-3 text-center text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-slate-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </Link>

                  <Link
                    href="https://app.keepur.app/signup"
                    rel="noreferrer"
                    target="_blank"
                    className="w-full rounded-full px-5 py-3 text-center text-sm font-semibold text-white transition hover:opacity-95"
                    style={{ background: ACCENT }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Business, kept simple.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
