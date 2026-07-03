import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features } from "@/config/features";
import { routes } from "@/lib/routes";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Products", href: "/#products" },
  { label: "Categories", href: "/#categories" },
  { label: "Services", href: routes.services },
  { label: "Work", href: routes.work },
  ...(features.blog ? [{ label: "Blog", href: routes.blog }] : []),
  { label: "Contact", href: routes.contact },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/82 text-neutral-950 backdrop-blur-xl dark:border-white/10 dark:bg-neutral-950/78 dark:text-white">
      <div className="relative mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-6">
        <Link
          href={routes.home}
          className="group flex items-center gap-3 text-base font-bold transition hover:text-sky-700 dark:hover:text-sky-200"
        >
          <span className="grid size-8 place-items-center rounded-md bg-neutral-950 font-mono text-sm text-white transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-sky-700 dark:bg-white dark:text-neutral-950 dark:group-hover:bg-sky-300">
            XD
          </span>
          XDCoderz
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-600 md:flex dark:text-neutral-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative transition hover:-translate-y-0.5 hover:text-sky-700 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-sky-500 after:transition-all hover:after:w-full dark:hover:text-sky-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={routes.contact}
          className="hidden min-h-10 items-center gap-2 rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md active:translate-y-0 dark:bg-sky-300 dark:text-neutral-950 dark:hover:bg-sky-200 sm:inline-flex"
        >
          <span>Build with us</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <ThemeToggle />
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
