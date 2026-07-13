import { redirect } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function TextIndexPage({ params }: Props) {
  const { id } = await params;
  redirect(`/texts/${id}/read`);
}
