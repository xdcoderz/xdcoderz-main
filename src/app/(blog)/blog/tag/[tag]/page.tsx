import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features } from "@/config/features";
import { BlogArchiveList } from "@/features/blog/components/BlogArchiveList";
import {
  getBlogPostsByTagSlug,
  getBlogTagBySlug,
  getBlogTags,
  slugifyBlogTaxonomy,
} from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

type BlogTagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export function generateStaticParams() {
  return getBlogTags().map((tag) => ({
    tag: slugifyBlogTaxonomy(tag),
  }));
}

export async function generateMetadata({ params }: BlogTagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getBlogTagBySlug(tagSlug);
  const title = tag ? `#${tag} Articles` : "Blog Tag";

  return {
    title,
    description: tag ? `XDCoderz posts tagged ${tag}.` : "XDCoderz blog tag archive.",
    alternates: {
      canonical: `${site.url}${routes.blogTag(tagSlug)}`,
    },
  };
}

export default async function BlogTagPage({ params }: BlogTagPageProps) {
  if (!features.blog) {
    notFound();
  }

  const { tag: tagSlug } = await params;
  const tag = getBlogTagBySlug(tagSlug);

  if (!tag) {
    notFound();
  }

  const posts = getBlogPostsByTagSlug(tagSlug);

  return (
    <main className="px-6 py-14 sm:py-18">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Tag</p>
        <h1 className="mt-3 text-4xl font-semibold text-neutral-950 sm:text-5xl">#{tag}</h1>
        <p className="mt-5 max-w-2xl leading-8 text-neutral-650">
          A compact archive for this topic.
        </p>
        <div className="mt-10">
          <BlogArchiveList posts={posts} emptyMessage="No posts are published with this tag yet." />
        </div>
      </div>
    </main>
  );
}
