import Image from "next/image";
import type { Dictionary } from "@/i18n";
import { formatNumber, type Locale } from "@/i18n/config";
import { IconBox, IconCart, IconChart, IconShield, IconStore, IconWallet } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const icons = [IconCart, IconBox, IconChart, IconStore, IconShield, IconWallet];

/*
 * Bento layout for six items (lg: 3 columns × 3 rows, sm: 2 columns):
 *   [ 1 ][ 2 ][ 3 ]
 *   [ 1 ][ 4 ][ 5 ]
 *   [      6      ]
 * Card 1 is the tall navy feature card; card 6 is a full-width horizontal card.
 */
const layout = [
  "sm:col-span-2 lg:col-span-1 lg:row-span-2",
  "",
  "",
  "",
  "",
  "sm:col-span-2 lg:col-span-3",
];

function CardHeader({ label, Icon, dark, inline }: { label: string; Icon: (p: { className?: string }) => React.ReactNode; dark?: boolean; inline?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${inline ? "flex-row-reverse justify-end" : "justify-between"}`}>
      <span className={`mono-label ${dark ? "text-white/60" : "text-muted"}`}>{label}</span>
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:-rotate-6 ${
        dark ? "bg-marigold text-ink" : "bg-primary/10 text-primary"
      }`}>
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}

export default function Features({ index, locale, dict }: { index: string; locale: Locale; dict: Dictionary["features"] }) {
  const pad = (n: number) => formatNumber(locale, n).padStart(2, formatNumber(locale, 0));
  const total = pad(dict.items.length);

  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal><SectionHeading index={index} eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} /></Reveal>
      <div className="mt-12 grid gap-4 lg:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3">
        {dict.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          const label = `${pad(i + 1)}/${total}`;
          const hover = "group h-full rounded-3xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-34px_rgba(14,20,51,0.55)]";

          // 1 — tall navy feature card
          if (i === 0) {
            return (
              <Reveal key={item.title} className={`h-full ${layout[i]}`}>
                <article className={`${hover} panel-glow flex flex-col overflow-hidden p-7 text-white sm:p-8`}>
                  <CardHeader label={label} Icon={Icon} dark />
                  <h3 className="mt-10 text-2xl font-bold text-white lg:text-3xl">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-white/75">{item.description}</p>
                  {/* Real POS checkout screen, bleeding off the card's bottom-right edge */}
                  <div className="-mb-7 -mr-7 mt-auto pt-8 sm:-mb-8 sm:-mr-8">
                    <div className="overflow-hidden rounded-tl-2xl bg-white shadow-[0_-10px_50px_-10px_rgba(0,0,0,0.5)] ring-1 ring-white/20 transition duration-500 group-hover:-translate-y-1">
                      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-rose-300" />
                        <span className="h-2 w-2 rounded-full bg-amber-300" />
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        <span className="ml-2 truncate font-mono text-[10px] text-slate-500">yourshop.keepur.app/pos</span>
                      </div>
                      <div className="relative aspect-[2000/1011] w-[165%] sm:w-full lg:w-[175%]">
                        <Image
                          src="/images/pos-checkout.webp"
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 640px, (min-width: 640px) 700px, 600px"
                          className="object-cover object-left-top"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          }

          // 6 — full-width horizontal card
          if (i === dict.items.length - 1) {
            return (
              <Reveal key={item.title} delay={80} className={`h-full ${layout[i]}`}>
                <article className={`${hover} card grid items-center gap-8 p-7 sm:p-8 lg:grid-cols-[1fr_1.1fr]`}>
                  <div>
                    <CardHeader label={label} Icon={Icon} inline />
                    <h3 className="mt-8 text-xl font-bold text-foreground lg:text-2xl">{item.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-6 text-muted">{item.description}</p>
                  </div>
                  <div className="hidden grid-cols-3 gap-3 sm:grid" aria-hidden="true">
                    {["bg-emerald-500", "bg-[#e2136e]", "bg-primary"].map((dot, k) => (
                      <div key={k} className="rounded-2xl border border-line bg-background p-4">
                        <span className={`block h-8 w-8 rounded-xl ${dot} opacity-90`} />
                        <span className="mt-4 block h-2 w-3/4 rounded-full bg-foreground/10" />
                        <span className="mt-2 block h-3 w-1/2 rounded-full bg-foreground/25" />
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          }

          // 2–5 — standard cards
          return (
            <Reveal key={item.title} delay={(i % 2) * 80} className={`h-full ${layout[i]}`}>
              <article className={`${hover} card flex flex-col p-7`}>
                <CardHeader label={label} Icon={Icon} />
                <h3 className="mt-8 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
