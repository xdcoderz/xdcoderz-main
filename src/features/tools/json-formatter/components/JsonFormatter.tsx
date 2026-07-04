import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("json-formatter");

export function JsonFormatter() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

