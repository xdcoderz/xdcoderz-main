import { openProjects } from "@/content/projects";
import type { OpenProjectWithStats } from "../types";
import { getRepoStats } from "./github";

export async function getOpenProjects(): Promise<OpenProjectWithStats[]> {
  return Promise.all(
    openProjects.map(async (project) => ({
      ...project,
      stats: await getRepoStats(project.repo),
    })),
  );
}

export async function getFeaturedOpenProjects(): Promise<OpenProjectWithStats[]> {
  const projects = await getOpenProjects();

  return projects.filter((project) => project.featured).slice(0, 3);
}
