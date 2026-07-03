import { gridforge } from "./gridforge";

export const products = [gridforge];

export const latestProducts = [...products].sort(
  (a, b) => Date.parse(b.releasedAt) - Date.parse(a.releasedAt),
);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
