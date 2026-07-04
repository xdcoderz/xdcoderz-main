import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/routes";
import type { ToolDefinition } from "../types";

type ToolDetailShellProps = {
  tool: ToolDefinition;
};

export function ToolDetailShell({ tool }: ToolDetailShellProps) {
  const Icon = tool.icon;

  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.03] dark:text-sky-300">
              {tool.category} / {tool.status}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650 dark:text-neutral-300">
              {tool.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={routes.contact}>
                Discuss this tool
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={routes.tools} variant="secondary">
                View all tools
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/75 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  Intended payoff
                </p>
                <h2 className="mt-1 text-xl font-semibold text-neutral-950 dark:text-white">
                  {tool.outcome}
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 text-sm leading-6">
              <InfoBlock label="Built for" value={tool.audience} />
              <InfoBlock label="Business role" value={tool.businessUse} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <ToolList title="Inputs" items={tool.inputs} />
          <ToolList title="Outputs" items={tool.outputs} />
          <ToolList title="Build path" items={tool.nextSteps} />
        </div>
      </section>
    </>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-2 text-neutral-700 dark:text-neutral-300">{value}</p>
    </div>
  );
}

function ToolList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-neutral-950 dark:text-white">{title}</h2>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
            <CheckCircle2
              size={17}
              aria-hidden="true"
              className="mt-1 shrink-0 text-sky-700 dark:text-sky-300"
            />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

