import type { Metadata } from "next";
import { DownloadTable } from "@/components/product/DownloadTable";
import { Section } from "@/components/ui/Section";
import { gridforge } from "@/data/products/gridforge";

export const metadata: Metadata = {
  title: "Download GridForge",
  description:
    "Download GridForge for Windows, the optional Offline Pack, ZIP backups, and verify SHA-256 checksums.",
};

const steps = [
  "Download and install GridForge.",
  "Optional: download and install the Offline Pack.",
  "Open GridForge.",
  "Select an image.",
  "Choose AI Mode or Offline Mode.",
  "Convert the table.",
  "Open the generated Excel file.",
];

export default function GridForgeDownloadPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            GridForge downloads
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Download GridForge for Windows.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            Install the main app first. Add the Offline Pack only if you want
            local OCR processing without internet.
          </p>
        </div>
      </section>
      <Section title="Release files" description="Version 0.1.0">
        <DownloadTable downloads={gridforge.downloads ?? []} />
      </Section>
      <Section className="bg-neutral-50" title="Simple install steps">
        <ol className="grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <li
              key={step}
              className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-4"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-neutral-950 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-neutral-700">{step}</span>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
