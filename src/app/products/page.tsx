import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { Section } from "@/components/ui/Section";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore XDCoderz tools and SaaS products, starting with GridForge for converting table images into spreadsheet files.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Products
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Tools and SaaS products from XDCoderz.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            The product catalog starts with GridForge and is structured to grow
            cleanly as new XDCoderz utilities and SaaS products launch.
          </p>
        </div>
      </section>
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}
