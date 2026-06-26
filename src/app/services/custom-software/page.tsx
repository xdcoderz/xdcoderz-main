import type { Metadata } from "next";
import { ServiceDetail } from "@/components/service/ServiceDetail";
import { getService } from "@/data/services";

const service = getService("custom-software")!;

export const metadata: Metadata = {
  title: service.name,
  description: service.summary,
};

export default function CustomSoftwarePage() {
  return <ServiceDetail service={service} />;
}
