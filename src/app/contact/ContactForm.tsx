"use client";

import { FormEvent, useId, useState } from "react";
import { Check, Send } from "lucide-react";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";
import {
  getToolAttributionLabel,
  type ToolAttribution,
} from "@/features/leads/tool-attribution";

const reasons = [
  "Website development",
  "Web application development",
  "Android app development",
  "Desktop app development",
  "SaaS MVP development",
  "Workflow automation",
  "GridForge support",
  "Feature request or product idea",
  "Website feedback",
];

type SubmitState = "idle" | "loading" | "success" | "error";

const defaultMessage =
  "Tell us what you want to build, improve, or validate. The sharper the context, the better the next step.";

export function ContactForm({ attribution }: { attribution: ToolAttribution | null }) {
  const nameId = useId();
  const emailId = useId();
  const reasonId = useId();
  const messageId = useId();
  const honeypotId = useId();
  const [status, setStatus] = useState<SubmitState>("idle");
  const [notice, setNotice] = useState(defaultMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("loading");
    setNotice("Sending your message to the XDCoderz growth inbox...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          reason: formData.get("reason"),
          message: formData.get("message"),
          website: formData.get("website"),
          turnstileToken: formData.get("cf-turnstile-response"),
          attribution,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Message failed.");
      }

      setStatus("success");
      setNotice(result.message || "Message received.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setNotice(
        error instanceof Error
          ? error.message
          : "Contact email is not available right now. Try again shortly.",
      );
    }
  }

  return (
    <form
      className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-sm font-semibold uppercase text-sky-700">
            Project intake
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Send the signal.</h2>
        </div>
        <span className="grid size-11 place-items-center rounded-md bg-neutral-950 text-white">
          {status === "success" ? (
            <Check size={22} aria-hidden="true" />
          ) : (
            <Send size={22} aria-hidden="true" />
          )}
        </span>
      </div>

      <p
        className={`mt-4 text-sm leading-6 ${
          status === "error" ? "text-red-700" : "text-neutral-650"
        }`}
        aria-live="polite"
      >
        {notice}
      </p>

      {attribution && (
        <div className="mt-5 rounded-md border border-sky-200 bg-sky-50 p-4 text-sm dark:border-sky-400/20 dark:bg-sky-400/10">
          <p className="font-semibold text-sky-800 dark:text-sky-200">
            {getToolAttributionLabel(attribution.tool)} context attached
          </p>
          <p className="mt-1 leading-6 text-neutral-650 dark:text-neutral-300">
            {attribution.summary}
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={nameId}
            className="text-sm font-semibold text-neutral-800"
          >
            Name
          </label>
          <input
            id={nameId}
            name="name"
            required
            maxLength={80}
            autoComplete="name"
            disabled={status === "loading" || status === "success"}
            className="mt-2 min-h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 transition focus:border-sky-700"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor={emailId}
            className="text-sm font-semibold text-neutral-800"
          >
            Email
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            disabled={status === "loading" || status === "success"}
            className="mt-2 min-h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 transition focus:border-sky-700"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-4">
        <label
          htmlFor={reasonId}
          className="text-sm font-semibold text-neutral-800"
        >
          Reason
        </label>
        <select
          id={reasonId}
          name="reason"
          required
          disabled={status === "loading" || status === "success"}
          className="mt-2 min-h-12 w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 text-sm text-neutral-950 transition focus:border-sky-700"
          defaultValue={attribution?.reason ?? ""}
        >
          <option value="" disabled>
            Select what this is about
          </option>
          {reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label
          htmlFor={messageId}
          className="text-sm font-semibold text-neutral-800"
        >
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          minLength={20}
          maxLength={2000}
          rows={6}
          disabled={status === "loading" || status === "success"}
          className="mt-2 w-full resize-y rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-950 transition focus:border-sky-700"
          placeholder="What outcome do you want, what exists today, and what would make this worth building?"
          defaultValue={attribution?.message}
        />
      </div>

      <label htmlFor={honeypotId} className="hidden">
        Website
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <TurnstileWidget className="mt-5" />

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "success" ? (
          <>
            <Check size={16} aria-hidden="true" />
            Message sent
          </>
        ) : (
          <>
            {status === "loading" ? "Sending..." : "Send message"}
            <Send size={16} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
