import SiteShell from "@/components/site/SiteShell";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata;

export default function BanglaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell locale="bn">{children}</SiteShell>;
}
