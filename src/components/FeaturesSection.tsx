"use client";

import { motion } from "framer-motion";

const ACCENT = "#1E2A5A"; // deep indigo, premium and calm

const featureList = [
  {
    title: "Sales, kept in one place",
    description:
      "Run checkout, track sales, and keep customer history together. No tab switching, no guesswork.",
    action: "View sales flow" as const,
  },
  {
    title: "Inventory you can trust",
    description:
      "Know what is in stock, what is moving, and what needs replenishment. Updates stay accurate across sales and stock moves.",
    action: "See inventory" as const,
  },
  {
    title: "Reports that answer questions",
    description:
      "Daily summaries, best sellers, profit signals, and stock insights. Built to help you decide faster, not read more.",
    action: "Open reports" as const,
  },
  {
    title: "Works anywhere you work",
    description:
      "Use keepur on desktop, tablet, or mobile. Approve actions, check numbers, and stay in control on the go.",
    action: "Take a quick tour" as const,
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06 },
  }),
};

export default function FeaturesSection() {
  return (
    <motion.section
      id="features"
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionFade}
    >
      {/* Subtle background for a more premium feel */}
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-slate-50 to-white" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-start">
          {/* Left: calm headline and promise */}
          <div className="space-y-4">
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: ACCENT }}
            >
              Built for clarity
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
              Everything you need to run your shop, without complexity.
            </h2>

            <p className="max-w-prose text-sm leading-6 text-slate-600">
              keepur keeps sales, inventory, and reporting in sync so your team
              can work confidently every day.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs text-slate-600">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                Sales sync
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                Stock accuracy
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                Clear reporting
              </span>
            </div>
          </div>

          {/* Right: cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {featureList.map((feature, i) => (
              <motion.article
                key={feature.title}
                custom={i}
                variants={cardAnim}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {feature.title}
                  </h3>

                  <span
                    className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.65rem] uppercase tracking-widest text-slate-700"
                    aria-label="keepur"
                    title="keepur"
                  >
                    keepur
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>

                <button
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition"
                  style={{ color: ACCENT }}
                >
                  {feature.action}
                  <span
                    className="translate-x-0 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
