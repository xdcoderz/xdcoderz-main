import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { features } from "@/config/features";
import { getBlogCategories, slugifyBlogTaxonomy } from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Products", href: "/#products" },
  { label: "Tools", href: "/#tools" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: routes.work },
  ...(features.blog ? [{ label: "Blog", href: routes.blog }] : []),
];

export function Header() {
  const blogCategories = features.blog ? getBlogCategories() : [];

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
            {navItems.map((item) =>
              item.href === routes.blog ? (
                <div key={item.href} className="site-nav__item site-nav__item--dropdown">
                  <Link href={item.href} className="site-nav__link site-nav__link--dropdown">
                    {item.label}
                    <ChevronDown size={13} aria-hidden="true" />
                  </Link>
                  <div className="site-nav__dropdown" aria-label="Blog categories">
                    <Link href={routes.blog}>All posts</Link>
                    {blogCategories.map((category) => (
                      <Link
                        key={category}
                        href={routes.blogCategory(slugifyBlogTaxonomy(category))}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="site-nav__link">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className="site-header__actions">
            <Link href={routes.contact} className="header-cta">
              <span>Build with us</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <MobileNav items={navItems} blogCategories={blogCategories} />
          </div>
        </div>
      </header>
    </>
  );
}
