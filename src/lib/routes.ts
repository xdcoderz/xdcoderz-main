export const routes = {
  home: "/",
  products: "/products",
  services: "/services",
  contact: "/contact",
  product: (slug: string) => `/products/${slug}`,
  productDownload: (slug: string) => `/products/${slug}/download`,
  productGuide: (slug: string) => `/products/${slug}/guide`,
  productPrivacy: (slug: string) => `/products/${slug}/privacy`,
  productReleases: (slug: string) => `/products/${slug}/releases`,
  service: (slug: string) => `/services/${slug}`,
};
