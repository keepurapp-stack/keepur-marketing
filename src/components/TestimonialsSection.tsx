"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ACCENT = "#1E2A5A";

type Testimonial = {
  name: string;
  role: string;
  location: string;
  quote: string;
  avatar?: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Priya",
    role: "Owner, Northwind Apparel",
    location: "Dhaka",
    quote:
      "আগে sales আর stock আলাদা জায়গায় দেখতাম, মাথা নষ্ট হয়ে যেত। এখন keepur এ সব এক জায়গায়, daily হিসাব clear থাকে.",
  },
  {
    name: "Marco",
    role: "Operations Manager, Meridian Retail",
    location: "Chattogram",
    quote:
      "Busy time এ staff ভুল করে ফেলত। keepur এ sales sync ঠিক থাকে, stock update দিলে সবাই same numbers দেখে. Peace লাগে.",
  },
  {
    name: "Nusrat",
    role: "Manager, Boutique Corner",
    location: "Sylhet",
    quote:
      "Invoice, stock, report সব consistent. Closing time এ আর দৌড়াদৌড়ি নেই, end of day summary এক মিনিটে বের হয়ে যায়.",
  },
  {
    name: "Rafi",
    role: "Founder, City Mart",
    location: "Dhaka",
    quote:
      "Setup easy ছিল। staff দের বুঝাতে বেশি time লাগেনি। এখন আমি বাইরে থেকেও sales কেমন হচ্ছে quickly দেখে নিতে পারি.",
  },
  {
    name: "Shafin",
    role: "Supervisor, Daily Goods",
    location: "Cumilla",
    quote:
      "আগে replenishment late হতো। এখন stock কমলেই immediately বুঝা যায়। day শেষে হিসাব clean থাকে, তাই tension কম.",
  },
];


function useCardsPerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase() || name.slice(0, 1).toUpperCase();
}

/**
 * Premium avatar:
 * - Always has a soft gradient base
 * - If image exists, it sits on top (cropped circle)
 * - If no image, show initials
 */
function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  return (
    <div className="relative h-11 w-11">
      {/* Gradient base */}
      <div
        className=" rounded-full h-11 w-11"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%)," +
            `linear-gradient(135deg, ${ACCENT}33, rgba(148,163,184,0.35))`,
        }}
      />

      {/* Inner circle */}
      <div className="absolute inset-[2px] h-11 w-11  overflow-hidden rounded-full border border-white/70 bg-white/70">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${name} profile`}
            fill
            className="object-cover"
            sizes="44px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-800">
            {initials(name)}
          </div>
        )}
      </div>

      {/* Soft ring */}
      <div className="pointer-events-none absolute -inset-1 rounded-full border border-slate-200/60" />
    </div>
  );
}

export default function TestimonialsCarousel() {
  const perView = useCardsPerView();
  const total = testimonials.length;

  // Track measurements
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportW, setViewportW] = useState(0);

  // Gap between cards (must match Tailwind gap-4 => 16px)
  const GAP = 16;

  // Infinite loop setup: clone perView items at both ends
  const clones = Math.min(perView, total);
  const extended = useMemo(() => {
    const head = testimonials.slice(0, clones);
    const tail = testimonials.slice(-clones);
    return [...tail, ...testimonials, ...head];
  }, [clones]);

  // index is in the extended array space
  // start at the first "real" slide position
  const [index, setIndex] = useState(clones);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Measure width
  useEffect(() => {
    if (!viewportRef.current) return;

    const el = viewportRef.current;
    const ro = new ResizeObserver(() => {
      setViewportW(el.clientWidth);
    });

    ro.observe(el);
    setViewportW(el.clientWidth);

    return () => ro.disconnect();
  }, []);

  // Card width depends on viewport width and perView
  const cardW = useMemo(() => {
    if (!viewportW) return 0;
    const totalGaps = GAP * (perView - 1);
    return (viewportW - totalGaps) / perView;
  }, [viewportW, perView]);

  // Step distance per slide (one card)
  const step = useMemo(() => (cardW ? cardW + GAP : 0), [cardW]);

  // TranslateX based on current index
  const x = useMemo(() => -index * step, [index, step]);

  // Autoplay (moves by 1 card)
  useEffect(() => {
    if (isPaused) return;
    if (!step) return;

    const id = window.setInterval(() => {
      setIndex((v) => v + 1);
    }, 3500);

    return () => window.clearInterval(id);
  }, [isPaused, step]);

  // When perView changes, rebuild position cleanly
  useEffect(() => {
    // reset to the first real slide position for new clones count
    const newClones = Math.min(perView, total);
    setIndex(newClones);
  }, [perView, total]);

  // After each animation completes, if we landed in clones, jump (no animation) to the mirrored real position
  function handleTransitionEnd() {
    setIsAnimating(false);

    // If moved past the real end into head clones
    if (index >= clones + total) {
      // jump back by total
      setIndex(clones);
      return;
    }

    // If moved before the real start into tail clones
    if (index < clones) {
      setIndex(clones + total - 1);
      return;
    }
  }

  const canRender = cardW > 0;

  return (
    <section
      className="relative overflow-hidden rounded-[44px] border border-slate-200 bg-white px-6 py-12 sm:px-10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="max-w-xl space-y-3">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Trusted by shop owners
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-slate-900">
            Businesses that run with confidence.
          </h2>
          <p className="text-sm text-slate-600">
            Calm, consistent, and easy to use, keepur helps teams stay in control every day.
          </p>
        </div>

        {/* Viewport */}
        <div className="relative" ref={viewportRef}>
          <div className="overflow-hidden">
            {canRender && (
              <motion.div
                className="flex"
                style={{ gap: `${GAP}px` }}
                animate={{ x }}
                transition={{
                  duration: isAnimating ? 0.55 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={handleTransitionEnd}
              >
                {extended.map((t, i) => (
                  <div
                    key={`${t.name}-${t.location}-${i}`}
                    className="shrink-0"
                    style={{ width: `${cardW}px` }}
                  >
                    <article className="h-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <Avatar name={t.name} avatar={t.avatar} />

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900">
                            {t.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {t.role} · {t.location}
                          </p>
                        </div>


                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-700">
                        “{t.quote}”
                      </p>
                    </article>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIndex((v) => v - 1)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-300"
                aria-label="Previous"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setIndex((v) => v + 1)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-95"
                style={{ background: ACCENT }}
                aria-label="Next"
              >
                →
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Autoplay pauses on hover.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
