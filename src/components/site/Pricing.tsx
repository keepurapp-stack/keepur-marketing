"use client";

import { useEffect, useMemo, useState } from "react";
import { formatNumber, localePath, type Locale } from "@/i18n/config";
import { fmt, type Dictionary } from "@/i18n";
import { getApiBase } from "@/lib/api";
import { appUrl } from "@/lib/seo";
import { IconArrow, IconCheck } from "./Icons";
import SectionHeading from "./SectionHeading";

type Entitlements = {
  maxTeamMembers: number | null;
  maxStores?: number | null;
  maxSkus: number | null;
  maxDevices: number | null;
  maxMonthlySales: number | null;
  reportsLevel: string | null;
  inventoryReplenishmentEnabled: boolean;
  stockMovementsEnabled: boolean;
  expensesEnabled: boolean;
  customInvoiceEnabled: boolean;
};

type ApiPlan = {
  _id: string;
  planKey: string;
  name: string;
  description: string;
  billingProfile: { currency: string; interval: string; priceAmount: number | null; trialDaysDefault: number | null };
  entitlements: Entitlements;
  isFeatured?: boolean;
};

type T = Dictionary["pricing"];

// Limits shown: stores, team, SKUs, monthly sales (aligned with deshop-frontend signup cards). Devices are
// intentionally not shown: the web app does not connect devices yet.
type FlagKey = "inventoryReplenishmentEnabled" | "stockMovementsEnabled" | "expensesEnabled" | "customInvoiceEnabled";
const FLAGS: { key: FlagKey; label: (t: T) => string }[] = [
  { key: "inventoryReplenishmentEnabled", label: (t) => t.inventoryAlerts },
  { key: "stockMovementsEnabled", label: (t) => t.stockMovements },
  { key: "expensesEnabled", label: (t) => t.expenses },
  { key: "customInvoiceEnabled", label: (t) => t.customInvoices },
];

type LimitKey = keyof T["limits"];
const LIMITS: { key: LimitKey; get: (e: Entitlements) => number | null | undefined }[] = [
  { key: "stores", get: (e) => e.maxStores },
  { key: "team", get: (e) => e.maxTeamMembers },
  { key: "sku", get: (e) => e.maxSkus },
  { key: "sales", get: (e) => e.maxMonthlySales },
];

function limitText(value: number | null | undefined, locale: Locale, t: T) {
  if (value === null) return t.unlimitedShort;
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return "—";
  return formatNumber(locale, value);
}

function reportText(level: string | null, t: T) {
  if (!level || level === "none") return "—";
  return t.reportLevelNames[level] ?? `${level.charAt(0).toUpperCase()}${level.slice(1)}`;
}

export default function Pricing({ index, locale, dict }: { index: string; locale: Locale; dict: T }) {
  const [plans, setPlans] = useState<ApiPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${getApiBase()}/api/plans/public`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load plans");
        const data = await res.json();
        const list: ApiPlan[] | undefined = Array.isArray(data.plans) ? data.plans : Array.isArray(data) ? data : undefined;
        if (!list) throw new Error("Invalid plan payload");
        setPlans(list);
      })
      .catch((err: Error) => {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const display = useMemo(() => {
    const sorted = [...plans].sort((a, b) => {
      const pa = a.billingProfile.priceAmount || Number.POSITIVE_INFINITY;
      const pb = b.billingProfile.priceAmount || Number.POSITIVE_INFINITY;
      return pa !== pb ? pa - pb : a.name.localeCompare(b.name);
    });
    const hasFeatured = sorted.some((p) => p.isFeatured);
    return sorted.map((p) => ({ ...p, featured: hasFeatured ? Boolean(p.isFeatured) : p.planKey === "business" }));
  }, [plans]);

  const priced = display.filter((p) => p.billingProfile.priceAmount);
  const custom = display.filter((p) => !p.billingProfile.priceAmount);
  const cards = [...priced, ...custom];
  const layout = rowLayout(cards.length);

  // Features every priced plan has are shown once; cards only list what differs.
  const commonFlags = priced.length ? FLAGS.filter((f) => priced.every((p) => p.entitlements[f.key])) : [];
  const trials = new Set(priced.map((p) => p.billingProfile.trialDaysDefault || 0));
  const sharedTrial = trials.size === 1 ? [...trials][0] : 0;
  const everyPlan = [
    ...(sharedTrial ? [fmt(dict.trial, { days: formatNumber(locale, sharedTrial) })] : []),
    ...commonFlags.map((f) => f.label(dict)),
    ...dict.everyPlanExtras,
  ];

  return (
    <section id="pricing" className="relative overflow-hidden bg-surface py-20">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading index={index} eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} />
        <div className="mt-4 text-sm" aria-live="polite">
          {loading && <span className="text-muted">{dict.loading}</span>}
          {error && <span className="text-rose-600">{dict.error}</span>}
          {!loading && !error && display.length === 0 && <span className="text-muted">{dict.empty}</span>}
        </div>

        {loading && (
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => <div key={i} className="card h-[520px] animate-pulse" />)}
          </div>
        )}

        {cards.length > 0 && (
          <div className={`no-scrollbar mt-12 ${layout.row}`}>
            {cards.map((plan) => {
              const price = plan.billingProfile.priceAmount ?? 0;
              const isCustom = !price;
              const interval = plan.billingProfile.interval?.toLowerCase();
              const cadence = dict.intervals[interval] ?? plan.billingProfile.interval;
              const trial = plan.billingProfile.trialDaysDefault;
              const extras = FLAGS.filter((x) => plan.entitlements[x.key] && !commonFlags.includes(x));
              const f = plan.featured && !isCustom;
              const rows = [
                ...LIMITS.map((l) => ({ label: dict.limits[l.key], value: limitText(l.get(plan.entitlements), locale, dict) })),
                { label: dict.reports, value: reportText(plan.entitlements.reportsLevel, dict) },
              ];
              const tone = f
                ? "panel-glow text-white shadow-[0_30px_60px_-30px_rgba(14,20,51,0.7)] ring-2 ring-marigold/70"
                : isCustom
                  ? "rounded-[1.75rem] border border-dashed border-foreground/25 bg-card/60"
                  : "card";
              return (
                <article key={plan._id} className={`relative flex flex-col rounded-[1.75rem] ${layout.card} ${tone}`}>
                  {/* name + who it's for */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xl font-bold ${f ? "text-white" : "text-foreground"}`}>{plan.name}</h3>
                    {f && <span className="rounded-full bg-marigold px-2.5 py-1 text-[11px] font-bold text-ink">{dict.recommended}</span>}
                  </div>
                  <p className={`mt-1 line-clamp-2 min-h-[2.5rem] text-sm leading-5 ${f ? "text-white/65" : "text-muted"}`}>{plan.description}</p>

                  {/* price (fixed height so every card lines up) */}
                  <div className="mt-4 flex min-h-[3.25rem] flex-wrap items-baseline gap-x-1.5">
                    {isCustom ? (
                      <span className={`font-display font-extrabold tracking-tight text-foreground ${layout.price}`}>{dict.custom}</span>
                    ) : (
                      <>
                        <span className={`font-display font-extrabold tracking-tight ${layout.price}`}>৳{formatNumber(locale, price)}</span>
                        <span className={`text-sm ${f ? "text-white/50" : "text-muted"}`}>/{cadence}</span>
                      </>
                    )}
                  </div>
                  <p className={`text-xs font-medium ${isCustom ? "text-muted" : f ? "text-marigold" : "text-emerald-700"}`}>
                    {isCustom ? dict.customNote : trial ? fmt(dict.trial, { days: formatNumber(locale, trial) }) : dict.cancelAnytime}
                  </p>

                  {/* CTA right under the price: same height on every card */}
                  <a
                    href={isCustom ? localePath(locale, "/contact") : `${appUrl}/signup?plan=${encodeURIComponent(plan.planKey)}`}
                    className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold ${
                      f ? "btn-accent" : isCustom ? "btn-secondary bg-card" : "btn-primary"
                    }`}
                  >
                    {isCustom ? dict.talkToUs : fmt(dict.choose, { plan: plan.name })}
                    {isCustom && <IconArrow className="h-4 w-4" />}
                  </a>

                  {/* spec sheet: same rows on every card so plans compare across */}
                  <dl className={`mt-5 divide-y rounded-2xl border text-[13px] ${f ? "divide-white/10 border-white/10 bg-white/[0.04]" : "divide-line border-line bg-background/60"}`}>
                    {rows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-2 px-3.5 py-2.5">
                        <dt className={`truncate ${f ? "text-white/60" : "text-muted"}`}>{row.label}</dt>
                        <dd className={`shrink-0 whitespace-nowrap font-semibold tabular-nums ${row.value === "—" ? (f ? "text-white/30" : "text-foreground/30") : f ? "text-white" : "text-foreground"}`}>
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {extras.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm">
                      {extras.map((x) => (
                        <li key={x.key} className="flex items-center gap-2">
                          <IconCheck className={`h-4 w-4 shrink-0 ${f ? "text-marigold" : "text-primary"}`} />
                          <span className={f ? "text-white/85" : "text-foreground"}>{x.label(dict)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {/* What every plan has, once, as a slim full-width strip. */}
        {priced.length > 0 && everyPlan.length > 0 && (
          <div className="card mt-6 grid gap-5 p-6 sm:p-7 lg:grid-cols-[11rem_1fr] lg:items-center">
            <p className="mono-label text-muted">{dict.everyPlan}</p>
            <ul className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {everyPlan.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <IconCheck className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {display.length > 1 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowCompare((v) => !v)}
              aria-expanded={showCompare}
              aria-controls="plan-compare"
              className="btn-secondary px-6 py-3 text-sm"
            >
              {showCompare ? dict.compareHide : dict.compare}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 transition ${showCompare ? "rotate-180" : ""}`} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
            </button>
          </div>
        )}

        {showCompare && (
          <div id="plan-compare" className="card animate-fade-up mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="sticky left-0 bg-card px-5 py-4 text-left font-semibold text-muted">{dict.feature}</th>
                  {display.map((p) => (
                    <th key={p._id} scope="col" className={`px-4 py-4 text-center font-display font-bold ${p.featured ? "text-brand" : "text-foreground"}`}>
                      {p.name}
                      <span className="block font-sans text-xs font-medium text-muted">
                        {p.billingProfile.priceAmount ? `৳${formatNumber(locale, p.billingProfile.priceAmount)}${dict.perMonth}` : dict.custom}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LIMITS.map((l) => (
                  <tr key={l.key} className="border-b border-line/70">
                    <th scope="row" className="sticky left-0 bg-card px-5 py-3 text-left font-medium text-foreground">{dict.limits[l.key]}</th>
                    {display.map((p) => (
                      <td key={p._id} className={`px-4 py-3 text-center tabular-nums ${p.featured ? "bg-primary/[0.05] font-semibold" : ""}`}>
                        {limitText(l.get(p.entitlements), locale, dict)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-line/70">
                  <th scope="row" className="sticky left-0 bg-card px-5 py-3 text-left font-medium text-foreground">{dict.reports}</th>
                  {display.map((p) => (
                    <td key={p._id} className={`px-4 py-3 text-center ${p.featured ? "bg-primary/[0.05] font-semibold" : ""}`}>{reportText(p.entitlements.reportsLevel, dict)}</td>
                  ))}
                </tr>
                {FLAGS.map((flag) => (
                  <tr key={flag.key} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="sticky left-0 bg-card px-5 py-3 text-left font-medium text-foreground">{flag.label(dict)}</th>
                    {display.map((p) => (
                      <td key={p._id} className={`px-4 py-3 text-center ${p.featured ? "bg-primary/[0.05]" : ""}`}>
                        {p.entitlements[flag.key] ? (
                          <><IconCheck className="mx-auto h-5 w-5 text-emerald-600" /><span className="sr-only">{dict.included}</span></>
                        ) : (
                          <><span aria-hidden="true" className="text-foreground/30">—</span><span className="sr-only">{dict.notIncluded}</span></>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

/** Grid when all priced plans fit in one row; a swipeable snap row otherwise (always on phones). */
function rowLayout(n: number) {
  const scroller = "-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4";
  const phoneCard = "w-[84%] shrink-0 snap-center sm:w-[60%]";
  const gridAt: Record<number, string> = {
    1: "md:mx-auto md:grid md:max-w-md md:grid-cols-1",
    2: "md:mx-auto md:grid md:max-w-3xl md:grid-cols-2",
    3: "md:grid md:grid-cols-3",
    4: "md:grid md:grid-cols-2 lg:grid-cols-4",
    5: "xl:grid xl:grid-cols-5",
  };
  const cardReset: Record<number, string> = {
    1: "md:w-auto", 2: "md:w-auto", 3: "md:w-auto",
    4: "md:w-auto", 5: "md:w-[44%] lg:w-[31%] xl:w-auto",
  };
  const resetScroller: Record<number, string> = {
    1: "md:mx-0 md:overflow-visible md:px-0 md:pb-0", 2: "md:mx-0 md:overflow-visible md:px-0 md:pb-0",
    3: "md:mx-0 md:overflow-visible md:px-0 md:pb-0", 4: "md:mx-0 md:overflow-visible md:px-0 md:pb-0",
    5: "xl:mx-0 xl:overflow-visible xl:px-0 xl:pb-0",
  };
  const k = Math.min(Math.max(n, 1), 6);
  const dense = n >= 4;
  return {
    row: k <= 5 ? `${scroller} ${gridAt[k]} ${resetScroller[k]} md:gap-4` : scroller,
    card: `${phoneCard} ${k <= 5 ? cardReset[k] : "md:w-[44%] lg:w-[31%] xl:w-[23%]"} ${dense ? "p-6" : "p-7"}`,
    price: dense ? "text-4xl" : "text-5xl",
  };
}
