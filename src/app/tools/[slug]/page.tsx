import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool, tools } from "@/features/tools";
import { renderToolExperience } from "@/features/tools/tool-registry";

type ToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);

  if (!tool) {
    return {
      title: "Tool",
    };
  }

  return {
    title: tool.name,
    description: tool.summary,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getTool(slug);
  const toolExperience = renderToolExperience(slug);

  if (!tool || !toolExperience) {
    notFound();
  }

  return toolExperience;
}
