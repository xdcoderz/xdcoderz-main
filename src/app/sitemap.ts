import type { MetadataRoute } from "next";
import { features } from "@/config/features";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { getAllBlogPosts } from "@/features/blog/blog-utils";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    routes.home,
    routes.products,
    routes.services,
    routes.work,
    routes.roadmap,
    routes.contact,
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
  const blogRoutes = features.blog ? getAllBlogPosts() : [];

  const standardRoutes = [...staticRoutes, ...productRoutes, ...serviceRoutes].map((route) => ({
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
