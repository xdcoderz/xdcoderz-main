import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Service } from "@/data/services/types";
import { routes } from "@/lib/routes";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="content-card">
      <p className="content-card__kicker">
        {service.eyebrow}
      </p>
      <h3 className="mt-4 text-2xl font-semibold text-neutral-950">
        {service.name}
      </h3>
      <p className="mt-4 text-sm leading-6 text-neutral-650">{service.summary}</p>
      <div className="mt-6">
        <ButtonLink href={routes.service(service.slug)} variant="secondary">
          View service
          <ArrowUpRight size={16} aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
