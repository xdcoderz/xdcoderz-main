import { Bot, Cloud, Code2, MonitorCog, Smartphone, Workflow } from "lucide-react";

export const platformCapabilities = [
  {
    title: "Desktop Applications",
    icon: MonitorCog,
    description:
      "Installable utilities and offline-first apps for Windows and local file workflows.",
  },
  {
    title: "Android Applications",
    icon: Smartphone,
    description:
      "Mobile apps for business flows, user tools, product prototypes, and field work.",
  },
  {
    title: "Web Applications",
    icon: Code2,
    description:
      "Dashboards, portals, admin tools, and browser-based software for teams and products.",
  },
  {
    title: "SaaS Products",
    icon: Cloud,
    description:
      "Cloud products with accounts, workflows, dashboards, and launch-ready foundations.",
  },
  {
    title: "Automation Tools",
    icon: Workflow,
    description:
      "Small systems that connect tools, process files, clean data, and reduce repeated work.",
  },
  {
    title: "Beyond The Usual",
    icon: Bot,
    description:
      "Experimental software, AI-powered helpers, developer tools, and new product ideas.",
  },
];
