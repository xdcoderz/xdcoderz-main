import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleDot,
} from "lucide-react";
import { ActivityRail } from "@/components/home/ActivityRail";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductExplorer } from "@/components/product/ProductExplorer";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/config/features";
import { latestProducts, products } from "@/data/products";
import { services } from "@/data/services";
import { getAllBlogPosts } from "@/features/blog/blog-utils";
import { featuredTools, ToolCard } from "@/features/tools";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Software Systems for Measurable Growth",
  description:
    "XDCoderz builds focused products, automation, and custom software systems that turn operational friction into measurable business leverage.",
};

const capabilities = [
  "Desktop apps",
  "Web applications",
  "Android apps",
  "SaaS products",
  "Automation",
  "Business websites",
  "AI workflows",
  "Internal tools",
];

const deliveryStages = [
  {
    number: "01",
    label: "The constraint",
    title: "Diagnose the friction worth removing.",
    description:
      "We identify where time, revenue, or execution quality is being lost and define the business result the software must create.",
  },
  {
    number: "02",
    label: "The decision",
    title: "Shape the smallest system with strategic value.",
    description:
      "Scope follows commercial priority. Every workflow, integration, and interface must justify its place in the first release.",
  },
  {
    number: "03",
    label: "The build",
    title: "Ship a focused, maintainable release.",
    description:
      "The product is built for real use, measured against the brief, and structured so the next iteration does not require a rebuild.",
  },
  {
    number: "04",
    label: "The leverage",
    title: "Turn adoption into compounding advantage.",
    description:
      "Once the system is live, we use evidence from the workflow to prioritize improvements that increase speed, control, and capacity.",
  },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default function Home() {
  const featuredProducts = latestProducts.slice(0, 3);
  const latestPost = features.blog ? getAllBlogPosts()[0] : undefined;
  const featuredServices = services.slice(0, 4);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <p className="section-kicker">XDCoderz / Products + Custom Systems</p>
            <h1>
              Build the software your <span>next stage</span> depends on.
            </h1>
            <p className="home-hero__lead">
              XDCoderz turns operational friction into focused products,
              automation, and digital systems designed to increase speed,
              control, and commercial capacity.
            </p>

            <div className="home-hero__actions">
              <ButtonLink href="#products">
                Explore products
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href={routes.contact} variant="secondary">
                Discuss a build
                <ArrowUpRight size={17} aria-hidden="true" />
              </ButtonLink>
            </div>

            <dl className="home-hero__proof">
              <div>
                <dt>Model</dt>
                <dd>Products + custom systems</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>Operational and commercial value</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Focused, scalable releases</dd>
              </div>
            </dl>
          </div>

          <ActivityRail />
        </div>

        <div className="capability-strip" aria-label="XDCoderz capabilities">
          <div className="capability-strip__inner">
            {capabilities.map((capability) => (
              <span key={capability}>
                <CircleDot size={12} aria-hidden="true" />
                {capability}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="home-section home-section--surface">
        <div className="home-container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-kicker">Available now / Latest products</p>
              <h2>Software that earns its place in the workflow.</h2>
            </div>
            <div>
              <p>
                Every XDCoderz product starts with a costly bottleneck and is
                built around a clearer, faster route to the result.
              </p>
              <ButtonLink href={routes.products} variant="ghost">
                View all products
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="home-product-stack">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.slug} product={product} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="home-section home-section--muted">
        <div className="home-container">
          <div className="section-heading section-heading--compact">
            <p className="section-kicker">Product categories</p>
            <h2>Find the right operating surface.</h2>
            <p>
              Browse products by platform while the catalog expands across
              desktop, mobile, web, SaaS, and automation.
            </p>
          </div>
          <ProductExplorer products={products} showCatalogLink />
        </div>
      </section>

      <section id="approach" className="delivery-section">
        <div className="home-container">
          <div className="delivery-section__intro">
            <p className="section-kicker">How XDCoderz builds</p>
            <h2>From business constraint to operating advantage.</h2>
            <p>
              The process stays commercially grounded from the first decision
              to the first measurable result.
            </p>
          </div>

          <div className="delivery-list">
            {deliveryStages.map((stage) => (
              <article key={stage.number} className="delivery-step">
                <div className="delivery-step__number">{stage.number}</div>
                <div className="delivery-step__label">{stage.label}</div>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="tools" className="home-section home-section--surface">
        <div className="home-container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-kicker">Business tools / Open access</p>
              <h2>Useful decisions before the larger investment.</h2>
            </div>
            <div>
              <p>
                Use focused planning and diagnostic tools to clarify budget,
                expose workflow friction, and pressure-test the opportunity.
              </p>
              <ButtonLink href={routes.tools} variant="ghost">
                Explore all tools
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="home-tool-grid">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} compact />
            ))}
          </div>
        </div>
      </section>

      {latestPost && (
        <section className="market-section">
          <div className="home-container market-section__grid">
            <div>
              <p className="section-kicker">Market intelligence / Weekly</p>
              <h2>Signals are only valuable when they improve a decision.</h2>
              <p>
                XDCoderz filters major technology and market shifts through a
                builder&apos;s lens, then turns the strongest signals into practical
                software opportunities.
              </p>
              <div className="market-section__actions">
                <ButtonLink href={routes.blog}>
                  Read the analysis
                  <ArrowRight size={16} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={routes.tool("project-ideas-generator")} variant="secondary">
                  Generate project ideas
                  <ArrowUpRight size={16} aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>

            <Link href={routes.blogPost(latestPost.slug)} className="market-brief">
              <div className="market-brief__meta">
                <span>{latestPost.category}</span>
                <span>{formatDate(latestPost.date)}</span>
              </div>
              <h3>{latestPost.title}</h3>
              <p>{latestPost.description}</p>
              <span className="market-brief__link">
                Open the latest brief
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
      )}

      <section id="services" className="home-section home-section--muted">
        <div className="home-container">
          <div className="section-heading section-heading--split">
            <div>
              <p className="section-kicker">Custom software services</p>
              <h2>When the advantage is specific, the system should be too.</h2>
            </div>
            <div>
              <p>
                Commission a website, application, automation, or internal
                platform around the operating result your business needs next.
              </p>
              <ButtonLink href={routes.services} variant="ghost">
                View all services
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>

          <div className="service-index">
            {featuredServices.map((service, index) => (
              <Link
                key={service.slug}
                href={routes.service(service.slug)}
                className="service-index__item"
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                </div>
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="decision-section">
        <div className="home-container decision-section__grid">
          <div>
            <p className="section-kicker">Choose the next move</p>
            <h2>Start with a product. Or build the capability you cannot buy.</h2>
          </div>
          <div className="decision-section__options">
            <Link href={routes.products} className="decision-link">
              <span>
                <small>Explore</small>
                Ready-to-use software
              </span>
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
            <Link href={routes.contact} className="decision-link">
              <span>
                <small>Commission</small>
                A focused custom system
              </span>
              <ArrowRight size={22} aria-hidden="true" />
            </Link>
          </div>
          <div className="decision-section__assurance">
            <Check size={17} aria-hidden="true" />
            Clear scope, maintainable foundations, and a business case for every release.
          </div>
        </div>
      </section>
    </>
  );
}
