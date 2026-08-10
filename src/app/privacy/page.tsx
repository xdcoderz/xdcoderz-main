import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How XDCoderz collects, protects, uses, and stores website, newsletter, comment, contact, tool, and Lab data.",
  alternates: {
    canonical: `${site.url}${routes.privacy}`,
  },
};

export default function PrivacyPage() {
  return (
    <main className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Privacy Policy</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Privacy in plain language.
        </h1>
        <p className="mt-5 text-sm leading-6 text-neutral-650">
          Last updated: 10 August 2026. XDCoderz is designed to collect only the
          information needed to run the website, respond to people, improve products,
          protect the platform, and operate the newsletter, comments, tools, and admin
          systems.
        </p>

        <div className="mt-8 grid gap-8 text-base leading-7 text-neutral-650">
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">What XDCoderz collects</h2>
            <p className="mt-3">
              Depending on how you use the website, XDCoderz may collect your email
              address, name, contact form details, project enquiry details, newsletter
              subscription status, optional blog comment name, comment text, page source,
              tool usage events, timestamps, IP address, browser user-agent, and basic
              technical metadata used for security, analytics, spam prevention, and error
              monitoring.
            </p>
            <p className="mt-3">
              XDCoderz does not ask for payment card information, government ID numbers,
              passwords for other services, or unnecessary sensitive personal information
              through the public website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Why this data is used</h2>
            <p className="mt-3">
              Data is used to respond to enquiries, send requested email updates, manage
              newsletter subscriptions, display and moderate comments, understand which tools
              and pages are useful, prevent spam and abuse, diagnose technical errors, maintain
              admin records, and improve XDCoderz products, services, and content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">How XDCoderz protects data</h2>
            <p className="mt-3">
              XDCoderz uses reasonable technical and operational safeguards to keep data safe.
              Server-side secrets are kept out of public client code, admin access is restricted
              to allowed Supabase accounts, operational data is handled through server-side
              routes, and access to admin records is limited to authorized XDCoderz operators.
            </p>
            <p className="mt-3">
              XDCoderz does not sell personal data, rent personal data, or intentionally leak
              user data. No internet service can honestly guarantee perfect security, but the
              website is built to reduce exposure, use trusted infrastructure, and avoid
              collecting data that is not needed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Newsletter and email</h2>
            <p className="mt-3">
              If you subscribe to XDCoderz updates, your email address is used to send the
              newsletter and related XDCoderz updates. You can unsubscribe or ask for removal
              anytime by contacting {site.email}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Contact forms and leads</h2>
            <p className="mt-3">
              Contact form data is used to reply to your message, understand project fit,
              provide support, discuss potential services, and manage the relationship if a
              project moves forward. Lead data is not published publicly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Comments and public submissions</h2>
            <p className="mt-3">
              If you post a blog comment, the display name and comment text you submit may
              appear publicly. Email addresses are not published in comments. XDCoderz may
              remove spam, abusive, promotional, misleading, or irrelevant comments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Tools, analytics, and local storage</h2>
            <p className="mt-3">
              XDCoderz may use privacy-focused analytics, technical error monitoring, and
              anonymous tool funnel events to understand whether pages and tools work
              effectively. Tool usage may be linked with a random identifier stored in your
              browser&apos;s local storage. It is not connected to your name or email unless you
              choose to submit a form.
            </p>
            <p className="mt-3">
              Advertising trackers are not used for the current website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Open Product Lab and GitHub</h2>
            <p className="mt-3">
              Open Product Lab projects are separate from the main XDCoderz commercial
              platform. The Lab may show public GitHub repository metadata such as repository
              name, description, topics, stars, forks, releases, and last update time.
            </p>
            <p className="mt-3">
              If you visit, star, fork, comment on, open an issue, or contribute to a GitHub
              repository, that activity happens on GitHub and is governed by GitHub&apos;s own
              terms and privacy policy. XDCoderz does not control GitHub&apos;s handling of your
              GitHub account data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Third-party services</h2>
            <p className="mt-3">
              XDCoderz may use third-party providers for hosting, domain routing, database
              storage, authentication, transactional email, newsletter delivery, analytics,
              error monitoring, bot protection, GitHub repository data, and deployment. These
              providers process data only as needed to provide those functions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Data sharing</h2>
            <p className="mt-3">
              XDCoderz does not sell personal data. Data may be shared only when needed to
              operate the website, respond to your request, provide a service, comply with a
              legal obligation, protect the website from abuse, or work with trusted service
              providers that support the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Retention</h2>
            <p className="mt-3">
              XDCoderz keeps data only as long as reasonably needed for the purpose it was
              collected, business records, legal obligations, security, abuse prevention, or
              legitimate operational needs. You can ask for deletion where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Your choices and requests</h2>
            <p className="mt-3">
              You can ask XDCoderz to remove your newsletter email, delete a comment you
              posted, correct contact information, or answer a privacy question by contacting
              {site.email}. XDCoderz will respond reasonably and may need to verify the request
              before changing or deleting records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Children</h2>
            <p className="mt-3">
              XDCoderz is not intended for children to submit personal information. If you
              believe a child has submitted personal data, contact {site.email} so it can be
              reviewed and removed where appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Policy updates</h2>
            <p className="mt-3">
              This Privacy Policy may be updated as XDCoderz adds products, tools, admin
              features, open-source projects, or service workflows. The updated date will show
              when the policy changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Questions</h2>
            <p className="mt-3">
              For privacy questions, data requests, or removal requests, contact {site.email}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
