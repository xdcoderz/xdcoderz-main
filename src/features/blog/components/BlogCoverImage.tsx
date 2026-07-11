"use client";

/* Editorial covers can come from changing external sources, so a native image is intentional. */
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

type BlogCoverImageProps = {
  alt: string;
  className?: string;
  fallbackSrc: string;
  src?: string;
};

export function BlogCoverImage({ alt, className, fallbackSrc, src }: BlogCoverImageProps) {
  const [failed, setFailed] = useState(false);
  const imageSrc = !src || failed ? fallbackSrc : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy={imageSrc === fallbackSrc ? undefined : "no-referrer"}
      onError={() => {
        if (imageSrc !== fallbackSrc) {
          setFailed(true);
        }
      }}
      className={className}
    />
  );
}
