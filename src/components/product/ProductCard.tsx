import { ArrowUpRight, Check, LayoutGrid } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Product } from "@/data/products/types";
import { routes } from "@/lib/routes";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
};

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:border-teal-300 hover:shadow-lg ${
        featured ? "border-neutral-300 lg:grid lg:grid-cols-[1.15fr_0.85fr]" : "border-neutral-200"
      }`}
    >
      <div className={featured ? "p-7 sm:p-9" : "p-6"}>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-md bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800"
          >
            <LayoutGrid size={13} aria-hidden="true" />
            {product.platformGroup}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {product.status}
          </span>
        </div>
        <h3 className={`${featured ? "mt-6 text-3xl sm:text-4xl" : "mt-5 text-2xl"} font-semibold text-neutral-950`}>
          {product.name}
        </h3>
        <p className={`${featured ? "mt-3 text-xl" : "mt-2 text-lg"} font-medium text-teal-800`}>
          {product.tagline}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-650">
          {product.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
            >
              {platform}
            </span>
          ))}
        </div>
        <div className="mt-7">
          <ButtonLink href={routes.product(product.slug)}>
            Explore {product.name}
            <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      {featured && (
        <div className="product-visual relative flex min-h-72 flex-col justify-between border-t border-neutral-800 bg-neutral-950 p-7 text-white lg:border-l lg:border-t-0 sm:p-9">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
              The payoff
            </p>
            <p className="mt-4 max-w-md text-2xl font-semibold leading-9">
              A cleaner route from raw input to usable output.
            </p>
          </div>
          <div className="mt-10 grid gap-3">
            {product.highlights.slice(0, 3).map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 border-b border-white/10 pb-3 text-sm text-neutral-200"
              >
                <Check className="mt-0.5 shrink-0 text-teal-300" size={16} aria-hidden="true" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
