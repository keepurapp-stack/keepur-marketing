import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { solutions } from "@/lib/solutions";
import { appUrl, whatsappUrl } from "@/lib/seo";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const groups = [
    {
      title: dict.footer.product,
      links: [
        { label: dict.nav.features, href: localePath(locale, "/#features") },
        { label: dict.nav.howItWorks, href: localePath(locale, "/#how-it-works") },
        { label: dict.nav.pricing, href: localePath(locale, "/#pricing") },
        { label: dict.nav.faq, href: localePath(locale, "/#faq") },
      ],
    },
    {
      title: dict.footer.solutions,
      links: solutions.map((s) => ({ label: s[locale].heading, href: localePath(locale, `/${s.slug}`) })),
    },
    {
      title: dict.footer.company,
      links: [
        { label: dict.nav.contact, href: localePath(locale, "/contact") },
        { label: dict.footer.whatsapp, href: whatsappUrl },
        { label: dict.nav.login, href: `${appUrl}/login` },
        { label: dict.nav.signup, href: `${appUrl}/signup` },
      ],
    },
  ];

  return (
    <footer className="panel-glow relative overflow-hidden text-slate-300">
      <div className="relative mx-auto max-w-6xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Image src="/images/logo.png" alt="Keepur" width={124} height={36} className="h-8 w-auto brightness-0 invert" />
            <p className="font-display text-3xl font-extrabold text-white">{dict.footer.tagline}</p>
            <p className="max-w-sm text-sm leading-6 text-slate-400">{dict.footer.about}</p>
            <Link href={localePath(locale, "/contact")} className="btn-accent px-5 py-2.5 text-sm">
              {dict.footer.demo}
            </Link>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <p className="mono-label text-marigold">{group.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a href={link.href} target="_blank" rel="noreferrer" className="text-slate-400 transition hover:text-white">{link.label}</a>
                    ) : (
                      <Link href={link.href} className="text-slate-400 transition hover:text-white">{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Keepur. {dict.footer.rights}</p>
          <p className="mono-label">keepur.app</p>
        </div>
        <p aria-hidden="true" className="font-display pointer-events-none mt-10 select-none text-center text-[22vw] font-extrabold leading-[0.8] tracking-tighter text-white/[0.04] lg:text-[16rem]">keepur</p>
      </div>
    </footer>
  );
}
