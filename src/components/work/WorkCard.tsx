import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { WorkItem } from "@/data/work";

export function WorkCard({ item }: { item: WorkItem }) {
  return (
    <article className="content-card">
      <p className="content-card__kicker">
        {item.label}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-neutral-950">{item.title}</h3>
      <p className="mt-4 text-sm leading-6 text-neutral-650">{item.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700"
          >
            {tag}
          </span>
        ))}
      </div>
      {item.href && (
        <div className="mt-6">
          <ButtonLink href={item.href} variant="secondary">
            View
            <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
      )}
    </article>
  );
}
