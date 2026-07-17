# XDCoderz Sentry Setup

Sentry tracks production errors and performance traces for the Next.js website.

## Environment Variables

Set these in Vercel for Production and Preview:

```env
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
SENTRY_ENVIRONMENT=production
SENTRY_PROJECT=xdcoderz
```

For Preview, use:

```env
NEXT_PUBLIC_SENTRY_ENVIRONMENT=preview
SENTRY_ENVIRONMENT=preview
```

Optional source-map upload variables:

```env
SENTRY_ORG=your_org_slug
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

Keep `SENTRY_AUTH_TOKEN` secret. Do not expose it with a `NEXT_PUBLIC_` prefix.

## Current Coverage

- Client-side App Router errors.
- Server-side route/API errors.
- Edge runtime errors if edge routes are added later.
- Request errors via Next.js instrumentation.
- Conservative production tracing at `0.1`.

## Verification

The guarded test route lives at:

```txt
/api/sentry-test
```

It only throws when this env var is enabled:

```env
ENABLE_SENTRY_TEST_ROUTE=true
```

Recommended test flow:

1. Temporarily set `ENABLE_SENTRY_TEST_ROUTE=true` in Vercel Preview.
2. Redeploy Preview.
3. Visit `/api/sentry-test`.
4. Confirm the error appears in Sentry.
5. Set `ENABLE_SENTRY_TEST_ROUTE=false` again.

Do not leave the test route enabled in Production.
