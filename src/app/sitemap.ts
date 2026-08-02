import type { MetadataRoute } from "next";
import { features } from "@/config/features";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { getAllBlogPosts, getBlogCategories, getBlogTags, slugifyBlogTaxonomy } from "@/features/blog/blog-utils";
import { tools } from "@/features/tools";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    routes.home,
    routes.products,
    routes.lab,
    routes.tools,
    routes.services,
    routes.work,
    routes.roadmap,
    routes.contact,
    routes.about,
    routes.privacy,
    routes.terms,
    ...(features.blog ? [routes.blog] : []),
  ];
  const productRoutes = products.flatMap((product) => {
    if (product.slug !== "gridforge") {
      return [routes.product(product.slug)];
    }

    return [
      routes.product(product.slug),
      routes.productDownload(product.slug),
      routes.productGuide(product.slug),
      routes.productPrivacy(product.slug),
      routes.productReleases(product.slug),
    ];
  });
  const serviceRoutes = services.map((service) => routes.service(service.slug));
  const toolRoutes = tools.map((tool) => routes.tool(tool.slug));
  const blogRoutes = features.blog ? getAllBlogPosts() : [];
  const blogArchiveRoutes = features.blog
    ? [
        routes.blogSearch,
        ...getBlogCategories().map((category) => routes.blogCategory(slugifyBlogTaxonomy(category))),
        ...getBlogTags().map((tag) => routes.blogTag(slugifyBlogTaxonomy(tag))),
      ]
    : [];

  const standardRoutes = [...staticRoutes, ...productRoutes, ...serviceRoutes, ...toolRoutes, ...blogArchiveRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === routes.home ? 1 : 0.7,
  }));

  const blogSitemapRoutes = blogRoutes.map((post) => ({
    url: `${site.url}${routes.blogPost(post.slug)}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: post.featured ? 0.8 : 0.6,
  }));

  return [...standardRoutes, ...blogSitemapRoutes];
}
