import {
  AdminPageHeader,
  EmptyState,
  Pagination,
  StatusBadge,
} from "@/features/admin/components/AdminUi";
import { getSubscribers } from "@/features/admin/data";
import { formatAdminDate, formatAdminSource } from "@/features/admin/format";

export const dynamic = "force-dynamic";

type SubscribersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SubscribersPage({ searchParams }: SubscribersPageProps) {
  const params = await searchParams;
  const status = firstValue(params.status) || "all";
  const query = firstValue(params.query);
  const page = positiveInteger(firstValue(params.page));
  const result = await getSubscribers({ status, query, page });

  return (
    <div>
      <AdminPageHeader
        eyebrow="Audience"
        title="Subscribers"
        description="Monitor durable newsletter subscriptions across the blog and future acquisition surfaces."
        action={<span className="text-sm font-semibold text-[var(--muted)]">{result.count} total</span>}
      />

      <form className="mt-6 grid gap-3 border border-[var(--border)] bg-[var(--surface)] p-4 md:grid-cols-[1fr_190px_auto]">
        <input type="search" name="query" defaultValue={query} placeholder="Search email" className="min-h-11 border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm" />
        <select name="status" defaultValue={status} className="min-h-11 border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm">
          <option value="all">All statuses</option>
          <option value="subscribed">Subscribed</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
        <button type="submit" className="min-h-11 bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-strong)] hover:text-[var(--accent-contrast)]">Apply filters</button>
      </form>

      <section className="mt-6 border border-[var(--border)] bg-[var(--surface)]">
        {result.subscribers.length === 0 ? (
          <EmptyState>No subscribers match these filters.</EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-muted)] text-xs uppercase text-[var(--muted-strong)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Article</th>
                  <th className="px-4 py-3 font-semibold">Subscribed</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {result.subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-t border-[var(--border)]">
                    <td className="px-5 py-4 font-semibold"><a href={`mailto:${subscriber.email}`} className="hover:text-[var(--accent-strong)] hover:underline">{subscriber.email}</a></td>
                    <td className="px-4 py-4">{formatAdminSource(subscriber.source)}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{subscriber.slug ?? "General"}</td>
                    <td className="px-4 py-4 text-[var(--muted)]">{formatAdminDate(subscriber.subscribed_at)}</td>
                    <td className="px-5 py-4"><StatusBadge status={subscriber.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Pagination
        page={result.page}
        pageCount={result.pageCount}
        buildHref={(nextPage) => buildPageHref({ status, query, page: nextPage })}
      />
    </div>
  );
}

function buildPageHref(input: { status: string; query: string; page: number }) {
  const params = new URLSearchParams();
  if (input.status !== "all") params.set("status", input.status);
  if (input.query) params.set("query", input.query);
  params.set("page", String(input.page));
  return `/admin/subscribers?${params.toString()}`;
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function positiveInteger(value: string) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) && number > 0 ? number : 1;
}
