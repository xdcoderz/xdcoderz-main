# Tool Funnel Analytics

XDCoderz tracks the commercial funnel for its three live planning tools without
collecting names or email addresses during tool use.

## Event Flow

```txt
first interaction -> tool_started
result generated  -> tool_completed
contact CTA        -> contact_clicked
contact accepted   -> contact_submitted
```

The browser creates a random UUID and keeps it for 30 days in local storage
under `xdcoderz_tool_session_id`. It links events from the same browser without
using an email address, account, or fingerprint.

## Ownership Boundaries

- `src/features/tools/analytics/client.ts` owns browser session and event delivery.
- `src/features/tools/analytics/events.ts` owns event types and validation.
- `src/features/tools/analytics/storage.ts` owns Supabase persistence.
- `src/app/api/tools/events/route.ts` is the public, rate-limited write boundary.
- `/api/contact` writes `contact_submitted` only after the contact request succeeds.

Every tool calls the shared client helper. No tool imports Supabase code.

## Privacy And Failure Behavior

- Tool events contain no name, email address, IP address, or fingerprint.
- Metadata is restricted to primitive values, 16 keys, and short strings.
- Tool and event names are allow-listed server-side.
- The endpoint is limited to 60 events per IP per minute.
- Analytics delivery uses `keepalive` and never blocks the tool interface.
- Missing analytics storage does not block contact email delivery.

## Supabase

Run the `tool_events` SQL in `docs/SUPABASE_SETUP.md` once before deploying.
RLS is enabled with no public policies. Only the website's server-side Supabase
secret can insert or read these rows.
