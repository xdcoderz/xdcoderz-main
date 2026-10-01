import Link from "next/link";
import { ArrowUpRight, Star, PencilRuler, Route, Rocket, CheckCheck } from "lucide-react";
import { getFeaturedOpenProjects } from "@/features/open-product-lab";
import styles from "./discovery.module.css";

export async function CompactLab() {
  const projects = (await getFeaturedOpenProjects()).slice(0, 2);
  return <div className={styles.discovery}>
    <section id="lab" className={styles.section}>
      <div className={styles.heading}><div><p className="section-kicker">Open Product Lab</p><h2>Explore. Contribute. Build further.</h2></div><Link href="/lab">Explore Lab <ArrowUpRight size={16} /></Link></div>
      <div className={styles.projects}>{projects.map(project => <Link className={styles.project} key={project.slug} href={project.links.github} target="_blank" rel="noreferrer">
        <div className={styles.projectMeta}><span>{project.status}</span>{project.stats && <span><Star size={14} aria-hidden="true" />{project.stats.stars}</span>}</div>
        <h3>{project.name}<ArrowUpRight size={18} aria-hidden="true" /></h3><p>{project.description}</p>
      </Link>)}</div>
    </section>
  </div>;
}

export function CompactApproach() {
  const steps = [
    { icon: PencilRuler, name: "Define", text: "Agree on the problem and the result." },
    { icon: Route, name: "Plan", text: "Set a clear scope and delivery path." },
    { icon: Rocket, name: "Build", text: "Ship a focused, tested release." },
    { icon: CheckCheck, name: "Improve", text: "Use real feedback to guide what comes next." },
  ];
  return <section id="approach" className={styles.approach}><div className={styles.approachInner}>
    <p className="section-kicker">From first conversation to launch</p><h2>A clear path forward.</h2>
    <div className={styles.steps}>{steps.map((step, i) => <div key={step.name}><span className={styles.sketch}><step.icon size={30} strokeWidth={1.25} aria-hidden="true" /></span><h3><small>0{i + 1}</small>{step.name}</h3><p>{step.text}</p></div>)}</div>
  </div></section>;
}

