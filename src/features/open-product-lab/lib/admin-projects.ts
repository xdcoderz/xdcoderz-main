import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { OpenProject } from "../types";

type LabProjectRow = {
  slug: string;
  name: string;
  repo: string;
  status: OpenProject["status"];
  maturity: string;
  category: string;
  license: string;
  description: string;
  business_value: string;
  tags: string[] | null;
  github_url: string;
  featured: boolean;
};

export async function getAdminManagedOpenProjects(): Promise<OpenProject[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !hasSupabaseSecret()) {
    return [];
  }

  try {
    const supabase = createSupabaseAdminClient();
    const result = await supabase
      .from("lab_projects")
      .select(
        "slug,name,repo,status,maturity,category,license,description,business_value,tags,github_url,featured",
      )
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (result.error) return [];

    return ((result.data ?? []) as LabProjectRow[]).map((project) => ({
      slug: project.slug,
      name: project.name,
      repo: project.repo,
      status: project.status,
      maturity: project.maturity,
      category: project.category,
      license: project.license,
      description: project.description,
      businessValue: project.business_value,
      tags: project.tags ?? [],
      featured: project.featured,
      links: {
        github: project.github_url,
      },
    }));
  } catch {
    return [];
  }
}

function hasSupabaseSecret() {
  return Boolean(
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
      process.env.SUPABASE_SECRET_KEY?.trim(),
  );
}
