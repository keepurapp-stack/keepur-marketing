const faqs = [
  { q: "What is Keepur?", a: "Keepur is web-based POS and shop management software for retail businesses in Bangladesh. It brings retail checkout, billing, inventory, staff access, stores, and sales reports together." },
  { q: "Can I use Keepur for a small retail shop?", a: "Yes. Keepur supports individual retail shops and businesses with multiple stores. Choose a plan based on your product catalog, staff, devices, and store requirements." },
  { q: "Does Keepur include inventory management?", a: "Keepur manages product catalogs and stock alongside retail sales. Available inventory alerts, stock movement history, and product limits depend on the selected plan." },
  { q: "Can I manage multiple stores with Keepur?", a: "Yes. Keepur supports store-level sales and inventory under one business. Check the store allowance displayed for each plan before subscribing." },
  { q: "How much does Keepur POS software cost?", a: "Current subscription prices are listed in BDT in the pricing section. Each plan shows its billing interval, available trial, limits, and included features. Contact sales for custom requirements." },
  { q: "Can staff and owners have different access?", a: "Keepur supports staff permissions and owner access to business information. The number of team members and devices depends on the selected subscription plan." },
  { q: "How do I get started?", a: "Review the pricing section and select a plan to create an account, or use the contact form to discuss your shop, product catalog, and store requirements with the Keepur team." },
];
export default function FaqSection() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(faq => ({
    "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a },
  })) };
  return <section id="faq" aria-labelledby="faq-heading" className="space-y-5">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <h2 id="faq-heading" className="text-3xl font-semibold">Questions about Keepur POS and shop management</h2>
    <div className="space-y-3">{faqs.map(faq => <details key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5">
      <summary className="cursor-pointer text-sm font-semibold">{faq.q}</summary>
      <p className="mt-3 text-sm leading-7 text-slate-600">{faq.a}</p>
    </details>)}</div>
  </section>;
}
