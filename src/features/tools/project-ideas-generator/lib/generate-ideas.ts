import type {
  BuildDifficulty,
  CompletedIdeaBrief,
  GeneratedProjectIdea,
  IdeaAudience,
  IdeaBrief,
  IdeaOption,
  IdeaPlatform,
} from "../types";

export const audienceOptions: IdeaOption<IdeaAudience>[] = [
  {
    value: "small-businesses",
    label: "Small businesses",
    description: "Owners and lean teams willing to pay for time savings or growth.",
  },
  {
    value: "operations-teams",
    label: "Operations teams",
    description: "People managing workflows, reporting, coordination, and service delivery.",
  },
  {
    value: "creators",
    label: "Creators",
    description: "Independent professionals building audiences, products, and recurring revenue.",
  },
  {
    value: "developers",
    label: "Developers",
    description: "Technical users who value speed, APIs, automation, and reliable tooling.",
  },
  {
    value: "students",
    label: "Students",
    description: "Learners looking for affordability, guidance, and faster progress.",
  },
  {
    value: "consumers",
    label: "Consumers",
    description: "General users who need a simple, low-friction personal solution.",
  },
];

export const platformOptions: IdeaOption<IdeaPlatform>[] = [
  {
    value: "any",
    label: "Best fit",
    description: "Let the opportunity determine the strongest delivery surface.",
  },
  {
    value: "web-app",
    label: "Web app",
    description: "A browser-based product with focused workflows and data.",
  },
  {
    value: "mobile-app",
    label: "Mobile app",
    description: "An on-the-go experience built around frequent, lightweight use.",
  },
  {
    value: "saas",
    label: "SaaS",
    description: "A recurring-revenue product with accounts and repeat value.",
  },
  {
    value: "automation",
    label: "Automation",
    description: "A system that connects tools or removes repetitive work.",
  },
  {
    value: "desktop-app",
    label: "Desktop app",
    description: "Installable software suited to files, privacy, or offline workflows.",
  },
];

export const difficultyOptions: IdeaOption<BuildDifficulty>[] = [
  {
    value: "weekend",
    label: "Weekend MVP",
    description: "A narrow validation build with one valuable job and minimal infrastructure.",
  },
  {
    value: "focused",
    label: "Focused build",
    description: "A credible first product that could be tested with paying users in 2-4 weeks.",
  },
  {
    value: "serious",
    label: "Serious product",
    description: "A larger opportunity with richer workflows and a stronger commercial moat.",
  },
];

export const defaultIdeaBrief: IdeaBrief = {
  topic: "",
  audience: null,
  platform: null,
  difficulty: null,
};

export function isIdeaBriefComplete(brief: IdeaBrief): brief is CompletedIdeaBrief {
  return Boolean(
    brief.topic.trim().length >= 3 && brief.audience && brief.platform && brief.difficulty,
  );
}

export function generateProjectIdeas(brief: CompletedIdeaBrief): GeneratedProjectIdea[] {
  const topic = normalizeTopic(brief.topic);
  const audience = audienceProfiles[brief.audience];
  const difficulty = difficultyProfiles[brief.difficulty];

  return archetypes.map((archetype, index) => {
    const platform =
      brief.platform === "any"
        ? platformLabels[archetype.defaultPlatform]
        : platformLabels[brief.platform];
    const mvpFeatures = archetype.features(topic).slice(0, difficulty.featureCount);

    return {
      id: `${slugify(topic)}-${archetype.id}`,
      number: index + 1,
      title: archetype.title(topic),
      thesis: archetype.thesis(topic, audience.label),
      targetCustomer: audience.targetCustomer,
      problem: archetype.problem(topic, audience.label),
      solution: archetype.solution(topic, audience.label),
      platform,
      buildScope: difficulty.scope,
      mvpFeatures,
      monetization: audience.monetization,
      validation: archetype.validation(topic, audience.validationGroup),
    };
  });
}

export function formatIdeaForClipboard(idea: GeneratedProjectIdea) {
  return [
    `${idea.number}. ${idea.title}`,
    idea.thesis,
    `Target customer: ${idea.targetCustomer}`,
    `Problem: ${idea.problem}`,
    `Solution: ${idea.solution}`,
    `Platform: ${idea.platform}`,
    `Build scope: ${idea.buildScope}`,
    `MVP: ${idea.mvpFeatures.join("; ")}`,
    `Monetization: ${idea.monetization}`,
    `Validation: ${idea.validation}`,
  ].join("\n");
}

export function formatIdeasForClipboard(ideas: GeneratedProjectIdea[]) {
  return ideas.map(formatIdeaForClipboard).join("\n\n---\n\n");
}

type AudienceProfile = {
  label: string;
  targetCustomer: string;
  monetization: string;
  validationGroup: string;
};

const audienceProfiles: Record<IdeaAudience, AudienceProfile> = {
  "small-businesses": {
    label: "small businesses",
    targetCustomer: "Owner-led businesses with 2-25 employees and limited specialist capacity.",
    monetization: "Monthly subscription with a low-friction trial and a higher team tier.",
    validationGroup: "10 business owners in one narrow industry",
  },
  "operations-teams": {
    label: "operations teams",
    targetCustomer: "Operations managers responsible for throughput, visibility, and repeatable execution.",
    monetization: "Team subscription priced by workspace, workflow volume, or active operators.",
    validationGroup: "8 operations managers handling the workflow today",
  },
  creators: {
    label: "creators",
    targetCustomer: "Independent creators and small media teams monetizing expertise or attention.",
    monetization: "Freemium entry with paid templates, exports, and a professional subscription.",
    validationGroup: "15 creators already paying for adjacent tools",
  },
  developers: {
    label: "developers",
    targetCustomer: "Solo developers and product teams that value speed, control, and integration quality.",
    monetization: "Free developer tier followed by usage-based or team pricing.",
    validationGroup: "20 developers in a focused technical community",
  },
  students: {
    label: "students",
    targetCustomer: "College students and early-career learners seeking guided, affordable progress.",
    monetization: "Free core experience with an affordable semester plan or one-time premium pack.",
    validationGroup: "25 students from one course, campus, or learning community",
  },
  consumers: {
    label: "consumers",
    targetCustomer: "Individuals who need a simple outcome without specialist knowledge or complex setup.",
    monetization: "Free trial followed by a low-cost subscription or one-time purchase.",
    validationGroup: "30 people who recently attempted the task manually",
  },
};

const platformLabels: Record<IdeaPlatform, string> = {
  any: "Best-fit product",
  "web-app": "Web application",
  "mobile-app": "Mobile application",
  saas: "SaaS product",
  automation: "Automation system",
  "desktop-app": "Desktop application",
};

const difficultyProfiles: Record<BuildDifficulty, { scope: string; featureCount: number }> = {
  weekend: {
    scope: "Weekend MVP: one core job, manual support behind the scenes, and a narrow user segment.",
    featureCount: 3,
  },
  focused: {
    scope: "Focused 2-4 week build: complete core workflow, basic accounts, and measurable usage.",
    featureCount: 4,
  },
  serious: {
    scope: "Serious product: richer workflows, integrations, administration, and a defensible data loop.",
    featureCount: 5,
  },
};

type Archetype = {
  id: string;
  defaultPlatform: Exclude<IdeaPlatform, "any">;
  title: (topic: string) => string;
  thesis: (topic: string, audience: string) => string;
  problem: (topic: string, audience: string) => string;
  solution: (topic: string, audience: string) => string;
  features: (topic: string) => string[];
  validation: (topic: string, group: string) => string;
};

const archetypes: Archetype[] = [
  {
    id: "signal-monitor",
    defaultPlatform: "saas",
    title: (topic) => `${topic} Signal Monitor`,
    thesis: (topic, audience) => `Convert noisy ${topic.toLowerCase()} changes into a prioritized weekly decision feed for ${audience}.`,
    problem: (topic, audience) => `${audience} cannot continuously track which ${topic.toLowerCase()} changes deserve action.`,
    solution: (topic) => `Collect trusted ${topic.toLowerCase()} sources, score their relevance, and issue concise alerts with recommended actions.`,
    features: (topic) => [
      `${topic} source watchlist`,
      "Relevance and urgency scoring",
      "Weekly decision brief",
      "Email or workspace alerts",
      "Saved signals and outcome tracking",
    ],
    validation: (topic, group) => `Send a manually curated ${topic.toLowerCase()} brief to ${group} for two weeks and measure repeat opens plus action taken.`,
  },
  {
    id: "workflow-copilot",
    defaultPlatform: "automation",
    title: (topic) => `${topic} Workflow Copilot`,
    thesis: (topic, audience) => `Guide ${audience} through a repeatable ${topic.toLowerCase()} workflow while automating the predictable steps.`,
    problem: (topic, audience) => `${audience} rely on memory and scattered tools to complete recurring ${topic.toLowerCase()} work.`,
    solution: () => "Turn the workflow into a guided sequence with templates, checks, reminders, and selective automation.",
    features: () => [
      "Guided workflow checklist",
      "Reusable templates",
      "Automated reminders",
      "Exception queue",
      "Completion and quality dashboard",
    ],
    validation: (topic, group) => `Map one ${topic.toLowerCase()} workflow with ${group}, deliver it as a concierge service, and test whether completion time falls.`,
  },
  {
    id: "decision-desk",
    defaultPlatform: "web-app",
    title: (topic) => `${topic} Decision Desk`,
    thesis: (topic, audience) => `Give ${audience} one place to compare options and make evidence-backed ${topic.toLowerCase()} decisions.`,
    problem: (topic) => `${topic} decisions are made with inconsistent assumptions, fragmented evidence, and no record of why an option won.`,
    solution: (topic) => `Structure ${topic.toLowerCase()} options, criteria, evidence, and tradeoffs into a reusable decision workspace.`,
    features: () => [
      "Decision brief builder",
      "Weighted criteria scorecard",
      "Evidence and assumption log",
      "Scenario comparison",
      "Decision history",
    ],
    validation: (topic, group) => `Run three real ${topic.toLowerCase()} decisions through a spreadsheet prototype with ${group} and test willingness to reuse it.`,
  },
  {
    id: "readiness-score",
    defaultPlatform: "web-app",
    title: (topic) => `${topic} Readiness Score`,
    thesis: (topic, audience) => `Help ${audience} understand their ${topic.toLowerCase()} readiness and the highest-value next improvement.`,
    problem: (topic, audience) => `${audience} know ${topic.toLowerCase()} matters but cannot diagnose their current gaps or sequence improvements.`,
    solution: () => "Use a focused assessment to produce a score, benchmark, risk flags, and prioritized action plan.",
    features: () => [
      "Guided assessment",
      "Weighted readiness score",
      "Gap analysis",
      "Prioritized action plan",
      "Shareable report",
    ],
    validation: (topic, group) => `Interview ${group}, manually score their ${topic.toLowerCase()} readiness, and ask which recommendation they would pay to implement.`,
  },
  {
    id: "service-portal",
    defaultPlatform: "saas",
    title: (topic) => `${topic} Service Portal`,
    thesis: (topic) => `Turn a fragmented ${topic.toLowerCase()} service journey into one transparent customer workspace.`,
    problem: (topic) => `${topic} requests, documents, status updates, and decisions are scattered across messages and files.`,
    solution: (topic) => `Create a shared portal for ${topic.toLowerCase()} intake, progress, deliverables, questions, and approvals.`,
    features: () => [
      "Structured request intake",
      "Status timeline",
      "Document exchange",
      "Approvals and comments",
      "Operator dashboard",
    ],
    validation: (topic, group) => `Prototype the portal in a no-code workspace and onboard ${group} through one real ${topic.toLowerCase()} journey.`,
  },
  {
    id: "data-cleaner",
    defaultPlatform: "desktop-app",
    title: (topic) => `${topic} Data Cleaner`,
    thesis: (topic, audience) => `Turn inconsistent ${topic.toLowerCase()} files into structured, validated, reusable data for ${audience}.`,
    problem: (topic) => `${topic} information arrives in inconsistent formats and requires repetitive cleanup before it becomes usable.`,
    solution: (topic) => `Import common ${topic.toLowerCase()} files, normalize fields, flag anomalies, and export a trusted dataset.`,
    features: () => [
      "File import and field mapping",
      "Validation rules",
      "Duplicate and anomaly detection",
      "Before-and-after preview",
      "CSV and spreadsheet export",
    ],
    validation: (topic, group) => `Collect 20 anonymized ${topic.toLowerCase()} files from ${group}, clean them manually, and measure recurring rules plus time saved.`,
  },
  {
    id: "scenario-planner",
    defaultPlatform: "web-app",
    title: (topic) => `${topic} Scenario Planner`,
    thesis: (topic, audience) => `Let ${audience} model ${topic.toLowerCase()} choices before committing money, time, or operational capacity.`,
    problem: (topic) => `${topic} plans are often approved without a transparent view of assumptions, downside, or capacity requirements.`,
    solution: (topic) => `Provide guided inputs and side-by-side ${topic.toLowerCase()} scenarios with risks, costs, and outcome ranges.`,
    features: () => [
      "Assumption builder",
      "Scenario comparison",
      "Sensitivity controls",
      "Risk flags",
      "Shareable recommendation",
    ],
    validation: (topic, group) => `Build one spreadsheet model and ask ${group} to use it during a real ${topic.toLowerCase()} planning decision.`,
  },
  {
    id: "compliance-tracker",
    defaultPlatform: "saas",
    title: (topic) => `${topic} Control Tracker`,
    thesis: (topic, audience) => `Give ${audience} a lightweight control layer for recurring ${topic.toLowerCase()} obligations and evidence.`,
    problem: (topic) => `${topic} responsibilities are remembered through calendars and people, making missed evidence and ownership gaps likely.`,
    solution: (topic) => `Track ${topic.toLowerCase()} controls, owners, due dates, evidence, exceptions, and review status in one system.`,
    features: () => [
      "Control register",
      "Owner and due-date tracking",
      "Evidence collection",
      "Exception log",
      "Audit-ready export",
    ],
    validation: (topic, group) => `Ask ${group} to replace one recurring ${topic.toLowerCase()} checklist with a shared prototype for one cycle.`,
  },
  {
    id: "learning-sprint",
    defaultPlatform: "mobile-app",
    title: (topic) => `${topic} Learning Sprint`,
    thesis: (topic, audience) => `Help ${audience} build practical ${topic.toLowerCase()} capability through short, outcome-based learning cycles.`,
    problem: (topic) => `${topic} learning content is abundant, but users struggle to convert information into consistent practical progress.`,
    solution: (topic) => `Turn ${topic.toLowerCase()} goals into daily micro-tasks, evidence-based practice, and visible skill progression.`,
    features: () => [
      "Goal-based learning path",
      "Daily practical task",
      "Progress evidence",
      "Feedback prompts",
      "Skill milestone report",
    ],
    validation: (topic, group) => `Run a seven-day ${topic.toLowerCase()} challenge with ${group} through messaging and measure completion plus outcome quality.`,
  },
  {
    id: "integration-hub",
    defaultPlatform: "automation",
    title: (topic) => `${topic} Integration Hub`,
    thesis: (topic, audience) => `Connect the tools ${audience} already use so ${topic.toLowerCase()} data moves without repetitive handoffs.`,
    problem: (topic) => `${topic} data is copied between disconnected systems, creating delay, inconsistency, and invisible failures.`,
    solution: (topic) => `Provide opinionated ${topic.toLowerCase()} connectors, field mapping, automated sync, and exception handling.`,
    features: () => [
      "Two high-demand connectors",
      "Field mapping",
      "Scheduled or event-based sync",
      "Failure and exception queue",
      "Sync history dashboard",
    ],
    validation: (topic, group) => `Identify the two tools most often paired by ${group}, then manually deliver one ${topic.toLowerCase()} sync and test repeat demand.`,
  },
];

function normalizeTopic(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\b[a-z]/g, (character) => character.toUpperCase());
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
