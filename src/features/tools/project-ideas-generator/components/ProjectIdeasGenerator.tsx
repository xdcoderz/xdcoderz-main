import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("project-ideas-generator");

export function ProjectIdeasGenerator() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

