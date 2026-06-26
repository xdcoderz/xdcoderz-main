import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "bg-neutral-950 text-white hover:bg-neutral-800",
  secondary:
    "border border-neutral-300 bg-white text-neutral-950 hover:border-neutral-950",
  ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950",
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
