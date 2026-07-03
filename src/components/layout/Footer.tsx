import Link from "next/link";
import { features } from "@/config/features";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-950 px-6 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 font-bold">
            <span className="grid size-8 place-items-center rounded-md bg-white text-sm text-neutral-950">
              XD
            </span>
            XDCoderz
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-300">
            {site.tagline}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Company</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-300">
            <Link href={routes.products}>Products</Link>
            <Link href={routes.services}>Services</Link>
            <Link href={routes.work}>Work</Link>
            {features.blog && <Link href={routes.blog}>Blog</Link>}
            <Link href={routes.roadmap}>Roadmap</Link>
            <Link href={routes.contact}>Contact</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Products</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-300">
            {products.map((product) => (
              <Link key={product.slug} href={routes.product(product.slug)}>
                {product.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Services</h2>
          <div className="mt-4 grid gap-3 text-sm text-neutral-300">
            {services.slice(0, 6).map((service) => (
              <Link key={service.slug} href={routes.service(service.slug)}>
                {service.name}
              </Link>
            ))}
            <Link href={routes.services}>All services</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm text-neutral-400">
        &copy; {new Date().getFullYear()} XDCoderz. All rights reserved.
      </div>
    </footer>
  );
}
