import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { features } from "@/config/features";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__cta">
          <div>
            <p className="section-kicker">The next operating advantage</p>
            <h2>Build the system your next stage demands.</h2>
          </div>
          <Link href={routes.contact} className="footer-cta-link">
            Start the conversation
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>

        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href={routes.home} className="brand-link">
              <span className="brand-mark">XD</span>
              XDCoderz
            </Link>
            <p>{site.tagline}</p>
            <a href={`mailto:${site.email}`}>
              {site.email}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link href={routes.products}>Products</Link>
            <Link href={routes.lab}>Open Product Lab</Link>
            <Link href={routes.tools}>Tools</Link>
            <Link href={routes.services}>Services</Link>
            <Link href={routes.work}>Work</Link>
            {features.blog && <Link href={routes.blog}>Blog</Link>}
          </div>

          <div className="footer-column">
            <h3>Products</h3>
            {products.map((product) => (
              <Link key={product.slug} href={routes.product(product.slug)}>
                {product.name}
              </Link>
            ))}
            <Link href={routes.roadmap}>Product roadmap</Link>
            <Link href={routes.lab}>Open-source builds</Link>
            <Link href={routes.tools}>Open business tools</Link>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <Link href={routes.about}>About</Link>
            <Link href={routes.contact}>Contact</Link>
            <Link href={routes.service(services[0].slug)}>Website development</Link>
          </div>

          <div className="footer-column">
            <h3>Legal</h3>
            <Link href={routes.terms}>Terms & Conditions</Link>
            <Link href={routes.privacy}>Privacy Policy</Link>
            <Link href={routes.lab}>Open-source notice</Link>
          </div>
        </div>

        <div className="site-footer__base">
          <span>&copy; {new Date().getFullYear()} XDCoderz.</span>
          <span>
            Lab repositories are separate open-source projects; website terms and repository licenses apply.
          </span>
        </div>
      </div>
    </footer>
  );
}
