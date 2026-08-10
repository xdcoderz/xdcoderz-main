"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAllowedAdminEmail, requireAdmin } from "@/features/admin/auth";
import { createLabProjectFromGithubUrl } from "@/features/admin/lab-projects";
import { leadStatuses, type LeadStatus } from "@/features/admin/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  createSupabaseAuthServerClient,
  isSupabaseAuthConfigured,
} from "@/lib/supabase/auth-server";

export type LoginState = {
  error: string;
};

export async function loginAction(
  _state: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = getString(formData.get("email")).trim().toLowerCase();
  const password = getString(formData.get("password"));

  if (!email || !password) {
    return { error: "Enter your admin email and password." };
  }

  if (!isSupabaseAuthConfigured()) {
    return { error: "Supabase Auth is not configured in this environment." };
  }

  if (!isAllowedAdminEmail(email)) {
    return { error: "Unable to sign in with these credentials." };
  }

  const supabase = await createSupabaseAuthServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: "Unable to sign in with these credentials." };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || !isAllowedAdminEmail(user.email)) {
    await supabase.auth.signOut();
    return { error: "Unable to sign in with these credentials." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (!isSupabaseAuthConfigured()) redirect("/admin/login");

  const supabase = await createSupabaseAuthServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const id = getString(formData.get("id"));
  const status = getString(formData.get("status"));

  if (!isUuid(id) || !isLeadStatus(status)) return;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("contact_leads")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(`Lead status update failed: ${error.message}`);

  revalidatePath("/admin");
  revalidatePath("/admin/leads");
}

export async function addLabProject(formData: FormData) {
  await requireAdmin();
  const githubUrl = getString(formData.get("githubUrl")).trim();

  try {
    await createLabProjectFromGithubUrl(githubUrl);
  } catch (error) {
    redirect(`/admin/lab?error=${encodeURIComponent(getErrorMessage(error))}`);
  }

  revalidatePath("/");
  revalidatePath("/lab");
  revalidatePath("/admin/lab");
  redirect("/admin/lab?created=1");
}

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value : "";
}

function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.some((status) => status === value);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to add that repository.";
}
