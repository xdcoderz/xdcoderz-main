export type RoadmapItem = {
  title: string;
  status: "Live" | "Released" | "In development" | "Planned" | "Exploring";
  summary: string;
};

export const roadmapItems: RoadmapItem[] = [
  {
    title: "XDCoderz brand website",
    status: "Live",
    summary:
      "The public home for XDCoderz products, services, releases, and future software lines.",
  },
  {
    title: "GridForge v0.1.0",
    status: "Released",
    summary:
      "First public product release with AI Mode, Offline Pack support, and spreadsheet exports.",
  },
  {
    title: "Service inquiry flow",
    status: "Planned",
    summary:
      "A structured form for website, Android, desktop, web app, SaaS, and automation requests.",
  },
  {
    title: "Android utility line",
    status: "Exploring",
    summary:
      "Small Android applications for practical personal and business workflows.",
  },
  {
    title: "Web app and SaaS experiments",
    status: "Exploring",
    summary:
      "Cloud-based products and browser apps that solve focused workflow problems.",
  },
  {
    title: "Product changelog system",
    status: "Planned",
    summary:
      "A reusable release and changelog structure for future XDCoderz products.",
  },
];
