import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";


export const metadata: Metadata = { title: "Page not found | Keepur", robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${fontVariables} antialiased`}>
        <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
          <div className="bg-grid pointer-events-none absolute inset-0 -z-10" />
          <div>
            <p className="text-gradient text-7xl font-bold">404</p>
            <h1 className="mt-4 text-2xl font-semibold text-foreground">Page not found · পেজটি পাওয়া যায়নি</h1>
            <p className="mt-3 text-muted">The page you are looking for doesn’t exist or has moved.</p>
            <div className="mt-8 flex justify-center gap-3">
              <Link href="/" className="btn-primary px-6 py-3 text-sm">Go home</Link>
              <Link href="/bn" className="btn-secondary px-6 py-3 text-sm">হোমপেজে যান</Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
