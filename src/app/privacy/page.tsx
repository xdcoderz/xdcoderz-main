import type { Metadata } from "next";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How XDCoderz collects and uses website, newsletter, comment, and contact data.",
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
              The public website is designed to be lightweight. XDCoderz only collects information needed to
              run the website, respond to enquiries, send the Friday Brief, prevent spam, and understand which
              content is useful.
            </p>
            <p className="mt-3">
              Depending on how you use the site, this may include your newsletter email address, contact form
              details, optional blog comment name, public comment text, page or post source, timestamps,
              browser-level technical data, IP address, and user-agent metadata for security and abuse
              prevention.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Newsletter and comments</h2>
            <p className="mt-3">
              If you subscribe to the XDCoderz Friday Brief, your email address is used to send the newsletter
              and related service updates. You can unsubscribe or ask for removal anytime.
            </p>
            <p className="mt-3">
              If you post a blog comment, the display name and comment text you submit may appear publicly.
              Email addresses are not published in comments. XDCoderz may remove spam, abusive, promotional,
              or irrelevant comments.
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
              a business relationship. Newsletter and comment data are used to operate those features and keep
              the site safe. Personal data is not sold.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Third-party services</h2>
            <p className="mt-3">
              XDCoderz may use third-party services for hosting, analytics, email delivery, database storage,
              error monitoring, and spam prevention. These services process data only as needed to provide
              those functions.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-neutral-950">Your choices</h2>
            <p className="mt-3">
              You can ask XDCoderz to remove your newsletter email, delete a comment you posted, or answer a
              privacy question by contacting {site.email}.
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
