import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { features } from "@/config/features";
import { BlogPostCard } from "@/features/blog/components/BlogPostCard";
import {
  getAllBlogPosts,
  getBlogCategories,
  getFeaturedBlogPosts,
  getBlogTags,
  slugifyBlogTaxonomy,
} from "@/features/blog/blog-utils";
import { SubscriberCta } from "@/features/subscribers/components/SubscriberCta";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical XDCoderz notes on software products, automation, web growth, and systems that give businesses leverage.",
  alternates: {
    canonical: `${site.url}${routes.blog}`,
  },
  openGraph: {
    title: "Blog",
    description:
      "Practical XDCoderz notes on software products, automation, web growth, and systems that give businesses leverage.",
    url: `${site.url}${routes.blog}`,
    type: "website",
  },
};

export default function BlogPage() {
  if (!features.blog) {
    notFound();
  }

  const posts = getAllBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();
  const categories = getBlogCategories();
  const tags = getBlogTags().slice(0, 12);
  const leadPost = featuredPosts[0] ?? posts[0];
  const supportingPosts = posts.filter((post) => post.slug !== leadPost?.slug).slice(0, 2);
  const archivePosts = posts.filter((post) => post.slug !== leadPost?.slug);

  return (
    <>
      <section className="journal-front">
        <div className="journal-container">
          <div className="journal-front__intro">
            <div>
              <p className="journal-eyebrow">Current issue</p>
              <h1>Technology shifts, business consequences, and what builders can do next.</h1>
            </div>
            <p>
              Clear reporting and practical analysis for founders, operators, and developers who would
              rather build through the weekend than wait for the market to explain itself.
            </p>
          </div>

          {leadPost ? (
            <div className="journal-cover-grid">
              <BlogPostCard post={leadPost} variant="lead" />
              {supportingPosts.length > 0 ? (
                <div className="journal-cover-stack">
                  {supportingPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} variant="secondary" />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="journal-archive">
        <div className="journal-container">
          <div className="journal-section-heading">
            <div>
              <p className="journal-section-label">The archive</p>
              <h2>All stories</h2>
            </div>
            <Link href={routes.blogSearch} className="journal-search-link">
              <Search size={15} aria-hidden="true" />
              Search the journal
            </Link>
          </div>

          <nav aria-label="Browse by category" className="journal-taxonomy">
            {categories.map((category) => (
              <Link
                key={category}
                href={routes.blogCategory(slugifyBlogTaxonomy(category))}
              >
                {category}
              </Link>
            ))}
          </nav>

          {tags.length > 0 ? (
            <nav aria-label="Browse by topic" className="journal-taxonomy">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={routes.blogTag(slugifyBlogTaxonomy(tag))}
                >
                  #{tag}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="journal-story-list">
            {archivePosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} variant="row" />
            ))}
          </div>
        </div>
      </section>

      <section className="journal-subscribe">
        <div>
          <SubscriberCta />
        </div>
      </section>
    </>
  );
}
