import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary:
    "bg-neutral-950 text-white shadow-sm hover:bg-sky-700 hover:shadow-md hover:shadow-sky-950/15 dark:bg-sky-300 dark:text-neutral-950 dark:hover:bg-sky-200",
  secondary:
    "border border-neutral-300 bg-white text-neutral-950 shadow-sm hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 hover:shadow-md dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-sky-400 dark:hover:bg-sky-400/10 dark:hover:text-sky-200",
  ghost:
    "text-neutral-700 hover:bg-sky-50 hover:text-sky-700 dark:text-neutral-300 dark:hover:bg-sky-400/10 dark:hover:text-sky-200",
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
