import Link from "next/link";
import { features } from "@/config/features";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-12 text-neutral-950 dark:border-white/10 dark:bg-neutral-950 dark:text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 font-bold">
            <span className="grid size-8 place-items-center rounded-md bg-neutral-950 font-mono text-sm text-white transition hover:-translate-y-0.5 hover:bg-sky-700 dark:bg-white dark:text-neutral-950 dark:hover:bg-sky-300">
              XD
            </span>
            XDCoderz
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-650 dark:text-neutral-300">
            {site.tagline}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Company</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-650 dark:text-neutral-300">
            <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.products}>Products</Link>
            <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.services}>Services</Link>
            <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.work}>Work</Link>
            {features.blog && <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.blog}>Blog</Link>}
            <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.roadmap}>Roadmap</Link>
            <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.contact}>Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Products</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-650 dark:text-neutral-300">
            {products.map((product) => (
              <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" key={product.slug} href={routes.product(product.slug)}>
                {product.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Services</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-650 dark:text-neutral-300">
            {services.slice(0, 6).map((service) => (
              <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" key={service.slug} href={routes.service(service.slug)}>
                {service.name}
              </Link>
            ))}
            <Link className="transition hover:translate-x-1 hover:text-sky-700 dark:hover:text-sky-200" href={routes.services}>All services</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-neutral-200 pt-6 text-sm text-neutral-500 dark:border-white/10 dark:text-neutral-400">
        &copy; {new Date().getFullYear()} XDCoderz. All rights reserved.
      </div>
    </footer>
  );
}
