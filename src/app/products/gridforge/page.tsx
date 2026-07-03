import type { Metadata } from "next";
import { ArrowRight, Bot, FileSpreadsheet, Laptop, Lock } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { gridforge } from "@/data/products/gridforge";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "GridForge",
  description:
    "GridForge is a free Windows utility that converts table images into JSON, CSV, and Excel files using AI or offline OCR.",
};

const modes = [
  {
    title: "AI Mode",
    icon: Bot,
    text: "Send the selected image to the deployed GridForge API, where Gemini extracts table data. Useful for messy screenshots, photos, and harder table images.",
    points: [
      "Higher accuracy online",
      "10 AI conversions per device per day",
      "API key stays on the server",
      "Best for difficult images",
    ],
  },
  {
    title: "Offline Mode",
    icon: Laptop,
    text: "Install the optional Offline Pack to process table images locally with OCR, without uploading the image from the computer.",
    points: [
      "Works without internet",
      "Image stays on the user's computer",
      "Unlimited local conversions",
      "Best for clear printed tables",
    ],
  },
];

export default function GridForgePage() {
  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              {gridforge.category} for {gridforge.platforms.join(", ")}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
              {gridforge.name}
            </h1>
            <p className="mt-5 text-3xl font-semibold text-neutral-900">
              {gridforge.tagline}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-650">
              {gridforge.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={routes.productDownload(gridforge.slug)}>
                Download GridForge
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={routes.productGuide(gridforge.slug)} variant="secondary">
                Read user guide
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-md bg-sky-700 text-white">
                <FileSpreadsheet size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-semibold">Outputs</h2>
                <p className="text-sm text-neutral-600">Ready-to-use table files</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {gridforge.outputs?.map((output) => (
                <div
                  key={output}
                  className="rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 font-mono text-sm"
                >
                  {output}
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 rounded-md border border-sky-100 bg-sky-50 p-4 text-sm leading-6 text-sky-950">
              <Lock className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
              <p>
                AI Mode uses the GridForge API for extraction. Offline Mode keeps
                processing on the user&apos;s computer when the Offline Pack is installed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Two conversion modes"
        title="Choose accuracy online or privacy-first local processing."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <article
                key={mode.title}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-md bg-neutral-950 text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-semibold">{mode.title}</h2>
                <p className="mt-3 leading-7 text-neutral-650">{mode.text}</p>
                <ul className="mt-5 grid gap-3 text-sm text-neutral-700">
                  {mode.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-700" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
