import type { Metadata } from "next";
import { ArrowRight, BarChart3, Boxes, CircuitBoard, Workflow } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { latestProducts, products } from "@/data/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Software Systems for Measurable Growth",
  description:
    "XDCoderz builds focused products, automation systems, and digital platforms that turn operational friction into measurable business leverage.",
};

const operatingEdges = [
  {
    title: "Sharper execution",
    description:
      "Replace slow manual paths with systems that make work repeatable, visible, and easier to scale.",
    icon: Workflow,
  },
  {
    title: "Product-led leverage",
    description:
      "Build assets that keep creating value after the first engagement, not one-off digital expenses.",
    icon: Boxes,
  },
  {
    title: "Measured growth",
    description:
      "Prioritize software decisions around throughput, customer experience, and commercial impact.",
    icon: BarChart3,
  },
];

const capabilityChips = [
  "Desktop applications",
  "Android applications",
  "Web applications",
  "SaaS products",
  "Automation systems",
  "Business websites",
  "AI workflows",
  "Internal tools",
];

export default function Home() {
  const featuredProducts = latestProducts.slice(0, 3);

  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.03] dark:text-sky-300">
              Strategic software partner
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-neutral-950 sm:text-6xl lg:text-7xl dark:text-white">
              Build the systems your growth depends on.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-650 sm:text-xl dark:text-neutral-300">
              XDCoderz designs products, automation, and digital platforms that
              reduce operational drag, sharpen execution, and convert technology
              spend into durable business leverage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#products">
                Explore products
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={routes.contact} variant="secondary">
                Discuss a system
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/75 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-white/10">
              <div>
                <p className="text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
                  Operating model
                </p>
                <h2 className="mt-1 text-xl font-semibold text-neutral-950 dark:text-white">
                  From friction to advantage
                </h2>
              </div>
              <span className="grid size-10 place-items-center rounded-md bg-neutral-950 text-white dark:bg-sky-300 dark:text-neutral-950">
                <CircuitBoard size={18} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {operatingEdges.map((edge) => {
                const Icon = edge.icon;
                return (
                  <div
                    key={edge.title}
                    className="rounded-md border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-neutral-950 dark:text-white">
                          {edge.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                          {edge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-20 bg-white px-6 py-16 sm:py-24 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-sky-700 dark:text-sky-300">
                Latest products
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-5xl dark:text-white">
                Focused releases built around real business pressure.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-650 dark:text-neutral-300">
                Each product starts with a costly bottleneck and ends with a
                cleaner workflow your team can use immediately.
              </p>
            </div>
            <ButtonLink href={routes.products} variant="ghost" className="self-start md:self-auto">
              View all products
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="grid gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 border-y border-neutral-200 bg-neutral-50 px-6 py-16 sm:py-24 dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-semibold uppercase text-sky-700 dark:text-sky-300">
              Capability map
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl dark:text-white">
              Build across the surfaces where your business creates value.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-650 dark:text-neutral-300">
              Products, platforms, and services are organized by the outcomes
              they create, so the catalog can scale without becoming messy.
            </p>
          </div>
          <div className="mb-8 flex flex-wrap gap-2">
            {capabilityChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300"
              >
                {chip}
              </span>
            ))}
          </div>
          <ProductExplorer products={products} showCatalogLink />
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-6xl gap-8 border-y border-neutral-200 py-12 lg:grid-cols-[1fr_auto] lg:items-center dark:border-white/10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-sky-700 dark:text-sky-300">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-neutral-950 sm:text-4xl dark:text-white">
              When a standard product is not enough, build the operating edge.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-650 dark:text-neutral-300">
              Bring the constraint. XDCoderz will translate it into a focused
              website, app, automation, or software system designed around the
              return it needs to create.
            </p>
          </div>
          <ButtonLink href={routes.services} className="self-start lg:self-auto">
            Explore services
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
