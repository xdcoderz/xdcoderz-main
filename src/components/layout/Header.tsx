import Link from "next/link";
import { ArrowRight, ChevronDown, LockKeyhole } from "lucide-react";
import { mainNavigationItems } from "@/config/navigation";
import { getBlogCategories, slugifyBlogTaxonomy } from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const blogCategories = getBlogCategories();
  const navigationItems = mainNavigationItems.map((item) =>
    item.href === routes.blog
      ? {
          ...item,
          children: [
            { label: "All posts", href: routes.blog },
            ...blogCategories.map((category) => ({
              label: category,
              href: routes.blogCategory(slugifyBlogTaxonomy(category)),
            })),
          ],
        }
      : item,
  );

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
            {navigationItems.map((item) =>
              item.children?.length ? (
                <div key={item.href} className="site-nav__item site-nav__item--dropdown">
                  <Link href={item.href} className="site-nav__link site-nav__link--dropdown">
                    {item.label}
                    <ChevronDown size={13} aria-hidden="true" />
                  </Link>
                  <div className="site-nav__dropdown" aria-label={`${item.label} links`}>
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
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
            <Link href={routes.adminLogin} className="admin-sign-in-link">
              <LockKeyhole size={14} aria-hidden="true" />
              <span>Admin sign in</span>
            </Link>
            <Link href={routes.contact} className="header-cta">
              <span>Build with us</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <MobileNav items={navigationItems} />
          </div>
        </div>
      </header>
    </>
  );
}
