"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const ACCENT = "#1E2A5A";
const ROTATE_MS = 5000;

type Feature = {
  title: string;
  description: string;
  bullets: string[];
  imageSrc: string;
  imageAlt: string;
};

const features: Feature[] = [
  {
    title: "Sales, kept in one place",
    description:
      "Run checkout, track sales, and keep customer history together. No tab switching, no guesswork.",
    bullets: ["Fast checkout flow", "Sales history and refunds", "Customer list and notes"],
    imageSrc: "/images/sales.png",
    imageAlt: "Sales preview",
  },
  {
    title: "Inventory you can trust",
    description:
      "Know what is in stock, what is moving, and what needs replenishment. Updates stay accurate across sales and stock moves.",
    bullets: ["Stock levels by SKU", "Movements and adjustments", "Low stock alerts"],
    imageSrc: "/images/stock.png",
    imageAlt: "Inventory preview",
  },
  {
    title: "Reports that answer questions",
    description:
      "Daily summaries, best sellers, profit signals, and stock insights. Built to help you decide faster, not read more.",
    bullets: ["Daily overview", "Top products and margins", "Stock insights"],
    imageSrc: "/images/report.png",
    imageAlt: "Reports preview",
  },
  {
    title: "Works anywhere you work",
    description:
      "Use Keepur on desktop, tablet, or mobile. Approve actions, check numbers, and stay in control on the go.",
    bullets: ["Mobile friendly screens", "Owner view anytime", "Calm UI for staff"],
    imageSrc: "/images/products.png",
    imageAlt: "Mobile preview",
  },
];

const sectionFade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const mediaAnim = {
  initial: { opacity: 0, y: 10, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.25 } },
};

export default function FeaturesSection() {
  const [active, setActive] = useState(0);
  const activeFeature = useMemo(() => features[active], [active]);

  const intervalRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  const startAuto = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((prev) => (prev + 1) % features.length);
    }, ROTATE_MS);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };

  }, []);

  const onSelect = (idx: number) => {
    setActive(idx);
    startAuto(); // reset timer so it feels responsive
  };

  return (
    <motion.section
      id="features"
      className="relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionFade}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-b from-slate-50 to-white" />

      <div className="mx-auto max-w-6xl px-4 py-6 lg:py-14 sm:px-6">
        <div className="mb-10 space-y-3">
          <p className="text-xs uppercase tracking-widest" style={{ color: ACCENT }}>
            Built for clarity
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            Everything you need to run your shop, without complexity.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Keepur keeps sales, inventory, and reporting in sync so your team can work confidently
            every day.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-2 ">
          {/* Left: selector */}
          <div className="w-full lg:w-[40%] p-4 backdrop-blur sm:p-5">
            <div className="space-y-2">
              {features.map((f, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={f.title}
                    type="button"
                    onClick={() => onSelect(idx)}
                    className={[
                      "w-full rounded-2xl border px-4 py-4 text-left transition",
                      isActive
                        ? "border-slate-200 bg-white shadow-sm"
                        : "border-transparent hover:border-slate-200 hover:bg-white/70",
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900">{f.title}</p>
                        {isActive && (
                          <p className="text-sm leading-6 text-slate-600">{f.description}</p>
                        )}
                      </div>

                      <span
                        className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: isActive ? ACCENT : "rgba(15,23,42,0.18)" }}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>


          </div>

          {/* Right: image background + overlay */}
          <div className="w-full lg:w-[60%] relative overflow-hidden rounded-3xl border border-slate-200 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
            <AnimatePresence mode="wait">
              <motion.div key={activeFeature.imageSrc} {...mediaAnim} className="absolute inset-0">
                <Image
                  src={activeFeature.imageSrc}
                  alt={activeFeature.imageAlt}
                  fill
                  className="object-cover"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/60 via-black/60 to-primary/10" />

            <div className="relative z-10 flex min-h-[360px] flex-col justify-end space-y-4 p-6 text-white">
              <div className="space-y-2">
                <p className="text-2xl font-semibold leading-tight">{activeFeature.title}</p>
                <p className="text-sm leading-6 text-white/90">{activeFeature.description}</p>
              </div>

              <ul className="space-y-2 text-sm text-white/90">
                {activeFeature.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("pricing");
                  if (!el) return;
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 88;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }}
                className="inline-flex w-full items-center justify-center rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/100"
              >
                See pricing
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
