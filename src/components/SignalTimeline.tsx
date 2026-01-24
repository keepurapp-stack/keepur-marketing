"use client";

import { motion } from "framer-motion";

const ACCENT = "#1E2A5A"; // premium indigo

const steps = [
  {
    title: "See",
    copy: "See today’s sales, stock levels, and trends at a glance — without digging through numbers.",
  },
  {
    title: "Decide",
    copy: "Understand what needs attention, what is selling well, and where to restock — clearly and calmly.",
  },
  {
    title: "Act",
    copy: "Update stock, adjust prices, and keep your shop running smoothly — all from one place.",
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07 },
  }),
};

export default function SignalTimeline() {
  return (
    <motion.section
      id="signal"
      className="relative overflow-hidden rounded-[44px] border border-slate-200 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionFade}
    >
      {/* soft background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
        <div
          className="absolute -bottom-40 right-[-140px] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ background: `${ACCENT}14` }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative px-6 py-12 sm:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,1.4fr] lg:items-start">
          {/* Left: sticky-style intro */}
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-widest text-primary">
              How keepur works
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              From clarity to action,
              <br className="hidden sm:block" /> without the stress.
            </h2>

            <p className="max-w-prose text-sm leading-6 text-slate-600 sm:text-base">
              Keep sales, inventory, and reporting in sync. See what’s happening, decide what
              matters, and act with confidence every day.
            </p>

            {/* small “promise” list */}
            <div className="grid gap-2 text-sm text-slate-700 sm:max-w-sm">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3 backdrop-blur">
                <span
                  className="mt-0.5 inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                <span>One system for sales, stock, and reports</span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3 backdrop-blur">
                <span
                  className="mt-0.5 inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                <span>Clear numbers your team can trust</span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 p-3 backdrop-blur">
                <span
                  className="mt-0.5 inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                <span>Fast actions during busy hours</span>
              </div>
            </div>
          </div>

          {/* Right: vertical timeline */}
          <div className="relative">
            {/* timeline rail */}
            <div className="absolute left-[18px] top-0 hidden h-full w-px bg-slate-200 sm:block" />

            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  custom={i}
                  variants={itemAnim}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition "
                >
                  {/* numbered node */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-2xl text-sm font-semibold text-white"
                      style={{ background: ACCENT }}
                    >
                      {i + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Step {i + 1}
                      </p>
                      <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                    </div>

                  </div>

                  <p className="text-sm leading-6 text-slate-600">{step.copy}</p>

                  {/* subtle hover accent */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-3xl opacity-0 transition "
                    style={{ background: `${ACCENT}26` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* small footer note */}
            <div className="mt-5 rounded-3xl border border-slate-200 bg-white/70 p-5 text-sm text-slate-600 backdrop-blur">
              Built for everyday shops in Bangladesh, ready to scale anywhere.
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
