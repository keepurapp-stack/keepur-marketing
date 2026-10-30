import HomePage from "@/components/site/HomePage";
import { getDictionary } from "@/i18n";
import { pageMetadata } from "@/lib/seo";

const { meta } = getDictionary("bn");
export const metadata = pageMetadata(meta.homeTitle, meta.homeDescription, "/", "bn");
export const revalidate = 300;

export default function HomeBn() {
  return <HomePage locale="bn" />;
}
