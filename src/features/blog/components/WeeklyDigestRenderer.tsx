import { ArrowUpRight, Lightbulb } from "lucide-react";
import type { WeeklyMarketDigest } from "@/features/blog/types";
import { DigestImage } from "./DigestImage";
import { OpportunityCopyButton } from "./OpportunityCopyButton";

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

function buildOpportunityCopy(event: WeeklyMarketDigest["events"][number]) {
  return [
    `Builder opportunity: ${event.opportunity.name}`,
    `Source signal: ${event.headline}`,
    "",
    `Target customer: ${event.opportunity.targetCustomer}`,
    `Problem: ${event.opportunity.problem}`,
    `Solution: ${event.opportunity.solution}`,
    `Weekend MVP: ${event.opportunity.weekendMvp}`,
    `Why now: ${event.opportunity.whyNow}`,
    `First validation: ${event.opportunity.validation}`,
  ].join("\n");
}

export function WeeklyDigestRenderer({ digest }: WeeklyDigestRendererProps) {
  const firstStoryId = digest.events[0]?.id;

  return (
    <div className="digest-layout">
      <nav aria-label="Weekly digest table of contents" className="digest-nav">
        <div className="digest-nav__inner">
          {firstStoryId ? <a href={`#story-${firstStoryId}`}>Overview</a> : null}
          <span aria-hidden="true" className="digest-nav__divider">
            /
          </span>
          <div className="digest-nav__numbers">
            {digest.events.map((event, index) => (
              <a key={event.id} href={`#story-${event.id}`} title={event.headline}>
                {storyNumber(index)}
              </a>
            ))}
          </div>
          <span aria-hidden="true" className="digest-nav__divider">
            /
          </span>
          <a href="#opportunity-index">Opportunities</a>
          <a href="#faq">FAQ</a>
          <a href="#methodology">Methodology</a>
        </div>
      </nav>

      <section aria-label="Ranked market events">
        {digest.events.map((event, index) => (
          <article key={event.id} id={`story-${event.id}`} className="digest-story">
            <div className="digest-story__lead">
              <div>
                <p className="digest-story__number">{storyNumber(index)}</p>
                <h2>{event.headline}</h2>
                <p className="digest-story__description">{event.description}</p>
                <p className="digest-story__signals">
                  {event.impactArea} / {labels[event.timeHorizon]} / {labels[event.impactDuration]} /{" "}
                  {labels[event.primaryDriver]}
                </p>

                <div className="digest-story__context">
                  <p>
                    <strong>India relevance:</strong> {event.indiaRelevance}
                  </p>
                  <p>
                    <strong>Hits first:</strong> {event.hitsFirst}
                  </p>
                </div>

                <a
                  href={event.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="digest-source-link"
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
                <figcaption>Image and reporting: {event.source.name}</figcaption>
              </figure>
            </div>

            <section aria-labelledby={`analysis-${event.id}`} className="digest-analysis">
              <h3 id={`analysis-${event.id}`} className="digest-section-label">
                Business summary
              </h3>
              <ul className="digest-analysis__list">
                <li>
                  <strong>Bottom line.</strong> {event.analysis.bottomLine}
                </li>
                <li>
                  <strong>Commercial impact.</strong> {event.analysis.commercialImpact}
                </li>
                <li>
                  <strong>Winners and pressure.</strong> {event.analysis.winnersAndPressure}
                </li>
                <li>
                  <strong>Watch next.</strong> {event.analysis.watchNext}
                </li>
              </ul>
            </section>

            <section
              id={`opportunity-${event.id}`}
              aria-labelledby={`opportunity-title-${event.id}`}
              className="digest-opportunity"
            >
              <div className="digest-opportunity__header">
                <div className="digest-opportunity__label">
                  <Lightbulb size={17} strokeWidth={1.7} aria-hidden="true" />
                  <p className="digest-section-label">Builder opportunity</p>
                </div>
                <OpportunityCopyButton text={buildOpportunityCopy(event)} />
              </div>
              <h3 id={`opportunity-title-${event.id}`}>{event.opportunity.name}</h3>
              <p className="digest-opportunity__pitch">
                For <strong>{event.opportunity.targetCustomer}</strong>,{" "}
                {event.opportunity.solution.charAt(0).toLowerCase() +
                  event.opportunity.solution.slice(1)}
              </p>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{event.opportunity.problem}</dd>
                </div>
                <div>
                  <dt>Weekend MVP</dt>
                  <dd>{event.opportunity.weekendMvp}</dd>
                </div>
                <div>
                  <dt>Why now</dt>
                  <dd>{event.opportunity.whyNow}</dd>
                </div>
                <div>
                  <dt>First validation</dt>
                  <dd>{event.opportunity.validation}</dd>
                </div>
              </dl>
            </section>
          </article>
        ))}
      </section>

      {digest.closingSynthesis ? (
        <blockquote className="digest-closing">{digest.closingSynthesis}</blockquote>
      ) : null}

      <section
        id="opportunity-index"
        aria-labelledby="opportunity-index-title"
        className="digest-opportunity-index"
      >
        <p className="digest-section-label">Opportunity index</p>
        <h2 id="opportunity-index-title">
          {digest.events.length} ideas this week&apos;s news points to
        </h2>
        <ol>
          {digest.events.map((event, index) => (
            <li key={event.id}>
              <a href={`#opportunity-${event.id}`}>
                <span className="digest-opportunity-index__number">{storyNumber(index)}</span>
                <span>{event.opportunity.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section id="methodology" aria-labelledby="methodology-title" className="digest-methodology">
        <h2 id="methodology-title">Methodology</h2>
        <p>
          Stories are ranked for global significance, concrete India impact, recency, and commercial
          usefulness. The coverage window runs from {digest.coverage.start} through {digest.coverage.end} in
          India Standard Time. Fewer stories are published when the quality threshold is not met.
        </p>
      </section>
    </div>
  );
}
