import { LogOut } from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import type { AdminIdentity } from "../auth";
import { AdminNavigation } from "./AdminNavigation";

export function AdminShell({
  identity,
  children,
}: {
  identity: AdminIdentity;
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-[calc(100vh-106px)] bg-[var(--background)] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="h-fit border border-[var(--border)] bg-[var(--surface)] p-4 lg:sticky lg:top-28">
          <div className="border-b border-[var(--border)] pb-4">
            <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">
              XDCoderz
            </p>
            <p className="mt-1 text-lg font-semibold">Operations</p>
          </div>

          <AdminNavigation />

          <div className="mt-4 border-t border-[var(--border)] pt-4">
            <p className="truncate text-xs text-[var(--muted)]" title={identity.email}>
              {identity.email}
            </p>
            <form action={logoutAction}>
              <button
                type="submit"
                className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-2 border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm font-semibold transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)]"
              >
                <LogOut size={15} aria-hidden="true" />
                Sign out
              </button>
            </form>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
