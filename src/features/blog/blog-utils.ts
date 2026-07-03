import fs from "node:fs";
import path from "node:path";
import type { BlogCategory, BlogPost, BlogPostMeta } from "./types";

const blogDirectory = path.join(process.cwd(), "src", "content", "blog");
const postFilePattern = /\.(md|mdx)$/;

function parseList(value: string | undefined) {
  if (!value) {
    return [];
  }

  return value
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function parseBoolean(value: string | undefined) {
  return value?.toLowerCase() === "true";
}

function parseFrontmatter(source: string, slug: string): BlogPost {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`Blog post "${slug}" is missing frontmatter.`);
  }

  const rawMeta = match[1].split(/\r?\n/).reduce<Record<string, string>>(
    (meta, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return meta;
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = line
        .slice(separatorIndex + 1)
        .trim()
        .replace(/^["']|["']$/g, "");

      return {
        ...meta,
        [key]: value,
      };
    },
    {},
  );

  const content = match[2].trim();
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  const meta: BlogPostMeta = {
    slug,
    title: rawMeta.title,
    description: rawMeta.description,
    date: rawMeta.date,
    category: rawMeta.category as BlogCategory,
    author: rawMeta.author || "XDCoderz",
    tags: parseList(rawMeta.tags),
    featured: parseBoolean(rawMeta.featured),
    coverImage: rawMeta.coverImage,
  };

  const requiredFields: Array<keyof BlogPostMeta> = [
    "title",
    "description",
    "date",
    "category",
    "author",
  ];

  requiredFields.forEach((field) => {
    if (!meta[field]) {
      throw new Error(`Blog post "${slug}" is missing "${field}".`);
    }
  });

  return {
    ...meta,
    content,
    readingTime: `${minutes} min read`,
  };
}

export function getAllBlogPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => postFilePattern.test(fileName))
    .map((fileName) => {
      const slug = fileName.replace(postFilePattern, "");
      const source = fs.readFileSync(path.join(blogDirectory, fileName), "utf8");

      return parseFrontmatter(source, slug);
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getFeaturedBlogPosts() {
  const posts = getAllBlogPosts();
  const featured = posts.filter((post) => post.featured);

  return featured.length > 0 ? featured : posts.slice(0, 2);
}

export function getBlogCategories() {
  return Array.from(new Set(getAllBlogPosts().map((post) => post.category)));
}
