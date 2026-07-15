# XDCoderz Turnstile Setup

Cloudflare Turnstile protects public forms from bot submissions.

## Environment Variables

Set these in Vercel for Production and Preview:

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key
```

The site key is public. The secret key must stay server-side only.

## Current Coverage

Turnstile is active on:

- `/contact`
- Friday Brief newsletter signup forms

Both forms send the browser token to the matching API route. The API route then
validates the token server-side with Cloudflare before it writes to Supabase or
sends mail through Resend.

## Runtime Behavior

- If `TURNSTILE_SECRET_KEY` is configured, submissions require a valid token.
- If `TURNSTILE_SECRET_KEY` is missing, verification is skipped for local setup.
- If Cloudflare verification fails, the API returns `403`.
- If Cloudflare verification is unavailable, the API returns `502`.

## Widget Settings

Recommended Cloudflare widget settings:

```txt
Widget name: XDCoderz Website Forms
Hostnames: xdcoderz.xyz, www.xdcoderz.xyz
Mode: Managed
```

Keep future tool lead forms using the shared component:

```tsx
import { TurnstileWidget } from "@/components/security/TurnstileWidget";
```
