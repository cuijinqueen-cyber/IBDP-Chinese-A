import { notFound } from "next/navigation";
import { WritingStudio } from "@/components/WritingStudio";
import { getText } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export default async function WritePage({ params }: Props) {
  const { id } = await params;
  const text = getText(id);
  if (!text) notFound();
  return <WritingStudio text={text} />;
}
