import { gridforge } from "./gridforge";

export const products = [gridforge];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
