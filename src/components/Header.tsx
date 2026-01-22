"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

const navLinks = [
  { label: "features", href: "#features" },
  { label: "pricing", href: "#pricing" },
  { label: "faq", href: "#faq" },
];

export default function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") {
      return;
    }
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string, closeMenu = false) => {
    event.preventDefault();
    scrollToSection(href);
    if (closeMenu) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className={`fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 transition-all duration-300 ${hasScrolled ? "bg-white/70 backdrop-blur-lg " : "backdrop-blur-2xl"}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:px-10 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center justify-between md:w-auto">
          <div className="flex items-center gap-3 text-lg font-semibold wider text-slate-800">
            <Image src="/images/logo.png" alt="keepur-logo" width={150} height={120} priority />
          </div>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="md:hidden rounded-full border border-slate-200/70 bg-white/80 p-2.5 text-slate-600 shadow-xl shadow-slate-900/10 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6e8cfb]"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex flex-col gap-1">
              <span className="h-0.5 w-6 bg-current" />
              <span className="h-0.5 w-6 bg-current" />
              <span className="h-0.5 w-6 bg-current" />
            </div>
          </button>
        </div>

        <div className="hidden w-full items-center justify-between gap-6 md:flex md:w-auto">
          <nav className="flex items-center gap-6 text-xs uppercase widest text-slate-500">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="transition hover:text-slate-900"
                href={link.href}
                onClick={(event) => handleNavLinkClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              className="rounded-full border border-slate-200 px-5 py-2 text-xs font-semibold uppercase wide text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
              href="https://app.keepur.app/login"
              target="_blank"
              rel="noreferrer"
            >
              Log in
            </Link>
            <Link
              className="rounded-full border border-transparent bg-gradient-to-r from-[#4f5cfb] to-[#9572ff] px-5 py-2 text-xs font-semibold uppercase wide text-white shadow-lg shadow-[#4f5cfb]/40 transition hover:from-[#3d4fe8] hover:to-[#8156fb]"
              href="https://app.keepur.app/signup"
              target="_blank"
              rel="noreferrer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2 }}
            className="border-t border-slate-100 bg-white/90 px-6 pb-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavLinkClick(event, link.href, true)}
                  className="text-sm font-semibold uppercase [0.35em] text-slate-600 transition hover:text-slate-900"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="https://app.keepur.app/login"
                  rel="noreferrer"
                  target="_blank"
                  className="w-full rounded-full border border-slate-300 px-5 py-2 text-left text-xs font-semibold uppercase wide text-slate-600 transition hover:border-[#6e8cfb] hover:text-[#6e8cfb]"
                >
                  Log in
                </Link>
                <Link
                  href="https://app.keepur.app/signup"
                  rel="noreferrer"
                  target="_blank"
                  className="w-full rounded-full border border-[#6e8cfb] bg-[#6e8cfb] px-5 py-2 text-left text-xs font-semibold uppercase wide text-white transition hover:bg-[#5c78d4]"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
