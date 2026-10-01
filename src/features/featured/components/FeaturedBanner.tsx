import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { MotionSection } from "@/components/home/MotionSection";
import type { Spotlight } from "../types";
import { safeDestination } from "../validation";
import styles from "../featured.module.css";

export function FeaturedBanner({ value, preview = false }: { value: Spotlight; preview?: boolean }) {
  return (
    <MotionSection className={styles.spotlight} label="Featured at XDCoderz" disabled={preview}>
      <div className={styles.masthead} data-reveal>
        <span><Sparkles size={17} aria-hidden="true" />Featured at XDCoderz</span>
        <a href={preview ? undefined : "/products"} aria-disabled={preview || undefined}>Explore the catalog <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <div className={styles.rule} data-line />
      <div className={styles.banner}>
        <div className={styles.copy}>
          <p className={styles.overline} data-reveal><span aria-hidden="true">01 /</span> In the spotlight</p>
          {value.badge && <span className={styles.badge} data-reveal>{value.badge}</span>}
          <h2 data-reveal>{value.title}</h2>
          <p className={styles.description} data-reveal>{value.description}</p>
          <a data-reveal className={styles.cta} href={preview || !safeDestination(value.href) ? undefined : value.href} aria-disabled={preview || undefined}>
            {value.buttonLabel}<ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.artboard}>
          <figure className={styles.art} data-art>
            <div className={styles.visual}><Image src={value.image} alt={value.imageAlt} width={1200} height={800} unoptimized /></div>
            <figcaption><span>Selected by XDCoderz</span><ArrowUpRight size={18} aria-hidden="true" /></figcaption>
          </figure>
        </div>
      </div>
    </MotionSection>
  );
}

