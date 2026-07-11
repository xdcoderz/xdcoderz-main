import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { slugifyBlogTaxonomy } from "@/features/blog/blog-utils";
import type { BlogPost } from "@/features/blog/types";
import { routes } from "@/lib/routes";
import { BlogCoverImage } from "./BlogCoverImage";

type BlogPostCardProps = {
  post: BlogPost;
  variant?: "lead" | "secondary" | "row";
};

export function BlogPostCard({ post, variant = "row" }: BlogPostCardProps) {
  const postUrl = routes.blogPost(post.slug);
  const fallbackImage = `/api/og/blog/${post.slug}`;

  return (
    <article className={`story-card story-card--${variant}`}>
      <Link href={postUrl} className="story-card__image-link" tabIndex={-1} aria-hidden="true">
        <BlogCoverImage
          src={post.coverImage}
          fallbackSrc={fallbackImage}
          alt=""
          className="story-card__image"
        />
      </Link>

      <div className="story-card__content">
        <div className="story-card__meta">
          <Link
            href={routes.blogCategory(slugifyBlogTaxonomy(post.category))}
            className="story-card__category"
          >
            {post.category}
          </Link>
          <time dateTime={post.date}>
            {new Intl.DateTimeFormat("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(post.date))}
          </time>
          <span>{post.readingTime}</span>
        </div>

        <h2 className="story-card__title">
          <Link href={postUrl}>{post.title}</Link>
        </h2>
        <p className="story-card__summary">{post.description}</p>
      </div>

      <Link
        href={postUrl}
        className="story-card__read"
        aria-label={`Read ${post.title}`}
      >
        Read article
        <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
