import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms for using the XDCoderz website, blog, tools, services, and Open Product Lab.",
  alternates: {
    canonical: `${site.url}${routes.terms}`,
  },
};

export default function TermsPage() {
  return (
    <main className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Terms & Conditions</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Clear terms for using XDCoderz.
        </h1>
        <p className="mt-5 text-sm leading-6 text-neutral-650">
          Last updated: 10 August 2026. These terms explain how the XDCoderz website,
          products, tools, services, blog, and Open Product Lab may be used.
        </p>

        <div className="mt-8 grid gap-8 text-base leading-7 text-neutral-650">
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Using this website</h2>
            <p className="mt-3">
              By using this website, reading the blog, submitting a form, subscribing to
              updates, using a tool, or interacting with the Open Product Lab, you agree to
              use XDCoderz lawfully, respectfully, and without attempting to abuse, disrupt,
              scrape, reverse-engineer, overload, or misuse the website or its services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Information, tools, and estimates</h2>
            <p className="mt-3">
              Blog posts, tools, market signals, calculators, project ideas, estimates,
              comments, and other website content are provided for general information,
              planning, and product thinking. They are not legal, financial, investment,
              security, compliance, or professional advice. You are responsible for decisions
              you make based on the content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Products and services</h2>
            <p className="mt-3">
              Paid product access, website development, app development, automation,
              consulting, maintenance, or custom software work is governed by the specific
              proposal, invoice, scope, contract, license, or written agreement for that
              project. Website content alone does not create a client relationship,
              partnership, employment relationship, or obligation to deliver paid work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Open Product Lab and open-source projects</h2>
            <p className="mt-3">
              Open Product Lab repositories are separate open-source or source-available
              projects. They are not automatically commercial products, paid services,
              client deliverables, company partnerships, or revenue-generating assets of the
              XDCoderz platform unless XDCoderz states that clearly in a separate written
              agreement.
            </p>
            <p className="mt-3">
              Each open-source repository is governed by its own repository license, README,
              contribution notes, and GitHub terms. If there is a conflict between a repository
              license and this website page, the repository license controls the rights for
              that repository&apos;s code.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Contributions do not create payment rights</h2>
            <p className="mt-3">
              If you contribute code, issues, discussions, documentation, ideas, feedback,
              pull requests, designs, tests, or other material to an Open Product Lab
              repository, that contribution does not create a right to salary, payment,
              equity, revenue share, profit share, ownership in XDCoderz, ownership in the
              XDCoderz website, or any commercial claim against XDCoderz.
            </p>
            <p className="mt-3">
              Any paid role, paid contract, bounty, partnership, acquisition, licensing deal,
              or revenue-sharing arrangement must be agreed separately in writing by XDCoderz.
              Public GitHub activity, issue comments, pull requests, stars, forks, or community
              participation do not create that agreement by themselves.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">User submissions</h2>
            <p className="mt-3">
              If you submit a contact form, comment, feedback, project idea, or GitHub-related
              suggestion, you confirm that you have the right to share it and that it does not
              violate another person&apos;s rights. You give XDCoderz permission to read, store,
              moderate, respond to, and use that submission for operating the website and
              improving XDCoderz products, services, tools, and content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Comments and public content</h2>
            <p className="mt-3">
              Blog comments and public community interactions may be visible to others. Do not
              post private, confidential, abusive, illegal, misleading, infringing, or spammy
              content. XDCoderz may remove, hide, moderate, or block content that harms the
              website, readers, contributors, users, or the XDCoderz brand.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Newsletter</h2>
            <p className="mt-3">
              If you subscribe to XDCoderz updates, you agree to receive emails from XDCoderz.
              You can unsubscribe or ask for removal anytime by contacting {site.email}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Ownership and intellectual property</h2>
            <p className="mt-3">
              XDCoderz owns the website content, layout, design, blog posts, tools, product
              pages, service pages, brand assets, and non-open-source code unless stated
              otherwise. You may share public links with attribution, but you may not copy,
              clone, resell, rebrand, or reuse substantial parts of the website as your own.
            </p>
            <p className="mt-3">
              Open-source repositories are different. Rights to use, copy, modify, or
              distribute open-source repository code come only from that repository&apos;s license.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Data protection and security</h2>
            <p className="mt-3">
              XDCoderz handles personal data according to the Privacy Policy. XDCoderz does
              not sell personal data or intentionally leak user data. Access to operational
              data is limited, server-side secrets are kept out of public code, and third-party
              providers are used only for necessary functions such as hosting, database storage,
              email, analytics, spam prevention, and error monitoring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">External links and third-party platforms</h2>
            <p className="mt-3">
              The website may link to GitHub, Vercel, Supabase, Resend, Sentry, Cloudflare,
              articles, tools, repositories, or other third-party websites. XDCoderz is not
              responsible for external websites, their policies, their availability, or user
              activity that happens on those platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Changes to these terms</h2>
            <p className="mt-3">
              XDCoderz may update these terms as the website, tools, services, and open-source
              projects evolve. Continued use of the website after an update means you accept
              the updated terms.
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
