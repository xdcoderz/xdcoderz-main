# XDCoderz Operations Dashboard

The dashboard is available at `/admin` and is intentionally absent from public
navigation. It provides a 30-day tool funnel, attributed lead management, and a
subscriber directory.

For the full operating guide, including Open Product Lab project management, see
[`admin-operations.md`](./admin-operations.md).

## Security Model

Admin access requires both:

1. A valid Supabase Auth email/password account.
2. The same email in the server-only `ADMIN_EMAILS` allowlist.

The browser receives only Supabase's normal authenticated session. Operational
queries and lead status updates run on the server with the Supabase secret key.
The secret key must never use a `NEXT_PUBLIC_` environment variable.

## One-Time Setup

1. Open Supabase Dashboard -> Authentication -> Users.
2. Select **Add user** -> **Create new user**.
3. Create the admin account, preferably `grow.xdcoderz@gmail.com`, with a strong
   unique password and mark the email as confirmed.
4. In Supabase Dashboard -> Authentication -> Sign In / Providers, keep public
   email signups disabled. Admin users should be created manually.
5. In Vercel, add this environment variable to Production and Preview:

```env
ADMIN_EMAILS=grow.xdcoderz@gmail.com
```

Multiple admins can be comma-separated:

```env
ADMIN_EMAILS=owner@example.com,operator@example.com
```

6. Confirm that these existing variables remain configured in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

7. Redeploy and sign in at `https://www.xdcoderz.xyz/admin/login`.

No database policy for browser reads is required. The operational tables keep
RLS enabled with no public read policies.

## Routes

- `/admin` - 30-day operating overview and unique-session tool funnel.
- `/admin/leads` - searchable lead inbox, attribution context, and status updates.
- `/admin/subscribers` - searchable subscriber directory.
- `/admin/lab` - add GitHub repositories to the Open Product Lab.
- `/admin/login` - Supabase Auth sign-in.

## Lead Statuses

```txt
new -> contacted -> qualified -> won
                            -> closed
```

Status changes are validated in a Server Action and revalidated immediately in
the overview and lead inbox.
