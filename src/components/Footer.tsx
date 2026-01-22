"use client";

import { useCallback } from "react";

const ACCENT = "#1E2A5A";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#signal" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Contact", href: "#ready" },
      { label: "Privacy", href: "#privacy" },
      { label: "Security", href: "#security" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#help" },
      { label: "Report an issue", href: "#support" },
      { label: "Status", href: "#status" },
      { label: "Terms", href: "#terms" },
    ],
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "YouTube", href: "https://www.youtube.com" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const yOffset = -80; // adjust for your sticky header height
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

function normalizeIdFromHref(href: string) {
  return href.startsWith("#") ? href.slice(1) : href;
}

export default function Footer() {
  const onNav = useCallback((href: string) => {
    const id = normalizeIdFromHref(href);
    scrollToId(id);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-200">
      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div
          className="absolute -bottom-40 right-[-160px] h-[460px] w-[460px] rounded-full blur-3xl"
          style={{ background: `${ACCENT}26` }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-10 px-6 py-12 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          {/* Brand block */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              keepur
            </p>

            <h3 className="text-3xl font-semibold leading-tight text-white">
              Business, kept simple.
            </h3>

            <p className="max-w-prose text-sm leading-6 text-slate-400">
              keepur helps shops track sales, manage inventory, and view reports in one calm,
              reliable system. Built for Bangladesh first, ready to scale anywhere.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNav("#ready")}
                className="rounded-full px-5 py-2 text-xs font-semibold text-white transition hover:opacity-95"
                style={{ background: ACCENT }}
              >
                Request a demo
              </button>

              <button
                type="button"
                onClick={() => onNav("#faq")}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-slate-200 backdrop-blur transition hover:border-white/25"
              >
                View FAQ
              </button>
            </div>

            <p className="text-xs text-slate-500">
              No hype. Just clear numbers your team can trust.
            </p>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                {group.title}
              </p>

              <div className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => onNav(link.href)}
                    className="block text-left text-slate-300 transition hover:text-white"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} keepur. Business, kept simple.</p>

          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                className="text-slate-400 transition hover:text-white"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
