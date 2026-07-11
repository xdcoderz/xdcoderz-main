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
    <section aria-label="Search blog posts" className="journal-search">
      <div className="journal-search__field">
        <Search size={18} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Search posts, tags, and topics"
          aria-label="Search posts, tags, and topics"
        />
      </div>

      <p className="journal-search__count" aria-live="polite">
        {results.length} {results.length === 1 ? "post" : "posts"} found
      </p>

      <div className="journal-search__results">
        {results.map((post) => (
          <article key={post.slug} className="journal-search-result">
            <div className="story-card__meta">
              <span>{post.category}</span>
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat("en", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(new Date(post.date))}
              </time>
              <span>{post.readingTime}</span>
            </div>
            <h2>
              <Link href={routes.blogPost(post.slug)}>{post.title}</Link>
            </h2>
            <p>{post.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
