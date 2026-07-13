import { notFound } from "next/navigation";
import { CloseReading } from "@/components/CloseReading";
import { getText } from "@/lib/content";

type Props = { params: Promise<{ id: string }> };

export default async function ReadPage({ params }: Props) {
  const { id } = await params;
  const text = getText(id);
  if (!text) notFound();
  return <CloseReading text={text} />;
}
