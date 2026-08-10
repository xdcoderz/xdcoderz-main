import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { addLabProject } from "@/app/admin/actions";
import { AdminPageHeader, EmptyState, StatusBadge } from "@/features/admin/components/AdminUi";
import { getAdminLabProjects } from "@/features/admin/lab-projects";

export const dynamic = "force-dynamic";

type LabAdminPageProps = {
  searchParams: Promise<{
    created?: string;
    error?: string;
  }>;
};

export default async function LabAdminPage({ searchParams }: LabAdminPageProps) {
  const params = await searchParams;
  let projects: Awaited<ReturnType<typeof getAdminLabProjects>> = [];
  let setupError = "";

  try {
    projects = await getAdminLabProjects();
  } catch (error) {
    setupError =
      error instanceof Error
        ? error.message
        : "Lab project storage is not ready.";
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Open Product Lab"
        title="Manage public GitHub projects"
        description="Add open-source repositories to the public Lab without editing the core website files. Aegis Eye and other editorial priority projects can still stay in code."
      />

      <section className="mt-6 border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5 sm:p-6">
          <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">
            Add repository
          </p>
          <h2 className="mt-2 text-xl font-semibold">Submit a GitHub repo URL</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
            The admin action reads the public GitHub repository, stores the normalized
            repo record in Supabase, and revalidates the Lab pages.
          </p>
        </div>

        <form action={addLabProject} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:p-6">
          <label className="grid gap-2">
            <span className="text-sm font-semibold">GitHub repository URL</span>
            <input
              name="githubUrl"
              type="url"
              required
              placeholder="https://github.com/xdcoderz/aegis-eye"
              className="min-h-12 border border-[var(--border)] bg-[var(--surface-raised)] px-4 text-sm outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 self-end bg-[var(--foreground)] px-5 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--accent-strong)] hover:text-[var(--accent-contrast)]"
          >
            <GitBranch size={16} aria-hidden="true" />
            Add to Lab
          </button>
        </form>

        {setupError && (
          <p className="border-t border-amber-300 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-200 sm:px-6">
            {setupError} Run the Lab projects SQL from the admin documentation before adding repositories.
          </p>
        )}
        {params.created && (
          <p className="border-t border-emerald-300 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-200 sm:px-6">
            Repository added to the Lab.
          </p>
        )}
        {params.error && (
          <p className="border-t border-red-300 bg-red-50 px-5 py-3 text-sm font-semibold text-red-800 dark:border-red-400/25 dark:bg-red-400/10 dark:text-red-200 sm:px-6">
            {params.error}
          </p>
        )}
      </section>

      <section className="mt-8 border border-[var(--border)] bg-[var(--surface)]">
        <div className="border-b border-[var(--border)] p-5 sm:p-6">
          <p className="font-mono text-xs font-semibold uppercase text-[var(--accent-strong)]">
            Admin-managed projects
          </p>
          <h2 className="mt-2 text-xl font-semibold">Supabase Lab records</h2>
        </div>

        {projects.length === 0 ? (
          <EmptyState>
            No admin-managed Lab projects yet. Add a public GitHub repository URL above.
          </EmptyState>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <thead className="bg-[var(--surface-muted)] text-xs uppercase text-[var(--muted-strong)]">
                <tr>
                  <th className="px-5 py-3 font-semibold">Project</th>
                  <th className="px-4 py-3 font-semibold">Repo</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">GitHub</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-t border-[var(--border)]">
                    <td className="px-5 py-4">
                      <p className="font-semibold">{project.name}</p>
                      <p className="mt-1 max-w-md text-xs leading-5 text-[var(--muted)]">
                        {project.description}
                      </p>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs">{project.repo}</td>
                    <td className="px-4 py-4">{project.category}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 font-semibold text-[var(--accent-strong)] hover:underline"
                      >
                        Open repo
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
