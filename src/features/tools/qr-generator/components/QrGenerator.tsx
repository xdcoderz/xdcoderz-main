import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("qr-generator");

export function QrGenerator() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

