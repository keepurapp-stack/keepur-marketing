"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ACCENT = "#1E2A5A"; // keepur premium indigo

const sectionFade = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55 } },
};

export default function ReadySection() {
  return (
    <motion.section
      id="ready"
      className="relative overflow-hidden rounded-[44px] border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={sectionFade}
    >
      {/* soft premium background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-28 h-80 w-80 rounded-full bg-slate-100 blur-3xl" />
        <div
          className="absolute -bottom-32 right-[-140px] h-96 w-96 rounded-full blur-3xl"
          style={{ background: `${ACCENT}14` }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-slate-500">
          Ready when you are
        </p>

        <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
          Start using keepur, without the stress.
        </h2>

        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
          We will help you set up products, train your staff, and get your sales and inventory
          running smoothly. Start small, scale when you are ready.
        </p>

        {/* quick trust chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur">
            Quick setup
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur">
            Staff training
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 backdrop-blur">
            Reliable daily sync
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="w-full rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto"
            style={{ background: ACCENT }}
          >
            Request a demo
          </Link>

          <a
            href="https://wa.me/8801778726988"
            target="_blank"
            rel="noreferrer"
            className="group flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition sm:w-auto"
            style={{ background: "#25D366" }}
          >
            <span>Connect on WhatsApp</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 transition duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path d="M5 12a1 1 0 0 1 1-1h9.586l-2.293-2.293a1 1 0 1 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 13H6a1 1 0 0 1-1-1z" />
            </svg>
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          No pressure. We will recommend the simplest setup for your shop.
        </p>
      </div>
    </motion.section>
  );
}
