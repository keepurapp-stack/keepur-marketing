import type { Dictionary } from "@/i18n";
import { formatNumber, type Locale } from "@/i18n/config";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Steps({ index, locale, dict }: { index: string; locale: Locale; dict: Dictionary["steps"] }) {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal><SectionHeading index={index} eyebrow={dict.eyebrow} title={dict.title} /></Reveal>
      <ol className="mt-12 grid gap-4 md:grid-cols-3">
        {dict.items.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 100} className="h-full">
              <div className="card relative h-full overflow-hidden p-7">
                <span className="font-display pointer-events-none absolute -right-2 -top-6 select-none text-[8rem] font-extrabold leading-none text-foreground/[0.04]" aria-hidden="true">
                  {formatNumber(locale, i + 1)}
                </span>
                <span className="mono-label text-primary">{formatNumber(locale, i + 1).padStart(2, formatNumber(locale, 0))}</span>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
                <h3 className="mt-6 text-xl font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
