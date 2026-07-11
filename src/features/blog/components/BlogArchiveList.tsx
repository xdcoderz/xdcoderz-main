import type { BlogPost } from "@/features/blog/types";
import { BlogPostCard } from "./BlogPostCard";

type BlogArchiveListProps = {
  emptyMessage: string;
  posts: BlogPost[];
};

export function BlogArchiveList({ emptyMessage, posts }: BlogArchiveListProps) {
  if (posts.length === 0) {
    return <div className="journal-empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="journal-archive-list">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} variant="row" />
      ))}
    </div>
  );
}
