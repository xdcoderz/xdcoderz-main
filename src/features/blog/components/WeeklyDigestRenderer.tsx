import { ArrowUpRight, Lightbulb } from "lucide-react";
import type { WeeklyMarketDigest } from "@/features/blog/types";
import { DigestImage } from "./DigestImage";

type WeeklyDigestRendererProps = {
  digest: WeeklyMarketDigest;
};

const labels = {
  days: "Immediate",
  weeks: "Near term",
  months: "Building",
  years: "Long term",
  temporary: "Temporary",
  persistent: "Persistent",
  structural: "Structural",
  technology: "Technology-led",
  company: "Company-led",
  market: "Market-driven",
  regulatory: "Policy-driven",
  geopolitical: "Geopolitical",
  social: "Social",
  environmental: "Environmental",
} as const;

function storyNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

export function WeeklyDigestRenderer({ digest }: WeeklyDigestRendererProps) {
  const sectors = unique(digest.events.map((event) => event.impactArea)).slice(0, 4);
  const horizons = unique(digest.events.map((event) => labels[event.timeHorizon]));
  const drivers = unique(digest.events.map((event) => labels[event.primaryDriver]));

  return (
    <div className="digest-layout">
      <section aria-labelledby="digest-glance" className="border-y border-neutral-200 py-8">
        <p id="digest-glance" className="text-xs font-semibold uppercase text-neutral-500">
          This week at a glance
        </p>
        <dl className="mt-6 grid gap-6 text-sm sm:grid-cols-3">
          <div>
            <dt className="font-semibold text-neutral-950">Sectors in motion</dt>
            <dd className="mt-2 leading-6 text-neutral-600">{sectors.join(" · ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-950">Impact horizon</dt>
            <dd className="mt-2 leading-6 text-neutral-600">{horizons.join(" · ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-neutral-950">Primary forces</dt>
            <dd className="mt-2 leading-6 text-neutral-600">{drivers.join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <section aria-label="Ranked market events">
        {digest.events.map((event, index) => (
          <article
            key={event.id}
            id={`story-${event.id}`}
            className="scroll-mt-24 border-b border-neutral-200 py-12 sm:py-16"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
              <div>
                <p className="digest-editorial text-xl text-neutral-400">{storyNumber(index)}</p>
                <h2 className="mt-3 text-2xl font-semibold text-neutral-950 sm:text-3xl">
                  {event.headline}
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-700 sm:text-lg sm:leading-8">
                  {event.description}
                </p>

                <p className="mt-5 text-sm leading-6 text-neutral-500">
                  {event.impactArea} · {labels[event.timeHorizon]} · {labels[event.impactDuration]} ·{" "}
                  {labels[event.primaryDriver]}
                </p>

                <div className="mt-5 grid gap-3 text-sm leading-6 text-neutral-700">
                  <p>
                    <strong className="font-semibold text-neutral-950">India relevance:</strong>{" "}
                    {event.indiaRelevance}
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-950">Hits first:</strong>{" "}
                    {event.hitsFirst}
                  </p>
                </div>

                <a
                  href={event.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 hover:text-teal-950"
                >
                  Read original reporting at {event.source.name}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>

              <figure>
                <DigestImage
                  src={event.source.imageUrl}
                  alt={event.source.imageAlt}
                  sourceName={event.source.name}
                />
                <figcaption className="mt-2 text-xs leading-5 text-neutral-500">
                  Image and reporting: {event.source.name}
                </figcaption>
              </figure>
            </div>

            <section aria-labelledby={`analysis-${event.id}`} className="mt-9 bg-neutral-50 px-5 py-6 sm:px-7">
              <h3 id={`analysis-${event.id}`} className="text-sm font-semibold uppercase text-neutral-600">
                Business summary
              </h3>
              <ul className="mt-5 grid gap-4 text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7">
                <li>
                  <strong className="font-semibold text-neutral-950">Bottom line.</strong>{" "}
                  {event.analysis.bottomLine}
                </li>
                <li>
                  <strong className="font-semibold text-neutral-950">Commercial impact.</strong>{" "}
                  {event.analysis.commercialImpact}
                </li>
                <li>
                  <strong className="font-semibold text-neutral-950">Winners and pressure.</strong>{" "}
                  {event.analysis.winnersAndPressure}
                </li>
                <li>
                  <strong className="font-semibold text-neutral-950">Watch next.</strong>{" "}
                  {event.analysis.watchNext}
                </li>
              </ul>
            </section>

            <section
              id={`opportunity-${event.id}`}
              aria-labelledby={`opportunity-title-${event.id}`}
              className="scroll-mt-24 border-x border-b border-neutral-200 px-5 py-6 sm:px-7"
            >
              <div className="flex items-center gap-2 text-neutral-500">
                <Lightbulb size={17} strokeWidth={1.7} aria-hidden="true" />
                <p className="text-xs font-semibold uppercase">Builder opportunity</p>
              </div>
              <h3 id={`opportunity-title-${event.id}`} className="mt-3 text-xl font-semibold text-neutral-950">
                {event.opportunity.name}
              </h3>
              <p className="mt-3 leading-7 text-neutral-700">
                For <strong className="font-semibold text-neutral-950">{event.opportunity.targetCustomer}</strong>,{" "}
                {event.opportunity.solution.charAt(0).toLowerCase() + event.opportunity.solution.slice(1)}
              </p>
              <dl className="mt-6 grid gap-x-8 gap-y-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-neutral-950">Problem</dt>
                  <dd className="mt-1.5 leading-6 text-neutral-600">{event.opportunity.problem}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-950">Weekend MVP</dt>
                  <dd className="mt-1.5 leading-6 text-neutral-600">{event.opportunity.weekendMvp}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-950">Why now</dt>
                  <dd className="mt-1.5 leading-6 text-neutral-600">{event.opportunity.whyNow}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-neutral-950">First validation</dt>
                  <dd className="mt-1.5 leading-6 text-neutral-600">{event.opportunity.validation}</dd>
                </div>
              </dl>
            </section>
          </article>
        ))}
      </section>

      {digest.closingSynthesis ? (
        <blockquote className="digest-editorial border-b border-neutral-200 py-12 text-2xl leading-10 text-neutral-800 sm:text-3xl sm:leading-12">
          {digest.closingSynthesis}
        </blockquote>
      ) : null}

      <section aria-labelledby="opportunity-index" className="border-b border-neutral-200 py-12">
        <p className="text-xs font-semibold uppercase text-neutral-500">Opportunity index</p>
        <h2 id="opportunity-index" className="mt-3 text-2xl font-semibold text-neutral-950 sm:text-3xl">
          {digest.events.length}{" "}ideas this week&apos;s news points to
        </h2>
        <ol className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {digest.events.map((event, index) => (
            <li key={event.id} className="border-t border-neutral-200 py-4">
              <a
                href={`#opportunity-${event.id}`}
                className="grid grid-cols-[2rem_1fr] gap-3 text-sm text-neutral-700 hover:text-teal-900"
              >
                <span className="digest-editorial text-neutral-400">{storyNumber(index)}</span>
                <span className="font-semibold">{event.opportunity.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="methodology" className="py-10 text-sm leading-6 text-neutral-600">
        <h2 id="methodology" className="font-semibold text-neutral-950">Methodology</h2>
        <p className="mt-3 max-w-3xl">
          Stories are ranked for global significance, concrete India impact, recency, and commercial usefulness.
          The coverage window runs from {digest.coverage.start} through {digest.coverage.end} in India Standard Time.
          Fewer stories are published when the quality threshold is not met.
        </p>
      </section>
    </div>
  );
}
