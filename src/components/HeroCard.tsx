"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ACCENT = "#1E2A5A"; // premium deep indigo

const heroStats = [
  { label: "Active retailers", value: "1,240" },
  { label: "Inventory value tracked", value: "৳4.8B" },
  { label: "Sales synced daily", value: "92K+" },
];

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const scrollToPricing = () => {
  if (typeof document === "undefined") return;

  const el = document.getElementById("pricing");
  if (!el) return;

  const yOffset = -96; // header offset
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
};

export default function HeroCard() {

  return (
    <motion.section
      className="relative"
      initial="hidden"
      animate="visible"
      variants={sectionFade}
    >
      {/* Soft premium backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
        <div
          className="absolute right-[-140px] top-10 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `${ACCENT}1A` }}
        />
        <div className="absolute bottom-[-160px] left-1/3 h-96 w-96 rounded-full bg-slate-100 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <p
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[0.7rem] uppercase tracking-widest text-slate-700 backdrop-blur"
                aria-label="keepur pillars"
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                Sales
                <span className="text-slate-300">•</span>
                Inventory
                <span className="text-slate-300">•</span>
                Reports
              </p>


            </div>

            {/* Headline */}
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Business, kept simple.
            </h1>

            {/* Subheading */}
            <p className="mx-auto max-w-xl text-sm leading-6 text-slate-600 sm:text-base lg:mx-0">
              Track sales, manage inventory, and view reports in one calm, reliable system
              built for real shops.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <button
                onClick={scrollToPricing}
                className="rounded-full px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                style={{ background: ACCENT }}
              >
                Start now
              </button>


              <button
                className="rounded-full border border-slate-300 bg-white/60 px-7 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-slate-400"
              >
                Book a call
              </button>
            </div>

            {/* Trust row */}
            <div className="grid gap-3 pt-3 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white/70 p-4 text-left backdrop-blur"
                >
                  <p className="text-[0.65rem] uppercase tracking-widest text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Tiny reassurance line */}
            <p className="text-xs text-slate-500">
              Secure by default. Designed for speed. Simple for everyday use.
            </p>
          </div>

          {/* Right */}
          <div className="relative mx-auto w-full max-w-[560px]">
            {/* Device-style frame */}
            <div className="relative overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.10)]">
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-slate-200 bg-white/70 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="text-[0.65rem] uppercase tracking-widest text-slate-500">
                  Trusted by shop owners
                </span>
              </div>

              {/* Image */}
              <div className="relative aspect-[9/10] w-full bg-slate-50">
                <Image
                  src="/images/marketing.png"
                  alt="keepur preview"
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay card */}
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/60 bg-white/75 p-4 backdrop-blur">
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-500">
                    Everyday retail, clearly tracked
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Sales and stock activity across Bangladesh, in real time
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                    <span className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1">
                      Live sales sync
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1">
                      Stock accuracy
                    </span>
                    <span className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1">
                      Clear insights
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle side highlight */}
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
              style={{ background: `${ACCENT}26` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
