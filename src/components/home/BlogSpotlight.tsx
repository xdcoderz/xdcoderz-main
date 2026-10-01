import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3, Newspaper } from "lucide-react";
import type { BlogPost } from "@/features/blog/types";
import { MotionSection } from "./MotionSection";
import styles from "./blog-spotlight.module.css";

export function BlogSpotlight({ post }: { post: BlogPost }) {
  const date = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(post.date));
  return <MotionSection className={styles.section} label="From the XDCoderz blog">
    <div className={styles.inner}>
      <div className={styles.masthead} data-reveal>
        <span><Newspaper size={18} aria-hidden="true" />The XDCoderz journal</span>
        <Link href="/blog">All articles <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </div>
      <div className={styles.rule} data-line />
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className="section-kicker" data-reveal>Ideas worth your attention</p>
          <h2 data-reveal>A clearer view of<br /><span>what comes next.</span></h2>
          <p className={styles.description} data-reveal>Understand the shifts shaping technology and business. Find the opportunities that deserve your time, and turn a useful insight into your next move.</p>
          <div className={styles.actions} data-reveal>
            <Link className={styles.primary} href="/blog">Explore the journal <ArrowRight size={17} aria-hidden="true" /></Link>
            <Link className={styles.secondary} href="/tools/project-ideas-generator">Find a project idea <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
          <p className={styles.note} data-reveal>Fresh perspectives. Practical possibilities.</p>
        </div>
        <div className={styles.paperWrap}>
          <Link href={`/blog/${post.slug}`} className={styles.paper} data-art>
            <div className={styles.paperHeader}><span>Latest edition</span><time dateTime={post.date}>{date}</time></div>
            <div className={styles.paperMark} aria-hidden="true"><Newspaper size={48} strokeWidth={1} /><span>XDC / NOTES</span></div>
            <p className={styles.category}>{post.category}</p>
            <h3>{post.title}</h3>
            <p className={styles.excerpt}>{post.description}</p>
            <div className={styles.tags}>{post.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className={styles.paperFooter}>
              <span><Clock3 size={14} aria-hidden="true" />{post.readingTime}</span>
              <span>Read the story <ArrowUpRight size={20} aria-hidden="true" /></span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </MotionSection>;
}

