import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import type { Service } from "@/data/services/types";
import { routes } from "@/lib/routes";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            {service.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            {service.description}
          </p>
          <div className="mt-8">
            <ButtonLink href={routes.contact}>Discuss a project</ButtonLink>
          </div>
        </div>
      </section>
      <Section title="What this can include">
        <div className="grid gap-4 md:grid-cols-2">
          {service.outcomes.map((outcome) => (
            <div
              key={outcome}
              className="flex gap-3 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 shrink-0 text-sky-700" size={20} />
              <span className="font-medium text-neutral-800">{outcome}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-neutral-50" title="Best for">
        <div className="flex flex-wrap gap-3">
          {service.bestFor.map((item) => (
            <span
              key={item}
              className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700"
            >
              {item}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}
