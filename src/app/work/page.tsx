import type { Metadata } from "next";
import { WorkCard } from "@/components/work/WorkCard";
import { Section } from "@/components/ui/Section";
import { workItems } from "@/data/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore XDCoderz product builds, brand systems, and software work across desktop, web, Android, SaaS, and automation.",
};

export default function WorkPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
            Work
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Product builds, brand systems, and practical software work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            This page will grow into the public record of XDCoderz products,
            client work, software experiments, and case studies.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {workItems.map((item) => (
            <WorkCard key={item.title} item={item} />
          ))}
        </div>
      </Section>
    </>
  );
}
