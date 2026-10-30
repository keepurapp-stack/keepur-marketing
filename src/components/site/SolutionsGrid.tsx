import Link from "next/link";
import { formatNumber, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { solutions } from "@/lib/solutions";
import { IconArrow, IconChart, IconCheck } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/* Small CSS-only illustrations, one per solution (order matches src/lib/solutions.ts). */

function PosVignette({ locale, dark }: { locale: Locale; dark?: boolean }) {
  const line = dark ? "bg-white/15" : "bg-foreground/10";
  return (
    <div className="relative flex h-full items-center justify-center">
      <div className={`w-44 -rotate-3 rounded-xl p-4 shadow-xl transition duration-500 group-hover:rotate-0 ${dark ? "bg-card text-ink" : "bg-card ring-1 ring-line"}`}>
        {[70, 52, 60].map((w, i) => (
          <div key={i} className="flex items-center justify-between gap-3 py-1">
            <span className="h-1.5 rounded-full bg-foreground/15" style={{ width: `${w}%` }} />
            <span className="h-1.5 w-6 rounded-full bg-foreground/25" />
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between border-t border-dashed border-line pt-2">
          <span className="h-2 w-8 rounded-full bg-foreground/30" />
          <span className="font-display text-sm font-extrabold">৳{formatNumber(locale, 3200)}</span>
        </div>
      </div>
      <span className="absolute bottom-4 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-marigold text-ink shadow-lg">
        <IconCheck className="h-5 w-5" />
      </span>
      <span className={`absolute left-6 top-5 h-1.5 w-10 rounded-full ${line}`} />
    </div>
  );
}

function DashboardVignette() {
  const bars = [40, 65, 50, 80, 58, 92];
  return (
    <div className="flex h-full items-end justify-center gap-4 px-8 pb-6 pt-8">
      <div className="flex h-full flex-1 items-end gap-2 rounded-xl bg-card p-3 ring-1 ring-line">
        {bars.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-md transition-all duration-500 group-hover:opacity-100 ${i === bars.length - 1 ? "bg-primary" : "bg-primary/25"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="hidden w-20 space-y-2 sm:block">
        {["bg-emerald-400", "bg-marigold", "bg-rose-400"].map((c) => (
          <div key={c} className="rounded-lg bg-card p-2 ring-1 ring-line">
            <span className={`block h-1.5 w-6 rounded-full ${c}`} />
            <span className="mt-1.5 block h-1.5 w-10 rounded-full bg-foreground/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StockVignette({ locale }: { locale: Locale }) {
  const rows = [
    { w: 86, tone: "bg-emerald-400" },
    { w: 62, tone: "bg-emerald-400" },
    { w: 14, tone: "bg-rose-400", low: true },
    { w: 48, tone: "bg-marigold" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-8 py-6">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-6 w-6 shrink-0 rounded-md bg-card ring-1 ring-line" />
          <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-foreground/10">
            <span className={`absolute inset-y-0 left-0 rounded-full ${r.tone} transition-all duration-700 group-hover:brightness-110`} style={{ width: `${r.w}%` }} />
          </span>
          <span className={`w-10 text-right font-mono text-[11px] ${r.low ? "font-semibold text-rose-600" : "text-muted"}`}>
            {formatNumber(locale, Math.round(r.w / 2))}
          </span>
        </div>
      ))}
    </div>
  );
}

function StoresVignette() {
  const tones = ["bg-primary", "bg-marigold", "bg-emerald-400"];
  return (
    <div className="flex h-full flex-col items-center justify-center px-8">
      {/* owner hub */}
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-marigold shadow-lg transition duration-500 group-hover:-translate-y-0.5">
        <IconChart className="h-5 w-5" />
      </span>
      {/* connectors: one stem, one rail, three drops (each drop sits over a store column) */}
      <span className="h-3 border-l-2 border-dashed border-primary/40" />
      <div className="grid w-full max-w-[17rem] grid-cols-3">
        {tones.map((tone, i) => (
          <div key={tone} className="relative flex flex-col items-center">
            <span
              className={`absolute top-0 border-t-2 border-dashed border-primary/40 ${
                i === 0 ? "left-1/2 right-0" : i === tones.length - 1 ? "left-0 right-1/2" : "inset-x-0"
              }`}
            />
            <span className="h-4 border-l-2 border-dashed border-primary/40" />
            <span className="flex h-12 w-14 flex-col overflow-hidden rounded-lg bg-card shadow-md ring-1 ring-line transition duration-500 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className={`h-2.5 ${tone}`} />
              <span className="mx-1.5 mt-1.5 h-1.5 w-7 rounded-full bg-foreground/20" />
              <span className="mx-1.5 mt-1 h-1.5 w-5 rounded-full bg-foreground/10" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SolutionsGrid({ index, locale, dict }: { index: string; locale: Locale; dict: Dictionary["solutions"] }) {
  const pad = (n: number) => formatNumber(locale, n).padStart(2, formatNumber(locale, 0));
  const vignettes = [
    (dark: boolean) => <PosVignette locale={locale} dark={dark} />,
    () => <DashboardVignette />,
    () => <StockVignette locale={locale} />,
    () => <StoresVignette />,
  ];

  return (
    <section aria-labelledby="solutions-heading" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal><SectionHeading index={index} id="solutions-heading" eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} /></Reveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {solutions.map((solution, i) => {
          const copy = solution[locale];
          const dark = i === 0;
          return (
            <Reveal key={solution.slug} delay={(i % 2) * 80} className="h-full">
              <Link
                href={localePath(locale, `/${solution.slug}`)}
                className={`group flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(14,20,51,0.55)] ${
                  dark ? "panel-glow text-white" : "card"
                }`}
              >
                <div className={`relative h-44 overflow-hidden ${dark ? "border-b border-white/10 bg-white/[0.04]" : "border-b border-line bg-background/70"}`} aria-hidden="true">
                  <div className={`absolute inset-0 ${dark ? "" : "bg-dots opacity-40"}`} />
                  {(vignettes[i] ?? (() => null))(dark)}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className={`mono-label ${dark ? "text-marigold" : "text-primary"}`}>{pad(i + 1)}</span>
                  <h3 className={`mt-3 text-xl font-bold sm:text-2xl ${dark ? "text-white" : "text-foreground"}`}>{copy.heading}</h3>
                  <p className={`mt-2 text-sm leading-6 ${dark ? "text-white/70" : "text-muted"}`}>{copy.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-6">
                    <span className={`text-sm font-semibold ${dark ? "text-white" : "text-foreground"}`}>{dict.explore}</span>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full transition duration-300 group-hover:translate-x-1 group-hover:bg-marigold group-hover:text-ink ${
                      dark ? "bg-white/10 text-white" : "bg-ink text-white"
                    }`}>
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
