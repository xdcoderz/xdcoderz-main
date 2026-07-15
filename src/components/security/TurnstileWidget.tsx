"use client";

import Script from "next/script";

type TurnstileWidgetProps = {
  className?: string;
};

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function TurnstileWidget({ className }: TurnstileWidgetProps) {
  if (!siteKey) {
    return null;
  }

  return (
    <div className={className}>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <div
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-action="turnstile-spin-v1"
        data-theme="auto"
      />
    </div>
  );
}
