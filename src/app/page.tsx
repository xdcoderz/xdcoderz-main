import {
  ArrowRight,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { RoadmapList } from "@/components/roadmap/RoadmapList";
import { ServiceCard } from "@/components/service/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Section } from "@/components/ui/Section";
import { WorkCard } from "@/components/work/WorkCard";
import { platformCapabilities } from "@/data/platforms";
import { products } from "@/data/products";
import { productCategories } from "@/data/products/categories";
import { roadmapItems } from "@/data/roadmap";
import { services } from "@/data/services";
import { workItems } from "@/data/work";
import { routes } from "@/lib/routes";

const heroLanes = [
  "Desktop, Android, web, SaaS, automation, and beyond",
  "Public products and custom software services under one brand",
  "Built for practical workflows, clean interfaces, and real launches",
];

export default function Home() {
  const featuredProduct = products[0];

  return (
    <>
      <section className="surface-grid border-b border-neutral-800 bg-neutral-950 px-6 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
              Cross-platform software company
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Useful software for web, desktop, mobile, and beyond.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              XDCoderz builds practical products, applications, and software
              services across desktop, Android, web, cloud, automation, and
              whatever useful platform the work needs next.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#products">
                Explore products
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="#contact"
                variant="secondary"
                className="border-white/20 bg-white/10 text-white hover:border-white/60 hover:bg-white/15"
              >
                Start a project
              </ButtonLink>
            </div>
          </div>
          <div className="signal-panel rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
              XDCoderz operating map
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
              One scalable home for products, apps, tools, and services.
            </h2>
            <p className="mt-4 leading-7 text-neutral-300">
              The site is structured around data modules, route groups, and
              reusable cards, so adding a new platform, product, service, or case
              study stays straightforward.
            </p>
            <div className="mt-6 grid gap-3">
              {heroLanes.map((item) => (
                <div key={item} className="flex gap-3 text-sm text-neutral-200">
                  <CheckCircle2
                    className="mt-0.5 shrink-0 text-cyan-300"
                    size={17}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="#products"
                variant="secondary"
                className="border-white/20 bg-white text-neutral-950 hover:bg-neutral-100"
              >
                Products
              </ButtonLink>
              <ButtonLink
                href="#services"
                variant="ghost"
                className="text-neutral-200 hover:bg-white/10 hover:text-white"
              >
                Services
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="What XDCoderz does"
        title="Software across platforms, not locked to one format."
        description="XDCoderz can hold desktop applications, Android applications, web applications, SaaS products, utilities, automation tools, and future product experiments without reshaping the whole site."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {platformCapabilities.map((capability) => {
            const Icon = capability.icon;
            return (
              <article
                key={capability.title}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
              >
                <span className="grid size-10 place-items-center rounded-md bg-neutral-950 text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{capability.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-650">
                  {capability.description}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="products"
        className="bg-neutral-50"
        eyebrow="Products"
        title="A product shelf ready for every software format."
        description="GridForge is the first released product. The catalog is ready for desktop apps, Android apps, web apps, SaaS products, utilities, developer tools, automation tools, and experiments."
      >
        <div className="grid gap-6">
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <span
                key={category}
                className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700"
              >
                {category}
              </span>
            ))}
          </div>
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
        title="Build services for websites, apps, products, and automation."
        description="The service catalog now covers websites, web applications, Android apps, desktop apps, SaaS MVPs, backend/API work, automation, redesigns, deployment, and maintenance."
      >
        <div className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-3">
            {services.slice(0, 6).map((service) => (
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
        id="work"
        className="bg-neutral-50"
        eyebrow="Work"
        title="Product builds and software systems with room for case studies."
        description="This section can grow into client projects, internal products, experiments, and proof of work across platforms."
      >
        <div className="grid gap-6">
          <div className="grid gap-5 md:grid-cols-3">
            {workItems.map((item) => (
              <WorkCard key={item.title} item={item} />
            ))}
          </div>
          <div>
            <ButtonLink href={routes.work} variant="secondary">
              View work
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>

      <Section
        id="roadmap"
        eyebrow="Roadmap"
        title="A public signal for what XDCoderz is building next."
        description="Roadmap entries make the brand feel alive and create a place for future desktop, Android, web, SaaS, and automation ideas."
      >
        <div className="grid gap-6">
          <RoadmapList items={roadmapItems.slice(0, 4)} />
          <div>
            <ButtonLink href={routes.roadmap} variant="secondary">
              View roadmap
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
