import "server-only";

import { redirect } from "next/navigation";
import {
  createSupabaseAuthServerClient,
  isSupabaseAuthConfigured,
} from "@/lib/supabase/auth-server";

export type AdminIdentity = {
  email: string;
};

export async function getAdminIdentity(): Promise<AdminIdentity | null> {
  if (!isSupabaseAuthConfigured()) return null;

  const supabase = await createSupabaseAuthServerClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) return null;

  const email =
    typeof data.claims.email === "string"
      ? data.claims.email.trim().toLowerCase()
      : "";

  if (!email || !isAllowedAdminEmail(email)) return null;
  return { email };
}

export async function requireAdmin() {
  const identity = await getAdminIdentity();

  if (!identity) redirect("/admin/login");
  return identity;
}

export function isAllowedAdminEmail(email: string) {
  const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return allowedEmails.includes(email.trim().toLowerCase());
}
