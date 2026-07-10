import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features } from "@/config/features";
import { BlogSearch } from "@/features/blog/components/BlogSearch";
import { getAllBlogPosts } from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Search Blog",
  description: "Search XDCoderz posts by topic, tag, category, and title.",
  alternates: {
    canonical: `${site.url}${routes.blogSearch}`,
  },
};

export default function BlogSearchPage() {
  if (!features.blog) {
    notFound();
  }

  const posts = getAllBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: post.tags,
    readingTime: post.readingTime,
  }));

  return (
    <main className="px-6 py-14 sm:py-18">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Blog search</p>
        <h1 className="mt-3 text-4xl font-semibold text-neutral-950 sm:text-5xl">
          Find the useful part faster.
        </h1>
        <p className="mt-5 leading-8 text-neutral-650">
          Search titles, descriptions, categories, and tags without leaving the blog archive.
        </p>
        <div className="mt-8">
          <BlogSearch posts={posts} />
        </div>
      </div>
    </main>
  );
}
