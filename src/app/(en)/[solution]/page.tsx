import SolutionView, { solutionMetadata, solutionParams } from "@/components/site/SolutionView";

type Props = { params: Promise<{ solution: string }> };

export const dynamicParams = false;
export const generateStaticParams = solutionParams;
export async function generateMetadata({ params }: Props) {
  return solutionMetadata((await params).solution, "en");
}

export default async function SolutionPage({ params }: Props) {
  return <SolutionView slug={(await params).solution} locale="en" />;
}
