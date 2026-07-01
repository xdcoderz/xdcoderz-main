import type { Metadata } from "next";
import { ProductCard } from "@/components/product/ProductCard";
import { Section } from "@/components/ui/Section";
import { products } from "@/data/products";
import { productCategories } from "@/data/products/categories";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore XDCoderz desktop apps, Android apps, web apps, SaaS products, utilities, automation tools, and experiments.",
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
            Products across desktop, Android, web, SaaS, and beyond.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650">
            The product catalog starts with GridForge and is structured to grow
            cleanly as new XDCoderz apps, tools, SaaS products, and experiments
            launch.
          </p>
        </div>
      </section>
      <Section
        title="Product categories"
        description="These categories are intentionally broad so future software lines can be added without changing the page model."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <div
              key={category}
              className="rounded-lg border border-neutral-200 bg-white p-4 text-sm font-semibold text-neutral-800 shadow-sm"
            >
              {category}
            </div>
          ))}
        </div>
      </Section>
      <Section className="bg-neutral-50" title="Available products">
        <div className="grid gap-5 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}
