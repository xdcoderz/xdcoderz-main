import type { ReactNode } from "react";
import { HeadlineGenerator } from "./headline-generator";
import { InvoiceGenerator } from "./invoice-generator";
import { JsonFormatter } from "./json-formatter";
import { PasswordGenerator } from "./password-generator";
import { ProjectIdeasGenerator } from "./project-ideas-generator";
import { QrGenerator } from "./qr-generator";
import { SeoChecker } from "./seo-checker";
import { SoftwareCostEstimator } from "./software-cost-estimator";
import { WorkflowAudit } from "./workflow-audit";

export function renderToolExperience(slug: string): ReactNode {
  switch (slug) {
    case "software-cost-estimator":
      return <SoftwareCostEstimator />;
    case "workflow-audit":
      return <WorkflowAudit />;
    case "project-ideas-generator":
      return <ProjectIdeasGenerator />;
    case "invoice-generator":
      return <InvoiceGenerator />;
    case "qr-generator":
      return <QrGenerator />;
    case "json-formatter":
      return <JsonFormatter />;
    case "password-generator":
      return <PasswordGenerator />;
    case "seo-checker":
      return <SeoChecker />;
    case "headline-generator":
      return <HeadlineGenerator />;
    default:
      return null;
  }
}
