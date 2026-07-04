"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

type OpportunityCopyButtonProps = {
  text: string;
};

export function OpportunityCopyButton({ text }: OpportunityCopyButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") {
      return;
    }

    const timeoutId = window.setTimeout(() => setStatus("idle"), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [status]);

  async function copyOpportunity() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  const isCopied = status === "copied";
  const label = isCopied ? "Copied" : status === "failed" ? "Copy failed" : "Copy opportunity";

  return (
    <button
      type="button"
      onClick={copyOpportunity}
      title={label}
      aria-label={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
    >
      {isCopied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {label}
      </span>
    </button>
  );
}
