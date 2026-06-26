import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "GridForge Privacy",
  description:
    "Privacy explanation for GridForge AI Mode, Offline Mode, API processing, and daily AI allowance.",
};

export default function GridForgePrivacyPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Privacy
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            GridForge privacy in plain language.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            GridForge has two different processing paths. AI Mode uses the cloud;
            Offline Mode processes locally.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">AI Mode</h2>
            <p className="mt-4 leading-7 text-neutral-650">
              AI Mode sends the selected image to the XDCoderz GridForge API and
              then to Google Gemini for table extraction. XDCoderz does not
              intentionally retain the image after the request. A one-way hashed
              device identifier is used to enforce the daily AI allowance.
            </p>
          </article>
          <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Offline Mode</h2>
            <p className="mt-4 leading-7 text-neutral-650">
              Offline Mode processes the selected image locally using the
              optional Offline Pack. The image is not uploaded by GridForge, and
              conversions can work without internet.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
