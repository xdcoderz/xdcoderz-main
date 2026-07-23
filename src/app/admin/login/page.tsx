import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getAdminIdentity } from "@/features/admin/auth";
import { LoginForm } from "@/features/admin/components/LoginForm";
import { isSupabaseAuthConfigured } from "@/lib/supabase/auth-server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const configured = isSupabaseAuthConfigured();
  const identity = await getAdminIdentity();

  if (identity) redirect("/admin");

  return (
    <section className="min-h-[calc(100vh-106px)] bg-[var(--background)] px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-md border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <span className="grid size-11 place-items-center bg-[var(--foreground)] text-[var(--surface)]">
          <ShieldCheck size={21} aria-hidden="true" />
        </span>
        <p className="mt-7 font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">
          Restricted operations
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Access is limited to verified Supabase accounts explicitly allowed by XDCoderz.
        </p>
        <LoginForm configured={configured} />
      </div>
    </section>
  );
}
