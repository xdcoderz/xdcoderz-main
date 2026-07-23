import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";
import { updateLeadStatus } from "@/app/admin/actions";
import {
  AdminPageHeader,
  EmptyState,
  Pagination,
  StatusBadge,
} from "@/features/admin/components/AdminUi";
import { getLeads } from "@/features/admin/data";
import {
  formatAdminDate,
  formatAdminSource,
  getLeadAttribution,
} from "@/features/admin/format";
import { leadStatuses } from "@/features/admin/types";

export const dynamic = "force-dynamic";

type LeadsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const status = firstValue(params.status) || "all";
  const source = firstValue(params.source) || "all";
  const query = firstValue(params.query);
  const page = positiveInteger(firstValue(params.page));
  const result = await getLeads({ status, source, query, page });

  return (
    <div>
      <AdminPageHeader
        eyebrow="Commercial pipeline"
        title="Lead inbox"
        description="Review enquiries, inspect tool context, and move each opportunity through a simple operating status."
        action={<span className="text-sm font-semibold text-[var(--muted)]">{result.count} total</span>}
      />

      <form className="mt-6 grid gap-3 border border-[var(--border)] bg-[var(--surface)] p-4 md:grid-cols-[minmax(220px,1fr)_180px_180px_auto]">
        <input
          type="search"
          name="query"
          defaultValue={query}
          placeholder="Search name, email, or reason"
          className="min-h-11 border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm"
        />
        <select name="status" defaultValue={status} className="min-h-11 border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm">
          <option value="all">All statuses</option>
          {leadStatuses.map((value) => <option key={value} value={value}>{capitalize(value)}</option>)}
        </select>
        <select name="source" defaultValue={source} className="min-h-11 border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm">
          <option value="all">All sources</option>
          <option value="contact_page">Contact page</option>
          <option value="tools">All tools</option>
        </select>
        <button type="submit" className="min-h-11 bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-strong)] hover:text-[var(--accent-contrast)]">
          Apply filters
        </button>
      </form>

      <div className="mt-6 grid gap-4">
        {result.leads.length === 0 ? (
          <EmptyState>No leads match these filters.</EmptyState>
        ) : (
          result.leads.map((lead) => {
            const attribution = getLeadAttribution(lead.metadata);

            return (
              <article key={lead.id} className="border border-[var(--border)] bg-[var(--surface)]">
                <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.25fr_210px] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{lead.name}</h2>
                      <StatusBadge status={lead.status} />
                    </div>
                    <a href={`mailto:${lead.email}`} className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--accent-strong)] hover:underline">
                      <Mail size={14} aria-hidden="true" />
                      {lead.email}
                    </a>
                    <p className="mt-3 text-xs text-[var(--muted)]">{formatAdminDate(lead.created_at)}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-[var(--muted)]">{formatAdminSource(lead.source)}</p>
                    <h3 className="mt-2 font-semibold">{lead.reason}</h3>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[var(--muted-strong)]">{lead.message}</p>
                  </div>

                  <form action={updateLeadStatus} className="border-l-0 border-[var(--border)] lg:border-l lg:pl-5">
                    <input type="hidden" name="id" value={lead.id} />
                    <label htmlFor={`status-${lead.id}`} className="text-xs font-semibold uppercase text-[var(--muted)]">Pipeline status</label>
                    <select id={`status-${lead.id}`} name="status" defaultValue={lead.status} className="mt-2 min-h-10 w-full border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm">
                      {leadStatuses.map((value) => <option key={value} value={value}>{capitalize(value)}</option>)}
                    </select>
                    <button type="submit" className="mt-2 min-h-10 w-full border border-[var(--border)] bg-[var(--surface-raised)] px-3 text-sm font-semibold transition hover:bg-[var(--surface-muted)]">
                      Update status
                    </button>
                  </form>
                </div>

                {attribution && (
                  <details className="border-t border-[var(--border)] bg-[var(--surface-muted)] px-5 py-4">
                    <summary className="cursor-pointer text-sm font-semibold text-[var(--accent-strong)]">
                      View attached tool context
                    </summary>
                    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
                      <div>
                        <p className="text-xs font-semibold uppercase text-[var(--muted)]">Summary</p>
                        <p className="mt-2 text-sm leading-6">{attribution.summary}</p>
                        <Link href={`/tools/${attribution.tool}`} target="_blank" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)] hover:underline">
                          Open source tool
                          <ExternalLink size={14} aria-hidden="true" />
                        </Link>
                      </div>
                      <dl className="grid gap-3 sm:grid-cols-2">
                        {attribution.details.map(([label, value]) => (
                          <div key={label}>
                            <dt className="text-xs font-semibold text-[var(--muted)]">{label}</dt>
                            <dd className="mt-1 text-sm">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </details>
                )}
              </article>
            );
          })
        )}
      </div>

      <Pagination
        page={result.page}
        pageCount={result.pageCount}
        buildHref={(nextPage) => buildPageHref({ status, source, query, page: nextPage })}
      />
    </div>
  );
}

function buildPageHref(input: { status: string; source: string; query: string; page: number }) {
  const params = new URLSearchParams();
  if (input.status !== "all") params.set("status", input.status);
  if (input.source !== "all") params.set("source", input.source);
  if (input.query) params.set("query", input.query);
  params.set("page", String(input.page));
  return `/admin/leads?${params.toString()}`;
}

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function positiveInteger(value: string) {
  const number = Number.parseInt(value, 10);
  return Number.isFinite(number) && number > 0 ? number : 1;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
