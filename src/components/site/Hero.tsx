import Link from "next/link";
import { formatNumber, localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { whatsappUrl } from "@/lib/seo";
import { IconArrow, IconBox, IconCheck, IconWallet, IconWhatsapp } from "./Icons";

function Receipt({ locale, r }: { locale: Locale; r: Dictionary["hero"]["receipt"] }) {
  const total = r.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const taka = (n: number) => `৳${formatNumber(locale, n)}`;
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* receipt */}
      <div className="animate-float [--tilt:-2deg]">
        <div className="receipt-edge animate-print rounded-t-2xl bg-card shadow-[0_40px_80px_-30px_rgba(14,20,51,0.45)]">
          <div className="px-7 pb-6 pt-7">
            <div className="text-center">
              <p className="font-display text-lg font-bold text-foreground">{r.shop}</p>
              <p className="mono-label mt-1 text-muted">{r.invoice} · {r.invoiceNo}</p>
            </div>
            <div className="my-5 border-t border-dashed border-line" />
            <ul className="space-y-3 text-sm">
              {r.items.map((item) => (
                <li key={item.name} className="flex items-baseline gap-2">
                  <span className="text-foreground">{item.name}</span>
                  <span className="font-mono text-xs text-muted">×{formatNumber(locale, item.qty)}</span>
                  <span className="flex-1 translate-y-[-3px] border-b border-dotted border-line" />
                  <span className="font-mono text-foreground">{taka(item.qty * item.price)}</span>
                </li>
              ))}
            </ul>
            <div className="my-5 border-t border-dashed border-line" />
            <div className="flex items-baseline justify-between">
              <span className="font-display text-base font-bold">{r.total}</span>
              <span className="font-display text-2xl font-extrabold tracking-tight">{taka(total)}</span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="stamp -rotate-6 text-emerald-700">{r.paid}</span>
              <span className="mono-label text-muted">{r.note}</span>
            </div>
          </div>
        </div>
      </div>

      {/* side notes: what the sale did */}
      <div className="animate-float absolute -top-6 right-0 hidden items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white shadow-xl [--tilt:3deg] [animation-delay:1.2s] sm:flex xl:-right-10">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-primary-soft"><IconBox className="h-4 w-4" /></span>
        {r.stock}
      </div>
      <div className="animate-float absolute -bottom-8 left-0 hidden items-center gap-2.5 rounded-2xl bg-marigold px-4 py-3 text-sm font-semibold text-ink shadow-xl [--tilt:-3deg] [animation-delay:2.4s] sm:flex xl:-left-12">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink/10"><IconWallet className="h-4 w-4" /></span>
        {r.wallet}
      </div>
    </div>
  );
}

export default function Hero({ locale, dict }: { locale: Locale; dict: Dictionary["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute -top-40 left-[-10rem] -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-48 -z-10 h-80 w-80 rounded-full bg-marigold/25 blur-3xl" />

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-fade-up text-center lg:text-left">
          <span className="eyebrow">{dict.badge}</span>
          <h1 className="mt-6 text-[2.75rem] font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {dict.titleStart}{" "}
            <span className="accent-serif text-primary">{dict.titleHighlight}</span>{" "}
            {dict.titleEnd}
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-muted lg:mx-0">{dict.subtitle}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href={localePath(locale, "/#pricing")} className="btn-primary group px-7 py-4 text-[15px]">
              {dict.primaryCta}
              <IconArrow className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-secondary px-7 py-4 text-[15px]">
              <IconWhatsapp className="h-5 w-5 text-[#25D366]" />
              {dict.whatsappCta}
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted lg:justify-start">
            {dict.checks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <IconCheck className="h-4 w-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <Receipt locale={locale} r={dict.receipt} />
        </div>
      </div>
    </section>
  );
}
