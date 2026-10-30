import SiteShell from "@/components/site/SiteShell";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata;

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
