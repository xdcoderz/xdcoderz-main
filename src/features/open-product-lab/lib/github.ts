import type { GitHubRepoStats } from "../types";

type GitHubRepoResponse = {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  pushed_at: string;
};

type GitHubReleaseResponse = {
  name: string | null;
  tag_name: string;
  published_at: string;
};

function githubHeaders() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchGitHub(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    return await fetch(url, {
      headers: githubHeaders(),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function getRepoStats(repo: string): Promise<GitHubRepoStats | null> {
  try {
    const [repoResponse, releaseResponse] = await Promise.all([
      fetchGitHub(`https://api.github.com/repos/${repo}`),
      fetchGitHub(`https://api.github.com/repos/${repo}/releases/latest`),
    ]);

    if (!repoResponse.ok) {
      return null;
    }

    const data = (await repoResponse.json()) as GitHubRepoResponse;
    const release = releaseResponse.ok
      ? ((await releaseResponse.json()) as GitHubReleaseResponse)
      : null;

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
      defaultBranch: data.default_branch,
      pushedAt: data.pushed_at,
      latestRelease: release
        ? {
            name: release.name || release.tag_name,
            tagName: release.tag_name,
            publishedAt: release.published_at,
          }
        : undefined,
    };
  } catch {
    return null;
  }
}
