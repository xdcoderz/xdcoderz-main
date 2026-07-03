"use client";

import { useMemo, useState } from "react";
import { ArrowRight, PackageOpen } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { productCategories } from "@/data/products/categories";
import type { Product } from "@/data/products/types";
import { routes } from "@/lib/routes";

type Filter = "All products" | Product["platformGroup"];

export function ProductExplorer({
  products,
  showCatalogLink = false,
}: {
  products: Product[];
  showCatalogLink?: boolean;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All products");
  const filters: Filter[] = ["All products", ...productCategories];
  const visibleProducts = useMemo(
    () =>
      activeFilter === "All products"
        ? products
        : products.filter((product) => product.platformGroup === activeFilter),
    [activeFilter, products],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" aria-label="Filter products by category">
        {filters.map((filter) => {
          const count =
            filter === "All products"
              ? products.length
              : products.filter((product) => product.platformGroup === filter).length;
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`inline-flex min-h-9 items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                isActive
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-white text-neutral-650 hover:border-neutral-400 hover:text-neutral-950"
              }`}
            >
              {filter}
              <span className={isActive ? "text-teal-300" : "text-neutral-400"}>{count}</span>
            </button>
          );
        })}
      </div>

      {visibleProducts.length > 0 ? (
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-7 flex min-h-52 flex-col items-start justify-center rounded-lg border border-dashed border-neutral-300 bg-white p-7">
          <PackageOpen className="text-teal-700" size={24} aria-hidden="true" />
          <h3 className="mt-4 text-lg font-semibold text-neutral-950">
            The next release is being shaped.
          </h3>
          <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-650">
            No public product is available in this category yet. XDCoderz only lists software when it is ready to earn a place in your workflow.
          </p>
        </div>
      )}

      {showCatalogLink && (
        <div className="mt-7">
          <ButtonLink href={routes.products} variant="secondary">
            Open the full product catalog
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      )}
    </div>
  );
}
