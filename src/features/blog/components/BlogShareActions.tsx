"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, Check, Copy, MessageCircle, Share2 } from "lucide-react";

type BlogShareActionsProps = {
  title: string;
  url: string;
};

export function BlogShareActions({ title, url }: BlogShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    {
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      label: "Share on LinkedIn",
      icon: BriefcaseBusiness,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      label: "Share on X",
      icon: Share2,
    },
    {
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      label: "Share on WhatsApp",
      icon: MessageCircle,
    },
  ];

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this article">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          title={label}
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
        >
          <Icon size={16} aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyUrl}
        title={copied ? "Copied link" : "Copy link"}
        aria-label={copied ? "Copied link" : "Copy link"}
        className="inline-flex h-9 w-9 items-center justify-center border border-neutral-200 bg-white text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
