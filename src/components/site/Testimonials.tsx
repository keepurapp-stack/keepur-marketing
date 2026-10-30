import type { Dictionary } from "@/i18n";
import SectionHeading from "./SectionHeading";

// Existing site testimonials, carried over unchanged. Replace with verified customer quotes.
const testimonials = [
  { name: "Priya", role: "Owner, Northwind Apparel", location: "Dhaka", quote: "আগে sales আর stock আলাদা জায়গায় দেখতাম, মাথা নষ্ট হয়ে যেত। এখন keepur এ সব এক জায়গায়, daily হিসাব clear থাকে." },
  { name: "Marco", role: "Operations Manager, Meridian Retail", location: "Chattogram", quote: "Busy time এ staff ভুল করে ফেলত। keepur এ sales sync ঠিক থাকে, stock update দিলে সবাই same numbers দেখে. Peace লাগে." },
  { name: "Nusrat", role: "Manager, Boutique Corner", location: "Sylhet", quote: "Invoice, stock, report সব consistent. Closing time এ আর দৌড়াদৌড়ি নেই, end of day summary এক মিনিটে বের হয়ে যায়." },
  { name: "Rafi", role: "Founder, City Mart", location: "Dhaka", quote: "Setup easy ছিল। staff দের বুঝাতে বেশি time লাগেনি। এখন আমি বাইরে থেকেও sales কেমন হচ্ছে quickly দেখে নিতে পারি." },
  { name: "Shafin", role: "Supervisor, Daily Goods", location: "Cumilla", quote: "আগে replenishment late হতো। এখন stock কমলেই immediately বুঝা যায়। day শেষে হিসাব clean থাকে, তাই tension কম." },
];

const gradients = ["from-primary to-violet", "from-emerald-400 to-cyan-500", "from-amber-400 to-rose-500", "from-violet to-fuchsia-500", "from-cyan-500 to-primary"];

function Card({ t, i, hidden }: { t: (typeof testimonials)[number]; i: number; hidden?: boolean }) {
  return (
    <li aria-hidden={hidden || undefined} className="w-[320px] shrink-0 px-2.5 sm:w-[380px]">
      <figure className="card flex h-full flex-col justify-between p-6">
        <div>
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-marigold" fill="currentColor" aria-hidden="true"><path d="M7 7h4v4c0 3-1.5 5-4 6l-1-1.5c1.5-.8 2.3-2 2.4-3.5H7V7Zm9 0h4v4c0 3-1.5 5-4 6l-1-1.5c1.5-.8 2.3-2 2.4-3.5H16V7Z" /></svg>
          <blockquote className="mt-3 text-[15px] leading-7 text-foreground" lang="bn">“{t.quote}”</blockquote>
        </div>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradients[i % gradients.length]} text-sm font-semibold text-white`}>
            {t.name.slice(0, 1)}
          </span>
          <span>
            <span className="block text-sm font-semibold text-foreground">{t.name}</span>
            <span className="block text-xs text-muted">{t.role} · {t.location}</span>
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

export default function Testimonials({ index, dict }: { index: string; dict: Dictionary["testimonials"] }) {
  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto max-w-6xl px-6"><SectionHeading index={index} eyebrow={dict.eyebrow} title={dict.title} /></div>
      <div className="marquee mt-12" style={{ ["--marquee-duration" as string]: "55s" }}>
        <ul className="marquee-track py-2">
          {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} i={i % testimonials.length} hidden={i >= testimonials.length} />
          ))}
        </ul>
      </div>
    </section>
  );
}
