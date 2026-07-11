"use client";

import {
  Check,
  Clipboard,
  Copy,
  Lightbulb,
  RefreshCcw,
  Sparkles,
  Target,
} from "lucide-react";
import { useState } from "react";
import {
  audienceOptions,
  defaultIdeaBrief,
  difficultyOptions,
  formatIdeaForClipboard,
  formatIdeasForClipboard,
  generateProjectIdeas,
  isIdeaBriefComplete,
  platformOptions,
} from "../lib/generate-ideas";
import type {
  GeneratedProjectIdea,
  IdeaBrief,
  IdeaOption,
} from "../types";

export function ProjectIdeasGenerator() {
  const [brief, setBrief] = useState<IdeaBrief>(defaultIdeaBrief);
  const [ideas, setIdeas] = useState<GeneratedProjectIdea[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const complete = isIdeaBriefComplete(brief);

  function updateBrief<Key extends keyof IdeaBrief>(key: Key, value: IdeaBrief[Key]) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  function generateIdeas() {
    if (!isIdeaBriefComplete(brief)) return;
    setIdeas(generateProjectIdeas(brief));
  }

  async function copyText(id: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1800);
  }

  function resetGenerator() {
    setBrief(defaultIdeaBrief);
    setIdeas([]);
    setCopiedId(null);
  }

  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.76fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase text-sky-700 dark:border-sky-400/20 dark:bg-white/[0.03] dark:text-sky-300">
              Planning Tools / Live generator
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-neutral-950 sm:text-6xl dark:text-white">
              Turn one market signal into ten buildable product ideas.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650 dark:text-neutral-300">
              Define the topic, customer, platform, and build ambition. The
              generator returns commercially framed concepts with an MVP,
              revenue model, and validation test instead of vague inspiration.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/75 p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between gap-5">
              <span className="grid size-12 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
                <Lightbulb size={22} aria-hidden="true" />
              </span>
              <span className="font-mono text-5xl font-semibold text-neutral-950 dark:text-white">10</span>
            </div>
            <p className="mt-8 text-sm font-semibold uppercase text-sky-700 dark:text-sky-300">
              Structured opportunities
            </p>
            <p className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
              Problem, solution, MVP, monetization, and validation.
            </p>
            <p className="mt-4 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
              Rule-based and transparent. No account, API key, or hidden AI call.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20 dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 sm:p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
                  Opportunity brief
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-neutral-950 dark:text-white">
                  Give the generator a sharp constraint.
                </h2>
                <p className="mt-4 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                  Strong product ideas begin with a meaningful change and a
                  specific customer, not a feature list.
                </p>

                <label className="mt-7 block" htmlFor="idea-topic">
                  <span className="text-sm font-semibold text-neutral-950 dark:text-white">
                    Market change or topic
                  </span>
                  <span className="mt-1 block text-xs text-neutral-500 dark:text-neutral-400">
                    Examples: AI agents, water scarcity, remote healthcare, GST compliance
                  </span>
                </label>
                <textarea
                  id="idea-topic"
                  value={brief.topic}
                  maxLength={80}
                  rows={4}
                  placeholder="Enter a focused market signal or problem space..."
                  onChange={(event) => updateBrief("topic", event.target.value)}
                  className="mt-3 w-full resize-none rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 transition placeholder:text-neutral-400 focus:border-sky-500 dark:border-white/15 dark:bg-neutral-950 dark:text-white"
                />
                <div className="mt-2 flex justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>At least 3 characters</span>
                  <span>{brief.topic.length}/80</span>
                </div>

                <div className="mt-7 grid gap-3">
                  <button
                    type="button"
                    onClick={generateIdeas}
                    disabled={!complete}
                    className="button-link button-link--primary w-full disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Sparkles size={16} aria-hidden="true" />
                    Generate 10 project ideas
                  </button>
                  <button
                    type="button"
                    onClick={resetGenerator}
                    className="button-link button-link--secondary w-full"
                  >
                    <RefreshCcw size={15} aria-hidden="true" />
                    Reset brief
                  </button>
                </div>
              </div>

              <div className="grid gap-7">
                <OptionGroup
                  title="Who should the product serve?"
                  options={audienceOptions}
                  value={brief.audience}
                  onSelect={(value) => updateBrief("audience", value)}
                />
                <OptionGroup
                  title="Which product surface do you prefer?"
                  options={platformOptions}
                  value={brief.platform}
                  onSelect={(value) => updateBrief("platform", value)}
                />
                <OptionGroup
                  title="How ambitious should the build be?"
                  options={difficultyOptions}
                  value={brief.difficulty}
                  onSelect={(value) => updateBrief("difficulty", value)}
                />
              </div>
            </div>
          </div>

          {ideas.length > 0 ? (
            <section className="mt-12" aria-labelledby="generated-ideas-heading">
              <div className="flex flex-col gap-5 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
                <div>
                  <p className="text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
                    Generated opportunity set
                  </p>
                  <h2 id="generated-ideas-heading" className="mt-2 text-3xl font-semibold text-neutral-950 dark:text-white">
                    Ten angles worth pressure-testing.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => copyText("all", formatIdeasForClipboard(ideas))}
                  className="button-link button-link--secondary"
                >
                  {copiedId === "all" ? <Check size={16} aria-hidden="true" /> : <Clipboard size={16} aria-hidden="true" />}
                  {copiedId === "all" ? "Copied all ideas" : "Copy all ideas"}
                </button>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {ideas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    copied={copiedId === idea.id}
                    onCopy={() => copyText(idea.id, formatIdeaForClipboard(idea))}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              <PromiseCard
                icon={Target}
                title="Commercially framed"
                description="Every idea names a customer, painful job, and credible way to charge."
              />
              <PromiseCard
                icon={Sparkles}
                title="Scoped to ambition"
                description="The MVP changes depending on whether you chose a weekend, focused, or serious build."
              />
              <PromiseCard
                icon={Check}
                title="Ready to validate"
                description="Each concept ends with a specific test you can run before committing to development."
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function OptionGroup<T extends string>({
  title,
  options,
  value,
  onSelect,
}: {
  title: string;
  options: IdeaOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-neutral-950 dark:text-white">{title}</legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.value)}
              className={`rounded-md border p-3 text-left transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-400/10 ${
                selected
                  ? "border-sky-500 bg-sky-50 ring-1 ring-sky-300 dark:border-sky-300 dark:bg-sky-300/10"
                  : "border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-950"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block text-sm font-semibold text-neutral-950 dark:text-white">
                    {option.label}
                  </span>
                  <span className="mt-1.5 block text-xs leading-5 text-neutral-650 dark:text-neutral-300">
                    {option.description}
                  </span>
                </span>
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border ${
                    selected
                      ? "border-sky-700 bg-sky-700 text-white dark:border-sky-300 dark:bg-sky-300 dark:text-neutral-950"
                      : "border-neutral-300 dark:border-white/20"
                  }`}
                  aria-hidden="true"
                >
                  {selected && <Check size={13} />}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function IdeaCard({
  idea,
  copied,
  onCopy,
}: {
  idea: GeneratedProjectIdea;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-5 transition hover:-translate-y-1 hover:border-sky-300 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-300">
            IDEA {String(idea.number).padStart(2, "0")}
          </span>
          <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-650 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-300">
            {idea.platform}
          </span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${idea.title}`}
          className="site-icon-button size-9 shrink-0"
        >
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        </button>
      </div>

      <h3 className="mt-5 text-2xl font-semibold text-neutral-950 dark:text-white">{idea.title}</h3>
      <p className="mt-3 text-sm font-medium leading-6 text-sky-800 dark:text-sky-300">
        {idea.thesis}
      </p>

      <div className="mt-5 grid gap-4 text-sm leading-6">
        <IdeaDetail label="Target customer" value={idea.targetCustomer} />
        <IdeaDetail label="Problem" value={idea.problem} />
        <IdeaDetail label="Solution" value={idea.solution} />
      </div>

      <div className="mt-5 border-t border-neutral-200 pt-5 dark:border-white/10">
        <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">MVP scope</p>
        <p className="mt-2 text-sm leading-6 text-neutral-650 dark:text-neutral-300">{idea.buildScope}</p>
        <div className="mt-3 grid gap-2">
          {idea.mvpFeatures.map((feature) => (
            <div key={feature} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <Check size={15} className="mt-0.5 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto grid gap-4 border-t border-neutral-200 pt-5 dark:border-white/10">
        <IdeaDetail label="Monetization" value={idea.monetization} />
        <IdeaDetail label="Validation test" value={idea.validation} />
      </div>
    </article>
  );
}

function IdeaDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-1 text-neutral-700 dark:text-neutral-300">{value}</p>
    </div>
  );
}

function PromiseCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <span className="grid size-10 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
        <Icon size={18} aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-semibold text-neutral-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-650 dark:text-neutral-300">{description}</p>
    </div>
  );
}
