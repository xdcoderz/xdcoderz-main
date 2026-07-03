import type { Metadata } from "next";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Check,
  Layers3,
  Zap,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { latestProducts, products } from "@/data/products";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Software That Pays Back Your Time",
  description:
    "Discover focused software products from XDCoderz, built to remove repetitive work and turn complicated workflows into clear results.",
};

const advantages = [
  {
    title: "Less friction",
    description: "Fewer steps between the work you have and the result you need.",
    icon: Zap,
  },
  {
    title: "Clearer outcomes",
    description: "Focused products that solve a defined problem without feature overload.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Room to scale",
    description: "Software designed to stay useful as your workload and ambition grow.",
    icon: Layers3,
  },
];

export default function Home() {
  const featuredProducts = latestProducts.slice(0, 3);

  return (
    <>
      <section className="surface-grid border-b border-neutral-800 bg-neutral-950 px-6 py-16 text-white sm:py-20 lg:py-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-md border border-teal-300/25 bg-teal-300/10 px-3 py-1.5 text-sm font-semibold text-teal-100">
              <span className="size-1.5 rounded-full bg-teal-300" />
              Independent software company
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Software that pays back your time.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
              XDCoderz turns repetitive, frustrating work into focused software
              products that move faster, feel simpler, and deliver a result you
              can use.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="#products"
                className="bg-teal-300 text-neutral-950 hover:bg-teal-200"
              >
                Explore the latest
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href={routes.services}
                variant="secondary"
                className="border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
              >
                Build something custom
              </ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-300">
              {["Focused products", "Practical outcomes", "Built for real work"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="text-teal-300" size={15} aria-hidden="true" />
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="signal-panel hidden rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur lg:block lg:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
              The XDCoderz advantage
            </p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              Higher output without heavier workflows.
            </h2>
            <p className="mt-4 leading-7 text-neutral-300">
              Good software should not demand more attention. It should quietly
              return time, clarity, and control.
            </p>
            <div className="mt-6 grid gap-2">
              {advantages.map((advantage) => {
                const Icon = advantage.icon;
                return (
                  <div
                    key={advantage.title}
                    className="flex gap-4 rounded-md border border-white/10 bg-black/20 p-3"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-teal-300 text-neutral-950">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{advantage.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-neutral-400">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="scroll-mt-20 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Latest releases
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
                Built to earn a place in your workflow.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-650">
                Every XDCoderz product starts with a costly point of friction and
                ends with a cleaner, faster way forward.
              </p>
            </div>
            <ButtonLink href={routes.products} variant="ghost" className="self-start md:self-auto">
              View all releases
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

      <section id="categories" className="scroll-mt-20 border-y border-neutral-200 bg-neutral-50 px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Product categories
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              Find the right advantage for the way you work.
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-650">
              Browse every public product by platform and purpose. New releases
              will appear here automatically as the catalog grows.
            </p>
          </div>
          <ProductExplorer products={products} showCatalogLink />
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 border-y border-neutral-200 py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Need a better fit?
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
              When off-the-shelf stops fitting, build the advantage yourself.
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-650">
              Bring XDCoderz the bottleneck. We will help turn it into a focused
              website, app, automation, or software product built around the outcome.
            </p>
          </div>
          <ButtonLink href={routes.contact} className="self-start lg:self-auto">
            Start the conversation
            <ArrowRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
