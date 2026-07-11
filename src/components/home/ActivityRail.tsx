import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { routes } from "@/lib/routes";

const activityItems = [
  {
    status: "Available now",
    title: "GridForge 0.1.0",
    summary: "Turn table images into Excel, CSV, or JSON with AI or offline OCR.",
    tags: ["Desktop", "Windows", "OCR"],
    href: routes.product("gridforge"),
    tone: "mint",
  },
  {
    status: "Live tool",
    title: "Software Cost Estimator",
    summary: "Establish a practical investment range before a software brief becomes a proposal.",
    tags: ["Planning", "Budget", "Scope"],
    href: routes.tool("software-cost-estimator"),
    tone: "lilac",
  },
  {
    status: "Weekly signal",
    title: "Market intelligence",
    summary: "Track meaningful market shifts and translate them into buildable software opportunities.",
    tags: ["Strategy", "Markets", "Ideas"],
    href: routes.blog,
    tone: "peach",
  },
  {
    status: "Live diagnostic",
    title: "Workflow Audit",
    summary: "Identify the recurring operational friction worth replacing with a better system.",
    tags: ["Operations", "Automation"],
    href: routes.tool("workflow-audit"),
    tone: "blue",
  },
] as const;

export function ActivityRail() {
  const loopedItems = [...activityItems, ...activityItems];

  return (
    <aside className="activity-rail" aria-label="Current XDCoderz activity">
      <div className="activity-rail__header">
        <div>
          <p className="activity-rail__eyebrow">Inside XDCoderz</p>
          <h2>Products and systems moving now.</h2>
        </div>
        <span className="activity-rail__live">
          <span aria-hidden="true" /> Live
        </span>
      </div>

      <div className="activity-rail__viewport">
        <div className="activity-rail__track">
          {loopedItems.map((item, index) => {
            const duplicate = index >= activityItems.length;

            return (
              <Link
                key={`${item.title}-${index}`}
                href={item.href}
                className={`activity-card activity-card--${item.tone}`}
                aria-hidden={duplicate || undefined}
                tabIndex={duplicate ? -1 : undefined}
              >
                <div className="activity-card__meta">
                  <span>{item.status}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="activity-card__tags" aria-label="Categories">
                  {item.tags.map((tag) => (
                    <span key={tag}>#{tag.toLowerCase()}</span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
