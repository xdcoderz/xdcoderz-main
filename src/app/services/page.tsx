import type { Metadata } from "next";
import { ServiceCard } from "@/components/service/ServiceCard";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "XDCoderz services include website development, custom software, and automation for practical digital workflows.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Practical software services for real work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            XDCoderz can build websites, custom web apps, and automations for
            people who need a clean solution without unnecessary overhead.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>
    </>
  );
}
