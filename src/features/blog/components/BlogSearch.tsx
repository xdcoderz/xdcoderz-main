"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { BlogPost } from "@/features/blog/types";
import { routes } from "@/lib/routes";

type SearchPost = Pick<BlogPost, "slug" | "title" | "description" | "date" | "category" | "tags" | "readingTime">;

type BlogSearchProps = {
  posts: SearchPost[];
};

export function BlogSearch({ posts }: BlogSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) =>
      [post.title, post.description, post.category, post.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery, posts]);

  return (
    <section aria-label="Search blog posts">
      <div className="relative">
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Search posts, tags, and topics"
          className="min-h-12 w-full border border-neutral-200 bg-white pl-11 pr-4 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-sky-700"
        />
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        {results.length} {results.length === 1 ? "post" : "posts"} found
      </p>

      <div className="mt-7 grid gap-4">
        {results.map((post) => (
          <article key={post.slug} className="border border-neutral-200 bg-white p-5">
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-neutral-500">
              <span>{post.category}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat("en", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(post.date))}
              </time>
              <span aria-hidden="true">/</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-neutral-950">
              <Link href={routes.blogPost(post.slug)}>{post.title}</Link>
            </h2>
            <p className="mt-2 leading-7 text-neutral-650">{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
