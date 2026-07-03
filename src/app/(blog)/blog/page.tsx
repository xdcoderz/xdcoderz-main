import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/config/features";
import { BlogPostCard } from "@/features/blog/components/BlogPostCard";
import {
  getAllBlogPosts,
  getBlogCategories,
  getFeaturedBlogPosts,
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

  return (
    <>
      <section className="surface-grid border-b border-neutral-800 bg-neutral-950 px-6 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
            XDCoderz journal
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            The thinking behind software that earns its keep.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            Sharp notes on products, automation, web growth, and the systems
            that help ambitious operators move with less drag.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Featured thinking
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                Start where the leverage is highest.
              </h2>
            </div>
            <ButtonLink href={routes.products} variant="ghost" className="self-start md:self-auto">
              See products
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="grid gap-6">
            {featuredPosts.map((post, index) => (
              <BlogPostCard key={post.slug} post={post} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Browse the archive
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Practical ideas, grouped by business outcome.
            </h2>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-sm font-semibold text-neutral-700"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SubscriberCta />
        </div>
      </section>
    </>
  );
}
