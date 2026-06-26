import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Product } from "@/data/products/types";
import { routes } from "@/lib/routes";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
        <span>{product.category}</span>
        <span className="size-1 rounded-full bg-neutral-300" />
        <span>{product.status}</span>
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-neutral-950">
        {product.name}
      </h3>
      <p className="mt-2 text-lg font-medium text-teal-800">{product.tagline}</p>
      <p className="mt-4 text-sm leading-6 text-neutral-650">{product.summary}</p>
      <div className="mt-6">
        <ButtonLink href={routes.product(product.slug)} variant="secondary">
          View product
          <ArrowUpRight size={16} aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
