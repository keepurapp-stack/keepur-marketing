import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n";
import { whatsappUrl } from "@/lib/seo";
import { IconWhatsapp } from "./Icons";

export default function Faq({ index, locale, dict }: { index: string; locale: Locale; dict: Dictionary["faq"] }) {
  const schema = {
    "@context": "https://schema.org", "@type": "FAQPage", inLanguage: locale,
    mainEntity: dict.items.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };
  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-6xl px-6 py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mono-label text-muted"><span className="text-primary">{index}</span> · {dict.eyebrow}</span>
          <h2 id="faq-heading" className="mt-5 text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{dict.title}</h2>
          <p className="mt-4 text-base leading-7 text-muted">{dict.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={localePath(locale, "/contact")} className="btn-primary px-5 py-2.5 text-sm">{dict.contactCta}</Link>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-secondary px-5 py-2.5 text-sm">
              <IconWhatsapp className="h-4 w-4 text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-foreground/15">
          {dict.items.map((faq, i) => (
            <details key={faq.q} className="group border-b border-foreground/15 py-5" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-foreground">
                {faq.q}
                <span aria-hidden="true" className="faq-icon relative h-9 w-9 shrink-0 rounded-full border border-foreground/15 text-foreground transition duration-300 group-open:border-ink group-open:bg-ink group-open:text-marigold">
                  <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                  <span className="absolute left-1/2 top-1/2 h-3.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current" />
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-12 text-[15px] leading-7 text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
