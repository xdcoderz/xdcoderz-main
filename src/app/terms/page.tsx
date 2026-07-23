import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms for using the XDCoderz website, blog, comments, newsletter, tools, and services.",
  alternates: {
    canonical: `${site.url}${routes.terms}`,
  },
};

export default function TermsPage() {
  return (
    <main className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Simple terms for using XDCoderz.
        </h1>
        <div className="mt-8 grid gap-8 text-base leading-7 text-neutral-650">
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Using this website</h2>
            <p className="mt-3">
              By using this website, reading the blog, submitting a contact form, subscribing to the Friday
              Brief, using a tool, or posting a comment, you agree to use XDCoderz in a lawful and respectful
              way.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Content and advice</h2>
            <p className="mt-3">
              Blog posts, tools, market signals, estimates, and other website content are provided for general
              information and product thinking. They are not legal, financial, investment, or professional
              advice. You are responsible for decisions you make based on the content.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Comments</h2>
            <p className="mt-3">
              Blog comments may be public. Do not post private, confidential, abusive, illegal, misleading, or
              spammy content. XDCoderz may remove, hide, or moderate comments that are promotional,
              irrelevant, abusive, or harmful to the reading experience.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Newsletter</h2>
            <p className="mt-3">
              If you subscribe to the XDCoderz Friday Brief, you agree to receive email updates from XDCoderz.
              You can unsubscribe or ask for removal anytime.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Services and projects</h2>
            <p className="mt-3">
              Any paid product, automation, website, app, or consulting work is governed by the specific
              proposal, scope, invoice, or agreement shared for that project. Website content alone does not
              create a client relationship.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Ownership</h2>
            <p className="mt-3">
              XDCoderz owns the website content, design, blog posts, tools, and brand assets unless stated
              otherwise. You may share public links with attribution, but you may not copy or reuse substantial
              parts of the site as your own.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">External links</h2>
            <p className="mt-3">
              The website may link to third-party sites, tools, articles, or services. XDCoderz is not
              responsible for the content, policies, or behavior of those external websites.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Questions</h2>
            <p className="mt-3">
              For questions about these terms, contact {site.email}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
