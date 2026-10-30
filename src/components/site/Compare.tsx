import type { Dictionary } from "@/i18n";
import { IconCheck } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Compare({ index, dict }: { index: string; dict: Dictionary["compare"] }) {
  return (
    <section id="why" className="mx-auto max-w-6xl px-6 py-20">
      <Reveal><SectionHeading index={index} eyebrow={dict.eyebrow} title={dict.titleStart} accent={dict.titleAccent} subtitle={dict.subtitle} /></Reveal>
      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          {/* the khata: ruled paper with a red margin and struck-through lines */}
          <div className="bg-ruled relative h-full overflow-hidden rounded-3xl border border-line bg-card px-8 pb-8 pt-7">
            <div className="absolute inset-y-0 left-12 w-px bg-rose-300/70" aria-hidden="true" />
            <p className="mono-label pl-8 text-rose-600">{dict.beforeLabel}</p>
            <ul className="mt-5 space-y-5 pl-8">
              {dict.before.map((line) => (
                <li key={line} className="text-lg text-muted">
                  <span className="decoration-rose-400/80 decoration-2 [text-decoration-line:line-through]">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="panel-glow h-full rounded-3xl p-8 text-white shadow-[0_40px_80px_-40px_rgba(14,20,51,0.8)]">
            <p className="mono-label text-marigold">{dict.afterLabel}</p>
            <ul className="mt-5 space-y-4">
              {dict.after.map((line) => (
                <li key={line} className="flex items-start gap-3 text-lg">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-marigold text-ink"><IconCheck className="h-4 w-4" /></span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
