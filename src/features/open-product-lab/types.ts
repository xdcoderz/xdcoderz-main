export type OpenProjectStatus = "active" | "prototype" | "seeking-contributors" | "archived";

export type OpenProject = {
  slug: string;
  name: string;
  repo: string;
  status: OpenProjectStatus;
  maturity: string;
  category: string;
  license: string;
  description: string;
  businessValue: string;
  tags: string[];
  featured?: boolean;
  links: {
    product?: string;
    github: string;
    download?: string;
  };
};

export type GitHubRepoStats = {
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  pushedAt: string;
  latestRelease?: {
    name: string;
    tagName: string;
    publishedAt: string;
  };
};

export type OpenProjectWithStats = OpenProject & {
  stats: GitHubRepoStats | null;
};
