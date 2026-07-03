export type BlogCategory =
  | "Build Logs"
  | "Automation"
  | "Web Development"
  | "SaaS Notes"
  | "Productivity"
  | "Case Studies"
  | "Founder Notes";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  author: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
  readingTime: string;
};
