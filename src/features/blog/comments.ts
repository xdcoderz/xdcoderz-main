import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { insertSupabaseRow, selectSupabaseRows } from "@/lib/supabase/server";

export type BlogComment = {
  id: string;
  slug: string;
  name: string;
  body: string;
  createdAt: string;
};

export type BlogCommentInput = {
  slug: string;
  name: string;
  body: string;
  ip?: string;
  userAgent?: string;
};

type SupabaseBlogCommentRow = {
  id: string;
  slug: string;
  name: string | null;
  body: string;
  created_at: string;
};

const localCommentsFile = path.join(
  process.cwd(),
  "data",
  "blog-comments.jsonl",
);

export async function getBlogComments(slug: string): Promise<BlogComment[]> {
  try {
    const result = await selectSupabaseRows<SupabaseBlogCommentRow>(
      "blog_comments",
      {
        select: "id,slug,name,body,created_at",
        slug: `eq.${slug}`,
        status: "eq.published",
        order: "created_at.asc",
        limit: "100",
      },
    );

    if (!result.skipped) {
      return result.data.map(mapSupabaseComment);
    }
  } catch (error) {
    console.error("Blog comments Supabase read failed", error);
  }

  return getLocalBlogComments(slug);
}

export async function saveBlogComment(
  input: BlogCommentInput,
): Promise<BlogComment> {
  const createdAt = new Date().toISOString();
  const comment: BlogComment = {
    id: crypto.randomUUID(),
    slug: input.slug,
    name: input.name || "Anonymous builder",
    body: input.body,
    createdAt,
  };

  try {
    const result = await insertSupabaseRow("blog_comments", {
      id: comment.id,
      slug: comment.slug,
      name: comment.name,
      body: comment.body,
      status: "published",
      metadata: {
        ip: input.ip ?? null,
        userAgent: input.userAgent ?? null,
      },
      created_at: createdAt,
    });

    if (!result.skipped) {
      return comment;
    }
  } catch (error) {
    console.error("Blog comments Supabase write failed", error);
  }

  await saveLocalBlogComment({
    ...comment,
    ip: input.ip ?? null,
    userAgent: input.userAgent ?? null,
  });

  return comment;
}

function mapSupabaseComment(row: SupabaseBlogCommentRow): BlogComment {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name || "Anonymous builder",
    body: row.body,
    createdAt: row.created_at,
  };
}

async function getLocalBlogComments(slug: string): Promise<BlogComment[]> {
  let source = "";

  try {
    source = await readFile(localCommentsFile, "utf8");
  } catch {
    return [];
  }

  return source
    .split("\n")
    .filter(Boolean)
    .map((line) => parseLocalComment(line))
    .filter((comment): comment is BlogComment => Boolean(comment))
    .filter((comment) => comment.slug === slug)
    .slice(-100);
}

async function saveLocalBlogComment(
  comment: BlogComment & { ip: string | null; userAgent: string | null },
) {
  await mkdir(path.dirname(localCommentsFile), { recursive: true });
  await appendFile(localCommentsFile, `${JSON.stringify(comment)}\n`, "utf8");
}

function parseLocalComment(line: string): BlogComment | null {
  try {
    const value = JSON.parse(line) as Partial<BlogComment>;

    if (
      typeof value.id !== "string" ||
      typeof value.slug !== "string" ||
      typeof value.name !== "string" ||
      typeof value.body !== "string" ||
      typeof value.createdAt !== "string"
    ) {
      return null;
    }

    return {
      id: value.id,
      slug: value.slug,
      name: value.name,
      body: value.body,
      createdAt: value.createdAt,
    };
  } catch {
    return null;
  }
}
