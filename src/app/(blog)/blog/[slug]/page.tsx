import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/config/features";
import { getAllBlogPosts, getBlogPost } from "@/features/blog/blog-utils";
import { MarkdownRenderer } from "@/features/blog/components/MarkdownRenderer";
import { SubscriberCta } from "@/features/subscribers/components/SubscriberCta";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  if (!features.blog) {
    return [];
  }

  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || !features.blog) {
    return {
      title: "Blog",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `${site.url}${routes.blogPost(post.slug)}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  if (!features.blog) {
    notFound();
  }

  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <header className="border-b border-neutral-200 bg-neutral-50 px-6 py-14 sm:py-18">
        <div className="mx-auto max-w-3xl">
          <ButtonLink href={routes.blog} variant="ghost" className="-ml-5 mb-8">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to blog
          </ButtonLink>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            {post.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-650">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-neutral-600">
            <span>{post.author}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(new Date(post.date))}
            </time>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </header>

      <div className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <MarkdownRenderer content={post.content} />

          <div className="mt-14 rounded-lg border border-neutral-200 bg-neutral-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Build the advantage
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-950">
              Have a workflow that should not still be manual?
            </h2>
            <p className="mt-3 leading-7 text-neutral-650">
              XDCoderz can turn that bottleneck into a focused product, app, or
              automation that gives time back to the business.
            </p>
            <ButtonLink href={routes.contact} className="mt-5">
              Start a conversation
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </div>

      <section className="border-t border-neutral-200 bg-white px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <SubscriberCta />
        </div>
      </section>
    </article>
  );
}
