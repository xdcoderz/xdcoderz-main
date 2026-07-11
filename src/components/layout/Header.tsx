import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { features } from "@/config/features";
import { routes } from "@/lib/routes";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Products", href: "/#products" },
  { label: "Tools", href: "/#tools" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: routes.work },
  ...(features.blog ? [{ label: "Blog", href: routes.blog }] : []),
  { label: "Contact", href: routes.contact },
];

export function Header() {
  return (
    <>
      <Link href={routes.tool("software-cost-estimator")} className="announcement-bar">
        <span>New</span>
        Plan your next build with the XDCoderz Software Cost Estimator
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href={routes.home} className="brand-link">
            <span className="brand-mark">XD</span>
            XDCoderz
          </Link>
          <nav className="site-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="site-nav__link">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="site-header__actions">
            <Link href={routes.contact} className="header-cta">
              <span>Build with us</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <MobileNav items={navItems} />
          </div>
        </div>
      </header>
    </>
  );
}
