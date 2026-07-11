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
      className="opportunity-copy-button"
    >
      {isCopied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {label}
      </span>
    </button>
  );
}
