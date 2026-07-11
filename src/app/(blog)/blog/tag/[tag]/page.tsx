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
    <section className="journal-page">
      <div className="journal-page__inner">
        <header className="journal-page-header">
          <p className="journal-section-label">Topic</p>
          <h1>#{tag}</h1>
          <p>Every XDCoderz Journal story connected to this topic.</p>
        </header>
        <BlogArchiveList posts={posts} emptyMessage="No posts are published with this tag yet." />
      </div>
    </section>
  );
}
