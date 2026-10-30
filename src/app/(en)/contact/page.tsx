import ContactForm from "@/components/site/ContactForm";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const dict = getDictionary("en");
export const metadata = pageMetadata(dict.meta.contactTitle, dict.meta.contactDescription, "/contact", "en");

export default function ContactPage() {
  return <ContactForm locale="en" dict={dict.contact} />;
}
