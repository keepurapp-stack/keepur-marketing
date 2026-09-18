import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/lib/solutions";
import { pageMetadata, siteUrl } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return solutions.map(item => ({ solution: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ solution: string }> }) {
  const { solution } = await params;
  const item = solutions.find(item => item.slug === solution);
  if (!item) return {};
  return pageMetadata(item.heading, item.description, `/${item.slug}`);
}
export default async function SolutionPage({ params }: { params: Promise<{ solution: string }> }) {
  const { solution } = await params;
  const item = solutions.find(item => item.slug === solution);
  if (!item) notFound();
  const schema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Keepur", item: siteUrl },
    { "@type": "ListItem", position: 2, name: item.heading, item: `${siteUrl}/${item.slug}` },
  ] };
  return <main className="mx-auto max-w-4xl space-y-8 px-6 pb-16 pt-36">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link href="/">Keepur</Link> / {item.heading}</nav>
    <h1 className="text-4xl font-semibold leading-tight">{item.heading}</h1>
    <p className="text-lg leading-8 text-slate-600">{item.summary}</p>
    {item.sections.map(([heading, text]) => <section key={heading} className="space-y-3"><h2 className="text-2xl font-semibold">{heading}</h2><p className="leading-7 text-slate-600">{text}</p></section>)}
    <section className="rounded-3xl bg-slate-50 p-6"><h2 className="text-2xl font-semibold">Find the right Keepur plan</h2>
      <p className="my-3 text-slate-600">See current prices in BDT and the features included in each plan, or tell us about your shop.</p>
      <div className="flex flex-wrap gap-4"><Link className="rounded-full bg-[#1E2A5A] px-5 py-3 text-white" href="/#pricing">View plans and prices</Link><Link className="rounded-full border px-5 py-3" href="/contact">Talk to sales</Link></div>
    </section>
    <aside><h2 className="mb-3 text-xl font-semibold">Explore other solutions</h2><ul className="space-y-2">{solutions.filter(other => other.slug !== item.slug).map(other => <li key={other.slug}><Link className="text-primary underline" href={`/${other.slug}`}>{other.heading}</Link></li>)}</ul></aside>
  </main>;
}
