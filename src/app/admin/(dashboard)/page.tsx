import Link from "next/link";
import { ArrowRight, Mail, MousePointerClick, Target, Users } from "lucide-react";
import { AdminPageHeader, StatusBadge } from "@/features/admin/components/AdminUi";
import { getAdminOverview } from "@/features/admin/data";
import { formatAdminDate, formatAdminSource } from "@/features/admin/format";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview();

  return (
    <div>
      <AdminPageHeader
        eyebrow="30-day operating view"
        title="Decision dashboard"
        description="A focused view of demand, audience growth, and how effectively XDCoderz tools create qualified conversations."
        action={
          <Link href="/admin/leads" className="inline-flex min-h-11 items-center gap-2 bg-[var(--foreground)] px-4 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-strong)] hover:text-[var(--accent-contrast)]">
            Review leads
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        }
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Total leads" value={overview.leadCount} icon={Mail} />
        <Metric label="New leads" value={overview.newLeadCount} icon={Target} />
        <Metric label="Active subscribers" value={overview.subscriberCount} icon={Users} />
        <Metric label="30-day tool events" value={overview.eventCount} icon={MousePointerClick} />
      </div>

      <section className="mt-8 border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5 sm:p-6">
          <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">Tool funnel</p>
          <h2 className="mt-2 text-xl font-semibold">Unique sessions over the last 30 days</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="bg-[var(--surface-muted)] text-xs uppercase text-[var(--muted-strong)]">
              <tr>
                <th className="px-5 py-3 font-semibold">Tool</th>
                <th className="px-4 py-3 font-semibold">Started</th>
                <th className="px-4 py-3 font-semibold">Completed</th>
                <th className="px-4 py-3 font-semibold">Contact clicks</th>
                <th className="px-4 py-3 font-semibold">Submitted</th>
                <th className="px-4 py-3 font-semibold">Completion</th>
                <th className="px-5 py-3 font-semibold">Lead conversion</th>
              </tr>
            </thead>
            <tbody>
              {overview.funnels.map((funnel) => (
                <tr key={funnel.slug} className="border-t border-[var(--border)]">
                  <td className="px-5 py-4 font-semibold">{funnel.label}</td>
                  <td className="px-4 py-4">{funnel.started}</td>
                  <td className="px-4 py-4">{funnel.completed}</td>
                  <td className="px-4 py-4">{funnel.clicked}</td>
                  <td className="px-4 py-4">{funnel.submitted}</td>
                  <td className="px-4 py-4 font-semibold">{funnel.completionRate}%</td>
                  <td className="px-5 py-4 font-semibold text-[var(--accent-strong)]">{funnel.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] p-5 sm:p-6">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">Pipeline</p>
            <h2 className="mt-2 text-xl font-semibold">Recent enquiries</h2>
          </div>
          <Link href="/admin/leads" className="text-sm font-semibold text-[var(--accent-strong)] hover:underline">View all</Link>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {overview.recentLeads.map((lead) => (
            <div key={lead.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_1.2fr_auto] sm:items-center">
              <div>
                <p className="font-semibold">{lead.name}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{lead.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">{lead.reason}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{formatAdminSource(lead.source)} · {formatAdminDate(lead.created_at)}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Mail;
}) {
  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[var(--muted)]">{label}</p>
          <p className="mt-3 text-3xl font-semibold">{value.toLocaleString("en-IN")}</p>
        </div>
        <span className="grid size-9 place-items-center bg-[var(--surface-muted)] text-[var(--accent-strong)]">
          <Icon size={17} aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}
