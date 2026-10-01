import { requireAdmin } from "@/features/admin/auth";
import { AdminPageHeader } from "@/features/admin/components/AdminUi";
import { FeaturedEditor } from "@/features/featured/components/FeaturedEditor";
import { initialSpotlight } from "@/features/featured/defaults";
import { readSpotlight } from "@/features/featured/server";

export const dynamic = "force-dynamic";

export default async function FeaturedAdminPage() {
  await requireAdmin();
  let draft = initialSpotlight;
  let setupError = "";
  let published = null;
  try {
    const [saved, live] = await Promise.all([readSpotlight("draft"), readSpotlight("published")]);
    draft = saved ?? live ?? initialSpotlight;
    published = live;
  } catch (error) {
    setupError = error instanceof Error ? error.message : "Featured storage unavailable.";
  }
  return <div>
    <AdminPageHeader eyebrow="Homepage" title="Featured spotlight" description="Choose the next product, release, or idea visitors discover." />
    {setupError && <p role="alert" className="my-4 text-sm text-[var(--accent-strong)]">{setupError}</p>}
    <FeaturedEditor initial={draft} published={published} unavailable={Boolean(setupError)} />
  </div>;
}

