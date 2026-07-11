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
    <div className="blog-share-actions" aria-label="Share this article">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          title={label}
          aria-label={label}
          className="blog-share-button"
        >
          <Icon size={16} aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={copyUrl}
        title={copied ? "Copied link" : "Copy link"}
        aria-label={copied ? "Copied link" : "Copy link"}
        className="blog-share-button"
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}
