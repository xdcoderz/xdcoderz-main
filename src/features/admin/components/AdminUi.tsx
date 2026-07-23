import Link from "next/link";

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-5 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
          {description}
        </p>
      </div>
      {action}
    </header>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "new" || status === "subscribed"
      ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200"
      : status === "qualified" || status === "won"
        ? "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-200"
        : "border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted-strong)]";

  return (
    <span className={`inline-flex border px-2.5 py-1 text-xs font-semibold capitalize ${tone}`}>
      {status}
    </span>
  );
}

export function Pagination({
  page,
  pageCount,
  buildHref,
}: {
  page: number;
  pageCount: number;
  buildHref: (page: number) => string;
}) {
  if (pageCount <= 1) return null;

  return (
    <nav className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5" aria-label="Pagination">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--surface-muted)] ${page === 1 ? "pointer-events-none opacity-40" : ""}`}
      >
        Previous
      </Link>
      <span className="text-sm text-[var(--muted)]">
        Page {page} of {pageCount}
      </span>
      <Link
        href={buildHref(Math.min(pageCount, page + 1))}
        aria-disabled={page === pageCount}
        className={`border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--surface-muted)] ${page === pageCount ? "pointer-events-none opacity-40" : ""}`}
      >
        Next
      </Link>
    </nav>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-14 text-center text-sm text-[var(--muted)]">
      {children}
    </div>
  );
}
