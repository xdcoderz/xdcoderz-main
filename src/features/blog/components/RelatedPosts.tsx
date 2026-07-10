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
    <section aria-labelledby="related-posts" className="mt-14 border-t border-neutral-200 pt-12">
      <p className="text-xs font-semibold uppercase text-neutral-500">Read next</p>
      <h2 id="related-posts" className="mt-3 text-2xl font-semibold text-neutral-950 sm:text-3xl">
        Related posts
      </h2>
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="border border-neutral-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase text-neutral-500">{post.category}</p>
            <h3 className="mt-3 text-lg font-semibold leading-7 text-neutral-950">
              <Link href={routes.blogPost(post.slug)}>{post.title}</Link>
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-650">{post.description}</p>
            <Link
              href={routes.blogPost(post.slug)}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-800 hover:text-sky-950"
            >
              Read next
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
