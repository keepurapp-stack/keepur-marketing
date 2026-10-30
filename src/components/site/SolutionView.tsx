import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { findSolution, solutions } from "@/lib/solutions";
import { pageMetadata, siteUrl } from "@/lib/seo";
import CtaBand from "./CtaBand";
import { IconArrow } from "./Icons";

export const solutionParams = () => solutions.map((item) => ({ solution: item.slug }));

export function solutionMetadata(slug: string, locale: Locale): Metadata {
  const item = findSolution(slug);
  if (!item) return {};
  return pageMetadata(item[locale].heading, item[locale].description, `/${item.slug}`, locale);
}

export default function SolutionView({ slug, locale }: { slug: string; locale: Locale }) {
  const item = findSolution(slug);
  if (!item) notFound();
  const copy = item[locale];
  const dict = getDictionary(locale);
  const schema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Keepur", item: `${siteUrl}${localePath(locale, "/")}` },
      { "@type": "ListItem", position: 2, name: copy.heading, item: `${siteUrl}${localePath(locale, `/${item.slug}`)}` },
    ],
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <section className="relative isolate overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,140,251,0.25),transparent)]" />
        <div className="animate-fade-up mx-auto max-w-3xl px-6 text-center">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <Link href={localePath(locale, "/")} className="hover:text-foreground">{dict.solutions.breadcrumbHome}</Link>
            <span className="mx-2">/</span>{copy.heading}
          </nav>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{copy.heading}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{copy.summary}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={localePath(locale, "/#pricing")} className="btn-primary px-6 py-3 text-sm">{dict.solutions.ctaPlans}</Link>
            <Link href={localePath(locale, "/contact")} className="btn-secondary px-6 py-3 text-sm">{dict.solutions.ctaSales}</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-5 px-6 pb-16">
        {copy.sections.map(([heading, text], i) => (
          <article key={heading} className="card flex gap-5 p-6 sm:p-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
              <p className="mt-2 leading-7 text-muted">{text}</p>
            </div>
          </article>
        ))}
      </section>

      <aside className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-lg font-semibold text-foreground">{dict.solutions.others}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {solutions.filter((other) => other.slug !== item.slug).map((other) => (
            <li key={other.slug}>
              <Link href={localePath(locale, `/${other.slug}`)} className="card group flex h-full items-center justify-between gap-3 p-4 text-sm font-semibold text-foreground hover:border-primary/40">
                {other[locale].heading}
                <IconArrow className="h-4 w-4 shrink-0 text-brand transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <CtaBand locale={locale} dict={{ ...dict.cta, title: dict.solutions.ctaTitle, subtitle: dict.solutions.ctaText }} />
    </main>
  );
}
