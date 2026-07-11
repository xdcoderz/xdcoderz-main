import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { features } from "@/config/features";
import { BlogArchiveList } from "@/features/blog/components/BlogArchiveList";
import {
  getBlogCategories,
  getBlogCategoryBySlug,
  getBlogPostsByCategorySlug,
  slugifyBlogTaxonomy,
} from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

type BlogCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  return getBlogCategories().map((category) => ({
    category: slugifyBlogTaxonomy(category),
  }));
}

export async function generateMetadata({ params }: BlogCategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getBlogCategoryBySlug(categorySlug);
  const title = category ? `${category} Articles` : "Blog Category";

  return {
    title,
    description: category
      ? `XDCoderz posts filed under ${category}.`
      : "XDCoderz blog category archive.",
    alternates: {
      canonical: `${site.url}${routes.blogCategory(categorySlug)}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  if (!features.blog) {
    notFound();
  }

  const { category: categorySlug } = await params;
  const category = getBlogCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const posts = getBlogPostsByCategorySlug(categorySlug);

  return (
    <section className="journal-page">
      <div className="journal-page__inner">
        <header className="journal-page-header">
          <p className="journal-section-label">Category</p>
          <h1>{category}</h1>
          <p>A focused archive of XDCoderz reporting and analysis in this category.</p>
        </header>
        <BlogArchiveList posts={posts} emptyMessage="No posts are published in this category yet." />
      </div>
    </section>
  );
}
