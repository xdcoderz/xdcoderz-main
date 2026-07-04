import {
  BarChart3,
  Braces,
  FileText,
  KeyRound,
  Lightbulb,
  QrCode,
  SearchCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ToolCategory, ToolDefinition } from "../types";

export const toolCategories: ToolCategory[] = [
  "Planning Tools",
  "Business Tools",
  "Developer Tools",
  "Growth Tools",
];

export const tools: ToolDefinition[] = [
  {
    slug: "software-cost-estimator",
    name: "Software Cost Estimator",
    category: "Planning Tools",
    status: "Preview",
    featured: true,
    summary: "Estimate the investment range for a website, app, SaaS, or automation build.",
    description:
      "A practical planning tool for turning an early software idea into a clearer scope, budget signal, and next conversation.",
    outcome: "A cleaner budget range before a client call.",
    audience: "Founders, operators, and business owners considering a serious software build.",
    businessUse:
      "Use this when a prospect wants pricing clarity before they are ready for a full consultation.",
    ctaLabel: "Estimate a build",
    icon: BarChart3,
    tags: ["Planning", "Budget", "Scoping"],
    inputs: ["Project type", "Core features", "Timeline", "Integration needs"],
    outputs: ["Estimated range", "Complexity signal", "Recommended next step"],
    nextSteps: [
      "Add a guided questionnaire.",
      "Map answers to budget ranges.",
      "Connect high-intent results to the contact flow.",
    ],
  },
  {
    slug: "workflow-audit",
    name: "Workflow Audit",
    category: "Planning Tools",
    status: "Preview",
    featured: true,
    summary: "Find the manual work that should become automation, dashboards, or custom software.",
    description:
      "A diagnostic tool that helps a business identify operational drag and translate it into a software opportunity.",
    outcome: "A ranked view of workflow bottlenecks worth fixing.",
    audience: "Teams losing time to repeated manual work, scattered tools, or slow handoffs.",
    businessUse:
      "Use this to qualify automation and custom software leads with stronger context.",
    ctaLabel: "Audit a workflow",
    icon: Workflow,
    tags: ["Automation", "Operations", "Productivity"],
    inputs: ["Team size", "Repeated tasks", "Current tools", "Bottleneck frequency"],
    outputs: ["Automation fit", "System recommendation", "Priority score"],
    nextSteps: [
      "Create the audit questions.",
      "Score responses by operational impact.",
      "Route strong matches to automation services.",
    ],
  },
  {
    slug: "project-ideas-generator",
    name: "Project Ideas Generator",
    category: "Planning Tools",
    status: "Preview",
    featured: true,
    summary: "Generate product ideas from market signals, business constraints, or blog topics.",
    description:
      "A companion to XDCoderz content that turns market changes into focused software opportunities.",
    outcome: "Ten practical ideas a builder can evaluate immediately.",
    audience: "Creators, founders, students, and operators looking for useful software angles.",
    businessUse:
      "Use this beside blog posts to convert reading attention into product and service demand.",
    ctaLabel: "Generate ideas",
    icon: Lightbulb,
    tags: ["Ideas", "AI", "Strategy"],
    inputs: ["Market topic", "Target user", "Platform preference", "Build difficulty"],
    outputs: ["Project ideas", "Target customer", "MVP feature set"],
    nextSteps: [
      "Start with rule-based generation.",
      "Add optional AI generation later.",
      "Connect blog posts to prefilled idea prompts.",
    ],
  },
  {
    slug: "invoice-generator",
    name: "Invoice Generator",
    category: "Business Tools",
    status: "Planned",
    summary: "Create clean invoices without needing a heavy accounting product.",
    description:
      "A lightweight utility for freelancers and small businesses that need fast, presentable invoices.",
    outcome: "A downloadable invoice ready to send.",
    audience: "Freelancers, agencies, consultants, and small business operators.",
    businessUse:
      "Use this as a simple traffic tool that introduces XDCoderz to business owners.",
    ctaLabel: "Create an invoice",
    icon: FileText,
    tags: ["Business", "PDF", "Utility"],
    inputs: ["Client details", "Line items", "Tax", "Payment terms"],
    outputs: ["Invoice preview", "PDF export", "Reusable draft"],
    nextSteps: [
      "Build the invoice form.",
      "Add client-side preview.",
      "Add PDF export once the layout is stable.",
    ],
  },
  {
    slug: "qr-generator",
    name: "QR Generator",
    category: "Business Tools",
    status: "Planned",
    summary: "Generate QR codes for links, contact details, campaigns, and product pages.",
    description:
      "A fast QR utility that supports practical business use cases without burying the user in settings.",
    outcome: "A campaign-ready QR code.",
    audience: "Businesses, creators, local stores, and event operators.",
    businessUse:
      "Use this to attract utility traffic while showcasing the XDCoderz tool ecosystem.",
    ctaLabel: "Generate a QR",
    icon: QrCode,
    tags: ["QR", "Marketing", "Utility"],
    inputs: ["Destination", "Label", "Format", "Brand color"],
    outputs: ["QR preview", "PNG download", "Campaign note"],
    nextSteps: [
      "Add QR rendering.",
      "Support PNG export.",
      "Add optional brand color controls.",
    ],
  },
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "Developer Tools",
    status: "Planned",
    summary: "Format, validate, and inspect JSON without leaving the browser.",
    description:
      "A developer utility that keeps XDCoderz useful for builders while staying isolated from the main site.",
    outcome: "Readable, validated JSON.",
    audience: "Developers, students, API testers, and technical operators.",
    businessUse:
      "Use this as a developer traffic entry point for future technical products.",
    ctaLabel: "Format JSON",
    icon: Braces,
    tags: ["Developer", "JSON", "Validation"],
    inputs: ["Raw JSON", "Indent preference", "Sort preference"],
    outputs: ["Formatted JSON", "Validation errors", "Copy-ready result"],
    nextSteps: [
      "Build local-only formatting.",
      "Add validation messages.",
      "Add copy and download actions.",
    ],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Developer Tools",
    status: "Planned",
    summary: "Generate strong passwords locally with clear strength controls.",
    description:
      "A privacy-friendly utility for quickly producing secure credentials without server storage.",
    outcome: "A strong password generated in the browser.",
    audience: "General users, teams, and developers.",
    businessUse:
      "Use this as a simple trust-building tool where privacy and clarity matter.",
    ctaLabel: "Generate a password",
    icon: KeyRound,
    tags: ["Security", "Utility", "Local"],
    inputs: ["Length", "Character sets", "Readable mode"],
    outputs: ["Generated password", "Strength signal", "Copy action"],
    nextSteps: [
      "Build the local generator.",
      "Add strength feedback.",
      "Make clear that nothing is stored.",
    ],
  },
  {
    slug: "seo-checker",
    name: "Website SEO Checker",
    category: "Growth Tools",
    status: "Planned",
    summary: "Review a page for the basic SEO signals that affect discovery and trust.",
    description:
      "A practical SEO checker for business owners who want to understand what their page is missing.",
    outcome: "A plain-English SEO improvement list.",
    audience: "Business owners, founders, creators, and marketing teams.",
    businessUse:
      "Use this to create website development leads from users who discover gaps in their current site.",
    ctaLabel: "Check a page",
    icon: SearchCheck,
    tags: ["SEO", "Growth", "Website"],
    inputs: ["Page URL", "Target keyword", "Business category"],
    outputs: ["SEO score", "Issue list", "Recommended fixes"],
    nextSteps: [
      "Start with client-entered metadata checks.",
      "Add server-side URL inspection later.",
      "Connect poor scores to website services.",
    ],
  },
  {
    slug: "headline-generator",
    name: "Headline Generator",
    category: "Growth Tools",
    status: "Planned",
    summary: "Create sharper landing page headlines from a product, audience, and promise.",
    description:
      "A positioning tool that helps turn vague offers into clearer website messaging.",
    outcome: "Sharper headline options for a landing page.",
    audience: "Founders, marketers, agencies, and product teams.",
    businessUse:
      "Use this to support website and product strategy conversations.",
    ctaLabel: "Draft headlines",
    icon: Sparkles,
    tags: ["Copy", "Positioning", "Growth"],
    inputs: ["Product", "Audience", "Pain point", "Promise"],
    outputs: ["Headline options", "Supporting line", "CTA suggestions"],
    nextSteps: [
      "Build prompt-free templates first.",
      "Add AI rewriting later.",
      "Connect strong drafts to website service CTAs.",
    ],
  },
];

export const featuredTools = tools.filter((tool) => tool.featured);

export function getTool(slug: string) {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory) {
  return tools.filter((tool) => tool.category === category);
}

