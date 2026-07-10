import type { BlogPost } from "@/features/blog/types";
import { BlogPostCard } from "./BlogPostCard";

type BlogArchiveListProps = {
  emptyMessage: string;
  posts: BlogPost[];
};

export function BlogArchiveList({ emptyMessage, posts }: BlogArchiveListProps) {
  if (posts.length === 0) {
    return (
      <div className="border border-neutral-200 bg-white p-6 text-sm leading-6 text-neutral-650">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
