import { pageMetadata, siteDescription } from "@/lib/seo";
import Link from "next/link";
import { solutions } from "@/lib/solutions";

import PricingSection from "@/components/PricingSection";
import HeroCard from "@/components/HeroCard";
import FeaturesSection from "@/components/FeaturesSection";
import SignalTimeline from "@/components/SignalTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ReadySection from "@/components/ReadySection";
import TrustedBanner from "@/components/TrustedBanner";

const siteUrl = "https://keepur.app";

export const metadata = pageMetadata("POS & Shop Management Software in Bangladesh", siteDescription);

function JsonLd() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Keepur",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    brand: {
      "@type": "Brand",
      name: "Keepur",
    },
    areaServed: { "@type": "Country", name: "Bangladesh" },
  };

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Keepur",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: siteUrl,
    description:
      "POS, inventory, and reporting software for retailers in Bangladesh.",
    featureList: ["Point of sale", "Retail billing", "Inventory management", "Sales reports", "Staff access controls", "Multiple stores"],
    publisher: { "@type": "Organization", name: "Keepur", url: siteUrl },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <JsonLd />

      <div className="min-h-screen bg-[#f4f6fb] text-foreground">
        <div className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -top-16 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#dbe4ff] blur-3xl" />
            <div className="absolute top-20 -right-10 h-80 w-80 rounded-full bg-[#c8f6ff] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#e0defb] blur-3xl" />
          </div>

          <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-10 pt-32 sm:px-10">
            <HeroCard />
            <TrustedBanner />
            <FeaturesSection />
            <SignalTimeline />
            <TestimonialsSection />
            <PricingSection />
            <section aria-labelledby="solutions-heading" className="space-y-5">
              <h2 id="solutions-heading" className="text-3xl font-semibold">Shop management solutions for Bangladesh</h2>
              <p className="text-slate-600">Keepur brings checkout, product stock, staff access, and store reporting together. Choose a solution to explore how it supports your daily retail work.</p>
              <div className="grid gap-4 sm:grid-cols-2">{solutions.map(solution => (
                <Link key={solution.slug} href={`/${solution.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold">{solution.heading}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{solution.summary}</p>
                  <span className="mt-3 block text-sm font-semibold text-primary">Explore solution →</span>
                </Link>
              ))}</div>
              <p lang="bn" className="text-sm leading-7 text-slate-600">বাংলাদেশের দোকানের জন্য পিওএস ও দোকান ম্যানেজমেন্ট সফটওয়্যার। Keepur দিয়ে বিক্রয়, বিলিং, পণ্যের স্টক এবং একাধিক দোকানের রিপোর্ট এক জায়গায় পরিচালনা করুন। সুবিধা ও সীমা আপনার নির্বাচিত প্ল্যান অনুযায়ী প্রযোজ্য।</p>
            </section>
            <FaqSection />
            <ReadySection />
          </main>
        </div>
      </div>
    </>
  );
}
