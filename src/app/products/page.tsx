import type { Metadata } from "next";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore XDCoderz software products for desktop, Android, web, SaaS, automation, and more.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
            Product catalog
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
            Useful software. Visible payoff.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650 dark:text-neutral-300">
            Browse focused products built to remove friction, sharpen workflows,
            and help you reach the useful result sooner.
          </p>
        </div>
      </section>

      <section id="catalog" className="scroll-mt-20 bg-neutral-50 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
              Browse by category
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Choose the software that moves your work forward.
            </h2>
          </div>
          <ProductExplorer products={products} />
        </div>
      </section>
    </>
  );
}
