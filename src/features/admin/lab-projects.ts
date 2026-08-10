import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { AdminLabProject } from "./types";

type GitHubRepoPayload = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  license: {
    spdx_id: string | null;
    name: string | null;
  } | null;
  topics?: string[];
};

export async function getAdminLabProjects() {
  const supabase = createSupabaseAdminClient();
  const result = await supabase
    .from("lab_projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (result.error) {
    throw new Error(`Lab projects query failed: ${result.error.message}`);
  }

  return (result.data ?? []) as AdminLabProject[];
}

export async function createLabProjectFromGithubUrl(url: string) {
  const repo = parseGithubRepo(url);
  const github = await loadGithubRepo(repo);
  const supabase = createSupabaseAdminClient();
  const name = toTitle(github.name);
  const topics = normalizeTags(github.topics ?? []);

  const { data: existing, error: existingError } = await supabase
    .from("lab_projects")
    .select("id")
    .eq("repo", repo)
    .maybeSingle();

  if (existingError) {
    throw new Error(`Lab project lookup failed: ${existingError.message}`);
  }

  if (existing) {
    throw new Error("This GitHub repository is already listed in the Lab.");
  }

  const { error } = await supabase.from("lab_projects").insert({
    slug: slugify(github.name),
    name,
    repo,
    status: "active",
    maturity: "Open-source build",
    category: inferCategory(topics, github.description ?? ""),
    license: github.license?.spdx_id || github.license?.name || "Open source",
    description:
      github.description ||
      `${name} is an open-source XDCoderz project published for inspection and iteration.`,
    business_value:
      "Adds public proof that XDCoderz ships practical systems, exposes the work for inspection, and turns useful experiments into stronger products.",
    tags: topics.length > 0 ? topics : ["Open Source", "XDCoderz"],
    github_url: github.html_url,
    featured: true,
    sort_order: 100,
  });

  if (error) throw new Error(`Lab project insert failed: ${error.message}`);
}

function parseGithubRepo(input: string) {
  let url: URL;

  try {
    url = new URL(input.trim());
  } catch {
    throw new Error("Enter a valid GitHub repository URL.");
  }

  if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
    throw new Error("Only github.com repository URLs are supported.");
  }

  const [owner, repo] = url.pathname.split("/").filter(Boolean);
  if (!owner || !repo) throw new Error("Enter a full GitHub repository URL.");

  return `${owner}/${repo.replace(/\.git$/i, "")}`;
}

async function loadGithubRepo(repo: string) {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers,
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error("GitHub could not read that repository. Confirm it is public or the token can access it.");
  }

  return (await response.json()) as GitHubRepoPayload;
}

function normalizeTags(topics: string[]) {
  return topics
    .map((topic) => toTitle(topic))
    .filter(Boolean)
    .slice(0, 4);
}

function inferCategory(tags: string[], description: string) {
  const haystack = [...tags, description].join(" ").toLowerCase();

  if (haystack.includes("vision") || haystack.includes("camera") || haystack.includes("detection")) {
    return "Computer Vision";
  }

  if (haystack.includes("dashboard") || haystack.includes("command")) {
    return "Operations Platform";
  }

  if (haystack.includes("automation") || haystack.includes("workflow")) {
    return "Automation";
  }

  return "Open Source";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitle(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase())
    .trim();
}
