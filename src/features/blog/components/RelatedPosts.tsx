import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/features/blog/types";
import { routes } from "@/lib/routes";

type RelatedPostsProps = {
  posts: BlogPost[];
};

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-posts" className="article-related">
      <p className="journal-section-label">Read next</p>
      <h2 id="related-posts">
        Related posts
      </h2>
      <div className="article-related__list">
        {posts.map((post) => (
          <article key={post.slug} className="article-related__item">
            <div>
              <p className="journal-section-label">{post.category}</p>
              <h3>
                <Link href={routes.blogPost(post.slug)}>{post.title}</Link>
              </h3>
            </div>
            <Link
              href={routes.blogPost(post.slug)}
              className="article-related__link"
              aria-label={`Read ${post.title}`}
            >
              Read
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
