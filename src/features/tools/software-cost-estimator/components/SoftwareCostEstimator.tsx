"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";
import { useMemo, useState } from "react";
import { routes } from "@/lib/routes";
import { getTool } from "../../data";
import {
  calculateEstimate,
  complexityOptions,
  defaultEstimatorState,
  formatCurrency,
  integrationOptions,
  isEstimatorComplete,
  marketRanges,
  ownershipOptions,
  projectTypeOptions,
  timelineOptions,
} from "../lib/estimate";
import type {
  Complexity,
  EstimatorState,
  IntegrationLevel,
  OwnershipLevel,
  ProjectType,
  Timeline,
} from "../types";

type Option<T extends string = string> = {
  value: T;
  label: string;
  description: string;
};

type EstimatorField = keyof EstimatorState;

type WizardStep = {
  field: EstimatorField;
  eyebrow: string;
  title: string;
  helper: string;
  options: Option[];
};

const tool = getTool("software-cost-estimator");

const wizardSteps: WizardStep[] = [
  {
    field: "projectType",
    eyebrow: "Step 1 of 5",
    title: "What are you building?",
    helper:
      "Choose the closest commercial surface. This sets the base investment band before complexity is applied.",
    options: projectTypeOptions,
  },
  {
    field: "complexity",
    eyebrow: "Step 2 of 5",
    title: "How ambitious is the first release?",
    helper:
      "A sharper first release costs less than a broad product trying to solve every problem on day one.",
    options: complexityOptions,
  },
  {
    field: "integrationLevel",
    eyebrow: "Step 3 of 5",
    title: "How much integration work is involved?",
    helper:
      "External tools, APIs, payments, dashboards, and data handoffs increase both delivery effort and QA pressure.",
    options: integrationOptions,
  },
  {
    field: "timeline",
    eyebrow: "Step 4 of 5",
    title: "What delivery pace do you need?",
    helper:
      "Fast-track delivery can be useful, but it usually requires tighter decisions and higher coordination intensity.",
    options: timelineOptions,
  },
  {
    field: "ownershipLevel",
    eyebrow: "Step 5 of 5",
    title: "What level of ownership should the build carry?",
    helper:
      "Choose how much polish, maintainability, documentation, QA, and operating readiness the build should include.",
    options: ownershipOptions,
  },
];

export function SoftwareCostEstimator() {
  const [state, setState] = useState<EstimatorState>(defaultEstimatorState);
  const [activeStep, setActiveStep] = useState(0);

  const estimate = useMemo(() => {
    if (!isEstimatorComplete(state)) {
      return null;
    }

    return calculateEstimate(state);
  }, [state]);

  if (!tool) {
    return null;
  }

  const isResultStep = activeStep === wizardSteps.length;
  const currentStep = wizardSteps[activeStep];
  const currentValue = currentStep ? state[currentStep.field] : null;
  const answeredCount = wizardSteps.filter((step) => Boolean(state[step.field])).length;
  const progressPercentage = isResultStep
    ? 100
    : Math.round((answeredCount / wizardSteps.length) * 100);
  const showEstimate = Boolean(isResultStep && estimate);
  const contactHref = estimate
    ? `${routes.contact}?intent=software-cost-estimator&range=${encodeURIComponent(
        `${formatCurrency(estimate.low)} - ${formatCurrency(estimate.high)}`,
      )}`
    : routes.contact;

  function handleSelect(field: EstimatorField, value: string) {
    setState((current) => {
      switch (field) {
        case "projectType":
          return { ...current, projectType: value as ProjectType };
        case "complexity":
          return { ...current, complexity: value as Complexity };
        case "timeline":
          return { ...current, timeline: value as Timeline };
        case "integrationLevel":
          return { ...current, integrationLevel: value as IntegrationLevel };
        case "ownershipLevel":
          return { ...current, ownershipLevel: value as OwnershipLevel };
      }
    });
  }

  function goNext() {
    if (!currentValue && !isResultStep) {
      return;
    }

    if (activeStep < wizardSteps.length - 1) {
      setActiveStep((current) => current + 1);
      return;
    }

    if (estimate) {
      setActiveStep(wizardSteps.length);
    }
  }

  function goPrevious() {
    setActiveStep((current) => Math.max(0, current - 1));
  }

  function resetEstimator() {
    setState(defaultEstimatorState);
    setActiveStep(0);
  }

  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase text-sky-700 shadow-sm backdrop-blur dark:border-sky-400/20 dark:bg-white/[0.03] dark:text-sky-300">
              {tool.category} / Guided estimator
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-neutral-950 sm:text-6xl dark:text-white">
              Estimate the investment before the first serious build call.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650 dark:text-neutral-300">
              Get a practical India-focused planning range for websites, apps,
              SaaS products, desktop tools, and automation systems. Answer one
              business question at a time; the estimate appears only when the
              scope is complete.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/75 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
                <Calculator size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                  General India baseline
                </p>
                <p className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-white">
                  INR 35,000 - INR 1,20,000
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
              A standard business website in India commonly sits around this
              range when the scope is clean. Apps, SaaS products, automations,
              integrations, and stronger ownership requirements move the budget
              upward.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-neutral-50 px-6 py-6 dark:border-white/10 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                General market ranges
              </p>
              <h2 className="mt-1 text-xl font-semibold text-neutral-950 dark:text-white">
                Typical India budgets before custom scope is applied.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-neutral-650 dark:text-neutral-300">
              Broad planning bands only. Complete the guided estimate for a
              range shaped around your build.
            </p>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 md:overflow-visible xl:grid-cols-6">
            {marketRanges.map((item) => (
              <div
                key={item.label}
                className="min-w-[230px] rounded-md border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-neutral-950"
              >
                <h3 className="text-sm font-semibold text-neutral-950 dark:text-white">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm font-semibold text-sky-800 dark:text-sky-300">
                  {item.range}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.78fr] lg:items-start">
          <div className="grid gap-8">
            <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                      Guided estimate
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
                      {isResultStep ? "Your planning range is ready." : currentStep.title}
                    </h2>
                  </div>
                  <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-650 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-300">
                    {isResultStep ? "Result" : currentStep.eyebrow}
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-sky-600 transition-all duration-300 dark:bg-sky-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  {answeredCount} of {wizardSteps.length} inputs selected
                </p>
              </div>

              {isResultStep && estimate ? (
                <EstimateResult
                  contactHref={contactHref}
                  estimate={estimate}
                  onBack={goPrevious}
                  onReset={resetEstimator}
                />
              ) : (
                currentStep && (
                  <WizardQuestion
                    helper={currentStep.helper}
                    options={currentStep.options}
                    value={currentValue}
                    onSelect={(value) => handleSelect(currentStep.field, value)}
                  />
                )
              )}

              {!isResultStep && (
                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                  <button
                    type="button"
                    onClick={goPrevious}
                    disabled={activeStep === 0}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:border-neutral-300 disabled:hover:bg-white disabled:hover:text-neutral-950 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-sky-400 dark:hover:bg-sky-400/10 dark:hover:text-sky-200"
                  >
                    <ArrowLeft size={16} aria-hidden="true" />
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!currentValue}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:bg-neutral-950 dark:bg-sky-300 dark:text-neutral-950 dark:hover:bg-sky-200"
                  >
                    {activeStep === wizardSteps.length - 1
                      ? "Calculate estimate"
                      : "Next"}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              )}
            </section>
          </div>

          <aside className="sticky top-24 rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              Estimate status
            </p>
            {showEstimate && estimate ? (
              <>
                <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-950">
                  <p className="text-sm text-neutral-650 dark:text-neutral-300">
                    Indicative launch investment
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                    {formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                    {estimate.recommendation}
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  <ResultLine label="Build class" value={estimate.complexityLabel} />
                  <ResultLine label="Likely timeline" value={estimate.timelineWeeks} />
                  <ResultLine label="Scope score" value={`${estimate.score}/13`} />
                </div>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-neutral-950 dark:text-white">
                    Main cost drivers
                  </p>
                  <div className="mt-3 grid gap-2">
                    {estimate.primaryDrivers.map((driver) => (
                      <DriverLine key={driver} label={driver} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4 rounded-lg border border-dashed border-neutral-300 bg-white p-5 dark:border-white/15 dark:bg-neutral-950">
                <p className="text-lg font-semibold text-neutral-950 dark:text-white">
                  Answer the guided questions to unlock the estimate.
                </p>
                <p className="mt-3 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                  The personalized range appears on the final step, after all
                  inputs are selected.
                </p>
                <div className="mt-5 grid gap-2 text-sm text-neutral-650 dark:text-neutral-300">
                  <ProgressLine label="Project type" complete={Boolean(state.projectType)} />
                  <ProgressLine label="First-release ambition" complete={Boolean(state.complexity)} />
                  <ProgressLine label="Integration level" complete={Boolean(state.integrationLevel)} />
                  <ProgressLine label="Delivery pace" complete={Boolean(state.timeline)} />
                  <ProgressLine label="Ownership level" complete={Boolean(state.ownershipLevel)} />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={resetEstimator}
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 active:translate-y-0 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-sky-400 dark:hover:bg-sky-400/10 dark:hover:text-sky-200"
            >
              <RefreshCcw size={15} aria-hidden="true" />
              Reset estimate
            </button>

            <p className="mt-5 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
              Final pricing depends on detailed scope, assets, integrations,
              content readiness, security needs, and support expectations.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

type WizardQuestionProps = {
  helper: string;
  value: string | null;
  options: Option[];
  onSelect: (value: string) => void;
};

function WizardQuestion({ helper, value, options, onSelect }: WizardQuestionProps) {
  return (
    <div>
      <p className="max-w-2xl text-sm leading-6 text-neutral-650 dark:text-neutral-300">
        {helper}
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const isSelected = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(option.value)}
              className={`rounded-md border p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 hover:shadow-sm dark:hover:bg-sky-400/10 ${
                isSelected
                  ? "border-sky-500 bg-sky-50 ring-1 ring-sky-300 dark:border-sky-300 dark:bg-sky-300/10 dark:ring-sky-300/40"
                  : "border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-950"
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span>
                  <span className="block font-semibold text-neutral-950 dark:text-white">
                    {option.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                    {option.description}
                  </span>
                </span>
                <span
                  className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full border ${
                    isSelected
                      ? "border-sky-600 bg-sky-600 text-white dark:border-sky-300 dark:bg-sky-300 dark:text-neutral-950"
                      : "border-neutral-300 dark:border-white/20"
                  }`}
                  aria-hidden="true"
                >
                  {isSelected && <CheckCircle2 size={14} />}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type EstimateResultProps = {
  contactHref: string;
  estimate: NonNullable<ReturnType<typeof calculateEstimate>>;
  onBack: () => void;
  onReset: () => void;
};

function EstimateResult({
  contactHref,
  estimate,
  onBack,
  onReset,
}: EstimateResultProps) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-950">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
        Indicative launch investment
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-tight text-neutral-950 dark:text-white">
        {formatCurrency(estimate.low)} - {formatCurrency(estimate.high)}
      </p>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-650 dark:text-neutral-300">
        {estimate.recommendation}
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <ResultLine label="Build class" value={estimate.complexityLabel} />
        <ResultLine label="Likely timeline" value={estimate.timelineWeeks} />
        <ResultLine label="Scope score" value={`${estimate.score}/13`} />
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-neutral-950 dark:text-white">
          Main cost drivers
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {estimate.primaryDrivers.map((driver) => (
            <DriverLine key={driver} label={driver} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-sky-400 dark:hover:bg-sky-400/10 dark:hover:text-sky-200"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Revise answers
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 dark:border-white/15 dark:bg-white/[0.03] dark:text-white dark:hover:border-sky-400 dark:hover:bg-sky-400/10 dark:hover:text-sky-200"
          >
            <RefreshCcw size={15} aria-hidden="true" />
            Start over
          </button>
          <Link
            href={contactHref}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md dark:bg-sky-300 dark:text-neutral-950 dark:hover:bg-sky-200"
          >
            Discuss this estimate
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function DriverLine({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
      <CheckCircle2
        size={16}
        aria-hidden="true"
        className="mt-1 shrink-0 text-sky-700 dark:text-sky-300"
      />
      <span>{label}</span>
    </div>
  );
}

function ResultLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm dark:border-white/10 dark:bg-white/[0.03]">
      <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
      <span className="text-right font-semibold text-neutral-950 dark:text-white">{value}</span>
    </div>
  );
}

function ProgressLine({ label, complete }: { label: string; complete: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-white/10 dark:bg-white/[0.03]">
      <span>{label}</span>
      <span
        className={`text-xs font-semibold ${
          complete
            ? "text-emerald-700 dark:text-emerald-300"
            : "text-neutral-500 dark:text-neutral-400"
        }`}
      >
        {complete ? "Selected" : "Pending"}
      </span>
    </div>
  );
}
