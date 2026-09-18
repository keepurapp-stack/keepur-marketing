import { pageMetadata } from "@/lib/seo";

import ContactFormPage from "@/components/ContactFormPage";

export const metadata = pageMetadata("Contact Keepur Sales", "Discuss POS, shop management, inventory, and multi-store software for your Bangladesh retail business with Keepur.", "/contact");

export default function ContactPage() {
  return <ContactFormPage />;
}
