import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("seo-checker");

export function SeoChecker() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

