import { notFound } from "next/navigation";
import { TechniqueQuiz } from "@/components/TechniqueQuiz";
import { getText } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export default async function TechniquesPage({ params }: Props) {
  const { id } = await params;
  const text = getText(id);
  if (!text) notFound();
  return <TechniqueQuiz text={text} />;
}
