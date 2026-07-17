"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Gauge,
  RefreshCcw,
  Workflow,
} from "lucide-react";
import { useMemo, useState } from "react";
import { buildToolContactHref } from "@/features/leads/tool-attribution";
import { routes } from "@/lib/routes";
import { getTool } from "../../data";
import {
  calculateWorkflowAudit,
  defaultWorkflowAuditState,
  errorImpactOptions,
  frequencyOptions,
  getAuditOptionLabel,
  isWorkflowAuditComplete,
  peopleOptions,
  toolMaturityOptions,
  weeklyHoursOptions,
  workflowTypeOptions,
} from "../lib/audit";
import type { AuditOption, WorkflowAuditState } from "../types";

type AuditField = keyof WorkflowAuditState;

type AuditStep = {
  field: AuditField;
  title: string;
  helper: string;
  options: AuditOption<string>[];
};

const tool = getTool("workflow-audit");

const auditSteps: AuditStep[] = [
  {
    field: "workflowType",
    title: "Which workflow creates the most friction?",
    helper: "Choose the closest operating pattern. The recommendation will be shaped around this workflow.",
    options: workflowTypeOptions,
  },
  {
    field: "frequency",
    title: "How often does the workflow run?",
    helper: "Frequency reveals whether the friction is occasional or embedded in daily operations.",
    options: frequencyOptions,
  },
  {
    field: "weeklyHours",
    title: "How much combined team time does it consume?",
    helper: "Estimate total time across everyone involved, including follow-up, rework, and status checks.",
    options: weeklyHoursOptions,
  },
  {
    field: "peopleInvolved",
    title: "How many people depend on it?",
    helper: "More participants usually mean more coordination, handoff, and visibility cost.",
    options: peopleOptions,
  },
  {
    field: "errorImpact",
    title: "What happens when the workflow fails?",
    helper: "Use the real business consequence, not just how annoying the mistake feels.",
    options: errorImpactOptions,
  },
  {
    field: "toolMaturity",
    title: "How is the workflow managed today?",
    helper: "The current operating model determines whether the best first move is automation, integration, or replacement.",
    options: toolMaturityOptions,
  },
];

export function WorkflowAudit() {
  const [state, setState] = useState<WorkflowAuditState>(defaultWorkflowAuditState);
  const [activeStep, setActiveStep] = useState(0);

  const result = useMemo(
    () => (isWorkflowAuditComplete(state) ? calculateWorkflowAudit(state) : null),
    [state],
  );

  if (!tool) {
    return null;
  }

  const isResultStep = activeStep === auditSteps.length;
  const currentStep = auditSteps[activeStep];
  const currentValue = currentStep ? state[currentStep.field] : null;
  const answeredCount = auditSteps.filter((step) => Boolean(state[step.field])).length;
  const progress = isResultStep ? 100 : Math.round((answeredCount / auditSteps.length) * 100);
  const contactHref = result && isWorkflowAuditComplete(state)
    ? buildToolContactHref({
        tool: "workflow-audit",
        reason: "Workflow automation",
        summary: `${result.band} automation priority with a ${result.score}/100 score`,
        message: [
          "I completed the XDCoderz Workflow Audit and would like to discuss the recommended system.",
          "",
          `Priority: ${result.band} (${result.score}/100)`,
          `Recommended system: ${result.recommendedSystem}`,
          `Automation fit: ${result.automationFit}`,
          `Potential recovery: ${result.recoverableTime}`,
          `Best first move: ${result.firstMove}`,
          "",
          "Please help me assess the implementation scope and expected operational return.",
        ].join("\n"),
        details: {
          Workflow: getAuditOptionLabel("workflowType", state.workflowType),
          Frequency: getAuditOptionLabel("frequency", state.frequency),
          "Weekly effort": getAuditOptionLabel("weeklyHours", state.weeklyHours),
          "People involved": getAuditOptionLabel("peopleInvolved", state.peopleInvolved),
          "Error impact": getAuditOptionLabel("errorImpact", state.errorImpact),
          "Current tools": getAuditOptionLabel("toolMaturity", state.toolMaturity),
          "Priority score": `${result.score}/100 (${result.band})`,
          "Recommended system": result.recommendedSystem,
          "Potential recovery": result.recoverableTime,
        },
      })
    : routes.contact;

  function selectOption(field: AuditField, value: string) {
    setState((current) => ({ ...current, [field]: value }) as WorkflowAuditState);
  }

  function goNext() {
    if (!currentValue || isResultStep) return;

    if (activeStep < auditSteps.length - 1) {
      setActiveStep((current) => current + 1);
      return;
    }

    if (result) setActiveStep(auditSteps.length);
  }

  function resetAudit() {
    setState(defaultWorkflowAuditState);
    setActiveStep(0);
  }

  return (
    <>
      <section className="hero-surface border-b border-neutral-200 px-6 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.78fr] lg:items-center">
          <div>
            <p className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase text-sky-700 dark:border-sky-400/20 dark:bg-white/[0.03] dark:text-sky-300">
              Planning Tools / Live diagnostic
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-neutral-950 sm:text-6xl dark:text-white">
              Find the workflow that should become software.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-650 dark:text-neutral-300">
              Evaluate recurring work through volume, time, coordination, risk,
              and tool maturity. The audit turns six practical answers into a
              ranked automation opportunity and a clear first move.
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white/75 p-6 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="flex items-start justify-between gap-5">
              <span className="grid size-12 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
                <Workflow size={22} aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                6 inputs
              </span>
            </div>
            <p className="mt-8 text-sm font-semibold uppercase text-sky-700 dark:text-sky-300">
              Decision output
            </p>
            <p className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
              Priority score, recoverable time, and recommended system.
            </p>
            <p className="mt-4 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
              No account required. Your answers stay in this browser session.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20 dark:bg-neutral-950">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
          <section className="rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <div className="border-b border-neutral-200 pb-5 dark:border-white/10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
                    {isResultStep ? "Audit complete" : `Step ${activeStep + 1} of ${auditSteps.length}`}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
                    {isResultStep ? "Your workflow opportunity is ready." : currentStep.title}
                  </h2>
                </div>
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-650 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-300">
                  {answeredCount}/{auditSteps.length} answered
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-sky-700 transition-all duration-300 dark:bg-sky-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {isResultStep && result ? (
              <AuditResult
                result={result}
                contactHref={contactHref}
                onBack={() => setActiveStep(auditSteps.length - 1)}
                onReset={resetAudit}
              />
            ) : (
              currentStep && (
                <div className="pt-6">
                  <p className="max-w-2xl text-sm leading-6 text-neutral-650 dark:text-neutral-300">
                    {currentStep.helper}
                  </p>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {currentStep.options.map((option) => {
                      const selected = currentValue === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => selectOption(currentStep.field, option.value)}
                          className={`rounded-md border p-4 text-left transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-sky-400/10 ${
                            selected
                              ? "border-sky-500 bg-sky-50 ring-1 ring-sky-300 dark:border-sky-300 dark:bg-sky-300/10"
                              : "border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-950"
                          }`}
                        >
                          <span className="flex items-start justify-between gap-4">
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
                </div>
              )
            )}

            {!isResultStep && (
              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-between dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveStep((current) => Math.max(0, current - 1))}
                  disabled={activeStep === 0}
                  className="button-link button-link--secondary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!currentValue}
                  className="button-link button-link--primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {activeStep === auditSteps.length - 1 ? "Calculate priority" : "Next"}
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            )}
          </section>

          <AuditSidebar state={state} result={isResultStep ? result : null} onReset={resetAudit} />
        </div>
      </section>
    </>
  );
}

function AuditSidebar({
  state,
  result,
  onReset,
}: {
  state: WorkflowAuditState;
  result: ReturnType<typeof calculateWorkflowAudit> | null;
  onReset: () => void;
}) {
  return (
    <aside className="sticky top-24 rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
      <p className="text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
        Audit snapshot
      </p>

      {result ? (
        <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-950">
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-sm text-neutral-650 dark:text-neutral-300">Priority score</p>
              <p className="mt-1 text-5xl font-semibold text-neutral-950 dark:text-white">
                {result.score}
              </p>
            </div>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-800 dark:border-sky-300/30 dark:bg-sky-300/10 dark:text-sky-300">
              {result.band}
            </span>
          </div>
          <p className="mt-5 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
            {result.summary}
          </p>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-neutral-300 bg-white p-5 dark:border-white/15 dark:bg-neutral-950">
          <Gauge size={22} className="text-sky-700 dark:text-sky-300" aria-hidden="true" />
          <p className="mt-4 font-semibold text-neutral-950 dark:text-white">
            Complete all six inputs to reveal the priority score.
          </p>
        </div>
      )}

      <div className="mt-5 grid gap-2">
        {auditSteps.map((step) => (
          <div
            key={step.field}
            className="rounded-md border border-neutral-200 bg-white px-3 py-3 dark:border-white/10 dark:bg-neutral-950"
          >
            <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {step.title}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-950 dark:text-white">
              {getAuditOptionLabel(step.field, state[step.field])}
            </p>
          </div>
        ))}
      </div>

      <button type="button" onClick={onReset} className="button-link button-link--secondary mt-5 w-full">
        <RefreshCcw size={15} aria-hidden="true" />
        Reset audit
      </button>
    </aside>
  );
}

function AuditResult({
  result,
  contactHref,
  onBack,
  onReset,
}: {
  result: ReturnType<typeof calculateWorkflowAudit>;
  contactHref: string;
  onBack: () => void;
  onReset: () => void;
}) {
  return (
    <div className="pt-6">
      <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
        <div className="grid min-h-36 place-items-center rounded-lg bg-neutral-950 p-5 text-center text-white dark:bg-sky-300 dark:text-neutral-950">
          <div>
            <p className="text-5xl font-semibold">{result.score}</p>
            <p className="mt-1 text-xs font-semibold uppercase">{result.band} priority</p>
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-950">
          <p className="text-xs font-semibold uppercase text-sky-700 dark:text-sky-300">
            Recommended system
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
            {result.recommendedSystem}
          </h3>
          <p className="mt-3 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
            {result.summary}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ResultMetric icon={Gauge} label="Automation fit" value={result.automationFit} />
        <ResultMetric icon={Clock3} label="Potential recovery" value={result.recoverableTime} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-950">
          <h3 className="font-semibold text-neutral-950 dark:text-white">Why it scored here</h3>
          <div className="mt-4 grid gap-3">
            {result.reasons.map((reason) => (
              <ReasonLine key={reason}>{reason}</ReasonLine>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-white p-5 dark:border-white/10 dark:bg-neutral-950">
          <h3 className="font-semibold text-neutral-950 dark:text-white">Best first move</h3>
          <p className="mt-3 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
            {result.firstMove}
          </p>
          <div className="mt-4 grid gap-3">
            {result.nextSteps.map((step) => (
              <ReasonLine key={step}>{step}</ReasonLine>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
        <button type="button" onClick={onBack} className="button-link button-link--secondary">
          <ArrowLeft size={16} aria-hidden="true" />
          Revise answers
        </button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onReset} className="button-link button-link--secondary">
            <RefreshCcw size={15} aria-hidden="true" />
            Start over
          </button>
          <Link href={contactHref} className="button-link button-link--primary">
            Discuss this workflow
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ResultMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-neutral-950">
      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-sky-100 text-sky-700 dark:bg-sky-300/10 dark:text-sky-300">
        <Icon size={17} aria-hidden="true" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase text-neutral-500 dark:text-neutral-400">{label}</p>
        <p className="mt-1 font-semibold text-neutral-950 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function ReasonLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm leading-6 text-neutral-650 dark:text-neutral-300">
      <CheckCircle2 size={16} className="mt-1 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}
