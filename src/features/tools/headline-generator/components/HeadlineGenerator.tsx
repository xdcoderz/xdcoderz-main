import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("headline-generator");

export function HeadlineGenerator() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

