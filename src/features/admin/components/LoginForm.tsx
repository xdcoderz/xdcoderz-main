"use client";

import { useActionState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { error: "" };

export function LoginForm({ configured = true }: { configured?: boolean }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="mt-8 grid gap-5">
      <div>
        <label htmlFor="admin-email" className="text-sm font-semibold">
          Admin email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 min-h-12 w-full border border-[var(--border)] bg-[var(--surface-raised)] px-4 text-sm transition focus:border-[var(--accent)]"
          placeholder="you@xdcoderz.xyz"
        />
      </div>
      <div>
        <label htmlFor="admin-password" className="text-sm font-semibold">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 min-h-12 w-full border border-[var(--border)] bg-[var(--surface-raised)] px-4 text-sm transition focus:border-[var(--accent)]"
          placeholder="Your Supabase Auth password"
        />
      </div>

      {!configured && (
        <p className="border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-100" role="status">
          Supabase Auth is not configured in this environment. Add the required environment variables before signing in.
        </p>
      )}

      {state.error && (
        <p className="border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-400/25 dark:bg-red-400/10 dark:text-red-200" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !configured}
        className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-strong)] hover:text-[var(--accent-contrast)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LockKeyhole size={16} aria-hidden="true" />
        {pending ? "Verifying..." : "Enter operations"}
        {!pending && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}
