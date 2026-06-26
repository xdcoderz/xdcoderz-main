import {
  ArrowRight,
  Boxes,
  Code2,
  Globe2,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ServiceCard } from "@/components/service/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "Tools",
    icon: Boxes,
    text: "Focused utilities that solve specific everyday computer problems without heavy setup.",
  },
  {
    title: "SaaS Products",
    icon: Sparkles,
    text: "Future web-based products built around clean workflows, automation, and practical user needs.",
  },
  {
    title: "Services",
    icon: Code2,
    text: "Website development, custom software, and automation support for people who need things built well.",
  },
];

export default function Home() {
  const featuredProduct = products[0];

  return (
    <>
      <section className="border-b border-neutral-200 bg-[linear-gradient(135deg,#f7faf9_0%,#ffffff_48%,#eef8f6_100%)] px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md border border-teal-200 bg-white px-3 py-1 text-sm font-semibold text-teal-800">
              Builder-led software company
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-650">
              XDCoderz builds simple tools, future SaaS products, and custom
              software services for people who want useful digital work without
              unnecessary complexity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#products">
                Explore products
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                Start a project
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-md bg-teal-700 text-white">
                <Globe2 size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-500">
                  First product
                </p>
                <h2 className="text-2xl font-semibold text-neutral-950">
                  {featuredProduct.name}
                </h2>
              </div>
            </div>
            <p className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950">
              {featuredProduct.tagline}
            </p>
            <p className="mt-4 leading-7 text-neutral-650">
              {featuredProduct.summary}
            </p>
            <div className="mt-6 grid gap-3">
              {featuredProduct.highlights.slice(0, 3).map((item) => (
                <div key={item} className="flex gap-3 text-sm text-neutral-700">
                  <ShieldCheck className="mt-0.5 shrink-0 text-teal-700" size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <ButtonLink href={routes.product(featuredProduct.slug)} variant="secondary">
                View GridForge
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="What XDCoderz does"
        title="One brand for practical products and build services."
        description="The website is structured so XDCoderz can grow from one released utility into a wider ecosystem of tools, SaaS products, and client services."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <span className="grid size-10 place-items-center rounded-md bg-neutral-950 text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-650">
                  {pillar.text}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="products"
        className="bg-neutral-50"
        eyebrow="Featured product"
        title="GridForge is the first product in the XDCoderz lineup."
      >
        <div className="grid gap-6">
          <ProductCard product={featuredProduct} />
          <div>
            <ButtonLink href={routes.products} variant="secondary">
              Show all products
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        id="services"
        eyebrow="Services"
        title="For people who need software built, not just downloaded."
      >
        <div className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div>
            <ButtonLink href={routes.services} variant="secondary">
              Show all services
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        id="contact"
        className="bg-neutral-950 text-white"
        tone="dark"
        eyebrow="Contact"
        title="Have a product idea, website, or workflow to build?"
        description="Start with a short message. XDCoderz can help with product support, website development, custom software, and automation."
      >
        <div className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-white text-neutral-950">
                <Mail size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Contact XDCoderz
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-300">
                  Use the full contact page for support, service inquiries, and
                  project requests.
                </p>
              </div>
            </div>
            <ButtonLink
              href={routes.contact}
              variant="secondary"
              className="border-white bg-white text-neutral-950 hover:bg-neutral-100"
            >
              Open contact page
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
