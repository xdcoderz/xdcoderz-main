# Homepage Featured Spotlight

## One-time setup

1. Open the existing website Supabase project, then SQL Editor.
2. Run [supabase-featured.sql](./supabase-featured.sql).
3. Deploy this website update to Vercel.
4. Sign in at /admin and open Featured.

Uses the existing Supabase URL, server key, publishable key, and ADMIN_EMAILS.
No new API provider or scheduled job is required.

The SQL creates the homepage_featured table and featured-images Storage bucket.
RLS is enabled and anon/authenticated table access is revoked. All reads and writes
use server code; every mutation checks the existing administrator allowlist.
The bucket is public so website images can load. Draft text is private, but uploaded
image URLs are public, even before publishing. Do not upload confidential images.

## Edit and publish

- Enter the title, description, optional badge, destination, button label, and image description.
- Upload a PNG, JPEG, or WebP up to 2 MB. Use a landscape image, ideally 1200 x 800.
- Preview shows the entered content and selected local image; preview links are inactive.
- Save draft preserves work without changing the published record.
- Publish saves the form to both the draft and published records in one database operation.
- Hide live spotlight disables the published record while retaining the draft.
- Successful publication invalidates the homepage path. No redeploy is needed for content edits.

There is one published spotlight at a time. Publishing a future-dated spotlight replaces
the previous one immediately: the section stays hidden until its start time.
This is a visibility window, not a queue of upcoming promotions.

Dates are entered in the administrator device's timezone and stored as UTC.
The start is inclusive and the end is exclusive. Blank dates impose no boundary.
The homepage renders dynamically and checks the window on each request.
Already-open browser tabs need a refresh to reflect schedule or publication changes.

## Default and failure behavior

Before storage is configured, or when no published row exists, the initial GridForge
spotlight uses existing product data and an editorial illustration. This illustration
is not a screenshot of GridForge. Replace it with an actual screenshot through Admin.

Disabled or expired records hide the section. Operational read failures also hide it
instead of restoring an old promotion. The editor reports storage setup errors and
disables saving until configuration is available.

Uploaded files have unique names and remain available when a promotion is replaced,
so existing content and open pages do not lose their images. Remove unused files
manually from the featured-images bucket only after checking both saved records.

## Ownership

- src/features/featured: types, validation, server storage, authenticated actions, banner, editor.
- src/app/admin/(dashboard)/featured: thin protected admin page.
- src/components/home/CompactDiscovery: compact Lab and delivery sections.
- src/components/home/BlogSpotlight: homepage journal preview.
- src/components/home/MotionSection: scoped GSAP entrance and hover animations, with reduced-motion support and cleanup on unmount.
- public/images/featured/table-workflow.png: generated editorial artwork.

The hero markup, ActivityRail, capability strip, and global theme styles are preserved.
Products and Tools have dedicated directory pages rather than homepage sections.
The hero's existing products anchor lands on the spotlight, which links to the catalog.
Featured and Blog use CSS modules, existing theme tokens, and restrained GSAP motion.
Admin preview is static; reduced-motion visitors see all content without animation.

## Checks

Run npm run lint, npx tsc --noEmit, npm run test:featured, and npm run build.
After Supabase setup, save a draft and confirm it does not change the homepage.
Publish it, test a future start and past end, disable it, and verify unauthorized
visitors are redirected from /admin/featured to the admin login.
