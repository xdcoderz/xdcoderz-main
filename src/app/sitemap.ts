import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [routes.home, routes.products, routes.services, routes.contact];
  const productRoutes = products.flatMap((product) => [
    routes.product(product.slug),
    routes.productDownload(product.slug),
    routes.productGuide(product.slug),
    routes.productPrivacy(product.slug),
    routes.productReleases(product.slug),
  ]);
  const serviceRoutes = services.map((service) => routes.service(service.slug));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));
}
