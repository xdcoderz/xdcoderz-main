"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="grid size-10 place-items-center rounded-md border border-neutral-300 bg-white text-neutral-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 hover:shadow-md active:translate-y-0 dark:border-white/15 dark:bg-neutral-900 dark:text-white dark:hover:bg-sky-500/10 dark:hover:text-sky-200"
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div className="absolute inset-x-0 top-full border-b border-neutral-200 bg-white shadow-lg dark:border-white/10 dark:bg-neutral-950">
          <nav className="mx-auto grid max-w-7xl gap-1 px-6 py-4 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-3 transition duration-200 hover:translate-x-1 hover:bg-sky-50 hover:text-sky-700 dark:hover:bg-sky-500/10 dark:hover:text-sky-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
