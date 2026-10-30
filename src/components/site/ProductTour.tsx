"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { IconArrow, IconCheck } from "./Icons";
import SectionHeading from "./SectionHeading";

const ROTATE_MS = 6000;

export default function ProductTour({ index, locale, dict }: { index: string; locale: Locale; dict: Dictionary["tour"] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tab = dict.tabs[active];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((v) => (v + 1) % dict.tabs.length), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, dict.tabs.length]);

  return (
    <section className="px-3 py-6 sm:px-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="panel-glow relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index={index} tone="dark" eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} />

        <div role="tablist" aria-label={dict.eyebrow} className="no-scrollbar mt-10 flex w-fit max-w-full gap-1 overflow-x-auto rounded-full bg-white/5 p-1 ring-1 ring-white/10">
          {dict.tabs.map((t, i) => (
            <button
              key={t.label}
              role="tab"
              id={`tour-tab-${i}`}
              aria-selected={i === active}
              aria-controls="tour-panel"
              onClick={() => { setActive(i); setPaused(true); }}
              className={`relative whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${i === active ? "bg-marigold text-ink shadow" : "text-white/70 hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div id="tour-panel" role="tabpanel" aria-labelledby={`tour-tab-${active}`} className="mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div key={`text-${active}`} className="animate-fade-up">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{tab.title}</h3>
            <p className="mt-4 text-base leading-7 text-white/70">{tab.description}</p>
            <ul className="mt-6 space-y-3">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm font-medium text-white">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-marigold"><IconCheck className="h-4 w-4" /></span>
                  {b}
                </li>
              ))}
            </ul>
            <Link href={localePath(locale, "/#pricing")} className="btn-accent mt-8 px-6 py-3 text-sm">
              {dict.cta} <IconArrow className="h-4 w-4" />
            </Link>
            <div className="mt-8 flex gap-1.5" aria-hidden="true">
              {dict.tabs.map((t, i) => (
                <span key={t.label} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-marigold" : "w-4 bg-white/20"}`} />
              ))}
            </div>
          </div>

          <div className="relative">
            
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] ring-1 ring-white/20 lg:-rotate-1 lg:transition lg:hover:rotate-0">
              <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 font-mono text-xs text-slate-500">yourshop.keepur.app</span>
              </div>
              <div className="relative aspect-[16/9]">
                {dict.tabs.map((t, i) => (
                  <Image key={t.image} src={t.image} alt={t.title} fill sizes="(min-width: 1024px) 680px, 100vw"
                    className={`object-cover object-top transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
