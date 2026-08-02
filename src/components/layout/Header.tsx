import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { features } from "@/config/features";
import { getBlogCategories, slugifyBlogTaxonomy } from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  {
    label: "Products",
    href: routes.products,
    children: [
      { label: "All products", href: routes.products },
      { label: "GridForge", href: routes.product("gridforge") },
      { label: "Open business tools", href: routes.tools },
      { label: "Software Cost Estimator", href: routes.tool("software-cost-estimator") },
      { label: "Workflow Audit", href: routes.tool("workflow-audit") },
      { label: "Project Ideas Generator", href: routes.tool("project-ideas-generator") },
    ],
  },
  {
    label: "Services",
    href: routes.services,
    children: [
      { label: "All services", href: routes.services },
      { label: "Website Development", href: routes.service("website-development") },
      { label: "Web Application Development", href: routes.service("web-application-development") },
      { label: "Android App Development", href: routes.service("android-app-development") },
      { label: "Desktop App Development", href: routes.service("desktop-app-development") },
      { label: "Automation & Internal Tools", href: routes.service("automation-internal-tools") },
      { label: "Custom Software", href: "/services/custom-software" },
    ],
  },
  { label: "Lab", href: routes.lab },
  ...(features.blog ? [{ label: "Blog", href: routes.blog, children: [] }] : []),
];

export function Header() {
  const blogCategories = features.blog ? getBlogCategories() : [];
  const navigationItems = navItems.map((item) =>
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
