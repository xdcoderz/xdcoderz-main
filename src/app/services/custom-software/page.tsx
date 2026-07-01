import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export default function CustomSoftwareRedirectPage() {
  redirect(routes.service("web-application-development"));
}
