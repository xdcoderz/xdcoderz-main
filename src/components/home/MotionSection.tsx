"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionSection({ children, className, label, disabled = false }: {
  children: ReactNode; className: string; label: string; disabled?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (disabled || !root.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const section = root.current!;
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
        defaults: { duration: 0.7, ease: "power3.out" },
      });
      timeline.from(section.querySelectorAll("[data-reveal]"), {
        y: 22, opacity: 0, stagger: 0.09,
      }, 0).from(section.querySelectorAll("[data-line]"), {
        scaleX: 0, transformOrigin: "left center", duration: 1,
      }, 0);
      const art = section.querySelector<HTMLElement>("[data-art]");
      if (art) timeline.from(art, { y: 28, rotation: 2, opacity: 0, duration: 0.9 }, 0.15);
    }, root);
    media.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
      const art = root.current!.querySelector<HTMLElement>("[data-art]");
      if (!art) return;
      const move = gsap.quickTo(art, "y", { duration: 0.45, ease: "power2.out" });
      const enter = () => move(-6);
      const leave = () => move(0);
      art.addEventListener("pointerenter", enter);
      art.addEventListener("pointerleave", leave);
      return () => {
        art.removeEventListener("pointerenter", enter);
        art.removeEventListener("pointerleave", leave);
      };
    }, root);
    return () => media.revert();
  }, [disabled]);
  return <section ref={root} className={className} aria-label={label}>{children}</section>;
}

