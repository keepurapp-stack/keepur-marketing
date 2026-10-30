import ContactForm from "@/components/site/ContactForm";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const dict = getDictionary("bn");
export const metadata = pageMetadata(dict.meta.contactTitle, dict.meta.contactDescription, "/contact", "bn");

export default function ContactPageBn() {
  return <ContactForm locale="bn" dict={dict.contact} />;
}
