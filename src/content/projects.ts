import type { OpenProject } from "@/features/open-product-lab/types";
import { routes } from "@/lib/routes";

export const openProjects: OpenProject[] = [
  {
    slug: "gridforge",
    name: "GridForge",
    repo: "xdcoderz/gridforge-releases",
    status: "active",
    maturity: "Early release",
    category: "Desktop App",
    license: "Public release",
    description:
      "A Windows utility that turns table images into clean JSON, CSV, and Excel files.",
    businessValue:
      "Removes repetitive spreadsheet cleanup for students, operators, and small teams that need usable data faster.",
    tags: ["Windows", "OCR", "Automation"],
    featured: true,
    links: {
      product: routes.product("gridforge"),
      github: "https://github.com/xdcoderz/gridforge-releases",
      download: routes.productDownload("gridforge"),
    },
  },
  {
    slug: "xdcoderz-platform",
    name: "XDCoderz Platform",
    repo: "xdcoderz/xdcoderz-smart-scale-engine",
    status: "active",
    maturity: "Production system",
    category: "Web Platform",
    license: "Source available",
    description:
      "The public website, product catalog, blog system, tools directory, and lead engine behind XDCoderz.",
    businessValue:
      "Shows how a lean software company can combine marketing, products, tools, and operations in one scalable system.",
    tags: ["Next.js", "Supabase", "Vercel"],
    featured: true,
    links: {
      product: routes.home,
      github: "https://github.com/xdcoderz/xdcoderz-smart-scale-engine",
    },
  },
  {
    slug: "xdcoderz-content-engine",
    name: "Content Engine",
    repo: "xdcoderz/xdcoderz-content-engine",
    status: "active",
    maturity: "Automation layer",
    category: "Publishing Automation",
    license: "Source available",
    description:
      "A weekly market-intelligence pipeline that collects signals, ranks them, and publishes XDCoderz blog issues.",
    businessValue:
      "Turns market noise into consistent publishing momentum without turning the main website into an automation mess.",
    tags: ["GitHub Actions", "Market Signals", "Publishing"],
    featured: true,
    links: {
      product: routes.blog,
      github: "https://github.com/xdcoderz/xdcoderz-content-engine",
    },
  },
];
