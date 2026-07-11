import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/lib/routes";
import type { ToolDefinition, ToolStatus } from "../types";

type ToolCardProps = {
  tool: ToolDefinition;
  compact?: boolean;
};

const statusStyles: Record<ToolStatus, string> = {
  Live: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Preview: "border-sky-200 bg-sky-50 text-sky-800",
  Planned: "border-neutral-200 bg-neutral-50 text-neutral-650",
};

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      href={routes.tool(tool.slug)}
      className="tool-card-shell group"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="tool-card-icon">
          <Icon size={20} aria-hidden="true" />
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[tool.status]}`}
        >
          {tool.status}
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="tool-card-kicker text-xs font-semibold uppercase">
          {tool.category}
        </p>
        <h3 className="mt-2 text-xl font-semibold text-neutral-950 dark:text-white">
          {tool.name}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
          {compact ? tool.summary : tool.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {tool.tags.slice(0, compact ? 2 : 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:border-white/10 dark:text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="tool-card-action">
        {tool.ctaLabel}
        <ArrowRight size={15} aria-hidden="true" className="transition group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
