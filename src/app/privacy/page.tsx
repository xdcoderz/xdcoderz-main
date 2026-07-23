import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for the XDCoderz website.",
  alternates: {
    canonical: `${site.url}${routes.privacy}`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Privacy in plain language.
        </h1>
        <div className="mt-8 grid gap-8 text-base leading-7 text-neutral-650">
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">What this website collects</h2>
            <p className="mt-3">
              The public website is designed to be lightweight. Contact forms or direct messages may collect
              the details you choose to send, such as your name, email address, project context, or support
              request.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Analytics and cookies</h2>
            <p className="mt-3">
              XDCoderz uses privacy-focused website analytics, technical error monitoring, and anonymous tool
              funnel events to understand whether pages and tools work effectively. Tool usage is linked with a
              random identifier stored in your browser&apos;s local storage. It is not connected to your name or
              email unless you choose to submit the contact form. Advertising trackers are not used.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">How contact data is used</h2>
            <p className="mt-3">
              Contact details are used to reply to your message, discuss a project, provide support, or manage
              a business relationship. They are not sold.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Questions</h2>
            <p className="mt-3">
              For privacy questions, contact {site.email}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
