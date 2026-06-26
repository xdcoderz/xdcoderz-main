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
    slug: "custom-software",
    name: "Custom Software",
    eyebrow: "Web apps and internal tools",
    summary:
      "Focused software builds for workflows that are too specific for generic off-the-shelf tools.",
    description:
      "From dashboards to small web apps, XDCoderz can help shape and build software around the way a person or team already works.",
    outcomes: [
      "Custom web app architecture",
      "Admin panels and dashboards",
      "Authentication-ready foundations",
      "Database-backed workflows",
    ],
    bestFor: ["Founders", "Operations teams", "Solo businesses", "Internal workflows"],
  },
  {
    slug: "automation",
    name: "Automation",
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
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
