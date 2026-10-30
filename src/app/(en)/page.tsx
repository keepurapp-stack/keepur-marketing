import HomePage from "@/components/site/HomePage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const { meta } = getDictionary("en");
export const metadata = pageMetadata(meta.homeTitle, meta.homeDescription, "/", "en");
export const revalidate = 300;

export default function Home() {
  return <HomePage locale="en" />;
}
