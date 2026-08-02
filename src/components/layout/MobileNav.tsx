"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { routes } from "@/lib/routes";

type NavItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

type MobileNavProps = {
  items: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function closeMenu() {
    setIsOpen(false);
    setOpenGroup(null);
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
              item.children?.length ? (
                <div key={item.href} className="mobile-nav-group">
                  <button
                    type="button"
                    className="mobile-nav-link mobile-nav-link--button"
                    aria-expanded={openGroup === item.href}
                    onClick={() =>
                      setOpenGroup((current) => (current === item.href ? null : item.href))
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  {openGroup === item.href && (
                    <div className="mobile-nav-submenu">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={closeMenu}
                        >
                          {child.label}
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
