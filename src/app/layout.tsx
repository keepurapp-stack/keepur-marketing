import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} antialiased`}>{children}</body>
    </html>
  );
}
