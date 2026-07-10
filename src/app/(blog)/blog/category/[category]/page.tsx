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
    <main className="px-6 py-14 sm:py-18">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-sky-700">Category</p>
        <h1 className="mt-3 text-4xl font-semibold text-neutral-950 sm:text-5xl">{category}</h1>
        <p className="mt-5 max-w-2xl leading-8 text-neutral-650">
          A focused archive of XDCoderz posts in this category.
        </p>
        <div className="mt-10">
          <BlogArchiveList posts={posts} emptyMessage="No posts are published in this category yet." />
        </div>
      </div>
    </main>
  );
}
