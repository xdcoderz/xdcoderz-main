import { ToolDetailShell } from "../../components/ToolDetailShell";
import { getTool } from "../../data";

const tool = getTool("software-cost-estimator");

export function SoftwareCostEstimator() {
  if (!tool) {
    return null;
  }

  return <ToolDetailShell tool={tool} />;
}

