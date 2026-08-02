import Link from "next/link";
import { ArrowUpRight, Code2, GitFork, Star, TimerReset } from "lucide-react";
import type { OpenProjectWithStats } from "../types";

type OpenProjectCardProps = {
  project: OpenProjectWithStats;
};

const statusLabels: Record<OpenProjectWithStats["status"], string> = {
  active: "Active",
  prototype: "Prototype",
  "seeking-contributors": "Seeking contributors",
  archived: "Archived",
};

function formatUpdatedAt(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function OpenProjectCard({ project }: OpenProjectCardProps) {
  const releaseLabel = project.stats?.latestRelease?.tagName;
  const shouldShowStars = Boolean(project.stats && project.stats.stars >= 5);

  return (
    <article className="open-project-card">
      <div className="open-project-card__topline">
        <span className={`open-project-card__status open-project-card__status--${project.status}`}>
          {statusLabels[project.status]}
        </span>
        <span>{project.category}</span>
      </div>

      <div className="open-project-card__body">
        <p className="open-project-card__maturity">{project.maturity}</p>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <p className="open-project-card__value">{project.businessValue}</p>
      </div>

      <div className="open-project-card__tags" aria-label={`${project.name} stack and tags`}>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="open-project-card__stats" aria-label={`${project.name} repository signals`}>
        {releaseLabel && (
          <span>
            <Code2 size={14} aria-hidden="true" />
            {releaseLabel}
          </span>
        )}
        {project.stats?.pushedAt && (
          <span>
            <TimerReset size={14} aria-hidden="true" />
            Updated {formatUpdatedAt(project.stats.pushedAt)}
          </span>
        )}
        {shouldShowStars && (
          <span>
            <Star size={14} aria-hidden="true" />
            {project.stats?.stars} stars
          </span>
        )}
        {project.stats && project.stats.forks > 0 && (
          <span>
            <GitFork size={14} aria-hidden="true" />
            {project.stats.forks} forks
          </span>
        )}
        {!project.stats && <span>GitHub proof loads gracefully when available</span>}
      </div>

      <div className="open-project-card__actions">
        <Link href={project.links.github} target="_blank" rel="noreferrer">
          View repository
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        {project.links.product && (
          <Link href={project.links.product}>
            Product context
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        )}
        {project.links.download && (
          <Link href={project.links.download}>
            Download
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
