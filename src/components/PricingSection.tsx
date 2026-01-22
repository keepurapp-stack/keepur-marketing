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

const defaultPlans: DisplayPlan[] = [
  {
    id: "starter",
    planKey: "starter",
    label: "Starter",
    description: "New shops and solo owners getting started with digital tracking.",
    priceLabel: "৳499",
    cadenceLabel: "/mo",
    priceValue: 499,
    entitlementHighlights: [
      "1 team member",
      "200 SKUs",
      "1 device",
      "Up to 300 monthly orders",
      "Basic reporting",
    ],
    trialLabel: "14-day trial",
    buttonLabel: "Start with Starter",
  },
  {
    id: "business",
    planKey: "business",
    label: "Business",
    description: "Growing shops that need staff access, reports, and control.",
    priceLabel: "৳1,499",
    cadenceLabel: "/mo",
    priceValue: 1499,
    entitlementHighlights: [
      "3 team members",
      "1,500 SKUs",
      "Advanced reporting",
      "Inventory alerts",
    ],
    trialLabel: "30-day trial",
    featured: true,
    buttonLabel: "Choose Business",
  },
  {
    id: "pro",
    planKey: "pro",
    label: "Pro",
    description: "High-volume retail, wholesalers, and expanding brands.",
    priceLabel: "৳2,999",
    cadenceLabel: "/mo",
    priceValue: 2999,
    entitlementHighlights: [
      "10 team members",
      "5,000 SKUs",
      "Stock movements",
      "Priority support",
    ],
    trialLabel: "Personalized onboarding",
    buttonLabel: "Choose Pro",
  },
  {
    id: "custom",
    planKey: "custom",
    label: "Custom",
    description: "Custom limits, onboarding, and support for large operations.",
    priceLabel: "Let’s talk",
    cadenceLabel: "",
    priceValue: null,
    entitlementHighlights: ["Unlimited SKUs", "Custom workflows", "SLA-backed support"],
    buttonLabel: "Talk to us",
    isCustom: true,
  },
];

const formatSkuLabel = (value: number | null) =>
  value ? `${value.toLocaleString("en-US")} SKUs` : "Unlimited SKUs";

const formatTeamMembers = (value: number | null) =>
  value ? `${value} team member${value > 1 ? "s" : ""}` : "Unlimited team members";

const formatMonthlyOrders = (value: number | null) =>
  value ? `Up to ${value.toLocaleString("en-US")} monthly orders` : "Unlimited monthly orders";

const capitalizeReportsLevel = (value: string | null) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)} reporting` : null;

const buildEntitlementHighlights = (entitlements: Entitlements): string[] => {
  const highlights = [
    formatTeamMembers(entitlements.maxTeamMembers),
    formatSkuLabel(entitlements.maxSkus),
    formatMonthlyOrders(entitlements.maxMonthlySales),
  ];

  const optionalHighlights = [
    capitalizeReportsLevel(entitlements.reportsLevel),
    entitlements.maxDevices
      ? `${entitlements.maxDevices} device${entitlements.maxDevices > 1 ? "s" : ""}`
      : null,
    entitlements.inventoryReplenishmentEnabled ? "Inventory alerts" : null,
    entitlements.stockMovementsEnabled ? "Stock movement history" : null,
    entitlements.expensesEnabled ? "Expense tracking" : null,
    entitlements.customInvoiceEnabled ? "Custom invoices" : null,
  ].filter(Boolean) as string[];

  return [...highlights, ...optionalHighlights].slice(0, 6);
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
    if (plans.length === 0) return defaultPlans;

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
        <p className="text-xs uppercase tracking-widest text-slate-500">Pricing</p>
        <h2 className="text-3xl font-semibold leading-tight text-slate-900">
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

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
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
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {plan.planKey}
                </p>
                <h3 className="text-xl font-semibold text-slate-900">{plan.label}</h3>
                <p className="min-h-[56px] text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>
              </div>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-3xl font-semibold tracking-tight text-slate-900">
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

              {/* tighter bullet spacing */}
              <ul className="mt-4 space-y-1.5 text-sm text-slate-700">
                {plan.entitlementHighlights.map((highlight, idx) => (
                  <li key={`${plan.id}-h-${idx}`} className="flex items-start gap-2">
                    <span
                      className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: ACCENT }}
                    />
                    <span className="leading-5">{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* button pinned to bottom */}
              <div className="mt-auto pt-4">
                <a
                  href={
                    plan.isCustom
                      ? "https://app.keepur.app/contact"
                      : `https://app.keepur.app/signup?plan=${plan.planKey}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={[
                    "inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition",
                    isFeatured
                      ? "text-white hover:opacity-95"
                      : "border border-slate-300 bg-white text-slate-900 hover:border-slate-400",
                  ].join(" ")}
                  style={isFeatured ? { background: ACCENT } : undefined}
                >
                  {plan.buttonLabel}
                </a>

                {!plan.isCustom && (
                  <p className="mt-2 text-center text-xs text-slate-500">
                    No hidden fees.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
}
