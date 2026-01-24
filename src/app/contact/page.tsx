import type { Metadata } from "next";

import ContactFormPage from "@/components/ContactFormPage";

export const metadata: Metadata = {
  title: "Contact sales | Keepur",
  description:
    "Talk to a Keepur expert to learn how we help retailers track sales, manage inventory, and view reports. Submit your details and we will get back to you soon.",
};

export default function ContactPage() {
  return <ContactFormPage />;
}
