import { openProjects } from "@/content/projects";
import type { OpenProjectWithStats } from "../types";
import { getAdminManagedOpenProjects } from "./admin-projects";
import { getRepoStats } from "./github";

export async function getOpenProjects(): Promise<OpenProjectWithStats[]> {
  const adminProjects = await getAdminManagedOpenProjects();
  const projects = mergeProjects(openProjects, adminProjects);

  return Promise.all(
    projects.map(async (project) => ({
      ...project,
      stats: await getRepoStats(project.repo),
    })),
  );
}

export async function getFeaturedOpenProjects(): Promise<OpenProjectWithStats[]> {
  const projects = await getOpenProjects();

  return projects.filter((project) => project.featured).slice(0, 3);
}

function mergeProjects(
  editorialProjects: typeof openProjects,
  adminProjects: typeof openProjects,
) {
  const seen = new Set<string>();
  const merged = [...editorialProjects, ...adminProjects].filter((project) => {
    const key = project.repo.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return merged;
}
