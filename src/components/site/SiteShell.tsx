import { fontVariables } from "@/lib/fonts";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import Header from "./Header";
import Footer from "./Footer";
import "../../app/globals.css";


export default function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <html lang={locale}>
      <body className={`${fontVariables} antialiased`}>
        <Header locale={locale} dict={dict.nav} />
        {children}
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
