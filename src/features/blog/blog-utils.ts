import fs from "node:fs";
import path from "node:path";
import type { BlogCategory, BlogPost, BlogPostMeta, WeeklyMarketDigest } from "./types";

const blogDirectory = path.join(process.cwd(), "src", "content", "blog");
const postFilePattern = /\.(md|mdx)$/;
const digestFilePattern = /\.json$/;

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
    format: "markdown",
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

function parseDigest(source: string, fileSlug: string): BlogPost {
  const digest = JSON.parse(source) as WeeklyMarketDigest;

  if (digest.format !== "weekly-market-digest-v3") {
    throw new Error(`Digest "${fileSlug}" uses an unsupported format.`);
  }
  if (!Array.isArray(digest.events) || digest.events.length < 6 || digest.events.length > 10) {
    throw new Error(`Digest "${fileSlug}" must contain 6-10 events.`);
  }
  if (digest.slug !== fileSlug) {
    throw new Error(`Digest filename must match its slug: "${digest.slug}".`);
  }

  const searchableText = digest.events
    .flatMap((event) => [
      event.headline,
      event.description,
      ...Object.values(event.analysis),
      ...Object.values(event.opportunity),
    ])
    .join(" ");
  const minutes = Math.max(1, Math.ceil(searchableText.split(/\s+/).filter(Boolean).length / 220));

  return {
    slug: digest.slug,
    title: digest.title,
    description: digest.seoDescription,
    date: digest.date,
    category: digest.category,
    author: digest.author,
    tags: digest.tags,
    featured: digest.featured,
    coverImage: digest.events.find((event) => event.source.imageUrl)?.source.imageUrl,
    format: digest.format,
    content: searchableText,
    readingTime: `${minutes} min read`,
    digest,
  };
}

export function getAllBlogPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => postFilePattern.test(fileName) || digestFilePattern.test(fileName))
    .map((fileName) => {
      const slug = fileName.replace(postFilePattern, "").replace(digestFilePattern, "");
      const source = fs.readFileSync(path.join(blogDirectory, fileName), "utf8");

      return digestFilePattern.test(fileName)
        ? parseDigest(source, slug)
        : parseFrontmatter(source, slug);
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const posts = getAllBlogPosts();
  const currentPost = posts.find((post) => post.slug === slug);

  if (!currentPost) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const categoryScore = post.category === currentPost.category ? 2 : 0;

      return {
        post,
        score: sharedTags * 3 + categoryScore,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return Date.parse(b.post.date) - Date.parse(a.post.date);
    })
    .slice(0, limit)
    .map(({ post }) => post);
}

export function getFeaturedBlogPosts() {
  const posts = getAllBlogPosts();
  const featured = posts.filter((post) => post.featured);

  return featured.length > 0 ? featured : posts.slice(0, 2);
}

export function getBlogCategories() {
  return Array.from(new Set(getAllBlogPosts().map((post) => post.category)));
}
