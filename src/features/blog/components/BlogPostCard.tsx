import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/features/blog/types";
import { routes } from "@/lib/routes";

type BlogPostCardProps = {
  post: BlogPost;
  featured?: boolean;
};

export function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  return (
    <article
      className={`group rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-700/40 hover:shadow-md ${
        featured ? "md:grid md:grid-cols-[1fr_auto] md:gap-8" : ""
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
          <span className="rounded-md bg-teal-50 px-3 py-1 font-semibold text-teal-800">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} aria-hidden="true" />
            {new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(post.date))}
          </span>
          <span>{post.readingTime}</span>
        </div>
        <h2
          className={`mt-5 font-semibold tracking-tight text-neutral-950 ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          <Link href={routes.blogPost(post.slug)}>{post.title}</Link>
        </h2>
        <p className="mt-4 leading-7 text-neutral-650">{post.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-neutral-200 px-2.5 py-1 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={routes.blogPost(post.slug)}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 group-hover:text-teal-950 md:self-end"
      >
        Read article
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
