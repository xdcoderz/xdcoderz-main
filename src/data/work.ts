export type WorkItem = {
  title: string;
  label: string;
  summary: string;
  tags: string[];
  href?: string;
};

export const workItems: WorkItem[] = [
  {
    title: "GridForge",
    label: "Released product",
    summary:
      "A Windows desktop utility that converts table images into Excel, CSV, and JSON with AI or offline OCR.",
    tags: ["Desktop App", "AI", "OCR", "Windows"],
    href: "/products/gridforge",
  },
  {
    title: "XDCoderz Website",
    label: "Brand platform",
    summary:
      "A scalable Next.js site structured around products, services, platform categories, releases, and future growth.",
    tags: ["Next.js", "SEO", "Products", "Services"],
    href: "/",
  },
  {
    title: "Client Work System",
    label: "Service framework",
    summary:
      "A service structure for websites, web apps, Android apps, desktop apps, SaaS MVPs, and automation work.",
    tags: ["Web", "Android", "Desktop", "SaaS"],
    href: "/services",
  },
];
