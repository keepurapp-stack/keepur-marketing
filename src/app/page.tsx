import type { Metadata } from "next";

import PricingSection from "@/components/PricingSection";
import Header from "@/components/Header";
import HeroCard from "@/components/HeroCard";
import FeaturesSection from "@/components/FeaturesSection";
import SignalTimeline from "@/components/SignalTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import ReadySection from "@/components/ReadySection";

const siteUrl = "https://keepur.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Keepur | POS, Inventory & Reports for Bangladesh Retail",
    template: "%s | Keepur",
  },
  description:
    "Keepur helps shops track sales, manage inventory, and view reports in one calm, reliable system. Built for Bangladesh first, ready to scale anywhere.",
  keywords: [
    "Keepur",
    "Bangladesh POS",
    "POS software Bangladesh",
    "Retail POS",
    "Inventory management",
    "Sales tracking",
    "Stock management",
    "Retail reports",
    "Shop management",
    "BDT POS software",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Keepur",
    title: "Keepur | Business, kept simple",
    description:
      "Track sales, manage inventory, and view reports in one calm, reliable system. Built for Bangladesh first.",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Keepur - POS, Inventory & Reports",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keepur | Business, kept simple",
    description:
      "Track sales, manage inventory, and view reports in one calm, reliable system.",
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

function JsonLd() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Keepur",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    sameAs: [
      "https://www.linkedin.com",
      "https://www.facebook.com",
      "https://www.youtube.com",
    ],
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
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: "499",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}#pricing`,
    },
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

      <div className="min-h-screen bg-[#f4f6fb] text-slate-900">
        <div className="relative isolate overflow-hidden">
          <Header />

          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -top-16 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#dbe4ff] blur-3xl" />
            <div className="absolute top-20 -right-10 h-80 w-80 rounded-full bg-[#c8f6ff] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#e0defb] blur-3xl" />
          </div>

          <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-10 pt-32 sm:px-10">
            <HeroCard />
            <FeaturesSection />
            <SignalTimeline />
            <TestimonialsSection />
            <PricingSection />
            <FaqSection />
            <ReadySection />
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
