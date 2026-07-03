"use client";

/* External editorial thumbnails have dynamic hosts, so a native image is intentional here. */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

type DigestImageProps = {
  src?: string;
  alt: string;
  sourceName: string;
};

export function DigestImage({ src, alt, sourceName }: DigestImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex aspect-video items-center justify-center border border-neutral-200 bg-neutral-100 px-6 text-center text-sm font-semibold text-neutral-500">
        {sourceName}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className="aspect-video w-full border border-neutral-200 bg-neutral-100 object-cover"
    />
  );
}
