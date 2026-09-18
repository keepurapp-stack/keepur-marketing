"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const ACCENT = "#1E2A5A";

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

type BillingProfile = {
  currency: string;
  interval: string;
  priceAmount: number | null;
  trialDaysDefault: number | null;
};

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
  billingProfile: BillingProfile & { gatewayCompatibility: Record<string, unknown> };
  entitlements: Entitlements;
  isFeatured?: boolean;
};

type DisplayPlan = {
  id: string;
  planKey: string;
  label: string;
  description: string;
  priceLabel: string;
  cadenceLabel: string;
  featured?: boolean;
  buttonLabel: string;
  isCustom?: boolean;
  priceValue: number | null;
  entitlementHighlights: string[];
  trialLabel?: string;
};

const formatLimit = (value: number | null | undefined, singular: string, plural: string) => {
  if (value === null) return `Unlimited ${plural}`;
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) return null;
  return `${value.toLocaleString("en-US")} ${value === 1 ? singular : plural}`;
};

const buildEntitlementHighlights = (entitlements: Entitlements): string[] => {
  const monthlySales = entitlements.maxMonthlySales;
  const reports = entitlements.reportsLevel;
  return [
    formatLimit(entitlements.maxStores, "store", "stores"),
    formatLimit(entitlements.maxTeamMembers, "team member", "team members"),
    formatLimit(entitlements.maxSkus, "product (SKU)", "products (SKUs)"),
    monthlySales === null ? "Unlimited sales per month" :
      typeof monthlySales === "number" && monthlySales >= 0
        ? `Up to ${monthlySales.toLocaleString("en-US")} sales per month` : null,
    formatLimit(entitlements.maxDevices, "device", "devices"),
    reports && reports !== "none" ? `${reports.charAt(0).toUpperCase()}${reports.slice(1)} reporting` : null,
    entitlements.inventoryReplenishmentEnabled ? "Inventory alerts" : null,
    entitlements.stockMovementsEnabled ? "Stock movement history" : null,
    entitlements.expensesEnabled ? "Expense tracking" : null,
    entitlements.customInvoiceEnabled ? "Custom invoices" : null,
  ].filter((highlight): highlight is string => Boolean(highlight));
};

const normalizePlan = (plan: ApiPlan): DisplayPlan => {
  const rawPrice = plan.billingProfile.priceAmount;
  const priceLabel = rawPrice ? `৳${rawPrice.toLocaleString("en-US")}` : "Custom";
  const cadenceLabel = rawPrice ? `/${plan.billingProfile.interval}` : "";
  const isCustom = priceLabel === "Custom";
  const trialLabel = plan.billingProfile.trialDaysDefault
    ? `${plan.billingProfile.trialDaysDefault}-day trial`
    : undefined;

  return {
    id: plan._id,
    planKey: plan.planKey,
    label: plan.name,
    description: plan.description,
    priceLabel: isCustom ? "Let’s talk" : priceLabel,
    cadenceLabel: isCustom ? "" : cadenceLabel,
    priceValue: rawPrice ?? null,
    entitlementHighlights: buildEntitlementHighlights(plan.entitlements),
    trialLabel,
    featured: plan.isFeatured ?? false,
    buttonLabel: isCustom ? "Talk to us" : `Choose ${plan.name}`,
    isCustom,
  };
};

const getBaseUrl = () => process.env.NEXT_PUBLIC_KEEPUR_BASE_API ?? "https://api.keepur.app";

export default function PricingSection() {
  const [plans, setPlans] = useState<DisplayPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = getBaseUrl();

    fetch(`${baseUrl}/api/plans/public`, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load plans");
        const data = await res.json();
        const planList: ApiPlan[] | undefined = Array.isArray(data.plans)
          ? data.plans
          : Array.isArray(data)
            ? data
            : undefined;

        if (!planList) throw new Error("Invalid plan payload");
        setPlans(planList.map(normalizePlan));
      })
      .catch((err: Error & { name?: string }) => {
        if (err.name === "AbortError") return;
        console.error(err);
        setError("Unable to load plans right now.");
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  const displayedPlans = useMemo(() => {

    const sorted = [...plans].sort((a, b) => {
      const priceA = a.priceValue ?? Number.POSITIVE_INFINITY;
      const priceB = b.priceValue ?? Number.POSITIVE_INFINITY;
      if (priceA !== priceB) return priceA - priceB;
      if (a.isCustom && !b.isCustom) return 1;
      if (!a.isCustom && b.isCustom) return -1;
      return a.label.localeCompare(b.label);
    });

    const hasFeatured = sorted.some((p) => p.featured);
    if (!hasFeatured) {
      return sorted.map((p) => ({ ...p, featured: p.planKey === "business" }));
    }

    return sorted;
  }, [plans]);

  return (
    <motion.section
      id="pricing"
      className="relative space-y-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionFade}
    >
      <div className="max-w-2xl space-y-3">
        <p className="text-xs uppercase tracking-widest text-primary">Pricing</p>
        <h2 className="text-3xl font-semibold leading-tight text-foreground">
          Simple plans for everyday shops.
        </h2>
        <p className="text-sm text-slate-600">
          Start small, upgrade when you grow. Prices shown in BDT.
        </p>

        <div className="text-xs text-slate-500">
          {isLoading && "Loading live plan info…"}
          {error && <span className="text-rose-500">{error}</span>}
        </div>
      </div>

      {!isLoading && !error && displayedPlans.length === 0 && (
        <p className="text-sm text-slate-500">No plans are available right now.</p>
      )}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPlans.map((plan) => {
          const isFeatured = Boolean(plan.featured);

          return (
            <article
              key={plan.id}
              className={[
                "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md",
                isFeatured ? "border-slate-300" : "border-slate-200",
              ].join(" ")}
            >
              {isFeatured && (
                <div className="absolute right-5 top-5 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[0.65rem] font-semibold text-slate-800 backdrop-blur">
                  Recommended
                </div>
              )}

              {isFeatured && (
                <div
                  className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                  style={{
                    background:
                      "radial-gradient(80% 70% at 30% 0%, rgba(226,232,240,0.7) 0%, rgba(255,255,255,0) 60%)," +
                      `linear-gradient(135deg, ${ACCENT}14, rgba(255,255,255,0))`,
                  }}
                />
              )}

              <div className="space-y-2">
             
                <h3 className={`text-xl font-semibold text-foreground ${isFeatured ? "pr-32" : ""}`}>{plan.label}</h3>
                <p className="min-h-[56px] text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-3xl font-semibold tracking-tight text-foreground">
                  {plan.priceLabel}
                </span>
                {plan.cadenceLabel ? (
                  <span className="pb-1 text-sm text-slate-500">{plan.cadenceLabel}</span>
                ) : null}
              </div>

              {plan.trialLabel ? (
                <p className="mt-2 text-xs text-slate-500">{plan.trialLabel}</p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">Cancel anytime</p>
              )}

              <ul role="list" className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 marker:text-[#1E2A5A]">
                {plan.entitlementHighlights.map((highlight, idx) => (
                  <li key={`${plan.id}-h-${idx}`} className="pl-1 break-words">
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* button pinned to bottom */}
              <div className="mt-auto pt-4">
                <a
                  href={
                    plan.isCustom
                      ? "/contact"
                      : `https://app.keepur.app/signup?plan=${plan.planKey}`
                  }
                  className={[
                    "inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition",
                    isFeatured
                      ? "text-white hover:opacity-95"
                      : "border border-slate-300 bg-white text-foreground hover:border-slate-400",
                  ].join(" ")}
                  style={isFeatured ? { background: ACCENT } : undefined}
                >
                  {plan.buttonLabel}
                </a>


              </div>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
