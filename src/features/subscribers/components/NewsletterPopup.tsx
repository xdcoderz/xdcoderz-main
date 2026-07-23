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

const storageKey = "xdcoderz-newsletter-popup";
const sessionKey = "xdcoderz-newsletter-popup-session";
const dismissMs = 7 * 24 * 60 * 60 * 1000;
const popupDelayMs = 10_000;
const scrollDepth = 0.58;

const excludedPathStarts = [
  "/admin",
  "/contact",
  "/privacy",
  "/terms",
];

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

  const isExcluded = useMemo(() => {
    if (!pathname) {
      return true;
    }

    return (
      excludedPathStarts.some((prefix) => pathname.startsWith(prefix)) ||
      pathname.includes("/download")
    );
  }, [pathname]);

  useEffect(() => {
    if (isExcluded || shouldSkipPopup()) {
      return;
    }

    let hasOpened = false;

    function openPopup() {
      if (hasOpened || shouldSkipPopup()) {
        return;
      }

      hasOpened = true;
      sessionStorage.setItem(sessionKey, "shown");
      setIsOpen(true);
    }

    const delay = window.setTimeout(openPopup, popupDelayMs);

    function handleScroll() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      if (window.scrollY / scrollableHeight >= scrollDepth) {
        openPopup();
      }
    }

    function handleMouseOut(event: MouseEvent) {
      if (window.innerWidth < 900 || event.clientY > 12) {
        return;
      }

      openPopup();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.clearTimeout(delay);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isExcluded, pathname]);

  if (!isOpen || isExcluded) {
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
          source: "newsletter-popup",
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
    <div className="newsletter-popup" role="dialog" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div className="newsletter-popup__shell">
        <button
          type="button"
          className="newsletter-popup__close"
          onClick={closePopup}
          aria-label="Close Friday Brief signup"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="newsletter-popup__badge" aria-hidden="true">
          <Mail size={18} />
        </div>

        <p className="newsletter-popup__kicker">Friday Brief</p>
        <h2 id={titleId}>Most opportunities look obvious only after someone else builds them.</h2>
        <p id={descriptionId}>{message}</p>

        <form className="newsletter-popup__form" onSubmit={handleSubmit}>
          <label htmlFor={emailId}>Email address</label>
          <div className="newsletter-popup__row">
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

          <label htmlFor={honeypotId} className="newsletter-popup__honeypot">
            Website
            <input
              id={honeypotId}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>

          <TurnstileWidget className="newsletter-popup__turnstile" />

          <button
            type="button"
            className="newsletter-popup__skip"
            onClick={closePopup}
          >
            Not this week
          </button>
        </form>
      </div>
    </div>
  );
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
