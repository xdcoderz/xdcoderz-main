import { features } from "@/config/features";
import { routes } from "@/lib/routes";

export type NavigationItem = {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
  }[];
};

export const mainNavigationItems: NavigationItem[] = [
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
