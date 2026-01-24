import type { Metadata } from "next";
import { redirect } from "next/navigation";

const loginUrl = "https://app.keepur.app/login";

export const metadata: Metadata = {
  title: "Log in to Keepur",
  description:
    "Log in to Keepur to access checkout, inventory management, and reports from any device.",
  openGraph: {
    title: "Log in to Keepur",
    description:
      "Log in to Keepur to access checkout, inventory management, and reports from any device.",
    url: "https://keepur.app/login",
    siteName: "Keepur",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Log in to Keepur",
    description:
      "Log in to Keepur to access checkout, inventory management, and reports from any device.",
  },
};

export default function LoginPage() {
  redirect(loginUrl);
}
