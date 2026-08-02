import type { OpenProject } from "@/features/open-product-lab/types";

export const openProjects: OpenProject[] = [
  {
    slug: "aegis-eye",
    name: "Aegis Eye",
    repo: "xdcoderz/aegis-eye",
    status: "active",
    maturity: "Priority build",
    category: "Computer Vision",
    license: "Open source",
    description:
      "A vision intelligence project for detecting, tracking, and interpreting operational activity from camera feeds.",
    businessValue:
      "Turns raw video into actionable signals for teams that need faster awareness, cleaner monitoring, and smarter response workflows.",
    tags: ["Computer Vision", "Detection", "Monitoring"],
    featured: true,
    links: {
      github: "https://github.com/xdcoderz/aegis-eye",
    },
  },
  {
    slug: "aegis-command",
    name: "Aegis Command",
    repo: "xdcoderz/aegis-command",
    status: "active",
    maturity: "Command layer",
    category: "Operations Platform",
    license: "Open source",
    description:
      "A command and control layer for coordinating signals, decisions, and operational workflows around Aegis systems.",
    businessValue:
      "Gives monitoring-heavy teams a clearer operating surface for reviewing events, coordinating response, and managing system output.",
    tags: ["Command Center", "Operations", "Workflow"],
    featured: true,
    links: {
      github: "https://github.com/xdcoderz/aegis-command",
    },
  },
];
