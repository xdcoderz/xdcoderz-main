import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { getService } from "@/data/services";

const service = getService("website-development")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.summary,
};

export default function WebsiteDevelopmentPage() {
  return <ServiceDetail service={service} />;
}
