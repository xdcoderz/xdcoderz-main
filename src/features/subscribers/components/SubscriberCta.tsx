"use client";

import { FormEvent, useId, useState } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";

type SubscriberCtaProps = {
  source?: string;
  slug?: string;
  compact?: boolean;
};

type SubmitState = "idle" | "loading" | "success" | "error";

const defaultMessage =
  "We filter the noise and send you the few tech shifts worth building around. Every Friday, 6 AM IST.";

export function SubscriberCta({
  source = "blog",
  slug,
  compact = false,
}: SubscriberCtaProps) {
  const emailId = useId();
  const honeypotId = useId();
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState(defaultMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setMessage("Adding you to the Friday Brief...");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: formData.get("email"),
          website: formData.get("website"),
          source,
          slug,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Subscription failed.");
      }

      setStatus("success");
      setMessage(result.message || "You are on the Friday Brief list.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Subscription is not available right now. Try again shortly.",
      );
    }
  }

  return (
    <form
      id="journal-subscribe"
      className={`subscriber-cta ${compact ? "subscriber-cta--compact" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className="subscriber-cta__icon" aria-hidden="true">
        <Mail size={20} />
      </div>

      <div className="subscriber-cta__copy">
        <p className="journal-section-label">Friday brief</p>
        <h2>What if this week&apos;s boring headline is next month&apos;s unicorn idea?</h2>
        <p>{message}</p>
      </div>

      <div className="subscriber-cta__form">
        <label htmlFor={emailId}>Email address</label>
        <div className="subscriber-cta__row">
          <input
            id={emailId}
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            autoComplete="email"
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
          >
            {status === "success" ? (
              <>
                <Check size={16} aria-hidden="true" />
                Subscribed
              </>
            ) : (
              <>
                Get the Friday Brief
                <ArrowRight size={16} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
        <label htmlFor={honeypotId} className="subscriber-cta__honeypot">
          Website
          <input
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
        <p className="subscriber-cta__fineprint">
          No spam. Only the signals that look worth building around.
        </p>
      </div>
    </form>
  );
}
