import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "button-link--primary",
  secondary: "button-link--secondary",
  ghost: "button-link--ghost",
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`button-link ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
