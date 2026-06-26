import type { Metadata } from "next";
import { DownloadTable } from "@/components/product/DownloadTable";
import { Section } from "@/components/ui/Section";
import { gridforge } from "@/data/products/gridforge";

export const metadata: Metadata = {
  title: "GridForge Releases",
  description:
    "GridForge release notes, files, and SHA-256 checksums for version 0.1.0.",
};

export default function GridForgeReleasesPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Releases
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            GridForge 0.1.0.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            Initial release with AI Mode, Offline Mode support through the
            optional pack, and JSON, CSV, and Excel outputs.
          </p>
        </div>
      </section>
      <Section title="Release notes">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <ul className="grid gap-3 text-neutral-700">
            <li>Initial Windows release of GridForge.</li>
            <li>AI Mode connected to the deployed GridForge Cloudflare Worker.</li>
            <li>Optional Offline Pack for local OCR workflows.</li>
            <li>Exports table.json, data.csv, and output.xlsx.</li>
            <li>Daily AI allowance limited to 10 conversions per device.</li>
          </ul>
        </div>
      </Section>
      <Section className="bg-neutral-50" title="Checksums">
        <DownloadTable downloads={gridforge.downloads ?? []} />
      </Section>
    </>
  );
}
