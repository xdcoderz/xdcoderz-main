import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("password-generator");

export function PasswordGenerator() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

