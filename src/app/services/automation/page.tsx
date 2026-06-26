import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { getService } from "@/data/services";

const service = getService("automation")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.summary,
};

export default function AutomationPage() {
  return <ServiceDetail service={service} />;
}
