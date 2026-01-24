import type { Metadata } from "next";

import PricingSection from "@/components/PricingSection";
import HeroCard from "@/components/HeroCard";
import FeaturesSection from "@/components/FeaturesSection";
import SignalTimeline from "@/components/SignalTimeline";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import ReadySection from "@/components/ReadySection";
import TrustedBanner from "@/components/TrustedBanner";

const siteUrl = "https://keepur.app";

export const metadata: Metadata = {
  metadataBase: new URL("https://keepur.app"),

  title: {
    default: "Keepur | Sales, Inventory & Reports — Business, kept simple",
    template: "%s | Keepur",
  },

  description:
    "Keepur helps shops track sales, manage inventory, and view reports in one calm, reliable system built for real retailers in Bangladesh.",

  openGraph: {
    type: "website",
    url: "https://keepur.app",
    siteName: "Keepur",
    title: "Keepur | Sales, Inventory & Reports — Business, kept simple",
    description:
      "Track sales, manage inventory, and view reports in one calm, reliable system built for real retailers in Bangladesh.",
    images: [
      {
        url: "/images/keepur-og.png",
        width: 1200,
        height: 630,
        alt: "Keepur – Sales, Inventory & Reports for Retailers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Keepur | Sales, Inventory & Reports — Business, kept simple",
    description:
      "Track sales, manage inventory, and view reports in one calm, reliable system built for real retailers in Bangladesh.",
    images: ["/images/keepur-og.png"],
  },
};


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
    foundingLocation: {
      "@type": "Place",
      name: "Bangladesh",
    },
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
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
            <FaqSection />
            <ReadySection />
          </main>
        </div>
      </div>
    </>
  );
}
