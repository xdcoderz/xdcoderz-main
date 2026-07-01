import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export default function AutomationRedirectPage() {
  redirect(routes.service("automation-internal-tools"));
}
