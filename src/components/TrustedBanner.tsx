"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const trustedLogos = [
  { src: "https://res.cloudinary.com/dk6f1hazg/image/upload/v1769220026/original-ab209fdcc9cc2b05ad1a301be4849662_uyjzre.webp" },
  { src: "https://res.cloudinary.com/dk6f1hazg/image/upload/v1769220221/images_4_fh4ctx.jpg" },
  { src: "https://res.cloudinary.com/dk6f1hazg/image/upload/v1769220275/8a1b12107416533.5fa68a8615aba_sbcrvr.webp" },
  { src: "https://res.cloudinary.com/dk6f1hazg/image/upload/v1769220350/attachment_119771326_tauxhm.png" },
  { src: "https://res.cloudinary.com/dk6f1hazg/image/upload/v1769220473/images_5_q54yn3.jpg" },
  { src: "https://res.cloudinary.com/dk6f1hazg/image/upload/v1769220521/Svg-Logo_x7uvbc.png" },

];

export default function TrustedBanner() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);

  // duplicate list for seamless loop
  const items = useMemo(() => [...trustedLogos, ...trustedLogos], []);
  const showStaticColumn = !isHydrated || reduceMotion;

  return (
    <section className="rounded-[32px] p-5  sm:p-6">
      <div className="mb-3 text-xs uppercase text-center tracking-widest text-primary">
        Trusted by retailers
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-slate-100/60 px-3 py-4">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-slate-100/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-slate-100/90 to-transparent" />

        {showStaticColumn ? (
          <div className="flex flex-col gap-3 px-3 sm:px-4">
            {trustedLogos.map((logo, idx) => (
              <div
                key={`${logo.src}-${idx}`}
                className="flex h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 shadow-sm"
              >
                <Image
                  src={logo.src}
                  alt="Retail partner logo"
                  width={140}
                  height={60}
                  className="h-full w-auto max-w-[92%] object-contain grayscale transition hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="marquee group">
            <div
              className={[
                "marquee-track",
                reduceMotion ? "static" : "",
              ].join(" ")}
            >
              {items.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex h-14 w-36 items-center justify-center opacity-70 transition hover:opacity-100"
                >
                  <Image
                    src={logo.src}
                    alt="Retail partner logo"
                    width={140}
                    height={60}
                    className="object-contain grayscale transition hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          width: max-content;
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .group:hover .marquee-track {
          animation-play-state: paused;
        }

        .static {
          animation: none;
          transform: translateX(0);
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
