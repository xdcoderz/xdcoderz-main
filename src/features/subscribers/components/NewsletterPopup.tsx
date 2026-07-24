"use client";

import { FormEvent, useEffect, useId, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Mail, X } from "lucide-react";
import { TurnstileWidget } from "@/components/security/TurnstileWidget";

type SubmitState = "idle" | "loading" | "success" | "error";
type PopupStorageValue = {
  state: "dismissed" | "subscribed";
  expiresAt?: number;
};

const storageKey = "xdcoderz-newsletter-modal";
const sessionKey = "xdcoderz-newsletter-modal-session";
const dismissMs = 7 * 24 * 60 * 60 * 1000;

export function NewsletterPopup() {
  const pathname = usePathname();
  const emailId = useId();
  const honeypotId = useId();
  const titleId = useId();
  const descriptionId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState(
    "Get one sharp weekly briefing on technology shifts, business changes, and product ideas worth acting on before the market gets crowded.",
  );

  const isBlogPost = useMemo(() => isBlogPostPath(pathname), [pathname]);

  useEffect(() => {
    if (!isBlogPost || shouldSkipPopup()) {
      return;
    }

    const openTimer = window.setTimeout(() => {
      sessionStorage.setItem(sessionKey, "shown");
      setIsOpen(true);
    }, 0);

    return () => window.clearTimeout(openTimer);
  }, [isBlogPost, pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen || !isBlogPost) {
    return null;
  }

  function closePopup() {
    savePopupState({
      state: "dismissed",
      expiresAt: Date.now() + dismissMs,
    });
    setIsOpen(false);
  }

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
          turnstileToken: formData.get("cf-turnstile-response"),
          source: "newsletter-modal",
          slug: pathname,
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
      savePopupState({ state: "subscribed" });
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
    <div className="newsletter-modal" role="dialog" aria-labelledby={titleId} aria-describedby={descriptionId} aria-modal="true">
      <div className="newsletter-modal__shell">
        <button
          type="button"
          className="newsletter-modal__close"
          onClick={closePopup}
          aria-label="Close Friday Brief signup"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="newsletter-modal__badge" aria-hidden="true">
          <Mail size={18} />
        </div>

        <p className="newsletter-modal__kicker">Friday Brief</p>
        <h2 id={titleId}>Most opportunities look obvious only after someone else builds them.</h2>
        <p id={descriptionId}>{message}</p>

        <form className="newsletter-modal__form" onSubmit={handleSubmit}>
          <label htmlFor={emailId}>Email address</label>
          <div className="newsletter-modal__row">
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
                  <Check size={15} aria-hidden="true" />
                  Subscribed
                </>
              ) : (
                <>
                  Send me the signals
                  <ArrowRight size={15} aria-hidden="true" />
                </>
              )}
            </button>
          </div>

          <label htmlFor={honeypotId} className="newsletter-modal__honeypot">
            Website
            <input
              id={honeypotId}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <TurnstileWidget className="newsletter-modal__turnstile" />

          <button
            type="button"
            className="newsletter-modal__skip"
            onClick={closePopup}
          >
            Not this week
          </button>
        </form>
      </div>
    </div>
  );
}

function isBlogPostPath(pathname: string | null) {
  if (!pathname || !pathname.startsWith("/blog/")) {
    return false;
  }

  return ![
    "/blog/category/",
    "/blog/tag/",
    "/blog/search",
  ].some((prefix) => pathname.startsWith(prefix));
}

function shouldSkipPopup() {
  if (typeof window === "undefined") {
    return true;
  }

  if (sessionStorage.getItem(sessionKey) === "shown") {
    return true;
  }

  const stored = localStorage.getItem(storageKey);

  if (!stored) {
    return false;
  }

  try {
    const value = JSON.parse(stored) as PopupStorageValue;

    if (value.state === "subscribed") {
      return true;
    }

    if (value.state === "dismissed" && value.expiresAt && value.expiresAt > Date.now()) {
      return true;
    }
  } catch {
    localStorage.removeItem(storageKey);
  }

  return false;
}

function savePopupState(value: PopupStorageValue) {
  localStorage.setItem(storageKey, JSON.stringify(value));
}
