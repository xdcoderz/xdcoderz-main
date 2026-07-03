import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features } from "@/config/features";
import { routes } from "@/lib/routes";
import { MobileNav } from "./MobileNav";

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
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="relative mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <Link
          href={routes.home}
          className="flex items-center gap-3 text-base font-bold text-neutral-950"
        >
          <span className="grid size-8 place-items-center rounded-md bg-neutral-950 text-sm text-white">
            XD
          </span>
          XDCoderz
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-neutral-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-neutral-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={routes.contact}
          className="hidden min-h-10 items-center gap-2 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 sm:inline-flex"
        >
          <span>Build with us</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
