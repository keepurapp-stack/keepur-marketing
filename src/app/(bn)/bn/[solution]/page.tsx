import SolutionView, { solutionMetadata, solutionParams } from "@/components/site/SolutionView";

type Props = { params: Promise<{ solution: string }> };

export const dynamicParams = false;
export const generateStaticParams = solutionParams;
export async function generateMetadata({ params }: Props) {
  return solutionMetadata((await params).solution, "bn");
}

export default async function SolutionPageBn({ params }: Props) {
  return <SolutionView slug={(await params).solution} locale="bn" />;
}
