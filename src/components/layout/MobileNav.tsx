"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { routes } from "@/lib/routes";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  items: NavItem[];
  blogCategories?: string[];
};

function slugifyTaxonomy(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function MobileNav({ items, blogCategories = [] }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
    setIsBlogOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="site-icon-button"
      >
        {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div className="mobile-nav-panel">
          <nav className="mobile-nav-panel__inner">
            {items.map((item) =>
              item.href === routes.blog ? (
                <div key={item.href} className="mobile-nav-group">
                  <button
                    type="button"
                    className="mobile-nav-link mobile-nav-link--button"
                    aria-expanded={isBlogOpen}
                    onClick={() => setIsBlogOpen((current) => !current)}
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  {isBlogOpen && (
                    <div className="mobile-nav-submenu">
                      <Link href={routes.blog} onClick={closeMenu}>
                        All posts
                      </Link>
                      {blogCategories.map((category) => (
                        <Link
                          key={category}
                          href={routes.blogCategory(slugifyTaxonomy(category))}
                          onClick={closeMenu}
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="mobile-nav-link"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link href={routes.contact} onClick={closeMenu} className="mobile-nav-cta">
              Build with us
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
