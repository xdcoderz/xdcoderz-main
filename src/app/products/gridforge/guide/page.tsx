import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "GridForge User Guide",
  description:
    "Beginner-friendly guide for using GridForge AI Mode and Offline Mode to convert table images into Excel files.",
};

const guideSections = [
  {
    title: "What GridForge does",
    text: "GridForge converts table images into spreadsheet-friendly files. It can create JSON, CSV, and Excel output from photographed, scanned, or digital table images.",
  },
  {
    title: "Using AI Mode",
    text: "Open GridForge, choose an image, select AI Mode, and convert. The selected image is sent to the GridForge API for extraction. This mode is best for messy tables, screenshots, and images where local OCR may struggle.",
  },
  {
    title: "Using Offline Mode",
    text: "Install the optional Offline Pack, open GridForge, choose an image, select Offline Mode, and convert. The image is processed locally on the computer and is not uploaded by GridForge.",
  },
  {
    title: "Finding output files",
    text: "After conversion, GridForge generates table.json, data.csv, and output.xlsx. Open output.xlsx in Excel or another spreadsheet app.",
  },
  {
    title: "When results are imperfect",
    text: "Use a clearer image, crop around the table, improve lighting, or try AI Mode for harder images. For privacy-sensitive files, use Offline Mode with a clear table image.",
  },
];

export default function GridForgeGuidePage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            User guide
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            How to use GridForge.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            A simple guide for converting table images into spreadsheet files.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5">
          {guideSections.map((section) => (
            <article
              key={section.title}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-neutral-950">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-neutral-650">{section.text}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
