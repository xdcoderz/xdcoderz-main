import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CircleDot } from "lucide-react";
import { BlogSpotlight } from "@/components/home/BlogSpotlight";
import { ActivityRail } from "@/components/home/ActivityRail";
import { CompactApproach, CompactLab } from "@/components/home/CompactDiscovery";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { features } from "@/config/features";
import { services } from "@/data/services";
import { getAllBlogPosts } from "@/features/blog/blog-utils";
import { FeaturedBanner } from "@/features/featured/components/FeaturedBanner";
import { getPublicSpotlight } from "@/features/featured/server";
import { routes } from "@/lib/routes";

// Read eligibility on every request so scheduled promotions never depend on a cron job.
export const dynamic = "force-dynamic";

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

export default async function Home() {
  const spotlight = await getPublicSpotlight();
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

      <div id="products" className="scroll-mt-28">
        {spotlight && <FeaturedBanner value={spotlight} />}
      </div>
      <CompactLab />

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

      <CompactApproach />

      {latestPost && <BlogSpotlight post={latestPost} />}

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
