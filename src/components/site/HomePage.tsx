import { formatNumber, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { siteUrl } from "@/lib/seo";
import Compare from "./Compare";
import CtaBand from "./CtaBand";
import Faq from "./Faq";
import Features from "./Features";
import Hero from "./Hero";
import PartnerLogos from "./PartnerLogos";
import Pricing from "./Pricing";
import ProductTour from "./ProductTour";
import SolutionsGrid from "./SolutionsGrid";
import Steps from "./Steps";
import Testimonials from "./Testimonials";

function JsonLd({ locale }: { locale: Locale }) {
  const org = {
    "@context": "https://schema.org", "@type": "Organization", name: "Keepur", url: siteUrl,
    logo: `${siteUrl}/images/logo.png`, brand: { "@type": "Brand", name: "Keepur" },
    areaServed: { "@type": "Country", name: "Bangladesh" },
  };
  const app = {
    "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Keepur",
    applicationCategory: "BusinessApplication", operatingSystem: "Web", url: siteUrl, inLanguage: ["en", "bn"],
    description: getDictionary(locale).meta.homeDescription,
    featureList: ["Point of sale", "Retail billing", "Inventory management", "Sales reports", "Staff access controls", "Multiple stores"],
    publisher: { "@type": "Organization", name: "Keepur", url: siteUrl },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app).replace(/</g, "\\u003c") }} />
    </>
  );
}

export default function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const n = (i: number) => formatNumber(locale, i).padStart(2, formatNumber(locale, 0));
  return (
    <main>
      <JsonLd locale={locale} />
      <Hero locale={locale} dict={dict.hero} />
      <PartnerLogos eyebrow={dict.partners.eyebrow} />
      <Compare index={n(1)} dict={dict.compare} />
      <Features index={n(2)} locale={locale} dict={dict.features} />
      <ProductTour index={n(3)} locale={locale} dict={dict.tour} />
      <Steps index={n(4)} locale={locale} dict={dict.steps} />
      <Testimonials index={n(5)} dict={dict.testimonials} />
      <Pricing index={n(6)} locale={locale} dict={dict.pricing} />
      <SolutionsGrid index={n(7)} locale={locale} dict={dict.solutions} />
      <Faq index={n(8)} locale={locale} dict={dict.faq} />
      <CtaBand locale={locale} dict={dict.cta} />
    </main>
  );
}
