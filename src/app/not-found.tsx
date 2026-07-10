import Link from "next/link";
import { Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { routes } from "@/lib/routes";

const helpfulLinks = [
  { label: "Blog", href: routes.blog },
  { label: "Search posts", href: routes.blogSearch },
  { label: "Products", href: routes.products },
  { label: "Services", href: routes.services },
  { label: "Contact", href: routes.contact },
];

export default function NotFound() {
  return (
    <main className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          This page is not where the useful thing lives.
        </h1>
        <p className="mt-5 max-w-2xl leading-8 text-neutral-650">
          Try the blog search or jump back into one of the main sections.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={routes.blogSearch}>
            <Search size={16} aria-hidden="true" />
            Search the blog
          </ButtonLink>
          <ButtonLink href={routes.home} variant="secondary">
            Go home
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-3 border-t border-neutral-200 pt-8 text-sm">
          {helpfulLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-semibold text-neutral-700 hover:text-sky-800">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
