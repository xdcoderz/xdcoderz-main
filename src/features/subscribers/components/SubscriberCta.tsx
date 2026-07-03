import { Mail } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/config/features";
import { routes } from "@/lib/routes";

export function SubscriberCta() {
  if (!features.subscribers.enabled) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-md bg-teal-300 text-neutral-950">
            <Mail size={20} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Want the next XDCoderz insight before it turns public?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-neutral-300">
              Subscriber infrastructure is isolated and ready to connect. Until
              then, send a direct note and get on the early list manually.
            </p>
            <ButtonLink
              href={routes.contact}
              className="mt-5 bg-teal-300 text-neutral-950 hover:bg-teal-200"
            >
              Join through contact
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white">
      <label htmlFor="subscriber-email" className="text-2xl font-semibold tracking-tight">
        Join the XDCoderz build list
      </label>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          id="subscriber-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="min-h-12 flex-1 rounded-md border border-white/15 bg-white px-4 text-neutral-950 outline-none focus:border-teal-300"
        />
        <button
          type="submit"
          className="min-h-12 rounded-md bg-teal-300 px-5 text-sm font-semibold text-neutral-950 transition hover:bg-teal-200"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
