import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  tone = "light",
}: SectionProps) {
  const headingColor = tone === "dark" ? "text-white" : "text-neutral-950";
  const descriptionColor =
    tone === "dark" ? "text-neutral-300" : "text-neutral-650";
  const eyebrowColor = tone === "dark" ? "text-teal-300" : "text-teal-700";

  return (
    <section id={id} className={`scroll-mt-20 px-6 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="mb-10 max-w-3xl">
            {eyebrow && (
              <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.18em] ${eyebrowColor}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className={`text-3xl font-semibold tracking-tight sm:text-4xl ${headingColor}`}>
                {title}
              </h2>
            )}
            {description && (
              <p className={`mt-4 text-base leading-7 ${descriptionColor}`}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
