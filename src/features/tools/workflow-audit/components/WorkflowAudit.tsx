import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("workflow-audit");

export function WorkflowAudit() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

