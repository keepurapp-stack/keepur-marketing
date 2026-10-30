/* eslint-disable @next/next/no-img-element -- logos come from arbitrary admin-provided https hosts */
import { getApiBase } from "@/lib/api";

type Partner = { id: string; name: string; logoUrl: string; websiteUrl: string | null };

async function fetchPartners(): Promise<Partner[]> {
  try {
    const res = await fetch(`${getApiBase()}/api/partners/public`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { partners?: Partner[] };
    return Array.isArray(data.partners) ? data.partners.filter((p) => p.logoUrl?.startsWith("https://")) : [];
  } catch {
    return [];
  }
}

function Logo({ partner, hidden = false }: { partner: Partner; hidden?: boolean }) {
  const img = (
    <img src={partner.logoUrl} alt={hidden ? "" : partner.name} loading="lazy" decoding="async"
      className="max-h-12 w-auto max-w-[140px] object-contain opacity-70 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
  );
  return (
    <li aria-hidden={hidden || undefined} className="flex h-16 shrink-0 items-center justify-center px-8">
      {partner.websiteUrl ? <a href={partner.websiteUrl} target="_blank" rel="noreferrer nofollow" aria-label={partner.name} tabIndex={hidden ? -1 : undefined}>{img}</a> : img}
    </li>
  );
}

/** Logos are managed in keepur-platform-admin → Partner logos. Hidden when there are none. */
export default async function PartnerLogos({ eyebrow }: { eyebrow: string }) {
  const partners = await fetchPartners();
  if (!partners.length) return null;
  const loop = partners.length >= 4;
  return (
    <section aria-label={eyebrow} className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-foreground/15" />
        <p className="mono-label text-center text-muted">{eyebrow}</p>
        <span className="h-px flex-1 bg-foreground/15" />
      </div>
      {loop ? (
        <div className="marquee mt-6 overflow-hidden" style={{ ["--marquee-duration" as string]: `${Math.max(20, partners.length * 5)}s` }}>
          <ul className="marquee-track">
            {[...partners, ...partners].map((p, i) => <Logo key={`${p.id}-${i}`} partner={p} hidden={i >= partners.length} />)}
          </ul>
        </div>
      ) : (
        <ul className="mt-6 flex flex-wrap items-center justify-center">
          {partners.map((p) => <Logo key={p.id} partner={p} />)}
        </ul>
      )}
    </section>
  );
}
