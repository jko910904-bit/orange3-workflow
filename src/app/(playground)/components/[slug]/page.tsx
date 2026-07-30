import { notFound } from "next/navigation";
import { COMPONENT_DOCS } from "@/playground/catalog";
import { ComponentExplorer } from "@/playground/ComponentExplorer";

export function generateStaticParams() {
  return COMPONENT_DOCS.map((c) => ({ slug: c.slug }));
}

export default async function ComponentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = COMPONENT_DOCS.find((c) => c.slug === slug);
  if (!doc) notFound();
  return <ComponentExplorer doc={doc} />;
}
