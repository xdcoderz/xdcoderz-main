import { gridforge } from "@/data/products/gridforge";
import type { Spotlight } from "./types";

export const initialSpotlight: Spotlight = {
  title: gridforge.name,
  description: gridforge.summary,
  badge: "Windows / v0.1.0",
  href: "/products/gridforge",
  buttonLabel: "Explore GridForge",
  image: "/images/featured/table-workflow.png",
  imageAlt: "Illustration of paper tables becoming an organized spreadsheet",
  enabled: true,
  startsAt: "",
  endsAt: "",
};

