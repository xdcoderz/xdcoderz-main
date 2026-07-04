import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ToolDirectory } from "@/features/tools";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Business Tools",
  description:
    "Explore XDCoderz planning, business, developer, and growth tools built as focused utilities around software, automation, and digital execution.",
};

export default function ToolsPage() {
  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
            Business tools
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
            Practical utilities that turn intent into clearer action.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650 dark:text-neutral-300">
            Use focused tools to estimate software builds, audit workflows,
            sharpen ideas, and improve the business decisions that lead to
            better digital systems.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={routes.tool("software-cost-estimator")}>
              Start with cost
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={routes.contact} variant="secondary">
              Discuss a build
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-6 py-16 sm:py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl">
          <ToolDirectory />
        </div>
      </section>
    </>
  );
}

