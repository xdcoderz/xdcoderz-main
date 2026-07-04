import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("invoice-generator");

export function InvoiceGenerator() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

