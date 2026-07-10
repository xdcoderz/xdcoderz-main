import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "XDCoderz builds focused software, automation, websites, and practical digital products.",
  alternates: {
    canonical: `${site.url}${routes.about}`,
  },
};

export default function AboutPage() {
  return (
    <main className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">About XDCoderz</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Software should earn its place in the work.
        </h1>
        <div className="mt-7 grid gap-5 text-lg leading-8 text-neutral-650">
          <p>
            XDCoderz builds focused software products, automation systems, websites, and internal tools for
            people who want technology to remove drag instead of adding ceremony.
          </p>
          <p>
            The blog is where we publish practical thinking: market signals, build notes, product lessons, and
            the operating details behind software that saves time or creates leverage.
          </p>
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={routes.blog}>Read the blog</ButtonLink>
          <ButtonLink href={routes.contact} variant="secondary">
            Start a conversation
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
