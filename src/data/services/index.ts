import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "website-development",
    name: "Website Development",
    eyebrow: "Launch-ready websites",
    summary:
      "Modern websites for people and businesses that need a clean online presence, fast pages, and clear messaging.",
    description:
      "XDCoderz builds practical websites for portfolios, local businesses, product launches, service pages, and simple company sites. The focus is speed, clarity, responsive design, and a structure that can grow later.",
    outcomes: [
      "Responsive website design",
      "SEO-ready pages and metadata",
      "Contact or inquiry flow",
      "Deployment-ready codebase",
    ],
    bestFor: ["Small businesses", "Creators", "Product launches", "Service brands"],
  },
  {
    slug: "web-application-development",
    name: "Web Application Development",
    eyebrow: "Browser-based software",
    summary:
      "Dashboards, portals, admin panels, and custom browser-based apps for real workflows.",
    description:
      "XDCoderz builds web applications around practical use cases: data entry, dashboards, customer portals, internal tools, and product MVPs that need to run cleanly in a browser.",
    outcomes: [
      "Responsive app interfaces",
      "Database-backed workflows",
      "Authentication-ready foundations",
      "Admin panels and dashboards",
    ],
    bestFor: ["Founders", "Operations teams", "Solo businesses", "Internal workflows"],
  },
  {
    slug: "android-app-development",
    name: "Android App Development",
    eyebrow: "Mobile-first apps",
    summary:
      "Android apps for business workflows, customer tools, prototypes, and product ideas.",
    description:
      "XDCoderz can design and build Android applications that focus on clear screens, practical flows, and maintainable app foundations.",
    outcomes: [
      "Android UI and navigation",
      "API-connected app flows",
      "Local storage foundations",
      "Release-ready app structure",
    ],
    bestFor: ["Mobile MVPs", "Business apps", "Field workflows", "Customer tools"],
  },
  {
    slug: "desktop-app-development",
    name: "Desktop App Development",
    eyebrow: "Installable utilities",
    summary:
      "Windows desktop tools and utilities for file processing, productivity, and offline workflows.",
    description:
      "XDCoderz builds practical desktop applications for tasks that need local files, offline processing, or a dedicated installable utility.",
    outcomes: [
      "Desktop app interface",
      "Local file workflows",
      "Installer-ready packaging",
      "Offline-first processing",
    ],
    bestFor: ["Windows utilities", "File tools", "Offline apps", "Productivity helpers"],
  },
  {
    slug: "saas-mvp-development",
    name: "SaaS MVP Development",
    eyebrow: "From idea to launch",
    summary:
      "Early SaaS products with landing pages, core workflows, auth, dashboards, and deployment.",
    description:
      "XDCoderz helps turn focused SaaS ideas into launchable MVPs by starting with the workflow that matters most and building a clean foundation around it.",
    outcomes: [
      "MVP product scope",
      "Core web app build",
      "Landing and onboarding pages",
      "Deployment and iteration path",
    ],
    bestFor: ["SaaS ideas", "Founder MVPs", "Internal SaaS", "Lean launches"],
  },
  {
    slug: "automation-internal-tools",
    name: "Automation & Internal Tools",
    eyebrow: "Less repeated work",
    summary:
      "Automations that connect tools, clean data, generate files, and remove repetitive manual steps.",
    description:
      "XDCoderz helps turn repeated digital chores into reliable flows, from file processing and reports to small integrations between everyday tools.",
    outcomes: [
      "Workflow analysis",
      "Data cleanup scripts",
      "Report generation",
      "Tool integrations",
    ],
    bestFor: ["Manual reporting", "File workflows", "Small teams", "Data-heavy tasks"],
  },
  {
    slug: "backend-api-development",
    name: "Backend & API Development",
    eyebrow: "Reliable foundations",
    summary:
      "APIs, server logic, integrations, and backend systems for apps and products.",
    description:
      "XDCoderz can build backend services that connect applications to data, integrations, authentication, and business logic.",
    outcomes: [
      "REST API foundations",
      "Database integration",
      "Third-party API connections",
      "Deployment-ready backend services",
    ],
    bestFor: ["Web apps", "Mobile apps", "SaaS products", "Integrations"],
  },
  {
    slug: "ui-redesign",
    name: "UI Improvement & Redesign",
    eyebrow: "Cleaner product experience",
    summary:
      "Improve existing websites and apps with clearer layouts, better flows, and more polished interfaces.",
    description:
      "XDCoderz can refine existing interfaces so users can understand, scan, and complete tasks more easily.",
    outcomes: [
      "UI audit",
      "Responsive redesign",
      "Interaction cleanup",
      "Design implementation",
    ],
    bestFor: ["Existing apps", "Old websites", "MVP cleanup", "Product polish"],
  },
  {
    slug: "deployment-maintenance",
    name: "Deployment & Maintenance",
    eyebrow: "Keep it running",
    summary:
      "Deployment support, fixes, updates, and ongoing improvements for websites and software products.",
    description:
      "XDCoderz helps ship projects and keep them healthy with deployment setup, updates, bug fixes, and practical improvements over time.",
    outcomes: [
      "Hosting setup",
      "Domain and DNS support",
      "Bug fixes and updates",
      "Performance improvements",
    ],
    bestFor: ["Live products", "Client websites", "Small businesses", "Launch support"],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
