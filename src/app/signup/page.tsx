import type { Metadata } from "next";
import { redirect } from "next/navigation";

const signupUrl = "https://app.keepur.app/signup";

export const metadata: Metadata = {
  title: "Sign up for Keepur",
  description:
    "Create a Keepur account to start running checkout, tracking inventory, and viewing real-time reports from any device.",
  openGraph: {
    title: "Sign up for Keepur",
    description:
      "Create a Keepur account to start running checkout, tracking inventory, and viewing real-time reports from any device.",
    url: "https://keepur.app/signup",
    siteName: "Keepur",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sign up for Keepur",
    description:
      "Create a Keepur account to start running checkout, tracking inventory, and viewing real-time reports from any device.",
  },
};

export default function SignupPage() {
  redirect(signupUrl);
}
