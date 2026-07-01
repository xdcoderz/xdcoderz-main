import type { Metadata } from "next";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { Section } from "@/components/ui/Section";
import { roadmapItems } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "See what is live, released, planned, and being explored across XDCoderz products and services.",
};

export default function RoadmapPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Roadmap
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            What XDCoderz is building next.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            A lightweight view of released products, planned platform features,
            and future software directions.
          </p>
        </div>
      </section>
      <Section>
        <RoadmapList items={roadmapItems} />
      </Section>
    </>
  );
}
