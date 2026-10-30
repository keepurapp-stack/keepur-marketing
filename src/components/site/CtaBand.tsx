import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { appUrl, whatsappUrl } from "@/lib/seo";
import { IconArrow, IconCart, IconChart, IconWhatsapp } from "./Icons";

type Option = {
  href: string;
  external?: boolean;
  title: string;
  text: string;
  icon: React.ReactNode;
  dark?: boolean;
};

function OptionRow({ option }: { option: Option }) {
  const body = (
    <>
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
        option.dark ? "bg-marigold text-ink" : "bg-ink/5 text-ink"
      }`}>
        {option.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className={`font-display block text-base font-bold ${option.dark ? "text-white" : "text-ink"}`}>{option.title}</span>
        <span className={`mt-0.5 block text-sm ${option.dark ? "text-white/65" : "text-ink/60"}`}>{option.text}</span>
      </span>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition duration-300 group-hover:translate-x-1 ${
        option.dark ? "bg-white/10 text-white" : "bg-ink text-white"
      }`}>
        <IconArrow className="h-4 w-4" />
      </span>
    </>
  );
  const cls = `group flex items-center gap-4 rounded-2xl p-4 transition duration-300 hover:-translate-y-0.5 sm:p-5 ${
    option.dark
      ? "bg-ink shadow-[0_20px_40px_-20px_rgba(14,20,51,0.7)]"
      : "bg-card/90 shadow-[0_12px_30px_-22px_rgba(14,20,51,0.5)] ring-1 ring-ink/5 hover:bg-card"
  }`;
  return option.external ? (
    <a href={option.href} target="_blank" rel="noreferrer" className={cls}>{body}</a>
  ) : (
    <Link href={option.href} className={cls}>{body}</Link>
  );
}

export default function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary["cta"] }) {
  const options: Option[] = [
    { href: whatsappUrl, external: true, ...dict.options.whatsapp, icon: <IconWhatsapp className="h-6 w-6 text-[#1faa53]" /> },
    { href: localePath(locale, "/contact"), ...dict.options.demo, icon: <IconChart className="h-6 w-6" /> },
    { href: `${appUrl}/signup`, external: true, ...dict.options.start, icon: <IconCart className="h-6 w-6" />, dark: true },
  ];

  return (
    <section className="px-4 pb-20 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-marigold">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-white/35 blur-3xl" />
        <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:px-14 lg:py-16">
          <div className="text-center lg:text-left">
            <span className="mono-label text-ink/60">{dict.eyebrow}</span>
            <h2 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">{dict.title}</h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-ink/70 lg:mx-0">{dict.subtitle}</p>
          </div>
          <div className="grid gap-3">
            {options.map((option) => <OptionRow key={option.title} option={option} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
