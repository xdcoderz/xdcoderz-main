import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  if (process.env.ENABLE_SENTRY_TEST_ROUTE !== "true") {
    return NextResponse.json({ ok: false, message: "Not found." }, { status: 404 });
  }

  throw new Error("XDCoderz Sentry server test error");
}
