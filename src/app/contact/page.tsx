import type { Metadata } from "next";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact XDCoderz for product support, websites, desktop apps, Android apps, web apps, SaaS MVPs, automation, or custom software work.",
};

const reasons = [
  "Website development",
  "Web application development",
  "Android app development",
  "Desktop app development",
  "SaaS MVP development",
  "Workflow automation",
  "GridForge support",
  "Feature request or product idea",
];

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Contact
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Talk to XDCoderz.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            Reach out for product support, websites, desktop apps, Android apps,
            web apps, SaaS MVPs, automation, or a new idea that needs a
            practical build.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <span className="grid size-11 place-items-center rounded-md bg-neutral-950 text-white">
              <Mail size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold">Email</h2>
            <p className="mt-3 text-neutral-650">
              Use this for now while the contact form is wired to a production
              backend.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
            >
              <Send size={16} aria-hidden="true" />
              {site.email}
            </a>
          </article>
          <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <span className="grid size-11 place-items-center rounded-md bg-teal-700 text-white">
              <MessageSquare size={22} aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold">Good reasons to contact</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {reasons.map((reason) => (
                <span
                  key={reason}
                  className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700"
                >
                  {reason}
                </span>
              ))}
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
