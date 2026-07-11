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
    <section className="journal-page">
      <div className="journal-page__inner journal-page__inner--narrow">
        <header className="journal-page-header">
          <p className="journal-section-label">Journal search</p>
          <h1>Find the useful part faster.</h1>
          <p>Search every headline, description, category, and topic in the XDCoderz Journal.</p>
        </header>
        <BlogSearch posts={posts} />
      </div>
    </section>
  );
}
