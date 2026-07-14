# XDCoderz Friday Brief Newsletter

The blog newsletter is built as a plug-and-play layer. The UI is blog-only, and
the backend keys stay server-side.

## What is included

- Blog masthead CTA: `Get the Friday Brief`
- Blog homepage subscribe strip
- Blog article subscribe strip
- Server route: `/api/newsletter/subscribe`
- Email validation
- Honeypot spam field
- Light in-memory rate limit
- Supabase subscriber storage when configured
- Local JSONL capture with no external API
- Provider adapters for Resend, Brevo, Buttondown, and Mailchimp

## Default service email

Use this identity across newsletter and growth services:

```env
XDCODERZ_SERVICE_EMAIL=grow.xdcoderz@gmail.com
CONTACT_FROM_EMAIL="XDCoderz <hello@xdcoderz.xyz>"
CONTACT_REPLY_TO_EMAIL=grow.xdcoderz@gmail.com
NEWSLETTER_FROM_EMAIL="XDCoderz <hello@xdcoderz.xyz>"
```

## Recommended free provider

Use Resend first for production email delivery because the domain is already
verified and the API key can live safely in Vercel environment variables.

Resend is currently used for:

- Contact form delivery to the XDCoderz growth inbox.
- Contact form confirmation emails.
- Friday Brief subscriber confirmation emails.
- Friday Brief admin notification emails.

Resend is not a subscriber database. Supabase stores subscriber records,
preferences, and future unsubscribe state when configured.

Brevo is still a good option if you want an all-in-one newsletter list manager.

Buttondown is a good alternative if you want a simpler developer-style
newsletter product.

Mailchimp is supported, but its free tier is tighter and should only be used if
you already want Mailchimp.

## Local mode

This works immediately with no external keys:

```env
NEWSLETTER_PROVIDER=local
```

Submissions are stored at:

```txt
data/newsletter-subscribers.jsonl
```

That file is ignored by Git so subscriber emails do not get committed.

## Resend setup

```env
NEWSLETTER_PROVIDER=resend
RESEND_API_KEY=your_resend_api_key
CONTACT_FROM_EMAIL="XDCoderz <hello@xdcoderz.xyz>"
CONTACT_REPLY_TO_EMAIL=grow.xdcoderz@gmail.com
NEWSLETTER_FROM_EMAIL="XDCoderz <hello@xdcoderz.xyz>"
```

In Vercel, enter the email display-name values without the surrounding quotes.

If `NEWSLETTER_PROVIDER` is not set, the backend automatically uses Resend when
`RESEND_API_KEY` is present.

The contact form uses `/api/contact` and sends:

- A lead email to `CONTACT_REPLY_TO_EMAIL`.
- A confirmation email to the visitor.

The newsletter form uses `/api/newsletter/subscribe` and sends:

- A confirmation email to the subscriber.
- A subscriber notification email to `CONTACT_REPLY_TO_EMAIL`.
- A subscriber record to Supabase when the Supabase env vars are configured.

## Brevo setup

```env
NEWSLETTER_PROVIDER=brevo
BREVO_API_KEY=your_brevo_api_key
BREVO_LIST_ID=your_numeric_list_id
```

## Buttondown setup

```env
NEWSLETTER_PROVIDER=buttondown
BUTTONDOWN_API_KEY=your_buttondown_api_key
```

## Mailchimp setup

```env
NEWSLETTER_PROVIDER=mailchimp
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
MAILCHIMP_SERVER_PREFIX=us21
```

`MAILCHIMP_SERVER_PREFIX` is the `usX` part of your Mailchimp account. If your
API key already ends with a suffix like `-us21`, the backend can infer it.

## Runtime flow

1. Reader clicks `Get the Friday Brief`.
2. Reader submits an email address.
3. `/api/newsletter/subscribe` validates and spam-checks the request.
4. The backend stores locally or sends the email to the configured provider.
5. The page shows a success message without exposing any API key.

## Frontend copy

Headline:

```txt
What if this week's boring headline is next month's unicorn idea?
```

Body:

```txt
We filter the noise and send you the few tech shifts worth building around.
Every Friday, 6 AM IST.
```
